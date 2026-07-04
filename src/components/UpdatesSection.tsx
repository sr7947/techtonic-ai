import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_UPDATES } from '../data/content';
import { Calendar, Tag, ArrowUpRight, Clock, Flame, Newspaper } from 'lucide-react';

interface UpdatesSectionProps {
  updates?: typeof LATEST_UPDATES;
  articles?: any[];
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ 
  updates = LATEST_UPDATES,
  articles = []
}) => {
  const [feedType, setFeedType] = useState<'curated' | 'live'>('curated');
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = [
    'All',
    'Models',
    'Research',
    'Developer Tools',
    'Enterprise AI',
    'Startups'
  ];

  // Pick the active dataset
  const activeList = feedType === 'curated' ? updates : articles;

  // Filter based on selected category tab
  const filteredUpdates = activeTab === 'All'
    ? activeList
    : activeList.filter(u => u.category === activeTab);

  // Helper to color-code AI sources on the live feed
  const getSourceStyle = (source: string) => {
    const src = source.toLowerCase();
    if (src.includes('openai')) {
      return 'bg-[#10a37f]/10 text-[#10a37f] border-[#10a37f]/20';
    } else if (src.includes('anthropic')) {
      return 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20';
    } else if (src.includes('deepmind') || src.includes('google')) {
      return 'bg-[#4285F4]/10 text-[#4285F4] border-[#4285F4]/20';
    } else if (src.includes('microsoft')) {
      return 'bg-[#00A4EF]/10 text-[#00A4EF] border-[#00A4EF]/20';
    } else if (src.includes('aws') || src.includes('amazon')) {
      return 'bg-[#FF9900]/10 text-[#FF9900] border-[#FF9900]/20';
    } else if (src.includes('nvidia')) {
      return 'bg-[#76B900]/10 text-[#76B900] border-[#76B900]/20';
    } else if (src.includes('hugging')) {
      return 'bg-[#FBBF24]/10 text-[#F59E0B] border-[#FBBF24]/20';
    }
    return 'bg-brand-gold/10 text-brand-gold-bright border-brand-gold/20';
  };

  // 3D Tilt Card effect handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / (yc / 8);
    const angleY = (x - xc) / (xc / 8);
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-8px)`;
    card.style.boxShadow = '0 15px 30px rgba(189, 154, 118, 0.1)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.boxShadow = '0 0px 0px rgba(0, 0, 0, 0)';
  };

  return (
    <section id="updates" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-deep/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="text-center lg:text-left max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
              Latest AI & <span className="gold-gradient-text">Tech Updates</span>
            </h2>
            <div className="w-20 h-[3px] bg-brand-gold rounded-full lg:mx-0 mx-auto" />
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Stay ahead with high-fidelity briefs on frontier research, model architecture upgrades, developer ecosystems, and silicon-optimized deployment layers.
            </p>
          </div>

          {/* Feed Type Tab Toggle (Curated Briefs vs Live Feed) */}
          <div className="flex bg-brand-navy-deep/80 p-1.5 rounded-2xl border border-brand-gold/15 self-center lg:self-auto shadow-inner select-none">
            <button
              onClick={() => {
                setFeedType('curated');
                setActiveTab('All');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                feedType === 'curated'
                  ? 'bg-brand-gold text-brand-navy-dark shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              Editor Briefings
            </button>
            <button
              onClick={() => {
                setFeedType('live');
                setActiveTab('All');
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                feedType === 'live'
                  ? 'bg-brand-gold text-brand-navy-dark shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              Live News Feed
            </button>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="flex flex-wrap gap-2.5 pb-10 border-b border-brand-gold/10 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold/30 cursor-pointer ${
                activeTab === cat
                  ? 'bg-brand-gold text-brand-navy-dark font-bold shadow-[0_0_15px_rgba(189,154,118,0.35)]'
                  : 'bg-brand-navy-light/15 hover:bg-brand-navy-light/40 text-slate-300 border border-brand-gold/10 hover:border-brand-gold/35'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Updates Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{ transition: 'transform 0.1s ease-out, border 0.3s ease, box-shadow 0.3s ease' }}
                  className="group relative h-full flex flex-col justify-between p-6 rounded-2xl glass-panel gold-border-glow select-none"
                >
                  <div className="space-y-4">
                    {/* Meta info */}
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${
                        feedType === 'live' ? getSourceStyle(update.sourceName) : 'bg-brand-gold/5 text-brand-gold-bright border-brand-gold/15'
                      }`}>
                        <Tag className="w-3 h-3 flex-shrink-0" />
                        {feedType === 'live' ? update.sourceName : update.tag}
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        {update.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg md:text-xl font-semibold leading-snug text-slate-100 group-hover:text-brand-gold-bright transition-colors duration-300 line-clamp-3">
                      {update.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                      {update.summary}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 pt-4 border-t border-brand-gold/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {update.date}
                    </div>
                    
                    <a
                      href={update.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-brand-gold-bright hover:text-brand-gold transition-colors duration-300 focus:outline-none"
                    >
                      READ MORE
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Glow flare */}
                  <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-brand-gold/3 opacity-0 group-hover:opacity-100 rounded-full blur-xl transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredUpdates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-serif text-lg">No updates found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
