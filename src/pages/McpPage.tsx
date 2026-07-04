import React from 'react';
import { Server, Link2, ExternalLink, Code } from 'lucide-react';

export const McpPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright text-xs font-bold tracking-wider uppercase mb-3">
          <Server className="w-3.5 h-3.5" />
          Model Context Protocol
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          Model Context <span className="gold-gradient-text">Protocol (MCP)</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 leading-relaxed">
          Open standard protocol created by Anthropic designed to securely establish standardized data integrations between AI models and host applications/local resources.
        </p>
      </div>

      {/* Main Content Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Summary & Protocol Flow */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-6 rounded-2xl glass-panel border border-brand-gold/10 bg-brand-navy-deep/20 space-y-4">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-200 uppercase tracking-wide">
              What is MCP?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Modern AI agents are often confined inside sandboxed contexts. Establishing integrations requires building custom connectors for every new database, tool, or CLI. 
              <strong> Model Context Protocol (MCP)</strong> replaces custom integrations with a client-server architecture:
            </p>
            <ul className="list-disc pl-5 text-slate-400 text-sm space-y-2">
              <li><strong>Host App (Client)</strong>: The AI IDE, chat UI, or agent runtime (e.g. Cursor, Claude Desktop).</li>
              <li><strong>MCP Servers</strong>: Lightweight nodes exposing standardized JSON-RPC APIs for reading databases, editing local files, or executing APIs.</li>
              <li><strong>Ecosystem Adoption</strong>: Supported natively by Anthropic's Claude ecosystem, Cursor, and emerging open-source orchestration engines.</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-brand-gold/10 bg-brand-navy-deep/20 space-y-4">
            <h2 className="font-serif text-xl md:text-2xl font-bold text-slate-200 uppercase tracking-wide">
              Adoption Across Major Providers
            </h2>
            <div className="space-y-4 text-sm text-slate-300">
              <div>
                <strong className="text-brand-gold-bright block">Anthropic Claude</strong>
                <p className="text-slate-400 text-xs mt-1">
                  Pioneered the standard. Exposes native configuration settings inside the Claude Desktop app (`claude_desktop_config.json`) to invoke tools and access databases.
                </p>
              </div>
              <div className="border-t border-brand-gold/5 pt-3">
                <strong className="text-brand-gold-bright block">OpenAI & Google</strong>
                <p className="text-slate-400 text-xs mt-1">
                  Utilize similar function-calling and tool-definition specifications. OpenAI uses Custom GPT Actions, while Google integrates tool calls via OpenAPI schemas. Open-source communities are creating adapters to bind MCP servers to OpenAI Assistants and Gemini Developer Studio runs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Links & Setup Code */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-brand-gold/10 space-y-6">
            <h3 className="font-serif text-sm font-bold tracking-wider text-slate-200 uppercase border-b border-brand-gold/10 pb-3">
              Official SDKs & Links
            </h3>
            
            <div className="flex flex-col gap-4 text-xs font-semibold">
              <a
                href="https://modelcontextprotocol.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-brand-navy-light/10 border border-brand-gold/15 text-slate-300 hover:text-brand-gold-bright hover:border-brand-gold transition-all"
              >
                <span>MCP Official Documentation Portal</span>
                <ExternalLink className="w-4 h-4 text-brand-gold" />
              </a>

              <a
                href="https://github.com/modelcontextprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-brand-navy-light/10 border border-brand-gold/15 text-slate-300 hover:text-brand-gold-bright hover:border-brand-gold transition-all"
              >
                <span>GitHub: MCP Official SDKs Repository</span>
                <Code className="w-4 h-4 text-brand-gold" />
              </a>

              <a
                href="https://github.com/modelcontextprotocol/servers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-brand-navy-light/10 border border-brand-gold/15 text-slate-300 hover:text-brand-gold-bright hover:border-brand-gold transition-all"
              >
                <span>Reference MCP Server Repos (Postgres, Git, Files)</span>
                <Link2 className="w-4 h-4 text-brand-gold" />
              </a>
            </div>
          </div>

          {/* Config JSON Example */}
          <div className="p-6 rounded-2xl glass-panel border border-brand-gold/10 space-y-3">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Claude Desktop Configuration</span>
            <pre className="p-4 rounded-xl bg-brand-navy-deep font-mono text-[10px] text-slate-300 overflow-x-auto">
{`{
  "mcpServers": {
    "git": {
      "command": "uvx",
      "args": [
        "mcp-server-git",
        "--repository",
        "/path/to/repo"
      ]
    }
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default McpPage;
