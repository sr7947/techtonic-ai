import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  Heart, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  Cpu, 
  Tag, 
  Database,
  ArrowUpDown,
  Copy,
  Check,
  FileCode,
  Layers,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HFModel {
  id: string;
  downloads: number;
  likes: number;
  lastModified: string;
  pipeline_tag?: string;
  tags?: string[];
}

export const ModelsHub: React.FC = () => {
  const [models, setModels] = useState<HFModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTask, setSelectedTask] = useState<string>('All');
  const [selectedSort, setSelectedSort] = useState<string>('trendingScore');

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCursors, setPageCursors] = useState<Record<number, string>>({ 1: '' });
  const [nextCursor, setNextCursor] = useState<string>('');

  // Selected Model for the Details Modal
  const [activeModel, setActiveModel] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Search input debounce ref
  const debounceTimer = useRef<any>(null);

  const tasksList = [
    { label: 'All Tasks', value: 'All' },
    { label: 'Text Generation', value: 'text-generation' },
    { label: 'Text-to-Image', value: 'text-to-image' },
    { label: 'Image-to-Text', value: 'image-to-text' },
    { label: 'Image-to-Image', value: 'image-to-image' },
    { label: 'Text-to-Speech', value: 'text-to-speech' },
    { label: 'Computer Vision', value: 'zero-shot-image-classification' }
  ];

  const sortsList = [
    { label: 'Trending', value: 'trendingScore' },
    { label: 'Most Downloads', value: 'downloads' },
    { label: 'Most Likes', value: 'likes' },
    { label: 'Recently Updated', value: 'updatedAt' }
  ];

  // Helper: Get base64 URL or fallback URL for local dev proxy
  const getApiUrl = (pageCursor: string) => {
    const apiBase = window.location.hostname === 'localhost' 
      ? 'https://techtonic-ai.vercel.app' 
      : '';
    
    let url = `${apiBase}/api/models?sort=${selectedSort}&limit=10`;
    
    if (pageCursor) {
      url += `&cursor=${encodeURIComponent(pageCursor)}`;
    }
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    if (selectedTask !== 'All') {
      url += `&filter=${encodeURIComponent(selectedTask)}`;
    }
    
    return url;
  };

  // Fetch models function
  const fetchModels = async (pageToLoad: number, cursorToUse: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(getApiUrl(cursorToUse));
      if (!response.ok) {
        throw new Error(`Failed to load models: Status ${response.status}`);
      }
      const data = await response.json();
      
      setModels(data.models || []);
      setNextCursor(data.nextCursor || '');
      setCurrentPage(pageToLoad);

      // Save next cursor if present
      if (data.nextCursor) {
        setPageCursors(prev => ({
          ...prev,
          [pageToLoad + 1]: data.nextCursor
        }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to fetch models from Hugging Face.');
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when sort or task filter changes
  useEffect(() => {
    // Reset pagination state
    setPageCursors({ 1: '' });
    setCurrentPage(1);
    fetchModels(1, '');
  }, [selectedSort, selectedTask]);

  // Debounced search trigger
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    debounceTimer.current = setTimeout(() => {
      setPageCursors({ 1: '' });
      setCurrentPage(1);
      fetchModels(1, '');
    }, 400);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchQuery]);

  // Navigation handlers
  const handlePageClick = (pageNumber: number) => {
    if (pageNumber === currentPage) return;
    const cursor = pageCursors[pageNumber] || '';
    fetchModels(pageNumber, cursor);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    if (!nextCursor) return;
    handlePageClick(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    handlePageClick(currentPage - 1);
  };

  // Utility functions for UI formatting
  const formatCount = (num: number): string => {
    if (!num) return '0';
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    if (num >= 1_000) return `${(num / 1_000).toFixed(1)}k`.replace('.0k', 'k');
    return num.toString();
  };

  const formatUpdated = (dateStr: string): string => {
    if (!dateStr) return 'recently';
    try {
      const dt = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - dt.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) {
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        if (diffHrs === 0) return 'just now';
        return `about ${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
      }
      if (diffDays === 1) return 'yesterday';
      if (diffDays < 30) return `${diffDays} days ago`;
      const diffMonths = Math.floor(diffDays / 30);
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } catch {
      return 'recently';
    }
  };

  const getParamSize = (name: string, tags: string[] = []): string => {
    const nameLower = name.toLowerCase();
    
    // Check tags first
    for (const tag of tags) {
      const tagLower = tag.toLowerCase();
      if (/^\d+(?:\.\d+)?[b]$/.test(tagLower)) {
        return tagLower.toUpperCase();
      }
    }
    
    // Moe match
    const moeMatch = nameLower.match(/(\d+)x(\d+(?:\.\d+)?)[b]/);
    if (moeMatch) {
      const total = parseFloat(moeMatch[1]) * parseFloat(moeMatch[2]);
      return `${total}B`;
    }
    
    // Standard param size match
    const paramMatch = nameLower.match(/(\d+(?:\.\d+)?)[b]/);
    if (paramMatch) {
      return `${paramMatch[1].toUpperCase()}B`;
    }
    
    if (nameLower.includes('flux')) return '12B';
    if (nameLower.includes('whisper')) return '1.5B';
    if (nameLower.includes('stable-diffusion')) return '2.6B';
    if (nameLower.includes('deepseek-r1')) return '671B';
    if (nameLower.includes('kokoro')) return '0.08B';
    return '';
  };

  const getTaskLabel = (tag?: string): string => {
    if (!tag) return 'Text Generation';
    const mapping: Record<string, string> = {
      'text-generation': 'Text Generation',
      'text-to-image': 'Text-to-Image',
      'image-to-text': 'Image-to-Text',
      'image-to-image': 'Image-to-Image',
      'text-to-speech': 'Text-to-Speech',
      'audio-to-audio': 'Audio-to-Audio',
      'automatic-speech-recognition': 'Speech Recognition',
      'zero-shot-image-classification': 'Computer Vision',
      'object-detection': 'Computer Vision'
    };
    return mapping[tag] || tag.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getCreatorInitials = (name: string): string => {
    const creator = name.split('/')[0] || 'HF';
    return creator.slice(0, 2).toUpperCase();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="models" className="relative py-12 z-10 bg-brand-navy-dark">
      {/* Background glowing orb */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Controls Header */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-8 border-b border-brand-gold/10 pb-6">
          
          {/* Live Search */}
          <div className="w-full lg:max-w-md relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-4.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 1,000,000+ models on Hugging Face..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-navy-light/10 border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/30 rounded-2xl pl-11 pr-5 py-3 text-slate-200 text-sm placeholder:text-slate-500 transition-all outline-none"
            />
          </div>

          {/* Filters Selectors */}
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            
            {/* Task filter */}
            <div className="flex items-center gap-2 bg-brand-navy-light/10 border border-brand-gold/10 px-3.5 py-2 rounded-2xl w-full sm:w-auto">
              <Filter className="w-4 h-4 text-brand-gold" />
              <select
                value={selectedTask}
                onChange={(e) => setSelectedTask(e.target.value)}
                className="bg-transparent text-xs text-slate-300 font-semibold focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                {tasksList.map(t => (
                  <option key={t.value} value={t.value} className="bg-brand-navy-deep text-slate-300">
                    {t.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort filter */}
            <div className="flex items-center gap-2 bg-brand-navy-light/10 border border-brand-gold/10 px-3.5 py-2 rounded-2xl w-full sm:w-auto">
              <ArrowUpDown className="w-4 h-4 text-brand-gold" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-transparent text-xs text-slate-300 font-semibold focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                {sortsList.map(s => (
                  <option key={s.value} value={s.value} className="bg-brand-navy-deep text-slate-300">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Models list layout */}
        <div className="space-y-4">
          {error && (
            <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-2xl text-center space-y-2">
              <p className="text-red-400 font-display text-sm">Failed to connect to model catalog.</p>
              <button 
                onClick={() => fetchModels(currentPage, pageCursors[currentPage] || '')}
                className="text-xs text-brand-gold hover:underline font-bold"
              >
                Retry Request
              </button>
            </div>
          )}

          {/* Skeletons Shimmer Loading state */}
          {loading ? (
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between p-5 rounded-2xl bg-brand-navy-deep/20 border border-brand-gold/5 h-24">
                  <div className="flex items-center gap-4 w-2/3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-slate-800 rounded w-1/3" />
                      <div className="h-3 bg-slate-800 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="w-24 h-6 bg-slate-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            
            // Models Rows
            <div className="space-y-3.5">
              {models.map((model) => {
                const creator = model.id.split('/')[0] || 'independent';
                const modelName = model.id.split('/')[1] || model.id;
                const paramSize = getParamSize(model.id, model.tags);
                const taskLabel = getTaskLabel(model.pipeline_tag);
                
                return (
                  <div
                    key={model.id}
                    onClick={() => setActiveModel(model)}
                    className="p-5 rounded-2xl bg-brand-navy-deep/20 hover:bg-brand-navy-light/10 border border-brand-gold/10 hover:border-brand-gold/25 transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 group shadow-md"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      
                      {/* Creator Initials Avatar */}
                      <div className="w-10 h-10 rounded-xl bg-brand-navy-light border border-brand-gold/15 group-hover:border-brand-gold/30 transition-all flex items-center justify-center text-xs font-bold text-brand-gold-bright shrink-0">
                        {getCreatorInitials(model.id)}
                      </div>

                      <div className="space-y-1.5 min-w-0">
                        
                        {/* Title Creator/ModelName */}
                        <h4 className="font-display text-sm md:text-base font-bold text-slate-200 group-hover:text-brand-gold-bright transition-colors truncate">
                          <span className="text-slate-500 font-normal">{creator}/</span>
                          {modelName}
                        </h4>

                        {/* Tagline details row */}
                        <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[11px] text-slate-400 font-medium">
                          
                          {/* Task */}
                          <span className="flex items-center gap-1 shrink-0">
                            <Tag className="w-3 h-3 text-brand-gold/60" />
                            {taskLabel}
                          </span>

                          {/* Parameter size */}
                          {paramSize && (
                            <span className="flex items-center gap-1 shrink-0 text-slate-300">
                              <span className="w-1 h-1 rounded-full bg-slate-600" />
                              <Cpu className="w-3 h-3 text-brand-gold/60" />
                              {paramSize}
                            </span>
                          )}

                          {/* Date */}
                          <span className="flex items-center gap-1 shrink-0 text-slate-500">
                            <span className="w-1 h-1 rounded-full bg-slate-600" />
                            Updated {formatUpdated(model.lastModified)}
                          </span>

                          {/* Downloads */}
                          {model.downloads !== undefined && (
                            <span className="flex items-center gap-1 shrink-0 text-slate-400">
                              <span className="w-1 h-1 rounded-full bg-slate-600" />
                              <Download className="w-3 h-3 text-slate-500" />
                              {formatCount(model.downloads)}
                            </span>
                          )}

                          {/* Likes */}
                          {model.likes !== undefined && (
                            <span className="flex items-center gap-1 shrink-0 text-slate-400">
                              <span className="w-1 h-1 rounded-full bg-slate-600" />
                              <Heart className="w-3 h-3 text-slate-500" />
                              {formatCount(model.likes)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center justify-end text-slate-500 group-hover:text-brand-gold transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                );
              })}

              {models.length === 0 && !error && (
                <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl text-slate-500">
                  No models found on Hugging Face matching your query.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Pagination Page Scroller component */}
        {!loading && models.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-2 border-t border-brand-gold/10 pt-8 select-none">
            
            {/* Previous */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer select-none ${
                currentPage <= 1
                  ? 'border-transparent text-slate-600 cursor-not-allowed opacity-50'
                  : 'border-brand-gold/10 hover:border-brand-gold/30 text-slate-400 hover:text-slate-200 bg-brand-navy-light/10'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page Buttons loop */}
            {/* Page 1 */}
            <button
              onClick={() => handlePageClick(1)}
              className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                currentPage === 1
                  ? 'bg-brand-gold text-brand-navy-dark border-brand-gold font-extrabold shadow-md shadow-brand-gold/10'
                  : 'border-brand-gold/10 hover:border-brand-gold/30 text-slate-400 hover:text-slate-200 bg-brand-navy-light/10'
              }`}
            >
              1
            </button>

            {/* Page 2 (if cursors or page exists) */}
            {(currentPage > 1 || nextCursor) && (
              <button
                onClick={() => handlePageClick(currentPage > 1 ? (currentPage === 2 ? 2 : currentPage - 1) : 2)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  currentPage === 2
                    ? 'bg-brand-gold text-brand-navy-dark border-brand-gold font-extrabold'
                    : currentPage > 2 && (currentPage - 1) === 2
                    ? 'border-brand-gold/10 hover:border-brand-gold/30 text-slate-400 hover:text-slate-200 bg-brand-navy-light/10'
                    : 'border-brand-gold/10 hover:border-brand-gold/30 text-slate-400 hover:text-slate-200 bg-brand-navy-light/10'
                }`}
              >
                {currentPage > 1 ? (currentPage === 2 ? 2 : currentPage - 1) : 2}
              </button>
            )}

            {/* Current Page index if > 2 */}
            {currentPage > 2 && (
              <button
                onClick={() => {}}
                className="w-9 h-9 rounded-xl text-xs font-extrabold bg-brand-gold text-brand-navy-dark border-brand-gold"
              >
                {currentPage}
              </button>
            )}

            {/* Ellipses & 100 placeholder to mimic HF design */}
            <span className="px-2 text-slate-600 font-bold text-xs select-none">...</span>
            <button
              onClick={() => {}}
              disabled
              className="w-9 h-9 rounded-xl text-xs font-bold border border-transparent text-slate-600 cursor-not-allowed select-none bg-brand-navy-light/5"
            >
              100
            </button>

            {/* Next */}
            <button
              onClick={handleNextPage}
              disabled={!nextCursor}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer select-none ${
                !nextCursor
                  ? 'border-transparent text-slate-600 cursor-not-allowed opacity-50'
                  : 'border-brand-gold/10 hover:border-brand-gold/30 text-slate-400 hover:text-slate-200 bg-brand-navy-light/10'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Model details modal */}
      <AnimatePresence>
        {activeModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-deep/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-brand-gold/20 bg-brand-navy-dark p-6 md:p-8 shadow-2xl glass-panel text-slate-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModel(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-navy-light/20 text-slate-400 hover:text-slate-200 border border-brand-gold/15 hover:border-brand-gold/40 transition-all focus:outline-none cursor-pointer"
              >
                <span className="text-xs font-bold px-1">✕</span>
              </button>

              {/* Title & Info */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
                  Model Profile Details
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-slate-100">
                  {activeModel.id.split('/')[1] || activeModel.id}
                </h3>
                <span className="text-slate-500 text-sm block">
                  HF Repo: <code>{activeModel.id}</code>
                </span>

                <div className="flex flex-wrap gap-4 text-xs pt-2">
                  {getParamSize(activeModel.id, activeModel.tags) && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-light/20 border border-brand-gold/10 text-slate-300">
                      <Database className="w-4 h-4 text-brand-gold" />
                      <strong>Parameters:</strong> {getParamSize(activeModel.id, activeModel.tags)}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-light/20 border border-brand-gold/10 text-slate-300">
                    <Layers className="w-4 h-4 text-brand-gold" />
                    <strong>ML Task:</strong> {getTaskLabel(activeModel.pipeline_tag)}
                  </div>
                </div>
              </div>

              {/* Code initializations */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left: Code setups */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Ollama Run Command</span>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-deep border border-brand-gold/10 font-mono text-xs text-slate-300">
                      <span>ollama run {(activeModel.id.split('/')[1] || activeModel.id).toLowerCase()}</span>
                      <button
                        onClick={() => handleCopy(`ollama run ${(activeModel.id.split('/')[1] || activeModel.id).toLowerCase()}`)}
                        className="text-brand-gold hover:text-brand-gold-bright transition-colors cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-brand-gold" />
                        Transformers Code Setup
                      </span>
                      <button
                        onClick={() => handleCopy(`from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_name = "${activeModel.id}"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype=torch.float16
)`)}
                        className="text-brand-gold hover:text-brand-gold-bright text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                        Copy Code
                      </button>
                    </div>
                    <pre className="p-4 rounded-2xl bg-brand-navy-deep border border-brand-gold/10 font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed shadow-inner">
{`from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_name = "${activeModel.id}"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype=torch.float16
)`}
                    </pre>
                  </div>
                </div>

                {/* Right: Layer Visualizer simulation */}
                <div className="space-y-4">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-brand-gold" />
                    Interactive Layer Depth Visualizer
                  </span>

                  <div className="h-64 rounded-2xl bg-brand-navy-deep/80 border border-brand-gold/10 flex flex-col justify-around p-4 relative overflow-hidden shadow-inner">
                    <div className="space-y-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div className="w-1/3 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Input Embedding</div>
                        <div className="flex-1 h-3 bg-brand-navy-light/40 border border-brand-gold/20 rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5 }}
                            className="h-full bg-brand-gold rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="w-1/3 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Attention Heads</div>
                        <div className="flex-1 h-3 bg-brand-navy-light/40 border border-brand-gold/20 rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1.8, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-brand-gold to-orange-500 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="w-1/3 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Feed Forward (FFN)</div>
                        <div className="flex-1 h-3 bg-brand-navy-light/40 border border-brand-gold/20 rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '92%' }}
                            transition={{ duration: 2.0, delay: 0.4 }}
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Nodes visual overlay */}
                    <div className="absolute inset-0 flex justify-between px-12 py-8 pointer-events-none opacity-40">
                      {[...Array(3)].map((_, colIdx) => (
                        <div key={colIdx} className="flex flex-col justify-between h-full">
                          {[...Array(4)].map((_, nodeIdx) => (
                            <motion.div
                              key={nodeIdx}
                              animate={{ scale: [1, 1.4, 1] }}
                              transition={{ duration: 2 + colIdx, repeat: Infinity, delay: nodeIdx * 0.3 }}
                              className="w-2 h-2 bg-brand-gold rounded-full shadow-[0_0_10px_#bd9a76]"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ModelsHub;
