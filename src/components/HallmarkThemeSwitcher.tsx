import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, ChevronDown, Palette } from 'lucide-react';

export interface HallmarkTheme {
  id: string;
  name: string;
  badge: string;
  accentColor: string;
  paperColor: string;
  fontDisplay: string;
  fontBody: string;
  tagline: string;
  genre: string;
}

export const HALLMARK_THEMES: HallmarkTheme[] = [
  {
    id: 'obsidian-amber',
    name: 'Obsidian Amber',
    badge: '3D Sphere & Solar Core',
    accentColor: '#ff7a00',
    paperColor: '#04060a',
    fontDisplay: 'Familjen Grotesk',
    fontBody: 'Host Grotesk',
    tagline: 'Deep obsidian void, revolving 3D particle sphere, and glowing amber solar intelligence',
    genre: 'Signature Brand Theme'
  },
  {
    id: 'cobalt',
    name: 'Cobalt',
    badge: 'Developer Platform',
    accentColor: '#3b82f6',
    paperColor: '#070c18',
    fontDisplay: 'Familjen Grotesk',
    fontBody: 'IBM Plex Sans',
    tagline: 'Technical hairlines, electric cobalt signals & keycap controls',
    genre: 'Technical API & SDK'
  },
  {
    id: 'console',
    name: 'Console',
    badge: 'Laboratory & Telemetry',
    accentColor: '#f59e0b',
    paperColor: '#0d0f14',
    fontDisplay: 'Host Grotesk',
    fontBody: 'Host Grotesk',
    tagline: 'Graphite ground in 3 lightnesses, amber curation & telemetry blue',
    genre: 'Research & Intelligence'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    badge: 'Nocturnal Frontier',
    accentColor: '#38bdf8',
    paperColor: '#050811',
    fontDisplay: 'Mona Sans',
    fontBody: 'Mona Sans',
    tagline: 'Deep indigo night, expanded light cuts & azure moonlight',
    genre: 'Cinematic AI Models'
  },
  {
    id: 'vantage',
    name: 'Vantage',
    badge: 'Reality Capture',
    accentColor: '#84cc16',
    paperColor: '#060a0f',
    fontDisplay: 'Geologica',
    fontBody: 'Geologica',
    tagline: 'Blue-black ground, sharpened typography & vibrant lime signals',
    genre: 'Autonomous Systems'
  },
  {
    id: 'gold-lab',
    name: 'Gold Lab',
    badge: 'Classic Luxury',
    accentColor: '#BD9A76',
    paperColor: '#090d18',
    fontDisplay: 'Clash Display',
    fontBody: 'Plus Jakarta Sans',
    tagline: 'Champagne gold gradients and deep navy luxury glass',
    genre: 'Frontier Intelligence'
  }
];

export const HallmarkThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem('wenzdaylab_hallmark_theme') || 'cobalt';
  });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply theme attribute to html element
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('wenzdaylab_hallmark_theme', currentTheme);
  }, [currentTheme]);

  // Close popup on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeThemeObj = HALLMARK_THEMES.find(t => t.id === currentTheme) || HALLMARK_THEMES[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Compact Navbar Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-navy-deep/80 hover:bg-brand-navy-light/70 border border-brand-gold/30 hover:border-brand-gold/60 text-xs font-medium text-slate-200 transition-all shadow-sm group cursor-pointer"
        title="Switch Hallmark Design Theme"
      >
        <span 
          className="w-2.5 h-2.5 rounded-full ring-2 ring-white/10 group-hover:scale-110 transition-transform"
          style={{ backgroundColor: activeThemeObj.accentColor }}
        />
        <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider hidden sm:inline">Theme:</span>
        <span className="font-semibold text-slate-100">{activeThemeObj.name}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Hallmark Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-80 rounded-2xl bg-brand-navy-deep/95 border border-brand-gold/25 backdrop-blur-xl shadow-2xl p-2 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-brand-gold text-xs font-semibold">
                <Palette className="w-3.5 h-3.5" />
                <span>Hallmark Design Themes</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">
                50-Theme Engine
              </span>
            </div>

            {/* Themes List */}
            <div className="py-1 space-y-1 max-h-[360px] overflow-y-auto">
              {HALLMARK_THEMES.map((theme) => {
                const isSelected = theme.id === currentTheme;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setCurrentTheme(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start gap-3 cursor-pointer group ${
                      isSelected
                        ? 'bg-brand-gold/15 border border-brand-gold/40'
                        : 'hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {/* Color Swatch Circle */}
                    <div 
                      className="w-5 h-5 rounded-full shrink-0 mt-0.5 border border-white/20 flex items-center justify-center shadow-md"
                      style={{ backgroundColor: theme.accentColor }}
                    >
                      {isSelected && <Check className="w-3 h-3 text-brand-navy-dark stroke-[3]" />}
                    </div>

                    {/* Theme Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                          {theme.name}
                          {theme.id === 'cobalt' && (
                            <span className="text-[9px] bg-blue-500/20 text-blue-300 font-mono px-1.5 py-0.2 rounded border border-blue-500/30">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 truncate">
                          {theme.fontDisplay}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-1">
                        {theme.tagline}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer Reference */}
            <div className="px-3 py-2 border-t border-white/5 bg-black/20 -mx-2 -mb-2 rounded-b-2xl mt-1 flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-brand-gold" />
                Crafted from <a href="https://github.com/Nutlope/hallmark" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline font-mono">Nutlope/hallmark</a>
              </span>
              <span className="font-mono text-[9px] text-slate-500">v2 Themes</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
