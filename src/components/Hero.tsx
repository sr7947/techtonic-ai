import React from 'react';
import { motion } from 'framer-motion';
import { ThreeSphere } from './ThreeSphere';
import { ArrowRight, BookOpen, Compass } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-12 overflow-hidden z-10">
      
      {/* Decorative Orbs */}
      <div className="glow-orb top-1/4 left-10" />
      <div className="glow-orb bottom-10 right-10" style={{ transform: 'translate(20%, 20%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="lg:col-span-7 space-y-8 text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Tagline / Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/5 border border-brand-gold/25 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold text-brand-gold-bright">
                Let's Explore Future Together
              </span>
            </div>

            {/* Main Title & Logo */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src="/logo.png" 
                  alt="TechTonic AI" 
                  className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-xl border-2 border-brand-gold/30 shadow-2xl"
                />
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-widest text-slate-100 uppercase leading-none">
                  TECHTONIC <span className="gold-gradient-text">AI</span>
                </h1>
              </div>
              <p className="font-serif text-lg md:text-xl text-brand-gold/80 italic font-medium tracking-wide">
                Exploring frontiers, code standards, and the autonomous future.
              </p>
            </div>

            {/* Intro Text */}
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl">
              Your premium destination for artificial intelligence research, model reviews, prompting frameworks, developer protocols, and local ecosystem orchestration. We filter out the hype to deliver production-ready insights for tech professionals and lifelong learners.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#updates"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(189,154,118,0.25)] hover:shadow-[0_0_30px_rgba(189,154,118,0.45)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              >
                <Compass className="w-5 h-5" />
                Explore AI Updates
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              <a
                href="#learning"
                className="flex items-center justify-center gap-2 bg-brand-navy-light/40 hover:bg-brand-navy-light/75 text-brand-gold-bright border border-brand-gold/30 hover:border-brand-gold/60 font-semibold px-8 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-gold/10 max-w-md">
              <div>
                <div className="font-serif text-2xl font-bold text-brand-gold-bright">10+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">AI Leaders Tracked</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-brand-gold-bright">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Hype-Free Coding</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-brand-gold-bright">Official</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider mt-1">Doc Integration</div>
              </div>
            </div>
          </motion.div>
          
          {/* 3D Sphere Component */}
          <motion.div 
            className="lg:col-span-5 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <ThreeSphere />
          </motion.div>

        </div>
      </div>
      
    </section>
  );
};
