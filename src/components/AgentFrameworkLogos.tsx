import React from 'react';

interface LogoProps {
  className?: string;
}

// 1. OpenAI Agents SDK
export const OpenAIAgentsLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
    <path d="M12 4v4m0 8v4m-8-8h4m8 0h4" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3.5" stroke="#10a37f" strokeWidth="2" fill="#065f46" />
    <circle cx="12" cy="12" r="1.5" fill="#6ee7b7" />
  </svg>
);

// 2. Google ADK Logo
export const GoogleADKLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1e1b4b" fillOpacity="0.4" stroke="#60a5fa" strokeWidth="1.5" />
    <path d="M12 3L4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4z" stroke="#3b82f6" strokeWidth="1.8" fill="#1d4ed8" fillOpacity="0.3" />
    <path d="M9 12l2 2 4-4" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 3. Microsoft Agent Framework Logo
export const MicrosoftAgentFrameworkLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0c4a6e" fillOpacity="0.4" stroke="#38bdf8" strokeWidth="1.5" />
    <rect x="5" y="5" width="6" height="6" rx="1.5" fill="#f43f5e" />
    <rect x="13" y="5" width="6" height="6" rx="1.5" fill="#10b981" />
    <rect x="5" y="13" width="6" height="6" rx="1.5" fill="#0ea5e9" />
    <rect x="13" y="13" width="6" height="6" rx="1.5" fill="#f59e0b" />
  </svg>
);

// 4. LangGraph Logo
export const LangGraphLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#042f2e" fillOpacity="0.5" stroke="#14b8a6" strokeWidth="1.5" />
    <circle cx="6" cy="12" r="2.5" fill="#2dd4bf" />
    <circle cx="18" cy="7" r="2.5" fill="#2dd4bf" />
    <circle cx="18" cy="17" r="2.5" fill="#2dd4bf" />
    <path d="M8.5 12h3m3-3.5L12 11m2.5 4.5L12 13" stroke="#5eead4" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 5. LangChain Logo
export const LangChainLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#064e3b" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" />
    <path d="M7 10a4 4 0 0 1 4-4h2a4 4 0 0 1 0 8H9" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
    <path d="M17 14a4 4 0 0 1-4 4h-2a4 4 0 0 1 0-8h4" stroke="#6ee7b7" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 6. AWS Strands Logo
export const AWSStrandsLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#451a03" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
    <path d="M6 7c3 5 9 5 12 10M18 7c-3 5-9 5-12 10" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="2" fill="#fef08a" />
  </svg>
);

// 7. Claude Agent SDK Logo
export const ClaudeAgentSDKLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#451a03" fillOpacity="0.5" stroke="#d97706" strokeWidth="1.5" />
    <path d="M12 4l2.5 5.5L20 12l-5.5 2.5L12 20l-2.5-5.5L4 12l5.5-2.5L12 4z" fill="#d97706" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="2" fill="#fed7aa" />
  </svg>
);

// 8. CrewAI Logo
export const CrewAILogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#7c2d12" fillOpacity="0.4" stroke="#f97316" strokeWidth="1.5" />
    <circle cx="9" cy="9" r="2.5" fill="#fb923c" />
    <circle cx="15" cy="9" r="2.5" fill="#f97316" />
    <circle cx="12" cy="16" r="2.5" fill="#fdba74" />
    <path d="M9 11.5l3 2.5 3-2.5" stroke="#fed7aa" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 9. PydanticAI Logo
export const PydanticAILogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#4c0519" fillOpacity="0.5" stroke="#f43f5e" strokeWidth="1.5" />
    <path d="M7 6h6a4 4 0 0 1 0 8H7V6z" stroke="#fb7185" strokeWidth="2" strokeLinejoin="round" />
    <path d="M7 14v4" stroke="#fda4af" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="16" r="2" fill="#f43f5e" />
  </svg>
);

// 10. Mastra Logo
export const MastraLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#3b0764" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.5" />
    <path d="M5 18V8l7 7 7-7v10" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 11. Vercel AI SDK Logo
export const VercelAISDKLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
    <path d="M12 6L18.5 17.5H5.5L12 6Z" fill="#ffffff" />
  </svg>
);

