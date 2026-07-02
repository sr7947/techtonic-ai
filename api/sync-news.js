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
  const summaryLogs = [];

  try {
    // 1. Fetch active sources from Supabase
    const { data: sources, error: sourceErr } = await supabase
      .from('ai_sources')
      .select('*');

    if (sourceErr || !sources) {
      throw new Error(`Failed to load sources from Supabase: ${sourceErr?.message}`);
    }

    // 2. Loop through each source and ingest
    for (const source of sources) {
      const sourceStart = new Date();
      let fetchStatus = 'success';
      let articlesCount = 0;
      let errorMsg = null;

      try {
        console.log(`Starting fetch for ${source.name} from ${source.feed_url}`);
        
        // Fetch XML feed
        const feed = await parser.parseURL(source.feed_url);
        
        // Loop through feed items
        for (const item of feed.items) {
          const articleUrl = item.link || item.guid;
          if (!articleUrl) continue;

          // Generate hash to help with quick deduplication checks
          const contentHash = crypto
            .createHash('md5')
            .update(articleUrl)
            .digest('hex');

          // Extract summary/description
          let rawSummary = item.contentSnippet || item.summary || item.contentEncoded || '';
          
          // Clean HTML tags and truncate summary
          let cleanSummary = rawSummary
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/\s+/g, ' ')
            .trim();
            
          if (cleanSummary.length > 280) {
            cleanSummary = cleanSummary.substring(0, 277) + '...';
          }

          // Build published date
          let publishedAt = new Date();
          if (item.pubDate || item.isoDate) {
            publishedAt = new Date(item.pubDate || item.isoDate);
          }

          // Prepare article insertion payload matching DB table columns
          const payload = {
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
          };

          // Upsert to Supabase (using ON CONFLICT DO NOTHING by utilizing upsert with ignoreDuplicates)
          const { error: insertErr } = await supabase
            .from('ai_articles')
            .upsert(payload, { onConflict: 'article_url', ignoreDuplicates: true });

          if (!insertErr) {
            articlesCount++;
          }
        }
      } catch (err) {
        console.error(`Error fetching source ${source.name}:`, err);
        fetchStatus = 'error';
        errorMsg = err.message || 'Unknown network parsing error';
      }

      // Log fetch job details to Supabase
      await supabase.from('ai_fetch_logs').insert({
        source_name: source.name,
        status: fetchStatus,
        articles_fetched: articlesCount,
        error_message: errorMsg,
        started_at: sourceStart.toISOString(),
        completed_at: new Date().toISOString()
      });

      summaryLogs.push({
        source: source.name,
        status: fetchStatus,
        inserted: articlesCount,
        error: errorMsg
      });
    }

    return res.status(200).json({
      success: true,
      timeTakenMs: new Date() - startTime,
      logs: summaryLogs
    });

  } catch (globalErr) {
    console.error('Global sync execution error:', globalErr);
    return res.status(500).json({
      success: false,
      error: globalErr.message
    });
  }
}
