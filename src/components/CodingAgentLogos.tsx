import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

// 1. Cursor Logo (Anysphere Cube Wireframe)
export const CursorLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.12 6.4-9.12-5.26a2 2 0 0 0-2 0L.88 6.4a2 2 0 0 0-1 1.73v10.53a2 2 0 0 0 1 1.74l9.12 5.26a2 2 0 0 0 2 0l9.12-5.26a2 2 0 0 0 1-1.74V8.13a2 2 0 0 0-1-1.73Z" stroke="#60a5fa" fill="#1e3a8a" fillOpacity="0.3" />
    <path d="M12 22V12" stroke="#93c5fd" />
    <path d="m21 7-9 5-9-5" stroke="#93c5fd" />
    <circle cx="12" cy="12" r="2.5" fill="#3b82f6" />
  </svg>
);

// 2. OpenCode Logo (Terminal & Dynamic Brackets)
export const OpenCodeLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
    <path d="M7 8l4 4-4 4" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 16h4" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 3. GitHub Copilot Logo
export const GitHubCopilotLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#2e1065" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.5" />
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" fill="#c084fc" />
    <circle cx="16" cy="12" r="2" fill="#38bdf8" />
  </svg>
);

// 4. Devin Logo (Cognition AI Cube/Square)
export const DevinLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#831843" fillOpacity="0.4" stroke="#ec4899" strokeWidth="1.5" />
    <rect x="6" y="6" width="12" height="12" rx="3" stroke="#f472b6" strokeWidth="2" />
    <path d="M9 12h6M12 9v6" stroke="#fbcfe8" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 5. Windsurf Logo (Codeium Wave)
export const WindsurfLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#083344" fillOpacity="0.5" stroke="#06b6d4" strokeWidth="1.5" />
    <path d="M4 14c2.5-3 5-3 7.5 0s5 3 7.5 0" stroke="#22d3ee" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M4 9c2.5-3 5-3 7.5 0s5 3 7.5 0" stroke="#67e8f9" strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
  </svg>
);

// 6. Cline Logo (Robot Avatar)
export const ClineLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#7c2d12" fillOpacity="0.4" stroke="#f97316" strokeWidth="1.5" />
    <rect x="5" y="8" width="14" height="11" rx="3" stroke="#fb923c" strokeWidth="1.8" />
    <circle cx="9.5" cy="13" r="1.5" fill="#fed7aa" />
    <circle cx="14.5" cy="13" r="1.5" fill="#fed7aa" />
    <path d="M12 4v4M9 4h6" stroke="#fb923c" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 7. Amazon Q Developer Logo
export const AmazonQLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#78350f" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
    <circle cx="12" cy="11" r="5" stroke="#fbbf24" strokeWidth="2" />
    <path d="M15 14.5l3.5 3.5" stroke="#fde68a" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 8. Amazon Kero / Kiro Logo (AWS Orange & Spec-Driven K)
export const AmazonKiroLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#7c2d12" fillOpacity="0.5" stroke="#f97316" strokeWidth="1.5" />
    <path d="M7 6v12M7 12l6-6M7 12l6 6" stroke="#fb923c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 11c1.5 0 2.5.8 2.5 2.2 0 1.5-1 2.3-2.5 2.3" stroke="#fed7aa" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M5 19c4 2.5 10 2.5 14 0" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 9. Replit Agent Logo
export const ReplitLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#7f1d1d" fillOpacity="0.4" stroke="#ef4444" strokeWidth="1.5" />
    <path d="M6 7h6v5H6zM12 12h6v5h-6zM6 12h6v5H6z" fill="#f87171" />
  </svg>
);

// 9. Google Antigravity Logo
export const GoogleAntigravityLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1e3a8a" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="3" fill="#93c5fd" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 10. OpenAI Codex Logo
export const CodexLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#064e3b" fillOpacity="0.4" stroke="#10a37f" strokeWidth="1.5" />
    <path d="M12 5.5v13M5.5 12h13" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="5" stroke="#6ee7b7" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="#a7f3d0" />
  </svg>
);

