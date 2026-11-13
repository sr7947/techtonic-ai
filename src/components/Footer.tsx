import React from 'react';
import { ArrowUpRight, Trophy, Flame, Cpu, Newspaper, Bot } from 'lucide-react';

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .503 6.163C0 8.037 0 12 0 12s0 3.963.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.963 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-navy-dark border-t border-brand-gold/10 pt-16 pb-8 z-10">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/wenzdaylab-logo.svg" 
                alt="WenzdayLab Logo" 
                className="w-10 h-10 object-contain rounded-xl border border-brand-gold/30 shadow-md"
              />
              <span className="font-display text-lg font-bold tracking-widest text-brand-gold">
                WENZDAYLAB
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              An AI intelligence and benchmarking platform delivering verified updates from 43 official sources, live model hubs, and unbiased benchmark rankings across LLM, Image, Video, and Speech.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://youtube.com/@techtonicai7947" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-brand-navy-deep/80 hover:bg-brand-gold/20 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/15 transition-all duration-200" 
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
              </a>
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-brand-navy-deep/80 hover:bg-brand-gold/20 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/15 transition-all duration-200" 
                aria-label="X (Twitter)"
              >
                <XIcon className="w-4 h-4 fill-current" />
              </a>
              <a 
                href="https://github.com/sr7947/techtonic-ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-xl bg-brand-navy-deep/80 hover:bg-brand-gold/20 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/15 transition-all duration-200" 
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Dedicated 4 Tabs Navigation */}
          <div>
            <h4 className="font-display text-slate-200 text-xs font-bold tracking-wider uppercase mb-4">
              Explore Tabs
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <a href="/" className="text-slate-400 hover:text-brand-gold-bright transition-colors flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Latest Updates</span>
                </a>
              </li>
              <li>
                <a href="/trending" className="text-slate-400 hover:text-brand-gold-bright transition-colors flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Trending X Posts</span>
                </a>
              </li>
              <li>
                <a href="/models-hub" className="text-slate-400 hover:text-brand-gold-bright transition-colors flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Model Hubs (Hugging Face)</span>
                </a>
              </li>
              <li>
                <a href="/model-rankings" className="text-slate-400 hover:text-brand-gold-bright transition-colors flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  <span>Model Rankings (Artificial Analysis)</span>
                </a>
              </li>
              <li>
                <a href="/ai-agents" className="text-slate-400 hover:text-brand-gold-bright transition-colors flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Agents (Open Source & Cloud)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Benchmark Sources */}
          <div>
            <h4 className="font-display text-slate-200 text-xs font-bold tracking-wider uppercase mb-4">
              Benchmark Sources
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="https://artificialanalysis.ai/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold flex items-center gap-1">
                  <span>Artificial Analysis</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/models" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold flex items-center gap-1">
                  <span>Hugging Face Hub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://openai.com/news/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold flex items-center gap-1">
                  <span>OpenAI Research</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://deepmind.google/blog/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-gold flex items-center gap-1">
                  <span>Google DeepMind</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-brand-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} WenzdayLab. All rights reserved.
          </div>
          <button
            onClick={handleScrollToTop}
            className="hover:text-brand-gold transition-colors font-semibold"
          >
            Back to Top ↑
          </button>
        </div>

      </div>
    </footer>
  );
};
