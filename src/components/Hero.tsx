import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GeminiFullPage3D } from './GeminiFullPage3D';
import { MassiveMotionSphere } from './MassiveMotionSphere';
import { ArrowRight, Sparkles, Orbit, Waves } from 'lucide-react';

export const Hero: React.FC = () => {
  const [view3DMode, setView3DMode] = useState<'sphere' | 'stream'>('sphere');

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden z-10 bg-brand-navy-dark">
      
      {/* 3D Engine: Massive 3D Motion Sphere or Legacy Particle Stream */}
      {view3DMode === 'sphere' ? (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <MassiveMotionSphere
            particleCount={19500}
            sphereRadius={1.38}
            autoRotateSpeed={0.9}
            interactive={true}
            showInsideLogo={true}
            className="w-full h-full"
          />
        </div>
      ) : (
        <GeminiFullPage3D />
      )}

      {/* 3D Engine Quick Switcher (Dev Mode Preview) */}
      <div className="absolute top-26 right-4 sm:right-8 z-30 hidden sm:flex items-center gap-1 p-1 bg-black/60 backdrop-blur-xl rounded-2xl border border-amber-500/30 text-xs shadow-xl">
        <button
          onClick={() => setView3DMode('sphere')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
            view3DMode === 'sphere'
              ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(255,122,0,0.5)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Orbit className="w-3.5 h-3.5" />
          3D Sphere
        </button>
        <button
          onClick={() => setView3DMode('stream')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
            view3DMode === 'stream'
              ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(255,122,0,0.5)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Waves className="w-3.5 h-3.5" />
          Stream
        </button>
      </div>

      {/* Overlay Ambient Gradient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-brand-navy-dark/40 to-brand-navy-dark pointer-events-none z-10" />

      {/* Centered Hero Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 text-center space-y-8 pointer-events-none">
        
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-navy-dark/80 border border-amber-500/40 backdrop-blur-md shadow-2xl pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-amber-300">
            Frontier Intelligence & Autonomous Systems
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
              src="/wenzdaylab-logo.png" 
              alt="WenzdayLab" 
              width={80}
              height={80}
              className="w-14 h-14 md:w-16 md:h-16 object-cover rounded-xl border border-brand-gold/30 shadow-2xl"
            />
            <span className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-200 uppercase tracking-wider">
              WENZDAY<span className="gold-gradient-text">LAB</span>
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="#updates"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-base px-9 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,122,0,0.4)] hover:shadow-[0_0_45px_rgba(255,122,0,0.6)] hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
          >
            <Sparkles className="w-5 h-5 fill-black" />
            Explore AI Updates
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>

          <a
            href="/dev-lab"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black/80 hover:bg-neutral-900 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-base px-8 py-4 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 focus:outline-none cursor-pointer shadow-lg"
          >
            <Orbit className="w-5 h-5 text-amber-400" />
            Enter 3D Dev Lab
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
            <div className="font-display text-xl sm:text-3xl font-bold text-brand-gold-bright">47+</div>
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
