import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, ShieldCheck, FolderGit2, Star } from 'lucide-react';
import { GITHUB_REPO_CATEGORIES } from '../data/githubRepos';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export const GithubReposDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  const filterChips = [
    { label: 'All', value: 'All' },
    { label: 'Official Orgs', value: 'Org' },
    { label: 'SDKs', value: 'SDK' },
    { label: 'Samples', value: 'Samples' },
    { label: 'Frameworks', value: 'Framework' },
    { label: 'Learning', value: 'Course' },
    { label: 'Infra / MLOps', value: 'MLOps' }
  ];

  // Helper logic to map filter chip values to multiple database item types
  const matchesFilter = (itemType: string, chipValue: string): boolean => {
    if (chipValue === 'All') return true;
    const lowerType = itemType.toLowerCase();
    const lowerChip = chipValue.toLowerCase();
    
    if (lowerChip === 'framework') {
      return lowerType.includes('framework') || lowerType.includes('orchestration') || lowerType.includes('workflow');
    }
    if (lowerChip === 'course') {
      return lowerType.includes('course') || lowerType.includes('cookbook') || lowerType.includes('bootcamp') || lowerType.includes('deep learning') || lowerType.includes('learning');
    }
    if (lowerChip === 'mlops') {
      return lowerType.includes('mlops') || lowerType.includes('pipelines') || lowerType.includes('vector db') || lowerType.includes('feature store') || lowerType.includes('serving');
    }
    return lowerType.includes(lowerChip);
  };

  // Filter Categories and Items
  const filteredCategories = useMemo(() => {
    return GITHUB_REPO_CATEGORIES.map(category => {
      // Filter items within category
      const matchedItems = category.items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             category.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesChip = matchesFilter(item.type, selectedFilter);
        return matchesSearch && matchesChip;
      });

      return {
        ...category,
        items: matchedItems
      };
    }).filter(category => {
      // Only keep category if category itself matches category dropdown filter AND has matched items
      const matchesCatDropdown = selectedCategoryFilter === 'All' || category.id === selectedCategoryFilter;
      return matchesCatDropdown && category.items.length > 0;
    });
  }, [searchQuery, selectedFilter, selectedCategoryFilter]);

  // Total count of filtered repos
  const totalReposCount = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  // Featured Categories first (Featured logic)
  const sortedCategories = useMemo(() => {
    return [...filteredCategories].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [filteredCategories]);

  return (
    <div className="space-y-12">
      
      {/* Top Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center border-b border-brand-gold/10 pb-6 mb-8 select-none">
        
        {/* Search */}
        <div className="w-full lg:max-w-md relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search GitHub repositories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-navy-light/10 border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/30 rounded-2xl pl-11 pr-5 py-3 text-slate-200 text-sm placeholder:text-slate-500 transition-all outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
          
          {/* Category Dropdown */}
          <div className="flex items-center gap-2 bg-brand-navy-light/10 border border-brand-gold/10 px-3.5 py-2.5 rounded-2xl w-full sm:w-auto">
            <FolderGit2 className="w-4 h-4 text-brand-gold" />
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-transparent text-xs text-slate-300 font-semibold focus:outline-none cursor-pointer w-full sm:w-auto"
            >
              <option value="All" className="bg-brand-navy-deep text-slate-300">All Categories</option>
              {GITHUB_REPO_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-brand-navy-deep text-slate-300">
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          <span className="text-xs text-slate-500 font-bold shrink-0">
            Total Matches: <span className="text-brand-gold-bright">{totalReposCount}</span>
          </span>
        </div>
      </div>

      {/* Quick Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-8 bg-brand-navy-deep/20 p-4 rounded-2xl border border-brand-gold/5">
        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 self-center mr-2">
          Quick Filters:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {filterChips.map(chip => (
            <button
              key={chip.value}
              onClick={() => setSelectedFilter(chip.value)}
              className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                selectedFilter === chip.value
                  ? 'bg-brand-gold/20 text-brand-gold-bright border-brand-gold/50 shadow-[0_0_10px_rgba(189,154,118,0.1)]'
                  : 'bg-brand-navy-light/5 hover:bg-brand-navy-light/20 text-slate-400 hover:text-slate-200 border-transparent'
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories / Repos Display */}
      <div className="space-y-12">
        <AnimatePresence mode="popLayout">
          {sortedCategories.map((category) => {
            const orgItem = category.items.find(i => i.type.toLowerCase() === 'org');
            
            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`p-6 md:p-8 rounded-3xl border transition-all duration-300 ${
                  category.featured
                    ? 'border-brand-gold/30 bg-gradient-to-br from-brand-navy-deep/90 via-brand-navy-light/5 to-brand-navy-deep/90 shadow-[0_15px_40px_rgba(189,154,118,0.06)]'
                    : 'border-brand-gold/10 bg-brand-navy-deep/20 shadow-md'
                }`}
              >
                
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-brand-gold/10 pb-4">
                  <div className="space-y-1.5 text-left">
                    <div className="flex items-center gap-2">
                      {category.featured && <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />}
                      <h3 className="font-display text-lg sm:text-2xl font-bold uppercase tracking-wider text-slate-100">
                        {category.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-brand-gold/10 text-brand-gold-bright border border-brand-gold/20 uppercase tracking-widest shrink-0">
                        {category.items.length} Repos
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-2xl">
                      {category.description}
                    </p>
                  </div>

                  {/* Visit Org CTA if Org exists */}
                  {orgItem && (
                    <a
                      href={orgItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-bold text-brand-gold-bright hover:text-brand-navy-dark bg-brand-gold/5 hover:bg-brand-gold border border-brand-gold/20 hover:border-brand-gold transition-all duration-300 cursor-pointer uppercase tracking-wider"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      Visit Org Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {/* Repos Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-5 rounded-2xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 hover:bg-brand-navy-light/10 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3.5 text-left">
                        <div className="flex justify-between items-start gap-2">
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-brand-navy-light border border-slate-700 text-slate-300 tracking-wider">
                            {repo.type}
                          </span>
                          {repo.official && (
                            <span className="flex items-center gap-0.5 text-emerald-400 text-[9px] font-extrabold uppercase tracking-wider shrink-0">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Official
                            </span>
                          )}
                        </div>

                        <div className="flex items-start gap-2 justify-between">
                          <h4 className="font-display text-sm sm:text-base font-bold text-slate-200 group-hover:text-brand-gold-bright transition-colors truncate">
                            {repo.name}
                          </h4>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-gold transition-colors shrink-0 mt-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>

              </motion.div>
            );
          })}
        </AnimatePresence>

        {sortedCategories.length === 0 && (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-3xl text-slate-500">
            No curated GitHub repositories found matching your filters.
          </div>
        )}
      </div>

    </div>
  );
};
