import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseKey || '');

const OFFICIAL_SOURCES = [
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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    console.log("Starting Supabase database reset...");

    // 1. Delete rows from dynamic content tables
    await supabase.from('ai_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('pending_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('trending_tweets').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('ai_fetch_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // 2. Clear old sources and re-seed the 43 official sources
    await supabase.from('ai_sources').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const { data: seeded, error: seedErr } = await supabase
      .from('ai_sources')
      .upsert(OFFICIAL_SOURCES, { onConflict: 'name' })
      .select();

    if (seedErr) {
      console.error("Failed to seed official sources:", seedErr.message);
      return res.status(500).json({ error: `Failed to seed sources: ${seedErr.message}` });
    }

    return res.status(200).json({
      success: true,
      message: 'Supabase database successfully reset and seeded with 43 official sources.',
      sourcesCount: seeded?.length || OFFICIAL_SOURCES.length
    });
  } catch (err) {
    console.error("Database reset error:", err);
    return res.status(500).json({ error: err.message });
  }
}
