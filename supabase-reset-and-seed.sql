-- ============================================================================
-- SQL Schema: TechTonic AI Database Reset & Source Seeding
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor)
-- This will wipe old data and seed the 43 official AI news sources.
-- ============================================================================

-- 1. Ensure required extensions exist
create extension if not exists "uuid-ossp";

-- 2. Create ai_sources table
create table if not exists public.ai_sources (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  feed_url text not null unique,
  site_url text,
  category text not null,
  logo_color text,
  created_at timestamptz default now()
);

-- 3. Create ai_articles table (Production live approved news)
create table if not exists public.ai_articles (
  id uuid default gen_random_uuid() primary key,
  source_id uuid references public.ai_sources(id) on delete set null,
  source_name text not null,
  source_type text not null default 'RSS',
  title text not null,
  summary text not null,
  article_url text not null unique,
  published_at timestamptz not null,
  author text,
  category text,
  image_url text,
  video_url text,
  content_hash text,
  fetched_at timestamptz default now(),
  created_at timestamptz default now()
);

-- 4. Create pending_articles table (Staging queue for Telegram bot approval/rejection)
create table if not exists public.pending_articles (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text not null,
  article_url text not null,
  source_name text not null,
  image_url text,
  video_url text,
  published_at timestamptz not null,
  created_at timestamptz default now()
);

-- 5. Create trending_tweets table (Twitter/X posts for Trending tab)
create table if not exists public.trending_tweets (
  id uuid default gen_random_uuid() primary key,
  tag text not null default '#AI',
  tweet_url text not null,
  created_at timestamptz default now()
);

-- 6. Create ai_fetch_logs table (Auditing fetch jobs)
create table if not exists public.ai_fetch_logs (
  id uuid default gen_random_uuid() primary key,
  source_name text not null,
  status text not null,
  articles_fetched integer not null default 0,
  error_message text,
  started_at timestamptz default now(),
  completed_at timestamptz default now()
);

-- 7. Create indexes for performance
create index if not exists idx_articles_published_at on public.ai_articles (published_at desc);
create index if not exists idx_articles_source_name on public.ai_articles (source_name);
create index if not exists idx_tweets_created_at on public.trending_tweets (created_at desc);
create index if not exists idx_pending_created_at on public.pending_articles (created_at desc);

-- 8. Enable Row Level Security (RLS)
alter table public.ai_sources enable row level security;
alter table public.ai_articles enable row level security;
alter table public.pending_articles enable row level security;
alter table public.trending_tweets enable row level security;
alter table public.ai_fetch_logs enable row level security;

-- 9. Setup Public Read and Authorized Write Policies
drop policy if exists "Allow public read access on sources" on public.ai_sources;
create policy "Allow public read access on sources" on public.ai_sources for select using (true);
drop policy if exists "Allow all access on sources" on public.ai_sources;
create policy "Allow all access on sources" on public.ai_sources for all using (true) with check (true);

drop policy if exists "Allow public read access on articles" on public.ai_articles;
create policy "Allow public read access on articles" on public.ai_articles for select using (true);
drop policy if exists "Allow all access on articles" on public.ai_articles;
create policy "Allow all access on articles" on public.ai_articles for all using (true) with check (true);

drop policy if exists "Allow public read access on pending" on public.pending_articles;
create policy "Allow public read access on pending" on public.pending_articles for select using (true);
drop policy if exists "Allow all access on pending" on public.pending_articles for all using (true) with check (true);

drop policy if exists "Allow public read access on tweets" on public.trending_tweets;
create policy "Allow public read access on tweets" on public.trending_tweets for select using (true);
drop policy if exists "Allow all access on tweets" on public.trending_tweets for all using (true) with check (true);

drop policy if exists "Allow public read access on fetch logs" on public.ai_fetch_logs;
create policy "Allow public read access on fetch logs" on public.ai_fetch_logs for select using (true);
drop policy if exists "Allow all access on fetch logs" on public.ai_fetch_logs for all using (true) with check (true);

-- ============================================================================
-- RESET / TRUNCATE OLD DATA
-- ============================================================================
truncate table public.ai_articles cascade;
truncate table public.pending_articles cascade;
truncate table public.trending_tweets cascade;
truncate table public.ai_fetch_logs cascade;
truncate table public.ai_sources cascade;

-- If legacy tables exist, drop or truncate them safely
drop table if exists public.ai_updates cascade;
drop table if exists public.learning_resources cascade;
drop table if exists public.youtube_videos cascade;

