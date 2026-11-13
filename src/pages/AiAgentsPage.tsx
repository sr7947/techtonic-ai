import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  BookOpen, 
  Cloud, 
  Terminal, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Server,
  Share2,
  MessageSquare,
  Cpu,
  Users
} from 'lucide-react';
import { AI_AGENTS, type AIAgent } from '../data/agentsData';
import { AgentLogoRenderer } from '../components/AgentLogos';

// Github Icon SVG Component
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const AiAgentsPage: React.FC = () => {
  // Read category filter from URL search params or default to 'all'
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'open-source' | 'managed-cloud'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('type') || params.get('category');
      if (cat === 'open-source' || cat === 'managed-cloud') return cat;
    }
    return 'all';
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Update filter on back/forward browser navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('type') || params.get('category');
      if (cat === 'open-source' || cat === 'managed-cloud') {
        setSelectedFilter(cat);
      } else {
        setSelectedFilter('all');
      }
    };
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleFilterChange = (filter: 'all' | 'open-source' | 'managed-cloud') => {
    setSelectedFilter(filter);
    const url = new URL(window.location.href);
    if (filter === 'all') {
      url.searchParams.delete('type');
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('type', filter);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleShare = (agent: AIAgent) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/ai-agents?agent=${agent.id}`);
      setCopiedId(agent.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredAgents = AI_AGENTS.filter(agent => {
    if (selectedFilter === 'all') return true;
    return agent.category === selectedFilter;
  });

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-14 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold-bright text-xs font-bold uppercase tracking-widest shadow-inner">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-gold" />
          Autonomous Agents & Teammates Directory
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100">
          The New Frontier of <span className="gold-gradient-text">AI Agents</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Beyond conversational prompts: explore proactive, always-on AI agents that execute workflows, control computers, integrate into messaging apps, and get real work done.
        </p>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            onClick={() => handleFilterChange('all')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-105'
                : 'bg-brand-navy-deep/80 text-slate-300 hover:text-slate-100 hover:bg-brand-navy-light/50 border border-brand-gold/20'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All Agents ({AI_AGENTS.length})</span>
          </button>

          <button
            onClick={() => handleFilterChange('open-source')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedFilter === 'open-source'
                ? 'bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
                : 'bg-brand-navy-deep/80 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-950/40 border border-cyan-500/30'
            }`}
          >
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Open Source (2)</span>
          </button>

          <button
            onClick={() => handleFilterChange('managed-cloud')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              selectedFilter === 'managed-cloud'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] scale-105'
                : 'bg-brand-navy-deep/80 text-purple-300 hover:text-purple-100 hover:bg-purple-950/40 border border-purple-500/30'
            }`}
          >
            <Cloud className="w-4 h-4 text-purple-400" />
            <span>Managed Cloud (3)</span>
          </button>
        </div>
      </div>

      {/* Agents Listing Cards */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {filteredAgents.map((agent, index) => (
            <motion.div
              key={agent.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="relative rounded-3xl bg-brand-navy-deep/90 border border-brand-gold/25 p-6 sm:p-8 backdrop-blur-xl shadow-2xl hover:border-brand-gold/50 transition-all duration-300 overflow-hidden group"
            >
              {/* Subtle Ambient Background Gradient */}
              <div className={`absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br ${agent.gradient} blur-3xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`} />

              <div className="relative z-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
                
                {/* Visual Identity: Eye-Catching Logo Avatar */}
                <div className="flex sm:flex-col items-center sm:items-start gap-4 shrink-0">
                  <div className="relative p-1 rounded-3xl bg-brand-navy-dark border border-brand-gold/30 shadow-xl group-hover:scale-105 transition-transform duration-300">
                    <AgentLogoRenderer agentId={agent.id} className="w-20 h-20 sm:w-24 sm:h-24" />
                    <span 
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-brand-navy-dark bg-emerald-400" 
                      title="Verified & Active"
                    />
                  </div>

                  <div className="flex flex-col sm:items-center w-full">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest text-center">
                      {agent.developer}
                    </span>
                    <span className="text-[11px] font-bold text-slate-200 text-center">
                      {agent.license}
                    </span>
                  </div>
                </div>

                {/* Main Information Details */}
                <div className="flex-1 space-y-4">
                  {/* Header Row: Title, Badges, Category */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100 group-hover:text-brand-gold transition-colors">
                        {agent.name}
                      </h2>

                      {/* Source Type Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                        agent.category === 'open-source'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                          : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      }`}>
                        {agent.categoryLabel}
                      </span>

                      {/* Differentiator Badge */}
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-brand-gold/10 text-brand-gold-bright border border-brand-gold/25 hidden sm:inline-block">
                        {agent.badge}
                      </span>
                    </div>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShare(agent)}
                      className="p-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light/60 border border-brand-gold/20 text-slate-400 hover:text-brand-gold text-xs transition-colors"
                      title="Share Agent"
                    >
                      {copiedId === agent.id ? (
                        <span className="text-emerald-400 text-xs font-bold px-1">Copied!</span>
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-semibold text-brand-gold/90">
                    {agent.tagline}
                  </p>

                  {/* Description & Overview */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {agent.description}
                  </p>

                  {/* Core Features Bullet Grid */}
                  <div className="pt-2">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                      Key Capabilities & Architecture
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {agent.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-300 bg-brand-navy-dark/60 p-2.5 rounded-xl border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Specifications Grid - FULL DETAILS, NO TRUNCATION */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 text-xs">
                    {/* 1. Interface */}
                    <div className="bg-brand-navy-dark/90 p-3.5 rounded-2xl border border-brand-gold/15 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-gold-bright">
                        <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Interface & Channels</span>
                      </div>
                      <div className="font-medium text-slate-200 leading-relaxed break-words">
                        {agent.keySpecs.interface}
                      </div>
                    </div>

                    {/* 2. Hosting */}
                    <div className="bg-brand-navy-dark/90 p-3.5 rounded-2xl border border-brand-gold/15 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-cyan-300">
                        <Server className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Deployment & Hosting</span>
                      </div>
                      <div className="font-medium text-slate-200 leading-relaxed break-words">
                        {agent.keySpecs.hosting}
                      </div>
                    </div>

                    {/* 3. Models Supported */}
                    <div className="bg-brand-navy-dark/90 p-3.5 rounded-2xl border border-brand-gold/15 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-300">
                        <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Models Supported</span>
                      </div>
                      <div className="font-medium text-slate-200 leading-relaxed break-words">
                        {agent.keySpecs.modelSupport}
                      </div>
                    </div>

                    {/* 4. Best For */}
                    <div className="bg-brand-navy-dark/90 p-3.5 rounded-2xl border border-brand-gold/15 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-amber-300">
                        <Users className="w-3.5 h-3.5 text-amber-400" />
                        <span>Target Audience / Best For</span>
                      </div>
                      <div className="font-medium text-slate-200 leading-relaxed break-words">
                        {agent.keySpecs.targetAudience}
                      </div>
                    </div>
                  </div>

                  {/* Action Link Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-brand-gold/15">
                    {/* Official Website / Access Link */}
                    <a
                      href={agent.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Official Access</span>
                    </a>

                    {/* Documentation & Knowledge Docs */}
                    <a
                      href={agent.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light/60 border border-brand-gold/30 hover:border-brand-gold/60 text-slate-200 hover:text-brand-gold text-xs font-bold tracking-wider transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Knowledge Docs</span>
                    </a>

                    {/* GitHub Repo (if Open Source) */}
                    {agent.githubUrl && (
                      <a
                        href={agent.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-100 text-xs font-bold tracking-wider transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                      >
                        <GithubIcon className="w-4 h-4 text-white" />
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comparison Guide Section */}
      <div className="mt-16 rounded-3xl bg-brand-navy-deep/80 border border-brand-gold/25 p-6 sm:p-10 backdrop-blur-xl">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
            <Server className="w-4 h-4" />
            Strategic Comparison Matrix
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100">
            Open Source vs. Managed Cloud AI Agents
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            How to select the right autonomous agent architecture for your personal and enterprise workflows.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-brand-gold/20 text-slate-400 font-mono uppercase tracking-wider">
                <th className="py-3 px-4">Dimension</th>
                <th className="py-3 px-4 text-cyan-300">Open Source (OpenClaw, Hermes)</th>
                <th className="py-3 px-4 text-purple-300">Managed Cloud (Dots, Grok Bots, Muse)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-200">
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Data Privacy & Sovereignty</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">100% on your machine/VPS; memories stored in local files.</td>
                <td className="py-3 px-4 text-slate-400">Stored in encrypted corporate cloud environments.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Setup Friction</td>
                <td className="py-3 px-4 text-slate-400">Requires Docker, CLI configuration, and API keys.</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">Zero friction; instant web and mobile turnkey onboarding.</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Messenger Integrations</td>
                <td className="py-3 px-4">Deep native hooks for Telegram, WhatsApp, Discord, Signal.</td>
                <td className="py-3 px-4">Slack, Microsoft Teams, proprietary native apps (e.g. Meta, xAI).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Model Freedom</td>
                <td className="py-3 px-4 text-emerald-400 font-medium">Bring your own model (Ollama, vLLM, OpenRouter, any API).</td>
                <td className="py-3 px-4 text-slate-400">Tied to the vendor's models (OpenAI, Grok, Llama).</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-bold text-slate-300">Execution Sandbox</td>
                <td className="py-3 px-4">Local shell scripts, python scripts, local filesystem access.</td>
                <td className="py-3 px-4">Cloud virtual machines, headless browser sandboxes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
