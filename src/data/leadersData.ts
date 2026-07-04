export interface AILeaderData {
  id: string;
  name: string;
  logoColor: string;
  overview: string;
  corePlatforms: string[];
  officialSite: string;
  docsUrl: string;
  blogUrl: string;
  githubUrl: string;
}

export const LEADER_PROFILES: AILeaderData[] = [
  {
    id: 'google',
    name: 'Google / DeepMind',
    logoColor: 'from-[#4285F4] to-[#34A853]',
    overview: 'A global research pioneer responsible for the original Transformer architecture, AlphaFold, and leading multimodal models. Google is driving the transition to agentic AI through its Gemini family and Vertex AI developer suite.',
    corePlatforms: ['Gemini 2.0 Flash / Pro (2026)', 'Gemini 1.5 Pro / Flash (2024)', 'Gemini 1.0 Ultra / Pro (2023)', 'Vertex AI Studio & JAX Compute'],
    officialSite: 'https://ai.google/',
    docsUrl: 'https://ai.google/dev',
    blogUrl: 'https://deepmind.google/blog',
    githubUrl: 'https://github.com/google'
  },
  {
    id: 'openai',
    name: 'OpenAI',
    logoColor: 'from-[#10a37f] to-[#0d7c60]',
    overview: 'The pioneer of modern consumer GenAI with ChatGPT. OpenAI leads in general intelligence research and commercial developer API deployment, focusing on high-speed reasoning models and advanced voice modalities.',
    corePlatforms: ['o3-mini / o1 Reasoning (2025/2026)', 'GPT-4o & GPT-4o-mini (2024)', 'GPT-4 / GPT-3.5 Turbo (2023)', 'DALL-E 3 / Sora Video APIs'],
    officialSite: 'https://openai.com/',
    docsUrl: 'https://platform.openai.com/docs',
    blogUrl: 'https://openai.com/blog',
    githubUrl: 'https://github.com/openai'
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    logoColor: 'from-[#D97706] to-[#B45309]',
    overview: 'An AI safety and research company known for building Claude, a highly steerable and context-aware LLM. Anthropic is the creator of the Model Context Protocol (MCP) standard, enabling seamless tool integrations.',
    corePlatforms: ['Claude 3.7 Sonnet (Hybrid Thinking, 2026)', 'Fable 5 / Mythos Reasoning (2026)', 'Claude 3.5 Sonnet / Opus (2024)', 'Claude 3 / Model Context Protocol (MCP)'],
    officialSite: 'https://www.anthropic.com/',
    docsUrl: 'https://docs.anthropic.com/',
    blogUrl: 'https://www.anthropic.com/news',
    githubUrl: 'https://github.com/modelcontextprotocol'
  },
  {
    id: 'meta',
    name: 'Meta AI',
    logoColor: 'from-[#0668E1] to-[#044B9E]',
    overview: 'The global champion of open-weights AI, driving open research collaboration. Meta distributes the Llama model family, PyTorch machine learning library, and advanced computer vision models like Segment Anything.',
    corePlatforms: ['Llama 3.2 Vision / Mobile (2024)', 'Llama 3.1 Open Weights (2024)', 'Llama 3 / Llama 2 (2024/2023)', 'PyTorch & Segment Anything (SAM)'],
    officialSite: 'https://ai.meta.com/',
    docsUrl: 'https://llama.meta.com/',
    blogUrl: 'https://ai.meta.com/blog/',
    githubUrl: 'https://github.com/facebookresearch'
  },
  {
    id: 'microsoft',
    name: 'Microsoft AI',
    logoColor: 'from-[#00A4EF] to-[#0078D7]',
    overview: 'The enterprise deployment backbone of modern generative AI, combining their Azure cloud fabric with OpenAI partnerships. Microsoft builds native Copilots and small-language models (Phi series) for edge runtimes.',
    corePlatforms: ['Phi-3.5 Small Models (Reasoning, 2024)', 'Phi-3 / Phi-2 Models (2024/2023)', 'Azure AI Studio / Copilot Hub', 'Semantic Kernel Orchestration'],
    officialSite: 'https://www.microsoft.com/ai',
    docsUrl: 'https://learn.microsoft.com/azure/ai-services/',
    blogUrl: 'https://blogs.microsoft.com/ai/',
    githubUrl: 'https://github.com/microsoft'
  },
  {
    id: 'nvidia',
    name: 'Nvidia AI',
    logoColor: 'from-[#76B900] to-[#5C9000]',
    overview: 'The hardware engine and software compute stack powering the global AI revolution. NVIDIA designs Blackwell/Hopper GPUs and develops the CUDA framework alongside NIM microservices for seamless deployment containerization.',
    corePlatforms: ['NVIDIA Blackwell GPUs (2025/2026)', 'Hopper H200 / H100 GPUs (2023/2022)', 'NVIDIA NIM (Inference Microservices)', 'CUDA & TensorRT-LLM Software'],
    officialSite: 'https://www.nvidia.com/ai',
    docsUrl: 'https://developer.nvidia.com/',
    blogUrl: 'https://blogs.nvidia.com/blog/category/deep-learning/',
    githubUrl: 'https://github.com/NVIDIA'
  },
  {
    id: 'amazon',
    name: 'Amazon Web Services',
    logoColor: 'from-[#FF9900] to-[#CC7A00]',
    overview: 'AWS empowers builders by providing serverless choice-driven model catalogs (Bedrock) alongside custom AI silicon chips (Trainium, Inferentia) for cost-optimized LLM scaling.',
    corePlatforms: ['Amazon Bedrock & Q Developer (2024)', 'Titan Multimodal Models (2024/2023)', 'AWS Trainium2 / Inferentia2 custom chips', 'Amazon SageMaker AI Studio Platform'],
    officialSite: 'https://aws.amazon.com/ai/',
    docsUrl: 'https://docs.aws.amazon.com/bedrock/',
    blogUrl: 'https://aws.amazon.com/blogs/machine-learning/',
    githubUrl: 'https://github.com/aws'
  },
  {
    id: 'apple',
    name: 'Apple',
    logoColor: 'from-[#6B7280] to-[#374151]',
    overview: 'Fusing on-device intelligence with security. Apple designs custom mobile neural engines and local vision-language systems under Apple Intelligence.',
    corePlatforms: ['Apple Intelligence Suite (2025/2026)', 'Core ML 8 / Swift Student AI', 'Axel Model Library & OpenELM', 'Private Cloud Compute Architecture'],
    officialSite: 'https://www.apple.com/apple-intelligence/',
    docsUrl: 'https://developer.apple.com/machine-learning/',
    blogUrl: 'https://developer.apple.com/news/',
    githubUrl: 'https://github.com/apple'
  },
  {
    id: 'xai',
    name: 'xAI',
    logoColor: 'from-[#111827] to-[#1F2937]',
    overview: 'Focused on building AI that understands the universe, integrating real-time information from X (Twitter) into the Grok model family.',
    corePlatforms: ['Grok 3 (Colossus Beta, 2026)', 'Grok 2 (Real-Time Search, 2024)', 'Grok 1.5 Vision / Text (2024)', 'xAI PromptIDE & API Access'],
    officialSite: 'https://x.ai/',
    docsUrl: 'https://api.x.ai/',
    blogUrl: 'https://x.ai/blog',
    githubUrl: 'https://github.com/xai-org'
  },
  {
    id: 'mistral',
    name: 'Mistral AI',
    logoColor: 'from-[#F97316] to-[#C2410C]',
    overview: 'European champion of generative AI, crafting lightweight, highly customizable, and open-weights models optimized for high-density servers.',
    corePlatforms: ['Pixtral 12B Multimodal (2024)', 'Codestral Mamba Coding (2024)', 'Mistral Large 2 / NeMo (2024)', 'Mixtral 8x22B / 8x7B MoE (2024/2023)'],
    officialSite: 'https://mistral.ai/',
    docsUrl: 'https://docs.mistral.ai/',
    blogUrl: 'https://mistral.ai/news/',
    githubUrl: 'https://github.com/mistralai'
  },
  {
    id: 'ibm',
    name: 'IBM Watsonx',
    logoColor: 'from-[#0f62fe] to-[#002d9c]',
    overview: 'A leading provider of enterprise hybrid-cloud AI, offering watsonx for data cleaning, model training, policy compliance governance, and targeted model fine-tuning.',
    corePlatforms: ['Granite 3.0 Open Code Models (2024)', 'watsonx.ai (Model Studio)', 'watsonx.data (Lakehouse Store)', 'watsonx.governance (Compliance Policy)'],
    officialSite: 'https://www.ibm.com/watsonx',
    docsUrl: 'https://www.ibm.com/docs/en/watsonx',
    blogUrl: 'https://www.ibm.com/blog/category/artificial-intelligence/',
    githubUrl: 'https://github.com/IBM'
  },
  {
    id: 'scale',
    name: 'Scale AI',
    logoColor: 'from-[#000000] to-[#27272a]',
    overview: 'The data foundry for AI development, providing high-quality labeling, reinforcement learning with human feedback (RLHF), and evaluation datasets to train frontier models.',
    corePlatforms: ['Scale GenAI Platform (2024)', 'Scale Data Engine (Labeling/RLHF)', 'Scale Donovan (Defense/Gov AI)', 'Scale Forge (Dataset Curation)'],
    officialSite: 'https://scale.com',
    docsUrl: 'https://dashboard.scale.com/desc/api',
    blogUrl: 'https://scale.com/blog',
    githubUrl: 'https://github.com/scaleapi'
  },
  {
    id: 'cohere',
    name: 'Cohere',
    logoColor: 'from-[#3B82F6] to-[#1D4ED8]',
    overview: 'Enterprise-focused foundation models optimized for semantic search, multilingual retrieval, agentic tool-use, and retrieval-augmented generation (RAG) tasks.',
    corePlatforms: ['Command R+ (RAG-Optimized, 2024)', 'Command R (Agentic Tool-Use, 2024)', 'Cohere Embed / Rerank v3 (2024)', 'Cohere Tool-Use & Multilingual Platform'],
    officialSite: 'https://cohere.com',
    docsUrl: 'https://docs.cohere.com',
    blogUrl: 'https://cohere.com/blog',
    githubUrl: 'https://github.com/cohere-ai'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    logoColor: 'from-[#FBBF24] to-[#F59E0B]',
    overview: 'The central hub for open-weights AI models, datasets, and collaborative app demonstrations (Spaces). Hugging Face maintains standard libraries like Transformers, Diffusers, and datasets.',
    corePlatforms: ['HF Model Hub & Datasets (2026)', 'HF Spaces (Interactive Demos)', 'Transformers & Diffusers Libraries', 'GGUF / TGI (Inference Engine)'],
    officialSite: 'https://huggingface.co',
    docsUrl: 'https://huggingface.co/docs',
    blogUrl: 'https://huggingface.co/blog',
    githubUrl: 'https://github.com/huggingface'
  }
];
