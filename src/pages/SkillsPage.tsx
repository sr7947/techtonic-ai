import React from 'react';
import { BookOpen, ExternalLink, Layers } from 'lucide-react';

interface APIProvider {
  name: string;
  conceptName: string;
  description: string;
  docsUrl: string;
  codeSnippet: string;
}

const PROVIDERS: APIProvider[] = [
  {
    name: 'Anthropic Claude',
    conceptName: 'Tool Use (Computer / Native)',
    description: 'Enables Claude models to invoke external scripts, extract structured attributes from images, read local text, and manipulate terminal environments using strict JSON schema descriptions.',
    docsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/tool-use',
    codeSnippet: `{
  "name": "get_weather",
  "description": "Get current weather",
  "input_schema": {
    "type": "object",
    "properties": {
      "location": {"type": "string"}
    },
    "required": ["location"]
  }
}`
  },
  {
    name: 'OpenAI GPT',
    conceptName: 'Function Calling',
    description: 'Allows developer run-times to define structured JSON parameters matching custom endpoints, databases, or API calls, returning normalized arguments for client execution.',
    docsUrl: 'https://platform.openai.com/docs/guides/function-calling',
    codeSnippet: `{
  "type": "function",
  "function": {
    "name": "query_db",
    "description": "Execute Postgres query",
    "parameters": {
      "type": "object",
      "properties": {
        "sql": {"type": "string"}
      }
    }
  }
}`
  },
  {
    name: 'Google Gemini',
    conceptName: 'Function Calling & Tools',
    description: 'Gemini developer APIs native tool declarations enabling models to query Vertex search stores, execute mathematical code blocks locally, or call structured web APIs.',
    docsUrl: 'https://ai.google.dev/gemini-api/docs/function-calling',
    codeSnippet: `{
  "functionDeclarations": [{
    "name": "search_catalog",
    "description": "Search product items",
    "parameters": {
      "type": "object",
      "properties": {
        "query": {"type": "string"}
      }
    }
  }]
}`
  }
];

export const SkillsPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase mb-3">
          <Layers className="w-3.5 h-3.5" />
          API Capabilities
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          Agentic AI <span className="gold-gradient-text">Skills & Tools</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          How modern frontier model APIs define, expose, and invoke developer-defined tools, plugins, and custom procedural skills.
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className="p-6 rounded-2xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="text-[10px] text-brand-gold font-bold uppercase tracking-widest block">
                  {p.name}
                </span>
                
                <h3 className="font-serif text-lg md:text-xl font-bold text-slate-200">
                  {p.conceptName}
                </h3>
                
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {p.description}
                </p>

                {/* Schema code snippet preview */}
                <div className="pt-2">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold block mb-1">Schema Declaration</span>
                  <pre className="p-3 rounded-lg bg-brand-navy-deep font-mono text-[9px] text-slate-300 overflow-x-auto">
                    {p.codeSnippet}
                  </pre>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-gold/5 flex justify-end">
                <a
                  href={p.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-gold-bright hover:text-brand-gold transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Documentation Portal
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

export default SkillsPage;