// 11. Claude Code Logo (Anthropic Star/Asterisk)
export const ClaudeCodeLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#78350f" fillOpacity="0.4" stroke="#d97706" strokeWidth="1.5" />
    <path d="M12 4v16M4 12h16M6.5 6.5l11 11M17.5 6.5l-11 11" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

// 12. Grok Build Logo (xAI Monogram)
export const GrokBuildLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#18181b" fillOpacity="0.7" stroke="#71717a" strokeWidth="1.5" />
    <path d="M6 6l12 12M18 6L6 18" stroke="#f4f4f5" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2.5" fill="#a1a1aa" />
  </svg>
);

// 13. Muse Code Logo (Meta Infinity)
export const MuseCodeLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#172554" fillOpacity="0.4" stroke="#0081fb" strokeWidth="1.5" />
    <path d="M8 14.5c-2 0-3.5-1.1-3.5-2.5s1.5-2.5 3.5-2.5c2.5 0 4 5 7.5 5 2 0 3.5-1.1 3.5-2.5s-1.5-2.5-3.5-2.5c-3.5 0-5 5-7.5 5Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 14. Qwen Code Logo (Alibaba Prismatic)
export const QwenCodeLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#312e81" fillOpacity="0.4" stroke="#6366f1" strokeWidth="1.5" />
    <polygon points="12,4 19,8 19,16 12,20 5,16 5,8" stroke="#818cf8" strokeWidth="1.8" fill="#4338ca" fillOpacity="0.3" />
    <circle cx="12" cy="12" r="3" fill="#c7d2fe" />
  </svg>
);

// 15. Aider Logo (Terminal + Git)
export const AiderLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#134e4a" fillOpacity="0.4" stroke="#14b8a6" strokeWidth="1.5" />
    <path d="M6 9l4 3-4 3" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 15h6" stroke="#5eead4" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="9" r="1.5" fill="#99f6e4" />
  </svg>
);

// 16. Continue.dev Logo
export const ContinueLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#3b0764" fillOpacity="0.4" stroke="#8b5cf6" strokeWidth="1.5" />
    <path d="M8 6l6 6-6 6" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 6l6 6-6 6" stroke="#c4b5fd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 17. Zed AI Logo
export const ZedLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#042f2e" fillOpacity="0.5" stroke="#06b6d4" strokeWidth="1.5" />
    <path d="M6 7h12L6 17h12" stroke="#22d3ee" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// Central Map of all Logos for easy dynamic rendering
export const CODING_AGENT_LOGOS: Record<string, React.FC<LogoProps>> = {
  'cursor': CursorLogo,
  'opencode': OpenCodeLogo,
  'github-copilot': GitHubCopilotLogo,
  'devin': DevinLogo,
  'windsurf': WindsurfLogo,
  'cline': ClineLogo,
  'amazon-q-developer': AmazonQLogo,
  'amazon-kiro': AmazonKiroLogo,
  'replit-agent': ReplitLogo,
  'google-antigravity': GoogleAntigravityLogo,
  'codex': CodexLogo,
  'claude-code': ClaudeCodeLogo,
  'grok-build': GrokBuildLogo,
  'muse-code': MuseCodeLogo,
  'qwen-code': QwenCodeLogo,
  'aider': AiderLogo,
  'continue-dev': ContinueLogo,
  'zed-ai': ZedLogo,
};

export const CodingAgentLogoRenderer: React.FC<{
  agentId: string;
  className?: string;
  size?: number;
}> = ({ agentId, className = "w-8 h-8" }) => {
  const LogoComponent = CODING_AGENT_LOGOS[agentId];
  if (!LogoComponent) {
    return (
      <div className={`${className} rounded-xl bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold text-xs`}>
        DEV
      </div>
    );
  }
  return <LogoComponent className={className} />;
};
