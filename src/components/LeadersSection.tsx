import React from 'react';
import { motion } from 'framer-motion';
import { AI_LEADERS } from '../data/content';
import { ExternalLink, Terminal, Lightbulb, Link2 } from 'lucide-react';

export const LeadersSection: React.FC = () => {
  return (
    <section id="leaders" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      
      {/* Decorative ambient elements */}
      <div className="glow-orb top-1/3 right-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            Major AI <span className="gold-gradient-text">Industry Leaders</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            A comprehensive profile of the frontier organizations driving research, deploying foundation models, and building global compute infrastructure.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {AI_LEADERS.map((leader, index) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
              className="flex flex-col justify-between p-6 rounded-2xl glass-panel relative group overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
            >
              
              {/* Top border brand color band */}
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${leader.logoColor}`} />

              <div className="space-y-6">
                
                {/* Header: Name and Logo indicator */}
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl md:text-2xl font-bold tracking-wider text-slate-100 group-hover:text-brand-gold-bright transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-r ${leader.logoColor} shadow-md shadow-black/50`} />
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed min-h-[64px]">
                  {leader.shortDesc}
                </p>

                {/* Key products */}
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                    <Terminal className="w-3.5 h-3.5" />
                    Core Platform / Models
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.keyProducts.map((prod) => (
                      <span
                        key={prod}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium tracking-wide bg-brand-navy-light/25 border border-brand-gold/10 text-slate-300"
                      >
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights list */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                    <Lightbulb className="w-3.5 h-3.5" />
                    Latest Update Highlights
                  </div>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {leader.latestHighlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/60 mt-1.5 flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mt-8 pt-4 border-t border-brand-gold/5">
                <a
                  href={leader.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-slate-300 hover:text-brand-gold-bright bg-brand-navy-light/10 hover:bg-brand-navy-light/30 border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Official Site
                </a>
                <a
                  href={leader.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-brand-gold-bright hover:text-brand-navy-dark bg-brand-gold/5 hover:bg-brand-gold border border-brand-gold/20 hover:border-brand-gold transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-brand-gold/20"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  Docs & Blog
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
