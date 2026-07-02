import React from 'react';
import { ArrowUpRight } from 'lucide-react';

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

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z" />
  </svg>
);

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-brand-navy-dark border-t border-brand-gold/10 pt-16 pb-8 z-10">
      {/* Background glow lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="TechTonic AI Logo" 
                className="w-10 h-10 object-contain rounded-md border border-brand-gold/20"
              />
              <span className="font-serif text-lg font-bold tracking-widest text-brand-gold">
                TECHTONIC AI
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An immersive editorial and learning platform bridging the gap between developers, AI builders, and frontier technologies. We cover the latest models, prompting architectures, agentic pipelines, and local AI orchestration.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://youtube.com/@techtonicai7947" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2.5 rounded-lg bg-brand-navy-light/20 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/10 transition-all duration-300" 
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-brand-navy-light/20 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/10 transition-all duration-300" aria-label="X (Twitter)">
                <XIcon className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-brand-navy-light/20 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/10 transition-all duration-300" aria-label="GitHub">
                <GithubIcon className="w-4 h-4 fill-current" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-brand-navy-light/20 hover:bg-brand-gold/15 text-slate-400 hover:text-brand-gold-bright border border-brand-gold/10 transition-all duration-300" aria-label="Discord">
                <DiscordIcon className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-serif text-slate-200 text-sm font-semibold tracking-wider uppercase mb-5">
              Platform
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#updates" className="text-slate-400 hover:text-brand-gold-bright transition-colors">Latest Updates</a>
              </li>
              <li>
                <a href="#leaders" className="text-slate-400 hover:text-brand-gold-bright transition-colors">AI Leaders</a>
              </li>
              <li>
                <a href="#learning" className="text-slate-400 hover:text-brand-gold-bright transition-colors">Learning Hub</a>
              </li>
              <li>
                <a href="#videos" className="text-slate-400 hover:text-brand-gold-bright transition-colors">Featured Videos</a>
              </li>
              <li>
                <a href="#trending" className="text-slate-400 hover:text-brand-gold-bright transition-colors">Trending Topics</a>
              </li>
            </ul>
          </div>

          {/* AI Leaders */}
          <div>
            <h4 className="font-serif text-slate-200 text-sm font-semibold tracking-wider uppercase mb-5">
              AI Leaders
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://ai.google" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">Google <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">OpenAI <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://www.anthropic.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">Anthropic <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://llama.meta.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">Meta AI <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://developer.nvidia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">NVIDIA <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
            </ul>
          </div>

          {/* Dev Resources */}
          <div>
            <h4 className="font-serif text-slate-200 text-sm font-semibold tracking-wider uppercase mb-5">
              Official Docs
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://modelcontextprotocol.org" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">MCP Protocol <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">Claude Docs <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">Gemini API Docs <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://platform.openai.com/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">OpenAI API Docs <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
              <li>
                <a href="https://pytorch.org/docs" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-brand-gold-bright transition-colors">PyTorch Docs <ArrowUpRight className="w-3 h-3 opacity-50" /></a>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-brand-gold/10 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-500 text-xs tracking-wider">
            &copy; {currentYear} TechTonic AI. Let's Explore Future Together. All rights reserved.
          </div>
          <div className="flex gap-6 text-xs tracking-wider">
            <a href="#" className="text-slate-500 hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-brand-gold transition-colors">Terms of Service</a>
            <button 
              onClick={handleScrollToTop}
              className="text-brand-gold hover:text-brand-gold-bright font-medium flex items-center gap-1 focus:outline-none"
            >
              Back to Top &uarr;
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
