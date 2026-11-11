import Parser from 'rss-parser';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

function generateThemedImageUrl(_title) {
  // Return null to avoid hitting third-party rate limits (like pollinations.ai 45s cooldown)
  // Cards without authentic images will cleanly render the official WenzdayLab brand banner
  return null;
}

// Initialize Supabase client
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

// Enforce 7-day maximum age window (168 hours)
const MAX_ITEM_AGE_HOURS = parseInt(process.env.MAX_ITEM_AGE_HOURS || '168', 10);

// Whitelist of keywords to keep articles focused on AI and Tech
const WHITELIST_KEYWORDS = [
  "ai", "artificial intelligence", "machine learning", "ml", "deep learning", 
  "llm", "generative", "chatbot", "gpt", "claude", "gemini", "copilot", 
  "transformer", "neural network", "gpu", "chip", "semiconductor", "robotics", "autonomous",
  "agentic", "agent", "supercomputing", "openai", "deepmind", "anthropic", "nvidia",
  "reasoning", "diffusion", "vision", "speech", "multimodal", "inference", "benchmark"
];

// Blacklist of keywords to discard noise/hiring/deals posts
const BLACKLIST_KEYWORDS = [
  "job", "hiring", "careers", "sponsored", "advertorial", "coupon", 
  "discount", "sale", "webinar replay", "newsletter subscription"
];

