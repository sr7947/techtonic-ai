import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  Layers, 
  ExternalLink, 
  Search, 
  Network, 
  Wrench, 
  Cpu, 
  BookOpen,
  Code2,
  Server,
  Zap,
  Boxes,
  Database
} from 'lucide-react';
import { CODING_AGENTS, type CodingAgent } from '../data/codingAgentsData';
import { CodingAgentLogoRenderer } from '../components/CodingAgentLogos';
import { CodingAgentModal } from '../components/CodingAgentModal';

import { AGENT_FRAMEWORKS, type AgentFramework } from '../data/agentFrameworksData';
import { AgentFrameworkLogoRenderer } from '../components/AgentFrameworkLogos';
import { AgentFrameworkModal } from '../components/AgentFrameworkModal';

export const DeveloperForumPage: React.FC = () => {
  // Main Section Toggle: 1) Coding Agents vs. 2) AI Agent Frameworks
  const [activeSection, setActiveSection] = useState<'coding-agents' | 'frameworks'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const sec = params.get('section') || params.get('tab');
      if (sec === 'frameworks' || sec === 'agent-frameworks' || params.get('framework')) {
        return 'frameworks';
      }
    }
    return 'coding-agents';
  });

  // Filters for Coding Agents
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'first-party' | 'independent'>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('type') || params.get('category');
      if (cat === 'first-party' || cat === 'independent') return cat;
    }
    return 'all';
  });

  // Filters for AI Agent Frameworks
  const [frameworkFilter, setFrameworkFilter] = useState<'all' | 'frontier-sdk' | 'multi-agent-orchestrator' | 'python-first' | 'typescript-fullstack' | 'enterprise-jvm'>('all');

  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalAgent, setActiveModalAgent] = useState<CodingAgent | null>(null);
  const [activeModalFramework, setActiveModalFramework] = useState<AgentFramework | null>(null);

  // Sync state with URL params
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const sec = params.get('section') || params.get('tab');
      const agentId = params.get('agent');
      const frameworkId = params.get('framework');

      if (frameworkId) {
        const foundFw = AGENT_FRAMEWORKS.find(f => f.id === frameworkId);
        if (foundFw) {
          setActiveModalFramework(foundFw);
          setActiveSection('frameworks');
        }
      } else if (agentId) {
        const found = CODING_AGENTS.find(a => a.id === agentId);
        if (found) {
          setActiveModalAgent(found);
          setActiveSection('coding-agents');
        }
      } else if (sec === 'frameworks' || sec === 'agent-frameworks') {
        setActiveSection('frameworks');
      } else if (sec === 'coding-agents') {
        setActiveSection('coding-agents');
      }

      const cat = params.get('type') || params.get('category');
      if (cat === 'first-party' || cat === 'independent') {
        setSelectedFilter(cat);
      } else if (['frontier-sdk', 'multi-agent-orchestrator', 'python-first', 'typescript-fullstack', 'enterprise-jvm'].includes(cat as any)) {
        setFrameworkFilter(cat as any);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleSectionSwitch = (section: 'coding-agents' | 'frameworks') => {
    setActiveSection(section);
    setSearchQuery('');
    const url = new URL(window.location.href);
    url.searchParams.set('section', section);
    url.searchParams.delete('agent');
    url.searchParams.delete('framework');
    url.searchParams.delete('type');
    url.searchParams.delete('category');
    window.history.pushState({}, '', url.toString());
  };

  const handleFilterChange = (filter: 'all' | 'first-party' | 'independent') => {
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

  const handleFrameworkFilterChange = (filter: typeof frameworkFilter) => {
    setFrameworkFilter(filter);
    const url = new URL(window.location.href);
    if (filter === 'all') {
      url.searchParams.delete('type');
    } else {
      url.searchParams.set('type', filter);
    }
    window.history.pushState({}, '', url.toString());
  };

  const handleOpenAgentModal = (agent: CodingAgent) => {
    setActiveModalAgent(agent);
    const url = new URL(window.location.href);
    url.searchParams.set('agent', agent.id);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseModal = () => {
    setActiveModalAgent(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('agent');
    window.history.pushState({}, '', url.toString());
  };

  const handleOpenFrameworkModal = (framework: AgentFramework) => {
    setActiveModalFramework(framework);
    const url = new URL(window.location.href);
    url.searchParams.set('framework', framework.id);
    window.history.pushState({}, '', url.toString());
  };

  const handleCloseFrameworkModal = () => {
    setActiveModalFramework(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('framework');
    window.history.pushState({}, '', url.toString());
  };

  // Filtered Coding Agents
  const filteredAgents = CODING_AGENTS.filter(agent => {
    const matchesFilter = selectedFilter === 'all' || agent.category === selectedFilter;
    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      agent.name.toLowerCase().includes(q) ||
      agent.developer.toLowerCase().includes(q) ||
      agent.tagline.toLowerCase().includes(q) ||
      agent.badge.toLowerCase().includes(q) ||
      agent.foundationModels.supported.some(m => m.toLowerCase().includes(q)) ||
      agent.mcps.popularServers.some(s => s.toLowerCase().includes(q))
    );
  });

  // Filtered AI Agent Frameworks
  const filteredFrameworks = AGENT_FRAMEWORKS.filter(fw => {
    const matchesFilter = frameworkFilter === 'all' || fw.category === frameworkFilter;
    if (!matchesFilter) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      fw.name.toLowerCase().includes(q) ||
      fw.developer.toLowerCase().includes(q) ||
      fw.tagline.toLowerCase().includes(q) ||
      fw.badge.toLowerCase().includes(q) ||
      fw.languages.some(l => l.toLowerCase().includes(q)) ||
      fw.keyFeatures.some(f => f.toLowerCase().includes(q)) ||
      fw.useCases.primary.some(u => u.toLowerCase().includes(q))
    );
  });

  const firstPartyCount = CODING_AGENTS.filter(a => a.category === 'first-party').length;
  const independentCount = CODING_AGENTS.filter(a => a.category === 'independent').length;

  return (
    <div className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Top Main Section Switcher (Option 1 vs Option 2) */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1.5 rounded-3xl bg-brand-navy-deep/90 border border-brand-gold/30 shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => handleSectionSwitch('coding-agents')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeSection === 'coding-agents'
                ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-105'
                : 'text-slate-300 hover:text-slate-100 hover:bg-white/5'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>1) Coding Agents ({CODING_AGENTS.length})</span>
          </button>

          <button
            onClick={() => handleSectionSwitch('frameworks')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeSection === 'frameworks'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
                : 'text-slate-300 hover:text-slate-100 hover:bg-white/5'
            }`}
          >
            <Boxes className="w-4 h-4 text-cyan-300" />
            <span>2) AI Agent Frameworks ({AGENT_FRAMEWORKS.length})</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: CODING AGENTS (IDEs & Autonomous Terminal SWEs)   */}
      {/* ============================================================ */}
      {activeSection === 'coding-agents' && (
        <>
          {/* Hero Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold-bright text-xs font-bold uppercase tracking-widest shadow-inner">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-gold" />
              Developer Forum • Option 1: Frontier AI Coding Directory
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100">
              The Frontier of <span className="gold-gradient-text">Coding Agents</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Explore native AI-first IDEs, autonomous terminal engineers, and independent agent platforms. Compare installation procedures, foundation models, MCP servers, and tooling ecosystems.
            </p>

            {/* Search Bar & Category Filters */}
            <div className="pt-4 max-w-xl mx-auto space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by agent, company, model (e.g. Cursor, Devin, Claude Code)..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-brand-navy-deep/90 border border-brand-gold/25 text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold shadow-lg"
                />
              </div>

              {/* Filter Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handleFilterChange('all')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'all'
                      ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-[0_0_25px_rgba(212,175,55,0.4)] scale-105'
                      : 'bg-brand-navy-deep/80 text-slate-300 hover:text-slate-100 border border-brand-gold/20'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>All Coding Agents ({CODING_AGENTS.length})</span>
                </button>

                <button
                  onClick={() => handleFilterChange('first-party')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'first-party'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] scale-105'
                      : 'bg-brand-navy-deep/80 text-blue-300 hover:text-blue-100 border border-blue-500/30'
                  }`}
                >
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>First-Party Agents ({firstPartyCount})</span>
                </button>

                <button
                  onClick={() => handleFilterChange('independent')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedFilter === 'independent'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.4)] scale-105'
                      : 'bg-brand-navy-deep/80 text-emerald-300 hover:text-emerald-100 border border-emerald-500/30'
                  }`}
                >
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Independent Platforms ({independentCount})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Coding Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  className="relative rounded-3xl bg-brand-navy-deep/90 border border-brand-gold/25 p-5 sm:p-6 backdrop-blur-xl shadow-2xl hover:border-brand-gold/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Subtle Ambient Glow */}
                  <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${agent.gradient} blur-2xl pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity`} />

                  <div className="relative z-10 space-y-4">
                    
                    {/* Header Row: Logo, Title, Badges */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 rounded-2xl bg-brand-navy-dark border border-brand-gold/30 shadow-lg group-hover:scale-105 transition-transform shrink-0">
                        <CodingAgentLogoRenderer agentId={agent.id} className="w-10 h-10" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-lg font-bold text-slate-100 group-hover:text-brand-gold transition-colors truncate">
                            {agent.name}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                            agent.category === 'first-party'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          }`}>
                            {agent.category === 'first-party' ? 'First-Party' : 'Independent'}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-400 truncate">
                          {agent.developer} • <span className="text-brand-gold/90">{agent.pricing}</span>
                        </p>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-semibold text-brand-gold/90 line-clamp-2 leading-relaxed">
                      {agent.tagline}
                    </p>

                    {/* Short Overview */}
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Technical Highlights Chips */}
                    <div className="space-y-2 pt-2 border-t border-white/5 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Cpu className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="truncate"><span className="text-slate-400">Default:</span> {agent.foundationModels.defaultRecommendation}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Network className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate"><span className="text-slate-400">MCP:</span> {agent.mcps.type}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Wrench className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate"><span className="text-slate-400">Env:</span> {agent.toolsAndPlugins.ideSupport[0]}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Row */}
                  <div className="relative z-10 pt-4 mt-4 border-t border-brand-gold/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenAgentModal(agent)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Setup & Specs</span>
                    </button>

                    <a
                      href={agent.documentation.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light border border-brand-gold/20 text-slate-300 hover:text-brand-gold transition-colors shrink-0 cursor-pointer"
                      title="Official Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={agent.documentation.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light border border-brand-gold/20 text-slate-300 hover:text-brand-gold transition-colors shrink-0 cursor-pointer"
                      title="Documentation"
                    >
                      <BookOpen className="w-4 h-4" />
                    </a>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Coding Agents Comparison Matrix */}
          <div className="mt-16 rounded-3xl bg-brand-navy-deep/80 border border-brand-gold/25 p-6 sm:p-10 backdrop-blur-xl">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider mb-2">
                <Server className="w-4 h-4" />
                Architectural Evaluation Matrix
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100">
                First-Party IDE Agents vs. Independent CLI & Agent Platforms
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                Evaluating developer autonomy, model freedom, MCP extensibility, and enterprise security.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-brand-gold/20 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-4">Evaluation Metric</th>
                    <th className="py-3 px-4 text-blue-400">First-Party Agents (Cursor, Copilot, Devin, Windsurf)</th>
                    <th className="py-3 px-4 text-emerald-400">Independent Platforms (Antigravity, Codex, Claude Code, Qwen, Aider)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-300">Primary Interface</td>
                    <td className="py-3 px-4">Full Desktop IDEs, cloud web consoles, and managed workspaces.</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Terminal TUIs, lightweight extensions, CLI scripts, and headless swarms.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-300">Model Freedom & BYOK</td>
                    <td className="py-3 px-4 text-slate-400">Often bundled into monthly subscription tiers (e.g. Copilot, Devin).</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Bring your own API key (BYOK) or run 100% private offline models (Ollama).</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-300">Model Context Protocol (MCP)</td>
                    <td className="py-3 px-4">Supported via built-in configuration panels (Cursor, Windsurf).</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Deep native stdio & SSE client/server architectures (Antigravity, Continue).</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-300">Multi-File Patching</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Visual interactive side-by-side diffs with 1-click accept/reject.</td>
                    <td className="py-3 px-4">Unified diff format with automated git branch commits and test validation loops.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-300">Data Sovereignty & Air-Gap</td>
                    <td className="py-3 px-4 text-slate-400">Requires connection to vendor indexing servers and telemetry.</td>
                    <td className="py-3 px-4 text-emerald-300 font-medium">Can run completely offline on local GPUs (Qwen Code, Muse Code, Aider).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: POPULAR AI AGENT FRAMEWORKS & SDKS                */}
      {/* ============================================================ */}
      {activeSection === 'frameworks' && (
        <>
          {/* Hero Header Section */}
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest shadow-inner">
              <Boxes className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
              Developer Forum • Option 2: Popular AI Agent Frameworks & SDKs
            </div>

            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-100">
              The Frontier of <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">Agent Frameworks</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Compare production-grade agentic SDKs, multi-agent swarms, and model-driven frameworks across Python, TypeScript, Java, and .NET. Inspect state machines, tool calling loops, MCP protocols, and step-by-step implementation guides.
            </p>

            {/* Search Bar & Category Filters */}
            <div className="pt-4 max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search frameworks (e.g. LangGraph, Google ADK, CrewAI, PydanticAI, Vercel)..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-brand-navy-deep/90 border border-cyan-500/30 text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-lg"
                />
              </div>

              {/* Framework Filter Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'all', label: `All Frameworks (${AGENT_FRAMEWORKS.length})`, icon: <Boxes className="w-3.5 h-3.5" /> },
                  { id: 'frontier-sdk', label: 'Big-Tech Frontier SDKs', icon: <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> },
                  { id: 'multi-agent-orchestrator', label: 'Multi-Agent & Graphs', icon: <Network className="w-3.5 h-3.5 text-emerald-400" /> },
                  { id: 'python-first', label: 'Python-First', icon: <Code2 className="w-3.5 h-3.5 text-amber-400" /> },
                  { id: 'typescript-fullstack', label: 'TypeScript & Fullstack', icon: <Zap className="w-3.5 h-3.5 text-blue-400" /> },
                  { id: 'enterprise-jvm', label: 'Enterprise & JVM', icon: <Server className="w-3.5 h-3.5 text-green-400" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleFrameworkFilterChange(tab.id as any)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                      frameworkFilter === tab.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-105'
                        : 'bg-brand-navy-deep/80 text-slate-300 hover:text-slate-100 border border-white/10'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Frameworks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredFrameworks.map((fw, index) => (
                <motion.div
                  key={fw.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="relative rounded-3xl bg-brand-navy-deep/90 border border-brand-gold/20 p-5 sm:p-6 backdrop-blur-xl shadow-2xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Subtle Ambient Glow */}
                  <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br ${fw.gradient} blur-2xl pointer-events-none opacity-30 group-hover:opacity-60 transition-opacity`} />

                  <div className="relative z-10 space-y-4">
                    
                    {/* Header Row: Logo, Title, Badges */}
                    <div className="flex items-start gap-3.5">
                      <div className="p-2 rounded-2xl bg-brand-navy-dark border border-brand-gold/30 shadow-lg group-hover:scale-105 transition-transform shrink-0">
                        <AgentFrameworkLogoRenderer frameworkId={fw.id} className="w-10 h-10" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-display text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors truncate">
                            {fw.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shrink-0">
                            {fw.languages[0]}
                          </span>
                        </div>
                        <p className="text-[11px] font-medium text-slate-400 truncate">
                          {fw.developer} • <span className="text-brand-gold/90">{fw.license}</span>
                        </p>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-xs font-semibold text-cyan-300/90 line-clamp-2 leading-relaxed">
                      {fw.tagline}
                    </p>

                    {/* Short Description */}
                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {fw.description}
                    </p>

                    {/* Key Technical Highlights */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Cpu className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                        <span className="truncate"><span className="text-slate-400">Models:</span> {fw.ecosystem.supportedModels[0]}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate"><span className="text-slate-400">State:</span> {fw.ecosystem.stateManagement.split(';')[0]}</span>
                      </div>

                      <div className="flex items-center gap-2 text-slate-300">
                        <Network className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate"><span className="text-slate-400">MCP:</span> {fw.ecosystem.mcpSupport.split(',')[0]}</span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons Row */}
                  <div className="relative z-10 pt-4 mt-4 border-t border-brand-gold/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenFrameworkModal(fw)}
                      className="flex-1 flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Knowledge Guide & Code</span>
                    </button>

                    <a
                      href={fw.documentation.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light border border-white/10 text-slate-300 hover:text-cyan-300 transition-colors shrink-0 cursor-pointer"
                      title="Website"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={fw.documentation.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light border border-white/10 text-slate-300 hover:text-cyan-300 transition-colors shrink-0 cursor-pointer"
                      title="Documentation"
                    >
                      <BookOpen className="w-4 h-4" />
                    </a>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* AI Agent Frameworks Architectural Matrix */}
          <div className="mt-16 rounded-3xl bg-brand-navy-deep/80 border border-brand-gold/25 p-6 sm:p-10 backdrop-blur-xl">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Boxes className="w-4 h-4" />
                Comprehensive Architectural Comparison
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-100">
                Agent Framework Paradigms: Choosing the Right Engine
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2">
                A technical comparison of graph-based, role-playing, code-first, and event-driven agent architectures.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-brand-gold/20 text-slate-400 font-mono uppercase tracking-wider">
                    <th className="py-3 px-4">Architecture Paradigm</th>
                    <th className="py-3 px-4 text-cyan-400">Representative Frameworks</th>
                    <th className="py-3 px-4 text-brand-gold">Execution Model</th>
                    <th className="py-3 px-4 text-emerald-400">Best Production Fit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-200">
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Cyclical Graph State Machines</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">LangGraph, LlamaIndex Workflows</td>
                    <td className="py-3.5 px-4">StateGraphs with Nodes and conditional Edges; checkpoints after every turn to support time travel and pausing.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Complex multi-turn loops, human approval gates, audit compliance, financial transactions.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Frontier Model-Driven SDKs</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">OpenAI Agents SDK, Google ADK, AWS Strands, Claude SDK</td>
                    <td className="py-3.5 px-4">Direct model calling loops with native function calling, extended thinking, and standardized MCP tools.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Cloud-native microservices on Vertex AI, Azure, AWS Bedrock, and low-latency API backends.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Role-Playing & Conversational Swarms</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">CrewAI, AutoGen / AG2</td>
                    <td className="py-3.5 px-4">Agents with Persona/Backstory collaborate sequentially or via group chat round-robins.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Content production, market research, adversarial debate, multi-agent brainstorming.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Code-as-Action Minimalist</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">Smolagents (Hugging Face)</td>
                    <td className="py-3.5 px-4">Agent writes Python code blocks (loops, math) executed inside a sandboxed AST interpreter instead of JSON schemas.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Algorithmic calculations, multi-hop search, and low-overhead open-source model execution.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Strict Type-Safe & Functional</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">PydanticAI, Mastra, Vercel AI SDK</td>
                    <td className="py-3.5 px-4">Static type validation (Pydantic / Zod) guarantees schema consistency and fail-fast validation.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Production web backends, FastAPI / Next.js applications, real-time UI streaming dashboards.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Filesystem-First Durable Runtimes</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">Eve (Vercel)</td>
                    <td className="py-3.5 px-4">Convention-over-configuration directories (`instructions.md`, `skills/`, `subagents/`) with sandbox isolation.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Durable DevOps and long-running autonomous background tasks with file governance.</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-bold text-slate-200">Enterprise JVM & Framework Native</td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">Spring AI, Microsoft Agent Framework</td>
                    <td className="py-3.5 px-4">Integrates with Spring Boot / .NET runtime dependency injection, enterprise middleware, and Actuator metrics.</td>
                    <td className="py-3.5 px-4 text-emerald-300">Enterprise banking, ERP, legacy microservices, and enterprise Kubernetes clusters.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Modal 1: Coding Agent Specs */}
      <CodingAgentModal
        agent={activeModalAgent}
        onClose={handleCloseModal}
      />

      {/* Modal 2: AI Agent Framework Knowledge Guide */}
      <AgentFrameworkModal
        framework={activeModalFramework}
        onClose={handleCloseFrameworkModal}
      />

    </div>
  );
};
