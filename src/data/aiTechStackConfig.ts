export interface TechStackTechnology {
  id: string;
  name: string;
  category: string;
  company: string;
  shortTagline: string;
  description: string;
  docsUrl: string;
  homepageUrl: string;
  typeBadges: string[];
}

export interface TechStackLayer {
  id: string;
  name: string;
  order: number;
  description: string;
  icon: string; // Lucide icon identifier or SVG name
  technologies: TechStackTechnology[];
}

export interface TechStackConfig {
  layers: TechStackLayer[];
}

export const aiTechStackConfig: TechStackConfig = {
  layers: [
    {
      id: "interface",
      name: "Interface Layer",
      order: 1,
      description: "How users, systems, and teams interact with, prompt, and receive actions from autonomous agents.",
      icon: "MessageSquare",
      technologies: [
        {
          id: "react",
          name: "React",
          category: "Frontend Library",
          company: "Meta / OSS",
          shortTagline: "A component-based UI library for streaming chat and control dashboards.",
          description: "React serves as the UI engine for agent frontends. In agentic workflows, it is critical for rendering low-latency token streaming, dynamic layout adjustments, and rich tool-output visualizations, enabling developers to build responsive operator control rooms.",
          docsUrl: "https://react.dev",
          homepageUrl: "https://react.dev",
          typeBadges: ["Open-Source", "Client-Side", "UI Library"]
        },
        {
          id: "nextjs",
          name: "Next.js",
          category: "Web Framework",
          company: "Vercel / OSS",
          shortTagline: "React framework for production-ready, server-side rendered agent portals.",
          description: "Next.js optimizes agentic web portals using server-side rendering (SSR) and API routes. It secures LLM keys by proxying requests, optimizes asset loads, and manages secure session states for multi-agent dashboards.",
          docsUrl: "https://nextjs.org/docs",
          homepageUrl: "https://nextjs.org",
          typeBadges: ["Open-Source", "Full-Stack", "SSR"]
        },
        {
          id: "streamlit",
          name: "Streamlit",
          category: "Data App Framework",
          company: "Snowflake / OSS",
          shortTagline: "Python-native framework to spin up AI and RAG web apps in minutes.",
          description: "Streamlit allows engineers to write Python scripts and instantly turn them into interactive web applications. It is widely used in agent workflows for prototyping chat boxes, testing prompt outputs, and rendering RAG search traces without writing Javascript.",
          docsUrl: "https://docs.streamlit.io",
          homepageUrl: "https://streamlit.io",
          typeBadges: ["Open-Source", "Python", "Rapid Proto"]
        },
        {
          id: "fastapi",
          name: "FastAPI",
          category: "API Framework",
          company: "Independent / OSS",
          shortTagline: "High-performance, async API bridge for streaming agent workflows.",
          description: "FastAPI is a modern Python API framework optimized for high-concurrency workloads. Built-in WebSocket and Server-Sent Events (SSE) support make it the industry standard for streaming real-time tokens and tool events from backend engines to client frontends.",
          docsUrl: "https://fastapi.tiangolo.com",
          homepageUrl: "https://fastapi.tiangolo.com",
          typeBadges: ["Open-Source", "Python", "API", "Async"]
        }
      ]
    },
    {
      id: "orchestration",
      name: "Orchestration & Agent Framework Layer",
      order: 2,
      description: "The cognitive engines that manage agent loops, planning, tool usage, memory states, and multi-agent systems.",
      icon: "Cpu",
      technologies: [
        {
          id: "langgraph",
          name: "LangGraph",
          category: "Agent Framework",
          company: "LangChain / OSS",
          shortTagline: "Orchestration engine for building stateful, multi-agent cyclic workflows.",
          description: "LangGraph enables the creation of complex, looping agentic graphs. Unlike linear pipelines, it allows agents to cycle back for self-correction, maintain multi-actor state, and run nested loops, making it essential for complex production reasoning systems.",
          docsUrl: "https://langchain-ai.github.io/langgraph/",
          homepageUrl: "https://langchain.com",
          typeBadges: ["Open-Source", "Python/JS", "Multi-Agent"]
        },
        {
          id: "crewai",
          name: "CrewAI",
          category: "Agent Framework",
          company: "CrewAI / OSS",
          shortTagline: "Role-based orchestrator for coordinating teams of autonomous agents.",
          description: "CrewAI orchestrates teams of specialized agents with dedicated personas, tools, and goals. It handles task delegation, sequential or hierarchical workflows, and inter-agent communication, enabling complex collective task execution for enterprise automations.",
          docsUrl: "https://docs.crewai.com",
          homepageUrl: "https://crewai.com",
          typeBadges: ["Open-Source", "Python", "Role-Playing"]
        },
        {
          id: "llamaindex",
          name: "LlamaIndex",
          category: "Data Framework",
          company: "LlamaIndex / OSS",
          shortTagline: "Data bridge connecting private files and knowledge stores to agent runtimes.",
          description: "LlamaIndex acts as the data ingestion and query engine for agent architectures. It provides structured connectors, advanced indices, and semantic retrieval components that allow agents to reason over complex PDF layouts, databases, and enterprise data nodes.",
          docsUrl: "https://docs.llamaindex.ai",
          homepageUrl: "https://llamaindex.ai",
          typeBadges: ["Open-Source", "Python/JS", "RAG", "Data-Bridge"]
        },
        {
          id: "semantic-kernel",
          name: "Semantic Kernel",
          category: "Enterprise SDK",
          company: "Microsoft / OSS",
          shortTagline: "SDK integrating LLMs natively with enterprise languages like C# and Java.",
          description: "Semantic Kernel is an enterprise SDK that embeds AI models into existing production applications. It provides structured planning capabilities, automatic vector mapping, and native integration with Microsoft Copilot systems for corporate environments.",
          docsUrl: "https://learn.microsoft.com/en-us/semantic-kernel/",
          homepageUrl: "https://github.com/microsoft/semantic-kernel",
          typeBadges: ["Open-Source", "C# / Java", "Enterprise"]
        }
      ]
    },
    {
      id: "models",
      name: "Foundation Models / LLM Layer",
      order: 3,
      description: "The core reasoning engines, coding systems, and multimodal cores powering agent intelligence.",
      icon: "Brain",
      technologies: [
        {
          id: "claude-3-7-sonnet",
          name: "Claude 3.7 Sonnet",
          category: "Foundation Model",
          company: "Anthropic",
          shortTagline: "Frontier reasoning model with native hybrid tool-use and computer navigation.",
          description: "Claude 3.7 Sonnet represents a major leap in agentic execution. Featuring hybrid computer use, advanced code-writing proficiency, and superior logic, it serves as the primary intelligence backend for developer agents and complex data extraction systems.",
          docsUrl: "https://docs.anthropic.com/en/docs/welcome",
          homepageUrl: "https://anthropic.com",
          typeBadges: ["API-Accessible", "Multimodal", "Hybrid Thinking"]
        },
        {
          id: "gemini-1-5-pro",
          name: "Gemini 1.5 Pro",
          category: "Foundation Model",
          company: "Google",
          shortTagline: "Frontier multimodal model featuring a native 2-million token context window.",
          description: "Gemini 1.5 Pro enables agents to ingest entire codebases, video archives, or extensive document libraries in a single call. Its native long-context window bypasses complex chunking strategies, allowing for exhaustive context processing.",
          docsUrl: "https://ai.google.dev/gemini-api/docs",
          homepageUrl: "https://deepmind.google/technologies/gemini/",
          typeBadges: ["API-Accessible", "Multimodal", "2M Context"]
        },
        {
          id: "gpt-4o",
          name: "GPT-4o",
          category: "Foundation Model",
          company: "OpenAI",
          shortTagline: "High-speed omni model optimized for voice, vision, and tool execution.",
          description: "GPT-4o delivers low-latency multimodal outputs, processing text, vision, and audio seamlessly. Its rapid JSON formatting and reliable function calling make it the backbone for voice bots, customer service agents, and low-latency task execution.",
          docsUrl: "https://platform.openai.com/docs",
          homepageUrl: "https://openai.com/gpt-4o",
          typeBadges: ["API-Accessible", "Multimodal", "Ultra-Fast"]
        },
        {
          id: "llama-3-3",
          name: "Llama 3.3",
          category: "Open-Weights Model",
          company: "Meta",
          shortTagline: "70B open-weights model delivering frontier reasoning capabilities.",
          description: "Llama 3.3 offers frontier-level reasoning, code syntax generation, and multilingual understanding in an open-weights format. It enables enterprises to host high-performance reasoning agents entirely on-premise for strict data compliance.",
          docsUrl: "https://llama.meta.com/docs/",
          homepageUrl: "https://llama.meta.com",
          typeBadges: ["Open-Weights", "Self-Hostable", "70B Core"]
        }
      ]
    },
    {
      id: "data-memory",
      name: "Data & Memory Layer",
      order: 4,
      description: "Knowledge bases, vector databases, and semantic caches providing persistent memory and context lookup.",
      icon: "Database",
      technologies: [
        {
          id: "pinecone",
          name: "Pinecone",
          category: "Vector Database",
          company: "Pinecone",
          shortTagline: "Fully managed, serverless vector database for low-latency long-term memory.",
          description: "Pinecone provides serverless vector storage for high-dimensional embeddings. It enables agents to retrieve semantic context, document references, and user history with sub-second latency across millions of documents, supporting automatic scale-up and high availability.",
          docsUrl: "https://docs.pinecone.io",
          homepageUrl: "https://pinecone.io",
          typeBadges: ["SaaS", "Serverless", "Cloud-Native"]
        },
        {
          id: "qdrant",
          name: "Qdrant",
          category: "Vector Database",
          company: "Qdrant / OSS",
          shortTagline: "Rust-native vector search engine optimized for payload-filtering accuracy.",
          description: "Qdrant is a high-performance vector search engine written in Rust. It excels in complex multi-tenant environments by allowing agents to apply strict metadata filters on vector queries, securing individual user datasets efficiently.",
          docsUrl: "https://qdrant.tech/documentation/",
          homepageUrl: "https://qdrant.tech",
          typeBadges: ["Open-Source", "Rust", "High-Performance"]
        },
        {
          id: "neo4j",
          name: "Neo4j",
          category: "Graph Database",
          company: "Neo4j",
          shortTagline: "Native graph database designed for Entity-Relation RAG reasoning.",
          description: "Neo4j serves as the structural database for GraphRAG architectures. By mapping information as entities and relationships rather than flat vectors, it allows agents to reason over connected facts, trace hierarchies, and run network analysis.",
          docsUrl: "https://neo4j.com/docs/",
          homepageUrl: "https://neo4j.com",
          typeBadges: ["Graph", "Hybrid", "Enterprise"]
        },
        {
          id: "pgvector",
          name: "pgvector",
          category: "Database Extension",
          company: "PostgreSQL / OSS",
          shortTagline: "Open-source vector similarity search extension for PostgreSQL.",
          description: "pgvector allows developers to store agent memories, user metadata, and vector embeddings in the same relational database, reducing infrastructure complexity by leveraging existing SQL indexes, backups, and transaction controls.",
          docsUrl: "https://github.com/pgvector/pgvector",
          homepageUrl: "https://github.com/pgvector/pgvector",
          typeBadges: ["Open-Source", "SQL-Native", "Extension"]
        }
      ]
    },
    {
      id: "ingestion-tools",
      name: "Ingestion, Extraction & Tools Layer",
      order: 5,
      description: "Data parsers, crawlers, and API protocol bridges connecting agents to the real web, files, and local OS tools.",
      icon: "Tool",
      technologies: [
        {
          id: "mcp",
          name: "Model Context Protocol (MCP)",
          category: "API Protocol",
          company: "Anthropic / OSS",
          shortTagline: "Open protocol standardizing tool and data connections for models.",
          description: "Model Context Protocol (MCP) establishes a universal standard for how agents query databases, read files, and trigger tools. By separating client hosts from MCP servers, it allows developers to build secure, modular tool integrations that work across any LLM or agent orchestrator.",
          docsUrl: "https://modelcontextprotocol.io",
          homepageUrl: "https://modelcontextprotocol.io",
          typeBadges: ["Open-Source", "Protocol", "Universal Tooling"]
        },
        {
          id: "firecrawl",
          name: "Firecrawl",
          category: "Web Crawler",
          company: "Mendable / OSS",
          shortTagline: "Crawls websites and converts pages to LLM-ready markdown format.",
          description: "Firecrawl solves the web-scraping bottleneck for agentic workflows. It bypasses bot detection, renders dynamic JavaScript-heavy sites, and clean raw HTML into structured, token-efficient markdown, allowing retrieval agents to parse fresh web content on the fly.",
          docsUrl: "https://docs.firecrawl.dev",
          homepageUrl: "https://firecrawl.dev",
          typeBadges: ["Open-Source", "Hosted", "Markdown-API"]
        },
        {
          id: "docling",
          name: "Docling",
          category: "Document Parser",
          company: "IBM / OSS",
          shortTagline: "High-fidelity PDF and layout parser optimized for structural RAG.",
          description: "Developed by IBM, Docling parses complex documents (PDFs, DOCX, PPTX) into structured JSON or markdown. It uses deep learning to identify tables, headers, and reading order, providing agents with clean, layout-aware context that avoids chunking errors during RAG operations.",
          docsUrl: "https://github.com/DS4SD/docling",
          homepageUrl: "https://ds4sd.github.io/docling/",
          typeBadges: ["Open-Source", "Python", "Local Parsing"]
        },
        {
          id: "crawl4ai",
          name: "Crawl4AI",
          category: "Web Crawler",
          company: "Independent / OSS",
          shortTagline: "Async, Python-native web crawler built specifically for RAG ingestion.",
          description: "Crawl4AI is a lightweight, Python-native crawler designed to feed raw web data into RAG frameworks. It offers asynchronous page loading, smart chunking, and CSS-based extraction, making it highly efficient for agents that need to browse the web concurrently.",
          docsUrl: "https://crawl4ai.com",
          homepageUrl: "https://crawl4ai.com",
          typeBadges: ["Open-Source", "Python", "Async-Scraper"]
        }
      ]
    },
    {
      id: "open-llm-access",
      name: "Open LLM Access & Model Hubs Layer",
      order: 6,
      description: "Hosting hubs, cloud gateways, serverless executors, and local runtimes enabling swift access to open models.",
      icon: "Layers",
      technologies: [
        {
          id: "huggingface",
          name: "Hugging Face Hub",
          category: "Model Registry",
          company: "Hugging Face",
          shortTagline: "The central library and community platform for open-source AI models.",
          description: "Hugging Face acts as the universal library for open-source AI, hosting hundreds of thousands of models, datasets, and spaces. Agents use Hugging Face to dynamically load small specialized models for tasks like classification, sentiment analysis, or embedding generation on local compute.",
          docsUrl: "https://huggingface.co/docs",
          homepageUrl: "https://huggingface.co",
          typeBadges: ["Hub", "Open-Weights", "Community"]
        },
        {
          id: "groq",
          name: "Groq",
          category: "Inference Engine",
          company: "Groq",
          shortTagline: "Ultra-fast token inference engine powered by custom LPU hardware.",
          description: "Groq delivers near-instantaneous token generation using its custom Language Processing Unit (LPU) hardware. This ultra-low latency is game-changing for agentic workflows, enabling complex multi-turn reasoning loops and self-correction steps to complete in milliseconds instead of seconds.",
          docsUrl: "https://console.groq.com/docs",
          homepageUrl: "https://groq.com",
          typeBadges: ["API-Accessible", "LPU", "Sub-Second Latency"]
        },
        {
          id: "ollama",
          name: "Ollama",
          category: "Local Runtime",
          company: "Ollama / OSS",
          shortTagline: "Lightweight framework to run open LLMs locally on desktop and edge.",
          description: "Ollama packages open-weights models (like Llama, Mistral, and Phi) into local desktop runtimes. It handles GPU acceleration, provides a clean local API, and allows developers to run private, offline agent workflows directly on their local workstations or edge servers.",
          docsUrl: "https://github.com/ollama/ollama/blob/main/docs/README.md",
          homepageUrl: "https://ollama.com",
          typeBadges: ["Open-Source", "Local-Host", "Desktop API"]
        },
        {
          id: "aws-bedrock",
          name: "AWS Bedrock",
          category: "Cloud Gateway",
          company: "AWS",
          shortTagline: "Serverless gateway providing secure, unified access to leading foundation models.",
          description: "Amazon Bedrock provides secure, serverless access to LLMs from Anthropic, Meta, Cohere, and Amazon. It handles enterprise security, private data customization, and automatic scaling, making it the preferred entry gateway for corporate developers building compliant agent clusters.",
          docsUrl: "https://docs.aws.amazon.com/bedrock/",
          homepageUrl: "https://aws.amazon.com/bedrock/",
          typeBadges: ["SaaS", "Serverless", "Enterprise Cloud"]
        }
      ]
    },
    {
      id: "evaluation-safety",
      name: "Evaluation, Observability & Guardrails Layer",
      order: 7,
      description: "Tracing modules, debuggers, guardrails, and validation frameworks checking agent safety and accuracy.",
      icon: "Shield",
      technologies: [
        {
          id: "langsmith",
          name: "LangSmith",
          category: "Observability Platform",
          company: "LangChain",
          shortTagline: "Tracing and debugging control plane for testing LLM workflows.",
          description: "LangSmith provides deep trace visibility into nested agent runs. It maps the exact sequence of tool calls, prompt formats, and model outputs, allowing developers to identify latency bottlenecks, debug agent logic loops, and run automated regression tests on prompt changes.",
          docsUrl: "https://docs.smith.langchain.com",
          homepageUrl: "https://smith.langchain.com",
          typeBadges: ["SaaS", "Tracing", "Prompt Testing"]
        },
        {
          id: "ragas",
          name: "Ragas",
          category: "Evaluation Framework",
          company: "Exploding Gradients / OSS",
          shortTagline: "Evaluation suite for testing RAG accuracy using LLM-as-a-judge.",
          description: "Ragas provides specialized metrics to grade RAG pipelines and agent outputs. It uses LLM-as-a-judge methodologies to evaluate faithfulness, answer relevance, and context recall, giving developers quantitative data to optimize retrieval strategies.",
          docsUrl: "https://docs.ragas.io",
          homepageUrl: "https://ragas.io",
          typeBadges: ["Open-Source", "Python", "RAG Metrics"]
        },
        {
          id: "nemo-guardrails",
          name: "NeMo Guardrails",
          category: "Safety Framework",
          company: "NVIDIA / OSS",
          shortTagline: "Toolkit to enforce programmable safety and alignment guardrails.",
          description: "Developed by NVIDIA, NeMo Guardrails sits between the orchestrator and the LLM. It enforces predefined safety paths, blocks toxic inputs, checks for factual accuracy, and ensures the agent does not execute commands outside its designated operational bounds.",
          docsUrl: "https://github.com/NVIDIA/NeMo-Guardrails/blob/main/docs/README.md",
          homepageUrl: "https://developer.nvidia.com/nemo",
          typeBadges: ["Open-Source", "Safety", "Real-Time Check"]
        },
        {
          id: "arize-phoenix",
          name: "Arize Phoenix",
          category: "Observability Platform",
          company: "Arize / OSS",
          shortTagline: "Open-source RAG debugging tool analyzing embedding space anomalies.",
          description: "Phoenix provides real-time tracing and evaluation for LLM and RAG systems. It visualizes high-dimensional embedding clusters to detect retrieval drift, tracks token usage, and runs local evaluation checks to identify system failures before they hit production.",
          docsUrl: "https://docs.arize.com/phoenix/",
          homepageUrl: "https://phoenix.arize.com",
          typeBadges: ["Open-Source", "Python", "Local Tracing"]
        }
      ]
    },
    {
      id: "infrastructure",
      name: "Infrastructure & Deployment Layer",
      order: 8,
      description: "High-performance compute clusters, serverless containers, configuration-as-code, and cloud orchestrators.",
      icon: "Cloud",
      technologies: [
        {
          id: "nvidia-cuda",
          name: "NVIDIA CUDA & GPUs",
          category: "Compute Foundation",
          company: "NVIDIA",
          shortTagline: "Hardware and software runtime stack driving AI model acceleration.",
          description: "NVIDIA GPUs, powered by the CUDA parallel computing platform, represent the bedrock compute layer. They accelerate model training, fine-tuning, and inference workloads, providing the high-bandwidth memory and tensor core performance required to run agent networks at scale.",
          docsUrl: "https://docs.nvidia.com/cuda/",
          homepageUrl: "https://developer.nvidia.com/cuda-zone",
          typeBadges: ["Hardware", "Proprietary Core", "GPU Compute"]
        },
        {
          id: "kubernetes",
          name: "Kubernetes",
          category: "Container Orchestrator",
          company: "CNCF / OSS",
          shortTagline: "Automated scaling and deployment manager for agent containers.",
          description: "Kubernetes orchestrates containerized agent runtimes across cloud clusters. In production, Kubernetes manages load balancing, health checks, auto-scaling, and secure microservice networking, ensuring that multi-agent clusters stay resilient and scale dynamically under traffic spikes.",
          docsUrl: "https://kubernetes.io/docs/",
          homepageUrl: "https://kubernetes.io",
          typeBadges: ["Open-Source", "Infrastructure", "Container Mgmt"]
        },
        {
          id: "runpod",
          name: "RunPod",
          category: "GPU Compute Cloud",
          company: "RunPod",
          shortTagline: "On-demand GPU host for scaling custom LLM inference endpoints.",
          description: "RunPod provides cost-effective, serverless GPU instances on-demand. It allows developers to deploy PyTorch workloads, fine-tune models, or run open-weights LLM inference backends in containerized sandboxes without the overhead of enterprise cloud contracts.",
          docsUrl: "https://docs.runpod.io",
          homepageUrl: "https://runpod.io",
          typeBadges: ["SaaS", "GPU Cloud", "On-Demand Compute"]
        },
        {
          id: "terraform",
          name: "Terraform",
          category: "IaC Provisioner",
          company: "HashiCorp / OSS",
          shortTagline: "Infrastructure as Code tool to build and secure cloud infrastructure.",
          description: "Terraform manages the cloud infrastructure (VMs, networks, buckets, databases) powering agent platforms. By declaring infrastructure as code, teams can provision identical, secure dev, staging, and production environments for vector databases, compute clusters, and API gateways.",
          docsUrl: "https://developer.hashicorp.com/terraform/docs",
          homepageUrl: "https://terraform.io",
          typeBadges: ["Open-Source", "IaC", "Multicloud"]
        }
      ]
    }
  ]
};
