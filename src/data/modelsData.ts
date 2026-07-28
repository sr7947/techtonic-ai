export interface AIModel {
  id: string;
  name: string;
  task: 'Text Generation' | 'Image-to-Text' | 'Text-to-Image' | 'Image-to-Image' | 'Text-to-Speech' | 'Computer Vision';
  parameters: number; // in Billions
  parameterRange: '<1B' | '1B-10B' | '10B-50B' | '50B-150B' | '150B-500B' | '>500B';
  libraries: ('PyTorch' | 'TensorFlow' | 'Transformers' | 'Diffusers' | 'GGUF' | 'MLX')[];
  downloads: string;
  likes: string;
  updatedAt: string;
  author: string;
}

export const FRONTIER_MODELS: AIModel[] = [
  {
    "id": "model-1",
    "name": "moonshotai/Kimi-K3",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "2.9k",
    "likes": "6.9k",
    "updatedAt": "yesterday",
    "author": "moonshotai"
  },
  {
    "id": "model-2",
    "name": "poolside/Laguna-S-2.1",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "63.6k",
    "likes": "768",
    "updatedAt": "yesterday",
    "author": "poolside"
  },
  {
    "id": "model-3",
    "name": "baidu/Unlimited-OCR",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "2.6M",
    "likes": "3.3k",
    "updatedAt": "5 days ago",
    "author": "baidu"
  },
  {
    "id": "model-4",
    "name": "DavidAU/Qwen3.6-27B-Fable-Fusion-711-Uncensored-Heretic-NM-DAU-NEO-MAX-MTP-GGUF",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "634.1k",
    "likes": "770",
    "updatedAt": "today",
    "author": "DavidAU"
  },
  {
    "id": "model-5",
    "name": "upstage/Solar-Open2-250B",
    "task": "Text Generation",
    "parameters": 250.0,
    "parameterRange": "150B-500B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "3.8k",
    "likes": "635",
    "updatedAt": "yesterday",
    "author": "upstage"
  },
  {
    "id": "model-6",
    "name": "Nanbeige/Nanbeige4.2-3B",
    "task": "Text Generation",
    "parameters": 3.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "16.5k",
    "likes": "496",
    "updatedAt": "yesterday",
    "author": "Nanbeige"
  },
  {
    "id": "model-7",
    "name": "microsoft/Mage-Flow",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.7k",
    "likes": "397",
    "updatedAt": "5 days ago",
    "author": "microsoft"
  },
  {
    "id": "model-8",
    "name": "thinkingmachines/Inkling",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "36.2k",
    "likes": "1.6k",
    "updatedAt": "5 days ago",
    "author": "thinkingmachines"
  },
  {
    "id": "model-9",
    "name": "zai-org/GLM-5.2",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1M",
    "likes": "4.6k",
    "updatedAt": "26 days ago",
    "author": "zai-org"
  },
  {
    "id": "model-10",
    "name": "Kwaipilot/KAT-Coder-V2.5-Dev",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "5.3k",
    "likes": "245",
    "updatedAt": "today",
    "author": "Kwaipilot"
  },
  {
    "id": "model-11",
    "name": "owensong/Inflect-Micro-v2",
    "task": "Text-to-Speech",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "483",
    "likes": "233",
    "updatedAt": "today",
    "author": "owensong"
  },
  {
    "id": "model-12",
    "name": "unsloth/Laguna-S-2.1-GGUF",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "117.5k",
    "likes": "221",
    "updatedAt": "yesterday",
    "author": "unsloth"
  },
  {
    "id": "model-13",
    "name": "fdtn-ai/antares-1b",
    "task": "Text Generation",
    "parameters": 1.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "6.4k",
    "likes": "209",
    "updatedAt": "6 days ago",
    "author": "fdtn-ai"
  },
  {
    "id": "model-14",
    "name": "prism-ml/Ternary-Bonsai-27B-gguf",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "648.9k",
    "likes": "1.1k",
    "updatedAt": "10 days ago",
    "author": "prism-ml"
  },
  {
    "id": "model-15",
    "name": "microsoft/Fara1.5-27B",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.4k",
    "likes": "158",
    "updatedAt": "yesterday",
    "author": "microsoft"
  },
  {
    "id": "model-16",
    "name": "poolside/Laguna-S-2.1-GGUF",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "85.6k",
    "likes": "155",
    "updatedAt": "yesterday",
    "author": "poolside"
  },
  {
    "id": "model-17",
    "name": "Motif-Technologies/Motif-3-Beta",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "2.5k",
    "likes": "201",
    "updatedAt": "6 days ago",
    "author": "Motif-Technologies"
  },
  {
    "id": "model-18",
    "name": "poolside/Laguna-S-2.1-NVFP4",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "158.3k",
    "likes": "150",
    "updatedAt": "6 days ago",
    "author": "poolside"
  },
  {
    "id": "model-19",
    "name": "HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "1.9M",
    "likes": "3.1k",
    "updatedAt": "3 months ago",
    "author": "HauhauCS"
  },
  {
    "id": "model-20",
    "name": "baseten/GLM-5.2-Vision-NVFP4",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "2.3k",
    "likes": "125",
    "updatedAt": "7 days ago",
    "author": "baseten"
  },
  {
    "id": "model-21",
    "name": "moonshotai/Kimi-K2.7-Code",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "695.7k",
    "likes": "1.3k",
    "updatedAt": "1 month ago",
    "author": "moonshotai"
  },
  {
    "id": "model-22",
    "name": "unsloth/Kimi-K3",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "0",
    "likes": "111",
    "updatedAt": "today",
    "author": "unsloth"
  },
  {
    "id": "model-23",
    "name": "ATH-MaaS/OvisOCR2",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "42.2k",
    "likes": "329",
    "updatedAt": "12 days ago",
    "author": "ATH-MaaS"
  },
  {
    "id": "model-24",
    "name": "microsoft/Mage-Flow-Edit-Turbo",
    "task": "Image-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.1k",
    "likes": "105",
    "updatedAt": "5 days ago",
    "author": "microsoft"
  },
  {
    "id": "model-25",
    "name": "LuffyTheFox/Qwen3.6-35B-A3B-Uncensored-Genesis-Hermes-V5-GGUF",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "83.7k",
    "likes": "190",
    "updatedAt": "yesterday",
    "author": "LuffyTheFox"
  },
  {
    "id": "model-26",
    "name": "prism-ml/Bonsai-27B-gguf",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "2.3M",
    "likes": "660",
    "updatedAt": "11 days ago",
    "author": "prism-ml"
  },
  {
    "id": "model-27",
    "name": "conradlocke/krea2-identity-edit",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "0",
    "likes": "557",
    "updatedAt": "6 days ago",
    "author": "conradlocke"
  },
  {
    "id": "model-28",
    "name": "Qwen/Qwen3.6-35B-A3B",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "6.2M",
    "likes": "2.6k",
    "updatedAt": "3 months ago",
    "author": "Qwen"
  },
  {
    "id": "model-29",
    "name": "empero-ai/Qwythos-9B-Claude-Mythos-5-1M-GGUF",
    "task": "Text Generation",
    "parameters": 9.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "1.3M",
    "likes": "2.5k",
    "updatedAt": "14 days ago",
    "author": "empero-ai"
  },
  {
    "id": "model-30",
    "name": "owensong/Inflect-Nano-v2",
    "task": "Text-to-Speech",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "349",
    "likes": "95",
    "updatedAt": "today",
    "author": "owensong"
  },
  {
    "id": "model-31",
    "name": "bottlecapai/ThinkingCap-Qwen3.6-27B",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "28.4k",
    "likes": "562",
    "updatedAt": "yesterday",
    "author": "bottlecapai"
  },
  {
    "id": "model-32",
    "name": "nvidia/Cosmos3-Edge",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "33.1k",
    "likes": "133",
    "updatedAt": "today",
    "author": "nvidia"
  },
  {
    "id": "model-33",
    "name": "poolside/Laguna-XS-2.1",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "24.4k",
    "likes": "187",
    "updatedAt": "4 days ago",
    "author": "poolside"
  },
  {
    "id": "model-34",
    "name": "DavidAU/Qwen3.5-9B-The-Defiant-Fable-Uncensored-Heretic-NEO-IMATRIX-MAX-MTP-GGUF",
    "task": "Text Generation",
    "parameters": 9.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "63k",
    "likes": "99",
    "updatedAt": "today",
    "author": "DavidAU"
  },
  {
    "id": "model-35",
    "name": "microsoft/Mage-Flow-Turbo",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.3k",
    "likes": "69",
    "updatedAt": "5 days ago",
    "author": "microsoft"
  },
  {
    "id": "model-36",
    "name": "microsoft/VibeVoice-ASR-BitNet",
    "task": "Text-to-Speech",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "1.2k",
    "likes": "70",
    "updatedAt": "4 days ago",
    "author": "microsoft"
  },
  {
    "id": "model-37",
    "name": "PaddlePaddle/HPD-Parsing",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "900",
    "likes": "67",
    "updatedAt": "6 days ago",
    "author": "PaddlePaddle"
  },
  {
    "id": "model-38",
    "name": "ProCreations/grug-27b",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "1.1k",
    "likes": "66",
    "updatedAt": "4 days ago",
    "author": "ProCreations"
  },
  {
    "id": "model-39",
    "name": "Qwen/Qwen3.6-27B",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "6.1M",
    "likes": "2.1k",
    "updatedAt": "3 months ago",
    "author": "Qwen"
  },
  {
    "id": "model-40",
    "name": "audnai/penclaw-Kimi-K3.0-abliterated-GGUF",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "0",
    "likes": "108",
    "updatedAt": "4 days ago",
    "author": "audnai"
  },
  {
    "id": "model-41",
    "name": "badtheorylabs/BTL-3",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "170",
    "likes": "65",
    "updatedAt": "4 days ago",
    "author": "badtheorylabs"
  },
  {
    "id": "model-42",
    "name": "nvidia/nemotron-3.5-asr-streaming-0.6b",
    "task": "Text-to-Speech",
    "parameters": 0.6,
    "parameterRange": "<1B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "924.5k",
    "likes": "954",
    "updatedAt": "22 days ago",
    "author": "nvidia"
  },
  {
    "id": "model-43",
    "name": "google/gemma-4-31B-it",
    "task": "Text Generation",
    "parameters": 31.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "12.4M",
    "likes": "3.4k",
    "updatedAt": "8 days ago",
    "author": "google"
  },
  {
    "id": "model-44",
    "name": "krea/Krea-2-Turbo",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "190.5k",
    "likes": "736",
    "updatedAt": "4 days ago",
    "author": "krea"
  },
  {
    "id": "model-45",
    "name": "unsloth/Ornith-1.0-35B-GGUF",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "105k",
    "likes": "110",
    "updatedAt": "10 days ago",
    "author": "unsloth"
  },
  {
    "id": "model-46",
    "name": "Lightricks/LTX-2.3",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "2.2M",
    "likes": "1.7k",
    "updatedAt": "19 days ago",
    "author": "Lightricks"
  },
  {
    "id": "model-47",
    "name": "deepseek-ai/DeepSeek-V4-Flash",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "3.1M",
    "likes": "1.9k",
    "updatedAt": "1 month ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-48",
    "name": "nvidia/Qwen-Image-Flash",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "295",
    "likes": "55",
    "updatedAt": "5 days ago",
    "author": "nvidia"
  },
  {
    "id": "model-49",
    "name": "Qwen/Qwen3-TTS-12Hz-1.7B-CustomVoice",
    "task": "Text-to-Speech",
    "parameters": 1.7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "2.5M",
    "likes": "1.8k",
    "updatedAt": "6 months ago",
    "author": "Qwen"
  },
  {
    "id": "model-50",
    "name": "yuxinlu1/gemma-4-12B-agentic-fable5-composer2.5-v2-3.5x-tau2-GGUF",
    "task": "Text Generation",
    "parameters": 12.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "448.4k",
    "likes": "1.3k",
    "updatedAt": "1 month ago",
    "author": "yuxinlu1"
  },
  {
    "id": "model-51",
    "name": "inclusionAI/LLaDA2.2-flash",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "328",
    "likes": "59",
    "updatedAt": "4 days ago",
    "author": "inclusionAI"
  },
  {
    "id": "model-52",
    "name": "Alissonerdx/LTX-Best-Face-ID",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "0",
    "likes": "275",
    "updatedAt": "11 days ago",
    "author": "Alissonerdx"
  },
  {
    "id": "model-53",
    "name": "fdtn-ai/antares-350m",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.3k",
    "likes": "58",
    "updatedAt": "6 days ago",
    "author": "fdtn-ai"
  },
  {
    "id": "model-54",
    "name": "unsloth/Kimi-K3-GGUF",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "0",
    "likes": "49",
    "updatedAt": "yesterday",
    "author": "unsloth"
  },
  {
    "id": "model-55",
    "name": "Lightricks/LTX-2.3-22b-IC-LoRA-Clean-Plate",
    "task": "Text Generation",
    "parameters": 22.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "0",
    "likes": "81",
    "updatedAt": "2 days ago",
    "author": "Lightricks"
  },
  {
    "id": "model-56",
    "name": "Comfy-Org/Mage-Flow",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "15.2k",
    "likes": "47",
    "updatedAt": "4 days ago",
    "author": "Comfy-Org"
  },
  {
    "id": "model-57",
    "name": "swiss-ai/Apertus-v1.5-70B",
    "task": "Text Generation",
    "parameters": 70.0,
    "parameterRange": "50B-150B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.7k",
    "likes": "48",
    "updatedAt": "4 days ago",
    "author": "swiss-ai"
  },
  {
    "id": "model-58",
    "name": "unsloth/Qwen3.6-27B-MTP-GGUF",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "3M",
    "likes": "1.2k",
    "updatedAt": "2 months ago",
    "author": "unsloth"
  },
  {
    "id": "model-59",
    "name": "tvall43/Qwen3.6-14B-A3B-FableVibes-GGUF",
    "task": "Text Generation",
    "parameters": 14.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "82.2k",
    "likes": "141",
    "updatedAt": "1 month ago",
    "author": "tvall43"
  },
  {
    "id": "model-60",
    "name": "lightonai/LightOnOCR-2-1B",
    "task": "Text Generation",
    "parameters": 1.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "322.8k",
    "likes": "767",
    "updatedAt": "20 days ago",
    "author": "lightonai"
  },
  {
    "id": "model-61",
    "name": "unsloth/Qwen3.6-35B-A3B-GGUF",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "811.7k",
    "likes": "1.4k",
    "updatedAt": "3 months ago",
    "author": "unsloth"
  },
  {
    "id": "model-62",
    "name": "nota-ai/Solar-Open2-250B-Nota-NVFP4",
    "task": "Text Generation",
    "parameters": 250.0,
    "parameterRange": "150B-500B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "4.8k",
    "likes": "48",
    "updatedAt": "5 days ago",
    "author": "nota-ai"
  },
  {
    "id": "model-63",
    "name": "amd/Instella-MoE-16B-A3B-Think",
    "task": "Text Generation",
    "parameters": 16.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "580",
    "likes": "44",
    "updatedAt": "4 days ago",
    "author": "amd"
  },
  {
    "id": "model-64",
    "name": "black-forest-labs/FLUX.1-dev",
    "task": "Text-to-Image",
    "parameters": 12.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "552k",
    "likes": "13.8k",
    "updatedAt": "1 year ago",
    "author": "black-forest-labs"
  },
  {
    "id": "model-65",
    "name": "mindlab-research/Macaron-V1-Venti",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "282",
    "likes": "43",
    "updatedAt": "5 days ago",
    "author": "mindlab-research"
  },
  {
    "id": "model-66",
    "name": "Nanbeige/Nanbeige4.2-3B-Base",
    "task": "Text Generation",
    "parameters": 3.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.7k",
    "likes": "45",
    "updatedAt": "2 days ago",
    "author": "Nanbeige"
  },
  {
    "id": "model-67",
    "name": "deepseek-ai/DeepSeek-V4-Pro",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.6M",
    "likes": "5.3k",
    "updatedAt": "1 month ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-68",
    "name": "poolside/Laguna-XS-2.1-GGUF",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "39.2k",
    "likes": "71",
    "updatedAt": "10 days ago",
    "author": "poolside"
  },
  {
    "id": "model-69",
    "name": "deepreinforce-ai/Ornith-1.0-35B-GGUF",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "2.9M",
    "likes": "972",
    "updatedAt": "10 days ago",
    "author": "deepreinforce-ai"
  },
  {
    "id": "model-70",
    "name": "FINAL-Bench/POCKET-35B-GGUF",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "7.5k",
    "likes": "53",
    "updatedAt": "2 days ago",
    "author": "FINAL-Bench"
  },
  {
    "id": "model-71",
    "name": "pyannote/speaker-diarization-3.1",
    "task": "Text-to-Speech",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "8.7M",
    "likes": "2.9k",
    "updatedAt": "2 years ago",
    "author": "pyannote"
  },
  {
    "id": "model-72",
    "name": "OpenMOSS-Team/MOSS-Transcribe-Diarize",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "125.3k",
    "likes": "332",
    "updatedAt": "4 days ago",
    "author": "OpenMOSS-Team"
  },
  {
    "id": "model-73",
    "name": "mindlab-research/Macaron-V1-Tall",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "342",
    "likes": "38",
    "updatedAt": "5 days ago",
    "author": "mindlab-research"
  },
  {
    "id": "model-74",
    "name": "openbmb/MiniCPM-RobotManip",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "698",
    "likes": "179",
    "updatedAt": "6 days ago",
    "author": "openbmb"
  },
  {
    "id": "model-75",
    "name": "mateogrgic/GLM-5.2-colibri-int4-with-int8-mtp",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "12k",
    "likes": "129",
    "updatedAt": "14 days ago",
    "author": "mateogrgic"
  },
  {
    "id": "model-76",
    "name": "bartowski/Kwaipilot_KAT-Coder-V2.5-Dev-GGUF",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "28.9k",
    "likes": "36",
    "updatedAt": "4 days ago",
    "author": "bartowski"
  },
  {
    "id": "model-77",
    "name": "swiss-ai/Apertus-v1.5-8B",
    "task": "Text Generation",
    "parameters": 8.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "942",
    "likes": "37",
    "updatedAt": "4 days ago",
    "author": "swiss-ai"
  },
  {
    "id": "model-78",
    "name": "microsoft/Mage-VL",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "308",
    "likes": "36",
    "updatedAt": "yesterday",
    "author": "microsoft"
  },
  {
    "id": "model-79",
    "name": "Virtue-AI-HUB/VulnLLM-R-7B",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "50.5k",
    "likes": "232",
    "updatedAt": "7 months ago",
    "author": "Virtue-AI-HUB"
  },
  {
    "id": "model-80",
    "name": "bottlecapai/ThinkingCap-Qwen3.6-27B-GGUF",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "373.7k",
    "likes": "200",
    "updatedAt": "4 days ago",
    "author": "bottlecapai"
  },
  {
    "id": "model-81",
    "name": "microsoft/Mage-Flow-Base",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "628",
    "likes": "34",
    "updatedAt": "5 days ago",
    "author": "microsoft"
  },
  {
    "id": "model-82",
    "name": "black-forest-labs/FLUX.2-klein-9B",
    "task": "Image-to-Image",
    "parameters": 9.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "333.7k",
    "likes": "1.1k",
    "updatedAt": "5 months ago",
    "author": "black-forest-labs"
  },
  {
    "id": "model-83",
    "name": "circlestone-labs/Anima",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "833.1k",
    "likes": "2k",
    "updatedAt": "4 days ago",
    "author": "circlestone-labs"
  },
  {
    "id": "model-84",
    "name": "empero-ai/Qwythos-9B-Claude-Mythos-5-1M",
    "task": "Text Generation",
    "parameters": 9.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "129.4k",
    "likes": "885",
    "updatedAt": "14 days ago",
    "author": "empero-ai"
  },
  {
    "id": "model-85",
    "name": "nvidia/LocateAnything-3B",
    "task": "Text Generation",
    "parameters": 3.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.2M",
    "likes": "2.8k",
    "updatedAt": "1 month ago",
    "author": "nvidia"
  },
  {
    "id": "model-86",
    "name": "HauhauCS/Gemma-4-E4B-Uncensored-HauhauCS-Aggressive",
    "task": "Text Generation",
    "parameters": 4.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "573.8k",
    "likes": "937",
    "updatedAt": "3 months ago",
    "author": "HauhauCS"
  },
  {
    "id": "model-87",
    "name": "GnLOLot/MiniCPM5-1B-Claude-Opus-Fable5-V2-Thinking-GGUF",
    "task": "Text Generation",
    "parameters": 1.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "196.4k",
    "likes": "171",
    "updatedAt": "15 days ago",
    "author": "GnLOLot"
  },
  {
    "id": "model-88",
    "name": "nota-ai/Solar-Open2-250B-Nota-INT4-GlobalPruned",
    "task": "Text Generation",
    "parameters": 250.0,
    "parameterRange": "150B-500B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "741",
    "likes": "35",
    "updatedAt": "5 days ago",
    "author": "nota-ai"
  },
  {
    "id": "model-89",
    "name": "microsoft/Mage-Flow-Edit",
    "task": "Image-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "558",
    "likes": "32",
    "updatedAt": "5 days ago",
    "author": "microsoft"
  },
  {
    "id": "model-90",
    "name": "pyannote/speaker-diarization-community-1",
    "task": "Text-to-Speech",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "5.1M",
    "likes": "865",
    "updatedAt": "10 months ago",
    "author": "pyannote"
  },
  {
    "id": "model-91",
    "name": "froggeric/Qwen-Fixed-Chat-Templates",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "MLX"
    ],
    "downloads": "0",
    "likes": "984",
    "updatedAt": "25 days ago",
    "author": "froggeric"
  },
  {
    "id": "model-92",
    "name": "DavidAU/Qwen3.6-40B-Claude-4.6-Opus-Deckard-Heretic-Uncensored-Thinking-NEO-CODE-Di-IMatrix-MAX-GGUF",
    "task": "Text Generation",
    "parameters": 40.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "284.4k",
    "likes": "655",
    "updatedAt": "8 days ago",
    "author": "DavidAU"
  },
  {
    "id": "model-93",
    "name": "AliveAi/Krea-2-Edit-Outfit-Transfer",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "4.3k",
    "likes": "42",
    "updatedAt": "8 days ago",
    "author": "AliveAi"
  },
  {
    "id": "model-94",
    "name": "HauhauCS/Qwen3.5-9B-Uncensored-HauhauCS-Aggressive",
    "task": "Text Generation",
    "parameters": 9.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "487.2k",
    "likes": "1.8k",
    "updatedAt": "1 month ago",
    "author": "HauhauCS"
  },
  {
    "id": "model-95",
    "name": "unsloth/gemma-4-26B-A4B-it-qat-GGUF",
    "task": "Text Generation",
    "parameters": 26.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "495.8k",
    "likes": "343",
    "updatedAt": "11 days ago",
    "author": "unsloth"
  },
  {
    "id": "model-96",
    "name": "Comfy-Org/Krea-2",
    "task": "Text Generation",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "10",
    "likes": "372",
    "updatedAt": "8 days ago",
    "author": "Comfy-Org"
  },
  {
    "id": "model-97",
    "name": "prism-ml/Bonsai-27B-mlx-1bit",
    "task": "Text Generation",
    "parameters": 27.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "MLX"
    ],
    "downloads": "39.7k",
    "likes": "188",
    "updatedAt": "14 days ago",
    "author": "prism-ml"
  },
  {
    "id": "model-98",
    "name": "hexgrad/Kokoro-82M",
    "task": "Text-to-Speech",
    "parameters": 0.08,
    "parameterRange": "<1B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "10.3M",
    "likes": "6.6k",
    "updatedAt": "1 year ago",
    "author": "hexgrad"
  },
  {
    "id": "model-99",
    "name": "krea/Krea-2-Raw",
    "task": "Text-to-Image",
    "parameters": 7.0,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "164.5k",
    "likes": "391",
    "updatedAt": "4 days ago",
    "author": "krea"
  },
  {
    "id": "model-100",
    "name": "deepreinforce-ai/Ornith-1.0-35B",
    "task": "Text Generation",
    "parameters": 35.0,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "2.3M",
    "likes": "451",
    "updatedAt": "1 month ago",
    "author": "deepreinforce-ai"
  }
];
