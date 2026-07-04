import React, { useState, useEffect } from 'react';
import { TrendingUp, Hash, RefreshCw, ShieldAlert, PlusCircle, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface TweetRecord {
  id: string;
  tag: string;
  tweet_url: string;
  created_at: string;
}

export const TrendingPage: React.FC = () => {
  const [tweets, setTweets] = useState<TweetRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch all tweets from Supabase database
  useEffect(() => {
    let isMounted = true;
    async function fetchAllTweets() {
      setLoading(true);
      setDbError(false);
      try {
        const { data, error } = await supabase
          .from('trending_tweets')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (isMounted) {
          setTweets(data || []);
          // Default active tab to the first tag found if not set or if current active tab is gone
          const tags = Array.from(new Set((data || []).map(t => t.tag)));
          if (tags.length > 0) {
            if (!activeTab || !tags.includes(activeTab)) {
              setActiveTab(tags[0]);
            }
          } else {
            setActiveTab('');
          }
        }
      } catch (err) {
        console.error("Failed to query trending_tweets:", err);
        if (isMounted) {
          setDbError(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    fetchAllTweets();
    return () => { isMounted = false; };
  }, [refreshKey]);

  // Load X widgets script and trigger rendering when activeTab changes
  useEffect(() => {
    const activeTweets = tweets.filter(t => t.tag === activeTab);
    if (activeTweets.length > 0) {
      const scriptId = 'twitter-wjs';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
      }

      let retries = 0;
      const interval = setInterval(() => {
        retries++;
        const twttr = (window as any).twttr;
        if (twttr && twttr.widgets) {
          twttr.widgets.load();
          clearInterval(interval);
        }
        if (retries >= 16) {
          clearInterval(interval);
        }
      }, 250);

      return () => clearInterval(interval);
    }
  }, [activeTab, tweets]);

  // Get unique tags from database records
  const uniqueTags = Array.from(new Set(tweets.map(t => t.tag)));
  const filteredTweets = tweets.filter(t => t.tag === activeTab);

  const handleDeleteTweet = async (id: string) => {
    if (!window.confirm("Are you sure you want to remove this tweet embed?")) return;
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('trending_tweets')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTweets(prev => prev.filter(t => t.id !== id));
      
      // If we deleted the last tweet of the active tab, switch tab
      const remainingTweets = tweets.filter(t => t.id !== id);
      const remainingTags = Array.from(new Set(remainingTweets.map(t => t.tag)));
      if (remainingTags.length > 0 && !remainingTags.includes(activeTab)) {
        setActiveTab(remainingTags[0]);
      } else if (remainingTags.length === 0) {
        setActiveTab('');
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete tweet.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase mb-3">
          <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
          Market Trends
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          Trending in <span className="gold-gradient-text">AI & GenAI</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Dynamic real-time dashboard loaded directly from database curation.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
            <RefreshCw className="w-8 h-8 animate-spin text-brand-gold/40" />
            <span className="text-[11px] font-bold tracking-wider uppercase">Loading Curation Dashboard...</span>
          </div>
        ) : dbError ? (
          <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 text-center max-w-md mx-auto space-y-4">
            <ShieldAlert className="w-8 h-8 text-red-400 mx-auto" />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-200 text-sm">Database Sync Error</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Could not query the `trending_tweets` table. Please ensure you have created this table in your Supabase project.
              </p>
            </div>
            <pre className="p-3 bg-brand-navy-dark text-left text-[10px] text-brand-gold font-mono rounded-xl overflow-auto select-all max-h-[160px]">
{`CREATE TABLE public.trending_tweets (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  tag text NOT NULL,
  tweet_url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE public.trending_tweets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON public.trending_tweets FOR SELECT USING (true);
CREATE POLICY "Allow public write access" ON public.trending_tweets FOR ALL USING (true) WITH CHECK (true);`}
            </pre>
          </div>
        ) : uniqueTags.length === 0 ? (
          <div className="p-12 rounded-3xl bg-brand-navy-deep/40 border border-brand-gold/15 text-center max-w-lg mx-auto space-y-4">
            <PlusCircle className="w-8 h-8 text-brand-gold/50 mx-auto" />
            <div className="space-y-2">
              <h4 className="font-bold text-slate-200 text-sm">No Trending Topics Found</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                There are no custom tweets or trending hashtags registered in the database yet.
              </p>
              <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                Open the **Admin Content Panel** at the top right to link your first Tweet URL with a custom hashtag (e.g. `#LLM` or `#NextJS`)!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            
            {/* Dynamic Hashtag Button Cloud */}
            <div className="flex flex-wrap gap-3 justify-center select-none">
              {uniqueTags.map((tag) => {
                const isActive = activeTab === tag;
                const count = tweets.filter(t => t.tag === tag).length;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTab(tag)}
                    className={`px-5 py-3 rounded-2xl glass-panel transition-all flex items-center gap-2 hover:scale-105 cursor-pointer outline-none ${
                      isActive
                        ? 'border-brand-gold text-brand-gold-bright bg-brand-gold/10 shadow-[0_0_15px_rgba(189,154,118,0.25)]'
                        : 'border-brand-gold/10 hover:border-brand-gold/40 text-slate-200'
                    }`}
                  >
                    <Hash className={`w-4 h-4 ${isActive ? 'text-brand-gold-bright' : 'text-brand-gold'}`} />
                    <span className="font-serif font-bold text-sm tracking-wider uppercase">{tag.replace('#', '')}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-brand-navy-dark text-brand-gold-bright' : 'bg-brand-navy-light/45 text-slate-500'
                    }`}>{count} {count === 1 ? 'tweet' : 'tweets'}</span>
                  </button>
                );
              })}
            </div>

            {/* Curated Tweets Feed Container */}
            <div className="border-t border-brand-gold/10 pt-12">
              
              {/* Header and refresh */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-brand-gold/15 border border-brand-gold/30 text-brand-gold-bright">
                    <TwitterIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg md:text-xl font-bold tracking-wider text-slate-100 uppercase">
                      Curated Tweets for <span className="gold-gradient-text">{activeTab}</span>
                    </h3>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Top developer posts and announcements loaded directly from database.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setRefreshKey(prev => prev + 1)}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-brand-gold border border-brand-gold/10 hover:border-brand-gold/30 bg-brand-navy-light/5 hover:bg-brand-navy-light/15 transition-all cursor-pointer select-none"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Refresh Feed
                </button>
              </div>

              {/* Tweets List */}
              <div className="relative w-full max-w-2xl mx-auto space-y-6">
                {filteredTweets.map((tweet) => (
                  <div 
                    key={tweet.id} 
                    className="w-full flex justify-center flex-col items-center bg-brand-navy-deep/20 rounded-3xl p-5 border border-brand-gold/15 shadow-xl glass-panel relative overflow-visible group"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-gold/30 to-transparent" />
                    
                    <button
                      onClick={() => handleDeleteTweet(tweet.id)}
                      disabled={deletingId === tweet.id}
                      className="absolute top-3 right-3 p-2 rounded-lg bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-200 z-10"
                      title="Remove this tweet"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <blockquote className="twitter-tweet w-full" data-theme="dark" data-align="center" data-conversation="none">
                      <a href={tweet.tweet_url} className="text-xs text-slate-500 hover:text-brand-gold transition-colors">
                        Click to load tweet: {tweet.tweet_url}
                      </a>
                    </blockquote>
                  </div>
                ))}

                <div className="flex items-center gap-2 p-3 rounded-2xl bg-brand-navy-light/10 border border-brand-gold/10 text-slate-500 text-[10px] max-w-xl mx-auto text-center justify-center select-none">
                  <ShieldAlert className="w-4.5 h-4.5 flex-shrink-0 text-brand-gold/50" />
                  <span>Adblockers may prevent Twitter widgets from loading. If blank, disable your adblocker on localhost.</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default TrendingPage;
