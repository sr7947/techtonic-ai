import React, { useState } from 'react';
import { X, Plus, Copy, Check, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AdminPanelProps {
  onClose: () => void;
  onAddUpdate: (update: any) => void;
  onAddResource: (resource: any) => void;
  onAddVideo: (video: any) => void;
  currentUpdates: any[];
  currentResources: any[];
  currentVideos: any[];
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onClose,
  onAddUpdate,
  onAddResource,
  onAddVideo,
  currentUpdates,
  currentResources,
  currentVideos,
}) => {
  const [activeForm, setActiveForm] = useState<'update' | 'resource' | 'video' | 'tweet'>('update');
  const [copied, setCopied] = useState(false);

  // Supabase states
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isSupabaseConfigured = !!(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  // Form states - Update
  const [upTitle, setUpTitle] = useState('');
  const [upCategory, setUpCategory] = useState('Models');
  const [upSource, setUpSource] = useState('');
  const [upSummary, setUpSummary] = useState('');
  const [upUrl, setUpUrl] = useState('');
  const [upTag, setUpTag] = useState('');
  const [upCompany, setUpCompany] = useState('openai');

  // Form states - Resource
  const [resCompany, setResCompany] = useState('');
  const [resTool, setResTool] = useState('');
  const [resDesc, setResDesc] = useState('');
  const [resUseCase, setResUseCase] = useState('');
  const [resCategory, setResCategory] = useState('API & Integration');
  const [resDocs, setResDocs] = useState('');
  const [resLearn, setResLearn] = useState('');

  // Form states - Video
  const [vidTitle, setVidTitle] = useState('');
  const [vidDuration, setVidDuration] = useState('');
  const [vidCategory, setVidCategory] = useState('Agentic AI');
  const [vidPublish, setVidPublish] = useState('Just now');
  const [vidId, setVidId] = useState('');

  // Form states - Tweet
  const [tweetUrl, setTweetUrl] = useState('');
  const [tweetTag, setTweetTag] = useState('');

  const triggerCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upTitle || !upSummary) return;

    const rawData = {
      title: upTitle,
      category: upCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' }),
      source: upSource || 'TechTonic AI Curation',
      summary: upSummary,
      url: upUrl || '#',
      read_time: '3 min read',
      tag: upTag || upCategory,
      company: upCompany
    };

    if (isSupabaseConfigured) {
      setPublishing(true);
      setPublishStatus('idle');
      try {
        const { data, error } = await supabase
          .from('ai_updates')
          .insert([rawData])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          onAddUpdate({
            id: data[0].id,
            title: data[0].title,
            category: data[0].category,
            date: data[0].date,
            source: data[0].source,
            summary: data[0].summary,
            url: data[0].url,
            readTime: data[0].read_time,
            tag: data[0].tag,
            company: data[0].company
          });
        }
        setPublishStatus('success');
        // Reset form fields
        setUpTitle('');
        setUpSource('');
        setUpSummary('');
        setUpUrl('');
        setUpTag('');
        setUpCompany('openai');
      } catch (err: any) {
        console.error("Supabase insert error:", err);
        setPublishStatus('error');
        setErrorMessage(err.message || 'Failed to publish to Supabase.');
      } finally {
        setPublishing(false);
      }
    } else {
      // Local preview fallback
      onAddUpdate({
        id: `upd-${Date.now()}`,
        ...rawData,
        readTime: rawData.read_time
      });
      // Reset form fields
      setUpTitle('');
      setUpSource('');
      setUpSummary('');
      setUpUrl('');
      setUpTag('');
    }
  };

  const handleAddResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resCompany || !resTool || !resDesc) return;

    const rawData = {
      company: resCompany,
      tool_name: resTool,
      description: resDesc,
      use_case: resUseCase || 'General development and testing',
      category: resCategory,
      docs_url: resDocs || '#',
      learn_url: resLearn || '#'
    };

    if (isSupabaseConfigured) {
      setPublishing(true);
      setPublishStatus('idle');
      try {
        const { data, error } = await supabase
          .from('learning_resources')
          .insert([rawData])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          onAddResource({
            id: data[0].id,
            company: data[0].company,
            toolName: data[0].tool_name,
            description: data[0].description,
            useCase: data[0].use_case,
            category: data[0].category,
            docsUrl: data[0].docs_url,
            learnUrl: data[0].learn_url
          });
        }
        setPublishStatus('success');
        // Reset form fields
        setResCompany('');
        setResTool('');
        setResDesc('');
        setResUseCase('');
        setResDocs('');
        setResLearn('');
      } catch (err: any) {
        console.error("Supabase insert error:", err);
        setPublishStatus('error');
        setErrorMessage(err.message || 'Failed to publish to Supabase.');
      } finally {
        setPublishing(false);
      }
    } else {
      // Local preview fallback
      onAddResource({
        id: `res-${Date.now()}`,
        company: resCompany,
        toolName: resTool,
        description: resDesc,
        useCase: rawData.use_case,
        category: resCategory,
        docsUrl: rawData.docs_url,
        learnUrl: rawData.learn_url
      });
      // Reset form fields
      setResCompany('');
      setResTool('');
      setResDesc('');
      setResUseCase('');
      setResDocs('');
      setResLearn('');
    }
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vidTitle || !vidId) return;

    const rawData = {
      title: vidTitle,
      duration: vidDuration || '15:00',
      category: vidCategory,
      publish_date: vidPublish,
      youtube_id: vidId
    };

    if (isSupabaseConfigured) {
      setPublishing(true);
      setPublishStatus('idle');
      try {
        const { data, error } = await supabase
          .from('youtube_videos')
          .insert([rawData])
          .select();

        if (error) throw error;

        if (data && data[0]) {
          onAddVideo({
            id: data[0].id,
            title: data[0].title,
            duration: data[0].duration,
            category: data[0].category,
            publishDate: data[0].publish_date,
            youtubeId: data[0].youtube_id
          });
        }
        setPublishStatus('success');
        // Reset form fields
        setVidTitle('');
        setVidDuration('');
        setVidId('');
      } catch (err: any) {
        console.error("Supabase insert error:", err);
        setPublishStatus('error');
        setErrorMessage(err.message || 'Failed to publish to Supabase.');
      } finally {
        setPublishing(false);
      }
    } else {
      // Local preview fallback
      onAddVideo({
        id: `yt-${Date.now()}`,
        title: vidTitle,
        duration: vidDuration || '15:00',
        category: vidCategory,
        publishDate: vidPublish,
        youtubeId: vidId
      });
      // Reset form fields
      setVidTitle('');
      setVidDuration('');
      setVidId('');
    }
  };

  const handleAddTweetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweetUrl || !tweetTag) return;

    // Extract the status URL if the user pasted the entire HTML embed code block
    const urlMatch = tweetUrl.match(/https?:\/\/(?:twitter|x)\.com\/[a-zA-Z0-9_]+\/status\/\d+/i);
    const targetUrl = urlMatch ? urlMatch[0] : tweetUrl.trim();

    let formattedTag = tweetTag.trim();
    if (!formattedTag.startsWith('#')) {
      formattedTag = '#' + formattedTag;
    }
    formattedTag = formattedTag.replace(/\s+/g, '').toUpperCase();

    const rawData = {
      tag: formattedTag,
      tweet_url: targetUrl
    };

    if (isSupabaseConfigured) {
      setPublishing(true);
      setPublishStatus('idle');
      try {
        const { error } = await supabase
          .from('trending_tweets')
          .insert([rawData])
          .select();

        if (error) throw error;

        setPublishStatus('success');
        setTweetUrl('');
      } catch (err: any) {
        console.error("Supabase insert error:", err);
        setPublishStatus('error');
        setErrorMessage(err.message || 'Failed to publish tweet to Supabase.');
      } finally {
        setPublishing(false);
      }
    } else {
      alert("Supabase not configured. Tweet cannot be saved in local preview mode.");
    }
  };

  // Generate updated typescript code block
  const generateCodeConfig = () => {
    if (activeForm === 'update') {
      return `export const LATEST_UPDATES: AIUpdate[] = ${JSON.stringify(currentUpdates, null, 2)};`;
    } else if (activeForm === 'resource') {
      return `export const LEARNING_RESOURCES: LearningResource[] = ${JSON.stringify(currentResources, null, 2)};`;
    } else if (activeForm === 'video') {
      return `export const YOUTUBE_VIDEOS: YouTubeVideo[] = ${JSON.stringify(currentVideos, null, 2)};`;
    } else {
      return `/* Copy the SQL schema from supabase_tweets_schema.sql to create the table, then add tweets via Admin Panel */`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-dark/70 backdrop-blur-md">
      <div 
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 glass-panel border border-brand-gold/20 shadow-2xl bg-gradient-to-b from-brand-navy-deep to-brand-navy relative"
        style={{ scrollbarWidth: 'thin' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brand-gold/15 pb-4 mb-6">
          <div>
            <h2 className="font-serif text-lg sm:text-2xl font-bold tracking-widest text-brand-gold uppercase">
              Admin Content Panel
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Add new links, resources, or YouTube uploads to the TechTonic AI UI.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl bg-brand-navy-light/20 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold-bright transition-all cursor-pointer"
            aria-label="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-brand-gold/10 pb-3 mb-6 gap-2 sm:gap-4 overflow-x-auto">
          <button
            onClick={() => {
              setActiveForm('update');
              setPublishStatus('idle');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
              activeForm === 'update'
                ? 'bg-brand-gold/20 text-brand-gold-bright border border-brand-gold/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Latest updates
          </button>
          <button
            onClick={() => {
              setActiveForm('resource');
              setPublishStatus('idle');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
              activeForm === 'resource'
                ? 'bg-brand-gold/20 text-brand-gold-bright border border-brand-gold/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Learning Resources
          </button>
          <button
            onClick={() => {
              setActiveForm('video');
              setPublishStatus('idle');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
              activeForm === 'video'
                ? 'bg-brand-gold/20 text-brand-gold-bright border border-brand-gold/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            YouTube Videos
          </button>
          <button
            onClick={() => {
              setActiveForm('tweet');
              setPublishStatus('idle');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wider transition-colors whitespace-nowrap cursor-pointer ${
              activeForm === 'tweet'
                ? 'bg-brand-gold/20 text-brand-gold-bright border border-brand-gold/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Trending Tweets
          </button>
        </div>

        {/* Form & Code Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Form: Latest Update */}
            {activeForm === 'update' && (
              <form onSubmit={handleAddUpdateSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Update Title *</label>
                  <input
                    type="text"
                    required
                    value={upTitle}
                    onChange={(e) => setUpTitle(e.target.value)}
                    placeholder="e.g. Introducing Claude 3.7 Sonnet"
                    className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Category</label>
                    <select
                      value={upCategory}
                      onChange={(e) => setUpCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    >
                      <option>Models</option>
                      <option>Products</option>
                      <option>Research</option>
                      <option>Developer Tools</option>
                      <option>Enterprise AI</option>
                      <option>Startups</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Company Group</label>
                    <select
                      value={upCompany}
                      onChange={(e) => setUpCompany(e.target.value)}
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    >
                      <option value="google">Google</option>
                      <option value="openai">OpenAI</option>
                      <option value="anthropic">Anthropic</option>
                      <option value="meta">Meta</option>
                      <option value="microsoft">Microsoft</option>
                      <option value="amazon">Amazon</option>
                      <option value="nvidia">NVIDIA</option>
                      <option value="other">Others</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Custom Badge Tag</label>
                    <input
                      type="text"
                      value={upTag}
                      onChange={(e) => setUpTag(e.target.value)}
                      placeholder="e.g. Claude 3.7"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Source Publisher</label>
                    <input
                      type="text"
                      value={upSource}
                      onChange={(e) => setUpSource(e.target.value)}
                      placeholder="e.g. Anthropic Blog"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Target Link URL</label>
                    <input
                      type="text"
                      value={upUrl}
                      onChange={(e) => setUpUrl(e.target.value)}
                      placeholder="e.g. https://anthropic.com/..."
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Brief Summary *</label>
                  <textarea
                    required
                    rows={4}
                    value={upSummary}
                    onChange={(e) => setUpSummary(e.target.value)}
                    placeholder="Enter a short overview of the update..."
                    className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm resize-none"
                  />
                </div>

                {/* Database Connection Banner */}
                <div className="flex items-center gap-2 text-xs py-1">
                  {isSupabaseConfigured ? (
                    <span className="text-green-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Connected to Supabase Cloud Database
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Fallback Static Mode (No Database Configured)
                    </span>
                  )}
                </div>

                {publishStatus === 'success' && (
                  <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Published Live successfully!
                  </div>
                )}
                
                {publishStatus === 'error' && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Failed to publish: {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={publishing}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-navy-dark font-bold py-3.5 rounded-xl text-xs tracking-widest hover:bg-brand-gold-bright transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(189,154,118,0.15)]"
                >
                  <Plus className="w-4 h-4" />
                  {publishing ? 'PUBLISHING LIVE...' : isSupabaseConfigured ? 'PUBLISH LIVE TO DATABASE' : 'PREVIEW & ADD UPDATE'}
                </button>
              </form>
            )}

            {/* Form: Learning Resource */}
            {activeForm === 'resource' && (
              <form onSubmit={handleAddResourceSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Company *</label>
                    <input
                      type="text"
                      required
                      value={resCompany}
                      onChange={(e) => setResCompany(e.target.value)}
                      placeholder="e.g. OpenAI"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Tool Name *</label>
                    <input
                      type="text"
                      required
                      value={resTool}
                      onChange={(e) => setResTool(e.target.value)}
                      placeholder="e.g. Assistants API"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Docs Category</label>
                    <select
                      value={resCategory}
                      onChange={(e) => setResCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    >
                      <option>API & Integration</option>
                      <option>Developer Studio</option>
                      <option>Models & Prompting</option>
                      <option>Frameworks</option>
                      <option>Infrastructure</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Docs URL</label>
                    <input
                      type="text"
                      value={resDocs}
                      onChange={(e) => setResDocs(e.target.value)}
                      placeholder="Official Documentation URL"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Learning Guide URL</label>
                    <input
                      type="text"
                      value={resLearn}
                      onChange={(e) => setResLearn(e.target.value)}
                      placeholder="e.g. GitHub cookbook link"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Core Use Case</label>
                    <input
                      type="text"
                      value={resUseCase}
                      onChange={(e) => setResUseCase(e.target.value)}
                      placeholder="e.g. Building chatbots"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Short Description *</label>
                  <textarea
                    required
                    rows={3}
                    value={resDesc}
                    onChange={(e) => setResDesc(e.target.value)}
                    placeholder="Enter description of tool/framework..."
                    className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm resize-none"
                  />
                </div>

                {/* Database Connection Banner */}
                <div className="flex items-center gap-2 text-xs py-1">
                  {isSupabaseConfigured ? (
                    <span className="text-green-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Connected to Supabase Cloud Database
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Fallback Static Mode (No Database Configured)
                    </span>
                  )}
                </div>

                {publishStatus === 'success' && (
                  <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Published Live successfully!
                  </div>
                )}
                
                {publishStatus === 'error' && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Failed to publish: {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={publishing}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-navy-dark font-bold py-3.5 rounded-xl text-xs tracking-widest hover:bg-brand-gold-bright transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(189,154,118,0.15)]"
                >
                  <Plus className="w-4 h-4" />
                  {publishing ? 'PUBLISHING LIVE...' : isSupabaseConfigured ? 'PUBLISH LIVE TO DATABASE' : 'PREVIEW & ADD RESOURCE'}
                </button>
              </form>
            )}

            {/* Form: YouTube Video */}
            {activeForm === 'video' && (
              <form onSubmit={handleAddVideoSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Video Title *</label>
                  <input
                    type="text"
                    required
                    value={vidTitle}
                    onChange={(e) => setVidTitle(e.target.value)}
                    placeholder="e.g. Model Context Protocol Crash Course"
                    className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">YouTube Video ID *</label>
                    <input
                      type="text"
                      required
                      value={vidId}
                      onChange={(e) => setVidId(e.target.value)}
                      placeholder="e.g. dQw4w9WgXcQ"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Duration</label>
                    <input
                      type="text"
                      value={vidDuration}
                      onChange={(e) => setVidDuration(e.target.value)}
                      placeholder="e.g. 18:45"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Category</label>
                    <select
                      value={vidCategory}
                      onChange={(e) => setVidCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    >
                      <option>AI News</option>
                      <option>GenAI Tools</option>
                      <option>Tutorials</option>
                      <option>Prompt Engineering</option>
                      <option>Agentic AI</option>
                      <option>Cloud + AI</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Publish Date</label>
                    <input
                      type="text"
                      value={vidPublish}
                      onChange={(e) => setVidPublish(e.target.value)}
                      placeholder="e.g. 2 days ago"
                      className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Database Connection Banner */}
                <div className="flex items-center gap-2 text-xs py-1">
                  {isSupabaseConfigured ? (
                    <span className="text-green-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Connected to Supabase Cloud Database
                    </span>
                  ) : (
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      Fallback Static Mode (No Database Configured)
                    </span>
                  )}
                </div>

                {publishStatus === 'success' && (
                  <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Published Live successfully!
                  </div>
                )}
                
                {publishStatus === 'error' && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Failed to publish: {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={publishing}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-navy-dark font-bold py-3.5 rounded-xl text-xs tracking-widest hover:bg-brand-gold-bright transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(189,154,118,0.15)]"
                >
                  <Plus className="w-4 h-4" />
                  {publishing ? 'PUBLISHING LIVE...' : isSupabaseConfigured ? 'PUBLISH LIVE TO DATABASE' : 'PREVIEW & ADD VIDEO'}
                </button>
              </form>
            )}

            {/* Form: Trending Tweet */}
            {activeForm === 'tweet' && (
              <form onSubmit={handleAddTweetSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Twitter/X Tweet URL or Embed Code *</label>
                  <input
                    type="text"
                    required
                    value={tweetUrl}
                    onChange={(e) => setTweetUrl(e.target.value)}
                    placeholder="Paste tweet link or full HTML blockquote embed code"
                    className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase text-brand-gold tracking-wider">Hashtag Category *</label>
                  <input
                    type="text"
                    required
                    value={tweetTag}
                    onChange={(e) => setTweetTag(e.target.value)}
                    placeholder="e.g. #LLM or #NextJS"
                    className="w-full px-4 py-2.5 bg-brand-navy-dark text-slate-100 rounded-xl border border-brand-gold/20 focus:border-brand-gold focus:outline-none text-sm"
                  />
                </div>

                {/* Database Connection Banner */}
                <div className="flex items-center gap-2 text-xs py-1">
                  {isSupabaseConfigured ? (
                    <span className="text-green-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Connected to Supabase Cloud Database
                    </span>
                  ) : (
                    <span className="text-red-400 font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      Database configuration missing in .env
                    </span>
                  )}
                </div>

                {publishStatus === 'success' && (
                  <div className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Tweet linked successfully! It will now appear on your Trending page.
                  </div>
                )}
                
                {publishStatus === 'error' && (
                  <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-medium animate-in fade-in slide-in-from-top-1.5 duration-200">
                    Failed to publish: {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={publishing || !isSupabaseConfigured}
                  className="w-full flex items-center justify-center gap-2 bg-brand-gold text-brand-navy-dark font-bold py-3.5 rounded-xl text-xs tracking-widest hover:bg-brand-gold-bright transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_15px_rgba(189,154,118,0.15)]"
                >
                  <Plus className="w-4 h-4" />
                  {publishing ? 'PUBLISHING...' : 'PUBLISH TWEET LINK LIVE'}
                </button>
              </form>
            )}

          </div>

          {/* Code Configuration & Persistence Guide Side */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Guide callout */}
            <div className="p-4 rounded-2xl bg-brand-navy-light/10 border border-brand-gold/15 flex gap-3 text-xs leading-relaxed text-slate-400">
              <Info className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-200 block mb-1">Developer Curation Workflow</span>
                Adding content above updates the UI instantly so you can check how it looks. To persist these additions permanently, click **Copy Code Curation** below and overwrite the corresponding export inside [src/data/content.ts](file:///C:/Users/Kumar%20Shanu/.gemini/antigravity/scratch/techtonic-ai/src/data/content.ts).
              </div>
            </div>

            {/* Code container */}
            <div className="relative">
              <div className="absolute right-3 top-3 z-10">
                <button
                  onClick={() => triggerCopy(generateCodeConfig())}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-navy-light/40 hover:bg-brand-gold/20 border border-brand-gold/20 hover:border-brand-gold/40 text-[10px] sm:text-xs font-bold text-slate-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-brand-gold" />
                      COPIED!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      COPY CODE
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
                  Export Curation (Generated Code)
                </span>
                <pre className="w-full max-h-[300px] overflow-auto p-4 rounded-2xl bg-brand-navy-dark text-brand-gold-bright border border-brand-gold/10 font-mono text-[11px] leading-relaxed text-left select-all">
                  {generateCodeConfig()}
                </pre>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
