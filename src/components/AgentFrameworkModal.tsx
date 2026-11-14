import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Terminal, 
  Cpu, 
  Network, 
  ExternalLink, 
  BookOpen, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertCircle,
  Layers,
  Sparkles,
  Code2,
  Database,
  ShieldCheck,
  Zap
} from 'lucide-react';
import type { AgentFramework } from '../data/agentFrameworksData';
import { AgentFrameworkLogoRenderer } from './AgentFrameworkLogos';

interface AgentFrameworkModalProps {
  framework: AgentFramework | null;
  onClose: () => void;
}

export const AgentFrameworkModal: React.FC<AgentFrameworkModalProps> = ({ framework, onClose }) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'how-to-use' | 'use-cases' | 'ecosystem'>('guide');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (framework) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [framework, onClose]);

  if (!framework) return null;

  const handleCopy = (text: string, label: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCode(label);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-navy-dark/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl rounded-3xl bg-brand-navy-deep border border-brand-gold/30 shadow-[0_20px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Ambient Glow */}
          <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${framework.gradient} blur-3xl pointer-events-none opacity-30`} />

          {/* Modal Header */}
          <div className="relative p-5 sm:p-6 border-b border-brand-gold/15 flex items-start justify-between gap-4 bg-brand-navy-dark/60">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-2xl bg-brand-navy-dark border border-brand-gold/30 shadow-lg shrink-0">
                <AgentFrameworkLogoRenderer frameworkId={framework.id} className="w-12 h-12" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-slate-100">
                    {framework.name}
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-gold/15 text-brand-gold-bright border border-brand-gold/30">
                    {framework.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    {framework.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-1">
                  By <span className="text-brand-gold font-bold">{framework.developer}</span> • {framework.languages.join(', ')} • {framework.license}
                </p>
                <p className="text-xs font-semibold text-brand-gold/90 mt-1 max-w-2xl">
                  {framework.tagline}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-brand-navy-dark/80 hover:bg-brand-navy-light text-slate-400 hover:text-slate-100 border border-brand-gold/20 transition-all cursor-pointer shrink-0"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation Controls */}
          <div className="flex items-center gap-1 sm:gap-2 px-5 sm:px-6 pt-3 border-b border-white/5 bg-brand-navy-dark/30 overflow-x-auto scrollbar-none">
            {[
              { id: 'guide', label: 'Knowledge Guide', icon: <BookOpen className="w-4 h-4 text-brand-gold" /> },
              { id: 'how-to-use', label: 'How to Use & Code', icon: <Code2 className="w-4 h-4 text-emerald-400" /> },
              { id: 'use-cases', label: 'Use Cases & Tradeoffs', icon: <Zap className="w-4 h-4 text-cyan-400" /> },
              { id: 'ecosystem', label: 'Ecosystem & Tools', icon: <Network className="w-4 h-4 text-purple-400" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold transition-all border-b-2 cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-brand-gold text-brand-gold-bright bg-brand-gold/10'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Modal Tab Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm text-slate-200">
            
            {/* TAB 1: KNOWLEDGE GUIDE */}
            {activeTab === 'guide' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-gold mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Overview & Core Philosophy
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-brand-navy-dark/50 p-4 rounded-2xl border border-white/5">
                    {framework.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    Architectural Deep Dive
                  </h3>
                  <div className="text-slate-300 leading-relaxed text-xs sm:text-sm bg-brand-navy-dark/50 p-4 rounded-2xl border border-white/5 space-y-3">
                    <p>{framework.architectureOverview}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Key Architectural Capabilities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {framework.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-brand-navy-dark/40 border border-white/5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-xs leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: HOW TO USE & CODE */}
            {activeTab === 'how-to-use' && (
              <div className="space-y-6">
                
                {/* Installation Card */}
                <div className="p-4 rounded-2xl bg-brand-navy-dark/70 border border-brand-gold/25 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-gold flex items-center gap-1.5">
                      <Terminal className="w-4 h-4" />
                      Installation & Package Setup
                    </span>
                    <button
                      onClick={() => handleCopy(framework.installation.command, 'install')}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-gold/15 hover:bg-brand-gold/30 text-brand-gold-bright text-[11px] font-bold transition-all cursor-pointer"
                    >
                      {copiedCode === 'install' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'install' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 font-mono text-xs text-emerald-400 overflow-x-auto border border-white/5">
                    {framework.installation.command}
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1">
                    <div><span className="text-slate-300 font-semibold">Method:</span> {framework.installation.method}</div>
                    <div><span className="text-slate-300 font-semibold">Prerequisites:</span> {framework.installation.prerequisites}</div>
                    {framework.installation.envVars && (
                      <div className="pt-1">
                        <span className="text-slate-300 font-semibold">Environment Variables:</span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {framework.installation.envVars.map((v, i) => (
                            <code key={i} className="px-2 py-0.5 rounded bg-white/5 font-mono text-[10px] text-cyan-300 border border-white/10">{v}</code>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Production Code Example */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-emerald-400" />
                        {framework.howToUse.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {framework.howToUse.description}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(framework.howToUse.code, 'code')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedCode === 'code' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode === 'code' ? 'Copied Snippet' : 'Copy Code'}</span>
                    </button>
                  </div>

                  <div className="relative rounded-2xl bg-black/80 border border-white/10 p-4 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed shadow-inner">
                    <pre>{framework.howToUse.code}</pre>
                  </div>

                  <div className="p-3.5 rounded-xl bg-brand-navy-dark/50 border border-white/5 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-brand-gold">Execution Breakdown: </span>
                    {framework.howToUse.explanation}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: USE CASES & TRADEOFFS */}
            {activeTab === 'use-cases' && (
              <div className="space-y-6">
                
                {/* Primary Use Cases */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Target Production Scenarios
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {framework.useCases.primary.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-brand-navy-dark/60 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Best For (Green Card) */}
                <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1.5">
                  <div className="font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    When to Choose {framework.name}
                  </div>
                  <p className="text-emerald-200/90 leading-relaxed">
                    {framework.useCases.bestFor}
                  </p>
                </div>

                {/* When Not To Use (Red/Warning Card) */}
                <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 text-xs space-y-1.5">
                  <div className="font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    When NOT to Choose (Tradeoffs & Alternatives)
                  </div>
                  <p className="text-rose-200/90 leading-relaxed">
                    {framework.useCases.whenNotToUse}
                  </p>
                </div>

              </div>
            )}

            {/* TAB 4: ECOSYSTEM & TOOLS */}
            {activeTab === 'ecosystem' && (
              <div className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Supported Models */}
                  <div className="p-4 rounded-2xl bg-brand-navy-dark/60 border border-white/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-200 text-xs uppercase tracking-wider">
                      <Cpu className="w-4 h-4 text-brand-gold" />
                      Supported Models
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {framework.ecosystem.supportedModels.map((m, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-brand-navy-deep border border-brand-gold/20 text-[11px] text-slate-300 font-medium">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* State & Memory Management */}
                  <div className="p-4 rounded-2xl bg-brand-navy-dark/60 border border-white/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-200 text-xs uppercase tracking-wider">
                      <Database className="w-4 h-4 text-cyan-400" />
                      State & Memory Architecture
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {framework.ecosystem.stateManagement}
                    </p>
                  </div>

                  {/* Model Context Protocol (MCP) Support */}
                  <div className="p-4 rounded-2xl bg-brand-navy-dark/60 border border-white/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-200 text-xs uppercase tracking-wider">
                      <Network className="w-4 h-4 text-emerald-400" />
                      Model Context Protocol (MCP)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {framework.ecosystem.mcpSupport}
                    </p>
                  </div>

                  {/* Evals & Observability */}
                  <div className="p-4 rounded-2xl bg-brand-navy-dark/60 border border-white/5 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-200 text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      Evals & Observability
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {framework.ecosystem.evalsAndObservability}
                    </p>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          <div className="relative p-4 sm:p-5 border-t border-brand-gold/15 bg-brand-navy-dark/70 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Developer Forum Verified • 2026 Release Ready</span>
            </div>

            <div className="flex items-center gap-2.5">
              {framework.documentation.githubUrl && (
                <a
                  href={framework.documentation.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light border border-white/10 text-slate-200 hover:text-brand-gold text-xs font-semibold transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              )}

              <a
                href={framework.documentation.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Official Documentation</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
