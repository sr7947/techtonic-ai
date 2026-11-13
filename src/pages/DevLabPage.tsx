import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MassiveMotionSphere } from '../components/MassiveMotionSphere';
import { 
  Sparkles, 
  RotateCw, 
  Layers, 
  Sliders, 
  Eye, 
  Zap, 
  MousePointer, 
  Flame, 
  ArrowRight, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';

interface DevLabPageProps {
  onApplyToProduction?: () => void;
}

export const DevLabPage: React.FC<DevLabPageProps> = () => {
  // Live Tunable 3D Sphere Settings
  const [particleCount, setParticleCount] = useState<number>(20000);
  const [sphereRadius, setSphereRadius] = useState<number>(2.45);
  const [autoRotateSpeed, setAutoRotateSpeed] = useState<number>(1.0);
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(true);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [sphereKey, setSphereKey] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'controls' | 'palette' | 'metrics'>('controls');

  const handleReset = () => {
    setParticleCount(20000);
    setSphereRadius(2.45);
    setAutoRotateSpeed(1.0);
    setShowLogo(true);
    setIsAutoRotate(true);
    setSphereKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Obsidian Glow Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,122,0,0.08),_transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">

        {/* 1. DEV LAB STAGING STATUS BANNER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-neutral-900/60 to-black/80 border border-amber-500/30 backdrop-blur-xl shadow-[0_0_35px_rgba(255,122,0,0.12)]"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0 text-amber-400">
              <Flame className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Dev Lab Staging
                </span>
                <span className="text-xs text-slate-400 font-mono">Branch: dev-lab</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                Massive 3D Motion Sphere & Unified Obsidian Theme Preview
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
            <div className="px-3 py-1.5 rounded-xl bg-black/60 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Interactive Lab Active
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-slate-700/60 text-xs text-slate-300 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset View
            </button>
          </div>
        </motion.div>

        {/* 2. MAIN 3D STAGE & WORKBENCH GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Massive Interactive 3D Sphere Canvas (7 cols) */}
          <div className="lg:col-span-8 rounded-3xl bg-gradient-to-b from-neutral-950/90 via-[#06080E]/95 to-black border border-amber-500/25 p-2 sm:p-4 relative min-h-[520px] sm:min-h-[640px] flex flex-col justify-between overflow-hidden shadow-2xl group">
            
            {/* Top Stage Header */}
            <div className="flex items-center justify-between px-3 pt-2 z-20 pointer-events-none">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-amber-400/90 tracking-wider uppercase text-[11px] font-semibold">
                  3D Point-Cloud Engine
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400 text-[11px] font-mono">
                  {particleCount.toLocaleString()} Particles
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border transition-colors ${
                  isInteracting 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                    : 'bg-black/40 text-slate-400 border-slate-800'
                }`}>
                  {isInteracting ? 'Controlling Orbit' : 'Idle Orbit'}
                </span>
              </div>
            </div>

            {/* Canvas Container */}
            <div className="w-full flex-1 relative flex items-center justify-center my-auto min-h-[440px]">
              <MassiveMotionSphere
                key={sphereKey}
                particleCount={particleCount}
                sphereRadius={sphereRadius}
                autoRotateSpeed={isAutoRotate ? autoRotateSpeed : 0}
                interactive={true}
                showInsideLogo={showLogo}
                onInteractionChange={setIsInteracting}
                className="w-full h-full min-h-[480px] sm:min-h-[580px]"
              />
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between gap-3 px-3 pb-2 z-20 bg-black/40 backdrop-blur-md rounded-2xl p-2.5 border border-white/5">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MousePointer className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Drag with mouse to rotate in 3D</span>
                <span className="sm:hidden">Drag to rotate</span>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <span className="text-slate-400 hidden sm:inline">Scroll to zoom</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsAutoRotate(!isAutoRotate)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAutoRotate 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' 
                      : 'bg-neutral-800 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  <RotateCw className={`w-3 h-3 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
                  {isAutoRotate ? 'Auto-Spin On' : 'Paused'}
                </button>
                <button
                  onClick={() => setShowLogo(!showLogo)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    showLogo 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                      : 'bg-neutral-800 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  Logo Inside
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Lab Controls & Theme Studio (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            
            {/* Workbench Navigation Tabs */}
            <div className="flex items-center gap-1 p-1 bg-neutral-900/80 rounded-2xl border border-slate-800">
              <button
                onClick={() => setActiveTab('controls')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'controls'
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                Parameters
              </button>
              <button
                onClick={() => setActiveTab('palette')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'palette'
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                Theme Sync
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'metrics'
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Architecture
              </button>
            </div>

            {/* TAB 1: PARAMETER CONTROLS */}
            {activeTab === 'controls' && (
              <div className="rounded-3xl bg-neutral-950/80 border border-amber-500/20 p-5 space-y-5 flex-1 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    Sphere Tuner
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest">
                    Real-time
                  </span>
                </div>

                {/* Particle Count Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Particle Count</span>
                    <span className="font-mono text-amber-400 font-bold">{particleCount.toLocaleString()} pts</span>
                  </div>
                  <input
                    type="range"
                    min="6000"
                    max="32000"
                    step="2000"
                    value={particleCount}
                    onChange={(e) => setParticleCount(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Performance (6k)</span>
                    <span>Cinema (32k)</span>
                  </div>
                </div>

                {/* Sphere Radius Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Sphere Volume Radius</span>
                    <span className="font-mono text-amber-400 font-bold">{sphereRadius.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="1.8"
                    max="3.0"
                    step="0.05"
                    value={sphereRadius}
                    onChange={(e) => setSphereRadius(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                  />
                </div>

                {/* Auto Rotation Speed Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Orbit Velocity</span>
                    <span className="font-mono text-amber-400 font-bold">{autoRotateSpeed.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.1"
                    value={autoRotateSpeed}
                    onChange={(e) => setAutoRotateSpeed(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-neutral-800 rounded-lg"
                  />
                </div>

                {/* Quick Presets */}
                <div className="pt-2">
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Motion Presets
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setParticleCount(15000);
                        setSphereRadius(2.3);
                        setAutoRotateSpeed(0.8);
                      }}
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-slate-800 text-[11px] font-medium text-slate-300 transition-colors text-center cursor-pointer"
                    >
                      Motion.dev
                    </button>
                    <button
                      onClick={() => {
                        setParticleCount(24000);
                        setSphereRadius(2.6);
                        setAutoRotateSpeed(1.4);
                      }}
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-slate-800 text-[11px] font-medium text-slate-300 transition-colors text-center cursor-pointer"
                    >
                      High Density
                    </button>
                    <button
                      onClick={() => {
                        setParticleCount(10000);
                        setSphereRadius(2.4);
                        setAutoRotateSpeed(0.5);
                      }}
                      className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-slate-800 text-[11px] font-medium text-slate-300 transition-colors text-center cursor-pointer"
                    >
                      Ambient Chill
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: PALETTE & THEME SYNC */}
            {activeTab === 'palette' && (
              <div className="rounded-3xl bg-neutral-950/80 border border-amber-500/20 p-5 space-y-4 flex-1 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Obsidian + Solar Amber Palette
                  </h3>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Synced</span>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  The website theme is precisely calibrated to the 3D sphere point-cloud illumination and the logo's orange sphere accent.
                </p>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#04060A] border border-white/20" />
                      <div>
                        <div className="text-xs font-bold text-slate-200">Obsidian Void</div>
                        <div className="text-[10px] text-slate-500 font-mono">#04060A</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Deep Base</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#FF7A00] shadow-[0_0_12px_#FF7A00]" />
                      <div>
                        <div className="text-xs font-bold text-amber-400">Solar Orange / Amber</div>
                        <div className="text-[10px] text-slate-500 font-mono">#FF7A00</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-amber-400 font-semibold">Primary Core</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#FFA62B]" />
                      <div>
                        <div className="text-xs font-bold text-amber-200">Radiant Highlight</div>
                        <div className="text-[10px] text-slate-500 font-mono">#FFA62B</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Sphere Bloom</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/60 border border-white/5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-[#94A3B8]" />
                      <div>
                        <div className="text-xs font-bold text-slate-300">Titanium Chrome</div>
                        <div className="text-[10px] text-slate-500 font-mono">#94A3B8</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-mono text-slate-400">Logo Facets</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ARCHITECTURE & TECHNICAL SPECS */}
            {activeTab === 'metrics' && (
              <div className="rounded-3xl bg-neutral-950/80 border border-amber-500/20 p-5 space-y-4 flex-1 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-400" />
                    3D System Architecture
                  </h3>
                  <span className="text-[10px] font-mono text-amber-400">WebGL 2.0</span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                    <div className="font-bold text-amber-300">1. Stratified Latitude Bands</div>
                    <p className="text-[11px] text-slate-400">
                      Harmonic trigonometric density functions create 5 horizontal contour stripes around the sphere equator and tropics.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                    <div className="font-bold text-amber-300">2. Revolving Logo & Dynamic PointLight</div>
                    <p className="text-[11px] text-slate-400">
                      The metallic WenzdayLab logo revolves at the core with a dedicated 3D glowing sphere mesh that casts real-time orange lighting.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                    <div className="font-bold text-amber-300">3. Inertial Mouse Orbit Physics</div>
                    <p className="text-[11px] text-slate-400">
                      Captures pointer delta with drag inertia damping (0.93 decay) and smooth scroll-wheel camera distance interpolation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* DEV LAB APPROVAL CARD */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-xs">
                  <span className="font-bold text-slate-100 block">Staged in Dev Lab</span>
                  <span className="text-slate-400 text-[11px]">Give approval to merge to production</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. THEME SHOWCASE: PREVIEWING COMPONENTS IN OBSIDIAN + AMBER */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Website Theme Preview (Obsidian Void & Solar Amber)
            </h3>
            <span className="text-xs text-slate-500 font-mono">Live Components</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Card 1: Benchmark Ranking */}
            <div className="p-5 rounded-2xl bg-neutral-950/90 border border-amber-500/20 hover:border-amber-500/50 transition-all space-y-3 group shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  #1 Global LLM
                </span>
                <span className="text-xs text-slate-500 font-mono">Score: 94.8</span>
              </div>
              <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                Gemini 2.5 Flash Thinking
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Benchmark leader in reasoning density, verified benchmark scores, and multi-turn instruction adherence.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>View Benchmarks</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: AI Agents Hub */}
            <div className="p-5 rounded-2xl bg-neutral-950/90 border border-amber-500/20 hover:border-amber-500/50 transition-all space-y-3 group shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/15 text-orange-400 border border-orange-500/30">
                  Autonomous Agent
                </span>
                <span className="text-xs text-slate-500 font-mono">Open Source</span>
              </div>
              <h4 className="text-base font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
                Hermes Agent 3.0
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Generalist autonomous agent framework with verified tool execution and native multi-step planning loops.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-orange-400 font-medium">
                <span>Explore Spec Grid</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Industry News Telemetry */}
            <div className="p-5 rounded-2xl bg-neutral-950/90 border border-amber-500/20 hover:border-amber-500/50 transition-all space-y-3 group shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 border border-amber-500/30">
                  Verified Telemetry
                </span>
                <span className="text-xs text-slate-500 font-mono">43 Sources</span>
              </div>
              <h4 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors">
                Live Model Telemetry Feed
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct ingestion from official engineering blogs across Google, OpenAI, Anthropic, Meta, and Mistral.
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-amber-400 font-medium">
                <span>Live Feed</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
