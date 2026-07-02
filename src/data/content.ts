export interface AIUpdate {
  id: string;
  title: string;
  category: 'Models' | 'Products' | 'Research' | 'Developer Tools' | 'Enterprise AI' | 'Startups';
  date: string;
  source: string;
  summary: string;
  url: string;
  readTime: string;
  tag: string;
}

export interface AILeader {
  id: string;
  name: string;
  logoColor: string; // Tailwind class
  shortDesc: string;
  keyProducts: string[];
  latestHighlights: string[];
  websiteUrl: string;
  docsUrl: string;
}

export interface LearningResource {
  id: string;
  company: string;
  toolName: string;
  description: string;
  useCase: string;
  category: 'API & Integration' | 'Developer Studio' | 'Models & Prompting' | 'Frameworks' | 'Infrastructure';
  docsUrl: string;
  learnUrl: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  duration: string;
  category: 'AI News' | 'GenAI Tools' | 'Tutorials' | 'Prompt Engineering' | 'Agentic AI' | 'Cloud + AI';
  publishDate: string;
  youtubeId: string; // for embedding
}

export const LATEST_UPDATES: AIUpdate[] = [
  {
    id: 'upd-1',
    title: 'Introducing Claude 3.7 Sonnet: Hybrid Thinking and Advanced Coding Capabilities',
    category: 'Models',
    date: 'June 18, 2026',
    source: 'Anthropic Blog',
    summary: 'Anthropic has launched Claude 3.7 Sonnet, their first model with custom hybrid reasoning. It allows developers to configure response budgets for deep step-by-step thinking or instant replies, setting new benchmarks in agentic execution and complex codebases.',
    url: 'https://www.anthropic.com/news/claude-3-7-sonnet',
    readTime: '4 min read',
    tag: 'Claude 3.7'
  },
  {
    id: 'upd-2',
    title: 'Gemini 2.0 Flash Now Available: Faster Inference, Multimodal Agentic Tools',
    category: 'Models',
    date: 'May 28, 2026',
    source: 'Google DeepMind',
    summary: 'Google released Gemini 2.0 Flash, optimized for speed and real-time multimodal interaction. Featuring built-in audio-to-audio streaming and native tool use, it represents a massive leap for real-time AI agents built on Google AI Studio.',
    url: 'https://deepmind.google/technologies/gemini/',
    readTime: '3 min read',
    tag: 'Gemini 2.0'
  },
  {
    id: 'upd-3',
    title: 'Model Context Protocol (MCP): The New Standard for Connecting AI to Data',
    category: 'Developer Tools',
    date: 'April 14, 2026',
    source: 'Open Source Initiative',
    summary: 'An open-source standard created to bridge the gap between LLMs and local/remote developer tools. MCP allows IDEs and AI clients to easily interface with secure servers providing database contexts, filesystem actions, and API executions.',
    url: 'https://modelcontextprotocol.org/',
    readTime: '6 min read',
    tag: 'MCP Standard'
  },
  {
    id: 'upd-4',
    title: 'Llama 4.0 Preview: Meta Teases Next-Gen Open Weights Architecture',
    category: 'Research',
    date: 'June 05, 2026',
    source: 'Meta AI',
    summary: 'Mark Zuckerberg announced initial pre-training details for Llama 4.0. Built on a hybrid architecture integrating dense attention and sparse mixtures, it aims to deliver frontier-class reasoning in an open-weights format.',
    url: 'https://ai.meta.com/llama/',
    readTime: '5 min read',
    tag: 'Llama 4'
  },
  {
    id: 'upd-5',
    title: 'OpenAI o3-mini Releases Internationally: Low-Latency Reasoning for Developers',
    category: 'Developer Tools',
    date: 'March 10, 2026',
    source: 'OpenAI Developer Docs',
    summary: 'OpenAI launched o3-mini, a cost-effective, high-speed reasoning model. It excels in math, science, and coding, making complex thinking accessible for programmatic workflows through developer APIs with fine-grained temperature controls.',
    url: 'https://openai.com/blog/openai-o3-mini',
    readTime: '4 min read',
    tag: 'o3-mini'
  },
  {
    id: 'upd-6',
    title: 'NVIDIA NIMs Accelerate Enterprise Deployment of Agentic Workflows',
    category: 'Enterprise AI',
    date: 'May 02, 2026',
    source: 'NVIDIA Newsroom',
    summary: 'NVIDIA announced expanding NIMs (Inference Microservices) to support real-time orchestration frameworks. Standardized containers optimized for TensorRT-LLM now support seamless orchestration on Kubernetes with minimal cold starts.',
    url: 'https://developer.nvidia.com/nims',
    readTime: '5 min read',
    tag: 'NVIDIA NIM'
  }
];

