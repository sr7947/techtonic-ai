import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Initialize Supabase client
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

// Configurable constants via environment variables
const MAX_ITEM_AGE_HOURS = parseInt(process.env.MAX_ITEM_AGE_HOURS || '72', 10);

// Whitelist of keywords to keep articles focused on AI and Tech
const WHITELIST_KEYWORDS = [
  "ai", "artificial intelligence", "machine learning", "ml", "deep learning", 
  "llm", "generative", "chatbot", "gpt", "claude", "gemini", "copilot", 
  "transformer", "neural network", "gpu", "chip", "semiconductor", "robotics", "autonomous",
  "agentic", "agent", "supercomputing", "openai", "deepmind", "anthropic", "nvidia"
];

// Blacklist of keywords to discard noise/hiring/deals posts
const BLACKLIST_KEYWORDS = [
  "job", "hiring", "careers", "sponsored", "advertorial", "coupon", 
  "discount", "sale", "webinar replay", "podcast transcript", "newsletter subscription"
];

export default async function handler(req, res) {
  // Optional cron token verification for Vercel Cron Jobs security
  const cronAuth = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && cronAuth !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized CRON trigger' });
  }

  const startTime = new Date();

  try {
    // 1. Fetch active sources from Supabase
    const { data: dbSources, error: sourceErr } = await supabase
      .from('ai_sources')
      .select('*');

    if (sourceErr || !dbSources) {
      throw new Error(`Failed to load sources from Supabase: ${sourceErr?.message || 'Empty response'}`);
    }

    const sources = [...dbSources];

    // Seed missing premium sources programmatically
    const defaultSources = [
      { name: 'TechCrunch AI', feed_url: 'https://techcrunch.com/category/artificial-intelligence/feed/', site_url: 'https://techcrunch.com', category: 'Media', logo_color: 'from-[#00A35C] to-[#00703C]' },
      { name: 'MIT Tech Review AI', feed_url: 'https://www.technologyreview.com/topic/artificial-intelligence/feed/', site_url: 'https://www.technologyreview.com', category: 'Research', logo_color: 'from-[#FF5A00] to-[#E04E00]' },
      { name: 'VentureBeat AI', feed_url: 'https://venturebeat.com/category/ai/feed/', site_url: 'https://venturebeat.com', category: 'Media', logo_color: 'from-[#DA291C] to-[#A61C12]' }
    ];

    for (const dSrc of defaultSources) {
      const exists = sources.some(s => s.feed_url === dSrc.feed_url || s.name === dSrc.name);
      if (!exists) {
        console.log(`Seeding missing premium source: ${dSrc.name}`);
        const { data: newSrc, error: seedErr } = await supabase
          .from('ai_sources')
          .insert([dSrc])
          .select()
          .maybeSingle();
        if (newSrc && !seedErr) {
          sources.push(newSrc);
        }
      }
    }

    // 2. Fetch existing titles from the last 7 days for case-insensitive deduplication
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { data: recentArticles } = await supabase
      .from('ai_articles')
      .select('title')
      .gt('published_at', sevenDaysAgo.toISOString());
      
    const recentTitlesSet = new Set(
      (recentArticles || []).map(a => (a.title || '').toLowerCase().trim())
    );

    // 3. Process all sources in parallel
    const promises = sources.map(async (source) => {
      const sourceStart = new Date();
      let fetchStatus = 'success';
      let articlesCount = 0;
      let errorMsg = null;

      try {
        // Individual 6-second timeout to prevent blocking Vercel serverless function
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(source.feed_url, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);
        const articlesPayload = [];

        for (const item of feed.items) {
          const articleUrl = item.link || item.guid;
          if (!articleUrl) continue;

          // Title-based case-insensitive deduplication
          const lowerTitle = (item.title || '').toLowerCase().trim();
          if (recentTitlesSet.has(lowerTitle)) {
            continue;
          }

          // Clean HTML tags and truncate summary
          let rawSummary = item.contentSnippet || item.summary || item.contentEncoded || '';
          let cleanSummary = rawSummary
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/\s+/g, ' ')
            .trim();

          if (cleanSummary.length > 280) {
            cleanSummary = cleanSummary.substring(0, 277) + '...';
          }

          // Freshness validation (MAX_ITEM_AGE_HOURS)
          let publishedAt = null;
          if (item.pubDate || item.isoDate) {
            publishedAt = new Date(item.pubDate || item.isoDate);
          }
          if (!publishedAt || isNaN(publishedAt.getTime())) {
            continue; // Skip items with invalid timestamps
          }

          const itemAgeHours = (new Date() - publishedAt) / (1000 * 60 * 60);
          if (itemAgeHours > MAX_ITEM_AGE_HOURS) {
            continue; // Skip stale items older than the threshold
          }

          // Relevance Whitelist & Blacklist check on Title + Summary
          const combinedText = `${item.title || ''} ${cleanSummary}`.toLowerCase();
          
          const matchesWhitelist = WHITELIST_KEYWORDS.some(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(combinedText) || combinedText.includes(keyword);
          });
          
          if (!matchesWhitelist) {
            continue; // Drop non-AI/tech articles
          }

          const matchesBlacklist = BLACKLIST_KEYWORDS.some(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'i');
            return regex.test(combinedText) || combinedText.includes(keyword);
          });

          if (matchesBlacklist) {
            continue; // Drop noise/sponsored articles
          }

          // Deduplication Hash
          const contentHash = crypto
            .createHash('md5')
            .update(articleUrl)
            .digest('hex');

          articlesPayload.push({
            source_id: source.id,
            source_name: source.name,
            source_type: 'RSS',
            title: item.title || 'Untitled Update',
            summary: cleanSummary || 'No summary available.',
            article_url: articleUrl,
            published_at: publishedAt.toISOString(),
            author: item.creator || item.author || source.name,
            category: source.category,
            content_hash: contentHash,
            fetched_at: new Date().toISOString()
          });
        }

        // Perform bulk upsert for all matched articles in this feed
        if (articlesPayload.length > 0) {
          const { error: insertErr } = await supabase
            .from('ai_articles')
            .upsert(articlesPayload, { onConflict: 'article_url', ignoreDuplicates: true });

          if (!insertErr) {
            articlesCount = articlesPayload.length;
          } else {
            throw new Error(`Supabase bulk insert error: ${insertErr.message}`);
          }
        }
      } catch (err) {
        console.error(`Error fetching source ${source.name}:`, err);
        fetchStatus = 'error';
        errorMsg = err.name === 'AbortError' ? 'Fetch timeout exceeded (6s)' : err.message;
      }

      // Log results to Supabase audit tables
      try {
        await supabase.from('ai_fetch_logs').insert({
          source_name: source.name,
          status: fetchStatus,
          articles_fetched: articlesCount,
          error_message: errorMsg,
          started_at: sourceStart.toISOString(),
          completed_at: new Date().toISOString()
        });
      } catch (logErr) {
        console.error("Failed to write to ai_fetch_logs:", logErr);
      }

      return {
        source: source.name,
        status: fetchStatus,
        inserted: articlesCount,
        error: errorMsg
      };
    });

    const results = await Promise.all(promises);

    // Prune articles older than 7 days to maintain 7-day retention policy
    const pruneThreshold = new Date();
    pruneThreshold.setDate(pruneThreshold.getDate() - 7);
    
    const { error: purgeErr } = await supabase
      .from('ai_articles')
      .delete()
      .lt('published_at', pruneThreshold.toISOString());

    if (purgeErr) {
      console.error("Failed to prune old articles:", purgeErr);
    }

    return res.status(200).json({
      success: true,
      timeTakenMs: new Date() - startTime,
      logs: results
    });

  } catch (globalErr) {
    console.error('Global sync execution error:', globalErr);
    return res.status(500).json({
      success: false,
      error: globalErr.message
    });
  }
}
