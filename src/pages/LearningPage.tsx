import React, { useState, useMemo } from 'react';
import { BookOpen, ArrowUpRight, Search, Award, Sparkles, Star, Play, CheckCircle2 } from 'lucide-react';

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .503 6.163C0 8.037 0 12 0 12s0 3.963.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.963 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface CompanyPortal {
  name: string;
  url: string;
  description: string;
  badge: string;
}

interface YouTubeChannel {
  name: string;
  url: string;
  description: string;
  category: 'Math & Theory' | 'Code & Hands-on' | 'Research & News' | 'General AI';
  rank: number;
}

export const LearningPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const companyPortals: CompanyPortal[] = [
    {
      name: "Anthropic Skilljar",
      url: "https://anthropic.skilljar.com",
      description: "Official developer enablement courses covering prompt caching, Model Context Protocol (MCP), and safety tuning.",
      badge: "Claude Specs"
    },
    {
      name: "Google Grow with AI",
      url: "https://grow.google/ai",
      description: "Structured learning pathways for beginner to advanced machine learning engineering, including free GenAI certificates.",
      badge: "Google Cloud"
    },
    {
      name: "Meta AI Resources",
      url: "https://ai.meta.com/resources",
      description: "Meta's resource repository hosting research materials, Llama model guides, and PyTorch frameworks.",
      badge: "Open weights"
    },
    {
      name: "NVIDIA Deep Learning Institute",
      url: "https://www.nvidia.com/en-us/training/",
      description: "Hands-on training in AI, accelerated computing, and deep learning with cloud-based GPU development workspaces.",
      badge: "Hardware & CUDA"
    },
    {
      name: "Microsoft Learn / AI",
      url: "https://learn.microsoft.com/training/paths/get-started-with-generative-ai/",
      description: "Comprehensive pathways to master Azure AI services, Semantic Kernel orchestration, and Copilot studios.",
      badge: "Azure Cloud"
    },
    {
      name: "OpenAI Academy",
      url: "https://academy.openai.com",
      description: "Official guides and courses to master GPT API integrations, prompt engineering, and o-series reasoning models.",
      badge: "Proprietary APIs"
    },
    {
      name: "IBM SkillsBuild",
      url: "https://skillsbuild.org",
      description: "Free, credentialed courses covering data science, machine learning foundations, and AI governance schemas.",
      badge: "Enterprise AI"
    },
    {
      name: "AWS Skill Builder",
      url: "https://skillbuilder.aws",
      description: "Official Amazon web services training repository covering SageMaker systems and Bedrock application layers.",
      badge: "AWS Cloud"
    },
    {
      name: "DeepLearning.AI",
      url: "https://deeplearning.ai",
      description: "Andrew Ng's flagship education platform offering structured specializations from neural networks to agentic engineering.",
      badge: "Specialized Paths"
    },
    {
      name: "Hugging Face Learn",
      url: "https://huggingface.co/learn",
      description: "Official tutorials covering Transformers NLP pipelines, PEFT adapter tuning, and Gradio/Spaces container hosting.",
      badge: "Open Source"
    }
  ];

  const youtubeChannels: YouTubeChannel[] = [
    {
      name: "3Blue1Brown",
      url: "https://www.youtube.com/@3blue1brown",
      description: "World-class visual animations breaking down complex neural networks, linear algebra, and calculus foundations.",
      category: "Math & Theory",
      rank: 1
    },
    {
      name: "Andrej Karpathy",
      url: "https://www.youtube.com/@AndrejKarpathy",
      description: "Deep, complete walk-throughs on building GPTs and micrograd from scratch, taught by OpenAI's co-founder.",
      category: "Code & Hands-on",
      rank: 2
    },
    {
      name: "Lex Fridman",
      url: "https://www.youtube.com/@lexfridman",
      description: "Long-form interviews with AI pioneers, researchers, and tech founders covering the philosophy and tech of AI.",
      category: "General AI",
      rank: 3
    },
    {
      name: "StatQuest with Josh Starmer",
      url: "https://www.youtube.com/@statquest",
      description: "Delightfully simple, visual explanations of machine learning algorithms, statistics, and data science concepts.",
      category: "Math & Theory",
      rank: 4
    },
    {
      name: "Jeremy Howard (fast.ai)",
      url: "https://www.youtube.com/@howardjeremy",
      description: "Flagship practical deep learning courses taking developers from basic coding to building state-of-the-art models.",
      category: "Code & Hands-on",
      rank: 5
    },
    {
      name: "Two Minute Papers",
      url: "https://www.youtube.com/@TwoMinutePapers",
      description: "Bite-sized summaries of cutting-edge research papers in computer graphics, AI generation, and robotics.",
      category: "Research & News",
      rank: 6
    },
    {
      name: "DeepLearning.AI",
      url: "https://www.youtube.com/@DeeplearningAI",
      description: "Host of Andrew Ng's webinars, short courses, and industry talks covering modern generative AI frameworks.",
      category: "General AI",
      rank: 7
    },
    {
      name: "Machine Learning Street Talk (MLST)",
      url: "https://www.youtube.com/@MachineLearningStreetTalk",
      description: "Intellectual debates and interviews exploring deep theory, cognitive architectures, and safety alignment.",
      category: "Research & News",
      rank: 8
    },
    {
      name: "freeCodeCamp.org",
      url: "https://www.youtube.com/@freecodecamp",
      description: "Hundreds of hours of full-length, ad-free video courses covering Python, PyTorch, LLMs, and neural networks.",
      category: "Code & Hands-on",
      rank: 9
    },
    {
      name: "Sentdex",
      url: "https://www.youtube.com/@sentdex",
      description: "Hands-on programming tutorials for Python-based neural networks, data analysis, and reinforcement learning.",
      category: "Code & Hands-on",
      rank: 10
    },
    {
      name: "Data School",
      url: "https://www.youtube.com/@dataschool",
      description: "In-depth tutorials covering pandas data manipulation, scikit-learn setups, and machine learning workflows.",
      category: "Code & Hands-on",
      rank: 11
    },
    {
      name: "Codebasics",
      url: "https://www.youtube.com/@codebasics",
      description: "Hands-on projects, data analyst roadmaps, and practical tutorials for machine learning and business BI.",
      category: "Code & Hands-on",
      rank: 12
    },
    {
      name: "Siraj Raval",
      url: "https://www.youtube.com/@sirajraval",
      description: "High-energy tutorials and build videos demonstrating decentralized AI, automated startups, and LLM apps.",
      category: "General AI",
      rank: 13
    },
    {
      name: "Google Cloud Tech",
      url: "https://www.youtube.com/@googlecloudtech",
      description: "Official channel covering Vertex AI development, container architecture, and enterprise cloud solutions.",
      category: "General AI",
      rank: 14
    },
    {
      name: "Serrano Academy",
      url: "https://www.youtube.com/@SerranoAcademy",
      description: "Intuitive mathematical breakdowns of generative models, backpropagation, and machine learning mechanics.",
      category: "Math & Theory",
      rank: 15
    },
    {
      name: "Tina Huang",
      url: "https://www.youtube.com/@TinaHuang",
      description: "Career advice, study guides, and daily productivity routines for data scientists and AI builders.",
      category: "General AI",
      rank: 16
    },
    {
      name: "Matt Wolfe",
      url: "https://www.youtube.com/@mwwolfe",
      description: "Daily summaries and video guides of new AI tools, software agents, image generators, and automation scripts.",
      category: "Research & News",
      rank: 17
    },
    {
      "name": "AI Explained",
      "url": "https://www.youtube.com/@ai-explained-official",
      "description": "High-signal analysis and deep dives into new model releases, safety tests, and research benchmarks.",
      category: "Research & News",
      rank: 18
    },
    {
      "name": "The AI Advantage",
      "url": "https://www.youtube.com/@TheAIAdvantage",
      "description": "Practical workflows, prompt libraries, and tool tutorials for integrating ChatGPT and Claude into workflows.",
      category: "General AI",
      rank: 19
    },
    {
      "name": "Hamel Husain",
      "url": "https://www.youtube.com/@hamel-husain",
      "description": "High-level tutorials on evaluation frameworks, model fine-tuning, and production-ready agent monitoring.",
      category: "Code & Hands-on",
      rank: 20
    }
  ];

  const recommendations = [
    {
      channel: "3Blue1Brown",
      focus: "Build strong mathematical intuition",
      description: "Perfect for understanding the geometry and math behind neural weights, calculus gradients, and matrix multiplications."
    },
    {
      channel: "StatQuest",
      focus: "Understand ML and statistics in simple language",
      description: "Decouples statistics and complex ML algorithms into visual chunks with simple step-by-step logic."
    },
    {
      channel: "DeepLearning.AI",
      focus: "Structured AI learning paths",
      description: "Great for building a formal academic base in ML engineering and advanced neural networks."
    },
    {
      channel: "Andrej Karpathy",
      focus: "Learn how modern AI and LLMs actually work",
      description: "The gold standard for seeing how transformers work under the hood. You will code GPTs from the ground up."
    },
    {
      channel: "freeCodeCamp",
      focus: "Hands-on projects and full-length courses",
      description: "Excellent for multi-hour video courses that teach python coding, data analytics libraries, and model deployments."
    }
  ];

  // Filters logic
  const filteredChannels = useMemo(() => {
    return youtubeChannels.filter(ch => {
      const matchesSearch = ch.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            ch.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = activeCategory === 'All' || ch.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-brand-navy-dark pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/15 via-brand-navy-dark to-brand-navy-dark pointer-events-none" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-80 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/25 text-brand-gold-bright text-[10px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Curated Directory
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-slate-100 uppercase tracking-wide leading-tight">
            AI Learning <span className="gold-gradient-text">Center</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover official developer education portals from top AI research labs and the best free YouTube learning channels to master AI in 2026.
          </p>
        </div>

        {/* Section 1: Company Official Portals */}
        <div className="space-y-8">
          <div className="border-b border-brand-gold/10 pb-4 flex items-center gap-3">
            <Award className="w-6 h-6 text-brand-gold" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-slate-100">
              Official Company AI Portals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyPortals.map((portal) => (
              <div 
                key={portal.name}
                className="group p-6 rounded-2xl glass-panel border border-brand-gold/10 hover:border-brand-gold/30 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Official Training
                    </span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-extrabold bg-brand-gold/10 border border-brand-gold/20 text-brand-gold-bright uppercase tracking-wider">
                      {portal.badge}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-200 group-hover:text-brand-gold-bright transition-colors">
                    {portal.name}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {portal.description}
                  </p>
                </div>

                <a 
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-300 hover:text-brand-gold-bright bg-brand-navy-light/10 hover:bg-brand-navy-light/35 border border-brand-gold/10 hover:border-brand-gold/45 transition-all duration-300 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Access Course Portal
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Editor Recommendation Box */}
        <div className="p-8 rounded-3xl border border-brand-gold/15 bg-gradient-to-r from-brand-navy-deep/90 to-brand-navy-light/20 overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-gold via-indigo-500 to-emerald-500" />
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-brand-gold/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <Star className="w-5 h-5 text-brand-gold fill-brand-gold" />
              <h3 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-slate-100">
                Recommended Starting Path (Editor's Pick)
              </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {recommendations.map((rec) => (
                <div key={rec.channel} className="bg-brand-navy-dark/45 p-4 rounded-xl border border-brand-gold/5 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="font-bold text-slate-200 text-xs sm:text-sm uppercase tracking-wide">
                      {rec.channel}
                    </span>
                  </div>
                  <span className="text-[10px] font-extrabold uppercase text-brand-gold-bright block">
                    {rec.focus}
                  </span>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 3: YouTube Channels */}
        <div className="space-y-8">
          <div className="border-b border-brand-gold/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <YoutubeIcon className="w-6 h-6 text-red-500 fill-red-500" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-slate-100">
                AI & Machine Learning YouTube Channels
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-brand-navy-light/10 border border-brand-gold/10 focus:border-brand-gold/50 text-slate-200 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Categories Tab Navigation */}
          <div className="flex flex-wrap gap-1.5 bg-brand-navy-deep/20 p-2 rounded-xl border border-brand-gold/5 w-fit">
            {['All', 'Math & Theory', 'Code & Hands-on', 'Research & News', 'General AI'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-[10px] md:text-xs font-bold tracking-wider transition-all duration-200 cursor-pointer border ${
                  activeCategory === cat
                    ? 'bg-brand-gold/20 text-brand-gold-bright border-brand-gold/50 shadow-[0_0_10px_rgba(189,154,118,0.1)]'
                    : 'bg-brand-navy-light/5 hover:bg-brand-navy-light/20 text-slate-400 hover:text-slate-200 border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid of channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredChannels.map((ch) => (
              <div 
                key={ch.name}
                className="group bg-brand-navy-deep/30 p-5 rounded-2xl border border-brand-gold/5 hover:border-brand-gold/25 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">
                      #{ch.rank} Creator
                    </span>
                    <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-brand-navy-light border border-slate-700 text-slate-400">
                      {ch.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-slate-200 group-hover:text-brand-gold-bright transition-colors">
                    {ch.name}
                  </h3>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    {ch.description}
                  </p>
                </div>

                <a 
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-[10px] font-bold text-red-500 hover:text-red-400 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/25 transition-all duration-200 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  Visit YouTube Channel
                </a>
              </div>
            ))}
          </div>

          {filteredChannels.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 font-serif text-lg">No YouTube channels found matching your filters.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
