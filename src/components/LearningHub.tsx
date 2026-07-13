import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LEARNING_RESOURCES } from '../data/content';
import { BookOpen, Bookmark, ArrowUpRight, ShieldCheck } from 'lucide-react';

// Import All Company Hub JSON files to dynamically aggregate ecosystem data
import googleHubData from '../data/googleHubData.json';
import openaiHubData from '../data/openaiHubData.json';
import anthropicHubData from '../data/anthropicHubData.json';
import metaHubData from '../data/metaHubData.json';
import microsoftHubData from '../data/microsoftHubData.json';
import nvidiaHubData from '../data/nvidiaHubData.json';
import awsHubData from '../data/awsHubData.json';
import appleHubData from '../data/appleHubData.json';
import xaiHubData from '../data/xaiHubData.json';
import mistralHubData from '../data/mistralHubData.json';
import ibmHubData from '../data/ibmHubData.json';
import cohereHubData from '../data/cohereHubData.json';
import huggingfaceHubData from '../data/huggingfaceHubData.json';

interface LearningHubProps {
  resources?: typeof LEARNING_RESOURCES;
}

const allHubs = [
  googleHubData,
  openaiHubData,
  anthropicHubData,
  metaHubData,
  microsoftHubData,
  nvidiaHubData,
  awsHubData,
  appleHubData,
  xaiHubData,
  mistralHubData,
  ibmHubData,
  cohereHubData,
  huggingfaceHubData
];

