export interface AgentFramework {
  id: string;
  name: string;
  tagline: string;
  category: 'frontier-sdk' | 'multi-agent-orchestrator' | 'python-first' | 'typescript-fullstack' | 'enterprise-jvm';
  categoryLabel: string;
  developer: string;
  languages: string[];
  license: string;
  pricing: string;
  badge: string;
  description: string;
  architectureOverview: string;
  keyFeatures: string[];
  installation: {
    command: string;
    method: string;
    prerequisites: string;
    envVars?: string[];
  };
  howToUse: {
    title: string;
    description: string;
    code: string;
    explanation: string;
  };
  useCases: {
    primary: string[];
    bestFor: string;
    whenNotToUse: string;
  };
  ecosystem: {
    supportedModels: string[];
    stateManagement: string;
    mcpSupport: string;
    evalsAndObservability: string;
  };
  documentation: {
    websiteUrl: string;
    docsUrl: string;
    githubUrl?: string;
  };
  accentColor: string;
  gradient: string;
}

export const AGENT_FRAMEWORKS: AgentFramework[] = [
  // ==========================================
  // 1. OpenAI Agents SDK
  // ==========================================
  {
    id: 'openai-agents-sdk',
    name: 'OpenAI Agents SDK',
    tagline: 'Lightweight, ergonomic multi-agent orchestration with seamless agent handoffs',
    category: 'frontier-sdk',
    categoryLabel: 'Frontier Big-Tech SDK',
    developer: 'OpenAI',
    languages: ['Python', 'TypeScript'],
    license: 'MIT License (Open Source)',
    pricing: 'Free SDK / Pay-per-token API consumption',
    badge: 'Official OpenAI SDK',
    description: 'The production-grade evolution of OpenAI Swarm, providing a lightweight, stateless-by-default abstraction for building multi-agent workflows with direct model calling, structured outputs, function tools, and declarative handoffs.',
    architectureOverview: 'Built around the core primitives of Agents, Handoffs, and Guardrails. Instead of heavy state graphs, an agent encapsulates instructions, available tools, and handoff targets. When an agent decides another specialist agent should handle a query, it executes a handoff function returning the target agent, continuing the multi-turn loop seamlessly without overhead.',
    keyFeatures: [
      'Declarative Agent Handoffs & delegation patterns',
      'Native function calling and strict Pydantic/JSON schema validation',
      'Input & Output guardrail enforcement for enterprise safety',
      'Minimal mental overhead with zero mandatory external databases',
      'Real-time streaming and tool execution tracking'
    ],
    installation: {
      command: 'pip install openai-agents',
      method: 'Python pip package or npm install @openai/agents for TypeScript',
      prerequisites: 'Python 3.10+ or Node.js 18+. OpenAI API key with access to GPT-4o / o3 models.',
      envVars: ['OPENAI_API_KEY=your_openai_api_key']
    },
    howToUse: {
      title: 'Triage & Specialist Handoff Agent',
      description: 'Creating a front-desk triage agent that autonomously hands off customer queries to an issue-refund specialist.',
      code: `from agents import Agent, Runner

# Define specialized agent
refund_agent = Agent(
    name="Refund Specialist",
    instructions="You process refunds. Verify transaction ID and confirm return status."
)

# Define triage front-desk agent with handoff
triage_agent = Agent(
    name="Triage Concierge",
    instructions="Analyze the user request and hand off to specialist agents when appropriate.",
    handoffs=[refund_agent]
)

# Run conversation loop
result = Runner.run_sync(triage_agent, "I want a refund for transaction #TX-90210")
print(result.final_output)`,
      explanation: 'The triage concierge recognizes the refund intent, calls the built-in handoff mechanism to transfer context to the Refund Specialist, and returns the final coordinated resolution.'
    },
    useCases: {
      primary: [
        'Customer support routing and tiered escalation systems',
        'Sales qualification and automated SDR scheduling',
        'Multi-step conversational handoffs without complex graph setups',
        'Lightweight serverless and edge-compatible agent functions'
      ],
      bestFor: 'Developers building multi-agent conversational handoffs who want minimal boilerplate and maximum alignment with OpenAI frontier models.',
      whenNotToUse: 'Applications requiring cyclical long-term graph execution, pause-and-resume human-in-the-loop workflows with time-travel persistence (consider LangGraph).'
    },
    ecosystem: {
      supportedModels: ['GPT-4o', 'GPT-4o-mini', 'o1', 'o3-mini', 'Compatible LiteLLM endpoints'],
      stateManagement: 'Stateless by default; session state managed via thread IDs or application database',
      mcpSupport: 'Compatible via custom tool adapter functions',
      evalsAndObservability: 'Integrates natively with OpenAI Evals, Langfuse, and OpenTelemetry'
    },
    documentation: {
      websiteUrl: 'https://platform.openai.com/docs/guides/agents',
      docsUrl: 'https://openai.com/index/introducing-the-agents-sdk/',
      githubUrl: 'https://github.com/openai/openai-agents-python'
    },
    accentColor: '#10a37f',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-700'
  },

  // ==========================================
  // 2. Google ADK (Agent Development Kit)
  // ==========================================
  {
    id: 'google-adk',
    name: 'Google ADK',
    tagline: 'Enterprise-grade Agent Development Kit for Gemini, Cloud Run, and Vertex AI',
    category: 'frontier-sdk',
    categoryLabel: 'Frontier Big-Tech SDK',
    developer: 'Google',
    languages: ['Python', 'TypeScript', 'Go'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free SDK / Google Cloud & Vertex AI usage fees',
    badge: 'Official Google Enterprise',
    description: 'Google’s comprehensive framework for scaffolding, evaluating, testing, and deploying enterprise autonomous agents powered by Gemini 2.5/3.0. Features deep Model Context Protocol (MCP) support, Agent-to-Agent (A2A) protocols, and 1-click Cloud Run deployment.',
    architectureOverview: 'Structured around the complete Agent Lifecycle: Scaffold -> Build -> Evaluate -> Deploy -> Observe. Provides built-in State Management, declarative Tool Callbacks, Multi-Agent Swarms with shared message boards, and sandboxed tool execution harnesses.',
    keyFeatures: [
      'Full agent lifecycle tooling with agents-cli',
      'Native Model Context Protocol (MCP) client and server integrations',
      'Automated LLM-as-judge Quality Flywheel evaluation pipelines',
      'Native Google Cloud Run and Kubernetes deployment configurations',
      'Built-in session memory and BigQuery agent telemetry telemetry'
    ],
    installation: {
      command: 'pip install google-agents-cli google-adk',
      method: 'Python pip package or npx @google/agents-cli',
      prerequisites: 'Python 3.10+, Google Cloud SDK (gcloud), Vertex AI or Gemini API Key.',
      envVars: ['GEMINI_API_KEY=your_gemini_api_key', 'GOOGLE_CLOUD_PROJECT=your_project_id']
    },
    howToUse: {
      title: 'Enterprise ADK Research Agent with Tools',
      description: 'Creating an enterprise Gemini agent equipped with external tool callbacks and session state.',
      code: `from google.adk import Agent, tool
from google.genai import types

@tool
def query_knowledge_base(query: str) -> str:
    """Searches enterprise internal documentation."""
    return f"Retrieved 3 documents matching: {query}"

agent = Agent(
    model="gemini-2.5-flash",
    system_instruction="You are a senior technical advisor assisting enterprise developers.",
    tools=[query_knowledge_base]
)

response = agent.run("Find the latest security compliance policy for GCS buckets")
print(response.text)`,
      explanation: 'Google ADK binds Python functions as typed tools directly to the Gemini model, manages function calling iterations, and handles output serialization.'
    },
    useCases: {
      primary: [
        'Enterprise RAG agents connected to BigQuery, Spanner, and Google Cloud Storage',
        'Secure multi-agent swarms with granular IAM and resource attribution',
        'DevOps and SRE automated diagnostic pipelines on Google Cloud',
        'Production agent microservices containerized on Cloud Run'
      ],
      bestFor: 'Enterprises deploying production agents on Google Cloud Platform and developers leveraging Gemini models, MCP tools, and Vertex AI.',
      whenNotToUse: 'Lightweight frontend-only browser apps with no backend infrastructure (consider Vercel AI SDK).'
    },
    ecosystem: {
      supportedModels: ['Gemini 2.5 Pro', 'Gemini 2.5 Flash', 'Gemini 3.0', 'Vertex AI Model Garden'],
      stateManagement: 'Cloud Spanner / Bigtable session memory and local SQLite state store',
      mcpSupport: 'Native first-class Model Context Protocol (MCP) client & server runner',
      evalsAndObservability: 'Cloud Trace, BigQuery Agent Analytics, and agents-cli eval flywheel'
    },
    documentation: {
      websiteUrl: 'https://cloud.google.com/vertex-ai/docs',
      docsUrl: 'https://github.com/google/agents-cli',
      githubUrl: 'https://github.com/google/agents-cli'
    },
    accentColor: '#4285F4',
    gradient: 'from-blue-500 via-indigo-600 to-purple-600'
  },

  // ==========================================
  // 3. Microsoft Agent Framework (MAF)
  // ==========================================
  {
    id: 'microsoft-agent-framework',
    name: 'Microsoft Agent Framework',
    tagline: 'Enterprise-grade unification of Semantic Kernel and AutoGen for Python and .NET',
    category: 'frontier-sdk',
    categoryLabel: 'Frontier Big-Tech SDK',
    developer: 'Microsoft',
    languages: ['Python', '.NET (C#)', 'Java'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source / Azure AI compute fees',
    badge: 'Enterprise .NET & Python',
    description: 'Microsoft’s official next-generation agent framework merging the flexible conversational patterns of AutoGen with the enterprise middleware, session telemetry, and type safety of Semantic Kernel.',
    architectureOverview: 'Combines Semantic Kernel plugins, typed memories, and connectors with AutoGen group chat orchestration. Introduces DevUI—a real-time local web debugger—along with Agent-to-Agent (A2A) protocol interoperability and Azure AI Agent Service synchronization.',
    keyFeatures: [
      'Dual-stack parity across Python and C# .NET enterprise runtimes',
      'DevUI interactive browser debugger for visualizing multi-agent message routing',
      'Enterprise middleware pipelines for telemetry, token budgeting, and safety checks',
      'Integration with Azure AI Agent Service, Microsoft Fabric, and Copilot Studio',
      'First-class Model Context Protocol (MCP) client integration'
    ],
    installation: {
      command: 'pip install microsoft-agent-framework  # Or: dotnet add package Microsoft.Agents.Core',
      method: 'Python pip package or NuGet package for C# .NET',
      prerequisites: 'Python 3.10+ or .NET 8.0 SDK. Azure OpenAI or OpenAI credentials.',
      envVars: ['AZURE_OPENAI_ENDPOINT=https://...', 'AZURE_OPENAI_API_KEY=...']
    },
    howToUse: {
      title: 'Building a Coordinated Agent in Python',
      description: 'Defining an enterprise agent with typed plugin integration and session telemetry.',
      code: `from microsoft_agents import Agent, Plugin
from microsoft_agents.models import AzureOpenAIModel

class FinancialTools:
    @Plugin.kernel_function
    def calculate_yield(self, principal: float, rate: float, time: int) -> float:
        return principal * (1 + rate * time)

model = AzureOpenAIModel(deployment_name="gpt-4o")
agent = Agent(
    model=model,
    instructions="You are a certified financial planning agent.",
    plugins=[FinancialTools()]
)

result = agent.execute("What is the return on $50,000 at 6% over 5 years?")
print(result.text)`,
      explanation: 'The framework exposes Python methods as structured plugin functions, validates parameter schemas, routes calls through enterprise middleware, and returns a verified answer.'
    },
    useCases: {
      primary: [
        'Enterprise .NET C# systems integrating intelligent agents into existing microservices',
        'Azure AI Agent Service workloads with HIPAA and SOC2 governance',
        'Complex financial and industrial workflows requiring rigid audit logs and telemetry',
        'Coordinated multi-agent swarms with local DevUI visual inspection'
      ],
      bestFor: 'Organizations running enterprise Python or .NET stacks integrated with Azure, Semantic Kernel, and Microsoft 365 Copilot.',
      whenNotToUse: 'Minimalist edge scripts or purely JavaScript/browser-based applications.'
    },
    ecosystem: {
      supportedModels: ['Azure OpenAI', 'OpenAI', 'Mistral on Azure', 'Hugging Face local models'],
      stateManagement: 'Cosmos DB, Redis, and SQL Server persistent session state',
      mcpSupport: 'Native MCP client adapter support',
      evalsAndObservability: 'Azure Application Insights, OpenTelemetry, and DevUI local inspector'
    },
    documentation: {
      websiteUrl: 'https://learn.microsoft.com/azure/ai-services/agents/',
      docsUrl: 'https://github.com/microsoft/agent-framework',
      githubUrl: 'https://github.com/microsoft/agent-framework'
    },
    accentColor: '#00a4ef',
    gradient: 'from-sky-500 via-blue-600 to-indigo-700'
  },

  // ==========================================
  // 4. LangGraph
  // ==========================================
  {
    id: 'langgraph',
    name: 'LangGraph',
    tagline: 'Stateful, cyclical multi-agent graph orchestrator for reliable production workflows',
    category: 'multi-agent-orchestrator',
    categoryLabel: 'Multi-Agent Orchestrator',
    developer: 'LangChain Inc.',
    languages: ['Python', 'TypeScript'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source / LangGraph Cloud hosted platform',
    badge: 'Industry Standard Graph Engine',
    description: 'The industry-leading framework for building controllable, cyclical agent workflows. By modeling agents as state machines and directed graphs, LangGraph enables human-in-the-loop validation, time-travel debugging, and fault-tolerant persistence.',
    architectureOverview: 'Operates on StateGraph primitives where Nodes are computational functions (or LLM calls) and Edges define conditional state transitions. A central State dictionary flows through the graph, with Checkpointers storing snapshot deltas at every step to enable replay, branching, and human approval gates.',
    keyFeatures: [
      'Cyclical graph execution with branching, looping, and parallel fan-out',
      'Built-in checkpointer persistence (PostgreSQL, SQLite, Redis, Memory)',
      'First-class Human-in-the-loop pausing, inspection, and state editing',
      'LangGraph Studio desktop GUI for visual debugging and interactive graph execution',
      'Seamless streaming of node-level events and token-by-token output'
    ],
    installation: {
      command: 'pip install -U langgraph langchain-openai',
      method: 'Python pip package or npm install @langchain/langgraph',
      prerequisites: 'Python 3.9+ or Node.js 18+.',
      envVars: ['OPENAI_API_KEY=your_key', 'LANGCHAIN_API_KEY=your_smith_key']
    },
    howToUse: {
      title: 'Cyclic Agent with Tool Execution Loop',
      description: 'Creating a stateful graph where the model decides whether to execute a tool or return the final answer.',
      code: `from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages
from langchain_openai import ChatOpenAI

class State(TypedDict):
    messages: Annotated[list, add_messages]

graph = StateGraph(State)
llm = ChatOpenAI(model="gpt-4o")

def chatbot(state: State):
    return {"messages": [llm.invoke(state["messages"])]}

graph.add_node("chatbot", chatbot)
graph.add_edge(START, "chatbot")
graph.add_edge("chatbot", END)

app = graph.compile()
response = app.invoke({"messages": [("user", "Explain quantum computing in one sentence.")]})
print(response["messages"][-1].content)`,
      explanation: 'Compiles a verifiable StateGraph. Nodes mutate state append-only using the add_messages reducer, making complex loops traceable and deterministic.'
    },
    useCases: {
      primary: [
        'Complex autonomous coding agents with self-correction and compiler validation loops',
        'Financial audit agents requiring mandatory human sign-off before executing transactions',
        'Multi-agent collaborative teams (Researcher -> Writer -> Fact-Checker -> Publisher)',
        'Long-running multi-day business process automation'
      ],
      bestFor: 'Production applications requiring cyclical reasoning, human-in-the-loop control, state persistence, and absolute transparency into execution flow.',
      whenNotToUse: 'Trivial single-turn prompt chains where simple API calls suffice without state overhead.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Ollama', 'Any LangChain model'],
      stateManagement: 'PostgreSQL (AsyncPostgresSaver), SQLite, Redis, in-memory checkpointer',
      mcpSupport: 'Native via langchain-mcp adapters',
      evalsAndObservability: 'LangSmith tracing, prompt playground, and real-time step inspection'
    },
    documentation: {
      websiteUrl: 'https://langchain.com/langgraph',
      docsUrl: 'https://langchain-ai.github.io/langgraph/',
      githubUrl: 'https://github.com/langchain-ai/langgraph'
    },
    accentColor: '#1c3c3c',
    gradient: 'from-emerald-600 via-teal-700 to-slate-900'
  },

  // ==========================================
  // 5. LangChain
  // ==========================================
  {
    id: 'langchain',
    name: 'LangChain',
    tagline: 'The universal ecosystem for LLM composability, chains, retrievers, and tools',
    category: 'multi-agent-orchestrator',
    categoryLabel: 'Multi-Agent Orchestrator',
    developer: 'LangChain Inc.',
    languages: ['Python', 'TypeScript'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source / LangSmith observability subscription',
    badge: 'Pioneer AI Ecosystem',
    description: 'The pioneering open-source framework for building LLM-powered applications. Provides thousands of modular integrations across models, vector databases, document loaders, and tools, underpinned by LangChain Expression Language (LCEL).',
    architectureOverview: 'Composed of swappable components (Model I/O, Retrieval, Chains, Agents) connected via LCEL pipelines. Standardizes prompts, embeddings, vector stores, and structured parsers across all major AI providers into a single uniform interface.',
    keyFeatures: [
      'Over 700+ native third-party integrations with clouds, databases, and APIs',
      'LangChain Expression Language (LCEL) for declarative chain composition',
      'Advanced RAG pipelines with hybrid search, re-ranking, and parent-document retrieval',
      'Standardized document loaders for PDFs, Slack, Notion, GitHub, and SQL',
      'Extensive ecosystem support across Python and JavaScript/TypeScript'
    ],
    installation: {
      command: 'pip install langchain langchain-community langchain-openai',
      method: 'Python pip package or npm install langchain @langchain/core',
      prerequisites: 'Python 3.9+ or Node.js 18+.',
      envVars: ['OPENAI_API_KEY=your_key', 'LANGCHAIN_TRACING_V2=true']
    },
    howToUse: {
      title: 'Declarative LCEL Chain with Structured Tool Calling',
      description: 'Chaining prompt templates, models, and output parsers into a resilient processing pipeline.',
      code: `from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a tech analyst specializing in artificial intelligence."),
    ("user", "Summarize the architectural advantages of {framework}.")
])

model = ChatOpenAI(model="gpt-4o", temperature=0.2)
chain = prompt | model | StrOutputParser()

summary = chain.invoke({"framework": "LangGraph"})
print(summary)`,
      explanation: 'Uses the pipe operator (|) to create an asynchronous, streaming-ready pipeline where data flows deterministically from prompt to model to parser.'
    },
    useCases: {
      primary: [
        'Enterprise RAG systems indexing hundreds of document formats and internal wikis',
        'Data extraction pipelines transforming unstructured documents into JSON schemas',
        'Unified multi-model translation and fallbacks across OpenAI, Anthropic, and Gemini',
        'Prompt engineering and templating engines'
      ],
      bestFor: 'Developers needing broad connectivity across disparate cloud services, vector databases, and foundational models.',
      whenNotToUse: 'Fine-grained stateful multi-agent systems with branching loops (LangGraph is the recommended successor for that pattern).'
    },
    ecosystem: {
      supportedModels: ['Every major proprietary and open-weights model provider'],
      stateManagement: 'Vector stores (Pinecone, Chroma, pgvector), memory buffers, cache stores',
      mcpSupport: 'Broad support via community tools and MCP adapters',
      evalsAndObservability: 'LangSmith tracing, latency benchmarking, and token cost attribution'
    },
    documentation: {
      websiteUrl: 'https://langchain.com',
      docsUrl: 'https://python.langchain.com/docs/',
      githubUrl: 'https://github.com/langchain-ai/langchain'
    },
    accentColor: '#10b981',
    gradient: 'from-emerald-500 via-teal-600 to-cyan-800'
  },

  // ==========================================
  // 6. AWS Strands
  // ==========================================
  {
    id: 'aws-strands',
    name: 'AWS Strands',
    tagline: 'Model-driven, lightweight agent framework open-sourced by AWS engineering teams',
    category: 'frontier-sdk',
    categoryLabel: 'Frontier Big-Tech SDK',
    developer: 'AWS / Strands Open Source',
    languages: ['Python', 'TypeScript'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source library / Amazon Bedrock token pricing',
    badge: 'AWS Bedrock Native',
    description: 'Developed and battle-tested inside AWS (Amazon Q Developer, AWS Glue, and VPC Reachability Analyzer), Strands connects the model (the Brain) directly with tools (the Hands) without forcing rigid graph state-machines or proprietary cloud control planes.',
    architectureOverview: 'Adopts a pure library design that runs inside your own application process (FastAPI, Express, Lambdas). Features `strands-agents/box`—a Rust-based operating system sandbox for secure dynamic execution—and `strands-agents/evals` for systematic multi-turn simulation and red-teaming.',
    keyFeatures: [
      'Pure in-process library without mandatory external databases or daemons',
      'Model-driven architecture: lets foundation models dynamically plan and self-reflect',
      'Built-in Rust-powered sandbox (`strands-agents/box`) for untrusted tool isolation',
      'Optimized for Amazon Bedrock (Claude 3.7, Llama 3.3) with LiteLLM cross-cloud portability',
      'Comprehensive multi-turn evaluation and simulation harness'
    ],
    installation: {
      command: 'pip install strands-agents',
      method: 'Python pip package or npm install strands-agents',
      prerequisites: 'Python 3.10+ or Node.js 18+. AWS credentials configured for Amazon Bedrock.',
      envVars: ['AWS_DEFAULT_REGION=us-east-1', 'AWS_ACCESS_KEY_ID=...', 'AWS_SECRET_ACCESS_KEY=...']
    },
    howToUse: {
      title: 'FastAPI Microservice with Strands Agent',
      description: 'Mounting an autonomous agent directly inside a standard web backend service.',
      code: `from strands import Agent, tool

@tool
def calculate_carbon_footprint(cloud_hours: float, cpu_cores: int) -> float:
    """Calculates approximate CO2e kilograms for cloud computing usage."""
    return cloud_hours * cpu_cores * 0.045

# Initialize agent with Bedrock Claude
agent = Agent(
    model="anthropic.claude-3-5-sonnet-20241022-v2:0",
    tools=[calculate_carbon_footprint],
    system_prompt="You are an AWS Cloud Sustainability engineer."
)

response = agent("How much carbon is emitted by a 64-core compute cluster running for 72 hours?")
print(response.output)`,
      explanation: 'Instantiates an in-process agent that directly queries Amazon Bedrock, selects the calculation tool, and outputs the structured answer without infrastructure overhead.'
    },
    useCases: {
      primary: [
        'Secure cloud automation and infrastructure diagnostics on AWS',
        'Serverless agent microservices packaged inside AWS Lambda or ECS tasks',
        'Untrusted code execution and data processing within sandboxed Rust environments',
        'Adaptive model routing (e.g. routing simple tasks to Ollama SLMs and complex reasoning to Claude via Bedrock)'
      ],
      bestFor: 'Developers building cloud-native, secure agent services on AWS who want a clean, model-driven library rather than heavy orchestration frameworks.',
      whenNotToUse: 'Complex collaborative swarms requiring hundreds of human approval checkpoints in a visual flowchart UI.'
    },
    ecosystem: {
      supportedModels: ['Amazon Bedrock (Claude 3.7, Nova, Llama 3.3)', 'LiteLLM adapters', 'Ollama local models'],
      stateManagement: 'In-memory, DynamoDB, or PostgreSQL session drivers',
      mcpSupport: 'Full Model Context Protocol client support',
      evalsAndObservability: 'Strands Evals suite, CloudWatch, OpenTelemetry, Langfuse'
    },
    documentation: {
      websiteUrl: 'https://strandsagents.com',
      docsUrl: 'https://github.com/strands-agents',
      githubUrl: 'https://github.com/strands-agents/strands-python'
    },
    accentColor: '#ff9900',
    gradient: 'from-amber-500 via-orange-600 to-slate-900'
  },

  // ==========================================
  // 7. Claude Agent SDK
  // ==========================================
  {
    id: 'claude-agent-sdk',
    name: 'Claude Agent SDK',
    tagline: 'Anthropic official agentic SDK with Model Context Protocol (MCP) and Computer Use',
    category: 'frontier-sdk',
    categoryLabel: 'Frontier Big-Tech SDK',
    developer: 'Anthropic',
    languages: ['Python', 'TypeScript'],
    license: 'MIT License (Open Source)',
    pricing: 'Free SDK / Anthropic API token consumption',
    badge: 'Frontier Reasoning & MCP Native',
    description: 'Anthropic’s official framework and tooling suite for constructing agentic workflows with Claude 3.7 Sonnet (Hybrid Reasoning) and Claude 3.5 Sonnet. Built from the ground up for native Model Context Protocol (MCP) tool execution, computer use, and bash sandboxing.',
    architectureOverview: 'Leverages Claude 3.7 Sonnet’s native extended thinking budgets to alternate between deep internal reasoning and tool execution. Standardizes external world interactions via MCP (stdio, SSE, HTTP), giving agents standard protocols to read files, run database queries, and control desktop UI environments.',
    keyFeatures: [
      'Extended Thinking control for multi-step reasoning before tool execution',
      'First-class native Model Context Protocol (MCP) client architecture',
      'Computer Use capabilities (cursor movement, keyboard typing, screenshot capture)',
      'Prompt caching for up to 90% cost reduction on large context agent loops',
      'Rigorous safety and prompt injection resistance'
    ],
    installation: {
      command: 'pip install anthropic mcp',
      method: 'Python pip package or npm install @anthropic-ai/sdk @modelcontextprotocol/sdk',
      prerequisites: 'Python 3.10+ or Node.js 18+. Anthropic API Key.',
      envVars: ['ANTHROPIC_API_KEY=your_anthropic_key']
    },
    howToUse: {
      title: 'Agent with Extended Thinking & Dynamic MCP Tool Calling',
      description: 'Creating an agent that reasons deeply before executing external tools.',
      code: `import anthropic

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-3-7-sonnet-20250219",
    max_tokens=4096,
    thinking={
        "type": "enabled",
        "budget_tokens": 2048
    },
    tools=[{
        "name": "fetch_git_diff",
        "description": "Retrieves the unified git diff of unstaged changes.",
        "input_schema": {"type": "object", "properties": {}}
    }],
    messages=[{"role": "user", "content": "Review my unstaged pull request for security vulnerabilities."}]
)

# Access reasoning traces and tool requests
for block in response.content:
    if block.type == "thinking":
        print(f"Reasoning trace: {block.thinking[:200]}...")
    elif block.type == "tool_use":
        print(f"Invoking tool: {block.name}")`,
      explanation: 'Leverages Claude 3.7’s thinking budget so the model deliberates on security implications in its chain-of-thought before generating the tool call.'
    },
    useCases: {
      primary: [
        'Automated software engineering and vulnerability remediation',
        'Complex legal, financial, and analytical multi-document audits',
        'Desktop computer use automation and visual GUI testing',
        'MCP-powered universal system integration (connecting to GitHub, Slack, Postgres)'
      ],
      bestFor: 'Developers seeking maximum reasoning depth, long context fidelity (200k tokens), and native integration with the Model Context Protocol ecosystem.',
      whenNotToUse: 'Ultra-low-latency real-time voice bots requiring sub-200ms turnaround.'
    },
    ecosystem: {
      supportedModels: ['Claude 3.7 Sonnet (Thinking)', 'Claude 3.5 Sonnet', 'Claude 3.5 Haiku', 'Claude Opus'],
      stateManagement: 'Anthropic Prompt Caching with client-managed conversation history',
      mcpSupport: 'Universal standard creator of the Model Context Protocol (MCP)',
      evalsAndObservability: 'Langfuse, Arize Phoenix, OpenTelemetry, Anthropic Console workbench'
    },
    documentation: {
      websiteUrl: 'https://anthropic.com',
      docsUrl: 'https://docs.anthropic.com/en/docs/build-with-claude/agentic-workflows',
      githubUrl: 'https://github.com/anthropics/anthropic-sdk-python'
    },
    accentColor: '#d97706',
    gradient: 'from-amber-600 via-orange-600 to-stone-900'
  },

  // ==========================================
  // 8. CrewAI
  // ==========================================
  {
    id: 'crewai',
    name: 'CrewAI',
    tagline: 'Leading role-playing multi-agent framework for collaborative autonomous squads',
    category: 'multi-agent-orchestrator',
    categoryLabel: 'Multi-Agent Orchestrator',
    developer: 'CrewAI Inc.',
    languages: ['Python'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source / CrewAI Enterprise cloud platform',
    badge: 'Multi-Agent Role-Playing Leader',
    description: 'The most popular role-playing framework for orchestrating autonomous AI agent crews. By structuring work into Agents (with defined Roles, Backstories, and Goals), Tasks, and Crews, CrewAI mimics human team collaboration.',
    architectureOverview: 'Structured around three core concepts: Agent (role-playing persona with tools), Task (specific actionable deliverable), and Crew (orchestration manager). Supports Sequential, Hierarchical (with manager agent delegation), and Consensual execution processes, with built-in memory systems (short-term, long-term, and entity memory).',
    keyFeatures: [
      'Intuitive persona-based abstraction (Role, Goal, Backstory)',
      'Hierarchical and sequential task execution with autonomous delegation',
      'Multi-tiered memory system (Short-term, Long-term, and Entity memory)',
      'CLI scaffolding (`crewai create crew <name>`) with yaml-based task configuration',
      'Extensive CrewAI Enterprise cloud deployment and monitoring suite'
    ],
    installation: {
      command: 'pip install crewai crewai-tools',
      method: 'Python pip package or crewai CLI generator',
      prerequisites: 'Python 3.10 to 3.12.',
      envVars: ['OPENAI_API_KEY=your_key', 'SERPER_API_KEY=optional_search_key']
    },
    howToUse: {
      title: 'Researcher & Writer Multi-Agent Crew',
      description: 'Creating a coordinated two-agent team that researches market trends and produces an executive briefing.',
      code: `from crewai import Agent, Task, Crew, Process

# Define specialized research agent
researcher = Agent(
    role="Senior Market Analyst",
    goal="Discover high-growth frontier AI startups in 2026",
    backstory="You are a veteran technology scout with an instinct for disruptive architectures.",
    verbose=True
)

# Define writer agent
writer = Agent(
    role="Chief Content Strategist",
    goal="Draft an executive newsletter based on technical research",
    backstory="You synthesize dense technical papers into compelling C-level memos.",
    verbose=True
)

task1 = Task(description="Analyze 5 breakthroughs in agentic AI.", agent=researcher, expected_output="Bulleted brief")
task2 = Task(description="Format findings into an executive memo.", agent=writer, expected_output="Markdown document")

crew = Crew(
    agents=[researcher, writer],
    tasks=[task1, task2],
    process=Process.sequential
)

result = crew.kickoff()
print(result)`,
      explanation: 'The researcher gathers intelligence and automatically hands off its verified structured output as the input context for the writer agent.'
    },
    useCases: {
      primary: [
        'Automated content generation, editorial pipelines, and technical documentation',
        'Competitive intelligence gathering, financial summarization, and lead research',
        'Automated product development sprint planning and user story generation',
        'Collaborative customer support swarms with triage and subject-matter experts'
      ],
      bestFor: 'Developers who think in terms of human team structures, job titles, and delegated responsibilities.',
      whenNotToUse: 'Rigid state machines requiring mathematical graph determinism, or low-latency sub-second micro-tasks.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic', 'Google Gemini', 'Ollama', 'Groq', 'Bedrock'],
      stateManagement: 'Built-in SQLite / Chroma memory store (Short-term, Long-term, Entity)',
      mcpSupport: 'CrewAI Tools package and custom tool wrappers',
      evalsAndObservability: 'CrewAI Enterprise platform, AgentOps, Langfuse, OpenTelemetry'
    },
    documentation: {
      websiteUrl: 'https://crewai.com',
      docsUrl: 'https://docs.crewai.com',
      githubUrl: 'https://github.com/crewAIInc/crewAI'
    },
    accentColor: '#f97316',
    gradient: 'from-orange-500 via-rose-600 to-amber-700'
  },

  // ==========================================
  // 9. PydanticAI
  // ==========================================
  {
    id: 'pydanticai',
    name: 'PydanticAI',
    tagline: 'Python-native, type-safe agent framework built on Pydantic validation',
    category: 'python-first',
    categoryLabel: 'Python-First Framework',
    developer: 'Pydantic Inc. (Samuel Colvin)',
    languages: ['Python'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source / Logfire observability platform',
    badge: 'Production Type Safety',
    description: 'A production-grade Python agent framework designed by the creators of Pydantic. Prioritizes static typing, explicit dependency injection, structured response guarantees, and seamless streaming over magic abstractions.',
    architectureOverview: 'Constructed around `Agent[DepsType, ResultType]`. Leverages standard Python type hints to enforce rigid schema validation for both tool parameters and final outputs. Includes a type-safe Dependency Injection system (`RunContext`) allowing database connections and API clients to be passed securely to tools.',
    keyFeatures: [
      'Rigorous type safety: Generics enforce `Agent[Deps, Output]` across static linters (mypy, pyright)',
      'Type-safe Dependency Injection system passing runtime clients safely to tools',
      'Model-agnostic engine supporting OpenAI, Anthropic, Gemini, Groq, Mistral, and Ollama',
      'Real-time streaming of structured validation objects before completion',
      'Zero-overhead integration with Pydantic Logfire for step-by-step tracing'
    ],
    installation: {
      command: 'pip install pydantic-ai logfire',
      method: 'Python pip package',
      prerequisites: 'Python 3.10+ (requires modern type union syntax).',
      envVars: ['OPENAI_API_KEY=your_key', 'LOGFIRE_TOKEN=optional_token']
    },
    howToUse: {
      title: 'Type-Safe Banking Agent with Injected DB Client',
      description: 'Creating an agent that validates structured return types with injected dependencies.',
      code: `from dataclasses import dataclass
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext

@dataclass
class DatabaseConn:
    def get_balance(self, user_id: str) -> float:
        return 14500.50

class BankReport(BaseModel):
    account_id: str
    balance: float
    status: str = Field(description="Account risk status: OK, FLAG, or REVIEW")

agent = Agent(
    'openai:gpt-4o',
    deps_type=DatabaseConn,
    result_type=BankReport,
    system_prompt="You are an authorized banking compliance assistant."
)

@agent.tool
def fetch_balance(ctx: RunContext[DatabaseConn], user_id: str) -> float:
    return ctx.deps.get_balance(user_id)

db = DatabaseConn()
result = agent.run_sync("Review account ACC-442 for compliance", deps=db)
print(result.data.balance, result.data.status)`,
      explanation: 'The agent statically guarantees that the returned output adheres strictly to the BankReport Pydantic schema, failing fast with automatic retry if the LLM hallucinates an invalid field.'
    },
    useCases: {
      primary: [
        'Production backend services requiring strict Pydantic data contract guarantees',
        'Enterprise financial and healthcare systems with zero tolerance for schema drift',
        'Microservices using dependency injection (FastAPI, SQLModel, SQLAlchemy)',
        'Fast streaming structured responses for real-time dashboards'
      ],
      bestFor: 'Python developers and engineering teams who value type safety, clean IDE autocompletion, Pydantic data models, and testable dependency injection.',
      whenNotToUse: 'Non-Python tech stacks or visual drag-and-drop workflow builders.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Groq', 'Mistral', 'Ollama'],
      stateManagement: 'Explicit dependency injection (`deps`) and stateless execution by default',
      mcpSupport: 'Easily wrapped via standard Python functions and MCP clients',
      evalsAndObservability: 'Pydantic Logfire, OpenTelemetry, standard pytest suites'
    },
    documentation: {
      websiteUrl: 'https://ai.pydantic.dev',
      docsUrl: 'https://ai.pydantic.dev',
      githubUrl: 'https://github.com/pydantic/pydantic-ai'
    },
    accentColor: '#e11d48',
    gradient: 'from-rose-500 via-pink-600 to-indigo-900'
  },

  // ==========================================
  // 10. Mastra
  // ==========================================
  {
    id: 'mastra',
    name: 'Mastra',
    tagline: 'TypeScript-first agent framework with workflows, evals, and local dev server',
    category: 'typescript-fullstack',
    categoryLabel: 'TypeScript & Fullstack',
    developer: 'Mastra AI',
    languages: ['TypeScript', 'JavaScript'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source / Mastra Cloud deployment',
    badge: 'TypeScript Workflows & Evals',
    description: 'An open-source TypeScript framework for building production AI applications and agents. Combines autonomous agents, step-by-step stateful workflows with branching, integrated RAG vector search, and automated evaluation metrics in one unified package.',
    architectureOverview: 'Architected with a modern Next.js/Node.js mindset. Agents are configured with instructions, tools, and vector memories. Workflows are declared using a type-safe step builder with automatic step retries, parallel branches, and suspend/resume capabilities.',
    keyFeatures: [
      'Full-stack TypeScript native design with full Zod schema validation',
      'Graph-like Workflows with conditional branching, parallel steps, and suspension',
      'Built-in RAG with native vector store adapters (Pinecone, pgvector, Qdrant)',
      'Automated Evaluation suite measuring hallucination, toxicity, and answer relevancy',
      'Local dev playground server (`mastra dev`) for live agent testing and API exposure'
    ],
    installation: {
      command: 'npm install @mastra/core @mastra/evals',
      method: 'Node.js npm / pnpm / yarn package',
      prerequisites: 'Node.js 18+ and TypeScript 5.0+.',
      envVars: ['OPENAI_API_KEY=your_key', 'ANTHROPIC_API_KEY=your_key']
    },
    howToUse: {
      title: 'Type-Safe Mastra Agent with Zod Tool Calling',
      description: 'Creating a TypeScript agent with Zod schema validation and local dev serving.',
      code: `import { Agent } from '@mastra/core';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

const weatherTool = createTool({
  id: 'get-weather',
  description: 'Fetches real-time weather metrics',
  inputSchema: z.object({ city: z.string() }),
  execute: async ({ context }) => {
    return { temp: 22, condition: 'Sunny in ' + context.city };
  },
});

export const weatherAgent = new Agent({
  name: 'Weather Assistant',
  instructions: 'You provide helpful weather advice to travelers.',
  model: {
    provider: 'OPEN_AI',
    name: 'gpt-4o',
  },
  tools: { weatherTool },
});

const response = await weatherAgent.generate('What should I pack for Tokyo today?');
console.log(response.text);`,
      explanation: 'Defines tools with Zod schemas. Mastra handles model routing, input validation, tool execution, and returns a verified TypeScript response.'
    },
    useCases: {
      primary: [
        'Full-stack TypeScript and Next.js applications requiring robust backend AI agents',
        'Enterprise workflows combining deterministic business logic with probabilistic LLMs',
        'Automated CI/CD evaluation pipelines scoring agent answers before merging code',
        'FastAPI-alternative agent endpoints running on Node.js / Vercel'
      ],
      bestFor: 'TypeScript and JavaScript full-stack engineers who want a unified framework combining agents, workflows, RAG, and evals without relying on Python.',
      whenNotToUse: 'Heavy scientific or ML pipelines rooted in PyTorch, NumPy, or pandas.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Mistral', 'Groq'],
      stateManagement: 'PostgreSQL, LibSQL, SQLite vector and workflow persistence',
      mcpSupport: 'Native Model Context Protocol client support',
      evalsAndObservability: 'Built-in automated eval metrics (hallucination, relevancy, bias) and OpenTelemetry'
    },
    documentation: {
      websiteUrl: 'https://mastra.ai',
      docsUrl: 'https://mastra.ai/docs',
      githubUrl: 'https://github.com/mastra-ai/mastra'
    },
    accentColor: '#8b5cf6',
    gradient: 'from-purple-500 via-indigo-600 to-pink-600'
  },

  // ==========================================
  // 11. Vercel AI SDK
  // ==========================================
  {
    id: 'vercel-ai-sdk',
    name: 'Vercel AI SDK',
    tagline: 'The de-facto standard TypeScript toolkit for streaming AI interfaces and agents',
    category: 'typescript-fullstack',
    categoryLabel: 'TypeScript & Fullstack',
    developer: 'Vercel',
    languages: ['TypeScript', 'JavaScript'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source library / Vercel hosting integration',
    badge: 'De-Facto Web Standard',
    description: 'The definitive library for building AI-powered web applications and agents in TypeScript. Provides a unified API across 20+ model providers with core primitives like `generateText`, `streamText`, and multi-step tool loops (`maxSteps`).',
    architectureOverview: 'Divided into two layers: AI SDK Core (a unified server-side library for LLM interaction, tool calling, and multi-step agent loops) and AI SDK UI (React/Next.js/Svelte/Vue hooks for real-time generative streaming, chat, and generative UI rendering).',
    keyFeatures: [
      'Multi-step autonomous agent execution with `maxSteps` loop control',
      'Unified provider abstraction (`openai`, `anthropic`, `google`, `deepseek`, etc.)',
      'First-class Generative UI: render rich interactive React components directly in chat streams',
      'Universal framework adapters for Next.js App Router, Remix, Nuxt, and Node.js',
      'Instant token streaming with zero latency buffering'
    ],
    installation: {
      command: 'npm install ai @ai-sdk/openai @ai-sdk/anthropic zod',
      method: 'Node.js npm / pnpm / bun package',
      prerequisites: 'Node.js 18+ or modern edge runtimes (Cloudflare Workers, Vercel Edge).',
      envVars: ['OPENAI_API_KEY=your_key', 'ANTHROPIC_API_KEY=your_key']
    },
    howToUse: {
      title: 'Autonomous Multi-Step Agent Loop with Tool Calling',
      description: 'Using generateText with maxSteps to enable autonomous agent tool loops.',
      code: `import { generateText, tool } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

const { text, steps } = await generateText({
  model: openai('gpt-4o'),
  maxSteps: 5, // Autonomous loop: model calls tools repeatedly until task is complete
  tools: {
    checkStock: tool({
      description: 'Checks stock inventory for a product SKU',
      parameters: z.object({ sku: z.string() }),
      execute: async ({ sku }) => ({ sku, inStock: true, count: 42 }),
    }),
  },
  prompt: 'Check stock for SKU-884 and summarize availability for the customer.',
});

console.log(text);`,
      explanation: 'Setting maxSteps > 1 enables an automatic agent loop. The model queries the tool, receives the output, and crafts the final customer-ready answer autonomously.'
    },
    useCases: {
      primary: [
        'Modern web applications, SaaS dashboards, and consumer AI chat interfaces',
        'Generative UI components streaming dynamic widgets into the browser',
        'Serverless and Edge agent functions running on Vercel or Cloudflare Workers',
        'Interactive code generation, live canvas assistants, and copilot sidebars'
      ],
      bestFor: 'Web and full-stack developers using React, Next.js, or Svelte who need instant streaming, generative UI, and bulletproof tool calling.',
      whenNotToUse: 'Heavy long-running backend data science pipelines that live in Python notebooks.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic', 'Google', 'Mistral', 'Cohere', 'Amazon Bedrock', 'Ollama'],
      stateManagement: 'Client-side UI message state via `useChat()` and custom server sessions',
      mcpSupport: 'MCP client connectors via community tool integrations',
      evalsAndObservability: 'Langfuse, Braintrust, OpenTelemetry, Vercel AI SDK Telemetry'
    },
    documentation: {
      websiteUrl: 'https://sdk.vercel.ai',
      docsUrl: 'https://sdk.vercel.ai/docs',
      githubUrl: 'https://github.com/vercel/ai'
    },
    accentColor: '#000000',
    gradient: 'from-slate-700 via-neutral-800 to-black'
  },

  // ==========================================
  // 12. Eve (Vercel)
  // ==========================================
  {
    id: 'eve',
    name: 'Eve',
    tagline: 'Filesystem-first open framework for durable, long-running backend AI agents',
    category: 'typescript-fullstack',
    categoryLabel: 'TypeScript & Fullstack',
    developer: 'Vercel',
    languages: ['TypeScript', 'JavaScript'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source / Vercel cloud agent harness',
    badge: 'Filesystem-First Runtime',
    description: 'Developed by Vercel as "Next.js for Agents", Eve is an open-source, filesystem-based framework for building durable, stateful, and autonomous agents. Organizes instructions, tools, skills, subagents, and channels cleanly on disk with native human approval gates.',
    architectureOverview: 'Adopts a filesystem-driven paradigm: your project directory contains structured agent files (`instructions.md`, `skills/`, `subagents/`, `channels/`). The Eve runtime executes long-running loops with built-in checkpointing, isolated command sandboxes, and policy-driven human approval gates.',
    keyFeatures: [
      'Filesystem-first architecture: declare agents, skills, and subagents in folders and markdown',
      'Durable execution surviving server restarts and network interruptions',
      'Built-in human-in-the-loop approval gates for destructive operations',
      'Isolated execution sandboxes preventing unauthorized system modifications',
      'Multi-channel messaging connecting agents to Slack, Discord, webhooks, and terminals'
    ],
    installation: {
      command: 'npm install -g eve-cli  # Or: npx eve init',
      method: 'Node.js npm global CLI or package installer',
      prerequisites: 'Node.js 20+ and Docker or container sandbox environment.',
      envVars: ['OPENAI_API_KEY=your_key', 'ANTHROPIC_API_KEY=your_key']
    },
    howToUse: {
      title: 'Filesystem Agent Definition & Execution',
      description: 'Defining an agent structure with filesystem conventions and launching via CLI.',
      code: `# Directory Structure:
# ├── my-agent/
# │   ├── instructions.md
# │   ├── tools/
# │   │   └── deploy.ts
# │   └── agent.config.ts

# In agent.config.ts:
import { defineConfig } from 'eve';

export default defineConfig({
  name: 'DevOps Agent',
  model: 'anthropic:claude-3-7-sonnet',
  sandbox: { enabled: true, networkAccess: false },
  approvals: {
    destructiveTools: ['deploy-to-prod', 'drop-database']
  }
});

# Launch durable runner:
# $ eve run "Inspect staging health and propose deployment patch"`,
      explanation: 'Eve reads instructions and skills directly from disk, runs tool calls within isolated sandboxes, and triggers approval gates before critical actions.'
    },
    useCases: {
      primary: [
        'Durable DevOps and infrastructure maintenance agents running for hours or days',
        'Complex engineering assistants that require isolated sandboxes and human approval gates',
        'Autonomous coding swarms organizing modular skills in shared repositories',
        'Multi-channel AI operations assistants wired directly to Slack and GitHub webhooks'
      ],
      bestFor: 'Developers seeking an organized, convention-over-configuration filesystem layout for durable, long-running agent harnesses with built-in safety sandboxing.',
      whenNotToUse: 'Quick single-turn completions or lightweight frontend components.'
    },
    ecosystem: {
      supportedModels: ['Anthropic Claude 3.7', 'OpenAI o3/GPT-4o', 'Google Gemini'],
      stateManagement: 'Durable filesystem and SQLite journal checkpointing',
      mcpSupport: 'Native Model Context Protocol tool execution',
      evalsAndObservability: 'Integrated audit logs, sandbox event streaming, OpenTelemetry'
    },
    documentation: {
      websiteUrl: 'https://eve.dev',
      docsUrl: 'https://github.com/vercel/eve',
      githubUrl: 'https://github.com/vercel/eve'
    },
    accentColor: '#3b82f6',
    gradient: 'from-blue-600 via-indigo-700 to-slate-950'
  },

  // ==========================================
  // 13. LlamaIndex Workflows
  // ==========================================
  {
    id: 'llamaindex-workflows',
    name: 'LlamaIndex Workflows',
    tagline: 'Event-driven, async agentic orchestrator deeply connected to enterprise data & RAG',
    category: 'multi-agent-orchestrator',
    categoryLabel: 'Multi-Agent Orchestrator',
    developer: 'LlamaIndex',
    languages: ['Python', 'TypeScript'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source / LlamaCloud enterprise platform',
    badge: 'Event-Driven RAG Orchestrator',
    description: 'An event-driven framework for orchestrating complex agentic workflows and multi-agent systems. Replaces rigid DAGs with an async event-bus architecture, allowing agents and tools to emit typed events that trigger concurrent handler steps.',
    architectureOverview: 'Built on `Workflow`, `Event`, and `@step` decorators. Handlers consume one or more typed events and emit new events, enabling dynamic branching, event fan-out, fan-in joins, and cyclical reflection loops natively integrated with LlamaIndex vector indexes and data connectors.',
    keyFeatures: [
      'Event-driven, asynchronous step orchestration with typed event routing',
      'Dynamic fan-out (triggering parallel tasks) and fan-in (waiting for multiple events)',
      'Native integration with LlamaIndex’s vast ecosystem of 300+ data loaders and vector stores',
      'Built-in human-in-the-loop pausing and interactive state injection',
      'Visual debugging via LlamaTrace (powered by Arize Phoenix)'
    ],
    installation: {
      command: 'pip install llama-index llama-index-core llama-index-llms-openai',
      method: 'Python pip package or npm install llamaindex',
      prerequisites: 'Python 3.10+.',
      envVars: ['OPENAI_API_KEY=your_key']
    },
    howToUse: {
      title: 'Event-Driven Fact-Checking Workflow',
      description: 'Creating an asynchronous workflow where search events trigger parallel verification.',
      code: `from llama_index.core.workflow import Workflow, Event, StartEvent, StopEvent, step
from llama_index.llms.openai import OpenAI

class QueryEvent(Event):
    query: str

class VerificationWorkflow(Workflow):
    @step
    async def prepare_query(self, ev: StartEvent) -> QueryEvent:
        return QueryEvent(query=ev.get("input_text"))

    @step
    async def verify(self, ev: QueryEvent) -> StopEvent:
        llm = OpenAI(model="gpt-4o")
        response = await llm.acomplete(f"Verify factuality: {ev.query}")
        return StopEvent(result=str(response))

wf = VerificationWorkflow(timeout=30)
result = await wf.run(input_text="Was quantum teleportation demonstrated in 2026?")
print(result)`,
      explanation: 'Decouples steps into event emitters and consumers. Steps execute concurrently as events flow through the typed event bus until a StopEvent terminates the workflow.'
    },
    useCases: {
      primary: [
        'Advanced agentic RAG systems requiring multi-stage document filtering and re-ranking',
        'Event-driven document ingestion, validation, and metadata enrichment pipelines',
        'Complex asynchronous multi-agent coordination with parallel research agents',
        'Customer support ticket resolution with asynchronous human-in-the-loop escalations'
      ],
      bestFor: 'Data-intensive applications that need tight coupling between advanced RAG retrieval, vector search, and asynchronous event-driven multi-agent orchestration.',
      whenNotToUse: 'Purely synchronous scripts with no document search or event handling requirements.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic', 'Gemini', 'Hugging Face', 'Ollama', 'Mistral'],
      stateManagement: 'Workflow Context dictionary with event history and LlamaCloud checkpointing',
      mcpSupport: 'MCP client connectors and LlamaHub tool packs',
      evalsAndObservability: 'LlamaTrace (Arize Phoenix), OpenInference, TruLens'
    },
    documentation: {
      websiteUrl: 'https://llamaindex.ai',
      docsUrl: 'https://docs.llamaindex.ai/en/stable/module_guides/workflow/',
      githubUrl: 'https://github.com/run-llama/llama_index'
    },
    accentColor: '#84cc16',
    gradient: 'from-lime-500 via-emerald-600 to-slate-900'
  },

  // ==========================================
  // 14. AutoGen / AG2
  // ==========================================
  {
    id: 'autogen-ag2',
    name: 'AutoGen / AG2',
    tagline: 'Pioneering multi-agent conversational framework with autonomous code execution',
    category: 'multi-agent-orchestrator',
    categoryLabel: 'Multi-Agent Orchestrator',
    developer: 'Microsoft & AG2 Community',
    languages: ['Python', '.NET'],
    license: 'CC-BY-4.0 / Apache 2.0 (Open Source)',
    pricing: 'Free open source framework',
    badge: 'Conversational Swarm Pioneer',
    description: 'One of the most widely cited multi-agent frameworks, pioneered by Microsoft Research and now evolved into AG2. Enables developers to build systems of customizable, conversable agents that collaborate, critique each other, and autonomously execute code in Docker sandboxes.',
    architectureOverview: 'Operates on `ConversableAgent`, `AssistantAgent`, and `UserProxyAgent`. Agents communicate by passing natural language and structured messages in GroupChat round-robins or custom finite state machines (FSM), with built-in capability to execute shell commands and Python code in sandboxed containers.',
    keyFeatures: [
      'Multi-agent conversation patterns (two-agent, group chat, hierarchical manager, FSM)',
      'Sandboxed Docker code execution preventing destructive host command execution',
      'Human-in-the-loop interaction via UserProxyAgent input prompts',
      'AutoGen Studio visual UI for building and testing agent teams in the browser',
      'Support for tool calling, web browsing, and multi-model agent ensembles'
    ],
    installation: {
      command: 'pip install ag2  # Or: pip install pyautogen',
      method: 'Python pip package',
      prerequisites: 'Python 3.10+. Docker installed for secure code execution.',
      envVars: ['OPENAI_API_KEY=your_key']
    },
    howToUse: {
      title: 'Pair Programming Assistant with Code Execution',
      description: 'Creating an assistant agent that writes Python code and a proxy that runs it safely.',
      code: `import autogen

config_list = [{"model": "gpt-4o", "api_key": "YOUR_OPENAI_API_KEY"}]

assistant = autogen.AssistantAgent(
    name="Coder",
    llm_config={"config_list": config_list},
    system_message="You write clean Python code to solve math problems."
)

user_proxy = autogen.UserProxyAgent(
    name="Executor",
    human_input_mode="NEVER",
    code_execution_config={"work_dir": "coding", "use_docker": False}
)

user_proxy.initiate_chat(
    assistant,
    message="Plot a chart of Tesla vs Apple stock growth and save to chart.png"
)`,
      explanation: 'The Coder agent writes the required Python matplotlib code, and the Executor automatically runs the script, verifies the output, and reports success or runtime errors back to the model.'
    },
    useCases: {
      primary: [
        'Automated software engineering, test suite execution, and debugging loops',
        'Complex multi-agent simulations and adversarial role-playing (debates, negotiations)',
        'Data analysis where agents write, run, and refine SQL and Python data scripts',
        'Interactive research assistants with AutoGen Studio visual configuration'
      ],
      bestFor: 'Researchers and developers who need communicative conversational agents capable of writing and executing code iteratively.',
      whenNotToUse: 'Production APIs requiring microsecond response times or deterministic state machines with zero conversational banter.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Azure OpenAI', 'Anthropic Claude', 'Gemini', 'Ollama local models'],
      stateManagement: 'Chat history buffers and session cache directories',
      mcpSupport: 'MCP client connectors via community wrappers',
      evalsAndObservability: 'AutoGen Studio visualizer, AgentOps, OpenTelemetry'
    },
    documentation: {
      websiteUrl: 'https://ag2.ai',
      docsUrl: 'https://docs.ag2.ai',
      githubUrl: 'https://github.com/ag2ai/ag2'
    },
    accentColor: '#0ea5e9',
    gradient: 'from-cyan-500 via-sky-600 to-blue-800'
  },

  // ==========================================
  // 15. Smolagents
  // ==========================================
  {
    id: 'smolagents',
    name: 'Smolagents',
    tagline: 'Hugging Face minimalist library where agents write executable Python code blocks',
    category: 'python-first',
    categoryLabel: 'Python-First Framework',
    developer: 'Hugging Face',
    languages: ['Python'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source library',
    badge: 'Code-Driven Minimalist',
    description: 'A delightfully simple, lightweight agent library from Hugging Face built on a powerful philosophy: agents that write actual Python code actions perform dramatically better on complex logic, loops, and math than traditional JSON tool-calling agents.',
    architectureOverview: 'Centers on `CodeAgent` and `ToolCallingAgent`. Instead of generating JSON blobs for every single function call, a CodeAgent generates native Python code blocks (complete with variables, loops, and conditions) that are executed inside a secure, sandboxed AST Python interpreter.',
    keyFeatures: [
      'Code-as-action paradigm: writes Python code instead of bloated JSON tool schemas',
      'Extremely lightweight (~1,000 lines of core code) with minimal dependencies',
      'Secure built-in AST Python code interpreter without requiring Docker',
      'Direct integration with Hugging Face Hub tools and open-weights models',
      'Supports OpenAI, Anthropic, Gemini, transformers, and local Ollama models'
    ],
    installation: {
      command: 'pip install smolagents',
      method: 'Python pip package',
      prerequisites: 'Python 3.10+.',
      envVars: ['HF_TOKEN=your_token', 'OPENAI_API_KEY=your_key']
    },
    howToUse: {
      title: 'CodeAgent Solving Math & Fetching Live Data',
      description: 'An agent writing concise Python code to perform multi-step computational tasks.',
      code: `from smolagents import CodeAgent, DuckDuckGoSearchTool, HfApiModel

# Initialize model and web search tool
model = HfApiModel(model_id="Qwen/Qwen2.5-Coder-32B-Instruct")
search_tool = DuckDuckGoSearchTool()

agent = CodeAgent(
    tools=[search_tool],
    model=model,
    add_base_tools=True
)

# Agent will write a Python script with loops to calculate results
result = agent.run("Search the current inflation rate of the US, UK, and Japan, then calculate their average.")
print(result)`,
      explanation: 'Rather than calling the search tool 3 separate times via JSON parsing, the agent writes a concise Python loop, collects all 3 figures, computes the average natively in code, and returns the result in one step.'
    },
    useCases: {
      primary: [
        'Algorithmic and computational tasks requiring loops, conditions, and math calculations',
        'Open-source model deployments running on Hugging Face or local GPU hardware (Ollama)',
        'Educational and rapid prototyping environments where minimal boilerplate is prized',
        'Lightweight pair-programming terminal helpers'
      ],
      bestFor: 'Developers who want a minimalist, transparent codebase and recognize that models reason faster and cheaper when writing executable Python code rather than JSON payloads.',
      whenNotToUse: 'Enterprise systems requiring multi-tiered role hierarchies, human approval UIs, and distributed database checkpoints.'
    },
    ecosystem: {
      supportedModels: ['Hugging Face Hub models (Qwen 2.5 Coder, DeepSeek)', 'OpenAI', 'Anthropic', 'Ollama'],
      stateManagement: 'In-memory execution history and step logs',
      mcpSupport: 'Compatible via custom tool wrappers',
      evalsAndObservability: 'Hugging Face Hub telemetry and OpenTelemetry export'
    },
    documentation: {
      websiteUrl: 'https://huggingface.co/docs/smolagents',
      docsUrl: 'https://huggingface.co/docs/smolagents/index',
      githubUrl: 'https://github.com/huggingface/smolagents'
    },
    accentColor: '#ffcc00',
    gradient: 'from-yellow-400 via-amber-500 to-zinc-900'
  },

  // ==========================================
  // 16. Agno (Formerly Phidata)
  // ==========================================
  {
    id: 'agno',
    name: 'Agno',
    tagline: 'High-performance multimodal agent framework with built-in memory & storage',
    category: 'python-first',
    categoryLabel: 'Python-First Framework',
    developer: 'Agno (formerly Phidata)',
    languages: ['Python'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source / Agno App cloud platform',
    badge: 'Blazing Fast Multimodal',
    description: 'Formerly known as Phidata, Agno is a high-performance framework for building multimodal AI agents with memory, knowledge, and tools. Built for extreme speed (sub-millisecond framework overhead), Agno stores sessions natively in SQLite or PostgreSQL.',
    architectureOverview: 'Encapsulates intelligence into an `Agent` equipped with Tools, Storage (SQL databases), Knowledge (vector stores), and Memory. Natively processes text, audio, images, and video feeds, making it ideal for real-time multimodal assistants.',
    keyFeatures: [
      'Sub-millisecond framework execution overhead with zero bloat',
      'Native multimodal support: seamlessly process audio, video, images, and text',
      'Built-in SQL storage (PostgreSQL, SQLite) storing user sessions and chat state automatically',
      'Team & Swarm orchestration: coordinate multiple agents with clear delegation protocols',
      'Agno Playground: 1-click web interface to interact with, inspect, and share your agents'
    ],
    installation: {
      command: 'pip install agno openai',
      method: 'Python pip package',
      prerequisites: 'Python 3.9+.',
      envVars: ['OPENAI_API_KEY=your_key']
    },
    howToUse: {
      title: 'Persistent Financial Agent with SQLite Memory',
      description: 'Creating an agent that tracks stock prices and stores memory across sessions.',
      code: `from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.tools.yfinance import YFinanceTools
from agno.storage.agent.sqlite import SqliteAgentStorage

# Instantiate agent with built-in SQLite persistence
finance_agent = Agent(
    model=OpenAIChat(id="gpt-4o"),
    tools=[YFinanceTools(stock_price=True, analyst_recommendations=True)],
    storage=SqliteAgentStorage(table_name="finance_sessions", db_file="agents.db"),
    instructions=["Format output with tables and bullet points."],
    show_tool_calls=True,
    markdown=True
)

finance_agent.print_response("Compare NVDA and AMD analyst recommendations", stream=True)`,
      explanation: 'Agno executes the Yahoo Finance tools, streams the response in real time, and persists the conversation history directly to the SQLite database.'
    },
    useCases: {
      primary: [
        'Real-time multimodal agents processing live images, audio, and video streams',
        'Enterprise assistants requiring out-of-the-box PostgreSQL/SQLite session persistence',
        'Financial analysis, web search summarization, and data scraping pipelines',
        'High-concurrency microservices requiring negligible framework overhead'
      ],
      bestFor: 'Developers who want blazing-fast Python execution, native multimodal capabilities, and built-in database storage without configuring complex external drivers.',
      whenNotToUse: 'TypeScript/Node.js web runtimes or complex multi-week state machines.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic', 'Google Gemini', 'Ollama', 'Groq', 'Cohere'],
      stateManagement: 'Built-in SqliteAgentStorage, PostgresAgentStorage, MongoAgentStorage',
      mcpSupport: 'Broad tool adapters and custom function calling',
      evalsAndObservability: 'Agno Playground, OpenTelemetry, Langfuse'
    },
    documentation: {
      websiteUrl: 'https://agno.com',
      docsUrl: 'https://docs.agno.com',
      githubUrl: 'https://github.com/agno-agi/agno'
    },
    accentColor: '#6366f1',
    gradient: 'from-indigo-500 via-purple-600 to-pink-700'
  },

  // ==========================================
  // 17. Spring AI
  // ==========================================
  {
    id: 'spring-ai',
    name: 'Spring AI',
    tagline: 'Spring Framework enterprise AI abstraction for portable models and agents in Java',
    category: 'enterprise-jvm',
    categoryLabel: 'Enterprise & JVM',
    developer: 'VMware Tanzu / Spring Community',
    languages: ['Java', 'Kotlin'],
    license: 'Apache 2.0 (Open Source)',
    pricing: 'Free open source framework',
    badge: 'Enterprise Java Standard',
    description: 'Brings portable AI agents and generative intelligence to the enterprise Java and Spring ecosystem. Applies familiar Spring concepts—Dependency Injection, POJO configuration, and repository abstractions—to AI models, tool calling, and RAG pipelines.',
    architectureOverview: 'Structured around `ChatModel`, `Prompt`, and `ChatClient`. Integrates function calling with standard Java `@Bean` declarations and supports vector stores (pgvector, Milvus, Neo4j) through Spring Data repositories.',
    keyFeatures: [
      'Seamless integration into Spring Boot 3.x and enterprise microservice architectures',
      'Portability across models (OpenAI, Azure, Bedrock, Anthropic, Ollama, Vertex AI)',
      'Type-safe Java function calling exposing Spring Beans as agent tools',
      'Vector store abstractions supporting pgvector, Redis, Milvus, Chroma, and Cassandra',
      'Native Observability with Spring Boot Actuator and Micrometer metrics'
    ],
    installation: {
      command: 'Add spring-ai-openai-spring-boot-starter to pom.xml or build.gradle',
      method: 'Maven dependency or Gradle build script via start.spring.io',
      prerequisites: 'Java 17+ or Java 21 LTS and Spring Boot 3.3+.',
      envVars: ['SPRING_AI_OPENAI_API_KEY=your_key']
    },
    howToUse: {
      title: 'Spring Boot ChatClient with Function Tool Bean',
      description: 'Injecting ChatClient and exposing Java methods as agent tools.',
      code: `@RestController
public class AgentController {

    private final ChatClient chatClient;

    public AgentController(ChatClient.Builder builder) {
        this.chatClient = builder
            .defaultSystem("You are an enterprise ERP assistant.")
            .build();
    }

    @GetMapping("/ask")
    public String ask(@RequestParam String question) {
        return this.chatClient.prompt()
            .user(question)
            .tools(new OrderTrackingService()) // Binds Java service method
            .call()
            .content();
    }
}`,
      explanation: 'Exposes standard Java service beans as tools. Spring AI handles parameter serialization, LLM function calling, and HTTP endpoint exposure natively in the Spring container.'
    },
    useCases: {
      primary: [
        'Enterprise Java applications and banking backends integrating generative AI',
        'Spring Boot microservices communicating with PostgreSQL pgvector data warehouses',
        'Cloud-native Kubernetes deployments on AWS, Azure, and Google Cloud with Spring Cloud',
        'Enterprise RAG pipelines searching internal Oracle or SQL databases'
      ],
      bestFor: 'Enterprise Java and Kotlin developers who want to incorporate AI agents into their existing Spring Boot services with native dependency injection and telemetry.',
      whenNotToUse: 'Fast Python prototyping or browser-side JavaScript applications.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Azure OpenAI', 'Amazon Bedrock', 'Anthropic', 'Ollama', 'Mistral'],
      stateManagement: 'Spring Session, Redis, and JPA/Hibernate database persistence',
      mcpSupport: 'Model Context Protocol client integration in active development',
      evalsAndObservability: 'Micrometer metrics, Spring Boot Actuator, Prometheus, Grafana'
    },
    documentation: {
      websiteUrl: 'https://spring.io/projects/spring-ai',
      docsUrl: 'https://docs.spring.io/spring-ai/reference/',
      githubUrl: 'https://github.com/spring-projects/spring-ai'
    },
    accentColor: '#6db33f',
    gradient: 'from-green-600 via-emerald-700 to-teal-900'
  },

  // ==========================================
  // 18. DSPy
  // ==========================================
  {
    id: 'dspy',
    name: 'DSPy',
    tagline: 'Stanford framework for compiling declarative LM programs and self-optimizing prompts',
    category: 'python-first',
    categoryLabel: 'Python-First Framework',
    developer: 'Stanford NLP Group',
    languages: ['Python'],
    license: 'MIT License (Open Source)',
    pricing: 'Free open source framework',
    badge: 'Algorithmic Optimization',
    description: 'Pioneered by Stanford NLP, DSPy replaces brittle manual prompt engineering with programmatic modules and teleprompter optimizers. It treats LLM pipelines like neural networks, optimizing prompts and few-shot examples algorithmically against a metric.',
    architectureOverview: 'Built around Signatures (declarative input/output specs), Modules (e.g. `ChainOfThought`, `ReAct`, `ProgramOfThought`), and Optimizers (Teleprompters like `BootstrapFewShot`, `MIPROv2`). The compiler evaluates pipeline outputs against validation data and automatically synthesizes optimal prompts.',
    keyFeatures: [
      'Algorithmic prompt optimization replacing manual trial-and-error prompting',
      'Signatures: declarative input/output type contracts (`question -> answer`)',
      'Teleprompter optimizers: automatically generate and tune few-shot demonstrations',
      'Modular composability: assemble complex multi-hop reasoning graphs',
      'Model switching: seamlessly compile for local 8B models or frontier GPT-4o'
    ],
    installation: {
      command: 'pip install dspy-ai',
      method: 'Python pip package',
      prerequisites: 'Python 3.10+.',
      envVars: ['OPENAI_API_KEY=your_key']
    },
    howToUse: {
      title: 'Compiling a Multi-Hop QA Module with Teleprompter',
      description: 'Defining a typed signature and letting DSPy optimize the prompt automatically.',
      code: `import dspy

lm = dspy.LM('openai/gpt-4o-mini')
dspy.configure(lm=lm)

# Define typed input/output contract
class MultiHopQA(dspy.Signature):
    """Answer complex questions by synthesizing intermediate facts."""
    context: str = dspy.InputField(desc="Retrieved reference documents")
    question: str = dspy.InputField()
    rationale: str = dspy.OutputField(desc="Step-by-step reasoning")
    answer: str = dspy.OutputField(desc="Final concise answer")

# Instantiate module with ChainOfThought
qa_module = dspy.ChainOfThought(MultiHopQA)
response = qa_module(context="Antigravity 2.0 was released in 2026.", question="When was Antigravity 2.0 launched?")

print(response.rationale)
print(response.answer)`,
      explanation: 'DSPy structures the reasoning steps into programmatic fields and can compile this module across hundreds of examples to maximize accuracy.'
    },
    useCases: {
      primary: [
        'Complex multi-hop question answering requiring mathematical precision',
        'Distilling large frontier model capabilities into smaller, cost-effective 8B local models',
        'High-accuracy classification and information extraction pipelines',
        'Research and enterprise benchmarks where manual prompt tuning is unsustainable'
      ],
      bestFor: 'Machine learning engineers and researchers who want to treat LLM agents with the rigor of machine learning models rather than manual prompt hacks.',
      whenNotToUse: 'Simple conversational chat interfaces where basic prompt templates suffice.'
    },
    ecosystem: {
      supportedModels: ['OpenAI', 'Anthropic Claude', 'Google Gemini', 'Ollama local models', 'vLLM', 'SGLang'],
      stateManagement: 'In-memory module weights and compiled configuration files',
      mcpSupport: 'Custom tools via Python callable bindings',
      evalsAndObservability: 'DSPy built-in optimization metrics and Langfuse tracing'
    },
    documentation: {
      websiteUrl: 'https://dspy.ai',
      docsUrl: 'https://dspy.ai',
      githubUrl: 'https://github.com/stanfordnlp/dspy'
    },
    accentColor: '#6366f1',
    gradient: 'from-violet-600 via-indigo-600 to-slate-900'
  }
];