-- ============================================================================
-- SEED 43 OFFICIAL AI SOURCES
-- ============================================================================
insert into public.ai_sources (name, feed_url, site_url, category, logo_color) values
('OpenAI', 'https://openai.com/news/rss.xml', 'https://openai.com/news/', 'AI Labs', 'from-[#10a37f] to-[#0d7c60]'),
('Anthropic', 'https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/anthropic.xml', 'https://www.anthropic.com/news', 'AI Labs', 'from-[#D97706] to-[#B45309]'),
('Google DeepMind', 'https://deepmind.google/blog/rss.xml', 'https://deepmind.google/blog/', 'Research', 'from-[#4285F4] to-[#0f9d58]'),
('Google AI Blog', 'https://blog.google/technology/ai/rss/', 'https://blog.google/innovation-and-ai/technology/ai/', 'Research', 'from-[#4285F4] to-[#34A853]'),
('Amazon AI News', 'https://www.aboutamazon.com/news/tag/artificial-intelligence/feed', 'https://www.aboutamazon.com/artificial-intelligence-ai-news', 'Enterprise AI', 'from-[#FF9900] to-[#CC7A00]'),
('Microsoft AI Blog', 'https://blogs.microsoft.com/feed/', 'https://microsoft.ai/blog/', 'Enterprise AI', 'from-[#00A4EF] to-[#0078D7]'),
('Microsoft Source AI', 'https://news.microsoft.com/source/tag/ai/feed/', 'https://news.microsoft.com/source/tag/ai/', 'Enterprise AI', 'from-[#00A4EF] to-[#005A9E]'),
('Microsoft Copilot Blog', 'https://blogs.microsoft.com/feed/?tag=copilot', 'https://www.microsoft.com/en-us/copilot/blog/', 'Enterprise AI', 'from-[#0078D4] to-[#104A7B]'),
('Meta AI', 'https://ai.meta.com/blog/rss.xml', 'https://ai.meta.com/blog/', 'Research', 'from-[#0668E1] to-[#004BB7]'),
('xAI', 'https://x.ai/blog/rss.xml', 'https://x.ai/news', 'AI Labs', 'from-[#000000] to-[#1F2937]'),
('NVIDIA Newsroom', 'https://nvidianews.nvidia.com/releases.xml', 'https://nvidianews.nvidia.com', 'Hardware & AI', 'from-[#76B900] to-[#558200]'),
('NVIDIA GenAI Blog', 'https://blogs.nvidia.com/blog/category/generative-ai/feed/', 'https://blogs.nvidia.com/blog/category/generative-ai', 'Hardware & AI', 'from-[#76B900] to-[#4A7200]'),
('NVIDIA Developer Blog', 'https://developer.nvidia.com/blog/feed/', 'https://developer.nvidia.com/blog', 'Developer Tools', 'from-[#76B900] to-[#3B5B00]'),
('DeepSeek News', 'https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/deepseek.xml', 'https://www.deepseek.com/en/news/', 'AI Labs', 'from-[#1E40AF] to-[#172554]'),
('DeepSeek Blog', 'https://deepseek.ai/feed.xml', 'https://deepseek.ai/blog', 'AI Labs', 'from-[#2563EB] to-[#1E3A8A]'),
('MiniMax Blog', 'https://www.minimax.cn/blog/rss.xml', 'https://www.minimax.cn/blog', 'AI Labs', 'from-[#EA580C] to-[#C2410C]'),
('MiniMax News', 'https://www.minimax.io/news/rss.xml', 'https://www.minimax.io/news', 'AI Labs', 'from-[#F97316] to-[#9A3412]'),
('Moonshot Kimi', 'https://www.kimi.com/blog/rss.xml', 'https://www.kimi.com/blog/', 'AI Labs', 'from-[#6366F1] to-[#4338CA]'),
('Tencent Hunyuan', 'https://hy.tencent.ai/research/rss.xml', 'https://hy.tencent.ai/research?page=1', 'Research', 'from-[#0284C7] to-[#0369A1]'),
('Qwen AI', 'https://qwen.ai/blog/rss.xml', 'https://qwen.ai/news', 'AI Labs', 'from-[#6D28D9] to-[#4C1D95]'),
('ByteDance Seed', 'https://seed.bytedance.com/rss.xml', 'https://seed.bytedance.com/en/', 'Research', 'from-[#3B82F6] to-[#1D4ED8]'),
('Hugging Face', 'https://huggingface.co/blog/feed.xml', 'https://huggingface.co/blog', 'Developer Tools', 'from-[#FBBF24] to-[#F59E0B]'),
('Cursor Blog', 'https://cursor.com/blog/rss.xml', 'https://cursor.com/blog', 'Developer Tools', 'from-[#18181B] to-[#27272A]'),
('Ollama Blog', 'https://ollama.com/blog.atom', 'https://ollama.com/blog', 'Developer Tools', 'from-[#27272A] to-[#09090B]'),
('Krea AI', 'https://www.krea.ai/blog/rss.xml', 'https://www.krea.ai/blog', 'Creative AI', 'from-[#EC4899] to-[#BE185D]'),
('Cohere Blog', 'https://cohere.com/blog/rss.xml', 'https://cohere.com/blog', 'Enterprise AI', 'from-[#39594D] to-[#1E2E28]'),
('TypeSafe AI', 'https://typesafe.ai/blog/rss.xml', 'https://typesafe.ai/blog', 'Developer Tools', 'from-[#0D9488] to-[#0F766E]'),
('Higgsfield AI', 'https://higgsfield.ai/blog/news/rss.xml', 'https://higgsfield.ai/blog/news', 'Creative AI', 'from-[#8B5CF6] to-[#6D28D9]'),
('Databricks Newsroom', 'https://www.databricks.com/feed.xml', 'https://www.databricks.com/company/newsroom', 'Enterprise AI', 'from-[#FF3621] to-[#D92D1B]'),
('OpenRouter Blog', 'https://openrouter.ai/blog/rss.xml', 'https://openrouter.ai/blog/announcements/', 'Developer Tools', 'from-[#6366F1] to-[#4F46E5]'),
('Vercel News', 'https://vercel.com/atom', 'https://vercel.com/blog/category/company-news', 'Developer Tools', 'from-[#000000] to-[#262626]'),
('OpenCode', 'https://www.opencode.asia/news/rss.xml', 'https://www.opencode.asia/news/', 'Developer Tools', 'from-[#059669] to-[#047857]'),
('Replit News', 'https://blog.replit.com/feed.xml', 'https://replit.com/news', 'Developer Tools', 'from-[#F26207] to-[#C84B00]'),
('Lovable Blog', 'https://lovable.dev/blog/rss.xml', 'https://lovable.dev/blog', 'Developer Tools', 'from-[#F43F5E] to-[#E11D48]'),
('Oracle AI News', 'https://www.oracle.com/news/rss/', 'https://www.oracle.com/in/news/', 'Enterprise AI', 'from-[#C74634] to-[#992E21]'),
('Mistral AI', 'https://mistral.ai/news/index.xml', 'https://mistral.ai/news/', 'AI Labs', 'from-[#FF7000] to-[#CC5800]'),
('Perplexity Blog', 'https://www.perplexity.ai/hub/blog/rss.xml', 'https://www.perplexity.ai/hub/blog/category/news', 'AI Labs', 'from-[#20808D] to-[#135962]'),
('Manus AI', 'https://manus.im/blog/rss.xml', 'https://manus.im/blog', 'AI Labs', 'from-[#4F46E5] to-[#3730A3]'),
('OpenClaw Blog', 'https://openclaw.ai/blog/rss.xml', 'https://openclaw.ai/blog', 'Developer Tools', 'from-[#D946EF] to-[#A21CAF]'),
('OpenClaw Press', 'https://openclaw.ai/press/rss.xml', 'https://openclaw.ai/press', 'Media', 'from-[#C026D3] to-[#86198F]'),
('Hermes AI', 'https://hermes-ai.net/news/rss.xml', 'https://hermes-ai.net/news/', 'AI Labs', 'from-[#14B8A6] to-[#0D9488]'),
('World Labs', 'https://worldlabs.ai/blog/rss.xml', 'https://worldlabs.ai/blog', 'Creative AI', 'from-[#6366F1] to-[#312E81]'),
('LangChain Blog', 'https://blog.langchain.dev/rss/', 'https://www.langchain.com/blog', 'Developer Tools', 'from-[#00A86B] to-[#007F50]')
on conflict (name) do update set
  feed_url = excluded.feed_url,
  site_url = excluded.site_url,
  category = excluded.category,
  logo_color = excluded.logo_color;
