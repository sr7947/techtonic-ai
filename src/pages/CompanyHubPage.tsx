import React, { useState } from 'react';
import googleHubData from '../data/googleHubData.json';
import openaiHubData from '../data/openaiHubData.json';
import anthropicHubData from '../data/anthropicHubData.json';
import metaHubData from '../data/metaHubData.json';
import { 
  Building, 
  ExternalLink, 
  Globe, 
  Code, 
  ArrowLeft, 
  Cpu, 
  Layers, 
  GraduationCap, 
  Database, 
  FileText, 
  ArrowUpRight
} from 'lucide-react';

interface CompanyHubPageProps {
  companyId: string;
  navigate: (href: string) => void;
}

export const CompanyHubPage: React.FC<CompanyHubPageProps> = ({ companyId, navigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'llms' | 'platforms' | 'learning' | 'technologies'>('all');

  const hubData = companyId === 'openai' 
    ? openaiHubData 
    : companyId === 'anthropic-claude' 
      ? anthropicHubData 
      : companyId === 'meta-llama'
        ? metaHubData
        : googleHubData;
  const { company, llms, platforms, learning, technologies, docsAndNews } = hubData;

  const tabItems = [
    { id: 'all', name: 'All Ecosystem' },
    { id: 'llms', name: 'Model Families' },
    { id: 'platforms', name: 'Platforms' },
    { id: 'technologies', name: 'Technologies' },
    { id: 'learning', name: 'Learning Hub' }
  ];

  return (
    <div className="min-h-screen bg-brand-navy-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Dynamic Background Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-brand-navy-dark to-brand-navy-dark pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-brand-gold-bright transition-all cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to AI Leaders
        </button>

        {/* Hero Section */}
        <div className="relative rounded-3xl p-8 md:p-12 border border-brand-gold/15 bg-gradient-to-r from-[#030712]/95 to-[#0b1329]/95 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />
          
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[10px] font-bold tracking-widest uppercase">
              <Building className="w-3.5 h-3.5" />
              Enterprise Hub
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-slate-100 uppercase tracking-wide leading-tight">
              {company.name}
            </h1>
            <p className="text-brand-gold-bright font-medium text-sm sm:text-lg tracking-wide">
              {company.tagline}
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              {company.overview}
            </p>

            {/* Official Sites */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={company.official_site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-slate-100 text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                {company.name} Official Website
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              {(() => {
                const gitHubDoc = docsAndNews.find(item => item.type === 'github-org');
                if (!gitHubDoc) return null;
                return (
                  <a
                    href={gitHubDoc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-slate-700 hover:border-slate-600 text-slate-300 hover:text-slate-100 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Code className="w-4 h-4" />
                    {gitHubDoc.name}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                );
              })()}
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start border-b border-brand-gold/10 pb-6 select-none">
          {tabItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-gold text-brand-navy-dark border-brand-gold shadow-lg shadow-brand-gold/15'
                  : 'bg-brand-navy-deep/40 text-slate-400 border-brand-gold/10 hover:border-brand-gold/30 hover:text-slate-200'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Dynamic Grid Sections */}
        <div className="space-y-16">
          
          {/* LLMs Section */}
          {(activeTab === 'all' || activeTab === 'llms') && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <Cpu className="w-5 h-5 text-brand-gold" />
                {company.name} Model Families
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {llms.map((model) => (
                  <div
                    key={model.id}
                    className="rounded-2xl p-6 border border-brand-gold/10 bg-brand-navy-deep/20 flex flex-col justify-between hover:border-brand-gold/30 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-wider">
                          {model.family}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                          {model.modality}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                        {model.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {model.description}
                      </p>
                      
                      {/* Use Cases */}
                      <div className="space-y-2 pt-2 border-t border-brand-gold/5">
                        <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block">Developer Applications</span>
                        <ul className="space-y-1.5">
                          {model.primary_use_cases.map((uc, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs text-slate-300">
                              <span className="w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                              <span>{uc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <a
                        href={model.docs_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-100 transition-colors"
                      >
                        Explore Documentation
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Platforms Section */}
          {(activeTab === 'all' || activeTab === 'platforms') && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-gold" />
                IDE & Developer Platforms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    className="rounded-2xl p-6 border border-brand-gold/10 bg-brand-navy-deep/20 flex flex-col justify-between hover:border-brand-gold/30 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {platform.badges.map((badge, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-[9px] font-bold uppercase tracking-wider">
                            {badge}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                        {platform.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {platform.description}
                      </p>
                      
                      {/* Ideal For */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-brand-gold/5">
                        {platform.ideal_for.map((ideal, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 text-[9px] font-semibold">
                            #{ideal}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Launch Platform
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies Section */}
          {(activeTab === 'all' || activeTab === 'technologies') && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <Database className="w-5 h-5 text-brand-gold" />
                Integration Kits & Developer APIs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {technologies.map((tech) => (
                  <div
                    key={tech.id}
                    className="rounded-2xl p-6 border border-brand-gold/10 bg-brand-navy-deep/20 flex flex-col justify-between hover:border-brand-gold/30 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold uppercase tracking-wider">
                          {tech.type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {tech.description}
                      </p>
                    </div>
                    
                    <div className="pt-6">
                      <a
                        href={tech.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-100 transition-colors"
                      >
                        Explore Integration
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Learning Section */}
          {(activeTab === 'all' || activeTab === 'learning') && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-brand-gold" />
                Educational Resources & Sandbox Labs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learning.map((learn) => (
                  <div
                    key={learn.id}
                    className="rounded-2xl p-6 border border-brand-gold/10 bg-brand-navy-deep/20 flex flex-col justify-between hover:border-brand-gold/30 transition-all group hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[9px] font-bold uppercase tracking-wider">
                          {learn.type}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[9px] font-bold uppercase tracking-wider">
                          {learn.level}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                        {learn.name}
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {learn.description}
                      </p>
                      
                      {/* Focus Areas */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-brand-gold/5">
                        {learn.focus_areas.map((focus, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 text-[9px] font-semibold">
                            {focus}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6">
                      <a
                        href={learn.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-gold-bright hover:text-brand-gold transition-colors"
                      >
                        Start Learning
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Docs & News Links */}
          {activeTab === 'all' && (
            <div className="space-y-6 pt-6 border-t border-brand-gold/10">
              <h2 className="font-serif text-2xl font-bold tracking-wider text-slate-200 uppercase flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-gold" />
                Official Technical Docs, Channels & Blog Hub
              </h2>
              <div className="flex flex-wrap gap-3">
                {docsAndNews.map((doc) => (
                  <a
                    key={doc.id}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all text-xs font-bold uppercase tracking-wider cursor-pointer ${
                      doc.highlight
                        ? 'bg-blue-600 border-blue-500 hover:bg-blue-500 text-slate-100 shadow-md shadow-blue-500/10'
                        : 'bg-brand-navy-deep/40 border-brand-gold/10 text-slate-300 hover:border-brand-gold/30 hover:text-slate-100'
                    }`}
                  >
                    <span>{doc.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
export default CompanyHubPage;
