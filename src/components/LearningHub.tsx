import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_RESOURCES } from '../data/content';
import { BookOpen, Bookmark, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface LearningHubProps {
  resources?: typeof LEARNING_RESOURCES;
}

export const LearningHub: React.FC<LearningHubProps> = ({ resources = LEARNING_RESOURCES }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'API & Integration',
    'Developer Studio',
    'Models & Prompting',
    'Frameworks',
    'Infrastructure'
  ];

  const filteredResources = activeCategory === 'All'
    ? resources
    : resources.filter(r => r.category === activeCategory);

  return (
    <section id="learning" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            AI Developer <span className="gold-gradient-text">Learning Hub</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Curated directories connecting you directly to official documentation, SDK cookbooks, prompting standards, and model deploy configurations.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex flex-wrap gap-2.5 pb-10 border-b border-brand-gold/10 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none ${
                activeCategory === cat
                  ? 'bg-brand-gold text-brand-navy-dark font-bold shadow-[0_0_15px_rgba(189,154,118,0.35)]'
                  : 'bg-brand-navy-light/15 hover:bg-brand-navy-light/40 text-slate-300 border border-brand-gold/10 hover:border-brand-gold/35'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                className="group p-6 rounded-2xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top line: Brand and Category */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-gold">
                      {resource.company}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-semibold bg-brand-navy-light/30 border border-brand-gold/10 text-slate-300">
                      {resource.category}
                    </span>
                  </div>

                  {/* Tool Name */}
                  <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                    {resource.toolName}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Use case info */}
                  <div className="bg-brand-navy-deep/45 p-3 rounded-lg border border-brand-gold/5 flex gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-300 block mb-0.5">Use Case Profile</span>
                      <span className="text-slate-400 leading-normal">{resource.useCase}</span>
                    </div>
                  </div>
                </div>

                {/* Documentation Links */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-brand-gold/5">
                  <a
                    href={resource.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-brand-gold-bright bg-brand-navy-light/10 hover:bg-brand-navy-light/35 border border-brand-gold/10 hover:border-brand-gold/45 transition-all duration-300"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Official Docs
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a
                    href={resource.learnUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-brand-gold-bright hover:text-brand-navy-dark bg-brand-gold/5 hover:bg-brand-gold border border-brand-gold/20 hover:border-brand-gold transition-all duration-300"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    Learning Guide
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-serif text-lg">No learning resources found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
