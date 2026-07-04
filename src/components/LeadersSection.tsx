import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEADER_PROFILES } from '../data/leadersData';
import type { AILeaderData } from '../data/leadersData';
import { ExternalLink, Lightbulb, Link2, ChevronDown, Building, Cpu, Globe, Code } from 'lucide-react';

interface LeadersSectionProps {
  leaders?: AILeaderData[];
}

export const LeadersSection: React.FC<LeadersSectionProps> = ({
  leaders = LEADER_PROFILES
}) => {
  const [selectedLeaderId, setSelectedLeaderId] = useState<string>('google');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const activeLeader = leaders.find((l) => l.id === selectedLeaderId) || leaders[0];

  return (
    <section id="leaders" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-deep/80">
      
      {/* Decorative ambient elements */}
      <div className="glow-orb top-1/3 right-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase">
            <Building className="w-3.5 h-3.5 animate-pulse" />
            AI Directories
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            Major AI <span className="gold-gradient-text">Industry Leaders</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            A comprehensive profile of the frontier organizations driving research, deploying foundation models, and building global compute infrastructure.
          </p>
        </div>

        {/* Dropdown Selector */}
        <div className="mb-12 relative flex flex-col items-center md:items-start select-none">
          <label className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-3 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-brand-gold" />
            Select an AI Leader
          </label>
          
          <div className="relative w-72">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between bg-brand-navy-light/10 border border-brand-gold/20 hover:border-brand-gold/50 rounded-2xl px-5 py-3.5 text-slate-200 text-sm font-semibold tracking-wide transition-all duration-300 outline-none backdrop-blur-md cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${activeLeader.logoColor} shadow-sm`} />
                <span>{activeLeader.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Card */}
            {dropdownOpen && (
              <div className="absolute left-0 mt-2.5 w-full rounded-2xl glass-panel border border-brand-gold/20 bg-brand-navy-deep p-2 shadow-2xl z-40 max-h-72 overflow-y-auto">
                {leaders.map((leader) => (
                  <button
                    key={leader.id}
                    onClick={() => {
                      setSelectedLeaderId(leader.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-4 py-3 text-xs font-semibold rounded-xl text-left transition-all duration-200 cursor-pointer ${
                      selectedLeaderId === leader.id
                        ? 'bg-brand-gold text-brand-navy-dark'
                        : 'text-slate-300 hover:bg-brand-navy-light/20 hover:text-slate-100'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${selectedLeaderId === leader.id ? 'bg-brand-navy-dark' : 'bg-gradient-to-r ' + leader.logoColor}`} />
                    <span>{leader.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Structured Info Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLeader.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="rounded-3xl p-8 md:p-10 glass-panel border border-brand-gold/15 relative overflow-hidden bg-gradient-to-br from-brand-navy-deep/60 via-brand-navy/35 to-brand-navy-deep/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Top brand color band */}
            <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${activeLeader.logoColor}`} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
              
              {/* Left Column: Overview & Platforms */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block mb-2">Company Overview</span>
                  <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-100 leading-snug">
                    {activeLeader.name}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mt-4">
                    {activeLeader.overview}
                  </p>
                </div>

                {/* Core platforms / models */}
                <div className="space-y-3">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Core Platforms & Flagship Models</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeLeader.corePlatforms.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center gap-3 p-3 rounded-xl bg-brand-navy-light/10 border border-brand-gold/10 text-xs text-slate-300 font-semibold"
                      >
                        <Cpu className="w-4 h-4 text-brand-gold flex-shrink-0" />
                        <span>{platform}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Site & Technical Links */}
              <div className="lg:col-span-4 space-y-6 border-t lg:border-t-0 lg:border-l border-brand-gold/10 pt-6 lg:pt-0 lg:pl-8">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Official Channels</span>
                
                <div className="flex flex-col gap-3 text-xs font-semibold">
                  <a
                    href={activeLeader.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-light/15 hover:bg-brand-navy-light/25 border border-brand-gold/10 hover:border-brand-gold/30 text-slate-300 hover:text-brand-gold-bright transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Globe className="w-4 h-4 text-brand-gold" />
                      <span>Official AI Website</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>

                  <a
                    href={activeLeader.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-light/15 hover:bg-brand-navy-light/25 border border-brand-gold/10 hover:border-brand-gold/30 text-slate-300 hover:text-brand-gold-bright transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Link2 className="w-4 h-4 text-brand-gold" />
                      <span>Developer Docs Portal</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>

                  <a
                    href={activeLeader.blogUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-light/15 hover:bg-brand-navy-light/25 border border-brand-gold/10 hover:border-brand-gold/30 text-slate-300 hover:text-brand-gold-bright transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Lightbulb className="w-4 h-4 text-brand-gold" />
                      <span>Technical Blog & Newsroom</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>

                  <a
                    href={activeLeader.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-light/15 hover:bg-brand-navy-light/25 border border-brand-gold/10 hover:border-brand-gold/30 text-slate-300 hover:text-brand-gold-bright transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <Code className="w-4 h-4 text-brand-gold" />
                      <span>GitHub Organization</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* Micro-UX Navigation Helpers */}
        <div className="mt-12 flex items-center justify-between border-t border-brand-gold/10 pt-8 text-[11px] sm:text-xs">
          <a
            href="#home"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-navy-light/10 border border-brand-gold/10 hover:border-brand-gold/40 text-slate-400 hover:text-brand-gold-bright transition-all font-semibold tracking-wider uppercase cursor-pointer"
          >
            ↑ Back to Top
          </a>
          <a
            href="#learning"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/25 hover:bg-brand-gold hover:text-brand-navy-dark text-brand-gold-bright hover:shadow-[0_0_15px_rgba(189,154,118,0.25)] transition-all font-bold tracking-wider uppercase cursor-pointer"
          >
            Jump to Learning Hub ↓
          </a>
        </div>
      </div>
    </section>
  );
};
export default LeadersSection;
