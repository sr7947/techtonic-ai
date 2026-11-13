import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GeminiFullPage3D } from './GeminiFullPage3D';
import { MassiveMotionSphere } from './MassiveMotionSphere';
import { ArrowRight, Sparkles, Orbit, Waves, MousePointer } from 'lucide-react';

export const Hero: React.FC = () => {
  const [view3DMode, setView3DMode] = useState<'sphere' | 'stream'>('sphere');

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden z-10 bg-[#04060A]">
      
      {/* Background Ambient Glow & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,122,0,0.06),_transparent_70%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* 3D Engine Quick Switcher */}
      <div className="absolute top-26 right-4 sm:right-8 z-30 hidden sm:flex items-center gap-1 p-1 bg-black/70 backdrop-blur-xl rounded-2xl border border-amber-500/30 text-xs shadow-2xl">
        <button
          onClick={() => setView3DMode('sphere')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer ${
            view3DMode === 'sphere'
              ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(255,122,0,0.5)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Orbit className="w-3.5 h-3.5" />
          Motion Sphere
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

      {/* Legacy Stream Mode (Full-Bleed Fallback) */}
      {view3DMode === 'stream' && (
        <div className="absolute inset-0 z-0">
          <GeminiFullPage3D />
        </div>
      )}

      {/* Main Container: 2-Column Split Layout matching Motion.dev reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Clean High-Contrast Typography & Actions (7 cols) */}
          <motion.div 
            className="lg:col-span-7 text-left space-y-6 sm:space-y-7 z-20 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/40 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold text-amber-300">
                Frontier Intelligence & Autonomous Systems
              </span>
            </div>

            {/* Main Headline */}
            <h1 
              aria-label="Building the world's most capable AI platform & autonomous future"
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.06]"
            >
              Building the world's most <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">
                capable AI platform
              </span>.
            </h1>

            {/* Sub-Headline in High-Contrast Warm Amber/Cream */}
            <p className="font-display text-base sm:text-xl text-amber-100/95 font-medium tracking-wide leading-relaxed max-w-xl">
              Exploring frontiers, code standards, model benchmarks, and the autonomous future.
            </p>

            {/* Body Copy in Crisp Silver-Slate */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Your destination for artificial intelligence research, model reviews, prompting frameworks, developer protocols, and local ecosystem orchestration. We filter out the hype to deliver production-ready insights.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#updates"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-black font-extrabold text-sm sm:text-base px-8 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(255,122,0,0.4)] hover:shadow-[0_0_40px_rgba(255,122,0,0.6)] hover:scale-105 active:scale-95 cursor-pointer text-center"
              >
                <Sparkles className="w-4 h-4 fill-black" />
                Explore AI Updates
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>

              <a
                href="/dev-lab"
                className="flex items-center justify-center gap-2 bg-neutral-900/90 hover:bg-neutral-800 text-amber-300 border border-amber-500/40 hover:border-amber-400 font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95 cursor-pointer shadow-lg text-center"
              >
                <Orbit className="w-4 h-4 text-amber-400" />
                Enter 3D Dev Lab
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div className="bg-neutral-950/70 p-3 rounded-2xl border border-white/5 backdrop-blur-md">
                <div className="font-display text-lg sm:text-2xl font-bold text-amber-400">47+</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-semibold">Labs Tracked</div>
              </div>
              
              <div className="bg-neutral-950/70 p-3 rounded-2xl border border-white/5 backdrop-blur-md">
                <div className="font-display text-lg sm:text-2xl font-bold text-orange-400">100%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-semibold">Verified Code</div>
              </div>

              <div className="bg-neutral-950/70 p-3 rounded-2xl border border-white/5 backdrop-blur-md">
                <div className="font-display text-lg sm:text-2xl font-bold text-amber-300">60 FPS</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5 font-semibold">3D Motion</div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: The 3D Particle Sphere with Revolving Logo (5 cols) */}
          {view3DMode === 'sphere' && (
            <motion.div 
              className="lg:col-span-5 relative w-full h-[360px] sm:h-[460px] lg:h-[560px] flex items-center justify-center z-20 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <MassiveMotionSphere
                particleCount={20000}
                sphereRadius={1.38}
                autoRotateSpeed={0.9}
                interactive={true}
                showInsideLogo={true}
                className="w-full h-full"
              />

              {/* Floating Interaction Pill */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-amber-500/30 text-[10px] uppercase tracking-widest text-amber-300/80 backdrop-blur-md">
                <MousePointer className="w-3 h-3 text-amber-400" />
                <span>Drag to Rotate • Revolving Logo Inside</span>
              </div>
            </motion.div>
          )}

        </div>
      </div>
      
    </section>
  );
};
