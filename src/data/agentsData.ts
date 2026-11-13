export interface AIAgent {
  id: string;
  name: string;
  tagline: string;
  category: 'open-source' | 'managed-cloud';
  categoryLabel: string;
  developer: string;
  license: string;
  badge: string;
  description: string;
  overview: string;
  features: string[];
  keySpecs: {
    interface: string;
    hosting: string;
    modelSupport: string;
    targetAudience: string;
  };
  websiteUrl: string;
  docsUrl: string;
  githubUrl?: string;
  status: 'Production' | 'Active Release' | 'General Availability';
  accentColor: string; // for glowing borders and tags
  gradient: string;
}

export const AI_AGENTS: AIAgent[] = [
  // --- OPEN SOURCE AGENTS ---
  {
    id: 'openclaw',
    name: 'OpenClaw',
    tagline: 'The open-source, local-first autonomous assistant that really does things',
    category: 'open-source',
    categoryLabel: 'Open Source',
    developer: 'OpenClaw Community',
    license: 'MIT License',
    badge: 'Self-Hosted & Privacy First',
    description: 'An open-source, local-first autonomous AI assistant framework that integrates directly into everyday messaging apps (WhatsApp, Telegram, Signal, Discord) to control local files, execute custom scripts, and automate background routines without sending private data to corporate cloud silos.',
    overview: 'OpenClaw operates with a local heartbeat scheduler that wakes up proactively to perform scheduled tasks, manage calendars, organize files, and monitor incoming streams. It stores user context and memory as transparent Markdown files on disk.',
    features: [
      'Runs locally on your Mac, Windows, Linux, or private VPS',
      'Direct messenger integrations: Telegram, WhatsApp, Discord, Signal, and TUI/Web UI',
      'Proactive heartbeat cron-like scheduler for unprompted autonomous actions',
      'Modular plugin/skill format for custom bash/python shell scripts and browser automation',
      'Zero corporate lock-in: use any LLM backend (local Ollama, vLLM, or commercial APIs)'
    ],
    keySpecs: {
      interface: 'WhatsApp, Telegram, Discord, Signal, Web UI, CLI',
      hosting: 'Local hardware, Docker, Private VPS',
      modelSupport: 'Ollama, vLLM, OpenRouter, OpenAI, Anthropic, Gemini',
      targetAudience: 'Developers, power users, and privacy-conscious enthusiasts'
    },
    websiteUrl: 'https://openclaw.ai',
    docsUrl: 'https://docs.openclaw.ai',
    githubUrl: 'https://github.com/openclaw/openclaw',
    status: 'General Availability',
    accentColor: '#06b6d4',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent'
  },
  {
    id: 'hermes-agent',
    name: 'Hermes Agent',
    tagline: 'Self-improving autonomous agent with adaptive memory and organic skill generation',
    category: 'open-source',
    categoryLabel: 'Open Source',
    developer: 'Nous Research',
    license: 'Open Source (Apache 2.0 / MIT)',
    badge: 'Self-Improving Cognitive Loop',
    description: 'An open-source autonomous agent framework engineered by Nous Research with a deep emphasis on continuous cognitive growth, long-term memory synthesis, and dynamic creation of new skills on the fly from past task experience.',
    overview: 'Hermes Agent is built to evolve. As it solves tasks, it reflects on its steps, compiles successful solutions into reusable tools, and refines its internal knowledge base so it gets measurably smarter over repeated interactions.',
    features: [
      'Built-in self-improvement loop: synthesizes new tools and skills from experience',
      'Dynamic multi-model routing: dynamically dispatches reasoning vs execution steps',
      'Proactive scheduled workflows and background monitoring routines',
      'Persistent associative memory graphs that retain multi-session context',
      'Companion desktop, Android mobile, and terminal interfaces'
    ],
    keySpecs: {
      interface: 'Web Dashboard, Desktop App, Android Mobile, Telegram, CLI',
      hosting: 'Self-hosted (Docker, VPS, Local environment)',
      modelSupport: 'Nous Hermes series, OpenRouter, Local Ollama, DeepSeek',
      targetAudience: 'AI researchers, autonomous agent builders, and advanced engineers'
    },
    websiteUrl: 'https://hermes-agent.nousresearch.com/',
    docsUrl: 'https://hermes-agent.nousresearch.com/',
    githubUrl: 'https://github.com/NousResearch/hermes-agent',
    status: 'Active Release',
    accentColor: '#10b981',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },

  // --- MANAGED CLOUD AGENTS ---
  {
    id: 'dots',
    name: 'Dots',
    tagline: 'Always-on enterprise autonomous agents running in dedicated cloud computers',
    category: 'managed-cloud',
    categoryLabel: 'Managed Cloud',
    developer: 'OpenAI',
    license: 'Proprietary Cloud Platform',
    badge: 'Enterprise Cloud Coworker',
    description: 'OpenAI’s enterprise-grade autonomous agent ecosystem. Each "dot" functions as an independent, always-on digital coworker equipped with its own dedicated cloud computing environment, secure browser, and native workspace integrations.',
    overview: 'Dots shifts AI from a reactive conversation window into a proactive team member that participates in Slack and Microsoft Teams channels, monitors email inboxes, compiles research reports, and automates multi-step business operations across 4,000+ app connectors.',
    features: [
      'Dedicated cloud computer & headless browser per agent for secure sandboxed execution',
      'Native Slack, Microsoft Teams, and ChatGPT enterprise workspace integrations',
      'Ecosystem of 4,000+ business application connectors and API plugins',
      'Autonomous multi-turn goal pursuit with checkpointed recovery and human-in-the-loop approvals',
      'Powered by OpenAI frontier agentic models (GPT-5 / GPT-6 series)'
    ],
    keySpecs: {
      interface: 'Slack, Microsoft Teams, Web Console, ChatGPT Enterprise',
      hosting: 'OpenAI Managed Cloud (SOC2 / Enterprise Compliance)',
      modelSupport: 'OpenAI Frontier Multi-modal & Agentic Models',
      targetAudience: 'Enterprise teams, knowledge workers, and product organizations'
    },
    websiteUrl: 'https://chatgpt.com',
    docsUrl: 'https://openai.com/index/introducing-dots/',
    status: 'Production',
    accentColor: '#10b981',
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-transparent'
  },
  {
    id: 'grok-bots',
    name: 'Grok Bots',
    tagline: 'Autonomous AI teammates built for real work, recurring routines, and cloud automation',
    category: 'managed-cloud',
    categoryLabel: 'Managed Cloud',
    developer: 'xAI',
    license: 'Proprietary Cloud Platform',
    badge: 'Turnkey Cloud Workspaces',
    description: 'xAI’s autonomous digital teammates and workflow automation platform. Designed to offer a zero-setup, turnkey alternative to complex agent frameworks, Grok Bots live in shared cloud computers to execute real work, routines, and multi-agent tasks.',
    overview: 'With features like "Teach Task" and persistent "Routines", users can demonstrate complex digital workflows once, and the Grok Bot will execute them autonomously on a schedule or trigger, collaborating with other bots across shared cloud computing sessions.',
    features: [
      'Shared cloud computer environments where multiple specialized bots collaborate',
      '"Teach Task" record-and-replay workflow automation for repetitive chores',
      'Persistent scheduled routines and proactive milestone notifications',
      'Cross-platform support: macOS, Windows desktop apps, iOS, and Web Cloud',
      'Instant migration tools to import configurations from other agent formats'
    ],
    keySpecs: {
      interface: 'Desktop App (macOS/Windows), iOS Mobile, Web Cloud Console',
      hosting: 'xAI Managed Cloud Infrastructure',
      modelSupport: 'Grok-3 / Grok Vision / xAI Native Engine',
      targetAudience: 'Professionals, business owners, and tech leaders seeking out-of-the-box convenience'
    },
    websiteUrl: 'https://grok.com',
    docsUrl: 'https://docs.x.ai',
    status: 'Production',
    accentColor: '#f59e0b',
    gradient: 'from-amber-500/20 via-orange-500/10 to-transparent'
  },
  {
    id: 'muse',
    name: 'Muse',
    tagline: 'Meta’s proactive life-admin and multi-bot coordination agent ecosystem',
    category: 'managed-cloud',
    categoryLabel: 'Managed Cloud',
    developer: 'Meta',
    license: 'Proprietary Cloud Ecosystem',
    badge: 'Personal & Life-Admin Orchestrator',
    description: 'Meta’s flagship autonomous consumer agent. Muse is engineered to solve everyday "life-admin" friction—organizing schedules, triaging communications, coordinating between multiple specialized bots, and proactively monitoring personal workflows.',
    overview: 'Muse coordinates across Meta’s family of applications and smart hardware devices. It functions as an executive personal assistant that proactively prepares morning briefings, manages appointments, and orchestrates specialized bots (like Muse Spark and Muse Code) for diverse tasks.',
    features: [
      'Proactive life-admin orchestration: calendar synchronization, flight tracking, and inbox summaries',
      'Multi-bot coordination: delegates specialized creative, coding, or analytical tasks to subordinate bots',
      'Seamless multi-platform presence across Meta devices, WhatsApp, and Web',
      'Context-aware proactive alerts that notify you before potential scheduling bottlenecks occur',
      'Deep integration with Meta Model API and open Llama-family architectures'
    ],
    keySpecs: {
      interface: 'Meta.ai Web, WhatsApp, Messenger, Ray-Ban Meta Smart Glasses',
      hosting: 'Meta Global Hyperscale Cloud',
      modelSupport: 'Meta Llama 4 / Muse Model Series (Spark, Wonder, Ember)',
      targetAudience: 'Everyday consumers, busy professionals, and creative individuals'
    },
    websiteUrl: 'https://meta.ai',
    docsUrl: 'https://dev.meta.ai',
    status: 'Production',
    accentColor: '#8b5cf6',
    gradient: 'from-purple-500/20 via-blue-500/10 to-transparent'
  }
];
