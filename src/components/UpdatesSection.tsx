import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_UPDATES } from '../data/content';
import { Calendar, ArrowUpRight, Clock, Flame, Newspaper, ChevronDown, Filter, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface UpdatesSectionProps {
  updates?: typeof LATEST_UPDATES;
  articles?: any[];
}

const COMPANIES = [
  { id: 'All', name: 'All Companies', color: 'bg-slate-400' },
  { id: 'google', name: 'Google / DeepMind', color: 'bg-[#4285F4]' },
  { id: 'openai', name: 'OpenAI', color: 'bg-[#10a37f]' },
  { id: 'anthropic', name: 'Anthropic', color: 'bg-[#D97706]' },
  { id: 'meta', name: 'Meta AI', color: 'bg-[#0064e0]' },
  { id: 'microsoft', name: 'Microsoft AI', color: 'bg-[#00A4EF]' },
  { id: 'amazon', name: 'Amazon Web Services', color: 'bg-[#FF9900]' },
  { id: 'nvidia', name: 'Nvidia AI', color: 'bg-[#76B900]' },
  { id: 'other', name: 'Others (IBM, Hugging Face, etc.)', color: 'bg-[#A855F7]' }
];

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ 
  updates = LATEST_UPDATES,
  articles = []
}) => {
  const [feedType, setFeedType] = useState<'curated' | 'live'>('curated');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  // Filter based on selected company
  const filteredUpdates = activeList.filter((update) => {
    const companyField = (update as any).company || '';
    const compKey = companyField ? companyField.toLowerCase() : getCompanyKey(update.sourceName || '', update.tag || '', update.source || '');
    return selectedCompany === 'All' || compKey === selectedCompany.toLowerCase();
  });

  // Reset slider index when filters change
  useEffect(() => {
    setActiveIndex(0);
  }, [selectedCompany, feedType]);

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
  const selectedCompanyObj = COMPANIES.find(c => c.id === selectedCompany) || COMPANIES[0];

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
          </div>
        </div>

        {/* Company Dropdown Filter */}
        <div className="mb-12 relative flex flex-col items-center sm:items-start select-none">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-brand-gold" />
            Filter updates by company
          </label>
          
          <div className="relative w-72">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-brand-navy-light/10 border border-brand-gold/20 hover:border-brand-gold/50 rounded-2xl px-5 py-3.5 text-slate-200 text-sm font-semibold tracking-wide transition-all duration-300 outline-none backdrop-blur-md cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedCompanyObj.color} shadow-sm`} />
                <span>{selectedCompanyObj.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2.5 w-full rounded-2xl glass-panel border border-brand-gold/20 bg-brand-navy-deep p-2 shadow-2xl z-40 max-h-72 overflow-y-auto">
                {COMPANIES.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      setSelectedCompany(comp.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-semibold rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      selectedCompany === comp.id
                        ? 'bg-brand-gold text-brand-navy-dark'
                        : 'text-slate-300 hover:bg-brand-navy-light/20 hover:text-slate-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedCompany === comp.id ? 'bg-brand-navy-dark' : comp.color}`} />
                    <span>{comp.name}</span>
                  </button>
                ))}
              </div>
            )}
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

                        <h3 className="font-serif text-sm sm:text-base font-bold leading-snug text-slate-200 line-clamp-3">
                          {update.title}
                        </h3>
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
                  className="max-w-3xl mx-auto p-6 md:p-8 rounded-3xl glass-panel border border-brand-gold/20 relative overflow-hidden bg-brand-navy-deep/40 shadow-2xl"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-gold" />
                  
                  <div className="space-y-5">
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

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed border-t border-brand-gold/5 pt-4 whitespace-pre-line">
                      {activeLeader.summary}
                    </p>

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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400 font-serif text-lg">No updates found for this company.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default UpdatesSection;