export const AI_LEADERS: AILeader[] = [
  {
    id: 'google',
    name: 'Google',
    logoColor: 'from-[#4285F4] to-[#34A853]',
    shortDesc: 'A pioneer in neural networks and transformer architecture, leading the transition to multimodal generative AI with the Gemini family and Vertex suite.',
    keyProducts: ['Gemini Models', 'Vertex AI', 'Google AI Studio', 'TensorFlow'],
    latestHighlights: [
      'Gemini 2.0 Flash integration into Workspace.',
      'Released Project Astra multimodal real-time assistant API.',
      'AlphaFold 3 open source release for biological structural modeling.'
    ],
    websiteUrl: 'https://ai.google/',
    docsUrl: 'https://ai.google/dev'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    logoColor: 'from-[#10a37f] to-[#0d7c60]',
    shortDesc: 'Leader in general artificial intelligence research and commercial APIs, known for GPT-4o, the o-series reasoning models, and the ChatGPT consumer ecosystem.',
    keyProducts: ['GPT-4o', 'o1 / o3-mini', 'DALL-E 3', 'OpenAI API Platform'],
    latestHighlights: [
      'Released o3-mini with developer reasoning speed controls.',
      'Advanced Voice API with camera spatial reasoning capabilities.',
      'Enterprise SearchGPT integration for real-time web querying.'
    ],
    websiteUrl: 'https://openai.com/',
    docsUrl: 'https://platform.openai.com/docs'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logoColor: 'from-[#D97706] to-[#B45309]',
    shortDesc: 'AI safety and research company focused on building steerable, reliable, and interpretable systems, famous for the Claude LLM series.',
    keyProducts: ['Claude 3.7 Sonnet', 'Claude 3.5 Opus', 'Developer Console', 'MCP (Model Context Protocol)'],
    latestHighlights: [
      'Launched Claude 3.7 Sonnet with native Hybrid reasoning.',
      'Released Model Context Protocol (MCP) as an open-source standard.',
      'Computer Use API allowing Claude to interact with OS interfaces directly.'
    ],
    websiteUrl: 'https://www.anthropic.com/',
    docsUrl: 'https://docs.anthropic.com/'
  },
  {
    id: 'meta',
    name: 'Meta',
    logoColor: 'from-[#0668E1] to-[#044B9E]',
    shortDesc: 'The champion of open-weights AI, driving collaboration and scaling accessibility globally through the Llama open model family and PyTorch.',
    keyProducts: ['Llama 3.1 & 3.2', 'PyTorch', 'Meta AI Assistant', 'Segment Anything'],
    latestHighlights: [
      'Released Llama 3.2 vision-language models for edge devices.',
      'Billion-parameter Llama models optimized for mobile NPU architectures.',
      'PyTorch 2.5 optimized for multi-node FP8 training routines.'
    ],
    websiteUrl: 'https://ai.meta.com/',
    docsUrl: 'https://llama.meta.com/'
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logoColor: 'from-[#00A4EF] to-[#0078D7]',
    shortDesc: 'Providing the cloud computing backbone for modern enterprise AI via Azure AI, Copilot, and their deep partnership with OpenAI.',
    keyProducts: ['Azure AI Studio', 'Microsoft Copilot', 'Semantic Kernel', 'Phi-3 Small Models'],
    latestHighlights: [
      'Azure AI Studio integration of multi-agent orchestration tools.',
      'Released Phi-3.5 silicon-optimized reasoning model series.',
      'Copilot Studio updates for background autonomous operations.'
    ],
    websiteUrl: 'https://www.microsoft.com/ai',
    docsUrl: 'https://learn.microsoft.com/azure/ai-services/'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    logoColor: 'from-[#76B900] to-[#5C9000]',
    shortDesc: 'The infrastructure engine of the AI revolution, designing advanced H100/Blackwell GPUs and software stacks like CUDA and NIM microservices.',
    keyProducts: ['Blackwell Architecture', 'CUDA Toolkit', 'NVIDIA NIM', 'Omniverse'],
    latestHighlights: [
      'Blackwell B200 GPUs in full volume production and deployment.',
      'Expanded NIM catalog for biology, chemistry, and industrial agents.',
      'CUDA 12.8 with advanced matrix core compiler optimization.'
    ],
    websiteUrl: 'https://www.nvidia.com/ai',
    docsUrl: 'https://developer.nvidia.com/'
  },
  {
    id: 'amazon',
    name: 'Amazon Web Services',
    logoColor: 'from-[#FF9900] to-[#CC7A00]',
    shortDesc: 'Empowering builders to choice-drive their AI deployments with Bedrock, offering secure access to models from Anthropic, Cohere, Meta, and Amazon.',
    keyProducts: ['Amazon Bedrock', 'SageMaker', 'Amazon Q Developer', 'Titan Models'],
    latestHighlights: [
      'Amazon Bedrock added real-time guardrails for Agentic loops.',
      'Amazon Q Developer integrated inside VS Code with local agent support.',
      'SageMaker HyperPod clusters optimized for custom Llama pre-training.'
    ],
    websiteUrl: 'https://aws.amazon.com/ai/',
    docsUrl: 'https://docs.aws.amazon.com/bedrock/'
  },
  {
    id: 'apple',
    name: 'Apple',
    logoColor: 'from-[#6B7280] to-[#374151]',
    shortDesc: 'Fusing on-device intelligence with security. Designing custom silicon and local vision-language systems under Apple Intelligence.',
    keyProducts: ['Apple Intelligence', 'Core ML', 'Swift Student AI Tools', 'Axel Model Library'],
    latestHighlights: [
      'Released Private Cloud Compute security auditing blueprints.',
      'Core ML 8 support for 4-bit weight compression and fast NPU compiling.',
      'Integrated System Writing Tools with native developer SDK extensions.'
    ],
    websiteUrl: 'https://www.apple.com/apple-intelligence/',
    docsUrl: 'https://developer.apple.com/machine-learning/'
  },
  {
    id: 'xai',
    name: 'xAI',
    logoColor: 'from-[#111827] to-[#1F2937]',
    shortDesc: 'Focused on building AI that understands the universe, integrating real-time information from X (Twitter) into the Grok model family.',
    keyProducts: ['Grok 2', 'Grok 3 (Colossus Beta)', 'xAI API', 'PromptIDE'],
    latestHighlights: [
      'Grok 3 training completed at Memphis Colossus 100k liquid-cooled cluster.',
      'xAI API launched with image input and system instruction support.',
      'Integrated real-time query routing algorithms with high fact-indexing.'
    ],
    websiteUrl: 'https://x.ai/',
    docsUrl: 'https://api.x.ai/'
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    logoColor: 'from-[#F97316] to-[#C2410C]',
    shortDesc: 'European champion of generative AI, crafting lightweight, highly customizable, and open-weights models optimized for high-density servers.',
    keyProducts: ['Mistral Large 2', 'Codestral', 'Pixtral', 'La Plateforme API'],
    latestHighlights: [
      'Codestral Mamba released for state-space coding performance.',
      'Pixtral 12B multi-modal model with native high-res document scanning.',
      'Mistral Large 2 API pricing reduced by 30% for batch pipelines.'
    ],
    websiteUrl: 'https://mistral.ai/',
    docsUrl: 'https://docs.mistral.ai/'
  }
];