// 43 Official Sources Seed List
export const DEFAULT_OFFICIAL_SOURCES = [
  { name: 'OpenAI', feed_url: 'https://openai.com/news/rss.xml', site_url: 'https://openai.com/news/', category: 'AI Labs', logo_color: 'from-[#10a37f] to-[#0d7c60]' },
  { name: 'Anthropic', feed_url: 'https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/anthropic.xml', site_url: 'https://www.anthropic.com/news', category: 'AI Labs', logo_color: 'from-[#D97706] to-[#B45309]' },
  { name: 'Google DeepMind', feed_url: 'https://deepmind.google/blog/rss.xml', site_url: 'https://deepmind.google/blog/', category: 'Research', logo_color: 'from-[#4285F4] to-[#0f9d58]' },
  { name: 'Google AI Blog', feed_url: 'https://blog.google/technology/ai/rss/', site_url: 'https://blog.google/innovation-and-ai/technology/ai/', category: 'Research', logo_color: 'from-[#4285F4] to-[#34A853]' },
  { name: 'Amazon AI News', feed_url: 'https://www.aboutamazon.com/news/tag/artificial-intelligence/feed', site_url: 'https://www.aboutamazon.com/artificial-intelligence-ai-news', category: 'Enterprise AI', logo_color: 'from-[#FF9900] to-[#CC7A00]' },
  { name: 'Microsoft AI Blog', feed_url: 'https://blogs.microsoft.com/feed/', site_url: 'https://microsoft.ai/blog/', category: 'Enterprise AI', logo_color: 'from-[#00A4EF] to-[#0078D7]' },
  { name: 'Microsoft Source AI', feed_url: 'https://news.microsoft.com/source/tag/ai/feed/', site_url: 'https://news.microsoft.com/source/tag/ai/', category: 'Enterprise AI', logo_color: 'from-[#00A4EF] to-[#005A9E]' },
  { name: 'Microsoft Copilot Blog', feed_url: 'https://blogs.microsoft.com/feed/?tag=copilot', site_url: 'https://www.microsoft.com/en-us/copilot/blog/', category: 'Enterprise AI', logo_color: 'from-[#0078D4] to-[#104A7B]' },
  { name: 'Meta AI', feed_url: 'https://ai.meta.com/blog/rss.xml', site_url: 'https://ai.meta.com/blog/', category: 'Research', logo_color: 'from-[#0668E1] to-[#004BB7]' },
  { name: 'xAI', feed_url: 'https://x.ai/blog/rss.xml', site_url: 'https://x.ai/news', category: 'AI Labs', logo_color: 'from-[#000000] to-[#1F2937]' },
  { name: 'NVIDIA Newsroom', feed_url: 'https://nvidianews.nvidia.com/releases.xml', site_url: 'https://nvidianews.nvidia.com', category: 'Hardware & AI', logo_color: 'from-[#76B900] to-[#558200]' },
  { name: 'NVIDIA GenAI Blog', feed_url: 'https://blogs.nvidia.com/blog/category/generative-ai/feed/', site_url: 'https://blogs.nvidia.com/blog/category/generative-ai', category: 'Hardware & AI', logo_color: 'from-[#76B900] to-[#4A7200]' },
  { name: 'NVIDIA Developer Blog', feed_url: 'https://developer.nvidia.com/blog/feed/', site_url: 'https://developer.nvidia.com/blog', category: 'Developer Tools', logo_color: 'from-[#76B900] to-[#3B5B00]' },
  { name: 'DeepSeek News', feed_url: 'https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/deepseek.xml', site_url: 'https://www.deepseek.com/en/news/', category: 'AI Labs', logo_color: 'from-[#1E40AF] to-[#172554]' },
  { name: 'DeepSeek Blog', feed_url: 'https://deepseek.ai/feed.xml', site_url: 'https://deepseek.ai/blog', category: 'AI Labs', logo_color: 'from-[#2563EB] to-[#1E3A8A]' },
  { name: 'MiniMax Blog', feed_url: 'https://www.minimax.cn/blog/rss.xml', site_url: 'https://www.minimax.cn/blog', category: 'AI Labs', logo_color: 'from-[#EA580C] to-[#C2410C]' },
  { name: 'MiniMax News', feed_url: 'https://www.minimax.io/news/rss.xml', site_url: 'https://www.minimax.io/news', category: 'AI Labs', logo_color: 'from-[#F97316] to-[#9A3412]' },
  { name: 'Moonshot Kimi', feed_url: 'https://www.kimi.com/blog/rss.xml', site_url: 'https://www.kimi.com/blog/', category: 'AI Labs', logo_color: 'from-[#6366F1] to-[#4338CA]' },
  { name: 'Tencent Hunyuan', feed_url: 'https://hy.tencent.ai/research/rss.xml', site_url: 'https://hy.tencent.ai/research?page=1', category: 'Research', logo_color: 'from-[#0284C7] to-[#0369A1]' },
  { name: 'Qwen AI', feed_url: 'https://qwen.ai/blog/rss.xml', site_url: 'https://qwen.ai/news', category: 'AI Labs', logo_color: 'from-[#6D28D9] to-[#4C1D95]' },
  { name: 'ByteDance Seed', feed_url: 'https://seed.bytedance.com/rss.xml', site_url: 'https://seed.bytedance.com/en/', category: 'Research', logo_color: 'from-[#3B82F6] to-[#1D4ED8]' },
  { name: 'Hugging Face', feed_url: 'https://huggingface.co/blog/feed.xml', site_url: 'https://huggingface.co/blog', category: 'Developer Tools', logo_color: 'from-[#FBBF24] to-[#F59E0B]' },
  { name: 'Cursor Blog', feed_url: 'https://cursor.com/blog/rss.xml', site_url: 'https://cursor.com/blog', category: 'Developer Tools', logo_color: 'from-[#18181B] to-[#27272A]' },
  { name: 'Ollama Blog', feed_url: 'https://ollama.com/blog.atom', site_url: 'https://ollama.com/blog', category: 'Developer Tools', logo_color: 'from-[#27272A] to-[#09090B]' },
  { name: 'Krea AI', feed_url: 'https://www.krea.ai/blog/rss.xml', site_url: 'https://www.krea.ai/blog', category: 'Creative AI', logo_color: 'from-[#EC4899] to-[#BE185D]' },
  { name: 'Cohere Blog', feed_url: 'https://cohere.com/blog/rss.xml', site_url: 'https://cohere.com/blog', category: 'Enterprise AI', logo_color: 'from-[#39594D] to-[#1E2E28]' },
  { name: 'TypeSafe AI', feed_url: 'https://typesafe.ai/blog/rss.xml', site_url: 'https://typesafe.ai/blog', category: 'Developer Tools', logo_color: 'from-[#0D9488] to-[#0F766E]' },
  { name: 'Higgsfield AI', feed_url: 'https://higgsfield.ai/blog/news/rss.xml', site_url: 'https://higgsfield.ai/blog/news', category: 'Creative AI', logo_color: 'from-[#8B5CF6] to-[#6D28D9]' },
  { name: 'Databricks Newsroom', feed_url: 'https://www.databricks.com/feed.xml', site_url: 'https://www.databricks.com/company/newsroom', category: 'Enterprise AI', logo_color: 'from-[#FF3621] to-[#D92D1B]' },
  { name: 'OpenRouter Blog', feed_url: 'https://openrouter.ai/blog/rss.xml', site_url: 'https://openrouter.ai/blog/announcements/', category: 'Developer Tools', logo_color: 'from-[#6366F1] to-[#4F46E5]' },
  { name: 'Vercel News', feed_url: 'https://vercel.com/atom', site_url: 'https://vercel.com/blog/category/company-news', category: 'Developer Tools', logo_color: 'from-[#000000] to-[#262626]' },
  { name: 'OpenCode', feed_url: 'https://www.opencode.asia/news/rss.xml', site_url: 'https://www.opencode.asia/news/', category: 'Developer Tools', logo_color: 'from-[#059669] to-[#047857]' },
  { name: 'Replit News', feed_url: 'https://blog.replit.com/feed.xml', site_url: 'https://replit.com/news', category: 'Developer Tools', logo_color: 'from-[#F26207] to-[#C84B00]' },
  { name: 'Lovable Blog', feed_url: 'https://lovable.dev/blog/rss.xml', site_url: 'https://lovable.dev/blog', category: 'Developer Tools', logo_color: 'from-[#F43F5E] to-[#E11D48]' },
  { name: 'Oracle AI News', feed_url: 'https://www.oracle.com/news/rss/', site_url: 'https://www.oracle.com/in/news/', category: 'Enterprise AI', logo_color: 'from-[#C74634] to-[#992E21]' },
  { name: 'Mistral AI', feed_url: 'https://mistral.ai/news/index.xml', site_url: 'https://mistral.ai/news/', category: 'AI Labs', logo_color: 'from-[#FF7000] to-[#CC5800]' },
  { name: 'Perplexity Blog', feed_url: 'https://www.perplexity.ai/hub/blog/rss.xml', site_url: 'https://www.perplexity.ai/hub/blog/category/news', category: 'AI Labs', logo_color: 'from-[#20808D] to-[#135962]' },
  { name: 'Manus AI', feed_url: 'https://manus.im/blog/rss.xml', site_url: 'https://manus.im/blog', category: 'AI Labs', logo_color: 'from-[#4F46E5] to-[#3730A3]' },
  { name: 'OpenClaw Blog', feed_url: 'https://openclaw.ai/blog/rss.xml', site_url: 'https://openclaw.ai/blog', category: 'Developer Tools', logo_color: 'from-[#D946EF] to-[#A21CAF]' },
  { name: 'OpenClaw Press', feed_url: 'https://openclaw.ai/press/rss.xml', site_url: 'https://openclaw.ai/press', category: 'Media', logo_color: 'from-[#C026D3] to-[#86198F]' },
  { name: 'Hermes AI', feed_url: 'https://hermes-ai.net/news/rss.xml', site_url: 'https://hermes-ai.net/news/', category: 'AI Labs', logo_color: 'from-[#14B8A6] to-[#0D9488]' },
  { name: 'World Labs', feed_url: 'https://worldlabs.ai/blog/rss.xml', site_url: 'https://worldlabs.ai/blog', category: 'Creative AI', logo_color: 'from-[#6366F1] to-[#312E81]' },
  { name: 'LangChain Blog', feed_url: 'https://blog.langchain.dev/rss/', site_url: 'https://www.langchain.com/blog', category: 'Developer Tools', logo_color: 'from-[#00A86B] to-[#007F50]' }
];

