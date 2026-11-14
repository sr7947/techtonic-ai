import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Terminal, 
  Cpu, 
  Network, 
  Wrench, 
  ExternalLink, 
  BookOpen, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertCircle,
  Laptop,
  Layers,
  Sparkles
} from 'lucide-react';
import type { CodingAgent } from '../data/codingAgentsData';
import { CodingAgentLogoRenderer } from './CodingAgentLogos';

interface CodingAgentModalProps {
  agent: CodingAgent | null;
  onClose: () => void;
}

export const CodingAgentModal: React.FC<CodingAgentModalProps> = ({ agent, onClose }) => {
  const [activeTab, setActiveTab] = useState<'install' | 'models' | 'mcps' | 'tools'>('install');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (agent) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [agent, onClose]);

  if (!agent) return null;

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
          className="relative w-full max-w-3xl rounded-3xl bg-brand-navy-deep border border-brand-gold/30 shadow-[0_20px_70px_rgba(0,0,0,0.85)] z-10 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Subtle Ambient Background Gradient */}
          <div className={`absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br ${agent.gradient} blur-3xl pointer-events-none opacity-40`} />

          {/* Modal Header */}
          <div className="relative p-5 sm:p-6 border-b border-brand-gold/15 flex items-start justify-between gap-4 bg-brand-navy-dark/60">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-2xl bg-brand-navy-dark border border-brand-gold/30 shadow-lg shrink-0">
                <CodingAgentLogoRenderer agentId={agent.id} className="w-12 h-12" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display text-xl sm:text-2xl font-black text-slate-100">
                    {agent.name}
                  </h2>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    agent.category === 'first-party'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {agent.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-brand-gold/10 text-brand-gold-bright border border-brand-gold/25">
                    {agent.badge}
                  </span>
                </div>
                <p className="text-xs font-medium text-brand-gold/90 mt-1">
                  {agent.developer} • <span className="text-slate-300">{agent.pricing}</span>
                </p>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed line-clamp-2">
                  {agent.tagline}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light border border-brand-gold/20 text-slate-400 hover:text-slate-100 transition-colors shrink-0 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tab Bar */}
          <div className="flex items-center gap-1.5 px-5 pt-3 border-b border-brand-gold/15 bg-brand-navy-deep/80 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('install')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                activeTab === 'install'
                  ? 'border-brand-gold text-brand-gold-bright bg-brand-gold/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Installation & Setup</span>
            </button>

            <button
              onClick={() => setActiveTab('models')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                activeTab === 'models'
                  ? 'border-brand-gold text-brand-gold-bright bg-brand-gold/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Foundation Models</span>
            </button>

            <button
              onClick={() => setActiveTab('mcps')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                activeTab === 'mcps'
                  ? 'border-brand-gold text-brand-gold-bright bg-brand-gold/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Network className="w-4 h-4" />
              <span>MCP & Connectors</span>
            </button>

            <button
              onClick={() => setActiveTab('tools')}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                activeTab === 'tools'
                  ? 'border-brand-gold text-brand-gold-bright bg-brand-gold/10'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wrench className="w-4 h-4" />
              <span>Tools & Ecosystem</span>
            </button>
          </div>

          {/* Modal Tab Body Content */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs text-slate-200">
            
            {/* TAB 1: INSTALLATION & SETUP */}
            {activeTab === 'install' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-brand-gold" />
                    Installation CLI Command
                  </h3>
                  <div className="relative rounded-2xl bg-brand-navy-dark p-3.5 border border-brand-gold/20 font-mono text-[11px] text-emerald-400 flex items-center justify-between gap-3">
                    <code className="break-all whitespace-pre-wrap">{agent.installation.command}</code>
                    <button
                      onClick={() => handleCopy(agent.installation.command, 'install-cmd')}
                      className="p-1.5 rounded-lg bg-brand-navy-deep hover:bg-brand-navy-light text-slate-300 hover:text-brand-gold transition-colors shrink-0 cursor-pointer"
                      title="Copy command"
                    >
                      {copiedCode === 'install-cmd' ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-3.5 rounded-2xl bg-brand-navy-dark/80 border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold">Delivery Method</span>
                    <p className="text-slate-200 font-medium">{agent.installation.method}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-brand-navy-dark/80 border border-white/5 space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold">Prerequisites</span>
                    <p className="text-slate-200 font-medium">{agent.installation.prerequisites}</p>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">Supported Operating Systems</span>
                  <div className="flex flex-wrap gap-2">
                    {agent.installation.osSupport.map((os, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brand-navy-dark border border-white/10 text-slate-300 font-medium">
                        <Laptop className="w-3.5 h-3.5 text-cyan-400" />
                        {os}
                      </span>
                    ))}
                  </div>
                </div>

                {agent.installation.envVars && agent.installation.envVars.length > 0 && (
                  <div className="p-3.5 rounded-2xl bg-brand-navy-dark/80 border border-white/5 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Environment Variables & API Keys
                    </span>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-300">
                      {agent.installation.envVars.map((env, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-brand-gold">export</span>
                          <span className="text-emerald-300">{env}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: FOUNDATION MODELS */}
            {activeTab === 'models' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-brand-navy-dark/80 border border-brand-gold/20 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Recommended Default Model</span>
                    <p className="text-sm font-extrabold text-brand-gold-bright">{agent.foundationModels.defaultRecommendation}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Context Window</span>
                    <p className="text-xs font-bold text-slate-200">{agent.foundationModels.contextWindow}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-brand-navy-dark/60 border border-white/5 flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${agent.foundationModels.byoKey ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="font-bold text-slate-200">Bring Your Own Key</div>
                      <div className="text-[10px] text-slate-400">{agent.foundationModels.byoKey ? 'Supported (BYOK)' : 'Managed subscription'}</div>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-brand-navy-dark/60 border border-white/5 flex items-center gap-2.5">
                    <CheckCircle2 className={`w-4 h-4 ${agent.foundationModels.localModelSupport ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <div>
                      <div className="font-bold text-slate-200">Local Model / Ollama</div>
                      <div className="text-[10px] text-slate-400">{agent.foundationModels.localModelSupport ? 'Supported offline' : 'Cloud API required'}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">Supported Model Ecosystem</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {agent.foundationModels.supported.map((model, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-brand-navy-dark/70 border border-white/5">
                        <Cpu className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="text-xs font-medium text-slate-200">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MCP & CONNECTORS */}
            {activeTab === 'mcps' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-navy-dark/80 border border-brand-gold/20">
                  <div className="flex items-center gap-2.5">
                    <Network className="w-5 h-5 text-cyan-400" />
                    <div>
                      <div className="font-bold text-slate-200">Model Context Protocol (MCP)</div>
                      <div className="text-[10px] text-slate-400">Open standard for connecting AI to external data & tools</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {agent.mcps.type}
                  </span>
                </div>

                {agent.mcps.configSnippet && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Sample MCP Configuration</span>
                      <button
                        onClick={() => handleCopy(agent.mcps.configSnippet!, 'mcp-config')}
                        className="flex items-center gap-1 text-[10px] font-mono text-brand-gold hover:text-brand-gold-bright cursor-pointer"
                      >
                        {copiedCode === 'mcp-config' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy JSON</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-3.5 rounded-2xl bg-brand-navy-dark border border-white/10 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                      <code>{agent.mcps.configSnippet}</code>
                    </pre>
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">Popular Supported MCP Servers</span>
                  <div className="flex flex-wrap gap-2">
                    {agent.mcps.popularServers.map((server, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-xl bg-brand-navy-dark border border-white/10 text-slate-300 font-medium">
                        {server}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: TOOLS & ECOSYSTEM */}
            {activeTab === 'tools' && (
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2.5 text-center">
                  <div className="p-3 rounded-2xl bg-brand-navy-dark/80 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Terminal Execution</span>
                    <span className={`text-xs font-bold ${agent.toolsAndPlugins.terminalExecution ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {agent.toolsAndPlugins.terminalExecution ? '✓ Enabled' : '✗ Read-only'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-brand-navy-dark/80 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Multi-File Diff</span>
                    <span className={`text-xs font-bold ${agent.toolsAndPlugins.multiFileDiff ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {agent.toolsAndPlugins.multiFileDiff ? '✓ Native AST' : '✗ Single-file'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-brand-navy-dark/80 border border-white/5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block mb-1">Live Browser</span>
                    <span className={`text-xs font-bold ${agent.toolsAndPlugins.browserPreview ? 'text-emerald-400' : 'text-slate-500'}`}>
                      {agent.toolsAndPlugins.browserPreview ? '✓ Interactive' : '✗ Headless only'}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">IDE & Environment Support</span>
                  <div className="flex flex-wrap gap-2">
                    {agent.toolsAndPlugins.ideSupport.map((ide, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-dark border border-brand-gold/15 text-slate-200 font-medium">
                        <Layers className="w-3.5 h-3.5 text-brand-gold" />
                        {ide}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">Key Tools & Capabilities</span>
                  <div className="space-y-1.5">
                    {agent.toolsAndPlugins.keyTools.map((tool, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-brand-navy-dark/60 border border-white/5">
                        <Sparkles className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 font-medium">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer with External Links */}
          <div className="p-4 sm:p-5 border-t border-brand-gold/15 bg-brand-navy-dark/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a
                href={agent.documentation.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark font-black uppercase text-[11px] tracking-wider transition-all shadow-md cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Launch / Website</span>
              </a>

              <a
                href={agent.documentation.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-navy-deep hover:bg-brand-navy-light border border-brand-gold/30 text-slate-200 hover:text-brand-gold font-bold text-[11px] tracking-wider transition-all cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                <span>Documentation</span>
              </a>
            </div>

            {agent.documentation.githubUrl && (
              <a
                href={agent.documentation.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-deep hover:bg-brand-navy-light text-slate-400 hover:text-slate-100 text-xs transition-colors"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
