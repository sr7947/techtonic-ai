import React from 'react';
import { Layers, ExternalLink, Cpu, GitFork } from 'lucide-react';

interface FrameworkInfo {
  name: string;
  category: 'Machine Learning' | 'Agent Orchestration';
  role: string;
  description: string;
  githubUrl: string;
  docsUrl: string;
  badgeColor: string;
}

const FRAMEWORKS: FrameworkInfo[] = [
  {
    name: 'PyTorch',
    category: 'Machine Learning',
    role: 'Model training and low-level matrix computations',
    description: 'The industry-standard open-source machine learning library developed by Meta, offering dynamic execution graphs, parallel tensor calculations, and complete CUDA integration.',
    githubUrl: 'https://github.com/pytorch/pytorch',
    docsUrl: 'https://pytorch.org/docs',
    badgeColor: 'bg-orange-500/10 border-orange-500/25 text-orange-400'
  },
  {
    name: 'JAX',
    category: 'Machine Learning',
    role: 'High-performance accelerator backing compiler (XLA)',
    description: 'Google\'s high-performance numerical library capable of compiling Python/NumPy code directly to GPU/TPU targets using XLA compilation, automatic differentiation, and vectorization.',
    githubUrl: 'https://github.com/google/jax',
    docsUrl: 'https://jax.readthedocs.io',
    badgeColor: 'bg-blue-500/10 border-blue-500/25 text-blue-400'
  },
  {
    name: 'LangChain',
    category: 'Agent Orchestration',
    role: 'LLM application scaffolding and RAG chains',
    description: 'The most popular orchestration framework providing reusable abstractions for prompt formatting, document chunking loaders, vector store indices, and memory caching layers.',
    githubUrl: 'https://github.com/langchain-ai/langchain',
    docsUrl: 'https://python.langchain.com/docs',
    badgeColor: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400'
  },
  {
    name: 'LangGraph',
    category: 'Agent Orchestration',
    role: 'Stateful, cyclic multi-agent graph flows',
    description: 'An extension of LangChain optimized for building stateful, multi-agent execution loops with built-in cyclic graphs, human-in-the-loop validation, and persistent memory.',
    githubUrl: 'https://github.com/langchain-ai/langgraph',
    docsUrl: 'https://langchain-ai.github.io/langgraph/',
    badgeColor: 'bg-purple-500/10 border-purple-500/25 text-purple-400'
  },
  {
    name: 'LlamaIndex',
    category: 'Agent Orchestration',
    role: 'Data ingestion and semantic document index query',
    description: 'A data-centric orchestration engine specifically designed to ingest, parse, structure, and query custom files (PDFs, Notion, SQL) to feed context into RAG pipelines.',
    githubUrl: 'https://github.com/run-llama/llama_index',
    docsUrl: 'https://docs.llamaindex.ai',
    badgeColor: 'bg-teal-500/10 border-teal-500/25 text-teal-400'
  }
];

export const FrameworksPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase mb-3">
          <GitFork className="w-3.5 h-3.5" />
          Code Frameworks
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          AI & Agentic <span className="gold-gradient-text">Frameworks</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Open-source compute runtimes, machine learning engines, and stateful agentic orchestration libraries building the software stack of generative applications.
        </p>
      </div>

      {/* Content layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* ML Frameworks vs Orchestration */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Column 1: Model/ML Frameworks */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-gold" />
              1. Compute & Machine Learning
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold rounded-full" />
            <p className="text-slate-400 text-sm leading-relaxed">
              These libraries form the underlying mathematical layers of AI, supporting backpropagation, deep learning architectures, matrix algebra, and GPU compilation.
            </p>

            <div className="space-y-6 pt-4">
              {FRAMEWORKS.filter(f => f.category === 'Machine Learning').map(f => (
                <div key={f.name} className="p-6 rounded-2xl glass-panel border border-brand-gold/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-slate-200">{f.name}</h3>
                    <span className={`text-[10px] uppercase font-bold border px-2.5 py-0.5 rounded-full ${f.badgeColor}`}>
                      {f.role}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                  <div className="flex justify-end gap-4 text-xs font-semibold pt-2">
                    <a href={f.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 flex items-center gap-1">
                      GitHub Repo
                    </a>
                    <a href={f.docsUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold-bright flex items-center gap-1">
                      Official Docs <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Orchestration Frameworks */}
          <div className="space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-200 uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-gold" />
              2. Agentic & RAG Orchestration
            </h2>
            <div className="w-12 h-[2px] bg-brand-gold rounded-full" />
            <p className="text-slate-400 text-sm leading-relaxed">
              These frameworks compose model APIs, database loaders, prompt schemas, and state charts into production-ready pipelines.
            </p>

            <div className="space-y-6 pt-4">
              {FRAMEWORKS.filter(f => f.category === 'Agent Orchestration').map(f => (
                <div key={f.name} className="p-6 rounded-2xl glass-panel border border-brand-gold/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-bold text-slate-200">{f.name}</h3>
                    <span className={`text-[10px] uppercase font-bold border px-2.5 py-0.5 rounded-full ${f.badgeColor}`}>
                      {f.role}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.description}</p>
                  <div className="flex justify-end gap-4 text-xs font-semibold pt-2">
                    <a href={f.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 flex items-center gap-1">
                      GitHub Repo
                    </a>
                    <a href={f.docsUrl} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:text-brand-gold-bright flex items-center gap-1">
                      Official Docs <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default FrameworksPage;
