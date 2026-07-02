import { useState, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UpdatesSection } from './components/UpdatesSection';
import { ModelsHub } from './components/ModelsHub';
import { LeadersSection } from './components/LeadersSection';
import { LearningHub } from './components/LearningHub';
import { YouTubeSection } from './components/YouTubeSection';
import { TrendingTopics } from './components/TrendingTopics';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { LATEST_UPDATES, LEARNING_RESOURCES, YOUTUBE_VIDEOS } from './data/content';
import { supabase } from './lib/supabase';

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
            setUpdates(rawUpdates.map((item: any) => ({
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
            tag: item.source_name
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
      {/* 3D Connecting Particle Network Background */}
      <ThreeBackground />

      {/* Sticky Glassmorphism Header */}
      <Navbar 
        user={user} 
        onSignIn={setUser} 
        onSignOut={() => setUser(null)} 
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Layout */}
      <main className="relative z-10">
        <Hero />
        <UpdatesSection updates={updates} articles={articles} />
        <ModelsHub />
        <LeadersSection />
        <LearningHub resources={resources} />
        <YouTubeSection videos={videos} />
        <TrendingTopics />
        <CommunitySection />
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
    </div>
  );
}

export default App;
