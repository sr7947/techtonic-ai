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
    description: 'Independent quality, speed, and pricing benchmarks across frontier reasoning models and open-weights LLMs.',
    sourceUrl: 'https://artificialanalysis.ai/#intelligence',
    subcategories: {
      intelligence: {
        id: 'intelligence',
        label: 'Intelligence (Quality)',
        description: 'Composite Intelligence Index tracking reasoning, mathematics, coding, and scientific problem-solving from Artificial Analysis.',
        sourceUrl: 'https://artificialanalysis.ai/#intelligence',
        primaryMetricLabel: 'Quality Index',
        items: [
          {
            id: 'claude-fable-5-2',
            rank: 1,
            model: 'Claude Fable 5.2 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '65', numeric: 65 },
            secondaryMetric: { label: 'STEM & Logic', value: '73.0' },
            costMetric: { label: 'Cost / Task', value: '$26.54' },
            speedMetric: { label: 'Time / Task', value: '45.0s' },
            contextWindow: '1,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-fable-5-2',
            badges: ['#1 Frontier', 'Max Reasoning']
          },
          {
            id: 'gemini-4-carbon',
            rank: 2,
            model: 'Gemini 4 Carbon (high)',
            creator: 'Google DeepMind',
            creatorLogo: '/logos/google.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '60', numeric: 60 },
            secondaryMetric: { label: 'Engineering', value: '65.0' },
            costMetric: { label: 'Cost / Task', value: '$7.76' },
            speedMetric: { label: 'Time / Task', value: '26.1s' },
            contextWindow: '2,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gemini-4-carbon',
            badges: ['2M Context', 'Carbon Engine']
          },
          {
            id: 'claude-opus-5-5',
            rank: 3,
            model: 'Claude Opus 5.5 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '59', numeric: 59 },
            secondaryMetric: { label: 'Finance & Law', value: '61.0' },
            costMetric: { label: 'Cost / Task', value: '$10.04' },
            speedMetric: { label: 'Time / Task', value: '25.0s' },
            contextWindow: '1,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-opus-5-5',
            badges: ['Opus Tier', 'Deep Analysis']
          },
          {
            id: 'gpt-6-astra',
            rank: 4,
            model: 'GPT-6 Astra (max)',
            creator: 'OpenAI',
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '57', numeric: 57 },
            secondaryMetric: { label: 'Strategy & Ops', value: '58.0' },
            costMetric: { label: 'Cost / Task', value: '$6.24' },
            speedMetric: { label: 'Time / Task', value: '23.0s' },
            contextWindow: '500k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gpt-6-astra',
            badges: ['Astra Architecture', 'Autonomous Agent']
          },
          {
            id: 'claude-sonnet-5-5',
            rank: 5,
            model: 'Claude Sonnet 5.5 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '56', numeric: 56 },
            secondaryMetric: { label: 'Coding & Eng', value: '58.0' },
            costMetric: { label: 'Cost / Task', value: '$5.12' },
            speedMetric: { label: 'Time / Task', value: '21.0s' },
            contextWindow: '1,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-sonnet-5-5',
            badges: ['SWE Leader', 'High Throughput']
          },
          {
            id: 'gpt-6-1-sol',
            rank: 6,
            model: 'GPT-6.1 Sol (max)',
            creator: 'OpenAI',
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '55', numeric: 55 },
            secondaryMetric: { label: 'High Efficiency', value: '58.0' },
            costMetric: { label: 'Cost / Task', value: '$1.27' },
            speedMetric: { label: 'Time / Task', value: '20.4s' },
            contextWindow: '500k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/gpt-6-1-sol',
            badges: ['Sol Efficiency', 'Fast Reasoning']
          },
          {
            id: 'muse-wonder-full',
            rank: 7,
            model: 'Muse Wonder Full (max)',
            creator: 'Muse Labs',
            creatorLogo: '/logos/meta.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '50', numeric: 50 },
            secondaryMetric: { label: 'Economics', value: '54.0' },
            costMetric: { label: 'Cost / Task', value: '$6.95' },
            speedMetric: { label: 'Time / Task', value: '13.3s' },
            contextWindow: '256k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/muse-wonder-full',
            badges: ['Ultra Low Latency']
          },
          {
            id: 'kimi-k3-1-pro',
            rank: 8,
            model: 'Kimi K3.1 Pro',
            creator: 'Moonshot AI',
            creatorLogo: '/logos/moonshot.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '46', numeric: 46 },
            secondaryMetric: { label: 'Long Context', value: '58.0' },
            costMetric: { label: 'Cost / Task', value: '$3.68' },
            speedMetric: { label: 'Time / Task', value: '37.3s' },
            contextWindow: '2,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/kimi-k3-1-pro',
            badges: ['Moonshot', '2M Context']
          },
          {
            id: 'muse-wonder',
            rank: 9,
            model: 'Muse Wonder (max)',
            creator: 'Muse Labs',
            creatorLogo: '/logos/meta.png',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '44', numeric: 44 },
            secondaryMetric: { label: 'Economics', value: '50.0' },
            costMetric: { label: 'Cost / Task', value: '$6.95' },
            speedMetric: { label: 'Time / Task', value: '13.3s' },
            contextWindow: '256k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/muse-wonder',
            badges: ['Fastest Inference']
          },
          {
            id: 'grok-4-7',
            rank: 10,
            model: 'Grok 4.7 (xhigh)',
            creator: 'xAI',
            creatorLogo: '/logos/grok.svg',
            openWeights: false,
            primaryMetric: { label: 'Quality Index', value: '35', numeric: 35 },
            secondaryMetric: { label: 'Realtime Data', value: '55.0' },
            costMetric: { label: 'Cost / Task', value: '$7.77' },
            speedMetric: { label: 'Time / Task', value: '27.4s' },
            contextWindow: '1,000k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/grok-4-7',
            badges: ['xAI Realtime']
          },
          {
            id: 'deepseek-v4-1-flash-1017',
            rank: 11,
            model: 'DeepSeek V4.1 Flash 1017 (max)',
            creator: 'DeepSeek',
            creatorLogo: '/logos/deepseek.svg',
            openWeights: true,
            primaryMetric: { label: 'Quality Index', value: '33', numeric: 33 },
            secondaryMetric: { label: 'Cost Value', value: '$0.60 / task' },
            costMetric: { label: 'Cost / Task', value: '$0.60' },
            speedMetric: { label: 'Time / Task', value: '16.3s' },
            contextWindow: '128k',
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/deepseek-v4-1-flash-1017',
            badges: ['#1 Open Weights Value', 'Flash MoE']
          }
        ]
      },
      'time-per-task': {
        id: 'time-per-task',
        label: 'Time per Task (Speed)',
        description: 'Duration to complete standardized multi-step evaluation tasks from Artificial Analysis.',
        sourceUrl: 'https://artificialanalysis.ai/models#performance',
        primaryMetricLabel: 'Time per Task',
        items: [
          {
            id: 'time-muse-wonder',
            rank: 1,
            model: 'Muse Wonder (max)',
            creator: 'Muse Labs',
            creatorLogo: '/logos/meta.png',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '13.3s', numeric: 13.3 },
            secondaryMetric: { label: 'Throughput', value: '280 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$6.95' },
            speedMetric: { label: 'Speed Rank', value: '#1 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['#1 Speed', 'Ultra Fast']
          },
          {
            id: 'time-deepseek-v4-1',
            rank: 2,
            model: 'DeepSeek V4.1 Flash 1017 (max)',
            creator: 'DeepSeek',
            creatorLogo: '/logos/deepseek.svg',
            openWeights: true,
            primaryMetric: { label: 'Time per Task', value: '16.3s', numeric: 16.3 },
            secondaryMetric: { label: 'Throughput', value: '240 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$0.60' },
            speedMetric: { label: 'Speed Rank', value: '#2 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Open Weights Fast', 'Flash MoE']
          },
          {
            id: 'time-gpt-6-1-sol',
            rank: 3,
            model: 'GPT-6.1 Sol (max)',
            creator: 'OpenAI',
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '20.4s', numeric: 20.4 },
            secondaryMetric: { label: 'Throughput', value: '195 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$1.27' },
            speedMetric: { label: 'Speed Rank', value: '#3 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Sol Engine']
          },
          {
            id: 'time-gpt-6-astra',
            rank: 4,
            model: 'GPT-6 Astra (max)',
            creator: 'OpenAI',
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '23.0s', numeric: 23.0 },
            secondaryMetric: { label: 'Throughput', value: '180 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$6.24' },
            speedMetric: { label: 'Speed Rank', value: '#4 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Astra Flagship']
          },
          {
            id: 'time-claude-opus-5-5',
            rank: 5,
            model: 'Claude Opus 5.5 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '25.0s', numeric: 25.0 },
            secondaryMetric: { label: 'Throughput', value: '165 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$10.04' },
            speedMetric: { label: 'Speed Rank', value: '#5 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Opus Tier']
          },
          {
            id: 'time-gemini-4-carbon',
            rank: 6,
            model: 'Gemini 4 Carbon (high)',
            creator: 'Google DeepMind',
            creatorLogo: '/logos/google.png',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '26.1s', numeric: 26.1 },
            secondaryMetric: { label: 'Throughput', value: '172 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$7.76' },
            speedMetric: { label: 'Speed Rank', value: '#6 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['2M Context']
          },
          {
            id: 'time-grok-4-7',
            rank: 7,
            model: 'Grok 4.7 (xhigh)',
            creator: 'xAI',
            creatorLogo: '/logos/grok.svg',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '27.4s', numeric: 27.4 },
            secondaryMetric: { label: 'Throughput', value: '155 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$7.77' },
            speedMetric: { label: 'Speed Rank', value: '#7 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['xAI Realtime']
          },
          {
            id: 'time-glm-5-3',
            rank: 8,
            model: 'GLM-5.3 (max)',
            creator: 'Zhipu AI',
            creatorLogo: '/logos/zhipu.svg',
            openWeights: true,
            primaryMetric: { label: 'Time per Task', value: '28.3s', numeric: 28.3 },
            secondaryMetric: { label: 'Throughput', value: '140 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$5.01' },
            speedMetric: { label: 'Speed Rank', value: '#8 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Bilingual Specialist']
          },
          {
            id: 'time-mimo-v2-6',
            rank: 9,
            model: 'MiMo-V2.6-Pro',
            creator: 'Xiaomi AI',
            creatorLogo: '/logos/xiaomi.svg',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '35.4s', numeric: 35.4 },
            secondaryMetric: { label: 'Throughput', value: '130 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$0.26' },
            speedMetric: { label: 'Speed Rank', value: '#9 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Edge & Cloud']
          },
          {
            id: 'time-kimi-k3-1',
            rank: 10,
            model: 'Kimi K3.1 Pro',
            creator: 'Moonshot AI',
            creatorLogo: '/logos/moonshot.svg',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '37.3s', numeric: 37.3 },
            secondaryMetric: { label: 'Throughput', value: '125 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$3.68' },
            speedMetric: { label: 'Speed Rank', value: '#10 Fastest' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models#performance',
            badges: ['Long Context']
          },
          {
            id: 'time-claude-fable-5-2',
            rank: 11,
            model: 'Claude Fable 5.2 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Time per Task', value: '45.0s', numeric: 45.0 },
            secondaryMetric: { label: 'Throughput', value: '95 tok/s' },
            costMetric: { label: 'Cost / Task', value: '$26.54' },
            speedMetric: { label: 'Speed Rank', value: 'Max Depth' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-fable-5-2',
            badges: ['Deep Deliberation']
          }
        ]
      },
      'cost-per-task': {
        id: 'cost-per-task',
        label: 'Cost per Task (Efficiency)',
        description: 'Normalized cost in USD to complete standardized Artificial Analysis Intelligence Index tasks.',
        sourceUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
        primaryMetricLabel: 'Cost per Task',
        items: [
          {
            id: 'cost-mimo-v2-6',
            rank: 1,
            model: 'MiMo-V2.6-Pro',
            creator: 'Xiaomi AI',
            creatorLogo: '/logos/xiaomi.svg',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$0.26', numeric: 0.26 },
            secondaryMetric: { label: 'Value Score', value: '99.2' },
            costMetric: { label: 'Price Rank', value: '#1 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '35.4s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['#1 Cost Efficiency', 'Budget Leader']
          },
          {
            id: 'cost-deepseek-v4-1',
            rank: 2,
            model: 'DeepSeek V4.1 Flash 1017 (max)',
            creator: 'DeepSeek',
            creatorLogo: '/logos/deepseek.svg',
            openWeights: true,
            primaryMetric: { label: 'Cost per Task', value: '$0.60', numeric: 0.60 },
            secondaryMetric: { label: 'Value Score', value: '98.5' },
            costMetric: { label: 'Price Rank', value: '#2 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '16.3s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Open Weights Value', 'Extreme Efficiency']
          },
          {
            id: 'cost-gpt-6-1-sol',
            rank: 3,
            model: 'GPT-6.1 Sol (max)',
            creator: 'OpenAI',
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$1.27', numeric: 1.27 },
            secondaryMetric: { label: 'Value Score', value: '96.8' },
            costMetric: { label: 'Price Rank', value: '#3 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '20.4s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Sol Economy']
          },
          {
            id: 'cost-kimi-k3-1',
            rank: 4,
            model: 'Kimi K3.1 Pro',
            creator: 'Moonshot AI',
            creatorLogo: '/logos/moonshot.svg',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$3.68', numeric: 3.68 },
            secondaryMetric: { label: 'Value Score', value: '94.2' },
            costMetric: { label: 'Price Rank', value: '#4 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '37.3s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Long Context Value']
          },
          {
            id: 'cost-glm-5-3',
            rank: 5,
            model: 'GLM-5.3 (max)',
            creator: 'Zhipu AI',
            creatorLogo: '/logos/zhipu.svg',
            openWeights: true,
            primaryMetric: { label: 'Cost per Task', value: '$5.01', numeric: 5.01 },
            secondaryMetric: { label: 'Value Score', value: '92.5' },
            costMetric: { label: 'Price Rank', value: '#5 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '28.3s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Open Weights Choice']
          },
          {
            id: 'cost-gpt-6-astra',
            rank: 6,
            model: 'GPT-6 Astra (max)',
            creator: 'OpenAI',
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$6.24', numeric: 6.24 },
            secondaryMetric: { label: 'Value Score', value: '91.0' },
            costMetric: { label: 'Price Rank', value: '#6 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '23.0s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Flagship Value']
          },
          {
            id: 'cost-muse-wonder',
            rank: 7,
            model: 'Muse Wonder (max)',
            creator: 'Muse Labs',
            creatorLogo: '/logos/meta.png',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$6.95', numeric: 6.95 },
            secondaryMetric: { label: 'Value Score', value: '90.2' },
            costMetric: { label: 'Price Rank', value: '#7 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '13.3s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Fast & Balanced']
          },
          {
            id: 'cost-gemini-4-carbon',
            rank: 8,
            model: 'Gemini 4 Carbon (high)',
            creator: 'Google DeepMind',
            creatorLogo: '/logos/google.png',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$7.76', numeric: 7.76 },
            secondaryMetric: { label: 'Value Score', value: '89.4' },
            costMetric: { label: 'Price Rank', value: '#8 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '26.1s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['2M Window Economy']
          },
          {
            id: 'cost-grok-4-7',
            rank: 9,
            model: 'Grok 4.7 (xhigh)',
            creator: 'xAI',
            creatorLogo: '/logos/grok.svg',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$7.77', numeric: 7.77 },
            secondaryMetric: { label: 'Value Score', value: '88.9' },
            costMetric: { label: 'Price Rank', value: '#9 Cheapest' },
            speedMetric: { label: 'Time / Task', value: '27.4s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['Realtime Engine']
          },
          {
            id: 'cost-claude-opus-5-5',
            rank: 10,
            model: 'Claude Opus 5.5 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$10.04', numeric: 10.04 },
            secondaryMetric: { label: 'Value Score', value: '86.1' },
            costMetric: { label: 'Price Rank', value: 'Premium' },
            speedMetric: { label: 'Time / Task', value: '25.0s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/#intelligence-efficiency-tabs',
            badges: ['High Accuracy']
          },
          {
            id: 'cost-claude-fable-5-2',
            rank: 11,
            model: 'Claude Fable 5.2 (max)',
            creator: 'Anthropic',
            creatorLogo: '/logos/anthropic.png',
            openWeights: false,
            primaryMetric: { label: 'Cost per Task', value: '$26.54', numeric: 26.54 },
            secondaryMetric: { label: 'Value Score', value: '#1 Reasoning' },
            costMetric: { label: 'Price Rank', value: 'Frontier Max' },
            speedMetric: { label: 'Time / Task', value: '45.0s' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/models/claude-fable-5-2',
            badges: ['Frontier Tier']
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
            creatorLogo: '/logos/bfl.svg',
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
            creatorLogo: '/logos/midjourney.svg',
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
            creatorLogo: '/logos/recraft.svg',
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
            creatorLogo: '/logos/bfl.svg',
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
            creatorLogo: '/logos/ideogram.svg',
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
            creatorLogo: '/logos/google.png',
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
            creatorLogo: '/logos/openai.png',
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
            creatorLogo: '/logos/bfl.svg',
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
            creatorLogo: '/logos/stability.svg',
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
            creatorLogo: '/logos/bfl.svg',
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
            creatorLogo: '/logos/ideogram.svg',
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
            creatorLogo: '/logos/google.png',
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
            creatorLogo: '/logos/bfl.svg',
            openWeights: false,
            primaryMetric: { label: 'Editing Elo', value: '1,152', numeric: 1152 },
            secondaryMetric: { label: 'Edge Blending', value: 'Seamless' },
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
            creatorLogo: '/logos/recraft.svg',
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
            creatorLogo: '/logos/openai.png',
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
            creatorLogo: '/logos/openai.png',
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
            creatorLogo: '/logos/kling.svg',
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
            creatorLogo: '/logos/runway.svg',
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
            creatorLogo: '/logos/alibaba.svg',
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
            creatorLogo: '/logos/minimax.svg',
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
            creatorLogo: '/logos/luma.svg',
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
            creatorLogo: '/logos/alibaba.svg',
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
            creatorLogo: '/logos/kling.svg',
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
            creatorLogo: '/logos/runway.svg',
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
            creatorLogo: '/logos/runway.svg',
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
            creatorLogo: '/logos/openai.png',
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
            creatorLogo: '/logos/pika.svg',
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
            creatorLogo: '/logos/openai.png',
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
            creatorLogo: '/logos/deepgram.svg',
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
            creatorLogo: '/logos/google.png',
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
            creatorLogo: '/logos/assemblyai.svg',
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
            creatorLogo: '/logos/elevenlabs.svg',
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
            creatorLogo: '/logos/cartesia.svg',
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
            creatorLogo: '/logos/openai.png',
            openWeights: false,
            primaryMetric: { label: 'Speech Arena Elo', value: '1,138', numeric: 1138 },
            secondaryMetric: { label: 'Studio Clarity', value: 'Clean 48kHz' },
            costMetric: { label: 'Cost / 1M Chars', value: '$30.00' },
            speedMetric: { label: 'TTFA Latency', value: '140ms' },
            artificialAnalysisUrl: 'https://artificialanalysis.ai/?category=speech#text-to-speech',
            badges: ['Studio Quality']
          },
          {
            id: 'qwen-audio-tts',
            rank: 4,
            model: 'Qwen-Audio-TTS',
            creator: 'Alibaba Cloud',
            creatorLogo: '/logos/alibaba.svg',
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
            creatorLogo: '/logos/google.png',
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
            creatorLogo: '/logos/openai.png',
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
            creatorLogo: '/logos/kyutai.svg',
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
            creatorLogo: '/logos/elevenlabs.svg',
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
