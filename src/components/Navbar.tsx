import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Settings, LogOut, ChevronDown, ArrowLeft } from 'lucide-react';

interface NavbarProps {
  user: { name: string; email: string; picture: string } | null;
  onSignIn: (user: { name: string; email: string; picture: string }) => void;
  onSignOut: () => void;
  onOpenAdmin: () => void;
  currentPath?: string;
  navigate?: (path: string) => void;
}

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .503 6.163C0 8.037 0 12 0 12s0 3.963.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.963 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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
  const [activeSection, setActiveSection] = useState('home');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Custom User Creation states
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');

  // Accounts list parsed directly from the user's Google accounts screenshot!
  const googleAccounts = [
    {
      name: "Kumar Shanu",
      email: "sr7947@gmail.com",
      avatarBg: "bg-[#7c4dff]",
      initial: "K",
      picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
    },
    {
      name: "Sharat Chandra Singh",
      email: "scsingh0912@gmail.com",
      avatarBg: "bg-[#e65100]",
      initial: "S",
      picture: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80"
    }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  // Handle active scroll sections
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['updates', 'models', 'leaders', 'learning', 'videos', 'trending', 'subscribe'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
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

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;

    let displayName = customName.trim();
    if (!displayName) {
      const prefix = customEmail.split('@')[0];
      displayName = prefix.split(/[._-]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }

    onSignIn({
      name: displayName,
      email: customEmail.trim(),
      picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    });
    setCustomEmail('');
    setCustomName('');
    setShowCustomForm(false);
    setShowLoginModal(false);
  };



  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-brand-navy-dark/80 backdrop-blur-md border-b border-brand-gold/10 py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo & Brand */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-gold/50 rounded-lg p-1">
              <img 
                src="/logo.png" 
                alt="TechTonic AI Logo" 
                className="w-10 h-10 object-contain rounded-md border border-brand-gold/20 group-hover:border-brand-gold/50 transition-colors"
              />
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl font-bold tracking-widest text-brand-gold group-hover:text-brand-gold-bright transition-colors">
                  TECHTONIC AI
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 group-hover:text-brand-gold/80 transition-colors">
                  Let's Explore Future Together
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-5">
              
              {/* Home-scroll Sections */}
              {[
                { id: 'updates', label: 'Latest Updates' },
                { id: 'leaders', label: 'AI Leaders' },
                { id: 'learning', label: 'AI Developers' },
                { id: 'videos', label: 'Videos' }
              ].map((sect) => (
                <button
                  key={sect.id}
                  onClick={() => {
                    if (currentPath === '/') {
                      document.getElementById(sect.id)?.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      navigate('/');
                      setTimeout(() => {
                        document.getElementById(sect.id)?.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }
                  }}
                  className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-1 focus:outline-none hover:text-brand-gold cursor-pointer ${
                    currentPath === '/' && activeSection === sect.id ? 'text-brand-gold-bright' : 'text-slate-300'
                  }`}
                >
                  {sect.label}
                </button>
              ))}

              {/* Dedicated Subpages */}
              <button
                onClick={() => navigate('/models-hub')}
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-1 focus:outline-none hover:text-brand-gold cursor-pointer ${
                  currentPath === '/models-hub' ? 'text-brand-gold-bright font-bold' : 'text-slate-300'
                }`}
              >
                Models Hub
              </button>

              <button
                onClick={() => navigate('/trending')}
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-1 focus:outline-none hover:text-brand-gold cursor-pointer ${
                  currentPath === '/trending' ? 'text-brand-gold-bright font-bold' : 'text-slate-300'
                }`}
              >
                Trending
              </button>

              <button
                onClick={() => navigate('/learning')}
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative py-1 focus:outline-none hover:text-brand-gold cursor-pointer ${
                  currentPath === '/learning' ? 'text-brand-gold-bright font-bold' : 'text-slate-300'
                }`}
              >
                AI Learning
              </button>

              {/* Technologies Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-brand-gold transition-all py-1 focus:outline-none cursor-pointer">
                  Technologies
                  <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-52 rounded-2xl glass-panel border border-brand-gold/20 bg-brand-navy-deep p-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {[
                    { name: 'Developer Studio', path: '/technologies/developer-studio' },
                    { name: 'MCP (Model Context)', path: '/technologies/mcp' },
                    { name: 'Skills & Tools', path: '/technologies/skills' },
                    { name: 'Agent Frameworks', path: '/technologies/frameworks' },
                    { name: 'AI Infrastructure', path: '/technologies/infrastructure' },
                  ].map((tech) => (
                    <button
                      key={tech.name}
                      onClick={() => navigate(tech.path)}
                      className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-xl text-slate-300 hover:text-brand-navy-dark hover:bg-brand-gold transition-all duration-200 cursor-pointer"
                    >
                      {tech.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-5 w-[1px] bg-brand-gold/20 mx-2" />

              {/* Authentication Actions */}
              {!user ? (
                <button
                  onClick={() => {
                    setShowCustomForm(false);
                    setShowLoginModal(true);
                  }}
                  className="flex items-center gap-1.5 bg-brand-gold/10 hover:bg-brand-gold/25 text-brand-gold-bright border border-brand-gold/20 hover:border-brand-gold/50 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-300 active:scale-95 cursor-pointer"
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
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-brand-navy-light/25 hover:bg-brand-navy-light/45 border border-brand-gold/20 transition-all text-slate-200 text-xs font-medium select-none"
                  >
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-brand-gold/30"
                    />
                    <span className="max-w-[100px] truncate">{user.name}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl glass-panel border border-brand-gold/20 bg-brand-navy-deep p-2.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-250">
                      <div className="px-3.5 py-2.5 border-b border-brand-gold/10 mb-2">
                        <div className="font-serif text-slate-200 text-xs font-bold truncate uppercase tracking-wide">
                          {user.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">
                          {user.email}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onOpenAdmin();
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold text-brand-gold-bright hover:bg-brand-gold/10 hover:text-brand-gold transition-colors"
                      >
                        <Settings className="w-4 h-4 text-brand-gold" />
                        Admin Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          onSignOut();
                        }}
                        className="flex items-center gap-2.5 w-full text-left px-3.5 py-2 mt-1 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              <a
                href="https://youtube.com/@techtonicai7947"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/25 text-red-500 border border-red-500/20 hover:border-red-500/50 px-4 py-2 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none active:scale-95"
              >
                <YoutubeIcon className="w-4 h-4 fill-red-500" />
                Subscribe
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-300 hover:text-brand-gold hover:bg-brand-navy-light/35 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-4 space-y-1.5 bg-brand-navy-dark/95 border-b border-brand-gold/10 shadow-2xl backdrop-blur-lg">
            {/* Home scroll sections */}
            {[
              { id: 'updates', label: 'Latest Updates' },
              { id: 'leaders', label: 'AI Leaders' },
              { id: 'learning', label: 'AI Developers' },
              { id: 'videos', label: 'Videos' }
            ].map((sect) => (
              <button
                key={sect.id}
                onClick={() => {
                  setIsOpen(false);
                  if (currentPath === '/') {
                    document.getElementById(sect.id)?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/');
                    setTimeout(() => {
                      document.getElementById(sect.id)?.scrollIntoView({ behavior: 'smooth' });
                    }, 200);
                  }
                }}
                className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-brand-navy-light/20 hover:text-brand-gold cursor-pointer"
              >
                {sect.label}
              </button>
            ))}

            {/* Dedicated subpages */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/models-hub');
              }}
              className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-brand-navy-light/20 hover:text-brand-gold cursor-pointer"
            >
              Models Hub
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/trending');
              }}
              className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-brand-navy-light/20 hover:text-brand-gold cursor-pointer"
            >
              Trending
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/learning');
              }}
              className="w-full text-left block px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:bg-brand-navy-light/20 hover:text-brand-gold cursor-pointer"
            >
              AI Learning
            </button>

            {/* Technologies Accordion */}
            <div className="border-t border-brand-gold/10 pt-2 mt-2">
              <span className="block px-4 py-1 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                Technologies Hub
              </span>
              {[
                { name: 'Developer Studio', path: '/technologies/developer-studio' },
                { name: 'MCP (Model Context)', path: '/technologies/mcp' },
                { name: 'Skills & Tools', path: '/technologies/skills' },
                { name: 'Agent Frameworks', path: '/technologies/frameworks' },
                { name: 'AI Infrastructure', path: '/technologies/infrastructure' },
              ].map((tech) => (
                <button
                  key={tech.name}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(tech.path);
                  }}
                  className="w-full text-left block px-6 py-2 text-sm font-medium text-slate-400 hover:text-brand-gold cursor-pointer"
                >
                  - {tech.name}
                </button>
              ))}
            </div>

            <div className="border-t border-brand-gold/10 pt-4 mt-2 px-4 space-y-3">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5 py-1">
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-brand-gold/30"
                    />
                    <div className="text-left">
                      <div className="text-sm font-bold text-slate-200">{user.name}</div>
                      <div className="text-[10px] text-slate-500">{user.email}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAdmin();
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold-bright border border-brand-gold/25 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-colors"
                  >
                    <Settings className="w-4 h-4 text-brand-gold" />
                    Admin Control Center
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onSignOut();
                    }}
                    className="flex items-center justify-center gap-2 w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out Account
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setShowCustomForm(false);
                    setShowLoginModal(true);
                  }}
                  className="flex items-center justify-center gap-2 w-full bg-brand-gold/10 hover:bg-brand-gold/20 text-brand-gold-bright border border-brand-gold/25 py-2.5 rounded-lg text-sm font-semibold tracking-wider transition-colors"
                >
                  <GoogleIcon className="w-4 h-4" />
                  Sign In Options
                </button>
              )}

              <a
                href="https://youtube.com/@techtonicai7947"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-red-600/15 hover:bg-red-600/25 text-red-500 border border-red-500/30 py-3 rounded-lg text-base font-semibold tracking-wider transition-all"
              >
                <YoutubeIcon className="w-5 h-5 fill-red-500" />
                Subscribe to Channel
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Google "Choose an Account" Replicating Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          
          <div className="w-full max-w-[840px] bg-[#1f1f1f] border border-zinc-700/60 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[460px] text-zinc-300 relative select-none">
            
            {/* Top Close Button */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute right-5 top-5 p-1.5 rounded-xl bg-zinc-800/50 hover:bg-zinc-700/80 text-zinc-400 hover:text-white transition-all cursor-pointer z-10 border border-zinc-700/20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Left Side: Brand Logo and Title */}
            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-700/40 bg-[#171717]">
              
              {/* Google Sign in with logo header */}
              <div className="flex items-center gap-3">
                <GoogleIcon className="w-5 h-5" />
                <span className="text-sm font-medium text-zinc-100 tracking-wide">Sign in with Google</span>
              </div>

              {/* Channel logo and title */}
              <div className="my-10 space-y-4">
                <img
                  src="/logo.png"
                  alt="TechTonic AI Logo"
                  className="w-14 h-14 object-contain rounded-xl border border-brand-gold/30 bg-[#232E4C] p-2"
                />
                <h3 className="text-2xl sm:text-3xl font-normal text-zinc-100 leading-tight">
                  Choose an account
                </h3>
                <p className="text-zinc-400 text-sm">
                  to continue to <span className="text-brand-gold-bright font-semibold">TechTonic AI</span>
                </p>
              </div>

              {/* Bottom text */}
              <div className="text-[11px] text-zinc-500 leading-relaxed">
                Before using this app, you can review TechTonic AI's <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a> and <a href="#" className="text-blue-400 hover:underline">Terms of Service</a>.
              </div>

            </div>

            {/* Right Side: Accounts List or Custom Form */}
            <div className="md:w-1/2 p-8 sm:p-12 flex flex-col justify-center bg-[#1e1e1e]">
              
              {!showCustomForm ? (
                <div className="space-y-4 w-full">
                  
                  {/* Google Accounts parsed from user's screen */}
                  <div className="divide-y divide-zinc-700/45 border-b border-zinc-700/45">
                    {googleAccounts.map((account) => (
                      <button
                        key={account.email}
                        onClick={() => handleAccountSelect(account)}
                        className="flex items-center gap-4 w-full text-left py-3.5 px-2 hover:bg-zinc-800/45 transition-colors duration-200 cursor-pointer rounded-xl"
                      >
                        {/* Circular Initials Avatar */}
                        <div className={`w-9 h-9 rounded-full ${account.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md`}>
                          {account.initial}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-sm font-semibold text-zinc-100 truncate">{account.name}</div>
                          <div className="text-xs text-zinc-400 truncate mt-0.5">{account.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Option: Use another account */}
                  <button
                    onClick={() => setShowCustomForm(true)}
                    className="flex items-center gap-4 w-full text-left py-3.5 px-2 hover:bg-zinc-800/45 transition-colors duration-200 cursor-pointer rounded-xl"
                  >
                    <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-zinc-400">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <div className="text-sm font-semibold text-zinc-200">
                      Use another account
                    </div>
                  </button>

                </div>
              ) : (
                /* Custom Email Form */
                <form onSubmit={handleCustomSubmit} className="space-y-5 w-full">
                  <button
                    type="button"
                    onClick={() => setShowCustomForm(false)}
                    className="inline-flex items-center gap-1.5 text-xs text-brand-gold-bright hover:text-brand-gold font-semibold transition-colors cursor-pointer mb-2"
                  >
                    <ArrowLeft className="w-4.5 h-4.5" />
                    Back to Accounts list
                  </button>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">Gmail Address *</label>
                    <input
                      type="email"
                      required
                      value={customEmail}
                      onChange={(e) => setCustomEmail(e.target.value)}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-4.5 py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-xl focus:border-brand-gold focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">Display Name (Optional)</label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. Kumar Shanu"
                      className="w-full px-4.5 py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-xl focus:border-brand-gold focus:outline-none text-sm font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-gold-bright text-brand-navy-dark font-bold py-3.5 rounded-xl text-xs tracking-widest transition-all cursor-pointer"
                  >
                    <GoogleIcon className="w-4 h-4 fill-brand-navy-dark" />
                    SIGN IN INSTANTLY
                  </button>
                </form>
              )}

            </div>

          </div>
          
        </div>
      )}
    </>
  );
};