export default async function handler(req, res) {
  const cronAuth = req.headers.authorization;
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && cronAuth !== `Bearer ${cronSecret}`) {
    return res.status(401).json({ error: 'Unauthorized CRON trigger' });
  }

  const startTime = new Date();

  try {
    // 1. Fetch active sources from Supabase
    let { data: dbSources } = await supabase.from('ai_sources').select('*');

    // If database is fresh or empty, auto-seed the official 43 sources
    if (!dbSources || dbSources.length === 0) {
      console.log("Seeding official sources into ai_sources table...");
      const { data: newSources } = await supabase
        .from('ai_sources')
        .upsert(DEFAULT_OFFICIAL_SOURCES, { onConflict: 'name' })
        .select();
      dbSources = newSources || DEFAULT_OFFICIAL_SOURCES;
    }

    const sources = [...(dbSources || [])];

    // 2. Fetch existing titles from the last 7 days for deduplication
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const { data: recentArticles } = await supabase
      .from('ai_articles')
      .select('title, article_url')
      .gt('published_at', sevenDaysAgo.toISOString());
      
    const recentTitlesSet = new Set(
      (recentArticles || []).map(a => (a.title || '').toLowerCase().trim())
    );

    const { data: recentUrlsPending } = await supabase
      .from('pending_articles')
      .select('article_url');

    const recentUrlsSet = new Set([
      ...(recentArticles || []).map(a => a.article_url),
      ...(recentUrlsPending || []).map(a => a.article_url)
    ]);

    // 3. Process all sources with individual timeouts
    const promises = sources.map(async (source) => {
      const sourceStart = new Date();
      let fetchStatus = 'success';
      let articlesCount = 0;
      let errorMsg = null;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6500);

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

          // Title & URL deduplication
          const lowerTitle = (item.title || '').toLowerCase().trim();
          if (recentTitlesSet.has(lowerTitle) || recentUrlsSet.has(articleUrl)) {
            continue;
          }

          // Summary cleanup
          let rawSummary = item.contentSnippet || item.summary || item.contentEncoded || '';
          let cleanSummary = rawSummary
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/\s+/g, ' ')
            .trim();

          if (cleanSummary.length > 320) {
            cleanSummary = cleanSummary.substring(0, 317) + '...';
          }

          // Date validation (must be within last 7 days)
          let publishedAt = null;
          if (item.pubDate || item.isoDate) {
            publishedAt = new Date(item.pubDate || item.isoDate);
          }
          if (!publishedAt || isNaN(publishedAt.getTime())) {
            publishedAt = new Date();
          }

          const itemAgeHours = (new Date() - publishedAt) / (1000 * 60 * 60);
          if (itemAgeHours > MAX_ITEM_AGE_HOURS) {
            continue; // Skip items older than 7 days
          }

          // Extract original media image or enclosure
          let mediaImageUrl = null;
          if (item.enclosure && item.enclosure.url && item.enclosure.type?.includes('image')) {
            mediaImageUrl = item.enclosure.url;
          } else if (item.mediaContent && item.mediaContent.$ && item.mediaContent.$.url) {
            mediaImageUrl = item.mediaContent.$.url;
          } else {
            // Check for <img> tag inside contentEncoded or summary
            const imgMatch = (rawSummary + (item.contentEncoded || '')).match(/<img[^>]+src=["']([^"']+)["']/i);
            if (imgMatch && imgMatch[1]) {
              mediaImageUrl = imgMatch[1];
            }
          }

          if (!mediaImageUrl) {
            mediaImageUrl = generateThemedImageUrl(item.title);
          }

          // Content hash
          const contentHash = crypto
            .createHash('md5')
            .update(articleUrl)
            .digest('hex');

          articlesPayload.push({
            source_id: source.id,
            source_name: source.name,
            source_type: 'RSS',
            title: item.title || 'Untitled Update',
            summary: cleanSummary || 'Official announcement and release notes.',
            article_url: articleUrl,
            published_at: publishedAt.toISOString(),
            author: item.creator || item.author || source.name,
            category: source.category,
            image_url: mediaImageUrl,
            content_hash: contentHash,
            fetched_at: new Date().toISOString()
          });
        }

        // Stage in pending_articles & prompt Telegram bot
        if (articlesPayload.length > 0) {
          for (const article of articlesPayload) {
            const { data: saved, error: stageErr } = await supabase
              .from('pending_articles')
              .insert([{
                title: article.title,
                summary: article.summary,
                article_url: article.article_url,
                source_name: `${article.source_name}::${article.category}`,
                image_url: article.image_url,
                published_at: article.published_at
              }])
              .select()
              .single();

            if (stageErr || !saved) {
              console.error("Failed to stage pending article:", stageErr?.message);
              continue;
            }

            const token = process.env.TELEGRAM_BOT_TOKEN;
            const chatId = process.env.TELEGRAM_CHAT_ID;
            if (token && chatId) {
              const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
              const text = `🔔 *New Official AI Update Found!*\n\n*Source*: ${article.source_name}\n*Category*: ${article.category}\n*Title*: ${article.title || 'Untitled'}\n*Date*: ${new Date(article.published_at).toLocaleDateString()}\n\n*Summary*: ${article.summary}\n\n*Link*: ${article.article_url}\n\nApprove or reject this news for WenzdayLab?`;
              
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

              await fetch(telegramUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
            }
          }
          articlesCount = articlesPayload.length;
        }
      } catch (err) {
        console.error(`Error fetching source ${source.name}:`, err);
        fetchStatus = 'error';
        errorMsg = err.name === 'AbortError' ? 'Fetch timeout exceeded (6.5s)' : err.message;
      }

      // Log results to Supabase audit table
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