export const LEARNING_RESOURCES: LearningResource[] = [
  {
    id: 'res-1',
    company: 'Anthropic',
    toolName: 'Claude API Platform',
    description: 'Integrate Claude models into applications. Features system prompts, vision inputs, tooling schemas, and token tracking.',
    useCase: 'Semantic search, agentic tools, customer automation',
    category: 'API & Integration',
    docsUrl: 'https://docs.anthropic.com/en/api/getting-started',
    learnUrl: 'https://github.com/anthropics/anthropic-cookbook'
  },
  {
    id: 'res-2',
    company: 'Anthropic',
    toolName: 'Prompt Engineering Guide',
    description: 'Official methodology for instructing Claude models. Details XML tag formatting, pre-filling, chain-of-thought, and shot-examples.',
    useCase: 'Optimizing model precision and reducing system drift',
    category: 'Models & Prompting',
    docsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering',
    learnUrl: 'https://github.com/anthropics/prompt-engineering-interactive-tutorial'
  },
  {
    id: 'res-3',
    company: 'Google',
    toolName: 'Google AI Studio',
    description: 'A web-based prototyping environment for developers. Fast key creation, prompt testing, and direct code exporter for Python/JavaScript.',
    useCase: 'Rapid prototyping of Gemini prompts and lightweight integrations',
    category: 'Developer Studio',
    docsUrl: 'https://ai.google.dev/gemini-api/docs',
    learnUrl: 'https://ai.google.dev/tutorials'
  },
  {
    id: 'res-4',
    company: 'Google',
    toolName: 'Vertex AI Platform',
    description: 'Enterprise grade ML environment to tune, deploy, and evaluate Gemini and open foundation models inside Google Cloud.',
    useCase: 'Enterprise model fine-tuning, vector indexes, and secure pipelines',
    category: 'Infrastructure',
    docsUrl: 'https://cloud.google.com/vertex-ai/docs',
    learnUrl: 'https://cloud.google.com/vertex-ai/docs/training/overview'
  },
  {
    id: 'res-5',
    company: 'Microsoft',
    toolName: 'Semantic Kernel',
    description: 'An open-source SDK that easily integrates large models with traditional programming languages like C#, Python, and Java.',
    useCase: 'Building enterprise agents, plugins, and custom application memory',
    category: 'Frameworks',
    docsUrl: 'https://learn.microsoft.com/semantic-kernel/',
    learnUrl: 'https://github.com/microsoft/semantic-kernel'
  },
  {
    id: 'res-6',
    company: 'Microsoft',
    toolName: 'Azure AI Studio',
    description: 'Central workspace to configure, build, and deploy intelligent agents. Includes safety filters and dataset comparisons.',
    useCase: 'Deploying secure copilots with enterprise data governance',
    category: 'Developer Studio',
    docsUrl: 'https://learn.microsoft.com/azure/ai-studio/',
    learnUrl: 'https://learn.microsoft.com/training/paths/build-ai-solutions-azure/'
  },
  {
    id: 'res-7',
    company: 'Amazon',
    toolName: 'AWS Bedrock Developer Guide',
    description: 'Fully managed service that makes foundation models from leading AI companies available via a single API.',
    useCase: 'Serverless model deployment, multi-model pipelines, custom guardrails',
    category: 'Infrastructure',
    docsUrl: 'https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html',
    learnUrl: 'https://aws.amazon.com/bedrock/tutorials/'
  },
  {
    id: 'res-8',
    company: 'Meta',
    toolName: 'Llama Recipe Cookbook',
    description: 'Reference implementations, scripts, and Jupyter notebooks showing how to fine-tune Llama models using PEFT, LoRA, and FSDP.',
    useCase: 'Local model hosting, fine-tuning for domain-specific metrics',
    category: 'Models & Prompting',
    docsUrl: 'https://llama.meta.com/docs/get-started/',
    learnUrl: 'https://github.com/meta-llama/llama-recipes'
  },
  {
    id: 'res-9',
    company: 'OpenAI',
    toolName: 'Assistants API',
    description: 'Build agentic assistants capable of running Python code in sandboxes, search documents, and calling custom client functions.',
    useCase: 'Creating interactive code editors, file parsers, and custom chat assistants',
    category: 'API & Integration',
    docsUrl: 'https://platform.openai.com/docs/assistants/overview',
    learnUrl: 'https://github.com/openai/openai-cookbook'
  },
  {
    id: 'res-10',
    company: 'NVIDIA',
    toolName: 'NVIDIA NIM (Inference Microservices)',
    description: 'Set of easy-to-use microservices designed to accelerate the deployment of generative AI models across cloud, data center, and workstation.',
    useCase: 'High-performance model inference, local containerized LLM pipelines',
    category: 'Infrastructure',
    docsUrl: 'https://docs.nvidia.com/nim/',
    learnUrl: 'https://learn.nvidia.com/'
  }
];

export const YOUTUBE_VIDEOS: YouTubeVideo[] = [
  {
    id: 'yt-1',
    title: "TechTonic AI: Let's Explore Future Together",
    duration: '2:15',
    category: 'AI News',
    publishDate: 'Just now',
    youtubeId: '9KYszGau1Kc'
  }
];

export const TRENDING_TOPICS = [
  'LLMs',
  'RAG',
  'Agentic AI',
  'MCP',
  'Prompt Engineering',
  'AI Coding Tools',
  'AI Infrastructure',
  'Open Source Models',
  'Cloud AI',
  'AI Automation',
  'Vector Databases',
  'Multimodal AI'
];
