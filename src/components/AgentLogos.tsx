import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Official Logos Configuration with primary image URLs & local fallbacks
 */
export const OFFICIAL_LOGOS: Record<string, {
  name: string;
  imgUrl: string;
  fallbackUrl: string;
  bgGradient: string;
  borderColor: string;
}> = {
  'openclaw': {
    name: 'OpenClaw',
    imgUrl: 'https://avatars.githubusercontent.com/u/252820863?s=200&v=4',
    fallbackUrl: '/logos/openclaw.svg',
    bgGradient: 'from-orange-950/60 to-slate-900',
    borderColor: 'border-orange-500/40'
  },
  'hermes-agent': {
    name: 'Hermes Agent (Nous Research)',
    imgUrl: 'https://avatars.githubusercontent.com/u/134168893?s=280&v=4',
    fallbackUrl: '/logos/hermes.svg',
    bgGradient: 'from-emerald-950/60 to-slate-900',
    borderColor: 'border-emerald-500/40'
  },
  'dots': {
    name: 'Dots (OpenAI)',
    imgUrl: '/logos/openai.png',
    fallbackUrl: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-svg/icons/openai.svg',
    bgGradient: 'from-emerald-950/60 to-slate-900',
    borderColor: 'border-emerald-500/40'
  },
  'grok-bots': {
    name: 'Grok Bots (xAI)',
    imgUrl: '/logos/grok.svg',
    fallbackUrl: 'https://cdn.jsdelivr.com/npm/@lobehub/icons-static-svg@latest/icons/grok.svg',
    bgGradient: 'from-zinc-900 to-black',
    borderColor: 'border-amber-500/40'
  },
  'muse': {
    name: 'Muse (Meta)',
    imgUrl: '/logos/meta.png',
    fallbackUrl: 'https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-svg/icons/meta.svg',
    bgGradient: 'from-purple-950/60 to-slate-900',
    borderColor: 'border-purple-500/40'
  }
};

/**
 * Universal Official Agent Logo Component with automatic image error fallback
 */
export const AgentLogoRenderer: React.FC<{ 
  agentId: string; 
  className?: string; 
  rounded?: string;
}> = ({ 
  agentId, 
  className = "w-16 h-16",
  rounded = "rounded-2xl"
}) => {
  const config = OFFICIAL_LOGOS[agentId];
  const [currentSrc, setCurrentSrc] = useState(config?.imgUrl || '/logos/openai.png');

  if (!config) {
    return (
      <div className={`${className} ${rounded} bg-brand-gold/20 flex items-center justify-center text-brand-gold font-bold`}>
        AI
      </div>
    );
  }

  return (
    <div className={`relative ${className} ${rounded} p-2 bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} shadow-xl flex items-center justify-center overflow-hidden shrink-0`}>
      <img
        src={currentSrc}
        alt={`${config.name} Official Logo`}
        className="w-full h-full object-contain drop-shadow-md transition-transform hover:scale-105 duration-200"
        loading="lazy"
        onError={() => {
          if (currentSrc !== config.fallbackUrl) {
            setCurrentSrc(config.fallbackUrl);
          }
        }}
      />
    </div>
  );
};

// Miniature Icons for dropdown menus & inline references
export const OpenClawLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <AgentLogoRenderer agentId="openclaw" className={className} rounded="rounded-lg" />
);

export const HermesAgentLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <AgentLogoRenderer agentId="hermes-agent" className={className} rounded="rounded-lg" />
);

export const DotsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <AgentLogoRenderer agentId="dots" className={className} rounded="rounded-lg" />
);

export const GrokBotsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <AgentLogoRenderer agentId="grok-bots" className={className} rounded="rounded-lg" />
);

export const MuseLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <AgentLogoRenderer agentId="muse" className={className} rounded="rounded-lg" />
);