// 12. Eve Logo
export const EveLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#1e1b4b" fillOpacity="0.5" stroke="#3b82f6" strokeWidth="1.5" />
    <rect x="5" y="6" width="14" height="12" rx="3" stroke="#60a5fa" strokeWidth="1.8" />
    <path d="M9 10h6m-6 4h4" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" />
    <circle cx="16" cy="14" r="1" fill="#38bdf8" />
  </svg>
);

// 13. LlamaIndex Workflows Logo
export const LlamaIndexLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#14532d" fillOpacity="0.4" stroke="#84cc16" strokeWidth="1.5" />
    <path d="M6 18V8a2 2 0 0 1 2-2h3l3 4h4a2 2 0 0 1 2 2v6" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="18" r="1.5" fill="#d9f99d" />
    <circle cx="17" cy="18" r="1.5" fill="#d9f99d" />
  </svg>
);

// 14. AutoGen / AG2 Logo
export const AutoGenLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#0c4a6e" fillOpacity="0.4" stroke="#0ea5e9" strokeWidth="1.5" />
    <circle cx="8" cy="8" r="2.5" stroke="#38bdf8" strokeWidth="1.8" />
    <circle cx="16" cy="8" r="2.5" stroke="#38bdf8" strokeWidth="1.8" />
    <circle cx="12" cy="16" r="2.5" stroke="#7dd3fc" strokeWidth="1.8" />
    <path d="M10 9.5l4 0M9 10.5l2 3.5m4-3.5l-2 3.5" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
  </svg>
);

// 15. Smolagents Logo
export const SmolagentsLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#78350f" fillOpacity="0.4" stroke="#f59e0b" strokeWidth="1.5" />
    <path d="M7 8l4 4-4 4" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13 16h4" stroke="#fde68a" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="17" cy="8" r="1.5" fill="#f59e0b" />
  </svg>
);

// 16. Agno Logo
export const AgnoLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#312e81" fillOpacity="0.5" stroke="#6366f1" strokeWidth="1.5" />
    <path d="M6 18L12 6L18 18" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8.5 13.5h7" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="11" r="1.5" fill="#c7d2fe" />
  </svg>
);

// 17. Spring AI Logo
export const SpringAILogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#14532d" fillOpacity="0.5" stroke="#22c55e" strokeWidth="1.5" />
    <path d="M6 16c4-1 10-5 12-10-5 2-9 8-12 10z" fill="#4ade80" fillOpacity="0.4" stroke="#4ade80" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="8" cy="14" r="1.5" fill="#86efac" />
  </svg>
);

// 18. DSPy Logo
export const DSPyLogo: React.FC<LogoProps> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="6" fill="#2e1065" fillOpacity="0.5" stroke="#a855f7" strokeWidth="1.5" />
    <path d="M6 6h6a6 6 0 0 1 0 12H6V6z" stroke="#c084fc" strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 12h5" stroke="#e9d5ff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AgentFrameworkLogoRenderer: React.FC<{ frameworkId: string; className?: string }> = ({
  frameworkId,
  className = "w-6 h-6"
}) => {
  switch (frameworkId) {
    case 'openai-agents-sdk':
      return <OpenAIAgentsLogo className={className} />;
    case 'google-adk':
      return <GoogleADKLogo className={className} />;
    case 'microsoft-agent-framework':
      return <MicrosoftAgentFrameworkLogo className={className} />;
    case 'langgraph':
      return <LangGraphLogo className={className} />;
    case 'langchain':
      return <LangChainLogo className={className} />;
    case 'aws-strands':
      return <AWSStrandsLogo className={className} />;
    case 'claude-agent-sdk':
      return <ClaudeAgentSDKLogo className={className} />;
    case 'crewai':
      return <CrewAILogo className={className} />;
    case 'pydanticai':
      return <PydanticAILogo className={className} />;
    case 'mastra':
      return <MastraLogo className={className} />;
    case 'vercel-ai-sdk':
      return <VercelAISDKLogo className={className} />;
    case 'eve':
      return <EveLogo className={className} />;
    case 'llamaindex-workflows':
      return <LlamaIndexLogo className={className} />;
    case 'autogen-ag2':
      return <AutoGenLogo className={className} />;
    case 'smolagents':
      return <SmolagentsLogo className={className} />;
    case 'agno':
      return <AgnoLogo className={className} />;
    case 'spring-ai':
      return <SpringAILogo className={className} />;
    case 'dspy':
      return <DSPyLogo className={className} />;
    default:
      return <OpenAIAgentsLogo className={className} />;
  }
};
