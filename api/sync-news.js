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
    const { data: sources, error: sourceErr } = await supabase
      .from('ai_sources')
      .select('*');

    if (sourceErr || !sources) {
      throw new Error(`Failed to load sources from Supabase: ${sourceErr?.message || 'Empty response'}`);
    }

    // 2. Process all sources in parallel (safeguards against Vercel 10s serverless timeout)
    const promises = sources.map(async (source) => {
      const sourceStart = new Date();
      let fetchStatus = 'success';
      let articlesCount = 0;
      let errorMsg = null;

      try {
        // Individual 6-second timeout using AbortController to prevent slow feeds from blocking the function
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

          // Deduplication hash
          const contentHash = crypto
            .createHash('md5')
            .update(articleUrl)
            .digest('hex');

          // Clean HTML tags and truncate summary
          let rawSummary = item.contentSnippet || item.summary || item.contentEncoded || '';
          let cleanSummary = rawSummary
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/\s+/g, ' ')
            .trim();

          if (cleanSummary.length > 280) {
            cleanSummary = cleanSummary.substring(0, 277) + '...';
          }

          let publishedAt = new Date();
          if (item.pubDate || item.isoDate) {
            publishedAt = new Date(item.pubDate || item.isoDate);
          }

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

        // Perform bulk upsert for all articles in this feed (reduces Supabase roundtrips from 400 down to 8!)
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
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { error: purgeErr } = await supabase
      .from('ai_articles')
      .delete()
      .lt('published_at', sevenDaysAgo.toISOString());

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
