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
    "name": "black-forest-labs/FLUX.1-dev",
    "task": "Text-to-Image",
    "parameters": 12,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.1M",
    "likes": "13.4k",
    "updatedAt": "some days ago",
    "author": "black-forest-labs"
  },
  {
    "id": "model-2",
    "name": "deepseek-ai/DeepSeek-R1",
    "task": "Text Generation",
    "parameters": 9.2,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "7.8M",
    "likes": "13.4k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-3",
    "name": "stabilityai/stable-diffusion-xl-base-1.0",
    "task": "Text-to-Image",
    "parameters": 2.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.3M",
    "likes": "7.9k",
    "updatedAt": "some days ago",
    "author": "stabilityai"
  },
  {
    "id": "model-4",
    "name": "CompVis/stable-diffusion-v1-4",
    "task": "Text-to-Image",
    "parameters": 2.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "426.8k",
    "likes": "7k",
    "updatedAt": "some days ago",
    "author": "CompVis"
  },
  {
    "id": "model-5",
    "name": "meta-llama/Meta-Llama-3-8B",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "1.2M",
    "likes": "6.6k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-6",
    "name": "hexgrad/Kokoro-82M",
    "task": "Text-to-Speech",
    "parameters": 0.08,
    "parameterRange": "<1B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "14.4M",
    "likes": "6.4k",
    "updatedAt": "some days ago",
    "author": "hexgrad"
  },
  {
    "id": "model-7",
    "name": "meta-llama/Llama-3.1-8B-Instruct",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "9.7M",
    "likes": "6.2k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-8",
    "name": "openai/whisper-large-v3",
    "task": "Text-to-Speech",
    "parameters": 1.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "5.8M",
    "likes": "5.9k",
    "updatedAt": "some days ago",
    "author": "openai"
  },
  {
    "id": "model-9",
    "name": "black-forest-labs/FLUX.1-schnell",
    "task": "Text-to-Image",
    "parameters": 12,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "240.3k",
    "likes": "5.3k",
    "updatedAt": "some days ago",
    "author": "black-forest-labs"
  },
  {
    "id": "model-10",
    "name": "deepseek-ai/DeepSeek-V4-Pro",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.1M",
    "likes": "5.1k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-11",
    "name": "sentence-transformers/all-MiniLM-L6-v2",
    "task": "Text Generation",
    "parameters": 4,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "246.4M",
    "likes": "5k",
    "updatedAt": "some days ago",
    "author": "sentence-transformers"
  },
  {
    "id": "model-12",
    "name": "bigscience/bloom",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "5.2k",
    "likes": "5k",
    "updatedAt": "some days ago",
    "author": "bigscience"
  },
  {
    "id": "model-13",
    "name": "stabilityai/stable-diffusion-3-medium",
    "task": "Text-to-Image",
    "parameters": 2.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "3.6k",
    "likes": "5k",
    "updatedAt": "some days ago",
    "author": "stabilityai"
  },
  {
    "id": "model-14",
    "name": "openai/gpt-oss-120b",
    "task": "Text Generation",
    "parameters": 120,
    "parameterRange": "50B-150B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "4.1M",
    "likes": "4.9k",
    "updatedAt": "some days ago",
    "author": "openai"
  },
  {
    "id": "model-15",
    "name": "Tongyi-MAI/Z-Image-Turbo",
    "task": "Text-to-Image",
    "parameters": 12.1,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "921.8k",
    "likes": "4.9k",
    "updatedAt": "some days ago",
    "author": "Tongyi-MAI"
  },
  {
    "id": "model-16",
    "name": "meta-llama/Llama-2-7b-chat-hf",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "281.5k",
    "likes": "4.8k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-17",
    "name": "openai/gpt-oss-20b",
    "task": "Text Generation",
    "parameters": 20,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "7M",
    "likes": "4.8k",
    "updatedAt": "some days ago",
    "author": "openai"
  },
  {
    "id": "model-18",
    "name": "mistralai/Mixtral-8x7B-Instruct-v0.1",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "521.1k",
    "likes": "4.7k",
    "updatedAt": "some days ago",
    "author": "mistralai"
  },
  {
    "id": "model-19",
    "name": "meta-llama/Meta-Llama-3-8B-Instruct",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "1.3M",
    "likes": "4.7k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-20",
    "name": "meta-llama/Llama-2-7b",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "139",
    "likes": "4.5k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-21",
    "name": "mistralai/Mistral-7B-v0.1",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "882.5k",
    "likes": "4.1k",
    "updatedAt": "some days ago",
    "author": "mistralai"
  },
  {
    "id": "model-22",
    "name": "deepseek-ai/DeepSeek-V3",
    "task": "Text Generation",
    "parameters": 671,
    "parameterRange": ">500B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.1M",
    "likes": "4.1k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-23",
    "name": "lllyasviel/ControlNet-v1-1",
    "task": "Text Generation",
    "parameters": 11.9,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "34.2k",
    "likes": "4.1k",
    "updatedAt": "some days ago",
    "author": "lllyasviel"
  },
  {
    "id": "model-24",
    "name": "WarriorMama777/OrangeMixs",
    "task": "Text-to-Image",
    "parameters": 6.3,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.4k",
    "likes": "3.9k",
    "updatedAt": "some days ago",
    "author": "WarriorMama777"
  },
  {
    "id": "model-25",
    "name": "lllyasviel/ControlNet",
    "task": "Text Generation",
    "parameters": 8.4,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "28.6k",
    "likes": "3.8k",
    "updatedAt": "some days ago",
    "author": "lllyasviel"
  },
  {
    "id": "model-26",
    "name": "coqui/XTTS-v2",
    "task": "Text-to-Speech",
    "parameters": 13,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "9.3M",
    "likes": "3.6k",
    "updatedAt": "some days ago",
    "author": "coqui"
  },
  {
    "id": "model-27",
    "name": "deepseek-ai/Janus-Pro-7B",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "12.6k",
    "likes": "3.6k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-28",
    "name": "stabilityai/stable-diffusion-3.5-large",
    "task": "Text-to-Image",
    "parameters": 2.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "27.1k",
    "likes": "3.6k",
    "updatedAt": "some days ago",
    "author": "stabilityai"
  },
  {
    "id": "model-29",
    "name": "microsoft/phi-2",
    "task": "Text Generation",
    "parameters": 10.7,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "738.6k",
    "likes": "3.5k",
    "updatedAt": "some days ago",
    "author": "microsoft"
  },
  {
    "id": "model-30",
    "name": "google/gemma-7b",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers",
      "GGUF"
    ],
    "downloads": "30.4k",
    "likes": "3.4k",
    "updatedAt": "some days ago",
    "author": "google"
  },
  {
    "id": "model-31",
    "name": "stabilityai/stable-video-diffusion-img2vid-xt",
    "task": "Text Generation",
    "parameters": 4.3,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "216.5k",
    "likes": "3.3k",
    "updatedAt": "some days ago",
    "author": "stabilityai"
  },
  {
    "id": "model-32",
    "name": "openai-community/gpt2",
    "task": "Text Generation",
    "parameters": 9.7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "13.3M",
    "likes": "3.3k",
    "updatedAt": "some days ago",
    "author": "openai-community"
  },
  {
    "id": "model-33",
    "name": "deepseek-ai/DeepSeek-OCR",
    "task": "Text Generation",
    "parameters": 1.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "2.3M",
    "likes": "3.3k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-34",
    "name": "zai-org/GLM-5.2",
    "task": "Text Generation",
    "parameters": 6.2,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "176.2k",
    "likes": "3.2k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-35",
    "name": "prompthero/openjourney",
    "task": "Text-to-Image",
    "parameters": 13.4,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "6.1k",
    "likes": "3.2k",
    "updatedAt": "some days ago",
    "author": "prompthero"
  },
  {
    "id": "model-36",
    "name": "BAAI/bge-m3",
    "task": "Text Generation",
    "parameters": 8.3,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "32M",
    "likes": "3.2k",
    "updatedAt": "some days ago",
    "author": "BAAI"
  },
  {
    "id": "model-37",
    "name": "mistralai/Mistral-7B-Instruct-v0.2",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "981.5k",
    "likes": "3.2k",
    "updatedAt": "some days ago",
    "author": "mistralai"
  },
  {
    "id": "model-38",
    "name": "deepseek-ai/DeepSeek-V3-0324",
    "task": "Text Generation",
    "parameters": 671,
    "parameterRange": ">500B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.1M",
    "likes": "3.1k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-39",
    "name": "openai/whisper-large-v3-turbo",
    "task": "Text-to-Speech",
    "parameters": 1.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "6.9M",
    "likes": "3.1k",
    "updatedAt": "some days ago",
    "author": "openai"
  },
  {
    "id": "model-40",
    "name": "google/gemma-4-31B-it",
    "task": "Text Generation",
    "parameters": 31,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "11.2M",
    "likes": "3.1k",
    "updatedAt": "some days ago",
    "author": "google"
  },
  {
    "id": "model-41",
    "name": "bigcode/starcoder",
    "task": "Text Generation",
    "parameters": 9.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "21.8k",
    "likes": "3k",
    "updatedAt": "some days ago",
    "author": "bigcode"
  },
  {
    "id": "model-42",
    "name": "Qwen/QwQ-32B",
    "task": "Text Generation",
    "parameters": 32,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "83.5k",
    "likes": "2.9k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-43",
    "name": "zai-org/chatglm-6b",
    "task": "Text Generation",
    "parameters": 6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "2.5k",
    "likes": "2.9k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-44",
    "name": "Jackrong/Qwen3.5-27B-Claude-4.6-Opus-Reasoning-Distilled",
    "task": "Text Generation",
    "parameters": 27,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "157k",
    "likes": "2.9k",
    "updatedAt": "some days ago",
    "author": "Jackrong"
  },
  {
    "id": "model-45",
    "name": "nari-labs/Dia-1.6B",
    "task": "Text-to-Speech",
    "parameters": 1.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "5.6k",
    "likes": "2.9k",
    "updatedAt": "some days ago",
    "author": "nari-labs"
  },
  {
    "id": "model-46",
    "name": "CompVis/stable-diffusion-v-1-4-original",
    "task": "Text-to-Image",
    "parameters": 2.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "2",
    "likes": "2.9k",
    "updatedAt": "some days ago",
    "author": "CompVis"
  },
  {
    "id": "model-47",
    "name": "meta-llama/Llama-3.3-70B-Instruct",
    "task": "Text Generation",
    "parameters": 70,
    "parameterRange": "50B-150B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "761.5k",
    "likes": "2.9k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-48",
    "name": "moonshotai/Kimi-K2.5",
    "task": "Text Generation",
    "parameters": 8.3,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.5M",
    "likes": "2.8k",
    "updatedAt": "some days ago",
    "author": "moonshotai"
  },
  {
    "id": "model-49",
    "name": "google-bert/bert-base-uncased",
    "task": "Text Generation",
    "parameters": 8.8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "61.8M",
    "likes": "2.7k",
    "updatedAt": "some days ago",
    "author": "google-bert"
  },
  {
    "id": "model-50",
    "name": "black-forest-labs/FLUX.1-Kontext-dev",
    "task": "Image-to-Image",
    "parameters": 12,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "160.3k",
    "likes": "2.7k",
    "updatedAt": "some days ago",
    "author": "black-forest-labs"
  },
  {
    "id": "model-51",
    "name": "mistralai/Mistral-7B-Instruct-v0.3",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "3.6M",
    "likes": "2.7k",
    "updatedAt": "some days ago",
    "author": "mistralai"
  },
  {
    "id": "model-52",
    "name": "stabilityai/sdxl-turbo",
    "task": "Text-to-Image",
    "parameters": 9.2,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "629.6k",
    "likes": "2.6k",
    "updatedAt": "some days ago",
    "author": "stabilityai"
  },
  {
    "id": "model-53",
    "name": "nvidia/personaplex-7b-v1",
    "task": "Text-to-Speech",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "365.9k",
    "likes": "2.6k",
    "updatedAt": "some days ago",
    "author": "nvidia"
  },
  {
    "id": "model-54",
    "name": "pyannote/speaker-diarization-3.1",
    "task": "Text-to-Speech",
    "parameters": 5.8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "8.2M",
    "likes": "2.6k",
    "updatedAt": "some days ago",
    "author": "pyannote"
  },
  {
    "id": "model-55",
    "name": "nvidia/LocateAnything-3B",
    "task": "Text Generation",
    "parameters": 3,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1M",
    "likes": "2.6k",
    "updatedAt": "some days ago",
    "author": "nvidia"
  },
  {
    "id": "model-56",
    "name": "yuxinlu1/gemma-4-12B-coder-fable5-composer2.5-v1-GGUF",
    "task": "Text Generation",
    "parameters": 12,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "614.1k",
    "likes": "2.6k",
    "updatedAt": "some days ago",
    "author": "yuxinlu1"
  },
  {
    "id": "model-57",
    "name": "Qwen/Qwen-Image",
    "task": "Text-to-Image",
    "parameters": 9.4,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "187k",
    "likes": "2.5k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-58",
    "name": "hakurei/waifu-diffusion",
    "task": "Text-to-Image",
    "parameters": 6.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "1.5k",
    "likes": "2.5k",
    "updatedAt": "some days ago",
    "author": "hakurei"
  },
  {
    "id": "model-59",
    "name": "meta-llama/Llama-3.2-1B",
    "task": "Text Generation",
    "parameters": 1,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "1.9M",
    "likes": "2.5k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-60",
    "name": "deepseek-ai/DeepSeek-R1-0528",
    "task": "Text Generation",
    "parameters": 2.8,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "3M",
    "likes": "2.5k",
    "updatedAt": "some days ago",
    "author": "deepseek-ai"
  },
  {
    "id": "model-61",
    "name": "Qwen/Qwen-Image-Edit",
    "task": "Image-to-Image",
    "parameters": 6,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "71.2k",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-62",
    "name": "tiiuae/falcon-40b",
    "task": "Text Generation",
    "parameters": 40,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "29.5k",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "tiiuae"
  },
  {
    "id": "model-63",
    "name": "xai-org/grok-1",
    "task": "Text Generation",
    "parameters": 1.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "204",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "xai-org"
  },
  {
    "id": "model-64",
    "name": "microsoft/VibeVoice-1.5B",
    "task": "Text-to-Speech",
    "parameters": 1.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "236.6k",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "microsoft"
  },
  {
    "id": "model-65",
    "name": "Kijai/WanVideo_comfy",
    "task": "Text Generation",
    "parameters": 9.9,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "2M",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "Kijai"
  },
  {
    "id": "model-66",
    "name": "sesame/csm-1b",
    "task": "Text-to-Speech",
    "parameters": 1,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "310k",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "sesame"
  },
  {
    "id": "model-67",
    "name": "HauhauCS/Qwen3.6-35B-A3B-Uncensored-HauhauCS-Aggressive",
    "task": "Text Generation",
    "parameters": 35,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF"
    ],
    "downloads": "3.1M",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "HauhauCS"
  },
  {
    "id": "model-68",
    "name": "facebook/sam3",
    "task": "Text Generation",
    "parameters": 8.7,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.7M",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "facebook"
  },
  {
    "id": "model-69",
    "name": "moonshotai/Kimi-K2-Instruct",
    "task": "Text Generation",
    "parameters": 13,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "420.3k",
    "likes": "2.4k",
    "updatedAt": "some days ago",
    "author": "moonshotai"
  },
  {
    "id": "model-70",
    "name": "meta-llama/Llama-2-7b-hf",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "701k",
    "likes": "2.3k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-71",
    "name": "Qwen/Qwen3.6-35B-A3B",
    "task": "Text Generation",
    "parameters": 35,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "5.7M",
    "likes": "2.3k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-72",
    "name": "meta-llama/Llama-3.1-8B",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "1.5M",
    "likes": "2.3k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-73",
    "name": "meta-llama/Llama-3.2-3B-Instruct",
    "task": "Text Generation",
    "parameters": 3,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "2.2M",
    "likes": "2.3k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-74",
    "name": "microsoft/phi-4",
    "task": "Text Generation",
    "parameters": 2.3,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "855.5k",
    "likes": "2.3k",
    "updatedAt": "some days ago",
    "author": "microsoft"
  },
  {
    "id": "model-75",
    "name": "Phr00t/Qwen-Image-Edit-Rapid-AIO",
    "task": "Text-to-Image",
    "parameters": 5.1,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch"
    ],
    "downloads": "40.8k",
    "likes": "2.2k",
    "updatedAt": "some days ago",
    "author": "Phr00t"
  },
  {
    "id": "model-76",
    "name": "Lightricks/LTX-Video",
    "task": "Text Generation",
    "parameters": 14.8,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "457.4k",
    "likes": "2.2k",
    "updatedAt": "some days ago",
    "author": "Lightricks"
  },
  {
    "id": "model-77",
    "name": "meta-llama/Llama-2-70b-chat-hf",
    "task": "Text Generation",
    "parameters": 70,
    "parameterRange": "50B-150B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "5.7k",
    "likes": "2.2k",
    "updatedAt": "some days ago",
    "author": "meta-llama"
  },
  {
    "id": "model-78",
    "name": "tencent/HunyuanVideo",
    "task": "Text Generation",
    "parameters": 4.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "845",
    "likes": "2.2k",
    "updatedAt": "some days ago",
    "author": "tencent"
  },
  {
    "id": "model-79",
    "name": "ByteDance/SDXL-Lightning",
    "task": "Text-to-Image",
    "parameters": 13.7,
    "parameterRange": "10B-50B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "54.9k",
    "likes": "2.2k",
    "updatedAt": "some days ago",
    "author": "ByteDance"
  },
  {
    "id": "model-80",
    "name": "lllyasviel/sd_control_collection",
    "task": "Text Generation",
    "parameters": 10.8,
    "parameterRange": "10B-50B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "45.3k",
    "likes": "2.1k",
    "updatedAt": "some days ago",
    "author": "lllyasviel"
  },
  {
    "id": "model-81",
    "name": "zai-org/GLM-5",
    "task": "Text Generation",
    "parameters": 4.4,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "69.8k",
    "likes": "2.1k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-82",
    "name": "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
    "task": "Text Generation",
    "parameters": 70,
    "parameterRange": "50B-150B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "14.9k",
    "likes": "2.1k",
    "updatedAt": "some days ago",
    "author": "nvidia"
  },
  {
    "id": "model-83",
    "name": "Qwen/Qwen2.5-Coder-32B-Instruct",
    "task": "Text Generation",
    "parameters": 32,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "1.4M",
    "likes": "2.1k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-84",
    "name": "zai-org/chatglm2-6b",
    "task": "Text Generation",
    "parameters": 6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "414.9k",
    "likes": "2.1k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-85",
    "name": "stabilityai/stable-diffusion-xl-refiner-1.0",
    "task": "Image-to-Image",
    "parameters": 2.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "160.3k",
    "likes": "2k",
    "updatedAt": "some days ago",
    "author": "stabilityai"
  },
  {
    "id": "model-86",
    "name": "openai/clip-vit-large-patch14",
    "task": "Text Generation",
    "parameters": 8,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "12.3M",
    "likes": "2k",
    "updatedAt": "some days ago",
    "author": "openai"
  },
  {
    "id": "model-87",
    "name": "zai-org/GLM-4.7",
    "task": "Text Generation",
    "parameters": 5.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "60.4k",
    "likes": "2k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-88",
    "name": "briaai/RMBG-1.4",
    "task": "Computer Vision",
    "parameters": 9.6,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "312.6k",
    "likes": "2k",
    "updatedAt": "some days ago",
    "author": "briaai"
  },
  {
    "id": "model-89",
    "name": "google/gemma-3-27b-it",
    "task": "Text Generation",
    "parameters": 27,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "962.3k",
    "likes": "2k",
    "updatedAt": "some days ago",
    "author": "google"
  },
  {
    "id": "model-90",
    "name": "Qwen/Qwen2.5-Omni-7B",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "637.2k",
    "likes": "1.9k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-91",
    "name": "zai-org/GLM-OCR",
    "task": "Text Generation",
    "parameters": 4.2,
    "parameterRange": "1B-10B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "3.1M",
    "likes": "1.9k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-92",
    "name": "h94/IP-Adapter-FaceID",
    "task": "Text-to-Image",
    "parameters": 6.5,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "174.4k",
    "likes": "1.9k",
    "updatedAt": "some days ago",
    "author": "h94"
  },
  {
    "id": "model-93",
    "name": "Qwen/Qwen3.6-27B",
    "task": "Text Generation",
    "parameters": 27,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "5.1M",
    "likes": "1.9k",
    "updatedAt": "some days ago",
    "author": "Qwen"
  },
  {
    "id": "model-94",
    "name": "black-forest-labs/FLUX.2-dev",
    "task": "Image-to-Image",
    "parameters": 4.8,
    "parameterRange": "1B-10B",
    "libraries": [
      "Diffusers"
    ],
    "downloads": "269.2k",
    "likes": "1.9k",
    "updatedAt": "some days ago",
    "author": "black-forest-labs"
  },
  {
    "id": "model-95",
    "name": "HuggingFaceH4/zephyr-7b-beta",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "173.8k",
    "likes": "1.8k",
    "updatedAt": "some days ago",
    "author": "HuggingFaceH4"
  },
  {
    "id": "model-96",
    "name": "mistralai/Mistral-7B-Instruct-v0.1",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "257.8k",
    "likes": "1.8k",
    "updatedAt": "some days ago",
    "author": "mistralai"
  },
  {
    "id": "model-97",
    "name": "SulphurAI/Sulphur-2-base",
    "task": "Text Generation",
    "parameters": 10,
    "parameterRange": "10B-50B",
    "libraries": [
      "GGUF",
      "Diffusers"
    ],
    "downloads": "735k",
    "likes": "1.8k",
    "updatedAt": "some days ago",
    "author": "SulphurAI"
  },
  {
    "id": "model-98",
    "name": "zai-org/GLM-5.1",
    "task": "Text Generation",
    "parameters": 12.3,
    "parameterRange": "10B-50B",
    "libraries": [
      "Transformers"
    ],
    "downloads": "99.2k",
    "likes": "1.8k",
    "updatedAt": "some days ago",
    "author": "zai-org"
  },
  {
    "id": "model-99",
    "name": "microsoft/Florence-2-large",
    "task": "Text Generation",
    "parameters": 5.2,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "665.6k",
    "likes": "1.8k",
    "updatedAt": "some days ago",
    "author": "microsoft"
  },
  {
    "id": "model-100",
    "name": "mistralai/Mixtral-8x7B-v0.1",
    "task": "Text Generation",
    "parameters": 7,
    "parameterRange": "1B-10B",
    "libraries": [
      "PyTorch",
      "Transformers"
    ],
    "downloads": "47.1k",
    "likes": "1.8k",
    "updatedAt": "some days ago",
    "author": "mistralai"
  }
];
