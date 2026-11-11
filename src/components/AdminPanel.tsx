import React, { useState } from 'react';
import { X, Copy, Check, Trash2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  onClose: () => void;
  onAddUpdate: (update: any) => void;
  onAddResource?: (resource: any) => void;
  onAddVideo?: (video: any) => void;
  currentUpdates: any[];
  currentResources?: any[];
  currentVideos?: any[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  onAddUpdate
}) => {
  const [activeForm, setActiveForm] = useState<'update' | 'tweet' | 'db-reset'>('update');
  const [copied, setCopied] = useState(false);

  // Supabase operation states
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Reset DB states
  const [resetting, setResetting] = useState(false);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const isSupabaseConfigured = !!(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  // Form states - Update (Latest Updates)
  const [upTitle, setUpTitle] = useState('');
  const [upCategory, setUpCategory] = useState('AI Labs');
  const [upSource, setUpSource] = useState('Admin Editorial');
  const [upSummary, setUpSummary] = useState('');
  const [upUrl, setUpUrl] = useState('');
  const [upImageUrl, setUpImageUrl] = useState('');

  // Form states - Tweet (Trending)
  const [tweetUrl, setTweetUrl] = useState('');
  const [tweetTag, setTweetTag] = useState('#AI');

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Submit Latest Update
  const handleAddUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upTitle || !upSummary) return;

    const rawData = {
      title: upTitle,
      category: upCategory,
      source_name: upSource || 'WenzdayLab Editorial',
      summary: upSummary,
      article_url: upUrl || `https://wenzdaylab.in/updates/${Date.now()}`,
      image_url: upImageUrl || null,
      published_at: new Date().toISOString()
    };

    if (isSupabaseConfigured) {
      setPublishing(true);
      setPublishStatus('idle');
      try {
        const { data, error } = await supabase
          .from('ai_articles')
          .insert([rawData])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          onAddUpdate({
            id: data[0].id,
            title: data[0].title,
            category: data[0].category,
            sourceName: data[0].source_name,
            summary: data[0].summary,
            url: data[0].article_url,
            imageUrl: data[0].image_url,
            published_at: data[0].published_at
          });
        }
        setPublishStatus('success');
        setUpTitle('');
        setUpSummary('');
        setUpUrl('');
        setUpImageUrl('');
      } catch (err: any) {
        console.error('Failed to post article to Supabase:', err);
        setPublishStatus('error');
        setErrorMessage(err.message || 'Database error occurred.');
      } finally {
        setPublishing(false);
      }
    } else {
      // Local fallback
      onAddUpdate({
        id: `local-${Date.now()}`,
        title: upTitle,
        category: upCategory,
        sourceName: upSource,
        summary: upSummary,
        url: upUrl || '#',
        imageUrl: upImageUrl || undefined,
        published_at: new Date().toISOString()
      });
      setPublishStatus('success');
      setUpTitle('');
      setUpSummary('');
      setUpUrl('');
      setUpImageUrl('');
    }
  };

  // Submit Trending Tweet
  const handleAddTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetUrl) return;

    if (isSupabaseConfigured) {
      setPublishing(true);
      setPublishStatus('idle');
      try {
        // Clean URL to strip tracking query parameters (e.g. ?ref_src=...)
        const cleanTweetUrl = tweetUrl.trim().split('?')[0];

        const { error } = await supabase
          .from('trending_tweets')
          .insert([{
            tag: tweetTag.startsWith('#') ? tweetTag : `#${tweetTag}`,
            tweet_url: cleanTweetUrl,
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;

        setPublishStatus('success');
        setTweetUrl('');
      } catch (err: any) {
        console.error('Failed to save tweet:', err);
        setPublishStatus('error');
        setErrorMessage(err.message || 'Database error occurred.');
      } finally {
        setPublishing(false);
      }
    } else {
      setPublishStatus('error');
      setErrorMessage('Supabase is not configured.');
    }
  };

  // Trigger Full DB Reset
  const handleExecuteDbReset = async () => {
    const confirmWipe = window.confirm(
      "⚠️ WARNING: This will permanently delete ALL old articles, pending articles, tweets, and logs from Supabase, and reseed the 43 official sources.\n\nAre you sure you want to proceed?"
    );
    if (!confirmWipe) return;

    setResetting(true);
    setResetMessage(null);
    try {
      const response = await fetch('/api/reset-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to reset database');
      }

      setResetMessage(`✅ Success: ${result.message}`);
    } catch (err: any) {
      console.error("DB Reset failed:", err);
      // Client-side direct reset fallback if API endpoint is not yet deployed
      try {
        await supabase.from('ai_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('pending_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('trending_tweets').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        setResetMessage("✅ Database tables cleared directly via Supabase client.");
      } catch (clientErr: any) {
        setResetMessage(`❌ Error: ${err.message || clientErr.message}`);
      }
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-brand-navy-deep border border-brand-gold/30 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-brand-gold/15">
          <div className="flex items-center gap-3">
            <img src="/wenzdaylab-logo.svg" alt="Logo" className="w-8 h-8 rounded-lg border border-brand-gold/30" />
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100">WenzdayLab Admin Panel</h3>
              <p className="text-[11px] text-slate-400">Manage live news, trending tweets, and database hygiene.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-brand-navy-dark border border-brand-gold/20 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 bg-brand-navy-dark p-1.5 rounded-2xl border border-brand-gold/20">
          <button
            onClick={() => { setActiveForm('update'); setPublishStatus('idle'); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeForm === 'update'
                ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Post Latest Update
          </button>

          <button
            onClick={() => { setActiveForm('tweet'); setPublishStatus('idle'); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeForm === 'tweet'
                ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Post Trending Tweet
          </button>

          <button
            onClick={() => { setActiveForm('db-reset'); setPublishStatus('idle'); }}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
              activeForm === 'db-reset'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-red-400 hover:text-red-300'
            }`}
          >
            Database Reset
          </button>
        </div>

        {/* Status Banners */}
        {publishStatus === 'success' && (
          <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Published successfully to live Supabase database!</span>
          </div>
        )}

        {publishStatus === 'error' && (
          <div className="p-3 bg-red-500/15 border border-red-500/30 rounded-2xl text-red-300 text-xs font-semibold flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* FORM 1: Post Latest Update */}
        {activeForm === 'update' && (
          <form onSubmit={handleAddUpdateSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Announcement Title *
              </label>
              <input
                type="text"
                required
                value={upTitle}
                onChange={(e) => setUpTitle(e.target.value)}
                placeholder="e.g. OpenAI Announces GPT-4.5 Orion Frontier Model"
                className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Source Name
                </label>
                <input
                  type="text"
                  value={upSource}
                  onChange={(e) => setUpSource(e.target.value)}
                  placeholder="e.g. OpenAI Blog, Anthropic Research"
                  className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={upCategory}
                  onChange={(e) => setUpCategory(e.target.value)}
                  className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
                >
                  <option value="AI Labs">AI Labs</option>
                  <option value="Research">Research</option>
                  <option value="Enterprise AI">Enterprise AI</option>
                  <option value="Hardware & AI">Hardware & AI</option>
                  <option value="Developer Tools">Developer Tools</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Official Article / Announcement URL
              </label>
              <input
                type="url"
                value={upUrl}
                onChange={(e) => setUpUrl(e.target.value)}
                placeholder="https://openai.com/news/..."
                className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Image / Thumbnail URL (Optional)
              </label>
              <input
                type="url"
                value={upImageUrl}
                onChange={(e) => setUpImageUrl(e.target.value)}
                placeholder="https://... image banner"
                className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Announcement Summary *
              </label>
              <textarea
                required
                rows={3}
                value={upSummary}
                onChange={(e) => setUpSummary(e.target.value)}
                placeholder="Detailed summary of the new frontier model, benchmarks, capabilities, and availability..."
                className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl p-3 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={publishing}
              className="w-full py-3 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              {publishing ? 'Publishing to Supabase...' : 'Publish to Latest Updates'}
            </button>
          </form>
        )}

        {/* FORM 2: Post Trending Tweet */}
        {activeForm === 'tweet' && (
          <form onSubmit={handleAddTweetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Twitter / X Status URL *
              </label>
              <input
                type="url"
                required
                value={tweetUrl}
                onChange={(e) => setTweetUrl(e.target.value)}
                placeholder="https://x.com/openai/status/188..."
                className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Hashtag Category Tag
              </label>
              <input
                type="text"
                value={tweetTag}
                onChange={(e) => setTweetTag(e.target.value)}
                placeholder="#AI, #Agents, #LLM, #Robotics"
                className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-xl px-4 py-2.5 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={publishing}
              className="w-full py-3 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg cursor-pointer disabled:opacity-50"
            >
              {publishing ? 'Posting Tweet...' : 'Add to Trending Section'}
            </button>
          </form>
        )}

        {/* TAB 3: Database Reset */}
        {activeForm === 'db-reset' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs space-y-2">
              <div className="font-bold flex items-center gap-2 text-red-400">
                <ShieldAlert className="w-4 h-4" />
                Database Reset & Reseeding
              </div>
              <p>
                This action will wipe old articles, staged items, and tweets from your Supabase database. It will immediately reseed the <strong>43 official AI news sources</strong> so your automated pipeline starts fresh.
              </p>
            </div>

            {resetMessage && (
              <div className={`p-3.5 rounded-2xl text-xs font-semibold ${
                resetMessage.startsWith('✅')
                  ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                  : 'bg-red-500/15 border border-red-500/30 text-red-300'
              }`}>
                {resetMessage}
              </div>
            )}

            <button
              onClick={handleExecuteDbReset}
              disabled={resetting}
              className="w-full py-3.5 bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-lg cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              {resetting ? 'Resetting Database...' : 'Execute Full Supabase DB Reset'}
            </button>

            <div className="pt-3 border-t border-brand-gold/15 text-center">
              <p className="text-[11px] text-slate-400 mb-2">
                Prefer running SQL manually in Supabase?
              </p>
              <button
                onClick={() => triggerCopy(`-- Run in Supabase SQL Editor\nTRUNCATE TABLE ai_articles CASCADE;\nTRUNCATE TABLE pending_articles CASCADE;\nTRUNCATE TABLE trending_tweets CASCADE;\nTRUNCATE TABLE ai_fetch_logs CASCADE;`)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-navy-dark border border-brand-gold/20 text-brand-gold text-xs font-semibold hover:bg-brand-navy-light/40"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied SQL!' : 'Copy Reset SQL Commands'}</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
