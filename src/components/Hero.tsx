import React from 'react';
import { motion } from 'framer-motion';
import { GeminiFullPage3D } from './GeminiFullPage3D';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden z-10 bg-brand-navy-dark">
      
      {/* Full-Bleed 100vw × 100vh 3D Particle Swarm Background */}
      <GeminiFullPage3D />

      {/* Overlay Ambient Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-navy-dark/40 to-brand-navy-dark pointer-events-none z-10" />

      {/* Centered Hero Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 text-center space-y-8">
        
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy-dark/80 border border-red-500/30 backdrop-blur-md shadow-2xl"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-brand-gold" />
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-brand-gold-bright">
            Let's Explore Future Together
          </span>
        </motion.div>

        {/* Main Gemini-Style Centered Headline */}
        <motion.div
          className="space-y-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <img 
              src="/logo.png" 
              alt="TechTonic AI" 
              width={80}
              height={80}
              className="w-14 h-14 md:w-16 md:h-16 object-contain rounded-xl border border-brand-gold/30 shadow-2xl"
            />
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-200 uppercase tracking-wider">
              TECHTONIC <span className="gold-gradient-text">AI</span>
            </span>
          </div>

          <h1 
            aria-label="Building the world's most capable AI platform & autonomous future"
            className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.08]"
          >
            Building the world's most <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-brand-gold-bright to-amber-300">
              capable AI platform
            </span>.
          </h1>
          
          <p className="font-display text-base sm:text-xl text-brand-gold/90 font-medium tracking-wide max-w-2xl mx-auto">
            Exploring frontiers, code standards, model benchmarks, and the autonomous future.
          </p>
        </motion.div>

        {/* Subtitle Copy */}
        <motion.p 
          className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your destination for artificial intelligence research, model reviews, prompting frameworks, developer protocols, and local ecosystem orchestration. We filter out the hype to deliver production-ready insights.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#updates"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-brand-gold to-amber-500 hover:from-red-500 hover:to-brand-gold-bright text-brand-navy-dark font-extrabold text-base px-9 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:shadow-[0_0_45px_rgba(239,68,68,0.6)] hover:scale-105 active:scale-95 focus:outline-none"
          >
            <Sparkles className="w-5 h-5 fill-brand-navy-dark" />
            Explore AI Updates
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>

          <a
            href="#learning"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-navy-dark/90 hover:bg-brand-navy-light/60 text-brand-gold-bright border border-brand-gold/40 hover:border-brand-gold font-bold text-base px-9 py-4 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 focus:outline-none"
          >
            <BookOpen className="w-5 h-5" />
            Start Learning
          </a>
        </motion.div>

        {/* Quick Metrics Centered Footer */}
        <motion.div 
          className="grid grid-cols-3 gap-6 pt-10 border-t border-brand-gold/15 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="bg-brand-navy-dark/70 p-3.5 rounded-2xl border border-brand-gold/10 backdrop-blur-md">
            <div className="font-display text-xl sm:text-3xl font-bold text-brand-gold-bright">10+</div>
            <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">AI Labs Tracked</div>
          </div>
          
          <div className="bg-brand-navy-dark/70 p-3.5 rounded-2xl border border-brand-gold/10 backdrop-blur-md">
            <div className="font-display text-xl sm:text-3xl font-bold text-red-500">100%</div>
            <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">Hype-Free Code</div>
          </div>

          <div className="bg-brand-navy-dark/70 p-3.5 rounded-2xl border border-brand-gold/10 backdrop-blur-md">
            <div className="font-display text-xl sm:text-3xl font-bold text-brand-gold-bright">Full 3D</div>
            <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-1 font-semibold">Particle Stream</div>
          </div>
        </motion.div>

      </div>
      
    </section>
  );
};
