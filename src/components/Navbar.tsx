import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Settings, LogOut, ChevronDown, Trophy, Flame, Cpu, Newspaper } from 'lucide-react';
import { HallmarkThemeSwitcher } from './HallmarkThemeSwitcher';

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
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Exactly 4 Navigation Tabs
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
    }
  ];

  const isTabActive = (tabPath: string) => {
    if (tabPath === '/') {
      return currentPath === '/' || currentPath === '/latest-updates';
    }
    return currentPath === tabPath;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-brand-navy-dark/95 backdrop-blur-xl border-b border-brand-gold/20 py-3 shadow-2xl' 
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo & Title */}
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 group focus:outline-none rounded-xl p-1 text-left cursor-pointer"
            >
              <img 
                src="/wenzdaylab-logo.svg" 
                alt="WenzdayLab Logo" 
                className="w-10 h-10 object-contain rounded-xl border border-brand-gold/30 shadow-md group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="font-display text-lg sm:text-xl font-extrabold tracking-wider text-slate-100 group-hover:text-brand-gold transition-colors">
                  WENZDAY<span className="gold-gradient-text">LAB</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-slate-400 font-semibold group-hover:text-brand-gold/80 transition-colors">
                  Frontier Intelligence
                </span>
              </div>
            </button>

            {/* Desktop Navigation - EXACTLY 4 TABS */}
            <nav className="hidden md:flex items-center gap-1.5 bg-brand-navy-deep/80 p-1.5 rounded-2xl border border-brand-gold/20 backdrop-blur-md shadow-2xl">
              {NAV_TABS.map((tab) => {
                const active = isTabActive(tab.path);
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
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
                    <span className="relative z-10 flex items-center gap-2">
                      {tab.icon}
                      <span>{tab.label}</span>
                    </span>
                  </motion.button>
                );
              })}
            </nav>

            {/* Right Side Actions: Theme Switcher, Admin & User Auth */}
            <div className="hidden sm:flex items-center gap-2.5">
              
              {/* Hallmark Theme Switcher */}
              <HallmarkThemeSwitcher />

              {/* Quick Admin Access Button (strictly visible only when signed in) */}
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
            <div className="flex md:hidden items-center gap-2">
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
          <div className="md:hidden bg-brand-navy-dark/95 border-b border-brand-gold/20 p-4 backdrop-blur-2xl animate-in slide-in-from-top duration-250">
            <div className="flex flex-col gap-2">
              <div className="py-2 border-b border-white/10 mb-1 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Hallmark Theme</span>
                <HallmarkThemeSwitcher />
              </div>
              {NAV_TABS.map((tab) => {
                const active = isTabActive(tab.path);
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
              <img src="/wenzdaylab-logo.svg" alt="WenzdayLab" className="w-12 h-12 mx-auto rounded-xl border border-brand-gold/30" />
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
