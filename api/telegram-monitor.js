import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_OFFICIAL_SOURCES } from './sync-news.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator'],
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure']
    ]
  }
});

function generateThemedImageUrl(_title) {
  // Avoid third-party rate-limited image generation
  return null;
}

export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment.");
    return res.status(500).json({ error: "Telegram environment variables missing on Vercel." });
  }

  try {
    // 1. Fetch active sources from Supabase and merge with DEFAULT_OFFICIAL_SOURCES
    const { data: dbSources } = await supabase
      .from('ai_sources')
      .select('*');

    const sourceMap = new Map();
    for (const s of (dbSources || [])) {
      sourceMap.set(s.name, s);
    }
    // Official verified feeds always take precedence over legacy database entries
    for (const s of DEFAULT_OFFICIAL_SOURCES) {
      sourceMap.set(s.name, { ...sourceMap.get(s.name), ...s });
    }
    const sources = Array.from(sourceMap.values());

    const alertsSent = [];

    // 2. Loop through each live source
    for (const source of sources) {
      let feed;
      try {
        feed = await parser.parseURL(source.feed_url);
      } catch (err) {
        console.warn(`Failed to parse feed for ${source.name}:`, err.message);
        continue;
      }

      // Check the latest 3 items from this official source
      for (const item of feed.items.slice(0, 3)) {
        const articleUrl = item.link || item.guid || '';
        if (!articleUrl) continue;

        // Check if already in live articles
        const { data: exists } = await supabase
          .from('ai_articles')
          .select('id')
          .eq('article_url', articleUrl)
          .maybeSingle();

        // Check if already staged in pending
        const { data: pendingExists } = await supabase
          .from('pending_articles')
          .select('id')
          .eq('article_url', articleUrl)
          .maybeSingle();

        if (!exists && !pendingExists) {
          console.log(`Staging new official article: "${item.title}"`);
          
          let mediaImageUrl = null;
          if (item.enclosure?.url && item.enclosure.type?.includes('image')) {
            mediaImageUrl = item.enclosure.url;
          } else if (item.mediaContent?.$?.url) {
            mediaImageUrl = item.mediaContent.$.url;
          } else {
            const rawSummary = item.contentSnippet || item.summary || item.contentEncoded || '';
            const imgMatch = rawSummary.match(/<img[^>]+src=["']([^"']+)["']/i);
            if (imgMatch && imgMatch[1]) {
              mediaImageUrl = imgMatch[1];
            }
          }

          if (!mediaImageUrl) {
            mediaImageUrl = generateThemedImageUrl(item.title);
          }

          // Stage in pending_articles table
          const { data: saved, error: stageErr } = await supabase
            .from('pending_articles')
            .insert([{
              title: item.title || 'Untitled Article',
              summary: item.contentSnippet || item.summary || 'Official announcement and release notes.',
              article_url: articleUrl,
              source_name: source.name,
              image_url: mediaImageUrl,
              published_at: item.pubDate || item.isoDate || new Date().toISOString()
            }])
            .select()
            .single();

          if (stageErr || !saved) {
            console.error("Failed to stage pending article:", stageErr?.message);
            continue;
          }

          // Format interactive buttons markup (Accept, Go Live, Reject)
          const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
          const text = `🔔 *New Official AI Update Found!*\n\n*Source*: ${source.name}\n*Title*: ${item.title || 'Untitled'}\n\n*Link*: ${articleUrl}\n\nApprove or reject this news for WenzdayLab?`;

          const payload = {
            chat_id: chatId,
            text,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ Accept & Save to DB', callback_data: `accept_${saved.id}` },
                  { text: '🚀 Go Live (Deploy)', callback_data: `deploy_${saved.id}` }
                ],
                [
                  { text: '❌ Reject', callback_data: `reject_${saved.id}` }
                ]
              ]
            }
          };

          const teleRes = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (teleRes.ok) {
            alertsSent.push({
              source: source.name,
              title: item.title,
              url: articleUrl
            });
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      alertsCount: alertsSent.length,
      alerts: alertsSent
    });

  } catch (err) {
    console.error("Telegram Monitor error:", err);
    return res.status(500).json({ error: err.message });
  }
}
