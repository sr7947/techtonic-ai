import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FRONTIER_MODELS } from '../data/modelsData';
import type { AIModel } from '../data/modelsData';
import { Cpu, Download, Heart, Clock, Copy, Check, Filter, Layers, Play, Database, FileCode } from 'lucide-react';

export const ModelsHub: React.FC = () => {
  // Filters State
  const [selectedTask, setSelectedTask] = useState<string>('All');
  const [selectedRange, setSelectedRange] = useState<string>('All');
  const [selectedLibraries, setSelectedLibraries] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Model for the Details Modal
  const [activeModel, setActiveModel] = useState<AIModel | null>(null);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const tasks = [
    'All',
    'Text Generation',
    'Image-to-Text',
    'Text-to-Image',
    'Text-to-Speech'
  ];

  const parameterRanges = [
    'All',
    '<1B',
    '1B-10B',
    '10B-50B',
    '50B-150B',
    '>500B'
  ];

  const librariesList = [
    'PyTorch',
    'Transformers',
    'GGUF',
    'Diffusers',
    'MLX'
  ];

  // Apply filters
  const filteredModels = FRONTIER_MODELS.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTask = selectedTask === 'All' || model.task === selectedTask;
    const matchesRange = selectedRange === 'All' || model.parameterRange === selectedRange;
    const matchesLibs = selectedLibraries.length === 0 || 
      selectedLibraries.every(lib => model.libraries.includes(lib as any));

    return matchesSearch && matchesTask && matchesRange && matchesLibs;
  });

  const toggleLibrary = (lib: string) => {
    if (selectedLibraries.includes(lib)) {
      setSelectedLibraries(selectedLibraries.filter(l => l !== lib));
    } else {
      setSelectedLibraries([...selectedLibraries, lib]);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // 3D Tilt Card effect handlers
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const angleX = (yc - y) / (yc / 10);
    const angleY = (x - xc) / (xc / 10);
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-6px)`;
    card.style.boxShadow = '0 20px 40px rgba(189, 154, 118, 0.15)';
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    card.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
  };

  // Helper to color tasks uniquely
  const getTaskColor = (task: string) => {
    switch (task) {
      case 'Text Generation': return 'from-[#c5a880] to-[#bd9a76]';
      case 'Image-to-Text': return 'from-teal-400 to-emerald-600';
      case 'Text-to-Image': return 'from-purple-500 to-indigo-600';
      case 'Text-to-Speech': return 'from-amber-500 to-orange-600';
      default: return 'from-brand-gold to-brand-gold-bright';
    }
  };

  return (
    <section id="models" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      {/* Background glowing orb */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-brand-gold/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase">
            <Cpu className="w-3.5 h-3.5 animate-pulse" />
            Model Registry
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
            Frontier <span className="gold-gradient-text">Models Hub</span>
          </h2>
          <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            Query, filter, and initialize open weights for leading model families. Explore parameters, ML tasks, and pipeline code segments.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-10 max-w-xl relative">
          <input
            type="text"
            placeholder="Search models (e.g. Llama, Gemma, Qwen)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-navy-light/10 border border-brand-gold/15 focus:border-brand-gold/60 focus:ring-1 focus:ring-brand-gold/30 rounded-2xl px-5 py-3.5 text-slate-200 text-sm placeholder:text-slate-500 transition-all duration-300 outline-none backdrop-blur-md"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 3D Sidebar Filters (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-2xl glass-panel border border-brand-gold/10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-brand-gold/1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-brand-gold/10">
                <Filter className="w-4 h-4 text-brand-gold" />
                <h3 className="font-serif text-sm font-bold tracking-wider text-slate-100 uppercase">Filters</h3>
              </div>

              {/* Filter Task */}
              <div className="space-y-3 mb-6">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">ML Tasks</span>
                <div className="flex flex-col gap-1.5">
                  {tasks.map(t => (
                    <button
                      key={t}
                      onClick={() => setSelectedTask(t)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                        selectedTask === t
                          ? 'bg-brand-gold/15 text-brand-gold-bright border-brand-gold/45 shadow-md shadow-brand-gold/5'
                          : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-brand-navy-light/10'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Parameters */}
              <div className="space-y-3 mb-6">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Parameter Count</span>
                <div className="flex flex-col gap-1.5">
                  {parameterRanges.map(range => (
                    <button
                      key={range}
                      onClick={() => setSelectedRange(range)}
                      className={`text-left px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                        selectedRange === range
                          ? 'bg-brand-gold/15 text-brand-gold-bright border-brand-gold/45 shadow-md shadow-brand-gold/5'
                          : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-brand-navy-light/10'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filter Libraries */}
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">Libraries & Engines</span>
                <div className="flex flex-wrap gap-2">
                  {librariesList.map(lib => {
                    const isSelected = selectedLibraries.includes(lib);
                    return (
                      <button
                        key={lib}
                        onClick={() => toggleLibrary(lib)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-brand-gold text-brand-navy-dark border-brand-gold shadow-md font-bold'
                            : 'bg-brand-navy-light/5 text-slate-400 border-brand-gold/10 hover:border-brand-gold/30 hover:text-slate-200'
                        }`}
                      >
                        {lib}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Model Cards Grid (9 Columns) */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs text-slate-500 tracking-wider">
                Showing <strong className="text-slate-300">{filteredModels.length}</strong> matching models
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredModels.map((model, idx) => (
                  <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                  >
                    <div
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => setActiveModel(model)}
                      style={{ transition: 'transform 0.1s ease-out, border 0.3s ease, box-shadow 0.3s ease' }}
                      className="glass-panel rounded-2xl p-6 border border-brand-gold/10 hover:border-brand-gold/35 relative group cursor-pointer overflow-hidden flex flex-col justify-between h-56"
                    >
                      {/* Top brand color band representing task */}
                      <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${getTaskColor(model.task)}`} />

                      {/* Header */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                            {model.author}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold px-2 py-0.5 rounded bg-brand-navy-light/30 border border-brand-gold/15">
                            {model.parameters}B params
                          </span>
                        </div>
                        <h4 className="font-serif text-slate-200 text-base md:text-lg font-bold group-hover:text-brand-gold-bright transition-colors line-clamp-1">
                          {model.name.split('/')[1]}
                        </h4>
                        <span className="text-slate-500 text-[11px] block tracking-wide">
                          {model.name}
                        </span>
                      </div>

                      {/* Middle description / tags */}
                      <div className="flex flex-wrap gap-1.5 relative z-10">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-brand-navy-dark bg-gradient-to-r ${getTaskColor(model.task)}`}>
                          {model.task}
                        </span>
                        {model.libraries.slice(0, 2).map(lib => (
                          <span key={lib} className="px-2 py-0.5 rounded text-[10px] font-medium border border-brand-gold/10 bg-brand-navy-light/10 text-slate-400">
                            {lib}
                          </span>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-brand-gold/5 text-slate-500 text-xs relative z-10">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1.5">
                            <Download className="w-3.5 h-3.5 text-slate-600" />
                            {model.downloads}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Heart className="w-3.5 h-3.5 text-slate-600" />
                            {model.likes}
                          </span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                          {model.updatedAt}
                        </span>
                      </div>

                      {/* Subtle 3D background grids (renders on hover) */}
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-brand-gold/2 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredModels.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400 font-serif text-lg">No models match the active filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Micro-UX Navigation Helpers */}
        <div className="mt-12 flex items-center justify-between border-t border-brand-gold/10 pt-8 text-[11px] sm:text-xs">
          <a
            href="#home"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-navy-light/10 border border-brand-gold/10 hover:border-brand-gold/40 text-slate-400 hover:text-brand-gold-bright transition-all font-semibold tracking-wider uppercase cursor-pointer"
          >
            ↑ Back to Top
          </a>
          <a
            href="#leaders"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-gold/10 border border-brand-gold/25 hover:bg-brand-gold hover:text-brand-navy-dark text-brand-gold-bright hover:shadow-[0_0_15px_rgba(189,154,118,0.25)] transition-all font-bold tracking-wider uppercase cursor-pointer"
          >
            Jump to AI Leaders ↓
          </a>
        </div>
      </div>

      {/* Futuristic Model Details Modal with 3D layer visualization & Initialization code */}
      <AnimatePresence>
        {activeModel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy-deep/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-3xl border border-brand-gold/20 bg-brand-navy-dark p-6 md:p-8 shadow-2xl glass-panel"
            >
              {/* Top color tag */}
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${getTaskColor(activeModel.task)}`} />

              {/* Close Button */}
              <button
                onClick={() => setActiveModel(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-brand-navy-light/20 text-slate-400 hover:text-slate-200 border border-brand-gold/15 hover:border-brand-gold/40 transition-all focus:outline-none cursor-pointer"
              >
                <span className="text-xs font-bold px-1">✕</span>
              </button>

              {/* Title & Info */}
              <div className="space-y-4 mb-8">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">
                  Model Profile Details
                </span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-100">
                  {activeModel.name.split('/')[1]}
                </h3>
                <span className="text-slate-500 text-sm block">
                  HF Repo: <code>{activeModel.name}</code>
                </span>

                <div className="flex flex-wrap gap-4 text-xs pt-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-light/20 border border-brand-gold/10 text-slate-300">
                    <Database className="w-4 h-4 text-brand-gold" />
                    <strong>Parameters:</strong> {activeModel.parameters} Billion
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-light/20 border border-brand-gold/10 text-slate-300">
                    <Layers className="w-4 h-4 text-brand-gold" />
                    <strong>ML Task:</strong> {activeModel.task}
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-navy-light/20 border border-brand-gold/10 text-slate-300">
                    <Cpu className="w-4 h-4 text-brand-gold" />
                    <strong>Library:</strong> {activeModel.libraries.join(', ')}
                  </div>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Left Side: Code Initializations */}
                <div className="space-y-6">
                  {/* CLI command */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">Ollama Run Command</span>
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-navy-deep border border-brand-gold/10 font-mono text-xs text-slate-300">
                      <span>ollama run {activeModel.name.split('/')[1].toLowerCase()}</span>
                      <button
                        onClick={() => handleCopy(`ollama run ${activeModel.name.split('/')[1].toLowerCase()}`)}
                        className="text-brand-gold hover:text-brand-gold-bright transition-colors cursor-pointer"
                      >
                        {copiedCode ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* PyTorch/Transformers Script Code Block */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-brand-gold" />
                        Transformers Code Setup
                      </span>
                      <button
                        onClick={() => handleCopy(`from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

model_name = "${activeModel.name}"
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

model_name = "${activeModel.name}"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto",
    torch_dtype=torch.float16
)`}
                    </pre>
                  </div>
                </div>

                {/* Right Side: Realistic 3D Neural Net Layers Visualizer */}
                <div className="space-y-4">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-brand-gold" />
                    Interactive Layer Depth Visualizer
                  </span>

                  <div className="h-64 rounded-2xl bg-brand-navy-deep/80 border border-brand-gold/10 flex flex-col justify-around p-4 relative overflow-hidden shadow-inner">
                    {/* Layer representation */}
                    <div className="space-y-4 relative z-10">
                      
                      {/* Input Layer */}
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

                      {/* Attention Layers */}
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

                      {/* Feed Forward Blocks */}
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

                      {/* Logits Output */}
                      <div className="flex items-center justify-between">
                        <div className="w-1/3 text-[10px] text-slate-400 uppercase tracking-wider font-bold">Logits & Softmax</div>
                        <div className="flex-1 h-3 bg-brand-navy-light/40 border border-brand-gold/20 rounded-full overflow-hidden p-0.5">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 2.2, delay: 0.6 }}
                            className="h-full bg-brand-gold-bright rounded-full"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Nodes visual overlay (realistic 3D node array using animated CSS nodes) */}
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
