import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_UPDATES } from '../data/content';
import { Calendar, ArrowUpRight, Clock, Flame, Newspaper, ChevronDown, Filter, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface UpdatesSectionProps {
  updates?: typeof LATEST_UPDATES;
  articles?: any[];
}

const SafeImage: React.FC<{ src: string; alt: string; className: string }> = ({ src, alt, className }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  if (error || !src) {
    return (
      <div className={`${className} bg-gradient-to-br from-brand-navy-light/40 to-brand-navy-deep flex items-center justify-center border border-brand-gold/10`}>
        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">TechTonic AI</div>
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

const CATEGORIES = [
  { id: 'All', name: 'All Updates' },
  { id: 'Labs', name: 'AI Labs & Models' },
  { id: 'Research', name: 'Research' },
  { id: 'Enterprise AI', name: 'Enterprise AI' },
  { id: 'Media', name: 'Tech Media' },
  { id: 'Developer Tools', name: 'Developer Tools' },
  { id: 'YouTube', name: 'YouTube Videos' }
];

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ 
  updates = LATEST_UPDATES,
  articles = []
}) => {
  const [feedType, setFeedType] = useState<'curated' | 'live'>('live');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showOlder, setShowOlder] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Pick the active dataset
  const activeList = feedType === 'curated' ? updates : articles;

  // Deduce company slug from item metadata
  const getCompanyKey = (sourceName: string, tag: string, source: string): string => {
    const sName = (sourceName || '').toLowerCase();
    const sTag = (tag || '').toLowerCase();
    const sSource = (source || '').toLowerCase();

    if (sName.includes('openai') || sTag.includes('openai') || sSource.includes('openai')) return 'openai';
    if (sName.includes('anthropic') || sTag.includes('anthropic') || sSource.includes('anthropic')) return 'anthropic';
    if (sName.includes('google') || sName.includes('deepmind') || sTag.includes('google') || sTag.includes('deepmind') || sSource.includes('google')) return 'google';
    if (sName.includes('microsoft') || sTag.includes('microsoft') || sSource.includes('microsoft')) return 'microsoft';
    if (sName.includes('aws') || sName.includes('amazon') || sTag.includes('aws') || sTag.includes('amazon') || sSource.includes('amazon')) return 'amazon';
    if (sName.includes('nvidia') || sTag.includes('nvidia') || sSource.includes('nvidia')) return 'nvidia';
    if (sName.includes('meta') || sTag.includes('meta') || sSource.includes('meta')) return 'meta';
    
    if (sName.includes('hugging') || sTag.includes('hugging') || sSource.includes('hugging') || sName.includes('ibm') || sName.includes('scale')) return 'other';
    
    return 'other';
  };

  // Get SVG/image logo URL for each company
  const getCompanyLogo = (compKey: string): string | null => {
    const key = (compKey || '').toLowerCase();
    if (key.includes('openai')) return 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg';
    if (key.includes('google') || key.includes('deepmind')) return 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg';
    if (key.includes('anthropic')) return 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg';
    if (key.includes('meta')) return 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg';
    if (key.includes('microsoft')) return 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg';
    if (key.includes('aws') || key.includes('amazon')) return 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg';
    if (key.includes('nvidia')) return 'https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg';
    return null;
  };

  // Maps items to dynamic categories
  const getItemCategory = (item: any): string => {
    const source = (item.sourceName || item.source || item.tag || '').toLowerCase();
    if (source.includes('youtube')) return 'YouTube';

    const cat = (item.category || '').toLowerCase();
    if (cat.includes('model') || cat.includes('labs') || cat.includes('openai') || cat.includes('anthropic')) return 'Labs';
    if (cat.includes('research') || cat.includes('deepmind') || cat.includes('google')) return 'Research';
    if (cat.includes('enterprise') || cat.includes('microsoft') || cat.includes('aws') || cat.includes('amazon')) return 'Enterprise AI';
    if (cat.includes('media') || cat.includes('techcrunch') || cat.includes('venture') || cat.includes('review')) return 'Media';
    if (cat.includes('developer') || cat.includes('tool') || cat.includes('hugging')) return 'Developer Tools';

    if (source.includes('openai') || source.includes('anthropic')) return 'Labs';
    if (source.includes('deepmind') || source.includes('google') || source.includes('mit')) return 'Research';
    if (source.includes('microsoft') || source.includes('aws') || source.includes('amazon')) return 'Enterprise AI';
    if (source.includes('techcrunch') || source.includes('venture') || source.includes('media')) return 'Media';
    
    return 'Labs'; // Fallback
  };

  // Filter based on selected category & freshness
  const filteredUpdates = activeList.filter((update) => {
    // 1. Freshness filter for Live News Feed (Capped at 48 hours by default, full history shown when showOlder is true)
    if (feedType === 'live' && !showOlder) {
      const publishedDate = new Date(update.publishedAt || update.date || new Date());
      const ageHours = (new Date().getTime() - publishedDate.getTime()) / (1000 * 60 * 60);
      
      const maxAge = 48; // 48h limit by default
      if (ageHours > maxAge) {
        return false;
      }
    }

    // 2. Category filter
    if (selectedCategory === 'All') return true;
    
    const itemCat = getItemCategory(update);
    return itemCat.toLowerCase() === selectedCategory.toLowerCase();
  });

  // Reset slider index when filters change
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCategory, feedType, showOlder]);

  // Helper to color-code AI sources on the live feed
  const getSourceStyle = (source: string) => {
    const src = source.toLowerCase();
    if (src.includes('openai')) return 'bg-[#10a37f]/10 text-[#10a37f] border-[#10a37f]/20';
    if (src.includes('anthropic')) return 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20';
    if (src.includes('deepmind') || src.includes('google')) return 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20';
    if (src.includes('microsoft')) return 'bg-[#00A4EF]/10 text-[#00A4EF] border-[#00A4EF]/20';
    if (src.includes('aws') || src.includes('amazon')) return 'bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20';
    if (src.includes('nvidia')) return 'bg-[#76B900]/10 text-[#76B900] border-[#76B900]/20';
    if (src.includes('meta')) return 'bg-[#0064e0]/10 text-[#0064e0] border-[#0064e0]/20';
    
    return 'bg-[#A855F7]/10 text-[#A855F7] border-[#A855F7]/20';
  };

  const handleNext = () => {
    if (activeIndex < filteredUpdates.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const activeLeader = filteredUpdates[activeIndex];

  return (
    <section id="updates" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-deep/80 overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/2 opacity-5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="text-center lg:text-left max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
              Latest AI & <span className="gold-gradient-text">Tech Updates</span>
            </h2>
            <div className="w-20 h-[3px] bg-brand-gold rounded-full lg:mx-0 mx-auto" />
            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
              Browse briefings in an interactive 3D Cover Flow cards list, designed for optimal readability and micro-UX immersion.
            </p>
          </div>

          {/* Feed Type Tab Toggle */}
          <div className="flex bg-brand-navy-deep/80 p-1.5 rounded-2xl border border-brand-gold/15 self-center lg:self-auto shadow-inner select-none">
            <button
              onClick={() => setFeedType('live')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                feedType === 'live'
                  ? 'bg-brand-gold text-brand-navy-dark shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              Live News Feed
            </button>
            <button
              onClick={() => setFeedType('curated')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                feedType === 'curated'
                  ? 'bg-brand-gold text-brand-navy-dark shadow-md font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Editor Briefings
            </button>
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="mb-12 relative flex flex-col items-center sm:items-start select-none w-full">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-brand-gold" />
            Filter briefings by category
          </label>
          
          <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setShowOlder(false);
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-brand-gold text-brand-navy-dark border-brand-gold shadow-lg shadow-brand-gold/15 font-bold'
                    : 'bg-brand-navy-deep/40 text-slate-400 border-brand-gold/10 hover:border-brand-gold/30 hover:text-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Carousel Cover Flow Container */}
        {filteredUpdates.length > 0 ? (
          <div className="space-y-12">
            
            {/* Carousel Viewport */}
            <div className="relative h-[240px] md:h-[280px] w-full flex items-center justify-center select-none">
              
              {/* Left Navigation Arrow */}
              <button
                onClick={handlePrev}
                disabled={activeIndex === 0}
                className="absolute left-0 md:left-4 z-40 p-3 rounded-full bg-brand-navy-light/20 border border-brand-gold/20 hover:border-brand-gold text-brand-gold-bright disabled:opacity-20 disabled:pointer-events-none hover:bg-brand-gold/10 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Cover Flow Deck wrapper */}
              <div 
                className="relative w-full max-w-[280px] sm:max-w-[400px] h-full flex items-center justify-center"
                style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
              >
                {filteredUpdates.map((update, index) => {
                  const diff = index - activeIndex;
                  const isActive = diff === 0;
                  
                  // Calculate absolute position style for 3D deck
                  let transform = 'translateX(0) scale(0.5) translateZ(-500px)';
                  let opacity = 0;
                  let zIndex = 10;
                  let pointerEvents: 'auto' | 'none' = 'none';

                  if (diff === 0) {
                    transform = 'translateX(0) scale(1) translateZ(100px)';
                    opacity = 1;
                    zIndex = 30;
                    pointerEvents = 'auto' as const;
                  } else if (diff === 1) {
                    transform = 'translateX(45%) scale(0.85) rotateY(-30deg) translateZ(0px)';
                    opacity = 0.55;
                    zIndex = 20;
                    pointerEvents = 'auto' as const;
                  } else if (diff === -1) {
                    transform = 'translateX(-45%) scale(0.85) rotateY(30deg) translateZ(0px)';
                    opacity = 0.55;
                    zIndex = 20;
                    pointerEvents = 'auto' as const;
                  } else if (diff === 2) {
                    transform = 'translateX(80%) scale(0.7) rotateY(-40deg) translateZ(-100px)';
                    opacity = 0.25;
                    zIndex = 15;
                  } else if (diff === -2) {
                    transform = 'translateX(-80%) scale(0.7) rotateY(40deg) translateZ(-100px)';
                    opacity = 0.25;
                    zIndex = 15;
                  }

                  return (
                    <div
                      key={update.id}
                      onClick={() => {
                        if (!isActive) setActiveIndex(index);
                      }}
                      style={{ 
                        transform, 
                        opacity, 
                        zIndex, 
                        pointerEvents,
                        transition: 'transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.45s, z-index 0.45s'
                      }}
                      className={`absolute w-full h-full p-6 sm:p-7 rounded-3xl border text-left bg-gradient-to-b from-brand-navy-deep/90 to-brand-navy/95 backdrop-blur-md shadow-2xl flex flex-col justify-between cursor-pointer ${
                        isActive ? 'border-brand-gold shadow-[0_10px_35px_rgba(189,154,118,0.25)]' : 'border-brand-gold/10 hover:border-brand-gold/30'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-[9px] uppercase tracking-wider text-slate-500 font-bold">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border ${
                            feedType === 'live' ? getSourceStyle(update.sourceName) : 'bg-brand-gold/10 text-brand-gold border-brand-gold/25'
                          }`}>
                            {feedType === 'live' ? update.sourceName : update.tag}
                          </span>
                          <span className="flex items-center gap-1 font-mono text-[9px]">
                            <Clock className="w-3 h-3" />
                            {update.readTime}
                          </span>
                        </div>

                          <div className="flex gap-3.5 items-start">
                            {update.imageUrl && (
                              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-brand-gold/15 shadow-md bg-brand-navy/60 relative">
                                <SafeImage src={update.imageUrl} alt="" className="w-full h-full object-cover" />
                                {/* Brand Logo Overlay */}
                                {(() => {
                                  const compField = (update as any).company || '';
                                  const compKey = compField ? compField.toLowerCase() : getCompanyKey(update.sourceName || '', update.tag || '', update.source || '');
                                  const logoUrl = getCompanyLogo(compKey);
                                  if (!logoUrl) return null;
                                  return (
                                    <div className="absolute bottom-1 right-1 bg-brand-navy-deep/95 border border-brand-gold/20 p-0.5 rounded-md flex items-center justify-center shadow-md z-10">
                                      <img src={logoUrl} alt="" className="w-3.5 h-3.5 object-contain filter brightness-110" />
                                    </div>
                                  );
                                })()}
                              </div>
                            )}
                            <h3 className="font-serif text-xs sm:text-sm font-bold leading-snug text-slate-200 line-clamp-3 flex-1">
                              {update.title}
                            </h3>
                          </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {update.date}
                        </div>
                        {isActive && (
                          <span className="text-brand-gold font-bold flex items-center gap-0.5">
                            Details
                            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Navigation Arrow */}
              <button
                onClick={handleNext}
                disabled={activeIndex === filteredUpdates.length - 1}
                className="absolute right-0 md:right-4 z-40 p-3 rounded-full bg-brand-navy-light/20 border border-brand-gold/20 hover:border-brand-gold text-brand-gold-bright disabled:opacity-20 disabled:pointer-events-none hover:bg-brand-gold/10 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Selected Card Details Pane (High Readability Panel) */}
            <AnimatePresence mode="wait">
              {activeLeader && (
                <motion.div
                  key={activeLeader.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="max-w-4xl mx-auto rounded-3xl glass-panel border border-brand-gold/20 relative overflow-hidden bg-brand-navy-deep/40 shadow-2xl flex flex-col md:flex-row animate-fade-in"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-gold z-10" />
                  
                  {activeLeader.imageUrl && (
                    <div className="w-full md:w-[35%] h-48 md:h-auto min-h-[220px] relative overflow-hidden bg-brand-navy/30 shrink-0 border-b md:border-b-0 md:border-r border-brand-gold/10">
                      <SafeImage src={activeLeader.imageUrl} alt={activeLeader.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-brand-navy-deep/90 via-transparent to-transparent pointer-events-none" />
                      {/* Floating Brand Badge */}
                      {(() => {
                        const compField = (activeLeader as any).company || '';
                        const compKey = compField ? compField.toLowerCase() : getCompanyKey(activeLeader.sourceName || '', activeLeader.tag || '', activeLeader.source || '');
                        const logoUrl = getCompanyLogo(compKey);
                        if (!logoUrl) return null;
                        return (
                          <div className="absolute top-4 left-4 bg-brand-navy-deep/90 backdrop-blur-md border border-brand-gold/30 p-2 rounded-xl flex items-center justify-center shadow-lg z-10">
                            <img src={logoUrl} alt={`${compKey} Logo`} className="w-6 h-6 object-contain filter brightness-110" />
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  <div className="flex-1 p-6 md:p-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-[10px] font-bold uppercase tracking-wider">
                        {feedType === 'live' ? activeLeader.sourceName : activeLeader.tag}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Clock className="w-3.5 h-3.5" />
                        {activeLeader.readTime}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {activeLeader.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-slate-100">
                      {activeLeader.title}
                    </h3>

                    {(() => {
                      const summaryText = activeLeader.summary;
                      if (!summaryText) return null;
                      if (summaryText.includes('•') || summaryText.includes('\n-') || summaryText.startsWith('-')) {
                        const points = summaryText
                          .split('•')
                          .map((p: string) => p.trim())
                          .filter(Boolean);
                        return (
                          <ul className="space-y-3.5 text-slate-300 text-sm sm:text-base leading-relaxed border-t border-brand-gold/5 pt-4">
                            {points.map((point: string, index: number) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0 shadow-[0_0_8px_rgba(189,154,118,0.7)]" />
                                <span className="flex-1 text-slate-300">{point}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      }
                      return (
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed border-t border-brand-gold/5 pt-4 whitespace-pre-line">
                          {summaryText}
                        </p>
                      );
                    })()}

                    {activeLeader.sourceName !== 'YouTube' && (
                      <div className="pt-6 mt-6 border-t border-brand-gold/5 flex justify-end">
                        <a
                          href={activeLeader.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-widest text-brand-gold-bright hover:text-brand-gold transition-colors duration-300 cursor-pointer uppercase"
                        >
                          <BookOpen className="w-4 h-4" />
                          Explore Research Source
                          <ArrowUpRight className="w-4.5 h-4.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : (
          <div className="w-full max-w-2xl mx-auto p-12 rounded-3xl border border-brand-gold/15 bg-brand-navy-deep/60 backdrop-blur-md shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center mx-auto text-brand-gold">
              <Clock className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-200">No Recent Updates Found</h3>
              <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                {feedType === 'live'
                  ? `There are no new AI news releases in the last ${showOlder ? 'month' : '48 hours'} for this category.`
                  : 'No curated editor briefings are available under this category.'}
              </p>
            </div>
            {feedType === 'live' && !showOlder && (
              <button
                onClick={() => setShowOlder(true)}
                className="px-6 py-3 rounded-xl bg-brand-gold text-brand-navy-dark hover:bg-brand-gold-bright transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
              >
                View Older Stories
              </button>
            )}
          </div>
        )}

        {/* View Older Stories Button at bottom when articles exist */}
        {filteredUpdates.length > 0 && feedType === 'live' && !showOlder && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setShowOlder(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-gold/15 hover:border-brand-gold/40 text-slate-400 hover:text-slate-200 transition-all text-xs font-bold uppercase tracking-wider cursor-pointer bg-brand-navy-deep/30"
            >
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              Looking for more? View older stories
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default UpdatesSection;
