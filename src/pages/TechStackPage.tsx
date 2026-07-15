import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Cpu, 
  Brain, 
  Database, 
  Wrench, 
  Layers, 
  Shield, 
  Cloud,
  ChevronRight,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Compass,
  LayoutGrid
} from 'lucide-react';
import { aiTechStackConfig } from '../data/aiTechStackConfig';
import type { TechStackLayer } from '../data/aiTechStackConfig';

const IconMap: Record<string, React.ComponentType<any>> = {
  MessageSquare,
  Cpu,
  Brain,
  Database,
  Tool: Wrench, // Wrench acts as the tool icon
  Layers,
  Shield,
  Cloud
};

export const TechStackPage: React.FC = () => {
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>("All");

  // Read URL query parameter on mount and when popstate occurs
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const layerParam = params.get('layer');
      if (layerParam && aiTechStackConfig.layers.some(l => l.id === layerParam)) {
        setSelectedLayerId(layerParam);
      } else {
        setSelectedLayerId(null);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    // Custom event listener for SPA route changes
    window.addEventListener('pushstate', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('pushstate', handleUrlChange);
    };
  }, []);

  const selectLayer = (layerId: string | null) => {
    const newUrl = layerId ? `${window.location.pathname}?layer=${layerId}` : window.location.pathname;
    window.history.pushState({}, '', newUrl);
    setSelectedLayerId(layerId);
    setFilterType("All");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active layer object
  const activeLayer = useMemoLayer(selectedLayerId);

  // Extract all unique badges from active layer to use as filters
  const filterOptions = useMemoFilters(activeLayer);

  // Filter technologies
  const filteredTechs = useMemoFilteredTechs(activeLayer, filterType);

  return (
    <div className="min-h-screen bg-brand-navy-dark pt-24 pb-16 px-4 sm:px-6 lg:px-8 select-none text-slate-100 font-sans relative overflow-hidden">
      
      {/* Cinematic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-gold-bright">
            <LayoutGrid className="w-3.5 h-3.5" />
            Interactive Blueprint
          </div>
          <h1 className="font-serif text-3.5xl sm:text-5xl font-extrabold uppercase tracking-wider text-slate-100 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
            Agentic & AI Tech Stack
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            An interactive, multi-layer explorer of the modern artificial intelligence stack. Discover the technologies powering next-generation autonomous agents, retrieval engines, and cloud infrastructures.
          </p>
        </div>

        {/* Outer Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Left Sticky Navigation Rail (Desktop) */}
          <div className="hidden lg:block lg:col-span-1 sticky top-28 bg-brand-navy-deep/40 border border-brand-gold/10 rounded-2xl p-4 space-y-3 backdrop-blur-md shadow-2xl">
            <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest px-2 mb-2">
              Stack Layers
            </span>
            <button
              onClick={() => selectLayer(null)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                selectedLayerId === null
                  ? 'bg-brand-gold text-brand-navy-dark font-extrabold shadow-lg shadow-brand-gold/15'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-brand-navy-light/20'
              }`}
            >
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4" />
                Full Overview
              </span>
            </button>
            <div className="h-[1px] bg-brand-gold/10 my-2" />
            <div className="space-y-1.5">
              {aiTechStackConfig.layers.map((l) => {
                const IconComponent = IconMap[l.icon] || Cpu;
                const isActive = selectedLayerId === l.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => selectLayer(l.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? 'bg-brand-navy-light/60 border border-brand-gold/30 text-brand-gold-bright font-extrabold shadow-md shadow-black/30'
                        : 'border border-transparent text-slate-400 hover:text-slate-200 hover:bg-brand-navy-light/10'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      <span className={`text-[10px] font-mono ${isActive ? 'text-brand-gold-bright' : 'text-slate-600'}`}>0{l.order}</span>
                      <IconComponent className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand-gold-bright' : 'text-slate-500 group-hover:text-brand-gold transition-colors'}`} />
                      <span className="truncate">{l.name.replace(" Layer", "")}</span>
                    </span>
                    <span className={`px-1.5 py-0.5 rounded-md text-[8px] font-mono ${isActive ? 'bg-brand-gold/20 text-brand-gold-bright' : 'bg-slate-800 text-slate-500'}`}>
                      {l.technologies.length}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* VIEW 1: Layer Overview (Default View) */}
            {selectedLayerId === null ? (
              <div className="space-y-6">
                
                {/* Visual Stack Diagram */}
                <div className="bg-brand-navy-deep/20 border border-brand-gold/10 rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-md shadow-2xl relative">
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-brand-gold via-blue-500 to-brand-gold" />
                  <div className="flex justify-between items-center border-b border-brand-gold/10 pb-4">
                    <div>
                      <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-200">Unified Architecture</h3>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">Click any layer band to drill down</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-brand-navy-light border border-slate-700 text-[10px] font-mono text-slate-400">
                      8 Key Layers
                    </span>
                  </div>

                  {/* Vertical Layer Stack */}
                  <div className="flex flex-col gap-4">
                    {aiTechStackConfig.layers.map((l, index) => {
                      const IconComponent = IconMap[l.icon] || Cpu;
                      
                      // Alternate background gradients for layer bands
                      const gradientClass = index % 2 === 0
                        ? "from-brand-navy-deep/50 to-brand-navy-light/10 hover:border-brand-gold/45"
                        : "from-brand-navy-deep/30 to-brand-navy-light/5 hover:border-blue-500/40";

                      return (
                        <div
                          key={l.id}
                          onClick={() => selectLayer(l.id)}
                          className={`p-5 rounded-2xl bg-gradient-to-r ${gradientClass} border border-brand-gold/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group shadow-lg`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-navy-light border border-brand-gold/10 flex items-center justify-center text-brand-gold-bright group-hover:border-brand-gold/30 transition-all">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] font-mono text-brand-gold font-bold">L0{l.order}</span>
                                <h4 className="font-serif text-sm font-bold text-slate-200 group-hover:text-brand-gold-bright transition-colors uppercase tracking-wider">
                                  {l.name}
                                </h4>
                              </div>
                              <p className="text-slate-400 text-xs leading-relaxed max-w-xl">
                                {l.description}
                              </p>
                            </div>
                          </div>

                          {/* Quick Technology Chips inside Layer band */}
                          <div className="flex flex-wrap items-center gap-1.5 md:justify-end shrink-0 max-w-[280px]">
                            {l.technologies.slice(0, 3).map((t) => (
                              <span key={t.id} className="px-2 py-1 rounded-lg text-[9px] font-semibold bg-brand-navy-light/60 border border-slate-700 text-slate-300">
                                {t.name}
                              </span>
                            ))}
                            {l.technologies.length > 3 && (
                              <span className="px-2 py-1 rounded-lg text-[9px] font-bold bg-brand-gold/10 text-brand-gold-bright border border-brand-gold/25">
                                +{l.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tech Stack Summary Description Footer */}
                <div className="p-6 rounded-2xl bg-brand-navy-deep/10 border border-brand-gold/5 text-center text-xs text-slate-500 leading-relaxed">
                  Hover or select any layer from the menu to inspect standard interfaces, code engines, vector memories, safety guardrails, and deployment toolsets.
                </div>
              </div>
            ) : (
              
              // VIEW 2: Layer Detail View
              <div className="space-y-6">
                
                {/* Active Layer Banner */}
                {activeLayer && (
                  <div className="p-6 md:p-8 rounded-3xl bg-brand-navy-deep/20 border border-brand-gold/15 relative overflow-hidden backdrop-blur-md shadow-2xl space-y-4">
                    <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-gold" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/10 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-brand-gold/25 flex items-center justify-center text-brand-gold-bright">
                          {React.createElement(IconMap[activeLayer.icon] || Cpu, { className: "w-6 h-6" })}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-brand-gold font-bold uppercase tracking-wider">Layer 0{activeLayer.order} of 08</span>
                          <h2 className="font-serif text-xl sm:text-2xl font-extrabold uppercase tracking-wider text-slate-100">
                            {activeLayer.name}
                          </h2>
                        </div>
                      </div>
                      <button
                        onClick={() => selectLayer(null)}
                        className="px-4 py-2 rounded-xl bg-brand-navy-light/40 border border-brand-gold/10 hover:border-brand-gold/30 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-slate-100 transition-all cursor-pointer select-none"
                      >
                        Back to Stack Overview
                      </button>
                    </div>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
                      {activeLayer.description}
                    </p>

                    {/* Filter Category Selectors */}
                    {filterOptions.length > 1 && (
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-gold/5 mt-4">
                        <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mr-2">Filters:</span>
                        {filterOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setFilterType(opt)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              filterType === opt
                                ? 'bg-brand-gold text-brand-navy-dark font-extrabold shadow'
                                : 'bg-brand-navy-light/40 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Technology Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTechs.map((tech) => (
                    <div 
                      key={tech.id} 
                      className="p-6 rounded-2xl bg-brand-navy-deep/20 border border-brand-gold/10 hover:border-brand-gold/25 hover:bg-brand-navy-light/10 transition-all duration-300 flex flex-col justify-between group shadow-xl relative"
                    >
                      <div className="space-y-4">
                        
                        {/* Company & Category */}
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-[9px] font-extrabold uppercase tracking-widest text-brand-gold">
                            {tech.company}
                          </span>
                          <span className="px-2.5 py-0.5 rounded text-[8px] font-bold bg-brand-navy-light text-slate-400 border border-slate-700/50 uppercase tracking-wide">
                            {tech.category}
                          </span>
                        </div>

                        {/* Name and Tagline */}
                        <div className="space-y-1.5">
                          <h4 className="font-serif text-lg font-bold text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                            {tech.name}
                          </h4>
                          <p className="text-slate-200 text-xs font-semibold leading-relaxed border-l-2 border-brand-gold/30 pl-2">
                            {tech.shortTagline}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-slate-400 text-xs leading-relaxed">
                          {tech.description}
                        </p>

                        {/* Type Badges */}
                        {tech.typeBadges && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {tech.typeBadges.map((b) => (
                              <span key={b} className="px-1.5 py-0.5 rounded text-[8px] font-semibold bg-brand-navy-light/50 border border-slate-800 text-slate-500 uppercase">
                                {b}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-brand-gold/5">
                        <a
                          href={tech.homepageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold text-slate-400 hover:text-brand-navy-dark bg-brand-navy-light/20 hover:bg-brand-gold transition-all border border-slate-700/30 hover:border-transparent cursor-pointer"
                        >
                          Homepage
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <a
                          href={tech.docsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-gold hover:bg-brand-gold-bright transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Official Docs
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredTechs.length === 0 && (
                  <div className="p-12 border border-dashed border-slate-800 rounded-2xl text-center space-y-2 text-slate-500">
                    <span>No technologies match the selected filters.</span>
                  </div>
                )}

                {/* Next Layer Traversal Button */}
                {activeLayer && activeLayer.order < 8 && (
                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => {
                        const nextLayer = aiTechStackConfig.layers.find(l => l.order === activeLayer.order + 1);
                        if (nextLayer) selectLayer(nextLayer.id);
                      }}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-bright text-brand-navy-dark text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-brand-gold/15 active:scale-95"
                    >
                      Next Layer: {aiTechStackConfig.layers.find(l => l.order === activeLayer.order + 1)?.name.replace(" Layer", "")}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Accordion View (Mobile/Tablet Fallback) */}
        <div className="lg:hidden space-y-4">
          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-widest px-1">
            Browse Stack Layers
          </span>
          <div className="space-y-3">
            {aiTechStackConfig.layers.map((l) => {
              const IconComponent = IconMap[l.icon] || Cpu;
              const isSelected = selectedLayerId === l.id;

              return (
                <div 
                  key={l.id} 
                  className="rounded-2xl border border-brand-gold/10 bg-brand-navy-deep/20 overflow-hidden"
                >
                  <button
                    onClick={() => selectLayer(isSelected ? null : l.id)}
                    className="w-full p-4 flex items-center justify-between text-left focus:outline-none transition-colors hover:bg-brand-navy-light/10 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-navy-light border border-brand-gold/10 flex items-center justify-center text-brand-gold-bright">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono text-brand-gold font-bold">L0{l.order}</span>
                        <h4 className="font-serif text-sm font-bold text-slate-200 uppercase tracking-wider">{l.name}</h4>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${isSelected ? 'rotate-90 text-brand-gold-bright' : ''}`} />
                  </button>

                  {/* Accordion Content */}
                  {isSelected && (
                    <div className="p-4 border-t border-brand-gold/5 bg-brand-navy-deep/40 space-y-4 animate-in fade-in duration-200">
                      <p className="text-slate-400 text-xs leading-relaxed">{l.description}</p>
                      
                      {/* Grid of scrollable cards */}
                      <div className="space-y-4">
                        {l.technologies.map((tech) => (
                          <div key={tech.id} className="p-5 rounded-xl bg-brand-navy-deep border border-brand-gold/5 space-y-3">
                            <div className="flex justify-between items-start">
                              <span className="text-[8px] font-bold text-brand-gold uppercase">{tech.company}</span>
                              <span className="px-2 py-0.5 rounded text-[8px] font-semibold bg-brand-navy-light text-slate-400 uppercase">
                                {tech.category}
                              </span>
                            </div>
                            <h5 className="font-serif text-sm font-bold text-slate-200">{tech.name}</h5>
                            <p className="text-slate-200 text-xs italic border-l border-brand-gold/25 pl-1.5">{tech.shortTagline}</p>
                            <p className="text-slate-400 text-[11px] leading-relaxed">{tech.description}</p>
                            <div className="flex gap-2 pt-2 border-t border-brand-gold/5">
                              <a
                                href={tech.homepageUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-2 rounded bg-brand-navy-light/40 border border-slate-800 text-[9px] font-bold text-slate-300"
                              >
                                Homepage
                              </a>
                              <a
                                href={tech.docsUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 text-center py-2 rounded bg-brand-navy-gold text-[9px] font-bold text-slate-100"
                              >
                                Read Docs
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Custom Hooks / Helper Functions to prevent hook usage warnings inside render blocks ---
function useMemoLayer(selectedLayerId: string | null) {
  return React.useMemo(() => {
    if (!selectedLayerId) return null;
    return aiTechStackConfig.layers.find(l => l.id === selectedLayerId) || null;
  }, [selectedLayerId]);
}

function useMemoFilters(activeLayer: TechStackLayer | null) {
  return React.useMemo(() => {
    if (!activeLayer) return ["All"];
    const badges = new Set<string>();
    activeLayer.technologies.forEach(t => {
      t.typeBadges?.forEach(b => badges.add(b));
    });
    return ["All", ...Array.from(badges)];
  }, [activeLayer]);
}

function useMemoFilteredTechs(activeLayer: TechStackLayer | null, filterType: string) {
  return React.useMemo(() => {
    if (!activeLayer) return [];
    if (filterType === "All") return activeLayer.technologies;
    return activeLayer.technologies.filter(t => t.typeBadges?.includes(filterType));
  }, [activeLayer, filterType]);
}
