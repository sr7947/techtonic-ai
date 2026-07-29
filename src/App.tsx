import React, { useState, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
const AICityView = React.lazy(() => import('./components/AICityView'));
import { UpdatesSection } from './components/UpdatesSection';
import { LeadersSection } from './components/LeadersSection';
import { LearningHub } from './components/LearningHub';
import { YouTubeSection } from './components/YouTubeSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { LATEST_UPDATES, LEARNING_RESOURCES, YOUTUBE_VIDEOS } from './data/content';
import { supabase } from './lib/supabase';

// Page Imports
import { ModelsHubPage } from './pages/ModelsHubPage';
import { TrendingPage } from './pages/TrendingPage';
import { DeveloperStudioPage } from './pages/DeveloperStudioPage';
import { McpPage } from './pages/McpPage';
import { SkillsPage } from './pages/SkillsPage';
import { FrameworksPage } from './pages/FrameworksPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { CompanyHubPage } from './pages/CompanyHubPage';
import { LearningPage } from './pages/LearningPage';
import { TechStackPage } from './pages/TechStackPage';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

function App() {
  // Authentication State loaded from LocalStorage
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('techtonic_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Stateful content arrays to support real-time Admin updates
  const [updates, setUpdates] = useState(LATEST_UPDATES);
  const [resources, setResources] = useState(LEARNING_RESOURCES);
  const [videos, setVideos] = useState(YOUTUBE_VIDEOS);
  
  // Automated live fetched articles state
  const [articles, setArticles] = useState<any[]>([]);

  // Admin Modal Overlay State
  const [adminOpen, setAdminOpen] = useState(false);

  // Client-side SPA Router State
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [cityMode, setCityMode] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
  }, []);

  const navigate = (href: string) => {
    window.history.pushState({}, '', href);
    window.dispatchEvent(new Event('pushstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize authentication status with LocalStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('techtonic_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('techtonic_user');
    }
  }, [user]);

  // Handle scroll to hash after content loads and layout stabilizes
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [updates, articles, resources, videos]);

  // Load data from Supabase if configured, otherwise fall back to static data
  useEffect(() => {
    const fetchSupabaseData = async () => {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!url || !key) return; // Silent fallback to content.ts defaults

      try {
        // Fetch AI updates (manual curation)
        const { data: rawUpdates, error: errUpdates } = await supabase
          .from('ai_updates')
          .select('*')
          .order('created_at', { ascending: false });

        if (rawUpdates && !errUpdates) {
          if (rawUpdates.length > 0) {
            const filteredUpdates = rawUpdates.filter((item: any) => 
              !(item.title || '').toLowerCase().includes('echtonic ai portal connects')
            );
            setUpdates(filteredUpdates.map((item: any) => ({
              id: item.id,
              title: item.title,
              category: item.category,
              date: item.date,
              source: item.source,
              summary: item.summary,
              url: item.url,
              readTime: item.read_time,
              tag: item.tag
            })));
          }
        }

        // Fetch AI articles (automated aggregator feed)
        const { data: rawArticles, error: errArticles } = await supabase
          .from('ai_articles')
          .select('*')
          .order('published_at', { ascending: false });

        if (rawArticles && !errArticles) {
          setArticles(rawArticles.map((item: any) => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            category: item.category || 'General',
            date: new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            url: item.article_url,
            sourceName: item.source_name,
            author: item.author || item.source_name,
            readTime: '3 min read',
            tag: item.source_name,
            imageUrl: item.image_url
          })));
        }

        // Fetch Learning Resources
        const { data: rawResources, error: errResources } = await supabase
          .from('learning_resources')
          .select('*')
          .order('created_at', { ascending: true });

        if (rawResources && !errResources) {
          if (rawResources.length > 0) {
            setResources(rawResources.map((item: any) => ({
              id: item.id,
              company: item.company,
              toolName: item.tool_name,
              description: item.description,
              useCase: item.use_case,
              category: item.category,
              docsUrl: item.docs_url,
              learnUrl: item.learn_url
            })));
          }
        }

        // Fetch YouTube Videos
        const { data: rawVideos, error: errVideos } = await supabase
          .from('youtube_videos')
          .select('*')
          .order('created_at', { ascending: false });

        if (rawVideos && !errVideos) {
          if (rawVideos.length > 0) {
            setVideos(rawVideos.map((item: any) => ({
              id: item.id,
              title: item.title,
              duration: item.duration,
              category: item.category,
              publishDate: item.publish_date,
              youtubeId: item.youtube_id
            })));
          }
        }
      } catch (err) {
        console.warn("Failed to connect to Supabase. Operating in fallback static mode:", err);
      }
    };

    fetchSupabaseData();
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-navy-dark text-slate-100 selection:bg-brand-gold/30 selection:text-brand-gold-bright overflow-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-brand-navy-dark focus:rounded-lg focus:font-semibold focus:text-sm"
      >
        Skip to content
      </a>

      {/* 3D Connecting Particle Network Background */}
      <ThreeBackground />

      {/* Sticky Glassmorphism Header */}
      <Navbar 
        user={user} 
        onSignIn={setUser} 
        onSignOut={() => setUser(null)} 
        onOpenAdmin={() => setAdminOpen(true)}
        currentPath={currentPath}
        navigate={navigate}
        cityMode={cityMode}
        onCityModeToggle={() => setCityMode(!cityMode)}
      />

      {/* Main Content Layout */}
      <main id="main-content" className="relative z-10">
        {currentPath === '/' && (
          <>
            <Hero />
            <UpdatesSection updates={updates} articles={articles} />
            <LeadersSection />
            <LearningHub resources={resources} />
            <YouTubeSection videos={videos} />
            <CommunitySection />
          </>
        )}

        {currentPath === '/models-hub' && <ModelsHubPage />}
        {currentPath === '/trending' && <TrendingPage />}
        {currentPath === '/technologies/developer-studio' && <DeveloperStudioPage />}
        {currentPath === '/technologies/mcp' && <McpPage />}
        {currentPath === '/technologies/skills' && <SkillsPage />}
        {currentPath === '/technologies/frameworks' && <FrameworksPage />}
        {currentPath === '/technologies/infrastructure' && <InfrastructurePage />}
        {currentPath === '/leaders/google-deepmind' && <CompanyHubPage companyId="google-deepmind" navigate={navigate} />}
        {currentPath === '/leaders/openai' && <CompanyHubPage companyId="openai" navigate={navigate} />}
        {currentPath === '/leaders/anthropic-claude' && <CompanyHubPage companyId="anthropic-claude" navigate={navigate} />}
        {currentPath === '/leaders/meta-llama' && <CompanyHubPage companyId="meta-llama" navigate={navigate} />}
        {currentPath === '/leaders/microsoft-azure-ai' && <CompanyHubPage companyId="microsoft-azure-ai" navigate={navigate} />}
        {currentPath === '/leaders/nvidia-ai' && <CompanyHubPage companyId="nvidia-ai" navigate={navigate} />}
        {currentPath === '/leaders/aws-ai' && <CompanyHubPage companyId="aws-ai" navigate={navigate} />}
        {currentPath === '/leaders/apple-intelligence' && <CompanyHubPage companyId="apple-intelligence" navigate={navigate} />}
        {currentPath === '/leaders/xai-grok' && <CompanyHubPage companyId="xai-grok" navigate={navigate} />}
        {currentPath === '/leaders/mistral-ai' && <CompanyHubPage companyId="mistral-ai" navigate={navigate} />}
        {currentPath === '/leaders/ibm-watsonx' && <CompanyHubPage companyId="ibm-watsonx" navigate={navigate} />}
        {currentPath === '/leaders/cohere' && <CompanyHubPage companyId="cohere" navigate={navigate} />}
        {currentPath === '/leaders/huggingface' && <CompanyHubPage companyId="huggingface" navigate={navigate} />}
        {currentPath === '/leaders/deepseek' && <CompanyHubPage companyId="deepseek" navigate={navigate} />}
        {currentPath === '/leaders/moonshot-kimi' && <CompanyHubPage companyId="moonshot-kimi" navigate={navigate} />}
        {currentPath === '/leaders/alibaba-qwen' && <CompanyHubPage companyId="alibaba-qwen" navigate={navigate} />}
        {currentPath === '/learning' && <LearningPage />}
        {currentPath === '/tech-stack' && <TechStackPage />}

        {![
          '/', '/models-hub', '/trending', '/learning', '/tech-stack',
          '/technologies/developer-studio', '/technologies/mcp',
          '/technologies/skills', '/technologies/frameworks',
          '/technologies/infrastructure',
          '/leaders/google-deepmind', '/leaders/openai', '/leaders/anthropic-claude',
          '/leaders/meta-llama', '/leaders/microsoft-azure-ai', '/leaders/nvidia-ai',
          '/leaders/aws-ai', '/leaders/apple-intelligence', '/leaders/xai-grok',
          '/leaders/mistral-ai', '/leaders/ibm-watsonx', '/leaders/cohere',
          '/leaders/huggingface', '/leaders/deepseek', '/leaders/moonshot-kimi',
          '/leaders/alibaba-qwen'
        ].includes(currentPath) && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 gap-6">
            <div className="font-display text-8xl font-bold text-brand-gold/20">404</div>
            <h2 className="text-2xl font-bold text-slate-200">Page Not Found</h2>
            <p className="text-slate-400 max-w-md">This page doesn't exist on TechTonic AI. Head back to explore AI news, models, and tools.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-brand-gold text-brand-navy-dark font-semibold rounded-xl hover:bg-brand-gold-bright transition-all"
            >
              Back to Home
            </button>
          </div>
        )}
      </main>

      {/* Platform Footer */}
      <Footer />

      {/* Admin Panel Modal Overlay */}
      {adminOpen && (
        <AdminPanel
          onClose={() => setAdminOpen(false)}
          onAddUpdate={(newUp) => setUpdates([newUp, ...updates])}
          onAddResource={(newRes) => setResources([...resources, newRes])}
          onAddVideo={(newVid) => setVideos([newVid, ...videos])}
          currentUpdates={updates}
          currentResources={resources}
          currentVideos={videos}
        />
      )}

      {/* 3D AI City View Overlay Mode */}
      {cityMode && (
        <React.Suspense fallback={<div className="fixed inset-0 bg-brand-navy-dark/90 flex items-center justify-center text-brand-gold text-sm">Loading AI City...</div>}>
          <AICityView onClose={() => setCityMode(false)} />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
