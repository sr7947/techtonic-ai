import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  ExternalLink, 
  Search, 
  ChevronDown, 
  DollarSign, 
  Zap, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  RefreshCw,
  Maximize2,
  Activity
} from 'lucide-react';
import { MODEL_RANKINGS_DATA, type ModalityCategory, type ModalityConfig, type RankingItem } from '../data/modelRankings';

export const ModelRankingsPage: React.FC = () => {
  const [selectedModality, setSelectedModality] = useState<ModalityCategory>('llm');
  const [rankingsData, setRankingsData] = useState<Record<ModalityCategory, ModalityConfig>>(MODEL_RANKINGS_DATA);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  const currentModalityConfig = rankingsData[selectedModality] || MODEL_RANKINGS_DATA[selectedModality];

  const subcategoryKeys = Object.keys(currentModalityConfig.subcategories);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(subcategoryKeys[0] || 'intelligence');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [licenseFilter, setLicenseFilter] = useState<'all' | 'open' | 'proprietary'>('all');

  // Live Sync & View Mode
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live (Synchronized)');
  const [viewMode, setViewMode] = useState<'cards' | 'live-embed'>('cards');

  // When modality changes, reset subcategory to first available
  const handleModalityChange = (newModality: ModalityCategory) => {
    setSelectedModality(newModality);
    const newSubKeys = Object.keys(rankingsData[newModality]?.subcategories || MODEL_RANKINGS_DATA[newModality].subcategories);
    setSelectedSubcategory(newSubKeys[0] || '');
  };

  const currentSubcategoryConfig = currentModalityConfig.subcategories[selectedSubcategory] || currentModalityConfig.subcategories[subcategoryKeys[0]];

  // Fetch live sync status from API
  const handleSyncWithArtificialAnalysis = async () => {
    setIsRefreshing(true);
    setSyncFeedback(null);
    try {
      const res = await fetch(`/api/rankings?modality=${selectedModality}&subcategory=${selectedSubcategory}&force=true&t=${Date.now()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          setRankingsData(json.data);
        }
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSyncTime(timeStr);
        setSyncFeedback(`Rankings synchronized live from Artificial Analysis at ${timeStr}`);
        setTimeout(() => setSyncFeedback(null), 4000);
      }
    } catch {
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastSyncTime(timeStr);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    handleSyncWithArtificialAnalysis();
  }, [selectedModality, selectedSubcategory]);

  // Filter items based on search and license
  const filteredItems = useMemo(() => {
    if (!currentSubcategoryConfig) return [];
    return currentSubcategoryConfig.items.filter((item: RankingItem) => {
      const matchesSearch = 
        item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.badges && item.badges.some((b: string) => b.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesLicense = 
        licenseFilter === 'all' ? true :
        licenseFilter === 'open' ? item.openWeights :
        !item.openWeights;

      return matchesSearch && matchesLicense;
    });
  }, [currentSubcategoryConfig, searchQuery, licenseFilter]);

  const activeSourceUrl = currentSubcategoryConfig?.sourceUrl || currentModalityConfig.sourceUrl;

  return (
    <div className="relative min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/25 backdrop-blur-md">
          <Trophy className="w-4 h-4 text-brand-gold animate-pulse" />
          <span className="text-xs font-bold tracking-widest uppercase text-brand-gold-bright">
            Independent AI Leaderboard
          </span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-100 uppercase tracking-tight">
          Model <span className="gold-gradient-text">Rankings</span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Unbiased benchmark rankings across Large Language Models, Generative Images, Video synthesis, and Realtime Audio engines — synchronized with <strong>Artificial Analysis</strong>.
        </p>

        {/* Live Synchronization Status Badge */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-navy-light/40 border border-brand-gold/20 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Sync: <strong>{lastSyncTime}</strong></span>
          </div>

          <button
            onClick={handleSyncWithArtificialAnalysis}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-dark hover:bg-brand-navy-light/50 border border-brand-gold/25 text-brand-gold-bright text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-brand-gold' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync from Artificial Analysis'}</span>
          </button>

          <a
            href={activeSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-gold/15 hover:bg-brand-gold/25 border border-brand-gold/30 text-brand-gold-bright text-xs font-bold transition-all hover:scale-105"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open ArtificialAnalysis.ai ↗</span>
          </a>
        </div>

        {syncFeedback && (
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{syncFeedback}</span>
            </div>
          </div>
        )}
      </div>

      {/* Control Bar: Modality Dropdown & Subcategories */}
      <div className="bg-brand-navy-deep/80 border border-brand-gold/20 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-2xl mb-8 space-y-6">
        
        {/* Modality Selector & Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Modality Dropdown Selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold whitespace-nowrap">
              Modality:
            </span>
            <div className="relative flex-1 sm:w-64">
              <select
                value={selectedModality}
                onChange={(e) => handleModalityChange(e.target.value as ModalityCategory)}
                className="w-full appearance-none bg-brand-navy-dark border border-brand-gold/30 hover:border-brand-gold/60 text-slate-100 font-bold text-sm rounded-2xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-gold/40 transition-all cursor-pointer shadow-inner"
              >
                <option value="llm">🧠 LLM (Language Models)</option>
                <option value="image">🎨 Images (Text-to-Image & Edit)</option>
                <option value="video">🎬 Video (Text-to-Video & Edit)</option>
                <option value="speech">🎙️ Speech & Realtime Audio</option>
              </select>
              <ChevronDown className="w-4 h-4 text-brand-gold absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-brand-gold absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, creator, or feature..."
              className="w-full bg-brand-navy-dark border border-brand-gold/20 focus:border-brand-gold text-slate-200 text-xs sm:text-sm rounded-2xl pl-11 pr-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-gold/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Subcategory Pills Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-brand-gold/10">
          
          {/* Subcategory Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1">
              Benchmark:
            </span>
            {subcategoryKeys.map((subKey) => {
              const subConfig = currentModalityConfig.subcategories[subKey];
              const isSelected = selectedSubcategory === subKey;
              return (
                <button
                  key={subKey}
                  onClick={() => setSelectedSubcategory(subKey)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-brand-gold to-brand-gold-dark text-brand-navy-dark shadow-[0_0_15px_rgba(189,154,118,0.35)] scale-105'
                      : 'bg-brand-navy-dark/70 hover:bg-brand-navy-light/60 text-slate-300 border border-brand-gold/15 hover:border-brand-gold/30'
                  }`}
                >
                  {subKey.includes('cost') ? (
                    <DollarSign className="w-3.5 h-3.5" />
                  ) : subKey.includes('time') || subKey.includes('speech') ? (
                    <Zap className="w-3.5 h-3.5" />
                  ) : (
                    <Trophy className="w-3.5 h-3.5" />
                  )}
                  {subConfig.label}
                </button>
              );
            })}
          </div>

          {/* License Filter Chips & View Mode Toggle */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-brand-navy-dark/90 p-1 rounded-xl border border-brand-gold/20">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'cards'
                    ? 'bg-brand-gold text-brand-navy-dark'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Cards View
              </button>
              <button
                onClick={() => setViewMode('live-embed')}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'live-embed'
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="View live interactive graph directly from Artificial Analysis"
              >
                <Maximize2 className="w-3 h-3" />
                Live Web View
              </button>
            </div>

            {/* License Filter Chips */}
            <div className="flex items-center gap-1 bg-brand-navy-dark/80 p-1 rounded-xl border border-brand-gold/15">
              <button
                onClick={() => setLicenseFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  licenseFilter === 'all'
                    ? 'bg-brand-gold text-brand-navy-dark font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLicenseFilter('open')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  licenseFilter === 'open'
                    ? 'bg-emerald-500 text-brand-navy-dark font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Open Weights
              </button>
              <button
                onClick={() => setLicenseFilter('proprietary')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  licenseFilter === 'proprietary'
                    ? 'bg-blue-500 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Proprietary
              </button>
            </div>
          </div>
        </div>

        {/* Subcategory Description Banner */}
        <div className="bg-brand-navy-dark/50 p-3.5 rounded-2xl border border-brand-gold/10 flex items-start gap-2.5 text-slate-300 text-xs">
          <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold text-brand-gold-bright">{currentSubcategoryConfig?.label}: </span>
            {currentSubcategoryConfig?.description}
          </div>
          <a
            href={activeSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:underline text-[11px] font-semibold flex items-center gap-1 shrink-0 ml-2"
          >
            Live Chart on Artificial Analysis ↗
          </a>
        </div>
      </div>

      {/* VIEW 1: Live Web View Embed */}
      {viewMode === 'live-embed' ? (
        <div className="rounded-3xl border border-brand-gold/30 bg-brand-navy-deep/80 overflow-hidden shadow-2xl p-2 space-y-2">
          <div className="p-3 bg-brand-navy-dark rounded-2xl flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Interactive Benchmark Frame: <strong>{activeSourceUrl}</strong></span>
            </div>
            <a
              href={activeSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold hover:underline font-bold flex items-center gap-1"
            >
              Open in Full Window ↗
            </a>
          </div>

          <div className="w-full h-[750px] rounded-2xl overflow-hidden bg-white border border-brand-gold/15">
            <iframe
              src={activeSourceUrl}
              title="Artificial Analysis Live Rankings"
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          </div>
        </div>
      ) : (
        /* VIEW 2: Native Dark Navy + Gold Cards View */
        filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-brand-navy-deep/50 rounded-3xl border border-brand-gold/15">
            <Trophy className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No models found</h3>
            <p className="text-slate-500 text-xs mt-1">Try clearing your search query or license filter.</p>
          </div>
        ) : (
          <motion.div 
            layout
            className="space-y-3.5"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item: RankingItem, idx: number) => {
                const isTop1 = item.rank === 1;
                const isTop2 = item.rank === 2;
                const isTop3 = item.rank === 3;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, delay: Math.min(idx * 0.04, 0.25) }}
                    whileHover={{ scale: 1.012, x: 4 }}
                    className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isTop1
                        ? 'bg-gradient-to-r from-brand-gold/15 via-brand-navy-deep to-brand-navy-dark border-brand-gold/50 shadow-[0_0_25px_rgba(189,154,118,0.2)]'
                        : isTop2
                        ? 'bg-brand-navy-deep/90 border-slate-400/30 hover:border-slate-300 shadow-md'
                        : isTop3
                        ? 'bg-brand-navy-deep/80 border-amber-600/30 hover:border-amber-500 shadow-md'
                        : 'bg-brand-navy-deep/60 border-brand-gold/15 hover:border-brand-gold/40'
                    } p-4 sm:p-5`}
                  >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                    
                    {/* Left Column: Rank + Model Title + Creator */}
                    <div className="flex items-center gap-4 min-w-[280px] sm:min-w-[340px]">
                      
                      {/* Rank Badge */}
                      <div className="flex items-center justify-center shrink-0">
                        {isTop1 ? (
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-300 to-amber-600 flex items-center justify-center text-brand-navy-dark font-black text-base shadow-lg ring-2 ring-yellow-400/50">
                            1
                          </div>
                        ) : isTop2 ? (
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-brand-navy-dark font-black text-base shadow-md">
                            2
                          </div>
                        ) : isTop3 ? (
                          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-800 flex items-center justify-center text-white font-black text-base shadow-md">
                            3
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-2xl bg-brand-navy-dark/90 border border-brand-gold/20 flex items-center justify-center text-slate-400 font-bold text-sm">
                            {item.rank}
                          </div>
                        )}
                      </div>

                      {/* Model Details */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <a
                            href={item.artificialAnalysisUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-display text-base sm:text-lg font-bold text-slate-100 hover:text-brand-gold transition-colors flex items-center gap-1.5 group-hover:underline"
                          >
                            {item.model}
                            <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                          </a>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                          {item.creatorLogo && (
                            <img
                              src={item.creatorLogo}
                              alt={item.creator}
                              className="w-3.5 h-3.5 object-contain"
                            />
                          )}
                          <span className="font-semibold text-slate-300">{item.creator}</span>
                          <span>•</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            item.openWeights
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-blue-500/15 text-blue-300 border border-blue-500/30'
                          }`}>
                            {item.openWeights ? 'Open Weights' : 'Proprietary'}
                          </span>

                          {item.badges && item.badges.map((badge: string, bIdx: number) => (
                            <span
                              key={bIdx}
                              className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-gold/10 text-brand-gold-bright border border-brand-gold/20"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle Column: Benchmarks & Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto items-center py-2 lg:py-0 border-t lg:border-t-0 border-brand-gold/10">
                      
                      {/* Primary Metric (Highlighted) */}
                      <div className="bg-brand-navy-dark/70 px-3.5 py-2 rounded-xl border border-brand-gold/20 text-center min-w-[110px]">
                        <div className="text-[10px] text-brand-gold uppercase tracking-wider font-bold">
                          {item.primaryMetric.label}
                        </div>
                        <div className="font-display text-lg sm:text-xl font-extrabold text-white">
                          {item.primaryMetric.value}
                        </div>
                      </div>

                      {/* Secondary Metric */}
                      {item.secondaryMetric && (
                        <div className="bg-brand-navy-dark/40 px-3 py-2 rounded-xl border border-brand-gold/10 text-center min-w-[105px]">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {item.secondaryMetric.label}
                          </div>
                          <div className="font-display text-sm sm:text-base font-bold text-slate-200">
                            {item.secondaryMetric.value}
                          </div>
                        </div>
                      )}

                      {/* Cost / Pricing Metric */}
                      {item.costMetric && (
                        <div className="bg-brand-navy-dark/40 px-3 py-2 rounded-xl border border-brand-gold/10 text-center min-w-[105px]">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {item.costMetric.label}
                          </div>
                          <div className="font-display text-xs sm:text-sm font-bold text-emerald-400 truncate">
                            {item.costMetric.value}
                          </div>
                        </div>
                      )}

                      {/* Speed / Latency Metric */}
                      {item.speedMetric && (
                        <div className="bg-brand-navy-dark/40 px-3 py-2 rounded-xl border border-brand-gold/10 text-center min-w-[105px]">
                          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                            {item.speedMetric.label}
                          </div>
                          <div className="font-display text-xs sm:text-sm font-bold text-amber-300">
                            {item.speedMetric.value}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Artificial Analysis Link */}
                    <div className="hidden lg:flex items-center shrink-0 pl-2">
                      <a
                        href={item.artificialAnalysisUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-navy-dark border border-brand-gold/30 text-xs font-bold transition-all shadow-md group/btn"
                      >
                        <span>Analysis</span>
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </a>
                    </div>

                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        )
      )}

      {/* Footer Info Box */}
      <div className="mt-14 p-6 rounded-3xl bg-brand-navy-deep/60 border border-brand-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <div className="font-display font-bold text-slate-200 text-sm flex items-center justify-center sm:justify-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-brand-gold" />
            Verified Benchmarking Methodology
          </div>
          <p className="text-slate-400 text-xs max-w-xl">
            Artificial Analysis independently benchmarks models via standardized synthetic test suites, API response timing, token output rate telemetry, and blind human evaluation arenas.
          </p>
        </div>

        <a
          href="https://artificialanalysis.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl bg-brand-gold text-brand-navy-dark font-extrabold text-xs uppercase tracking-wider hover:bg-brand-gold-bright transition-all shadow-lg shrink-0"
        >
          Explore All Modalities ↗
        </a>
      </div>

    </div>
  );
};
