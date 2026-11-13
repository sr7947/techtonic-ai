import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';
import { DEFAULT_OFFICIAL_SOURCES } from './sync-news.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const parser = new Parser({
  timeout: 7000,
  customFields: {
    item: [
      ['content:encoded', 'contentEncoded'],
      ['dc:creator', 'creator'],
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure']
    ]
  }
});

// Maximum age of article to alert on (72 hours = 3 days)
const MAX_ITEM_AGE_HOURS = 72;

// Normalize URL by removing protocol, www, trailing slashes, and tracking query params
function normalizeUrl(rawUrl) {
  if (!rawUrl) return '';
  try {
    const u = new URL(rawUrl);
    const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'ref', 'source', 'fbclid', 'gclid'];
    for (const p of trackingParams) {
      u.searchParams.delete(p);
    }
    // Also remove any parameter starting with utm_
    for (const key of Array.from(u.searchParams.keys())) {
      if (key.toLowerCase().startsWith('utm_')) {
        u.searchParams.delete(key);
      }
    }
    const cleanHost = u.hostname.toLowerCase().replace(/^www\./, '');
    const cleanPath = u.pathname.replace(/\/+$/, '');
    const search = u.searchParams.toString();
    return `${cleanHost}${cleanPath}${search ? '?' + search : ''}`;
  } catch {
    return rawUrl.trim().toLowerCase().replace(/^https?:\/\/(?:www\.)?/, '').replace(/\/+$/, '');
  }
}

// Normalize Title to prevent duplicate alerts from minor punctuation or spacing differences
function normalizeTitle(rawTitle) {
  if (!rawTitle) return '';
  return rawTitle
    .toLowerCase()
    .replace(/[\u2018\u2019\u201C\u201D]/g, "'") // curly quotes
    .replace(/[\u2013\u2014]/g, '-') // dashes
    .replace(/[^a-z0-9]/g, '') // remove non-alphanumeric
    .trim();
}

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

    // 2. Preload known URLs and Titles in ONE single batch from Supabase to prevent 100+ DB round-trips
    const fourteenDaysAgo = new Date(Date.now() - (14 * 24 * 60 * 60 * 1000)).toISOString();

    const [liveArticlesRes, pendingArticlesRes] = await Promise.all([
      supabase.from('ai_articles').select('title, article_url').gte('created_at', fourteenDaysAgo),
      supabase.from('pending_articles').select('title, article_url')
    ]);

    const knownUrls = new Set();
    const knownTitles = new Set();

    for (const a of (liveArticlesRes.data || [])) {
      if (a.article_url) knownUrls.add(normalizeUrl(a.article_url));
      if (a.title) knownTitles.add(normalizeTitle(a.title));
    }
    for (const p of (pendingArticlesRes.data || [])) {
      if (p.article_url) knownUrls.add(normalizeUrl(p.article_url));
      if (p.title) knownTitles.add(normalizeTitle(p.title));
    }

    console.log(`Preloaded ${knownUrls.size} known URLs and ${knownTitles.size} known Titles for deduplication.`);

    // 3. Scan all 40+ sources in parallel with individual timeouts
    const fetchPromises = sources.map(async (source) => {
      try {
        const feed = await parser.parseURL(source.feed_url);
        return { source, items: feed.items || [] };
      } catch (err) {
        console.warn(`Failed to parse feed for ${source.name} (${source.feed_url}):`, err.message);
        return { source, items: [] };
      }
    });

    const feedResults = await Promise.all(fetchPromises);
    const alertsSent = [];
    const now = Date.now();

    // 4. Process scanned items in order of publication recency
    for (const { source, items } of feedResults) {
      // Check top 3 newest items from each feed
      for (const item of items.slice(0, 3)) {
        const articleUrl = item.link || item.guid || '';
        if (!articleUrl) continue;

        // Recency verification: skip posts older than MAX_ITEM_AGE_HOURS (72h)
        let publishedAt = null;
        if (item.pubDate || item.isoDate) {
          publishedAt = new Date(item.pubDate || item.isoDate);
        }
        if (!publishedAt || isNaN(publishedAt.getTime())) {
          publishedAt = new Date();
        }

        const ageHours = (now - publishedAt.getTime()) / (1000 * 60 * 60);
        if (ageHours > MAX_ITEM_AGE_HOURS) {
          continue; // Skip older articles from inactive blogs
        }

        // Canonical Deduplication check against known URLs and Titles
        const normUrl = normalizeUrl(articleUrl);
        const normTitle = normalizeTitle(item.title);

        if (knownUrls.has(normUrl) || (normTitle && knownTitles.has(normTitle))) {
          // Already staged, live, or captured earlier in this batch
          continue;
        }

        // Register in known sets IMMEDIATELY to prevent duplicate alerts from co-published feeds in this run
        knownUrls.add(normUrl);
        if (normTitle) knownTitles.add(normTitle);

        console.log(`[Staging New Article] Source: ${source.name} | Title: "${item.title}"`);

        // Extract authentic media image
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

        // Clean summary
        let cleanSummary = (item.contentSnippet || item.summary || 'Official announcement and release notes.')
          .replace(/<\/?[^>]+(>|$)/g, '')
          .replace(/\s+/g, ' ')
          .trim();
        if (cleanSummary.length > 320) {
          cleanSummary = cleanSummary.substring(0, 317) + '...';
        }

        // Stage in pending_articles table
        const { data: saved, error: stageErr } = await supabase
          .from('pending_articles')
          .insert([{
            title: item.title || 'Untitled Article',
            summary: cleanSummary,
            article_url: articleUrl,
            source_name: source.name,
            image_url: mediaImageUrl,
            published_at: publishedAt.toISOString()
          }])
          .select()
          .single();

        if (stageErr || !saved) {
          console.error("Failed to stage pending article:", stageErr?.message);
          continue;
        }

        // Format Telegram notification with 1-tap buttons
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
