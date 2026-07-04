import React from 'react';
import { motion } from 'framer-motion';
import { TRENDING_TOPICS } from '../data/content';
import { TrendingUp, Hash } from 'lucide-react';

export const TrendingTopics: React.FC = () => {
  return (
    <section id="trending" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      
      {/* Decorative Blur Orb */}
      <div className="glow-orb top-10 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            Trending <span className="gold-gradient-text">Ecosystem Topics</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Key areas of research, integration standards, and infrastructure that we actively explore in our channel updates and repositories.
          </p>
        </div>

        {/* Topics Cloud Grid */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          {TRENDING_TOPICS.map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(189, 154, 118, 0.15)'
              }}
              className="group flex items-center gap-2 px-6 py-4 rounded-2xl glass-panel border border-brand-gold/15 hover:border-brand-gold cursor-pointer transition-all duration-300 select-none"
            >
              <div className="p-1.5 rounded-lg bg-brand-navy-light/35 border border-brand-gold/10 text-slate-400 group-hover:text-brand-gold-bright transition-colors">
                <Hash className="w-4 h-4" />
              </div>
              <span className="font-serif text-sm md:text-base font-semibold tracking-wider text-slate-300 group-hover:text-white transition-colors">
                {topic}
              </span>
              
              {/* Micro-indicator */}
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30 group-hover:bg-brand-gold ml-2 animate-pulse" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-r from-brand-navy/30 via-brand-navy-light/10 to-brand-navy/30 border border-brand-gold/10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-slate-200 text-sm font-semibold tracking-wide uppercase">Looking for custom tutorials?</h4>
              <p className="text-slate-400 text-xs mt-0.5">Let us know what topic you want to see detailed code implementation blueprints on.</p>
            </div>
          </div>
          <a
            href="#subscribe"
            className="px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest bg-brand-gold/10 text-brand-gold border border-brand-gold/30 hover:bg-brand-gold hover:text-brand-navy-dark transition-all duration-300"
          >
            REQUEST TUTORIAL
          </a>
        </motion.div>

      </div>
    </section>
  );
};
