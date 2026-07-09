import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator']
    ]
  }
});

const FEEDS = {
  'Google AI': 'https://blog.google/technology/ai/rss/',
  'OpenAI': 'https://openai.com/news/rss.xml',
  'NVIDIA': 'https://blogs.nvidia.com/feed/',
  'Anthropic': 'https://www.anthropic.com/news/rss.xml'
};

export default async function handler(req, res) {
  // Verify token and chat id exist
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment.");
    return res.status(500).json({ error: "Telegram environment variables missing on Vercel." });
  }

  try {
    const alertsSent = [];

    for (const [source, url] of Object.entries(FEEDS)) {
      console.log(`Checking RSS feed: ${source} at ${url}`);
      let feed;
      try {
        feed = await parser.parseURL(url);
      } catch (err) {
        console.warn(`Failed to parse feed for ${source}:`, err.message);
        continue;
      }

      // Check the latest 3 items
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
          console.log(`Staging new article: "${item.title}"`);
          
          // 1. Stage in pending_articles table
          const { data: saved, error: stageErr } = await supabase
            .from('pending_articles')
            .insert([{
              title: item.title || 'Untitled Article',
              summary: item.contentSnippet || item.summary || 'No summary available.',
              article_url: articleUrl,
              source_name: source,
              published_at: item.pubDate || new Date().toISOString()
            }])
            .select()
            .single();

          if (stageErr) {
            console.error("Failed to stage pending article:", stageErr.message);
            continue;
          }

          // 2. Format interactive buttons markup
          const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
          const text = `🔔 *New AI Update Found!*\n\n*Source*: ${source}\n*Title*: ${item.title || 'Untitled'}\n\nIngest this article to your live database?`;
          
          const payload = {
            chat_id: chatId,
            text,
            parse_mode: 'Markdown',
            reply_markup: {
              inline_keyboard: [
                [
                  { text: '✅ Accept & Save to DB', callback_data: `accept_${saved.id}` },
                  { text: '🚀 Go Live (Deploy)', callback_data: `deploy_${saved.id}` }
                ]
              ]
            }
          };

          // 3. Send notification payload
          const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            const errBody = await response.text();
            console.error(`Telegram sendMessage failed: ${response.status}`, errBody);
          } else {
            alertsSent.push(item.title);
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      alertsSent
    });

  } catch (error) {
    console.error("Monitor handler crash:", error);
    return res.status(500).json({ error: error.message });
  }
}