export const LearningHub: React.FC<LearningHubProps> = ({ resources = LEARNING_RESOURCES }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL ECOSYSTEM');
  const [selectedLeader, setSelectedLeader] = useState<string>('All Leaders');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categories = [
    'ALL ECOSYSTEM',
    'MODEL FAMILIES',
    'PLATFORMS',
    'HARDWARE & SYSTEMS',
    'TECHNOLOGIES',
    'AI DEVELOPERS'
  ];

  const leaders = [
    'All Leaders',
    'Google',
    'OpenAI',
    'Anthropic',
    'Meta',
    'Microsoft',
    'NVIDIA',
    'AWS',
    'Apple',
    'xAI',
    'Mistral AI',
    'IBM',
    'Cohere',
    'Hugging Face'
  ];

  // Dynamically compile and aggregate ecosystem resources from all hub datasets
  const aggregatedResources = useMemo(() => {
    const list: any[] = [];

    allHubs.forEach(hub => {
      const compName = hub.company.name;

      // 1. Model Families (llms)
      if (hub.llms && Array.isArray(hub.llms)) {
        hub.llms.forEach((item: any) => {
          list.push({
            id: `llm-${item.id}`,
            company: compName,
            toolName: item.name,
            description: item.description,
            useCase: item.primary_use_cases ? item.primary_use_cases.join(', ') : item.short_tagline,
            category: 'MODEL FAMILIES',
            badges: item.tier ? [item.tier, item.modality, item.type].filter(Boolean) : [item.modality, item.type].filter(Boolean),
            docsUrl: item.docs_url,
            learnUrl: item.docs_url
          });
        });
      }

      // 2. Platforms
      if (hub.platforms && Array.isArray(hub.platforms)) {
        hub.platforms.forEach((item: any) => {
          list.push({
            id: `platform-${item.id}`,
            company: compName,
            toolName: item.name,
            description: item.description,
            useCase: item.ideal_for ? item.ideal_for.join(', ') : item.short_tagline,
            category: 'PLATFORMS',
            badges: item.badges || [],
            docsUrl: item.url,
            learnUrl: item.url
          });
        });
      }

      // 3. Hardware & Systems
      if ((hub as any).hardware && Array.isArray((hub as any).hardware)) {
        (hub as any).hardware.forEach((item: any) => {
          list.push({
            id: `hardware-${item.id}`,
            company: compName,
            toolName: item.name,
            description: item.description,
            useCase: item.ideal_for ? item.ideal_for.join(', ') : item.short_tagline,
            category: 'HARDWARE & SYSTEMS',
            badges: item.badges || [],
            docsUrl: item.url,
            learnUrl: item.url
          });
        });
      }

      // 4. Technologies
      if (hub.technologies && Array.isArray(hub.technologies)) {
        hub.technologies.forEach((item: any) => {
          list.push({
            id: `tech-${item.id}`,
            company: compName,
            toolName: item.name,
            description: item.description,
            useCase: item.short_tagline || (item.related_platform_ids ? item.related_platform_ids.join(', ') : ''),
            category: 'TECHNOLOGIES',
            badges: item.type ? [item.type] : [],
            docsUrl: item.url,
            learnUrl: item.url
          });
        });
      }

      // 5. Learning Hub (learning)
      if (hub.learning && Array.isArray(hub.learning)) {
        hub.learning.forEach((item: any) => {
          list.push({
            id: `learn-${item.id}`,
            company: compName,
            toolName: item.name,
            description: item.description,
            useCase: `${item.focus_areas ? item.focus_areas.join(', ') : ''} (Level: ${item.level || 'All'})`,
            category: 'AI DEVELOPERS',
            badges: item.type ? [item.type] : [],
            docsUrl: item.url,
            learnUrl: item.url
          });
        });
      }
    });

    // 6. Blend custom admin panel resources to maintain admin dashboard compatibility
    resources.forEach(res => {
      // Map old categories to new ecosystem standard categories
      let newCat = 'TECHNOLOGIES';
      if (res.category === 'API & Integration') newCat = 'PLATFORMS';
      else if (res.category === 'Developer Studio') newCat = 'PLATFORMS';
      else if (res.category === 'Models & Prompting') newCat = 'MODEL FAMILIES';
      else if (res.category === 'Frameworks') newCat = 'TECHNOLOGIES';
      else if (res.category === 'Infrastructure') newCat = 'HARDWARE & SYSTEMS';

      // Avoid duplication of tools
      if (!list.some(existing => existing.toolName.toLowerCase() === res.toolName.toLowerCase())) {
        list.push({
          id: res.id,
          company: res.company,
          toolName: res.toolName,
          description: res.description,
          useCase: res.useCase,
          category: newCat,
          badges: [],
          docsUrl: res.docsUrl,
          learnUrl: res.learnUrl
        });
      }
    });

    return list;
  }, [resources]);

  // Helper matching company names against leader filters
  const matchCompany = (resourceCompany: string, selectedLeader: string) => {
    if (selectedLeader === 'All Leaders') return true;
    const normalizedResource = resourceCompany.toLowerCase();
    const normalizedLeader = selectedLeader.toLowerCase();

    if (normalizedLeader === 'google') return normalizedResource.includes('google');
    if (normalizedLeader === 'openai') return normalizedResource.includes('openai');
    if (normalizedLeader === 'anthropic') return normalizedResource.includes('anthropic');
    if (normalizedLeader === 'meta') return normalizedResource.includes('meta');
    if (normalizedLeader === 'microsoft') return normalizedResource.includes('microsoft');
    if (normalizedLeader === 'nvidia') return normalizedResource.includes('nvidia');
    if (normalizedLeader === 'aws') return normalizedResource.includes('aws') || normalizedResource.includes('amazon');
    if (normalizedLeader === 'apple') return normalizedResource.includes('apple');
    if (normalizedLeader === 'xai') return normalizedResource.includes('xai');
    if (normalizedLeader === 'mistral ai') return normalizedResource.includes('mistral');
    if (normalizedLeader === 'ibm') return normalizedResource.includes('ibm');
    if (normalizedLeader === 'cohere') return normalizedResource.includes('cohere');
    if (normalizedLeader === 'hugging face') return normalizedResource.includes('hugging');

    return normalizedResource.includes(normalizedLeader);
  };

  // Filter resources based on selected category and selected AI Leader
  const filteredResources = useMemo(() => {
    return aggregatedResources.filter(resource => {
      const matchesCategory = activeCategory === 'ALL ECOSYSTEM' || resource.category === activeCategory;
      const matchesLeader = matchCompany(resource.company, selectedLeader);
      return matchesCategory && matchesLeader;
    });
  }, [aggregatedResources, activeCategory, selectedLeader]);

  // Reset pagination visible count when filters change
  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, selectedLeader]);

  const resourcesToShow = useMemo(() => {
    return filteredResources.slice(0, visibleCount);
  }, [filteredResources, visibleCount]);

  return (
    <section id="learning" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            AI <span className="gold-gradient-text">Developers</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Curated directories connecting you directly to official documentation, SDK cookbooks, prompting standards, and model deploy configurations.
          </p>
        </div>

        {/* Filter Navigation - Ecosystem Categories */}
        <div className="flex flex-wrap gap-2.5 pb-6 border-b border-brand-gold/10 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 focus:outline-none cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-gold text-brand-navy-dark font-bold shadow-[0_0_15px_rgba(189,154,118,0.35)]'
                  : 'bg-brand-navy-light/15 hover:bg-brand-navy-light/40 text-slate-300 border border-brand-gold/10 hover:border-brand-gold/35'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Leader Filter Badges */}
        <div className="flex flex-wrap gap-2 mb-12 bg-brand-navy-deep/20 p-4 rounded-2xl border border-brand-gold/5">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 self-center mr-2">
            AI Leaders:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {leaders.map((leader) => (
              <button
                key={leader}
                onClick={() => setSelectedLeader(leader)}
                className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                  selectedLeader === leader
                    ? 'bg-brand-gold/20 text-brand-gold-bright border-brand-gold/50 shadow-[0_0_10px_rgba(189,154,118,0.1)]'
                    : 'bg-brand-navy-light/5 hover:bg-brand-navy-light/20 text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                {leader}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence mode="popLayout">
            {resourcesToShow.map((resource, index) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.02 }}
                className="group p-6 rounded-2xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top line: Brand and Category */}
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-brand-gold">
                      {resource.company}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] md:text-[11px] font-semibold bg-brand-navy-light/30 border border-brand-gold/10 text-slate-300">
                      {resource.category}
                    </span>
                  </div>

                  {/* Tool Name */}
                  <h3 className="font-serif text-lg md:text-xl font-bold tracking-wide text-slate-100 group-hover:text-brand-gold-bright transition-colors">
                    {resource.toolName}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {resource.description}
                  </p>

                  {/* Tags / Badges in the Card */}
                  {resource.badges && resource.badges.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {resource.badges.map((badge: string) => (
                        <span 
                          key={badge} 
                          className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-brand-navy-light/50 border border-brand-gold/5 text-slate-300 uppercase tracking-wider"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Use case info */}
                  <div className="bg-brand-navy-deep/45 p-3 rounded-lg border border-brand-gold/5 flex gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-slate-300 block mb-0.5">Use Case Profile</span>
                      <span className="text-slate-400 leading-normal">{resource.useCase}</span>
                    </div>
                  </div>
                </div>

                {/* Documentation Links */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-brand-gold/5">
                  <a
                    href={resource.docsUrl || '#'}
                    target={resource.docsUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-brand-gold-bright bg-brand-navy-light/10 hover:bg-brand-navy-light/35 border border-brand-gold/10 hover:border-brand-gold/45 transition-all duration-300"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Official Docs
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                  <a
                    href={resource.learnUrl || '#'}
                    target={resource.learnUrl ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-semibold text-brand-gold-bright hover:text-brand-navy-dark bg-brand-gold/5 hover:bg-brand-gold border border-brand-gold/20 hover:border-brand-gold transition-all duration-300"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    Learning Guide
                    <ArrowUpRight className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More Button */}
        {filteredResources.length > visibleCount && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-6 py-3 rounded-xl bg-brand-navy-light/30 hover:bg-brand-gold text-slate-300 hover:text-brand-navy-dark border border-brand-gold/20 hover:border-brand-gold text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer shadow-md"
            >
              Load More Curated Resources
            </button>
          </div>
        )}

        {filteredResources.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-serif text-lg">No ecosystem resources found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};
