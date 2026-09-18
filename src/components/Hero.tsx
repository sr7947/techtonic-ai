import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GeminiParticleVortex } from './GeminiParticleVortex';
import { ThreeSphere } from './ThreeSphere';
import { ArrowRight, BookOpen, Compass, Layers, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const [active3DMode, setActive3DMode] = useState<'vortex' | 'sphere'>('vortex');

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-12 overflow-hidden z-10">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Text & Headline Content */}
          <motion.div 
            className="lg:col-span-6 space-y-7 text-left z-20"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Tagline / Brand Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-brand-gold" />
              <span className="text-[10px] md:text-xs tracking-[0.22em] uppercase font-bold text-brand-gold-bright">
                Let's Explore Future Together
              </span>
            </div>

            {/* Main Title & Gemini-Style Headline */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img 
                  src="/logo.png" 
                  alt="TechTonic AI" 
                  width={80}
                  height={80}
                  className="w-14 h-14 md:w-18 md:h-18 object-contain rounded-xl border-2 border-brand-gold/30 shadow-2xl shrink-0"
                />
                <h1 
                  aria-label="TechTonic AI — Exploring frontiers, code standards, and the autonomous future"
                  className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-wide text-slate-100 uppercase leading-none"
                >
                  TECHTONIC <span className="gold-gradient-text">AI</span>
                </h1>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-brand-gold-bright to-amber-400 tracking-tight leading-snug">
                Building the Autonomous <br className="hidden sm:inline" />
                <span className="text-red-400">3D AI Experience</span>.
              </h2>
            </div>

            {/* Intro Description */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
              Your premium destination for artificial intelligence research, model reviews, prompting frameworks, developer protocols, and local ecosystem orchestration. We filter out the hype to deliver production-ready insights.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#updates"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-brand-gold to-amber-500 hover:from-red-500 hover:to-brand-gold-bright text-brand-navy-dark font-bold px-7 py-3.5 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(230,57,70,0.3)] hover:shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
              >
                <Compass className="w-5 h-5" />
                Explore AI Updates
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              <a
                href="#learning"
                className="flex items-center justify-center gap-2 bg-brand-navy-light/40 hover:bg-brand-navy-light/75 text-brand-gold-bright border border-brand-gold/30 hover:border-brand-gold/60 font-semibold px-7 py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
              >
                <BookOpen className="w-5 h-5" />
                Start Learning
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-brand-gold/10 max-w-md">
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-brand-gold-bright">10+</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">AI Labs Tracked</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-red-400">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Hype-Free Code</div>
              </div>
              <div>
                <div className="font-display text-xl sm:text-2xl font-bold text-brand-gold-bright">3D Engine</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">Interactive Canvas</div>
              </div>
            </div>
          </motion.div>
          
          {/* 3D Visual Experience Showcase (Gemini Particle Vortex / Neural Core) */}
          <motion.div 
            className="lg:col-span-6 relative w-full flex flex-col items-center justify-center min-h-[480px] lg:min-h-[620px]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Mode Selector Overlay Tab */}
            <div className="absolute top-2 right-2 z-30 flex items-center gap-1.5 bg-brand-navy-dark/90 p-1.5 rounded-2xl border border-brand-gold/25 shadow-2xl backdrop-blur-md">
              <button
                onClick={() => setActive3DMode('vortex')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  active3DMode === 'vortex'
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                Gemini 3D Vortex
              </button>
              
              <button
                onClick={() => setActive3DMode('sphere')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all ${
                  active3DMode === 'sphere'
                    ? 'bg-gradient-to-r from-brand-gold to-amber-400 text-brand-navy-dark font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Neural Core
              </button>
            </div>

            {/* Render Selected 3D Experience */}
            <div className="w-full h-full min-h-[480px] lg:min-h-[600px] rounded-3xl border border-brand-gold/20 bg-brand-navy-deep/40 backdrop-blur-sm overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {active3DMode === 'vortex' ? (
                <GeminiParticleVortex />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-4">
                  <ThreeSphere />
                </div>
              )}
            </div>
          </motion.div>

        </div>
      </div>
      
    </section>
  );
};
