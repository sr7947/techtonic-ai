import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Settings, 
  LogOut, 
  ChevronDown, 
  Trophy, 
  Flame, 
  Cpu, 
  Newspaper,
  Bot,
  Terminal,
  Cloud,
  ArrowRight,
  Sparkles,
  Code2
} from 'lucide-react';
import { HallmarkThemeSwitcher } from './HallmarkThemeSwitcher';
import { 
  OpenClawLogo, 
  HermesAgentLogo, 
  DotsLogo, 
  GrokBotsLogo, 
  MuseLogo 
} from './AgentLogos';
import { CodingAgentLogoRenderer } from './CodingAgentLogos';

interface NavbarProps {
  user: { name: string; email: string; picture: string } | null;
  onSignIn: (user: { name: string; email: string; picture: string }) => void;
  onSignOut: () => void;
  onOpenAdmin: () => void;
  currentPath?: string;
  navigate?: (path: string) => void;
  cityMode?: boolean;
  onCityModeToggle?: () => void;
}

const GoogleIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onSignIn,
  onSignOut,
  onOpenAdmin,
  currentPath = '/',
  navigate = (path) => { window.location.pathname = path; }
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [agentsDropdownOpen, setAgentsDropdownOpen] = useState(false);
  const [mobileAgentsOpen, setMobileAgentsOpen] = useState(false);
  const [developerDropdownOpen, setDeveloperDropdownOpen] = useState(false);
  const [mobileDeveloperOpen, setMobileDeveloperOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const agentsNavRef = useRef<HTMLDivElement>(null);
  const developerNavRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<any>(null);
  const hoverDeveloperTimeoutRef = useRef<any>(null);

  const googleAccounts = [
    {
      name: "Kumar Shanu",
      email: "sr7947@gmail.com",
      picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sharat Chandra Singh",
      email: "scsingh0912@gmail.com",
      picture: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
      if (agentsNavRef.current && !agentsNavRef.current.contains(e.target as Node)) {
        setAgentsDropdownOpen(false);
      }
      if (developerNavRef.current && !developerNavRef.current.contains(e.target as Node)) {
        setDeveloperDropdownOpen(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handle scroll styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccountSelect = (account: typeof googleAccounts[0]) => {
    onSignIn({
      name: account.name,
      email: account.email,
      picture: account.picture
    });
    setShowLoginModal(false);
  };

  const handleMouseEnterAgents = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setAgentsDropdownOpen(true);
  };

  const handleMouseLeaveAgents = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setAgentsDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnterDeveloper = () => {
    if (hoverDeveloperTimeoutRef.current) clearTimeout(hoverDeveloperTimeoutRef.current);
    setDeveloperDropdownOpen(true);
  };

  const handleMouseLeaveDeveloper = () => {
    hoverDeveloperTimeoutRef.current = setTimeout(() => {
      setDeveloperDropdownOpen(false);
    }, 200);
  };

  // 6 Core Navigation Tabs
  const NAV_TABS = [
    {
      id: 'latest-updates',
      label: 'Latest Updates',
      path: '/',
      icon: <Newspaper className="w-4 h-4" />
    },
    {
      id: 'trending',
      label: 'Trending',
      path: '/trending',
      icon: <Flame className="w-4 h-4 text-orange-400" />
    },
    {
      id: 'models-hub',
      label: 'Model Hubs',
      path: '/models-hub',
      icon: <Cpu className="w-4 h-4 text-brand-gold" />
    },
    {
      id: 'model-rankings',
      label: 'Model Rankings',
      path: '/model-rankings',
      icon: <Trophy className="w-4 h-4 text-amber-300" />
    },
    {
      id: 'ai-agents',
      label: 'AI Agents',
      path: '/ai-agents',
      icon: <Bot className="w-4 h-4 text-cyan-400" />,
      hasDropdown: true
    },
    {
      id: 'developer-forum',
      label: 'Developer Forum',
      path: '/developer-forum',
      icon: <Code2 className="w-4 h-4 text-emerald-400" />,
      hasDropdown: true
    }
  ];

  const isTabActive = (tabPath: string) => {
    if (tabPath === '/') {
      return currentPath === '/' || currentPath === '/latest-updates';
    }
    if (tabPath === '/ai-agents') {
      return currentPath.startsWith('/ai-agents');
    }
    if (tabPath === '/developer-forum') {
      return currentPath.startsWith('/developer-forum');
    }
    return currentPath === tabPath;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-brand-navy-dark/95 backdrop-blur-xl border-b border-brand-gold/20 py-2.5 xl:py-3 shadow-2xl' 
            : 'bg-transparent py-3 xl:py-4'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-3 sm:px-5 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-6">
            
            {/* Brand Logo & Title (Protected against shrinking and overlapping) */}
            <button
              onClick={() => navigate('/')}
              className="shrink-0 flex items-center gap-2.5 sm:gap-3 group focus:outline-none rounded-xl p-1 text-left cursor-pointer z-10"
            >
              <img 
                src="/wenzdaylab-logo.png" 
                alt="WenzdayLab Logo" 
                className="w-9 h-9 sm:w-10 sm:h-10 object-cover rounded-xl border border-brand-gold/30 shadow-md group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col shrink-0 select-none">
                <span className="font-display text-base sm:text-lg xl:text-xl font-extrabold tracking-wider text-slate-100 group-hover:text-brand-gold transition-colors whitespace-nowrap">
                  WENZDAY<span className="gold-gradient-text">LAB</span>
                </span>
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-slate-400 font-semibold group-hover:text-brand-gold/80 transition-colors whitespace-nowrap">
                  Frontier Intelligence
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-brand-navy-deep/80 p-1 xl:p-1.5 rounded-2xl border border-brand-gold/20 backdrop-blur-md shadow-2xl shrink-0">
              {NAV_TABS.map((tab) => {
                const active = isTabActive(tab.path);

                if (tab.id === 'ai-agents') {
                  return (
                    <div 
                      key={tab.id}
                      ref={agentsNavRef}
                      onMouseEnter={handleMouseEnterAgents}
                      onMouseLeave={handleMouseLeaveAgents}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => navigate('/ai-agents')}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                          active ? 'text-brand-navy-dark' : 'text-slate-300 hover:text-slate-100 hover:bg-brand-navy-light/40'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeTabPill"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1 xl:gap-1.5">
                          {tab.icon}
                          <span className="whitespace-nowrap">{tab.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${agentsDropdownOpen ? 'rotate-180' : ''}`} />
                        </span>
                      </motion.button>

                      {/* Dropdown Menu for AI Agents */}
                      <AnimatePresence>
                        {agentsDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-2 w-[440px] rounded-3xl border border-brand-gold/30 bg-brand-navy-dark/95 p-4 shadow-2xl backdrop-blur-2xl z-50 text-left"
                          >
                            <div className="grid grid-cols-2 gap-3 mb-3">
                              
                              {/* Open Source Column */}
                              <div className="space-y-2.5 p-3 rounded-2xl bg-brand-navy-deep/70 border border-cyan-500/20">
                                <button
                                  onClick={() => {
                                    setAgentsDropdownOpen(false);
                                    navigate('/ai-agents?type=open-source');
                                  }}
                                  className="w-full flex items-center justify-between text-left group/os cursor-pointer"
                                >
                                  <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-cyan-300 group-hover/os:text-cyan-200">
                                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                                    Open Source
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-bold">
                                    2
                                  </span>
                                </button>

                                <div className="space-y-1.5 pt-1">
                                  {/* OpenClaw Item */}
                                  <button
                                    onClick={() => {
                                      setAgentsDropdownOpen(false);
                                      navigate('/ai-agents?type=open-source');
                                    }}
                                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-cyan-950/40 border border-transparent hover:border-cyan-500/30 transition-all text-left cursor-pointer group"
                                  >
                                    <OpenClawLogo className="w-7 h-7 shrink-0" />
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 truncate">OpenClaw</div>
                                      <div className="text-[10px] text-slate-400 truncate">Local & Messengers</div>
                                    </div>
                                  </button>

                                  {/* Hermes Agent Item */}
                                  <button
                                    onClick={() => {
                                      setAgentsDropdownOpen(false);
                                      navigate('/ai-agents?type=open-source');
                                    }}
                                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all text-left cursor-pointer group"
                                  >
                                    <HermesAgentLogo className="w-7 h-7 shrink-0" />
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">Hermes Agent</div>
                                      <div className="text-[10px] text-slate-400 truncate">Self-Improving AI</div>
                                    </div>
                                  </button>
                                </div>
                              </div>

                              {/* Managed Cloud Column */}
                              <div className="space-y-2.5 p-3 rounded-2xl bg-brand-navy-deep/70 border border-purple-500/20">
                                <button
                                  onClick={() => {
                                    setAgentsDropdownOpen(false);
                                    navigate('/ai-agents?type=managed-cloud');
                                  }}
                                  className="w-full flex items-center justify-between text-left group/mc cursor-pointer"
                                >
                                  <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-purple-300 group-hover/mc:text-purple-200">
                                    <Cloud className="w-3.5 h-3.5 text-purple-400" />
                                    Managed Cloud
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                                    3
                                  </span>
                                </button>

                                <div className="space-y-1.5 pt-1">
                                  {/* Dots Item */}
                                  <button
                                    onClick={() => {
                                      setAgentsDropdownOpen(false);
                                      navigate('/ai-agents?type=managed-cloud');
                                    }}
                                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all text-left cursor-pointer group"
                                  >
                                    <DotsLogo className="w-7 h-7 shrink-0" />
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">Dots</div>
                                      <div className="text-[10px] text-slate-400 truncate">OpenAI Coworker</div>
                                    </div>
                                  </button>

                                  {/* Grok Bots Item */}
                                  <button
                                    onClick={() => {
                                      setAgentsDropdownOpen(false);
                                      navigate('/ai-agents?type=managed-cloud');
                                    }}
                                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-amber-950/40 border border-transparent hover:border-amber-500/30 transition-all text-left cursor-pointer group"
                                  >
                                    <GrokBotsLogo className="w-7 h-7 shrink-0" />
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">Grok Bots</div>
                                      <div className="text-[10px] text-slate-400 truncate">xAI Workspaces</div>
                                    </div>
                                  </button>

                                  {/* Muse Item */}
                                  <button
                                    onClick={() => {
                                      setAgentsDropdownOpen(false);
                                      navigate('/ai-agents?type=managed-cloud');
                                    }}
                                    className="w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-purple-950/40 border border-transparent hover:border-purple-500/30 transition-all text-left cursor-pointer group"
                                  >
                                    <MuseLogo className="w-7 h-7 shrink-0" />
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300 truncate">Muse</div>
                                      <div className="text-[10px] text-slate-400 truncate">Meta Life-Admin</div>
                                    </div>
                                  </button>
                                </div>
                              </div>

                            </div>

                            {/* View All Agents Footer Link */}
                            <button
                              onClick={() => {
                                setAgentsDropdownOpen(false);
                                navigate('/ai-agents');
                              }}
                              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-brand-gold/15 to-brand-gold/25 hover:from-brand-gold/30 hover:to-brand-gold/40 border border-brand-gold/30 text-brand-gold-bright text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                              <span>Explore All 5 AI Agents</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                if (tab.id === 'developer-forum') {
                  return (
                    <div 
                      key={tab.id}
                      ref={developerNavRef}
                      onMouseEnter={handleMouseEnterDeveloper}
                      onMouseLeave={handleMouseLeaveDeveloper}
                      className="relative"
                    >
                      <motion.button
                        onClick={() => navigate('/developer-forum')}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`relative flex items-center gap-1 xl:gap-1.5 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                          active ? 'text-brand-navy-dark' : 'text-slate-300 hover:text-slate-100 hover:bg-brand-navy-light/40'
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeTabPill"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-1 xl:gap-1.5">
                          {tab.icon}
                          <span className="whitespace-nowrap">{tab.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${developerDropdownOpen ? 'rotate-180' : ''}`} />
                        </span>
                      </motion.button>

                      {/* Dropdown Menu for Developer Forum */}
                      <AnimatePresence>
                        {developerDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-1/2 -translate-x-1/2 mt-2 w-[580px] rounded-3xl border border-brand-gold/30 bg-brand-navy-dark/95 p-4 shadow-2xl backdrop-blur-2xl z-50 text-left"
                          >
                            {/* Header: 1) Coding Agent */}
                            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-brand-gold/20">
                              <div className="flex items-center gap-2">
                                <Code2 className="w-4 h-4 text-emerald-400" />
                                <span className="text-xs font-black uppercase tracking-wider text-brand-gold-bright">
                                  1) Coding Agent
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  • Autonomous SWEs & Platforms
                                </span>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono font-bold">
                                18 Agents
                              </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                              {/* Left Column: First-Party Coding Agents */}
                              <div className="space-y-2 p-2.5 rounded-2xl bg-brand-navy-deep/70 border border-blue-500/20 max-h-[300px] overflow-y-auto scrollbar-thin">
                                <button
                                  onClick={() => {
                                    setDeveloperDropdownOpen(false);
                                    navigate('/developer-forum?type=first-party');
                                  }}
                                  className="w-full flex items-center justify-between text-left group/fp cursor-pointer pb-1 border-b border-white/5"
                                >
                                  <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-blue-300 group-hover/fp:text-blue-200">
                                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                                    First-Party Coding Agents
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-mono font-bold">
                                    9
                                  </span>
                                </button>

                                <div className="space-y-1">
                                  {[
                                    { id: 'cursor', name: 'Cursor', desc: 'Anysphere AI IDE' },
                                    { id: 'opencode', name: 'OpenCode', desc: 'Local-first terminal' },
                                    { id: 'github-copilot', name: 'GitHub Copilot', desc: 'Workspace & Agent mode' },
                                    { id: 'devin', name: 'Devin', desc: 'Cognition Autonomous SWE' },
                                    { id: 'windsurf', name: 'Windsurf', desc: 'Codeium Cascade flow' },
                                    { id: 'cline', name: 'Cline', desc: 'Autonomous VS Code Agent' },
                                    { id: 'amazon-q-developer', name: 'Amazon Q', desc: 'Enterprise Code Transformer' },
                                    { id: 'amazon-kiro', name: 'Amazon Kero', desc: 'AWS Spec-Driven IDE' },
                                    { id: 'replit-agent', name: 'Replit Agent', desc: 'Instant Cloud Deployer' },
                                  ].map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => {
                                        setDeveloperDropdownOpen(false);
                                        navigate(`/developer-forum?agent=${item.id}`);
                                      }}
                                      className="w-full flex items-center gap-2 p-1.5 rounded-xl hover:bg-blue-950/40 border border-transparent hover:border-blue-500/30 transition-all text-left cursor-pointer group"
                                    >
                                      <CodingAgentLogoRenderer agentId={item.id} className="w-6 h-6 shrink-0" />
                                      <div className="min-w-0 flex-1">
                                        <div className="text-xs font-bold text-slate-200 group-hover:text-blue-300 truncate">{item.name}</div>
                                        <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Right Column: Independent AI Coding Platform */}
                              <div className="space-y-2 p-2.5 rounded-2xl bg-brand-navy-deep/70 border border-emerald-500/20 max-h-[300px] overflow-y-auto scrollbar-thin">
                                <button
                                  onClick={() => {
                                    setDeveloperDropdownOpen(false);
                                    navigate('/developer-forum?type=independent');
                                  }}
                                  className="w-full flex items-center justify-between text-left group/ind cursor-pointer pb-1 border-b border-white/5"
                                >
                                  <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-300 group-hover/ind:text-emerald-200">
                                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                                    Independent AI Platform
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold">
                                    9
                                  </span>
                                </button>

                                <div className="space-y-1">
                                  {[
                                    { id: 'google-antigravity', name: 'Google Antigravity', desc: 'Swarms & MCP native' },
                                    { id: 'codex', name: 'OpenAI Codex', desc: 'Canvas & reasoning' },
                                    { id: 'claude-code', name: 'Claude Code', desc: 'Anthropic CLI agent' },
                                    { id: 'grok-build', name: 'Grok Build', desc: 'xAI Grok 3 reasoning' },
                                    { id: 'muse-code', name: 'Muse Code', desc: 'Meta Llama suite' },
                                    { id: 'qwen-code', name: 'Qwen Code', desc: 'Alibaba 2.5 Coder' },
                                    { id: 'aider', name: 'Aider', desc: 'Terminal pair programmer' },
                                    { id: 'continue-dev', name: 'Continue.dev', desc: 'Open-source autopilot' },
                                    { id: 'zed-ai', name: 'Zed AI', desc: 'Rust 120 FPS editor' },
                                  ].map((item) => (
                                    <button
                                      key={item.id}
                                      onClick={() => {
                                        setDeveloperDropdownOpen(false);
                                        navigate(`/developer-forum?agent=${item.id}`);
                                      }}
                                      className="w-full flex items-center gap-2 p-1.5 rounded-xl hover:bg-emerald-950/40 border border-transparent hover:border-emerald-500/30 transition-all text-left cursor-pointer group"
                                    >
                                      <CodingAgentLogoRenderer agentId={item.id} className="w-6 h-6 shrink-0" />
                                      <div className="min-w-0 flex-1">
                                        <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-300 truncate">{item.name}</div>
                                        <div className="text-[10px] text-slate-400 truncate">{item.desc}</div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* View All Agents Footer Link */}
                            <button
                              onClick={() => {
                                setDeveloperDropdownOpen(false);
                                navigate('/developer-forum');
                              }}
                              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-brand-gold/15 to-brand-gold/25 hover:from-brand-gold/30 hover:to-brand-gold/40 border border-brand-gold/30 text-brand-gold-bright text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                              <span>Explore All 18 Coding Agents in Developer Forum</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-xl text-[11px] xl:text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                      active ? 'text-brand-navy-dark' : 'text-slate-300 hover:text-slate-100 hover:bg-brand-navy-light/40'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeTabPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-gold to-brand-gold-dark shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5 xl:gap-2">
                      {tab.icon}
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Right Side Actions: Theme Switcher, Admin & User Auth */}
            <div className="hidden sm:flex items-center gap-2 xl:gap-2.5 shrink-0">
              
              {/* Hallmark Theme Switcher */}
              <HallmarkThemeSwitcher />

              {/* Quick Admin Access Button */}
              {user && (
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-deep/80 hover:bg-brand-navy-light/60 border border-brand-gold/20 text-brand-gold-bright text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-md"
                  title="Admin Content & Database Panel"
                >
                  <Settings className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Admin</span>
                </button>
              )}

              {/* User Authentication */}
              {!user ? (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-1.5 bg-brand-gold/15 hover:bg-brand-gold/30 text-brand-gold-bright border border-brand-gold/30 hover:border-brand-gold/60 px-4 py-1.5 rounded-xl text-xs font-bold tracking-wider transition-all duration-200 active:scale-95 cursor-pointer shadow-md"
                >
                  <GoogleIcon className="w-3.5 h-3.5" />
                  Sign In
                </button>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDropdown(!showDropdown);
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-navy-deep/90 hover:bg-brand-navy-light/60 border border-brand-gold/30 transition-all text-slate-200 text-xs font-semibold shadow-md cursor-pointer"
                  >
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-gold/40"
                    />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-brand-gold/30 bg-brand-navy-deep p-2.5 shadow-2xl z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-3 py-2 border-b border-brand-gold/15 mb-2">
                        <div className="font-display text-slate-100 text-xs font-bold truncate">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {user.email}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onOpenAdmin();
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-brand-gold-bright hover:bg-brand-gold/15 transition-colors cursor-pointer"
                      >
                        <Settings className="w-4 h-4 text-brand-gold" />
                        Admin Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onSignOut();
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              {user && (
                <button
                  onClick={onOpenAdmin}
                  className="p-2 rounded-xl bg-brand-navy-deep border border-brand-gold/20 text-brand-gold"
                  title="Admin"
                >
                  <Settings className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-xl bg-brand-navy-deep border border-brand-gold/20 text-slate-200 hover:text-brand-gold"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-brand-navy-dark/95 border-b border-brand-gold/20 p-4 backdrop-blur-2xl animate-in slide-in-from-top duration-250">
            <div className="flex flex-col gap-2">
              <div className="py-2 border-b border-white/10 mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Hallmark Theme</span>
                <HallmarkThemeSwitcher />
              </div>

              {NAV_TABS.map((tab) => {
                const active = isTabActive(tab.path);

                if (tab.id === 'ai-agents') {
                  return (
                    <div key={tab.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            navigate('/ai-agents');
                          }}
                          className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                            active
                              ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-md'
                              : 'text-slate-200 hover:bg-brand-navy-light/40'
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                        <button
                          onClick={() => setMobileAgentsOpen(!mobileAgentsOpen)}
                          className="p-3 text-slate-400 hover:text-brand-gold"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileAgentsOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Mobile Accordion Sub-options */}
                      {mobileAgentsOpen && (
                        <div className="pl-6 space-y-1 py-1">
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              navigate('/ai-agents?type=open-source');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-cyan-300 hover:bg-cyan-950/30 text-left font-medium"
                          >
                            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Open Source (OpenClaw, Hermes)</span>
                          </button>
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              navigate('/ai-agents?type=managed-cloud');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-purple-300 hover:bg-purple-950/30 text-left font-medium"
                          >
                            <Cloud className="w-3.5 h-3.5 text-purple-400" />
                            <span>Managed Cloud (Dots, Grok, Muse)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                if (tab.id === 'developer-forum') {
                  return (
                    <div key={tab.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            navigate('/developer-forum');
                          }}
                          className={`flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                            active
                              ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-md'
                              : 'text-slate-200 hover:bg-brand-navy-light/40'
                          }`}
                        >
                          {tab.icon}
                          <span>{tab.label}</span>
                        </button>
                        <button
                          onClick={() => setMobileDeveloperOpen(!mobileDeveloperOpen)}
                          className="p-3 text-slate-400 hover:text-brand-gold"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${mobileDeveloperOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>

                      {/* Mobile Accordion Sub-options */}
                      {mobileDeveloperOpen && (
                        <div className="pl-6 space-y-1 py-1">
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              navigate('/developer-forum?type=first-party');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-blue-300 hover:bg-blue-950/30 text-left font-medium"
                          >
                            <Code2 className="w-3.5 h-3.5 text-blue-400" />
                            <span>First-Party Agents (Cursor, Copilot, Devin, Kero)</span>
                          </button>
                          <button
                            onClick={() => {
                              setIsOpen(false);
                              navigate('/developer-forum?type=independent');
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-emerald-300 hover:bg-emerald-950/30 text-left font-medium"
                          >
                            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Independent Platforms (Antigravity, Codex, Claude)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setIsOpen(false);
                      navigate(tab.path);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all text-left ${
                      active
                        ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-md'
                        : 'text-slate-200 hover:bg-brand-navy-light/40'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-brand-gold/15 mt-2 flex items-center justify-between">
                {!user ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowLoginModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-gold text-brand-navy-dark font-bold text-xs uppercase"
                  >
                    <GoogleIcon className="w-4 h-4" />
                    Sign In with Google
                  </button>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <img src={user.picture} alt={user.name} className="w-7 h-7 rounded-full border border-brand-gold/30" />
                      <span className="text-xs font-bold text-slate-200 truncate max-w-[150px]">{user.name}</span>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onSignOut();
                      }}
                      className="text-xs text-red-400 font-bold px-3 py-1.5 rounded-xl bg-red-500/10"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Google Sign In Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-brand-navy-deep border border-brand-gold/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-200 p-1 rounded-xl"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <img src="/wenzdaylab-logo.png" alt="WenzdayLab" className="w-12 h-12 mx-auto rounded-xl border border-brand-gold/30 object-cover" />
              <h3 className="font-display text-xl font-bold text-slate-100">Sign in to WenzdayLab</h3>
              <p className="text-xs text-slate-400">Choose your account to access curated news and admin publishing.</p>
            </div>

            <div className="space-y-3">
              {googleAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleAccountSelect(account)}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-brand-navy-dark/90 hover:bg-brand-navy-light/60 border border-brand-gold/20 hover:border-brand-gold/40 transition-all text-left group"
                >
                  <img src={account.picture} alt={account.name} className="w-9 h-9 rounded-full object-cover border border-brand-gold/30" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-200 group-hover:text-brand-gold truncate">{account.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{account.email}</div>
                  </div>
                  <GoogleIcon className="w-4 h-4 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
