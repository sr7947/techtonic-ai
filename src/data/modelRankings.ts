export interface RankingItem {
  id: string;
  rank: number;
  model: string;
  creator: string;
  creatorLogo?: string;
  openWeights: boolean;
  primaryMetric: {
    label: string;
    value: string;
    numeric: number;
  };
  secondaryMetric?: {
    label: string;
    value: string;
  };
  costMetric?: {
    label: string;
    value: string;
  };
  speedMetric?: {
    label: string;
    value: string;
  };
  contextWindow?: string;
  artificialAnalysisUrl: string;
  badges?: string[];
  description?: string;
}

export type ModalityCategory = 'llm' | 'image' | 'video' | 'speech';

export interface SubCategoryConfig {
  id: string;
  label: string;
  description: string;
  sourceUrl: string;
  primaryMetricLabel: string;
  items: RankingItem[];
}

export interface ModalityConfig {
  id: ModalityCategory;
  label: string;
  description: string;
  sourceUrl: string;
  subcategories: Record<string, SubCategoryConfig>;
}

export const MODEL_RANKINGS_DATA: Record<ModalityCategory, ModalityConfig> = {
  llm: {
    id: 'llm',
    label: 'LLM (Language Models)',
    description: 'Independent quality, speed, and pricing benchmarks across frontier and open-weights Large Language Models.',
    sourceUrl: 'https://artificialanalysis.ai/',
    subcategories: {
      intelligence: {
        id: 'intelligence',
        label: 'Intelligence (Quality)',
        description: 'Composite Intelligence Index tracking coding, mathematics, reasoning, and knowledge evaluation.',
        sourceUrl: 'https://artificialanalysis.ai/#intelligence',
        primaryMetricLabel: 'Quality Index',
        items: [
          {
            id: 'claude-3-7-sonnet',
            rank: 1,
            model: 'Claude 3.7 Sonnet (Hybrid Reasoning)',
            creator: 'Anthropic',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '92.4', numeric: 92.4 },
            secondaryMetric: { label: 'GPQA Diamond', value: '68.4%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$3.00 / $15.00' },
            speedMetric: { label: 'Output Speed', value: '78 tok/s' },
            contextWindow: '200k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-3-7-sonnet',
            badges: ['#1 Frontier', 'Hybrid Reasoning']
          },
          {
            id: 'gpt-4-5',
            rank: 2,
            model: 'GPT-4.5 (Orion)',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '91.8', numeric: 91.8 },
            secondaryMetric: { label: 'MMLU-Pro', value: '82.6%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$75.00 / $150.00' },
            speedMetric: { label: 'Output Speed', value: '45 tok/s' },
            contextWindow: '128k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gpt-4-5',
            badges: ['Top Knowledge']
          },
          {
            id: 'deepseek-r1',
            rank: 3,
            model: 'DeepSeek-R1 (Full 671B)',
            creator: 'DeepSeek',
            creatorLogo: 'https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/figures/logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Quality Index', value: '91.2', numeric: 91.2 },
            secondaryMetric: { label: 'MATH 500', value: '97.3%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$0.55 / $2.19' },
            speedMetric: { label: 'Output Speed', value: '48 tok/s' },
            contextWindow: '128k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/deepseek-r1',
            badges: ['#1 Open Weights', 'STEM Reasoning']
          },
          {
            id: 'gemini-2-flash-thinking',
            rank: 4,
            model: 'Gemini 2.0 Flash Thinking',
            creator: 'Google DeepMind',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '89.6', numeric: 89.6 },
            secondaryMetric: { label: 'GPQA Diamond', value: '64.8%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$0.10 / $0.40' },
            speedMetric: { label: 'Output Speed', value: '142 tok/s' },
            contextWindow: '1,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gemini-2-0-flash',
            badges: ['1M Context', 'Fast Reasoning']
          },
          {
            id: 'claude-3-5-sonnet',
            rank: 5,
            model: 'Claude 3.5 Sonnet',
            creator: 'Anthropic',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '89.2', numeric: 89.2 },
            secondaryMetric: { label: 'HumanEval Coding', value: '93.7%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$3.00 / $15.00' },
            speedMetric: { label: 'Output Speed', value: '84 tok/s' },
            contextWindow: '200k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-3-5-sonnet',
            badges: ['Coding Benchmark']
          },
          {
            id: 'deepseek-v3',
            rank: 6,
            model: 'DeepSeek-V3 (671B MoE)',
            creator: 'DeepSeek',
            creatorLogo: 'https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/figures/logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Quality Index', value: '88.5', numeric: 88.5 },
            secondaryMetric: { label: 'MMLU-Pro', value: '75.9%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$0.14 / $0.28' },
            speedMetric: { label: 'Output Speed', value: '62 tok/s' },
            contextWindow: '128k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/deepseek-v3',
            badges: ['Max Value', 'Open Weights']
          },
          {
            id: 'llama-3-3-70b',
            rank: 7,
            model: 'Llama 3.3 70B Instruct',
            creator: 'Meta',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Quality Index', value: '86.4', numeric: 86.4 },
            secondaryMetric: { label: 'MMLU', value: '88.6%' },
            costMetric: { label: 'Price / 1M Tokens', value: '$0.13 / $0.40' },
            speedMetric: { label: 'Output Speed', value: '110 tok/s' },
            contextWindow: '128k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/llama-3-3-70b-instruct',
            badges: ['Enterprise Open']
          },
          {
            id: 'qwen-2-5-max',
            rank: 8,
            model: 'Qwen 2.5 Max',
            creator: 'Alibaba Cloud',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Alibaba_Group_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '86.1', numeric: 86.1 },
            secondaryMetric: { label: 'Arena Elo', value: '1312' },
            costMetric: { label: 'Price / 1M Tokens', value: '$0.35 / $0.40' },
            speedMetric: { label: 'Output Speed', value: '72 tok/s' },
            contextWindow: '128k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/qwen-2-5-max',
            badges: ['Bilingual Champ']
          }
        ]
      },
      'time-per-task': {
        id: 'time-per-task',
        label: 'Time per Task (Speed)',
        description: 'Output streaming throughput (tokens per second) and time to complete standardized agent tasks.',
        sourceUrl: 'https://artificialanalysis.ai/models#performance',
        primaryMetricLabel: 'Output Speed',
        items: [
          {
            id: 'cerebras-llama-3-1-8b',
            rank: 1,
            model: 'Llama 3.1 8B (Cerebras CS-3)',
            creator: 'Cerebras',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Output Speed', value: '1,850 tok/s', numeric: 1850 },
            secondaryMetric: { label: 'TTFT Latency', value: '0.12s' },
            costMetric: { label: 'Cost / Task', value: '$0.0004' },
            speedMetric: { label: 'Task Time', value: '0.28s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['#1 World Speed', 'Hardware Wafer']
          },
          {
            id: 'groq-llama-3-3-70b',
            rank: 2,
            model: 'Llama 3.3 70B (Groq LPU)',
            creator: 'Groq',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Output Speed', value: '380 tok/s', numeric: 380 },
            secondaryMetric: { label: 'TTFT Latency', value: '0.22s' },
            costMetric: { label: 'Cost / Task', value: '$0.0012' },
            speedMetric: { label: 'Task Time', value: '1.42s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['LPU Engine', 'Realtime Chat']
          },
          {
            id: 'gemini-2-flash',
            rank: 3,
            model: 'Gemini 2.0 Flash',
            creator: 'Google DeepMind',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Output Speed', value: '168 tok/s', numeric: 168 },
            secondaryMetric: { label: 'TTFT Latency', value: '0.34s' },
            costMetric: { label: 'Cost / Task', value: '$0.0008' },
            speedMetric: { label: 'Task Time', value: '2.10s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gemini-2-0-flash',
            badges: ['Top API Speed', '1M Window']
          },
          {
            id: 'sambanova-qwen-72b',
            rank: 4,
            model: 'Qwen 2.5 72B (SambaNova SN40L)',
            creator: 'SambaNova',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Alibaba_Group_logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Output Speed', value: '240 tok/s', numeric: 240 },
            secondaryMetric: { label: 'TTFT Latency', value: '0.28s' },
            costMetric: { label: 'Cost / Task', value: '$0.0014' },
            speedMetric: { label: 'Task Time', value: '2.40s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['High Accuracy']
          },
          {
            id: 'gpt-4o-mini',
            rank: 5,
            model: 'GPT-4o mini',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Output Speed', value: '108 tok/s', numeric: 108 },
            secondaryMetric: { label: 'TTFT Latency', value: '0.41s' },
            costMetric: { label: 'Cost / Task', value: '$0.0007' },
            speedMetric: { label: 'Task Time', value: '3.60s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gpt-4o-mini',
            badges: ['Workhorse']
          }
        ]
      },
      'cost-per-task': {
        id: 'cost-per-task',
        label: 'Cost per Task (Efficiency)',
        description: 'Normalized cost in USD to complete standardized reasoning and coding tasks across providers.',
        sourceUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
        primaryMetricLabel: 'Cost per Task',
        items: [
          {
            id: 'deepseek-v3-cost',
            rank: 1,
            model: 'DeepSeek-V3',
            creator: 'DeepSeek',
            creatorLogo: 'https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/figures/logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Cost per Task', value: '$0.00062', numeric: 0.00062 },
            secondaryMetric: { label: 'Input / Output 1M', value: '$0.14 / $0.28' },
            costMetric: { label: 'Efficiency Score', value: '98.5' },
            speedMetric: { label: 'Output Speed', value: '62 tok/s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['#1 Cost-Efficiency', 'Extreme Value']
          },
          {
            id: 'gemini-2-flash-cost',
            rank: 2,
            model: 'Gemini 2.0 Flash',
            creator: 'Google DeepMind',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$0.00078', numeric: 0.00078 },
            secondaryMetric: { label: 'Input / Output 1M', value: '$0.10 / $0.40' },
            costMetric: { label: 'Efficiency Score', value: '97.2' },
            speedMetric: { label: 'Output Speed', value: '168 tok/s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Fast & Low Cost']
          },
          {
            id: 'llama-3-3-deepinfra',
            rank: 3,
            model: 'Llama 3.3 70B (DeepInfra)',
            creator: 'Meta / DeepInfra',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Cost per Task', value: '$0.00084', numeric: 0.00084 },
            secondaryMetric: { label: 'Input / Output 1M', value: '$0.13 / $0.40' },
            costMetric: { label: 'Efficiency Score', value: '96.4' },
            speedMetric: { label: 'Output Speed', value: '94 tok/s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Open Weights Value']
          },
          {
            id: 'gpt-4o-mini-cost',
            rank: 4,
            model: 'GPT-4o mini',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$0.00095', numeric: 0.00095 },
            secondaryMetric: { label: 'Input / Output 1M', value: '$0.15 / $0.60' },
            costMetric: { label: 'Efficiency Score', value: '94.8' },
            speedMetric: { label: 'Output Speed', value: '108 tok/s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['High Uptime']
          },
          {
            id: 'deepseek-r1-cost',
            rank: 5,
            model: 'DeepSeek-R1',
            creator: 'DeepSeek',
            creatorLogo: 'https://raw.githubusercontent.com/deepseek-ai/DeepSeek-V3/main/figures/logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Cost per Task', value: '$0.00410', numeric: 0.00410 },
            secondaryMetric: { label: 'Input / Output 1M', value: '$0.55 / $2.19' },
            costMetric: { label: 'Efficiency Score', value: '92.1' },
            speedMetric: { label: 'Output Speed', value: '48 tok/s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Reasoning Value']
          }
        ]
      }
    }
  },
  image: {
    id: 'image',
    label: 'Images (Text-to-Image & Editing)',
    description: 'Blind arena human preference ratings, generation latency, and representative API pricing per 1k images.',
    sourceUrl: 'https://artificialanalysis.ai/?category=image',
    subcategories: {
      'text-to-image': {
        id: 'text-to-image',
        label: 'Text to Image',
        description: 'Image Arena Quality Elo ratings based on side-by-side human voting comparisons.',
        sourceUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
        primaryMetricLabel: 'Arena Elo',
        items: [
          {
            id: 'flux-1-dev',
            rank: 1,
            model: 'FLUX.1 [dev]',
            creator: 'Black Forest Labs',
            openWeights: true,
            primaryMetric: { label: 'Arena Elo', value: '1,142', numeric: 1142 },
            secondaryMetric: { label: 'Resolution', value: 'Up to 2.0 MP' },
            costMetric: { label: 'Cost / 1k Images', value: '$12.00' },
            speedMetric: { label: 'Gen Time', value: '6.4s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['#1 Image Quality', 'Open Weights']
          },
          {
            id: 'midjourney-v6-1',
            rank: 2,
            model: 'Midjourney v6.1',
            creator: 'Midjourney',
            openWeights: false,
            primaryMetric: { label: 'Arena Elo', value: '1,138', numeric: 1138 },
            secondaryMetric: { label: 'Aesthetics', value: 'Cinematic / Art' },
            costMetric: { label: 'Cost / 1k Images', value: '$60.00 (Sub)' },
            speedMetric: { label: 'Gen Time', value: '18.2s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Aesthetic King']
          },
          {
            id: 'recraft-v3',
            rank: 3,
            model: 'Recraft v3 (Red_Panda)',
            creator: 'Recraft',
            openWeights: false,
            primaryMetric: { label: 'Arena Elo', value: '1,130', numeric: 1130 },
            secondaryMetric: { label: 'Type & Vector', value: 'Native SVG & Text' },
            costMetric: { label: 'Cost / 1k Images', value: '$25.00' },
            speedMetric: { label: 'Gen Time', value: '7.8s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Vector & Graphic']
          },
          {
            id: 'flux-1-pro',
            rank: 4,
            model: 'FLUX.1 [pro]',
            creator: 'Black Forest Labs',
            openWeights: false,
            primaryMetric: { label: 'Arena Elo', value: '1,126', numeric: 1126 },
            secondaryMetric: { label: 'Enterprise API', value: 'Guaranteed SLAs' },
            costMetric: { label: 'Cost / 1k Images', value: '$50.00' },
            speedMetric: { label: 'Gen Time', value: '5.2s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Enterprise SLA']
          },
          {
            id: 'ideogram-v2',
            rank: 5,
            model: 'Ideogram v2',
            creator: 'Ideogram',
            openWeights: false,
            primaryMetric: { label: 'Arena Elo', value: '1,114', numeric: 1114 },
            secondaryMetric: { label: 'Text In Image', value: 'Accurate Typography' },
            costMetric: { label: 'Cost / 1k Images', value: '$16.00' },
            speedMetric: { label: 'Gen Time', value: '8.5s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Typography Master']
          },
          {
            id: 'imagen-3',
            rank: 6,
            model: 'Imagen 3',
            creator: 'Google',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Arena Elo', value: '1,108', numeric: 1108 },
            secondaryMetric: { label: 'Photorealism', value: 'Lighting Accuracy' },
            costMetric: { label: 'Cost / 1k Images', value: '$20.00' },
            speedMetric: { label: 'Gen Time', value: '6.8s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Google Research']
          },
          {
            id: 'dall-e-3',
            rank: 7,
            model: 'DALL-E 3',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Arena Elo', value: '1,085', numeric: 1085 },
            secondaryMetric: { label: 'Semantic Match', value: 'GPT Prompting' },
            costMetric: { label: 'Cost / 1k Images', value: '$40.00' },
            speedMetric: { label: 'Gen Time', value: '12.0s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['ChatGPT Integrated']
          }
        ]
      },
      'text-to-image-cost': {
        id: 'text-to-image-cost',
        label: 'Text to Image Cost',
        description: 'Normalized API provider generation cost per 1,000 standard 1024x1024 images.',
        sourceUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
        primaryMetricLabel: 'Price / 1k Images',
        items: [
          {
            id: 'flux-schnell-together',
            rank: 1,
            model: 'FLUX.1 [schnell] (Together AI)',
            creator: 'Black Forest Labs / Together',
            openWeights: true,
            primaryMetric: { label: 'Cost / 1k Images', value: '$3.00', numeric: 3.0 },
            secondaryMetric: { label: 'Steps', value: '4 Steps' },
            costMetric: { label: 'Per Image', value: '$0.003' },
            speedMetric: { label: 'Gen Time', value: '1.2s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['#1 Lowest Cost', 'Sub-second']
          },
          {
            id: 'sdxl-turbo-replicate',
            rank: 2,
            model: 'SDXL Turbo (Replicate)',
            creator: 'Stability AI',
            openWeights: true,
            primaryMetric: { label: 'Cost / 1k Images', value: '$4.20', numeric: 4.2 },
            secondaryMetric: { label: 'Steps', value: '1-2 Steps' },
            costMetric: { label: 'Per Image', value: '$0.0042' },
            speedMetric: { label: 'Gen Time', value: '0.8s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Realtime Feed']
          },
          {
            id: 'flux-dev-fal',
            rank: 3,
            model: 'FLUX.1 [dev] (Fal.ai)',
            creator: 'Black Forest Labs / Fal',
            openWeights: true,
            primaryMetric: { label: 'Cost / 1k Images', value: '$12.00', numeric: 12.0 },
            secondaryMetric: { label: 'Quality Elo', value: '1,142' },
            costMetric: { label: 'Per Image', value: '$0.012' },
            speedMetric: { label: 'Gen Time', value: '4.8s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Best Value Quality']
          },
          {
            id: 'ideogram-v2-cost',
            rank: 4,
            model: 'Ideogram v2 Standard',
            creator: 'Ideogram',
            openWeights: false,
            primaryMetric: { label: 'Cost / 1k Images', value: '$16.00', numeric: 16.0 },
            secondaryMetric: { label: 'Typography', value: 'Included' },
            costMetric: { label: 'Per Image', value: '$0.016' },
            speedMetric: { label: 'Gen Time', value: '7.5s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Typography Value']
          },
          {
            id: 'imagen-3-cost',
            rank: 5,
            model: 'Imagen 3 (Vertex AI)',
            creator: 'Google Cloud',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Cost / 1k Images', value: '$20.00', numeric: 20.0 },
            secondaryMetric: { label: 'SLA Support', value: 'Enterprise' },
            costMetric: { label: 'Per Image', value: '$0.020' },
            speedMetric: { label: 'Gen Time', value: '6.8s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#text-to-image',
            badges: ['Enterprise Pricing']
          }
        ]
      },
      'image-editing': {
        id: 'image-editing',
        label: 'Image Editing (Inpainting)',
        description: 'Quality Elo for localized modifications, inpainting, object removal, and background replacement.',
        sourceUrl: 'https://artificialanalysis.ai/?category=image#image-editing',
        primaryMetricLabel: 'Editing Elo',
        items: [
          {
            id: 'flux-1-fill-pro',
            rank: 1,
            model: 'FLUX.1 Fill [pro]',
            creator: 'Black Forest Labs',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,152', numeric: 1152 },
            secondaryMetric: { label: 'Edge Blending', value: 'Seamless Seamlessness' },
            costMetric: { label: 'Cost / Edit', value: '$0.04' },
            speedMetric: { label: 'Gen Time', value: '6.2s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#image-editing',
            badges: ['#1 Inpainting', 'Photoreal Fill']
          },
          {
            id: 'recraft-vector-inpaint',
            rank: 2,
            model: 'Recraft Clean & Inpaint',
            creator: 'Recraft',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,134', numeric: 1134 },
            secondaryMetric: { label: 'Vector Layers', value: 'Preserved Paths' },
            costMetric: { label: 'Cost / Edit', value: '$0.03' },
            speedMetric: { label: 'Gen Time', value: '5.8s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#image-editing',
            badges: ['Vector Inpaint']
          },
          {
            id: 'dall-e-2-inpaint',
            rank: 3,
            model: 'DALL-E 2 Inpainting API',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,092', numeric: 1092 },
            secondaryMetric: { label: 'Mask Support', value: 'Alpha Channel' },
            costMetric: { label: 'Cost / Edit', value: '$0.02' },
            speedMetric: { label: 'Gen Time', value: '8.0s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=image#image-editing',
            badges: ['Classic API']
          }
        ]
      }
    }
  },
  video: {
    id: 'video',
    label: 'Video (Text-to-Video & Video Editing)',
    description: 'Human preference evaluations on temporal consistency, physics realism, camera motion, and render costs.',
    sourceUrl: 'https://artificialanalysis.ai/?category=video',
    subcategories: {
      'text-to-video': {
        id: 'text-to-video',
        label: 'Text to Video',
        description: 'Video Arena Elo ratings measuring motion coherence, photorealism, and prompt faithfulness.',
        sourceUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
        primaryMetricLabel: 'Video Arena Elo',
        items: [
          {
            id: 'sora-turbo',
            rank: 1,
            model: 'Sora Turbo',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Video Arena Elo', value: '1,168', numeric: 1168 },
            secondaryMetric: { label: 'Max Length', value: '60s @ 1080p' },
            costMetric: { label: 'Cost / Min', value: '$1.20' },
            speedMetric: { label: 'Render Speed', value: '1.4x Realtime' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
            badges: ['#1 Video Quality', 'World Physics']
          },
          {
            id: 'kling-1-5-pro',
            rank: 2,
            model: 'Kling 1.5 Pro',
            creator: 'Kuaishou',
            openWeights: false,
            primaryMetric: { label: 'Video Arena Elo', value: '1,154', numeric: 1154 },
            secondaryMetric: { label: 'Motion Magnitude', value: 'High Dynamics' },
            costMetric: { label: 'Cost / Min', value: '$0.85' },
            speedMetric: { label: 'Render Speed', value: '2.1x Realtime' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
            badges: ['Human Motion Champ']
          },
          {
            id: 'gen-3-alpha',
            rank: 3,
            model: 'Gen-3 Alpha',
            creator: 'Runway',
            openWeights: false,
            primaryMetric: { label: 'Video Arena Elo', value: '1,146', numeric: 1146 },
            secondaryMetric: { label: 'Camera Control', value: 'Pan, Tilt, Dolly' },
            costMetric: { label: 'Cost / Min', value: '$1.00' },
            speedMetric: { label: 'Render Speed', value: '1.8x Realtime' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
            badges: ['Hollywood Standard']
          },
          {
            id: 'wan-2-1',
            rank: 4,
            model: 'Wan 2.1 (14B Open Weights)',
            creator: 'Alibaba Cloud',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Alibaba_Group_logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Video Arena Elo', value: '1,142', numeric: 1142 },
            secondaryMetric: { label: 'Architecture', value: 'Diffusion Transformer' },
            costMetric: { label: 'Cost / Min', value: '$0.35 (Cloud)' },
            speedMetric: { label: 'Self-Hostable', value: '24GB VRAM' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
            badges: ['#1 Open Video', 'Apache 2.0']
          },
          {
            id: 'minimax-hailuo',
            rank: 5,
            model: 'MiniMax Hailuo Video-01',
            creator: 'MiniMax',
            openWeights: false,
            primaryMetric: { label: 'Video Arena Elo', value: '1,135', numeric: 1135 },
            secondaryMetric: { label: 'Facial Physics', value: 'Hyper-Expressive' },
            costMetric: { label: 'Cost / Min', value: '$0.50' },
            speedMetric: { label: 'Render Speed', value: '1.5x Realtime' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
            badges: ['Cinema Tone']
          },
          {
            id: 'luma-dream-machine',
            rank: 6,
            model: 'Luma Dream Machine 1.5',
            creator: 'Luma AI',
            openWeights: false,
            primaryMetric: { label: 'Video Arena Elo', value: '1,118', numeric: 1118 },
            secondaryMetric: { label: 'Scene Transitions', value: 'Continuous Pan' },
            costMetric: { label: 'Cost / Min', value: '$0.60' },
            speedMetric: { label: 'Render Speed', value: '2.5x Realtime' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#text-to-video',
            badges: ['Creative Panning']
          }
        ]
      },
      'image-to-video': {
        id: 'image-to-video',
        label: 'Image to Video',
        description: 'Animation fidelity starting from first-frame reference pictures and preserving subject identity.',
        sourceUrl: 'https://artificialanalysis.ai/?category=video#image-to-video',
        primaryMetricLabel: 'I2V Arena Elo',
        items: [
          {
            id: 'wan-2-1-i2v',
            rank: 1,
            model: 'Wan 2.1 I2V 14B',
            creator: 'Alibaba Cloud',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Alibaba_Group_logo.svg',
            openWeights: true,
            primaryMetric: { label: 'I2V Arena Elo', value: '1,162', numeric: 1162 },
            secondaryMetric: { label: 'Identity Lock', value: '98.5%' },
            costMetric: { label: 'Cost / 5s', value: '$0.04' },
            speedMetric: { label: 'Render Time', value: '28s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#image-to-video',
            badges: ['#1 Image-to-Video', 'Open Weights']
          },
          {
            id: 'kling-1-5-i2v',
            rank: 2,
            model: 'Kling 1.5 I2V',
            creator: 'Kuaishou',
            openWeights: false,
            primaryMetric: { label: 'I2V Arena Elo', value: '1,152', numeric: 1152 },
            secondaryMetric: { label: 'Keyframe Control', value: 'Start & End Frame' },
            costMetric: { label: 'Cost / 5s', value: '$0.06' },
            speedMetric: { label: 'Render Time', value: '35s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#image-to-video',
            badges: ['Keyframe Physics']
          },
          {
            id: 'gen-3-turbo-i2v',
            rank: 3,
            model: 'Gen-3 Alpha Turbo I2V',
            creator: 'Runway',
            openWeights: false,
            primaryMetric: { label: 'I2V Arena Elo', value: '1,140', numeric: 1140 },
            secondaryMetric: { label: 'Motion Speed', value: 'Rapid Animation' },
            costMetric: { label: 'Cost / 5s', value: '$0.05' },
            speedMetric: { label: 'Render Time', value: '18s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#image-to-video',
            badges: ['Fast Turbo']
          }
        ]
      },
      'video-editing': {
        id: 'video-editing',
        label: 'Video Editing',
        description: 'Video-to-video style restyling, motion brush manipulation, and lip synchronization benchmark scores.',
        sourceUrl: 'https://artificialanalysis.ai/?category=video#video-editing',
        primaryMetricLabel: 'Editing Elo',
        items: [
          {
            id: 'runway-motion-brush',
            rank: 1,
            model: 'Runway Multi-Motion Brush',
            creator: 'Runway',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,158', numeric: 1158 },
            secondaryMetric: { label: 'Independent Regions', value: 'Up to 5 Brushes' },
            costMetric: { label: 'Cost / Gen', value: '$0.08' },
            speedMetric: { label: 'Fidelity', value: 'Preserves Rest of Scene' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#video-editing',
            badges: ['#1 Motion Control']
          },
          {
            id: 'sora-video-to-video',
            rank: 2,
            model: 'Sora Video Restyling',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,148', numeric: 1148 },
            secondaryMetric: { label: 'Style Mapping', value: 'Zero Artifacts' },
            costMetric: { label: 'Cost / Gen', value: '$0.15' },
            speedMetric: { label: 'Fidelity', value: 'Global Physics Consistent' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#video-editing',
            badges: ['Photoreal Restyle']
          },
          {
            id: 'pika-lipsync',
            rank: 3,
            model: 'Pika Audio LipSync & Edit',
            creator: 'Pika Labs',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,122', numeric: 1122 },
            secondaryMetric: { label: 'Audio Sync', value: 'Frame-accurate phonemes' },
            costMetric: { label: 'Cost / Gen', value: '$0.05' },
            speedMetric: { label: 'Fidelity', value: 'Natural mouth shapes' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=video#video-editing',
            badges: ['LipSync King']
          }
        ]
      }
    }
  },
  speech: {
    id: 'speech',
    label: 'Speech & Audio',
    description: 'Transcription accuracy (WER), human voice preference Elo, latency, and real-time conversational speech pricing.',
    sourceUrl: 'https://artificialanalysis.ai/?category=speech',
    subcategories: {
      'speech-to-text': {
        id: 'speech-to-text',
        label: 'Speech to Text (ASR)',
        description: 'Word Error Rate (WER) across diverse accents, background noise, and technical vocabulary.',
        sourceUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-text',
        primaryMetricLabel: 'Word Error Rate',
        items: [
          {
            id: 'whisper-large-v3-turbo',
            rank: 1,
            model: 'Whisper large-v3-turbo',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: true,
            primaryMetric: { label: 'WER %', value: '4.1%', numeric: 4.1 },
            secondaryMetric: { label: 'Realtime Factor', value: '8.4x' },
            costMetric: { label: 'Price / Audio Hour', value: '$0.36' },
            speedMetric: { label: 'Streaming Latency', value: '180ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-text',
            badges: ['#1 Overall Accuracy', 'Open Weights']
          },
          {
            id: 'deepgram-nova-3',
            rank: 2,
            model: 'Deepgram Nova-3',
            creator: 'Deepgram',
            openWeights: false,
            primaryMetric: { label: 'WER %', value: '4.4%', numeric: 4.4 },
            secondaryMetric: { label: 'Ultra-low Latency', value: '85ms' },
            costMetric: { label: 'Price / Audio Hour', value: '$0.25' },
            speedMetric: { label: 'Streaming Latency', value: '85ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-text',
            badges: ['Lowest Latency STT']
          },
          {
            id: 'google-chirp-2',
            rank: 3,
            model: 'Google Chirp 2',
            creator: 'Google Cloud',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'WER %', value: '4.7%', numeric: 4.7 },
            secondaryMetric: { label: 'Languages', value: '100+ Dialects' },
            costMetric: { label: 'Price / Audio Hour', value: '$0.42' },
            speedMetric: { label: 'Streaming Latency', value: '220ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-text',
            badges: ['Global Languages']
          },
          {
            id: 'assemblyai-universal-2',
            rank: 4,
            model: 'AssemblyAI Universal-2',
            creator: 'AssemblyAI',
            openWeights: false,
            primaryMetric: { label: 'WER %', value: '4.9%', numeric: 4.9 },
            secondaryMetric: { label: 'Diarization', value: 'Multi-Speaker' },
            costMetric: { label: 'Price / Audio Hour', value: '$0.37' },
            speedMetric: { label: 'Streaming Latency', value: '210ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-text',
            badges: ['Meeting Transcripts']
          }
        ]
      },
      'text-to-speech': {
        id: 'text-to-speech',
        label: 'Text to Speech (TTS)',
        description: 'Speech Arena human preference Elo, emotional expressiveness, and time to first audio byte (TTFA).',
        sourceUrl: 'https://artificialanalysis.ai/?category=speech#text-to-speech',
        primaryMetricLabel: 'Speech Arena Elo',
        items: [
          {
            id: 'elevenlabs-v3',
            rank: 1,
            model: 'ElevenLabs Multilingual v3',
            creator: 'ElevenLabs',
            openWeights: false,
            primaryMetric: { label: 'Speech Arena Elo', value: '1,180', numeric: 1180 },
            secondaryMetric: { label: 'Emotional Nuance', value: 'Breath, Pause, Tone' },
            costMetric: { label: 'Cost / 1M Chars', value: '$15.00' },
            speedMetric: { label: 'TTFA Latency', value: '75ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#text-to-speech',
            badges: ['#1 Voice Quality', 'Voice Cloning']
          },
          {
            id: 'cartesia-sonic',
            rank: 2,
            model: 'Cartesia Sonic',
            creator: 'Cartesia',
            openWeights: false,
            primaryMetric: { label: 'Speech Arena Elo', value: '1,164', numeric: 1164 },
            secondaryMetric: { label: 'Sub-second Streaming', value: '40ms TTFA' },
            costMetric: { label: 'Cost / 1M Chars', value: '$10.00' },
            speedMetric: { label: 'TTFA Latency', value: '40ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#text-to-speech',
            badges: ['Fastest TTFA', 'Conversational']
          },
          {
            id: 'openai-tts-1-hd',
            rank: 3,
            model: 'OpenAI TTS-1-HD',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Speech Arena Elo', value: '1,138', numeric: 1138 },
            secondaryMetric: { label: 'Studio Clarity', value: 'Clean 48kHz' },
            costMetric: { label: 'Cost / 1M Chars', value: '$30.00' },
            speedMetric: { label: 'TTFA Latency', value: '140ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#text-to-speech',
            badges: ['Crisp Clarity']
          },
          {
            id: 'qwen-audio-tts',
            rank: 4,
            model: 'Qwen-Audio-TTS',
            creator: 'Alibaba Cloud',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Alibaba_Group_logo.svg',
            openWeights: true,
            primaryMetric: { label: 'Speech Arena Elo', value: '1,124', numeric: 1124 },
            secondaryMetric: { label: 'Multilingual', value: 'Chinese & English' },
            costMetric: { label: 'Cost / 1M Chars', value: '$6.00' },
            speedMetric: { label: 'TTFA Latency', value: '95ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#text-to-speech',
            badges: ['Open Weights Value']
          }
        ]
      },
      'speech-to-speech': {
        id: 'speech-to-speech',
        label: 'Speech to Speech (Realtime)',
        description: 'End-to-end full duplex voice conversation latency, interruption handling, and streaming voice agents.',
        sourceUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-speech',
        primaryMetricLabel: 'Duplex Latency',
        items: [
          {
            id: 'gemini-2-live-audio',
            rank: 1,
            model: 'Gemini 2.0 Flash Live (Audio Duplex)',
            creator: 'Google DeepMind',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Duplex Latency', value: '210ms', numeric: 210 },
            secondaryMetric: { label: 'Multimodal', value: 'Audio + Video + Vision' },
            costMetric: { label: 'Pricing / 1M Audio', value: '$50.00' },
            speedMetric: { label: 'Interruption', value: 'Instant Cut-off' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-speech',
            badges: ['#1 Lowest Voice Latency', 'Live Video Stream']
          },
          {
            id: 'openai-gpt-4o-realtime',
            rank: 2,
            model: 'GPT-4o Realtime API',
            creator: 'OpenAI',
            creatorLogo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
            openWeights: false,
            primaryMetric: { label: 'Duplex Latency', value: '240ms', numeric: 240 },
            secondaryMetric: { label: 'Function Calling', value: 'Realtime Tool Calling' },
            costMetric: { label: 'Pricing / 1M Audio', value: '$100.00' },
            speedMetric: { label: 'Interruption', value: 'Natural Barge-in' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-speech',
            badges: ['Realtime Function Calling']
          },
          {
            id: 'kyutai-moshi',
            rank: 3,
            model: 'Kyutai Moshi (7B Audio)',
            creator: 'Kyutai',
            openWeights: true,
            primaryMetric: { label: 'Duplex Latency', value: '160ms', numeric: 160 },
            secondaryMetric: { label: 'Deployment', value: 'Self-Hostable on GPU' },
            costMetric: { label: 'Pricing', value: 'Free / Open Weights' },
            speedMetric: { label: 'Dual Audio Stream', value: 'Native Audio-to-Audio' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-speech',
            badges: ['#1 Open Duplex', 'Full Offline']
          },
          {
            id: 'elevenlabs-conversational',
            rank: 4,
            model: 'ElevenLabs Conversational AI',
            creator: 'ElevenLabs',
            openWeights: false,
            primaryMetric: { label: 'Duplex Latency', value: '280ms', numeric: 280 },
            secondaryMetric: { label: 'Agent Tools', value: 'SDK + Webhook hooks' },
            costMetric: { label: 'Pricing / Min', value: '$0.08 / min' },
            speedMetric: { label: 'Voice Quality', value: 'Elite Human Emotion' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#speech-to-speech',
            badges: ['Production Voice Agents']
          }
        ]
      }
    }
  }
};
