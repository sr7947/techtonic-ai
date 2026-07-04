import React from 'react';
import { Terminal, CheckCircle, ExternalLink, Code } from 'lucide-react';

interface ToolComparison {
  name: string;
  useCase: string;
  description: string;
  strengths: string[];
  docsUrl: string;
  style: 'ide' | 'agentic' | 'terminal' | 'model';
}

const TOOLS: ToolComparison[] = [
  {
    name: 'Cursor',
    useCase: 'IDE-native agentic development',
    description: 'An AI-first fork of VS Code featuring multi-file edits (Composer), native inline diffs, semantic codebase indexing, and tab completions powered by frontier models.',
    strengths: ['Multi-file edits (Composer)', 'Inline code diffs', 'Vector codebase indexing'],
    docsUrl: 'https://docs.cursor.sh',
    style: 'ide'
  },
  {
    name: 'GitHub Copilot',
    useCase: 'Autocompletions & inline coding chat',
    description: 'The pioneer developer assistant integrated directly into VS Code, JetBrains, and Visual Studio, offering ghost-text completions and contextual chat based on active buffers.',
    strengths: ['IDE ubiquity & speed', 'Contextual code chats', 'Enterprise security compliance'],
    docsUrl: 'https://docs.github.com/en/copilot',
    style: 'ide'
  },
  {
    name: 'Google Antigravity',
    useCase: 'Autonomous workspace code agent',
    description: 'A powerful, sandbox-secured AI agent designed for full-workspace pair programming, capable of researching codebases, writing files, and compiling/executing terminal commands.',
    strengths: ['Unsandboxed CLI executions', 'Autonomous workspace planning', 'Multi-agent coordination'],
    docsUrl: 'https://github.com/google',
    style: 'agentic'
  },
  {
    name: 'Claude Code',
    useCase: 'Terminal-first agentic scripting',
    description: 'Anthropic\'s developer CLI tool capable of scanning workspaces, writing files, resolving lint errors, and running tests directly from the console using Claude models.',
    strengths: ['CLI-native shell control', 'Fast codebase scans', 'Direct git staging & commit runs'],
    docsUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code',
    style: 'terminal'
  },
  {
    name: 'OpenAI Codex',
    useCase: 'Historic generative coding API',
    description: 'The historic foundational LLM fine-tuned on code, which powered the original version of GitHub Copilot, demonstrating the feasibility of semantic code completions.',
    strengths: ['Historic pioneer model', 'API-driven code formatting', 'Multi-language training baseline'],
    docsUrl: 'https://platform.openai.com/docs/guides/code',
    style: 'model'
  }
];

export const DeveloperStudioPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase mb-3">
          <Terminal className="w-3.5 h-3.5" />
          IDE & Terminal Stacks
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          Developer <span className="gold-gradient-text">Studios & IDEs</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Deep architectural comparisons of AI coding assistants, code completions engines, terminal agents, and autonomous workspace tools.
        </p>
      </div>

      {/* Grid Comparison */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-3xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Highlight ribbon representing category */}
              <div className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r ${
                t.style === 'ide' ? 'from-indigo-500 to-purple-600' :
                t.style === 'agentic' ? 'from-[#bd9a76] to-[#e8c29b]' :
                t.style === 'terminal' ? 'from-emerald-500 to-teal-600' :
                'from-slate-500 to-zinc-600'
              }`} />

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-brand-navy-light/30 px-2 py-0.5 rounded border border-brand-gold/10">
                    {t.style}
                  </span>
                  <span className="text-xs text-slate-400 font-medium italic">
                    {t.useCase}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-slate-200 group-hover:text-brand-gold-bright transition-colors">
                  {t.name}
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {t.description}
                </p>

                {/* Key Strengths */}
                <div className="space-y-2 pt-3">
                  <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider block">Key Strengths</span>
                  <div className="flex flex-col gap-1.5">
                    {t.strengths.map((str) => (
                      <div key={str} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                        <span>{str}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-gold/5 flex justify-end">
                <a
                  href={t.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-gold-bright hover:text-brand-gold transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  Integration Docs
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperStudioPage;
