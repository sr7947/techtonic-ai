-- Create trending_tweets table
CREATE TABLE IF NOT EXISTS public.trending_tweets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tag text NOT NULL,
  tweet_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.trending_tweets ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON public.trending_tweets
  FOR SELECT USING (true);

-- Create policy to allow public write access (for demo admin panel usage)
CREATE POLICY "Allow public write access" ON public.trending_tweets
  FOR ALL USING (true) WITH CHECK (true);
