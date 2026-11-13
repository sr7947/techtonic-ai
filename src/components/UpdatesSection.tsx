import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card3D } from './Card3D';
import { 
  Calendar, 
  ArrowUpRight, 
  Clock, 
  Flame, 
  Search, 
  Video as VideoIcon,
  Sparkles,
  ChevronDown,
  Archive,
  RotateCcw
} from 'lucide-react';

interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  category?: string;
  date?: string;
  published_at?: string;
  publishedAt?: string;
  created_at?: string;
  url: string;
  sourceName?: string;
  source?: string;
  author?: string;
  imageUrl?: string;
  image_url?: string;
  videoUrl?: string;
  video_url?: string;
  tag?: string;
}

interface UpdatesSectionProps {
  updates?: any[];
  articles?: any[];
}

const SafeImage: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Prevent rate-limit graphic from third-party image generation services (like pollinations.ai)
  const isRateLimited = typeof src === 'string' && (src.includes('pollinations.ai') || src.includes('free limit reached'));

  if (error || !src || isRateLimited) {
    return (
      <div className={`${className} bg-gradient-to-br from-[#0A1124] via-[#050814] to-[#0F1B38] flex flex-col items-center justify-center border border-brand-gold/15 p-4 relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.06),_transparent)] pointer-events-none" />
        <img 
          src="/wenzdaylab-logo.svg" 
          alt="WenzdayLab" 
          className="w-10 h-10 object-contain mb-1.5 opacity-85 group-hover:scale-110 transition-transform drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]" 
        />
        <div className="text-xs font-display font-extrabold tracking-widest text-brand-gold uppercase">
          WENZDAY<span className="text-slate-100">LAB</span>
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-semibold mt-0.5">
          Official Industry Update
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-light/40 to-brand-navy-deep flex items-center justify-center border border-brand-gold/10 animate-pulse">
          <div className="text-[9px] text-slate-500 font-mono">LOADING...</div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
      />
    </div>
  );
};

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ 
  updates = [],
  articles = []
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [showArchive, setShowArchive] = useState<boolean>(false);

  // Reset pagination when search query or filter chip changes
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCompany, showArchive]);

  // Combine live ingested articles and admin-curated updates with strict deduplication
  const allDeduplicatedItems = useMemo(() => {
    const combined = articles.length > 0 ? articles : updates;
    
    const seen = new Set<string>();
    const unique: ArticleItem[] = [];

    for (const item of combined) {
      const key = (item.url || item.article_url || item.title || '').toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push({
          id: item.id || String(Math.random()),
          title: item.title,
          summary: item.summary,
          category: item.category || 'AI Labs',
          date: item.date,
          published_at: item.published_at || item.publishedAt || item.date,
          created_at: item.created_at,
          url: item.url || item.article_url || '#',
          sourceName: item.sourceName || item.source || 'Official Source',
          author: item.author || item.sourceName || 'AI Lab',
          imageUrl: item.imageUrl || item.image_url,
          videoUrl: item.videoUrl || item.video_url,
          tag: item.tag
        });
      }
    }

    // Sort strictly newest-first using highest effective date
    return unique.sort((a, b) => {
      const dateA = Math.max(
        a.published_at ? new Date(a.published_at).getTime() : 0,
        a.created_at ? new Date(a.created_at).getTime() : 0
      );
      const dateB = Math.max(
        b.published_at ? new Date(b.published_at).getTime() : 0,
        b.created_at ? new Date(b.created_at).getTime() : 0
      );
      return dateB - dateA;
    });
  }, [articles, updates]);

  // Company filter chips
  const companyFilters = [
    'All',
    'OpenAI',
    'Anthropic',
    'Google DeepMind',
    'NVIDIA',
    'Microsoft',
    'Amazon',
    'ElevenLabs',
    'Meta',
    'DeepSeek',
    'xAI',
    'Hugging Face',
    'Developer Tools'
  ];

  // Recommendations A, C: Filter by company, search query, 7-day recency & fallback
  const { filteredArticles, isFallbackApplied } = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const compLower = selectedCompany.toLowerCase();
    
    // 7 days = 168 hours
    const sevenDaysThreshold = Date.now() - (7 * 24 * 60 * 60 * 1000);

    // 1. Filter by search query and company from the full deduplicated pool
    const matchingCompanyAndQuery = allDeduplicatedItems.filter((item) => {
      const source = (item.sourceName || '').toLowerCase();
      const title = (item.title || '').toLowerCase();
      const summary = (item.summary || '').toLowerCase();

      const matchesSearch = !query || title.includes(query) || summary.includes(query) || source.includes(query);
      if (!matchesSearch) return false;

      if (selectedCompany === 'All') return true;

      if (compLower === 'google deepmind') {
        return source.includes('google') || source.includes('deepmind');
      }
      if (compLower === 'developer tools') {
        return source.includes('cursor') || source.includes('ollama') || source.includes('langchain') || source.includes('vercel') || source.includes('hugging') || source.includes('typesafe');
      }

      return source.includes(compLower);
    });

    // 2. If Archive browsing mode is explicitly enabled, show all matching articles
    if (showArchive) {
      return {
        filteredArticles: matchingCompanyAndQuery,
        isFallbackApplied: false
      };
    }

    // 3. Recommendation A: Default to 7 days
    const last7DaysItems = matchingCompanyAndQuery.filter((item) => {
      const pubDateVal = item.published_at ? new Date(item.published_at).getTime() : 0;
      const createdDateVal = item.created_at ? new Date(item.created_at).getTime() : 0;
      const effectiveDate = Math.max(pubDateVal, createdDateVal);
      return !isNaN(effectiveDate) && effectiveDate >= sevenDaysThreshold;
    });

    // 4. Recommendation C: Fallback for Company Filter Chips
    // If a specific company is selected and has 0 articles in the last 7 days,
    // automatically fall back to showing their latest announcements so users never see an empty screen!
    if (selectedCompany !== 'All' && last7DaysItems.length === 0 && matchingCompanyAndQuery.length > 0) {
      return {
        filteredArticles: matchingCompanyAndQuery.slice(0, 15),
        isFallbackApplied: true
      };
    }

    return {
      filteredArticles: last7DaysItems,
      isFallbackApplied: false
    };
  }, [allDeduplicatedItems, searchQuery, selectedCompany, showArchive]);

  // Recommendation D: Paginated visible items
  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  // Relative time helper
  const getRelativeTime = (timestamp?: string) => {
    if (!timestamp) return 'Recently';
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) return 'Recently';

    const diffMs = Date.now() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays}d ago`;
  };

  // Recommendation B: Smart Recency Badge helper (🔥 Today, ⚡ This Week, 📅 Earlier)
  const getRecencyBadge = (timestamp?: string) => {
    if (!timestamp) return null;
    const time = new Date(timestamp).getTime();
    if (isNaN(time)) return null;

    const diffMs = Date.now() - time;
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 24) {
      return {
        label: '🔥 Today',
        className: 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
      };
    }
    if (diffHours <= 7 * 24) {
      return {
        label: '⚡ This Week',
        className: 'bg-brand-gold/15 text-brand-gold-bright border-brand-gold/30'
      };
    }
    return {
      label: '📅 Earlier',
      className: 'bg-slate-700/40 text-slate-300 border-slate-600/30'
    };
  };

  // Source logo styling helper
  const getSourceBadgeColor = (source: string) => {
    const s = (source || '').toLowerCase();
    if (s.includes('openai')) return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    if (s.includes('anthropic')) return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
    if (s.includes('google') || s.includes('deepmind')) return 'bg-blue-500/15 text-blue-400 border-blue-500/30';
    if (s.includes('microsoft')) return 'bg-sky-500/15 text-sky-400 border-sky-500/30';
    if (s.includes('nvidia')) return 'bg-lime-500/15 text-lime-400 border-lime-500/30';
    if (s.includes('meta')) return 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
    if (s.includes('deepseek')) return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    if (s.includes('xai') || s.includes('x.ai')) return 'bg-slate-400/15 text-slate-300 border-slate-500/30';
    return 'bg-brand-gold/15 text-brand-gold-bright border-brand-gold/30';
  };

  return (
    <section id="updates" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 backdrop-blur-md">
            <Flame className="w-4 h-4 text-brand-gold animate-bounce" />
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gold-bright">
              Official Industry Feed
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 uppercase tracking-tight">
            Latest <span className="gold-gradient-text">Updates</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
            Live news aggregated directly from 43 official company blogs, research laboratories, and engineering teams. Showing verified announcements from the <strong>{showArchive ? 'Historical Archive' : 'last 7 days'}</strong>.
          </p>
        </div>

        {/* Counter & Mode Indicator */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-brand-navy-deep/90 border border-brand-gold/20 text-xs font-semibold text-slate-300 backdrop-blur-md shadow-lg">
            <Clock className="w-4 h-4 text-brand-gold" />
            <span>
              {showArchive ? 'Archive Total' : 'Last 7 Days'}: <strong className="text-brand-gold-bright font-bold">{filteredArticles.length}</strong> updates
            </span>
          </div>

          {showArchive && (
            <button
              onClick={() => setShowArchive(false)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/30 text-xs font-bold text-brand-gold-bright transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to 7-Day View</span>
            </button>
          )}
        </div>
      </div>

      {/* Recommendation C Fallback Notice */}
      {isFallbackApplied && (
        <div className="mb-6 p-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md flex items-center gap-3 text-xs sm:text-sm text-slate-200">
          <Sparkles className="w-4 h-4 text-brand-gold shrink-0" />
          <span>
            No announcements from <strong>{selectedCompany}</strong> in the last 7 days. Displaying their <strong>latest official releases</strong> below so you never miss an update.
          </span>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-brand-navy-deep/80 border border-brand-gold/20 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl mb-10 space-y-5">
        
        {/* Search Input Row */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-brand-gold absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search verified announcements by title, AI lab, or topic..."
            className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-sm rounded-2xl pl-11 pr-4 py-3.5 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
            >
              Clear
            </button>
          )}
        </div>

        {/* Company Quick Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-gold/10">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1">
            Source:
          </span>
          {companyFilters.map((company) => {
            const isSelected = selectedCompany === company;
            return (
              <button
                key={company}
                onClick={() => setSelectedCompany(company)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-[0_0_15px_rgba(189,154,118,0.35)] scale-105'
                    : 'bg-brand-navy-dark/70 hover:bg-brand-navy-light/60 text-slate-300 border border-brand-gold/15 hover:border-brand-gold/30'
                }`}
              >
                {company}
              </button>
            );
          })}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-20 bg-brand-navy-deep/40 rounded-3xl border border-brand-gold/15 p-8">
          <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-200">No updates found for the selected filter</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-md mx-auto">
            Try choosing a different company filter or unlocking the historical archive below.
          </p>
          {!showArchive && (
            <button
              onClick={() => setShowArchive(true)}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold/20 hover:bg-brand-gold/30 border border-brand-gold/40 text-xs font-bold text-brand-gold-bright transition-all cursor-pointer"
            >
              <Archive className="w-4 h-4" />
              <span>Search Historical Archive</span>
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleArticles.map((article, idx) => {
              const relTime = getRelativeTime(article.published_at);
              const badgeStyle = getSourceBadgeColor(article.sourceName || '');
              const recencyBadge = getRecencyBadge(article.published_at);

              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.3) }}
                  className="h-full"
                >
                  <Card3D depth={8} className="h-full">
                    <article
                      className="group relative flex flex-col justify-between h-full rounded-3xl bg-brand-navy-deep/85 border border-brand-gold/20 hover:border-brand-gold/60 transition-colors duration-300 overflow-hidden shadow-2xl"
                    >
                      {/* Media Image / Video Banner */}
                      {article.imageUrl && (
                        <div className="relative w-full h-48 overflow-hidden bg-brand-navy-dark border-b border-brand-gold/10">
                          <SafeImage
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Source Name Overlay Pill */}
                          <div className="absolute top-3 left-3" style={{ transform: 'translateZ(25px)' }}>
                            <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md border shadow-lg ${badgeStyle}`}>
                              {article.sourceName}
                            </span>
                          </div>

                          {/* Recommendation B: Smart Recency Badge & Relative Time Overlay */}
                          <div className="absolute top-3 right-3 flex items-center gap-1.5" style={{ transform: 'translateZ(25px)' }}>
                            {recencyBadge && (
                              <span className={`px-2 py-0.5 rounded-xl border text-[9px] font-extrabold uppercase tracking-wide backdrop-blur-md shadow-md ${recencyBadge.className}`}>
                                {recencyBadge.label}
                              </span>
                            )}
                            <div className="bg-brand-navy-dark/90 backdrop-blur-md px-2.5 py-1 rounded-xl border border-brand-gold/20 text-[10px] font-bold text-slate-300 flex items-center gap-1 shadow-lg">
                              <Clock className="w-3 h-3 text-brand-gold" />
                              <span>{relTime}</span>
                            </div>
                          </div>

                          {/* Video indicator if available */}
                          {article.videoUrl && (
                            <div className="absolute bottom-3 right-3 bg-red-600/90 text-white p-1.5 rounded-lg backdrop-blur-sm shadow-md" style={{ transform: 'translateZ(25px)' }}>
                              <VideoIcon className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Card Content Body */}
                      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                        
                        <div className="space-y-3">
                          {/* Header line if no image */}
                          {!article.imageUrl && (
                            <div className="flex items-center justify-between gap-2 pb-1" style={{ transform: 'translateZ(20px)' }}>
                              <span className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${badgeStyle}`}>
                                {article.sourceName}
                              </span>
                              
                              {/* Recency Badge for non-image cards */}
                              <div className="flex items-center gap-1.5">
                                {recencyBadge && (
                                  <span className={`px-2 py-0.5 rounded-xl border text-[9px] font-extrabold uppercase tracking-wide shadow-sm ${recencyBadge.className}`}>
                                    {recencyBadge.label}
                                  </span>
                                )}
                                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-brand-gold" />
                                  {relTime}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Article Title */}
                          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-100 group-hover:text-brand-gold transition-colors leading-snug line-clamp-2" style={{ transform: 'translateZ(15px)' }}>
                            <a
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="focus:outline-none"
                            >
                              {article.title}
                            </a>
                          </h3>

                          {/* Article Summary */}
                          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                            {article.summary}
                          </p>
                        </div>

                        {/* Card Footer: Metadata & Link */}
                        <div className="pt-4 border-t border-brand-gold/10 flex items-center justify-between gap-2" style={{ transform: 'translateZ(20px)' }}>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-semibold truncate">
                            <Calendar className="w-3 h-3 text-brand-gold shrink-0" />
                            <span className="truncate">
                              {article.published_at ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Official Release'}
                            </span>
                          </div>

                          <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold hover:text-brand-gold-bright transition-colors shrink-0 group/link"
                          >
                            <span>Read Original</span>
                            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                          </a>
                        </div>

                      </div>
                    </article>
                  </Card3D>
                </motion.div>
              );
            })}
          </div>

          {/* Recommendation D: Load More & Historical Archive Controls */}
          <div className="mt-14 flex flex-col items-center justify-center gap-4">
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Load More Button */}
              {visibleCount < filteredArticles.length && (
                <button
                  onClick={() => setVisibleCount(prev => prev + 12)}
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark font-extrabold text-sm uppercase tracking-wider hover:brightness-110 shadow-[0_0_20px_rgba(189,154,118,0.35)] transition-all flex items-center gap-2.5 cursor-pointer active:scale-95"
                >
                  <ChevronDown className="w-4 h-4 animate-bounce" />
                  <span>Load More Updates</span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-navy-dark/30 text-xs font-mono">
                    +{Math.min(12, filteredArticles.length - visibleCount)}
                  </span>
                </button>
              )}

              {/* Archive Toggle Button */}
              {!showArchive && (
                <button
                  onClick={() => {
                    setShowArchive(true);
                    setVisibleCount(16);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-brand-navy-deep/90 hover:bg-brand-navy-light/60 border border-brand-gold/25 hover:border-brand-gold/50 text-slate-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg active:scale-95"
                >
                  <Archive className="w-4 h-4 text-brand-gold" />
                  <span>Browse Historical Archive</span>
                </button>
              )}
            </div>

            {/* Pagination Status Text */}
            <p className="text-xs text-slate-400 font-medium">
              Showing <strong className="text-slate-200">{visibleArticles.length}</strong> of <strong className="text-brand-gold-bright">{filteredArticles.length}</strong> updates
              {showArchive ? ' (Historical Archive Mode)' : ' (7-Day Recency Mode)'}
            </p>
          </div>
        </>
      )}

    </section>
  );
};
