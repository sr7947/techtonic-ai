export interface CodingAgent {
  id: string;
  name: string;
  tagline: string;
  category: 'first-party' | 'independent';
  categoryLabel: string;
  developer: string;
  license: string;
  pricing: string;
  badge: string;
  description: string;
  overview: string;
  installation: {
    command: string;
    method: string;
    osSupport: string[];
    prerequisites: string;
    envVars?: string[];
  };
  foundationModels: {
    supported: string[];
    defaultRecommendation: string;
    byoKey: boolean;
    localModelSupport: boolean;
    contextWindow: string;
  };
  mcps: {
    supported: boolean;
    type: 'Native Client' | 'Client & Server' | 'Plugin Extension' | 'Planned / Third-Party';
    configSnippet?: string;
    popularServers: string[];
  };
  toolsAndPlugins: {
    terminalExecution: boolean;
    multiFileDiff: boolean;
    browserPreview: boolean;
    ideSupport: string[];
    keyTools: string[];
  };
  documentation: {
    websiteUrl: string;
    docsUrl: string;
    githubUrl?: string;
    communityUrl?: string;
  };
  accentColor: string;
  gradient: string;
}

export const CODING_AGENTS: CodingAgent[] = [
  // ==========================================
  // FIRST-PARTY CODING AGENTS (IDEs & Cloud SWEs)
  // ==========================================
  {
    id: 'cursor',
    name: 'Cursor',
    tagline: 'The AI-first code editor designed for pair programming with frontier models',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Anysphere',
    license: 'Proprietary Editor (Fork of VS Code)',
    pricing: 'Free Hobby Tier / $20/mo Pro / $40/mo Business',
    badge: 'Frontier AI IDE',
    description: 'An AI-native fork of Visual Studio Code built from the ground up to integrate frontier language models directly into multi-file codebase indexing, interactive inline editing, and autonomous terminal execution.',
    overview: 'Cursor revolutionizes software engineering through "Composer" (Cmd+I) which plans and edits across dozens of files simultaneously, background codebase vector indexing for instant whole-repo context, and custom .cursorrules system prompts.',
    installation: {
      command: 'curl -fsSL https://cursor.com/install.sh | bash',
      method: 'Official Desktop App (macOS .dmg, Windows .exe, Linux AppImage/tar.gz) or CLI curl script',
      osSupport: ['macOS (Apple Silicon & Intel)', 'Windows 10/11', 'Linux (Ubuntu, Debian, Fedora, Arch)'],
      prerequisites: 'Git installed. Automatic 1-click migration imports all VS Code extensions, keybindings, and themes.',
      envVars: ['OPENAI_API_KEY (Optional for custom key mode)', 'ANTHROPIC_API_KEY (Optional)']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max - SWE Leader)',
        'GPT-6 Astra (max - Autonomous SWE)',
        'Claude Opus 5.5 (max Reasoning)',
        'Gemini 4 Carbon (high - 2M Context)',
        'GPT-6.1 Sol (High-Efficiency Reasoning)',
        'DeepSeek V4.1 Flash (MoE Flash)',
        'Claude 3.7 Sonnet (Thinking)',
        'OpenAI o3-mini (High Compute)',
        'Cursor-Next (Specialized Edit Engine)'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 (max) / GPT-6 Astra',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/dir"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxx" }
    }
  }
}`,
      popularServers: ['Filesystem', 'GitHub', 'PostgreSQL', 'Puppeteer', 'Brave Search', 'Fetch MCP']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Cursor Native App (Full VS Code extension ecosystem compatible)'],
      keyTools: ['Composer multi-file editor', 'Terminal auto-run with approval', '.cursorrules repo guidelines', 'Vector semantic codebase search']
    },
    documentation: {
      websiteUrl: 'https://cursor.com',
      docsUrl: 'https://docs.cursor.com',
      communityUrl: 'https://forum.cursor.com'
    },
    accentColor: '#3b82f6',
    gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent'
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    tagline: 'The open-source, local-first autonomous terminal and editor coding agent',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'OpenCode Community & SST',
    license: 'Open Source (MIT License)',
    pricing: 'Free & Open Source (Pay only for your model tokens)',
    badge: 'Open-Source & Local First',
    description: 'An open-source AI coding agent designed to run autonomously inside your terminal, editor, and CI/CD pipelines, giving developers total ownership of their AI development workflows.',
    overview: 'OpenCode acts as an autonomous pair programmer that indexes your repository AST, executes tests, reads build logs, and iterates on code patches until all test suites pass.',
    installation: {
      command: 'npm install -g opencode-ai # or curl -fsSL https://opencode.ai/install | bash',
      method: 'NPM Global Package, Homebrew tap, or standalone binary',
      osSupport: ['macOS', 'Linux', 'Windows (PowerShell & WSL2)'],
      prerequisites: 'Node.js 18+ or Docker. Git required.',
      envVars: ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY', 'GEMINI_API_KEY', 'OPENCODE_MODEL']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max)',
        'Gemini 4 Carbon (high - 2M Context)',
        'DeepSeek V4.1 Flash (max)',
        'GPT-6.1 Sol (max)',
        'Claude 3.7 Sonnet',
        'Qwen 2.5 Coder 32B',
        'Local Ollama / vLLM'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 or Gemini 4 Carbon',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 2,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcp": {
    "servers": {
      "sqlite": {
        "command": "uvx",
        "args": ["mcp-server-sqlite", "--db-path", "./dev.db"]
      }
    }
  }
}`,
      popularServers: ['SQLite', 'Git Inspector', 'Docker', 'PostgreSQL', 'Web Search']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['Terminal TUI', 'VS Code Extension', 'Neovim plugin'],
      keyTools: ['Automated test-and-repair loop', 'AST symbol graph indexing', 'Self-healing diff generator']
    },
    documentation: {
      websiteUrl: 'https://opencode.ai',
      docsUrl: 'https://docs.opencode.ai',
      githubUrl: 'https://github.com/sst/opencode'
    },
    accentColor: '#10b981',
    gradient: 'from-emerald-600/20 via-teal-600/10 to-transparent'
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    tagline: 'The world’s most widely adopted AI developer tool and autonomous workspace agent',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'GitHub & Microsoft',
    license: 'Proprietary Cloud Service',
    pricing: '$10/mo Individual / $19/mo Business / $39/mo Enterprise',
    badge: 'Enterprise Standard',
    description: 'GitHub’s flagship AI development companion integrated into millions of editors and repositories. Features Copilot Chat, multi-file agent mode, automated PR summaries, and Copilot Workspace.',
    overview: 'Copilot provides deep ecosystem integration directly inside GitHub.com, VS Code, JetBrains, Visual Studio, and Xcode. With Copilot Extensions and Agent Mode, it can inspect whole repos, run tests in the background, and resolve issues end-to-end.',
    installation: {
      command: 'code --install-extension GitHub.copilot && code --install-extension GitHub.copilot-chat',
      method: 'VS Code Extension Marketplace, JetBrains Plugins Repository, Visual Studio Installer, Neovim plugin',
      osSupport: ['macOS', 'Windows', 'Linux', 'GitHub.com Cloud Browser'],
      prerequisites: 'Active GitHub Copilot subscription or student/maintainer free grant.',
      envVars: ['GITHUB_TOKEN (Optional for CLI `gh copilot`)']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max - SWE Leader)',
        'GPT-6 Astra (max)',
        'GPT-6.1 Sol (max)',
        'Claude 3.7 Sonnet',
        'OpenAI o3-mini',
        'Gemini 4 Carbon'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 / GPT-6 Astra',
      byoKey: false,
      localModelSupport: false,
      contextWindow: 'Up to 500,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Plugin Extension',
      configSnippet: `{
  "github.copilot.chat.mcp": {
    "enabled": true,
    "servers": ["github-enterprise", "azure-devops", "linear"]
  }
}`,
      popularServers: ['GitHub API', 'Azure Resource Graph', 'Docker', 'Sentry', 'Datadog']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['VS Code', 'Visual Studio', 'JetBrains IDEs (IntelliJ, PyCharm, WebStorm)', 'Neovim', 'Xcode'],
      keyTools: ['Copilot Edits multi-file editor', 'Copilot Workspace issue resolver', 'CLI `gh copilot explain/suggest`', 'GitHub PR code reviewer']
    },
    documentation: {
      websiteUrl: 'https://github.com/features/copilot',
      docsUrl: 'https://docs.github.com/en/copilot',
      communityUrl: 'https://github.com/orgs/community/discussions/categories/copilot'
    },
    accentColor: '#8b5cf6',
    gradient: 'from-purple-600/20 via-indigo-600/10 to-transparent'
  },
  {
    id: 'devin',
    name: 'Devin',
    tagline: 'The first autonomous AI software engineer capable of building and shipping end-to-end',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Cognition AI',
    license: 'Proprietary Cloud Platform',
    pricing: '$500/mo Pro / Enterprise Custom Tier',
    badge: 'Autonomous Software Engineer',
    description: 'An autonomous AI software engineer equipped with its own sandboxed virtual machine, Linux shell, code editor, and headless browser to tackle complex engineering tasks from bug fixing to full migration.',
    overview: 'Devin works asynchronously alongside human engineers. Given a GitHub issue or Slack message, Devin clones the repository, reproduces the bug, executes builds, navigates live websites to verify visual layout, and raises a pristine Pull Request with test proofs.',
    installation: {
      command: 'npm install -g @cognition/devin-cli # or access via web app at devin.ai',
      method: 'Managed Cloud Web Platform (devin.ai), Slack bot integration, GitHub App integration',
      osSupport: ['Cloud Sandboxed Linux (Ubuntu) accessed from any Web Browser, Slack, or GitHub'],
      prerequisites: 'Cognition Devin Enterprise or Team account credentials.',
      envVars: ['DEVIN_API_KEY', 'GITHUB_TOKEN']
    },
    foundationModels: {
      supported: [
        'Cognition 4.0 Native SWE Reasoning Engine',
        'Claude Sonnet 5.5 Enterprise',
        'GPT-6 Astra Enterprise',
        'Gemini 4 Carbon Enterprise'
      ],
      defaultRecommendation: 'Cognition 4.0 SWE Engine / Claude Sonnet 5.5',
      byoKey: false,
      localModelSupport: false,
      contextWindow: 'Over 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Client & Server',
      configSnippet: `{
  "devin_integrations": {
    "mcp_enabled": true,
    "connectors": ["github", "slack", "jira", "datadog", "linear"]
  }
}`,
      popularServers: ['Linear', 'Jira', 'GitHub', 'AWS CLI', 'Datadog', 'Sentry']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Devin Cloud Web Studio', 'Slack Bot Interface', 'GitHub Actions / PR bot'],
      keyTools: ['Dedicated sandboxed Linux VM', 'Headless Chrome browser for debugging', 'Automatic test runner & linter', 'Self-directed web search & docs reader']
    },
    documentation: {
      websiteUrl: 'https://devin.ai',
      docsUrl: 'https://docs.devin.ai',
      communityUrl: 'https://x.com/cognition_labs'
    },
    accentColor: '#ec4899',
    gradient: 'from-pink-600/20 via-rose-600/10 to-transparent'
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    tagline: 'The agentic IDE with Cascade flow for seamless human-AI developer collaboration',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Codeium',
    license: 'Proprietary Editor (Fork of VS Code)',
    pricing: 'Free Tier / $15/mo Pro / $30/mo Team',
    badge: 'Agentic IDE & Cascade Flow',
    description: 'An AI-native editor created by Codeium featuring "Cascade" — an agentic pair-programmer that continuously tracks your edits, terminal outputs, and architectural dependencies in real time.',
    overview: 'Windsurf blends fast autocomplete with deep agentic execution. Cascade can run terminal builds, inspect compile errors, generate multi-file diffs, and collaborate with developers using a shared live contextual scratchpad.',
    installation: {
      command: 'curl -fsSL https://codeium.com/windsurf/install.sh | bash',
      method: 'Desktop Application for macOS, Windows, and Linux',
      osSupport: ['macOS', 'Windows', 'Linux'],
      prerequisites: 'Git installed. One-click migration imports your VS Code extensions, configs, and hotkeys.',
      envVars: ['CODEIUM_API_KEY (Optional)']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max)',
        'Cascade Ultra Flow Engine',
        'GPT-6 Astra (max)',
        'DeepSeek V4.1 Flash',
        'Claude 3.7 Sonnet',
        'Gemini 4 Carbon'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 / Cascade Ultra Flow',
      byoKey: true,
      localModelSupport: false,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcpServers": {
    "dev-tools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`,
      popularServers: ['PostgreSQL', 'GitHub', 'File Manager', 'REST API Client']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Windsurf Native Desktop Editor'],
      keyTools: ['Cascade agentic multi-turn assistant', 'Supercomplete generative autocomplete', 'Live terminal linting & error healing']
    },
    documentation: {
      websiteUrl: 'https://codeium.com/windsurf',
      docsUrl: 'https://docs.codeium.com/windsurf',
      communityUrl: 'https://discord.gg/codeium'
    },
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/20 via-blue-600/10 to-transparent'
  },
  {
    id: 'cline',
    name: 'Cline (Claude Dev / Roo Code)',
    tagline: 'Autonomous coding agent for VS Code with terminal execution and native MCP support',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Cline & Roo Code Community',
    license: 'Open Source (Apache 2.0)',
    pricing: '100% Free & Open Source (Bring your own API key)',
    badge: 'Open-Source VS Code Agent',
    description: 'An open-source autonomous coding agent extension for VS Code that can create and edit files, execute terminal commands, use the browser, and connect to unlimited MCP servers with human approval at every step.',
    overview: 'Cline has become one of the most popular open-source coding agents. It provides granular permission controls, diff verification before saving changes, and extensive Model Context Protocol (MCP) integrations.',
    installation: {
      command: 'code --install-extension saoudrizwan.claude-dev',
      method: 'VS Code Extension Marketplace or Open-VSX Registry',
      osSupport: ['macOS', 'Windows', 'Linux'],
      prerequisites: 'VS Code 1.84+ installed. Anthropic, OpenAI, OpenRouter, or Gemini API key.',
      envVars: ['ANTHROPIC_API_KEY', 'OPENROUTER_API_KEY', 'OPENAI_API_KEY']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max - SWE Leader)',
        'DeepSeek V4.1 Flash (MoE Flash)',
        'Claude Opus 5.5 (max)',
        'GPT-6 Astra (max)',
        'Gemini 4 Carbon (2M Context)',
        'Claude 3.7 Sonnet',
        'OpenAI o3-mini',
        'Qwen 2.5 Coder 32B',
        'Local LM Studio / Ollama'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 (max)',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcpServers": {
    "git": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "mcp/git"]
    }
  }
}`,
      popularServers: ['Git', 'Filesystem', 'Puppeteer browser', 'Memory graph', 'Brave Search', 'Fetch']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['VS Code', 'Cursor', 'Windsurf', 'VSCodium'],
      keyTools: ['Human-in-the-loop terminal tool approvals', 'Interactive file patch review', 'Custom system prompts & rules', 'Browser console capture']
    },
    documentation: {
      websiteUrl: 'https://cline.bot',
      docsUrl: 'https://github.com/cline/cline#readme',
      githubUrl: 'https://github.com/cline/cline',
      communityUrl: 'https://discord.gg/cline'
    },
    accentColor: '#f97316',
    gradient: 'from-orange-600/20 via-amber-600/10 to-transparent'
  },
  {
    id: 'amazon-q-developer',
    name: 'Amazon Q Developer',
    tagline: 'Generative AI assistant for software development with enterprise code transformation',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Amazon Web Services (AWS)',
    license: 'Proprietary Cloud Service',
    pricing: 'Free Tier / $19/user/month Pro Tier',
    badge: 'Enterprise Code Transformer',
    description: 'AWS’s generative AI developer agent designed to accelerate coding, testing, debugging, legacy Java/SQL transformations, and cloud architecture deployments.',
    overview: 'Amazon Q Developer excels at large-scale automated code transformations (such as upgrading legacy Java 8/11 codebases to Java 17/21) and cloud infrastructure security analysis.',
    installation: {
      command: 'code --install-extension AmazonWebServices.amazon-q-vscode',
      method: 'VS Code Extension Marketplace, JetBrains Marketplace, Visual Studio, AWS Management Console',
      osSupport: ['macOS', 'Windows', 'Linux', 'AWS Cloud9'],
      prerequisites: 'AWS Builder ID (Free) or AWS IAM Identity Center account.',
      envVars: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 on Bedrock',
        'Claude Opus 5.5 on Bedrock',
        'Amazon Nova Pro',
        'Amazon Nova Premier',
        'Claude 3.7 Sonnet on Bedrock'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 on Amazon Bedrock',
      byoKey: false,
      localModelSupport: false,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: false,
      type: 'Planned / Third-Party',
      popularServers: ['AWS CloudFormation', 'Amazon DynamoDB', 'AWS Lambda', 'Amazon Bedrock']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['VS Code', 'IntelliJ IDEA', 'PyCharm', 'AWS Cloud9', 'macOS Terminal'],
      keyTools: ['Automated Java version transformation', 'AWS IAM vulnerability security scanner', 'SQL query generator', 'CLI command auto-completion']
    },
    documentation: {
      websiteUrl: 'https://aws.amazon.com/q/developer/',
      docsUrl: 'https://docs.aws.amazon.com/amazonq/latest/aws-builder-use-ug/what-is.html',
      communityUrl: 'https://repost.aws/tags/TAwY6G7W7wT7y5gq'
    },
    accentColor: '#f59e0b',
    gradient: 'from-amber-600/20 via-yellow-600/10 to-transparent'
  },
  {
    id: 'amazon-kiro',
    name: 'Amazon Kero (AWS Kiro)',
    tagline: 'Amazon’s spec-driven agentic AI IDE and autonomous software development environment',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Amazon Web Services (AWS)',
    license: 'Proprietary Agentic IDE (Code OSS foundation)',
    pricing: 'AWS Developer Tier / Pay-as-you-go via Amazon Bedrock',
    badge: 'Spec-Driven Autonomous IDE',
    description: 'Amazon’s agentic AI-powered coding assistant and IDE that introduces Spec-Driven Development — converting natural-language prompts into formal requirements, architecture designs, and task lists before generating code.',
    overview: 'Unlike traditional "vibe coding" tools, Amazon Kero (Kiro) enforces architectural rigor. It uses agent hooks for event-driven automation (like automated tests or docs updates on save), persistent steering rules, and sandboxed cloud environments connected to Amazon Bedrock.',
    installation: {
      command: 'curl -fsSL https://kiro.dev/install.sh | bash # Or download desktop IDE at kiro.dev',
      method: 'Desktop Application (macOS .dmg, Windows .exe, Linux) built on Code OSS',
      osSupport: ['macOS (Apple Silicon & Intel)', 'Windows 11', 'Linux (Ubuntu, Debian)'],
      prerequisites: 'AWS Account with Amazon Bedrock model access or AWS Builder ID.',
      envVars: ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'BEDROCK_MODEL_ID']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 on Bedrock',
        'Claude Opus 5.5 on Bedrock',
        'Amazon Nova Pro',
        'Amazon Nova Premier',
        'Claude 3.7 Sonnet (Thinking)'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 on Amazon Bedrock / Nova Pro',
      byoKey: true,
      localModelSupport: false,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcpServers": {
    "aws-resources": {
      "command": "uvx",
      "args": ["mcp-server-aws", "--region", "us-east-1"]
    },
    "bedrock-kb": {
      "command": "npx",
      "args": ["-y", "@aws/mcp-bedrock-knowledge-base"]
    }
  }
}`,
      popularServers: ['AWS CloudFormation', 'Amazon Bedrock Knowledge Bases', 'PostgreSQL', 'GitHub', 'Docker']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Kiro Native IDE (VS Code / Code OSS extension compatible)', 'AWS Cloud9'],
      keyTools: ['Spec-Driven Development task breakdown', 'Agent Hooks on file save', 'Persistent project steering files', 'Multi-repository autonomous pull request synthesis']
    },
    documentation: {
      websiteUrl: 'https://kiro.dev',
      docsUrl: 'https://kiro.dev/docs',
      communityUrl: 'https://community.aws'
    },
    accentColor: '#ff9900',
    gradient: 'from-amber-500/20 via-orange-600/10 to-transparent'
  },
  {
    id: 'replit-agent',
    name: 'Replit Agent',
    tagline: 'Autonomous cloud environment that turns natural language prompts into live apps',
    category: 'first-party',
    categoryLabel: 'First-Party Coding Agent',
    developer: 'Replit',
    license: 'Proprietary Cloud Platform',
    pricing: 'Included with Replit Core ($25/mo)',
    badge: 'Instant Full-Stack Deployer',
    description: 'An autonomous coding agent living inside Replit’s cloud container infrastructure that creates databases, installs packages, sets up API routes, and deploys production applications from prompt to URL in minutes.',
    overview: 'Replit Agent manages the entire development lifecycle: provisioning Postgres databases, configuring Node.js/Python backends, styling React frontends, diagnosing browser console errors, and publishing live web applications with custom domains.',
    installation: {
      command: 'Open browser at https://replit.com and click "Create with Agent"',
      method: 'Managed Cloud IDE via Web Browser, iOS app, Android app',
      osSupport: ['Cloud Linux container accessible on any browser, iPad, or mobile phone'],
      prerequisites: 'Replit account with Core subscription.',
      envVars: ['Managed automatically via Replit Secrets vault']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max)',
        'GPT-6 Astra (max)',
        'GPT-6.1 Sol (max)',
        'Claude 3.7 Sonnet'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 / GPT-6 Astra',
      byoKey: false,
      localModelSupport: false,
      contextWindow: 'Up to 500,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Plugin Extension',
      popularServers: ['Replit Database', 'PostgreSQL', 'Stripe Payments', 'Authentication']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Replit Cloud Studio Web/Mobile'],
      keyTools: ['Instant cloud database provisioning', 'Hot-reloading live iframe preview', 'Automatic npm/pip dependency resolution', '1-click serverless deployment']
    },
    documentation: {
      websiteUrl: 'https://replit.com/ai',
      docsUrl: 'https://docs.replit.com/replit-ai/agent',
      communityUrl: 'https://ask.replit.com'
    },
    accentColor: '#ef4444',
    gradient: 'from-red-600/20 via-orange-600/10 to-transparent'
  },

  // ==========================================
  // INDEPENDENT AI CODING PLATFORMS & CLI AGENTS
  // ==========================================
  {
    id: 'google-antigravity',
    name: 'Google Antigravity',
    tagline: 'DeepMind’s autonomous development platform with multi-agent swarms, sandboxes & MCP',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Google DeepMind',
    license: 'Google Platform Framework',
    pricing: 'Developer Platform Access / Google Cloud Tier',
    badge: 'Multi-Agent Swarms & MCP Native',
    description: 'Google DeepMind’s next-generation autonomous AI development platform engineered with isolated OS sandboxes, native Model Context Protocol (MCP) servers, background cron automations, and parallel multi-agent swarms.',
    overview: 'Antigravity enables advanced agentic engineering: coordinating specialized subagents (researchers, coders, testers), executing sandboxed bash tools safely, rendering dynamic generative UI artifacts, and managing whole project architectures across Google Cloud and hybrid environments.',
    installation: {
      command: 'agy init # or npm install -g @google/antigravity-cli',
      method: 'Antigravity CLI (agy), Desktop IDE plugin, and Google Cloud SDK',
      osSupport: ['macOS', 'Linux', 'Windows (PowerShell & WSL)'],
      prerequisites: 'Google Cloud SDK / Gemini API Key / gcloud CLI credentials.',
      envVars: ['GEMINI_API_KEY', 'GOOGLE_GENAI_USE_VERTEXAI', 'CLOUDSDK_CORE_PROJECT']
    },
    foundationModels: {
      supported: [
        'Gemini 4 Carbon (high - 2M Context)',
        'Gemini 2.5 Pro (Frontier Reasoning)',
        'Gemini 2.5 Flash',
        'Gemini 2.0 Flash Thinking',
        'Claude Sonnet 5.5',
        'GPT-6 Astra'
      ],
      defaultRecommendation: 'Gemini 4 Carbon (high) / Gemini 2.5 Pro',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 2,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Client & Server',
      configSnippet: `{
  "mcpServers": {
    "cloudrun": {
      "command": "gcloud",
      "args": ["mcp", "cloudrun"]
    },
    "gemini-docs": {
      "command": "gemini-mcp-docs"
    }
  }
}`,
      popularServers: ['Google CloudRun', 'Gemini API Docs', 'GitHub MCP', 'Google Developer Knowledge', 'Filesystem']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Antigravity IDE', 'AGY CLI Shell', 'VS Code extension'],
      keyTools: ['Native Swarm multi-agent collaboration', 'Isolated terminal sandbox', 'Interactive Generative UI artifacts', 'MCP ecosystem integration']
    },
    documentation: {
      websiteUrl: 'https://deepmind.google/technologies/gemini/',
      docsUrl: 'https://ai.google.dev/docs',
      githubUrl: 'https://github.com/google-gemini'
    },
    accentColor: '#4285f4',
    gradient: 'from-blue-500/20 via-sky-500/10 to-transparent'
  },
  {
    id: 'codex',
    name: 'OpenAI Codex & Canvas',
    tagline: 'OpenAI’s code intelligence engine and interactive visual collaboration workspace',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'OpenAI',
    license: 'Proprietary Cloud Platform',
    pricing: 'ChatGPT Plus ($20/mo), Pro ($200/mo), or API Pay-as-you-go',
    badge: 'Frontier Reasoning Engine',
    description: 'The coding architecture developed by OpenAI that powers interactive Canvas code manipulation, autonomous ChatGPT code execution in sandboxed Python environments, and advanced reasoning benchmarks.',
    overview: 'OpenAI Codex and its Canvas interface allow side-by-side editing, syntax reviewing, automated docstring addition, targeted refactoring, and multi-language translation between Python, TypeScript, Rust, and Go.',
    installation: {
      command: 'pip install openai # or access directly in ChatGPT Canvas at chatgpt.com',
      method: 'ChatGPT Web Canvas, OpenAI Python/Node SDK, and OpenAI CLI',
      osSupport: ['Web Browser (Canvas)', 'macOS', 'Windows', 'Linux via API / CLI'],
      prerequisites: 'OpenAI API Key or ChatGPT Plus/Pro subscription.',
      envVars: ['OPENAI_API_KEY', 'OPENAI_ORG_ID']
    },
    foundationModels: {
      supported: [
        'GPT-6 Astra (max - Autonomous Agent)',
        'GPT-6.1 Sol (max - Sol Efficiency)',
        'OpenAI o3-mini (High Compute)',
        'OpenAI o1 (Deep Thought)',
        'GPT-4.5 Preview'
      ],
      defaultRecommendation: 'GPT-6 Astra (max) / GPT-6.1 Sol',
      byoKey: true,
      localModelSupport: false,
      contextWindow: 'Up to 500,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Client & Server',
      configSnippet: `{
  "tools": [
    { "type": "code_interpreter" },
    { "type": "file_search" },
    { "type": "function", "function": { "name": "execute_code" } }
  ]
}`,
      popularServers: ['OpenAI Code Interpreter', 'Browsing Sandbox', 'Custom Actions REST']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['ChatGPT Canvas Web', 'VS Code extension', 'Cursor API', 'Jupyter Lab'],
      keyTools: ['Canvas visual inline editor', 'Sandboxed Python Code Interpreter', 'Automated code review & bug detection', 'Docstring and unit-test generator']
    },
    documentation: {
      websiteUrl: 'https://openai.com/index/canvas/',
      docsUrl: 'https://platform.openai.com/docs/guides/code-execution',
      communityUrl: 'https://community.openai.com'
    },
    accentColor: '#10a37f',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent'
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    tagline: 'Anthropic’s agentic CLI tool that lives in your terminal and understands your codebase',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Anthropic',
    license: 'Proprietary Research Preview CLI',
    pricing: 'Pay-as-you-go via Anthropic API (Claude 3.7 / 3.5 Sonnet token pricing)',
    badge: 'Terminal Agentic Powerhouse',
    description: 'An agentic command-line tool from Anthropic that lives inside your terminal, understands your entire codebase, edits files, executes bash commands, handles git workflows, and answers architecture questions.',
    overview: 'Claude Code operates natively inside any git repository directory. It reads code directly from your disk, generates unified diffs, runs test suites, fixes failing tests, and commits clean git commits without ever requiring a separate IDE plugin.',
    installation: {
      command: 'npm install -g @anthropic-ai/claude-code # Run in any repo directory:\nclaude',
      method: 'NPM Global Package installed via Node.js 18+',
      osSupport: ['macOS', 'Linux', 'Windows (WSL2 recommended)'],
      prerequisites: 'Node.js 18+, Git, and an Anthropic API Key or Claude Pro login.',
      envVars: ['ANTHROPIC_API_KEY']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max - SWE Leader)',
        'Claude Fable 5.2 (max - Deep Deliberation)',
        'Claude Opus 5.5 (max Reasoning)',
        'Claude 3.7 Sonnet (Extended Thinking)'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 (max) / Claude Fable 5.2',
      byoKey: true,
      localModelSupport: false,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcpServers": {
    "git-tools": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"]
    }
  }
}`,
      popularServers: ['GitHub', 'Filesystem', 'PostgreSQL', 'Puppeteer', 'Bash']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['Terminal TUI (macOS Terminal, iTerm2, WezTerm, Alacritty, VS Code integrated terminal)'],
      keyTools: ['Direct bash tool invocation with safety flags', 'Unified diff patch applicator', 'Repo symbol grep & file outline', 'Git commit & PR authoring']
    },
    documentation: {
      websiteUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      docsUrl: 'https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview',
      communityUrl: 'https://x.com/AnthropicAI'
    },
    accentColor: '#d97706',
    gradient: 'from-amber-600/20 via-orange-600/10 to-transparent'
  },
  {
    id: 'grok-build',
    name: 'Grok Build',
    tagline: 'xAI’s high-throughput autonomous software creation and engineering environment',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'xAI',
    license: 'Proprietary Cloud Platform',
    pricing: 'SuperGrok / X Premium+ / xAI API Pay-per-token',
    badge: 'Grok 3 Reasoning Engine',
    description: 'xAI’s developer ecosystem built around Grok 3 and Grok Code, featuring massive compute infrastructure, real-time code synthesis, and deep mathematical reasoning.',
    overview: 'Grok Build delivers raw reasoning performance for complex algorithms, low-level systems programming, smart contracts, and real-time data pipelines with direct access to live technical telemetry.',
    installation: {
      command: 'pip install xai-sdk # or use console at x.ai/api',
      method: 'xAI Python/TypeScript SDK, Grok Studio Web Interface',
      osSupport: ['Web Browser', 'Linux', 'macOS', 'Windows via API / CLI'],
      prerequisites: 'xAI API Key or X Premium+ account.',
      envVars: ['XAI_API_KEY']
    },
    foundationModels: {
      supported: [
        'Grok 4.7 (xhigh - Realtime Telemetry)',
        'Grok 3 (Deep Thinking SWE)',
        'Grok 3 Mini'
      ],
      defaultRecommendation: 'Grok 4.7 (xhigh) / Grok 3',
      byoKey: true,
      localModelSupport: false,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Client & Server',
      popularServers: ['Real-time Web Search', 'X Data Feed', 'PostgreSQL', 'Python Execution']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: true,
      ideSupport: ['Grok Studio Web', 'VS Code extension', 'Cursor / Aider via xAI API'],
      keyTools: ['Real-time technical knowledge search', 'Python math/compiler verification', 'High-throughput code synthesis']
    },
    documentation: {
      websiteUrl: 'https://x.ai',
      docsUrl: 'https://docs.x.ai',
      communityUrl: 'https://x.com/xai'
    },
    accentColor: '#e2e8f0',
    gradient: 'from-zinc-500/20 via-slate-500/10 to-transparent'
  },
  {
    id: 'muse-code',
    name: 'Muse Code',
    tagline: 'Meta’s open-weights engineering intelligence and multi-agent development suite',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Meta AI',
    license: 'Llama Community License (Permissive Open Weights)',
    pricing: 'Free & Open Weights (Host on your own GPU or run via cloud providers)',
    badge: 'Llama 3.3 Code Architecture',
    description: 'Meta AI’s coding intelligence ecosystem based on Code Llama and Llama 3.3 70B, designed for local enterprise privacy, code generation, and multi-agent code orchestration.',
    overview: 'Muse Code enables private, air-gapped enterprise software development. It supports fine-tuning on proprietary internal frameworks, infinite local inference with zero data leakage, and high-speed autocomplete.',
    installation: {
      command: 'ollama run codellama # or ollama run llama3.3:70b-instruct',
      method: 'Ollama local runner, vLLM server, Hugging Face Transformers, or AWS/Azure Bedrock',
      osSupport: ['macOS (Metal/M1-M4)', 'Linux (CUDA/ROCm)', 'Windows (WSL2/DirectML)'],
      prerequisites: '16GB+ RAM (or modern NVIDIA GPU with 12GB+ VRAM) for local inference.',
      envVars: ['OLLAMA_HOST', 'HUGGINGFACE_TOKEN']
    },
    foundationModels: {
      supported: [
        'Muse Wonder Full (max - Ultra Low Latency)',
        'Muse Wonder (max)',
        'Llama 3.3 70B Instruct',
        'Llama 3.1 405B'
      ],
      defaultRecommendation: 'Muse Wonder Full (max) / Llama 3.3 70B',
      byoKey: true,
      localModelSupport: true,
      contextWindow: '256,000 to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Plugin Extension',
      popularServers: ['Local Filesystem', 'Git', 'Ollama Bridge', 'Local SQLite']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['Continue.dev in VS Code / JetBrains', 'Ollama CLI', 'Aider CLI', 'LM Studio'],
      keyTools: ['100% private offline execution', 'Fine-tuning weights on private repos', 'Infini-context rotary embeddings']
    },
    documentation: {
      websiteUrl: 'https://ai.meta.com/llama/',
      docsUrl: 'https://llama.meta.com/docs/model-cards-and-prompt-formats/meta-llama-3/',
      githubUrl: 'https://github.com/meta-llama/llama'
    },
    accentColor: '#0081fb',
    gradient: 'from-blue-600/20 via-indigo-600/10 to-transparent'
  },
  {
    id: 'qwen-code',
    name: 'Qwen Code',
    tagline: 'Alibaba’s state-of-the-art open-weights coding model competing at frontier levels',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Alibaba Cloud (Qwen Team)',
    license: 'Apache 2.0 (Permissive Open Source)',
    pricing: 'Free Open Source (Local or pay pennies per million tokens on DashScope / OpenRouter)',
    badge: 'Top Open-Weights Coder',
    description: 'The premier open-weights coding intelligence engineered by Alibaba Cloud, leading open-source code evaluation benchmarks (HumanEval, MBPP, MultiPL-E) across 92 programming languages.',
    overview: 'Qwen 2.5 Coder matches and exceeds commercial models across real-world tasks like bug fixing, unit-test authoring, repository refactoring, and code explanation. Available in sizes from lightweight 0.5B to ultra-capable 32B.',
    installation: {
      command: 'ollama run qwen2.5-coder:32b # Or lightweight: ollama run qwen2.5-coder:7b',
      method: 'Ollama, vLLM, LM Studio, Hugging Face Transformers, or Alibaba DashScope API',
      osSupport: ['macOS', 'Linux', 'Windows'],
      prerequisites: 'For 32B model: 24GB VRAM or Apple Silicon 32GB. For 7B model: 8GB RAM.',
      envVars: ['DASHSCOPE_API_KEY (For cloud API)', 'OPENROUTER_API_KEY']
    },
    foundationModels: {
      supported: [
        'Qwen 2.5 Coder 32B Instruct',
        'DeepSeek V4.1 Flash (MoE)',
        'Qwen 2.5 Max (Cloud)',
        'Qwen 2.5 Coder 14B'
      ],
      defaultRecommendation: 'Qwen 2.5 Coder 32B Instruct / DeepSeek V4.1 Flash',
      byoKey: true,
      localModelSupport: true,
      contextWindow: '128,000 to 256,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Plugin Extension',
      popularServers: ['Ollama MCP Server', 'Git Inspector', 'Filesystem', 'Docker']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['Cursor (via custom API)', 'Continue.dev', 'Aider CLI', 'Cline in VS Code'],
      keyTools: ['State-of-the-art open-source code benchmark leader', 'Supports 92 programming languages', 'Zero proprietary license restrictions (Apache 2.0)']
    },
    documentation: {
      websiteUrl: 'https://qwenlm.github.io/',
      docsUrl: 'https://github.com/QwenLM/Qwen2.5-Coder',
      githubUrl: 'https://github.com/QwenLM/Qwen2.5-Coder',
      communityUrl: 'https://discord.gg/qwen'
    },
    accentColor: '#6366f1',
    gradient: 'from-indigo-600/20 via-purple-600/10 to-transparent'
  },
  {
    id: 'aider',
    name: 'Aider',
    tagline: 'The gold-standard AI pair programmer in your terminal with automated git commit workflow',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Paul Gauthier',
    license: 'Open Source (Apache 2.0)',
    pricing: '100% Free & Open Source (Bring your own API key)',
    badge: 'Terminal Git Automator',
    description: 'A command line pair programming tool that lets you edit code in your local git repository. Aider edits files, explains code, adds tests, and automatically creates git commits with sensible messages.',
    overview: 'Aider is famous for topping the SWE-Bench Lite and edit-format benchmarks. It maintains a concise map of your whole git repository using ctags, letting it navigate large multi-thousand file repositories accurately without wasting context tokens.',
    installation: {
      command: 'pip install aider-chat # or via pipx:\npipx install aider-chat',
      method: 'Python pip / pipx package manager or Homebrew on macOS',
      osSupport: ['macOS', 'Linux', 'Windows (PowerShell & WSL)'],
      prerequisites: 'Python 3.10+, Git. Any major model API key (Anthropic, OpenAI, DeepSeek, Google, or local Ollama).',
      envVars: ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'GEMINI_API_KEY', 'DEEPSEEK_API_KEY']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (Architect mode)',
        'Claude Fable 5.2 (Deep Reasoning)',
        'GPT-6 Astra (max)',
        'Gemini 4 Carbon',
        'DeepSeek V4.1 Flash',
        'Claude 3.7 Sonnet',
        'OpenAI o3-mini',
        'Local Ollama / Qwen 2.5 Coder'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 in --architect mode',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Plugin Extension',
      popularServers: ['Git CLI', 'Playwright web scraper', 'Linting tools']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['Terminal CLI', 'VS Code terminal', 'Neovim tmux sessions'],
      keyTools: ['Repo-map AST symbol indexer', 'Automatic sensible git commits', 'Architect / Editor dual-model pairing mode', 'Voice coding mode (--voice)']
    },
    documentation: {
      websiteUrl: 'https://aider.chat',
      docsUrl: 'https://aider.chat/docs/',
      githubUrl: 'https://github.com/paul-gauthier/aider',
      communityUrl: 'https://discord.gg/TvNVTbtF7k'
    },
    accentColor: '#14b8a6',
    gradient: 'from-teal-600/20 via-cyan-600/10 to-transparent'
  },
  {
    id: 'continue-dev',
    name: 'Continue.dev',
    tagline: 'The leading open-source AI code assistant for VS Code and JetBrains with full MCP support',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Continue Dev, Inc.',
    license: 'Open Source (Apache 2.0)',
    pricing: '100% Free & Open Source / Continue Hub Enterprise',
    badge: 'Open-Source IDE Extension',
    description: 'An open-source autopilot extension for VS Code and JetBrains IDEs that connects any LLM (cloud or local) to your editor with complete MCP server integrations.',
    overview: 'Continue enables teams to build custom coding assistants without proprietary lock-in. Define custom @-mentions (@codebase, @docs, @git, @diff), enforce company style guides, and route autocomplete to ultra-fast local models while routing complex refactoring to frontier reasoning engines.',
    installation: {
      command: 'code --install-extension Continue.continue',
      method: 'VS Code Marketplace, JetBrains Plugins Repository, Open-VSX Registry',
      osSupport: ['macOS', 'Windows', 'Linux'],
      prerequisites: 'VS Code or JetBrains IDE (IntelliJ, PyCharm, WebStorm).',
      envVars: ['CONTINUE_GLOBAL_DIR']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max)',
        'DeepSeek V4.1 Flash (max)',
        'GPT-6.1 Sol (max)',
        'Gemini 4 Carbon',
        'Claude 3.7 Sonnet',
        'Qwen 2.5 Coder 32B',
        'Local Ollama / LM Studio'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 / DeepSeek V4.1 Flash',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "mcpServers": [
    {
      "name": "sqlite",
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "./test.db"]
    }
  ]
}`,
      popularServers: ['PostgreSQL', 'SQLite', 'GitHub', 'Puppeteer', 'Brave Search', 'Fetch']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['VS Code', 'IntelliJ IDEA', 'PyCharm', 'WebStorm', 'CLion', 'GoLand'],
      keyTools: ['Custom @-mention context providers', 'Tab-autocomplete with local models (StarCoder/Qwen)', 'Slash commands (/edit, /test, /cmd)', 'Team governance config sharing']
    },
    documentation: {
      websiteUrl: 'https://continue.dev',
      docsUrl: 'https://docs.continue.dev',
      githubUrl: 'https://github.com/continuedev/continue',
      communityUrl: 'https://discord.gg/vapEsyrFmJ'
    },
    accentColor: '#8b5cf6',
    gradient: 'from-violet-600/20 via-purple-600/10 to-transparent'
  },
  {
    id: 'zed-ai',
    name: 'Zed AI',
    tagline: 'High-performance multiplayer code editor engineered in Rust with integrated LLM panel',
    category: 'independent',
    categoryLabel: 'Independent AI Coding Platform',
    developer: 'Zed Industries',
    license: 'Open Source (GPL / AGPL / Apache 2.0)',
    pricing: 'Free & Open Source / Zed Pro for cloud models',
    badge: 'Lightning-Fast Rust Native',
    description: 'A blazingly fast GPU-accelerated code editor written in Rust with built-in real-time collaboration and an AI Assistant panel designed for maximum responsiveness.',
    overview: 'Zed renders at a buttery smooth 120 FPS by compiling directly to GPU shaders via Metal and Vulkan. Its Assistant panel supports flexible model switching, slash commands (/file, /tab, /symbols), and inline prompt transforms directly in the buffer without lag.',
    installation: {
      command: 'curl -f https://zed.dev/install.sh | sh # Or on macOS: brew install --cask zed',
      method: 'macOS DMG, Linux install script, Windows Preview build',
      osSupport: ['macOS', 'Linux', 'Windows (Preview)'],
      prerequisites: 'GPU with Metal or Vulkan support for high-speed hardware rendering.',
      envVars: ['ANTHROPIC_API_KEY', 'OPENAI_API_KEY', 'GOOGLE_AI_API_KEY']
    },
    foundationModels: {
      supported: [
        'Claude Sonnet 5.5 (max)',
        'GPT-6.1 Sol (Fast Reasoning)',
        'Claude Opus 5.5 (max)',
        'Gemini 4 Carbon',
        'Claude 3.7 Sonnet',
        'OpenAI o3-mini',
        'Local Ollama'
      ],
      defaultRecommendation: 'Claude Sonnet 5.5 / GPT-6.1 Sol',
      byoKey: true,
      localModelSupport: true,
      contextWindow: 'Up to 1,000,000 tokens'
    },
    mcps: {
      supported: true,
      type: 'Native Client',
      configSnippet: `{
  "assistant": {
    "version": "2",
    "provider": {
      "default_model": "claude-3-7-sonnet-latest"
    }
  }
}`,
      popularServers: ['Git', 'Filesystem', 'Context Search', 'Language Server Protocol (LSP)']
    },
    toolsAndPlugins: {
      terminalExecution: true,
      multiFileDiff: true,
      browserPreview: false,
      ideSupport: ['Zed Native Rust Editor'],
      keyTools: ['120 FPS GPU-accelerated rendering', 'Multiplayer real-time CRDT pairing', 'Inline buffer AI transformations', 'Native Language Server Protocol (LSP) integration']
    },
    documentation: {
      websiteUrl: 'https://zed.dev',
      docsUrl: 'https://zed.dev/docs/assistant',
      githubUrl: 'https://github.com/zed-industries/zed',
      communityUrl: 'https://discord.gg/zed'
    },
    accentColor: '#06b6d4',
    gradient: 'from-cyan-600/20 via-emerald-600/10 to-transparent'
  }
];
