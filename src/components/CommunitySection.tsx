import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Bell, CheckCircle2, ChevronRight } from 'lucide-react';

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .503 6.163C0 8.037 0 12 0 12s0 3.963.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.963 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const CommunitySection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="subscribe" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      
      {/* Decorative Orbs */}
      <div className="glow-orb top-1/4 right-0" style={{ transform: 'translateX(30%)' }} />
      <div className="glow-orb bottom-10 left-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl p-8 md:p-12 glass-panel border border-brand-gold/15 relative overflow-hidden bg-gradient-to-br from-brand-navy-deep/60 via-brand-navy/35 to-brand-navy-deep/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          
          {/* Ambient lighting line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Info */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-gold/5 border border-brand-gold/15">
                <Bell className="w-4 h-4 text-brand-gold" />
                <span className="text-[10px] md:text-xs uppercase tracking-widest text-brand-gold-bright font-bold">
                  TechTonic Community Hub
                </span>
              </div>
              
              <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-wider text-slate-100 uppercase leading-snug">
                Join the <span className="gold-gradient-text">Future of Tech</span>
              </h2>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Connect with 10k+ developers, learners, and tech builders. Subscribe to our YouTube channel and get our weekly curation of GitHub repositories, documentation summaries, and model benchmark summaries.
              </p>

              <div className="flex justify-center lg:justify-start gap-4">
                <a
                  href="https://youtube.com/@techtonicai7947"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl text-xs md:text-sm font-bold tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.25)] hover:scale-105 active:scale-95"
                >
                  <YoutubeIcon className="w-4 h-4 fill-white animate-pulse" />
                  SUBSCRIBE ON YOUTUBE
                </a>
              </div>
            </div>

            {/* Right Col: Newsletter Form */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-brand-navy-dark/65 border border-brand-gold/10">
              
              {!subscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2 text-center lg:text-left">
                    <h3 className="font-serif text-slate-200 text-base md:text-lg font-semibold tracking-wide uppercase">
                      Weekly Tech Newsletter
                    </h3>
                    <p className="text-slate-400 text-xs">
                      No spam, just official code recipes, model configurations, and documentation digests.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full bg-brand-navy-deep/80 text-slate-100 placeholder-slate-500 pl-12 pr-4 py-3.5 rounded-xl border border-brand-gold/15 focus:border-brand-gold focus:outline-none focus:ring-1 focus:ring-brand-gold text-sm tracking-wide transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 bg-gradient-to-r from-brand-gold to-brand-gold-dark hover:from-brand-gold-bright hover:to-brand-gold text-brand-navy-dark font-bold py-3.5 rounded-xl text-xs tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(189,154,118,0.15)] active:scale-[0.98] focus:outline-none"
                    >
                      SUBSCRIBE TO DIGEST
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-slate-200 text-lg font-bold uppercase">Success!</h3>
                    <p className="text-slate-400 text-xs max-w-xs mx-auto">
                      Thank you for joining. Your email has been added to our weekly tech briefing newsletter.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubscribed(false)}
                    className="text-xs text-brand-gold-bright hover:text-brand-gold underline font-semibold focus:outline-none"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              )}

            </div>

          </div>

        </div>
      </div>
      
    </section>
  );
};
