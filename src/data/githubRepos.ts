export interface GitHubRepoItem {
  id: string;
  name: string;
  type: string;
  url: string;
  official: boolean;
}

export interface GitHubRepoCategory {
  id: string;
  title: string;
  description: string;
  featured?: boolean;
  items: GitHubRepoItem[];
}

export const GITHUB_REPO_CATEGORIES: GitHubRepoCategory[] = [
  {
    id: "microsoft-ai",
    title: "Microsoft AI",
    description: "Official Microsoft and Azure AI repos, samples, agent frameworks, and developer tooling.",
    items: [
      { id: "microsoft", name: "microsoft", type: "Org", url: "https://github.com/microsoft", official: true },
      { id: "azure-samples", name: "Azure-Samples", type: "Org", url: "https://github.com/Azure-Samples", official: true },
      { id: "semantic-kernel", name: "semantic-kernel", type: "Framework", url: "https://github.com/microsoft/semantic-kernel", official: true },
      { id: "autogen", name: "autogen", type: "Agent Framework", url: "https://github.com/microsoft/autogen", official: true },
      { id: "promptflow", name: "promptflow", type: "Workflow", url: "https://github.com/microsoft/promptflow", official: true },
      { id: "azure-ai-foundry-samples", name: "azure-ai-foundry-samples", type: "Samples", url: "https://github.com/microsoft/azure-ai-foundry-samples", official: true },
      { id: "microsoftdocs-mcp", name: "microsoftdocs/mcp", type: "Docs / MCP", url: "https://github.com/microsoftdocs/mcp", official: true }
    ]
  },
  {
    id: "google-deepmind-gemini",
    title: "Google / DeepMind / Gemini",
    description: "Google AI, DeepMind, Vertex AI, Gemini cookbook, and edge AI resources.",
    items: [
      { id: "google", name: "google", type: "Org", url: "https://github.com/google", official: true },
      { id: "google-deepmind", name: "google-deepmind", type: "Org", url: "https://github.com/google-deepmind", official: true },
      { id: "google-cloud-platform", name: "GoogleCloudPlatform", type: "Org", url: "https://github.com/GoogleCloudPlatform", official: true },
      { id: "vertex-ai-samples", name: "vertex-ai-samples", type: "Samples", url: "https://github.com/GoogleCloudPlatform/vertex-ai-samples", official: true },
      { id: "gemini-cookbook", name: "google-gemini/cookbook", type: "Cookbook", url: "https://github.com/google-gemini/cookbook", official: true },
      { id: "google-ai-edge", name: "google-ai-edge", type: "Edge AI", url: "https://github.com/google-ai-edge", official: true }
    ]
  },
  {
    id: "anthropic",
    title: "Anthropic",
    description: "Official Anthropic org and SDK repositories for Claude development.",
    items: [
      { id: "anthropics", name: "anthropics", type: "Org", url: "https://github.com/anthropics", official: true },
      { id: "anthropic-sdk-python", name: "anthropic-sdk-python", type: "SDK", url: "https://github.com/anthropics/anthropic-sdk-python", official: true },
      { id: "anthropic-sdk-typescript", name: "anthropic-sdk-typescript", type: "SDK", url: "https://github.com/anthropics/anthropic-sdk-typescript", official: true }
    ]
  },
  {
    id: "meta-ai",
    title: "Meta AI",
    description: "Meta and open-source model ecosystem repos including Llama, PyTorch, and vector search.",
    items: [
      { id: "facebookresearch", name: "facebookresearch", type: "Org", url: "https://github.com/facebookresearch", official: true },
      { id: "meta-llama", name: "meta-llama", type: "Org", url: "https://github.com/meta-llama", official: true },
      { id: "pytorch", name: "pytorch/pytorch", type: "Framework", url: "https://github.com/pytorch/pytorch", official: true },
      { id: "faiss", name: "facebookresearch/faiss", type: "Vector DB", url: "https://github.com/facebookresearch/faiss", official: true },
      { id: "llama-recipes", name: "facebookresearch/llama-recipes", type: "Recipes", url: "https://github.com/facebookresearch/llama-recipes", official: true }
    ]
  },
  {
    id: "nvidia-ai",
    title: "NVIDIA AI",
    description: "NVIDIA accelerated AI repos for training, inference, orchestration, and GPU communication.",
    items: [
      { id: "nvidia", name: "NVIDIA", type: "Org", url: "https://github.com/NVIDIA", official: true },
      { id: "nemo", name: "NVIDIA/NeMo", type: "Framework", url: "https://github.com/NVIDIA/NeMo", official: true },
      { id: "tensorrt", name: "NVIDIA/TensorRT", type: "Inference", url: "https://github.com/NVIDIA/TensorRT", official: true },
      { id: "triton-inference-server", name: "NVIDIA/Triton-Inference-Server", type: "Serving", url: "https://github.com/NVIDIA/Triton-Inference-Server", official: true },
      { id: "nccl", name: "NVIDIA/nccl", type: "Distributed AI", url: "https://github.com/NVIDIA/nccl", official: true }
    ]
  },
  {
    id: "hugging-face",
    title: "Hugging Face",
    description: "Model, dataset, diffusion, training, and fine-tuning ecosystem repositories.",
    items: [
      { id: "huggingface", name: "huggingface", type: "Org", url: "https://github.com/huggingface", official: true },
      { id: "transformers", name: "huggingface/transformers", type: "Framework", url: "https://github.com/huggingface/transformers", official: true },
      { id: "diffusers", name: "huggingface/diffusers", type: "Multimodal", url: "https://github.com/huggingface/diffusers", official: true },
      { id: "datasets", name: "huggingface/datasets", type: "Datasets", url: "https://github.com/huggingface/datasets", official: true },
      { id: "accelerate", name: "huggingface/accelerate", type: "Training", url: "https://github.com/huggingface/accelerate", official: true },
      { id: "trl", name: "huggingface/trl", type: "RLHF / Fine-tuning", url: "https://github.com/huggingface/trl", official: true }
    ]
  },
  {
    id: "aws-ai",
    title: "AWS AI",
    description: "AWS generative AI, Bedrock, SageMaker, and sample repositories.",
    items: [
      { id: "aws", name: "aws", type: "Org", url: "https://github.com/aws", official: true },
      { id: "aws-samples", name: "aws-samples", type: "Org", url: "https://github.com/aws-samples", official: true },
      { id: "amazon-bedrock-samples", name: "amazon-bedrock-samples", type: "Samples", url: "https://github.com/aws-samples/amazon-bedrock-samples", official: true },
      { id: "awslabs", name: "awslabs", type: "Org", url: "https://github.com/awslabs", official: true },
      { id: "sagemaker-examples", name: "aws/amazon-sagemaker-examples", type: "Examples", url: "https://github.com/aws/amazon-sagemaker-examples", official: true }
    ]
  },
  {
    id: "databricks-mlops",
    title: "Databricks / MLOps",
    description: "Production ML and AI operations tooling across experiment tracking, pipelines, and feature stores.",
    items: [
      { id: "databricks", name: "databricks", type: "Org", url: "https://github.com/databricks", official: true },
      { id: "mlflow", name: "mlflow/mlflow", type: "MLOps", url: "https://github.com/mlflow/mlflow", official: true },
      { id: "kubeflow", name: "kubeflow/kubeflow", type: "Pipelines", url: "https://github.com/kubeflow/kubeflow", official: true },
      { id: "feast", name: "feast-dev/feast", type: "Feature Store", url: "https://github.com/feast-dev/feast", official: true }
    ]
  },
  {
    id: "langchain-agentic-ai",
    title: "LangChain / Agentic AI",
    description: "Agentic AI frameworks and orchestration repos for multi-agent and workflow systems.",
    items: [
      { id: "langchain", name: "langchain-ai/langchain", type: "Framework", url: "https://github.com/langchain-ai/langchain", official: true },
      { id: "langgraph", name: "langchain-ai/langgraph", type: "Agent Graph", url: "https://github.com/langchain-ai/langgraph", official: true },
      { id: "crewai", name: "crewAIInc/crewAI", type: "Multi-Agent", url: "https://github.com/crewAIInc/crewAI", official: true },
      { id: "autogen-agentic", name: "microsoft/autogen", type: "Agent Framework", url: "https://github.com/microsoft/autogen", official: true },
      { id: "semantic-kernel-agentic", name: "microsoft/semantic-kernel", type: "Orchestration", url: "https://github.com/microsoft/semantic-kernel", official: true }
    ]
  },
  {
    id: "ai-learning-repos",
    title: "AI Learning Repo",
    description: "Curated learning-first repositories for GenAI, ML, agents, MLOps, and real-world AI projects.",
    featured: true,
    items: [
      { id: "generative-ai-for-beginners", name: "microsoft/generative-ai-for-beginners", type: "Course", url: "https://github.com/microsoft/generative-ai-for-beginners", official: true },
      { id: "ai-agents-for-beginners", name: "microsoft/ai-agents-for-beginners", type: "Course", url: "https://github.com/microsoft/ai-agents-for-beginners", official: true },
      { id: "ml-for-beginners", name: "microsoft/ML-For-Beginners", type: "Course", url: "https://github.com/microsoft/ML-For-Beginners", official: true },
      { id: "openai-cookbook", name: "openai/openai-cookbook", type: "Cookbook", url: "https://github.com/openai/openai-cookbook", official: true },
      { id: "openai-python", name: "openai/openai-python", type: "SDK", url: "https://github.com/openai/openai-python", official: true },
      { id: "google-gemini-cookbook-learning", name: "google-gemini/cookbook", type: "Cookbook", url: "https://github.com/google-gemini/cookbook", official: true },
      { id: "semantic-kernel-learning", name: "microsoft/semantic-kernel", type: "Framework", url: "https://github.com/microsoft/semantic-kernel", official: true },
      { id: "autogen-learning", name: "microsoft/autogen", type: "Agent Framework", url: "https://github.com/microsoft/autogen", official: true },
      { id: "langchain-learning", name: "langchain-ai/langchain", type: "Framework", url: "https://github.com/langchain-ai/langchain", official: true },
      { id: "langgraph-learning", name: "langchain-ai/langgraph", type: "Agent Graph", url: "https://github.com/langchain-ai/langgraph", official: true },
      { id: "awesome-llm-apps", name: "Shubhamsaboo/awesome-llm-apps", type: "Projects", url: "https://github.com/Shubhamsaboo/awesome-llm-apps", official: false },
      { id: "llm-zoomcamp", name: "DataTalksClub/llm-zoomcamp", type: "Bootcamp", url: "https://github.com/DataTalksClub/llm-zoomcamp", official: false },
      { id: "llms-from-scratch", name: "rasbt/LLMs-from-scratch", type: "Deep Learning", url: "https://github.com/rasbt/LLMs-from-scratch", official: false },
      { id: "transformers-learning", name: "huggingface/transformers", type: "Framework", url: "https://github.com/huggingface/transformers", official: true },
      { id: "datasets-learning", name: "huggingface/datasets", type: "Datasets", url: "https://github.com/huggingface/datasets", official: true },
      { id: "nemo-learning", name: "NVIDIA/NeMo", type: "Framework", url: "https://github.com/NVIDIA/NeMo", official: true },
      { id: "mlflow-learning", name: "mlflow/mlflow", type: "MLOps", url: "https://github.com/mlflow/mlflow", official: true },
      { id: "kubeflow-learning", name: "kubeflow/kubeflow", type: "Pipelines", url: "https://github.com/kubeflow/kubeflow", official: true },
      { id: "amazon-bedrock-samples-learning", name: "aws-samples/amazon-bedrock-samples", type: "Samples", url: "https://github.com/aws-samples/amazon-bedrock-samples", official: true },
      { id: "vertex-ai-samples-learning", name: "GoogleCloudPlatform/vertex-ai-samples", type: "Samples", url: "https://github.com/GoogleCloudPlatform/vertex-ai-samples", official: true },
      { id: "github-mcp-server", name: "github/github-mcp-server", type: "MCP", url: "https://github.com/github/github-mcp-server", official: true }
    ]
  }
];
