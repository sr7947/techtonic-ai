-- ============================================================================
-- SQL Schema: AI News Aggregator Tables
-- Run this script in your Supabase SQL Editor to support automated news sync
-- ============================================================================

-- 1. Create AI Sources table (configurations for RSS feeds)
create table if not exists ai_sources (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  feed_url text not null unique,
  site_url text,
  category text not null,
  logo_color text, -- CSS gradient matching company styling
  created_at timestamptz default now()
);

-- 2. Create AI Articles table (normalized articles fetched from feeds)
create table if not exists ai_articles (
  id uuid default gen_random_uuid() primary key,
  source_id uuid references ai_sources(id) on delete set null,
  source_name text not null,
  source_type text not null default 'RSS',
  title text not null,
  summary text not null,
  article_url text not null unique,
  published_at timestamptz not null,
  author text,
  category text,
  image_url text,
  content_hash text,
  fetched_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Indexes for performance on sorting/filtering
create index if not exists idx_articles_published_at on ai_articles (published_at desc);
create index if not exists idx_articles_source_name on ai_articles (source_name);

-- 3. Create AI Fetch Logs table (sync job status auditing)
create table if not exists ai_fetch_logs (
  id uuid default gen_random_uuid() primary key,
  source_name text not null,
  status text not null, -- 'success' | 'error'
  articles_fetched integer not null default 0,
  error_message text,
  started_at timestamptz default now(),
  completed_at timestamptz default now()
);

-- Enable Row Level Security (RLS)
alter table ai_sources enable row level security;
alter table ai_articles enable row level security;
alter table ai_fetch_logs enable row level security;

-- Policies: Public Read Access
create policy "Allow public read access on sources" on ai_sources for select using (true);
create policy "Allow public read access on articles" on ai_articles for select using (true);
create policy "Allow public read access on fetch logs" on ai_fetch_logs for select using (true);

-- Policies: Server-side Writes (Anonymous Insert policies for serverless functions)
create policy "Allow insert access on articles" on ai_articles for insert with check (true);
create policy "Allow insert access on fetch logs" on ai_fetch_logs for insert with check (true);

-- Pre-populate with official AI industry news feeds
insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('OpenAI', 'https://openai.com/news/rss.xml', 'https://openai.com', 'Models', 'from-[#10a37f] to-[#0d7c60]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('Anthropic', 'https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/anthropic-news.xml', 'https://www.anthropic.com', 'Models', 'from-[#D97706] to-[#B45309]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('Google AI', 'https://blog.google/technology/ai/rss/', 'https://blog.google', 'Research', 'from-[#4285F4] to-[#34A853]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('Google DeepMind', 'https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/google-deepmind-blog.xml', 'https://deepmind.google', 'Research', 'from-[#4285F4] to-[#0f9d58]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('Microsoft AI', 'https://blogs.microsoft.com/ai/feed/', 'https://blogs.microsoft.com/ai', 'Enterprise AI', 'from-[#00A4EF] to-[#0078D7]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('AWS ML Blog', 'https://aws.amazon.com/blogs/machine-learning/feed/', 'https://aws.amazon.com/blogs/machine-learning', 'Enterprise AI', 'from-[#FF9900] to-[#CC7A00]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('NVIDIA DL Blog', 'https://blogs.nvidia.com/category/deep-learning/feed/', 'https://blogs.nvidia.com/category/deep-learning', 'Hardware & AI', 'from-[#76B900] to-[#5C9000]')
on conflict (name) do nothing;

insert into ai_sources (name, feed_url, site_url, category, logo_color) values
('Hugging Face', 'https://huggingface.co/blog/feed.xml', 'https://huggingface.co/blog', 'Developer Tools', 'from-[#FBBF24] to-[#F59E0B]')
on conflict (name) do nothing;
