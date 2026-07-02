import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LATEST_UPDATES } from '../data/content';
import { Calendar, Tag, ArrowUpRight, Clock } from 'lucide-react';

interface UpdatesSectionProps {
  updates?: typeof LATEST_UPDATES;
}

export const UpdatesSection: React.FC<UpdatesSectionProps> = ({ updates = LATEST_UPDATES }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = [
    'All',
    'Models',
    'Research',
    'Developer Tools',
    'Enterprise AI',
    'Startups'
  ];

  const filteredUpdates = activeTab === 'All'
    ? updates
    : updates.filter(u => u.category === activeTab);

  // 3D Tilt Card effect handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Tilt limits: 10 degrees max
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
    <section id="updates" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            Latest AI & <span className="gold-gradient-text">Tech Updates</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Stay ahead with high-fidelity briefs on frontier research, model architecture upgrades, developer ecosystems, and silicon-optimized deployment layers.
          </p>
        </div>

        {/* Categories Navigation */}
        <div className="flex flex-wrap gap-2.5 pb-10 border-b border-brand-gold/10 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold/30 ${
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
                      <span className="flex items-center gap-1.5 font-medium">
                        <Tag className="w-3.5 h-3.5 text-brand-gold" />
                        {update.tag}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        {update.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg md:text-xl font-semibold leading-snug text-slate-100 group-hover:text-brand-gold-bright transition-colors duration-300">
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
