import { useState, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UpdatesSection } from './components/UpdatesSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { LATEST_UPDATES } from './data/content';
import { supabase } from './lib/supabase';

// 4 Dedicated Tab Pages
import { TrendingPage } from './pages/TrendingPage';
import { ModelsHubPage } from './pages/ModelsHubPage';
import { ModelRankingsPage } from './pages/ModelRankingsPage';

interface UserProfile {
  name: string;
  email: string;
  picture: string;
}

function App() {
  // Authentication State loaded from LocalStorage
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem('wenzdaylab_user') || localStorage.getItem('techtonic_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Stateful content arrays to support real-time Admin updates
  const [updates, setUpdates] = useState(LATEST_UPDATES);
  const [articles, setArticles] = useState<any[]>([]);

  // Admin Modal Overlay State
  const [adminOpen, setAdminOpen] = useState(false);

  // Client-side SPA Router State
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

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
      localStorage.setItem('wenzdaylab_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wenzdaylab_user');
      localStorage.removeItem('techtonic_user');
    }
  }, [user]);

  // Load data from Supabase if configured
  useEffect(() => {
    const fetchSupabaseData = async () => {
      const url = import.meta.env.VITE_SUPABASE_URL;
      const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
      if (!url || !key) return;

      try {
        // Fetch AI articles from official feed pipeline
        const { data: rawArticles, error: errArticles } = await supabase
          .from('ai_articles')
          .select('*')
          .order('published_at', { ascending: false });

        if (rawArticles && !errArticles) {
          setArticles(rawArticles.map((item: any) => ({
            id: item.id,
            title: item.title,
            summary: item.summary,
            category: item.category || 'AI Labs',
            published_at: item.published_at,
            date: new Date(item.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
            url: item.article_url,
            sourceName: item.source_name,
            author: item.author || item.source_name,
            imageUrl: item.image_url,
            videoUrl: item.video_url,
            tag: item.source_name
          })));
        }
      } catch (err) {
        console.warn("Operating with local content cache:", err);
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

      {/* Sticky Header with 4 Core Navigation Tabs */}
      <Navbar 
        user={user} 
        onSignIn={setUser} 
        onSignOut={() => setUser(null)} 
        onOpenAdmin={() => setAdminOpen(true)}
        currentPath={currentPath}
        navigate={navigate}
      />

      {/* Main Content Layout */}
      <main id="main-content" className="relative z-10">
        
        {/* TAB 1: Latest Updates (Home & /latest-updates) */}
        {(currentPath === '/' || currentPath === '/latest-updates') && (
          <>
            <Hero />
            <UpdatesSection updates={updates} articles={articles} />
          </>
        )}

        {/* TAB 2: Trending */}
        {currentPath === '/trending' && (
          <TrendingPage />
        )}

        {/* TAB 3: Model Hubs */}
        {currentPath === '/models-hub' && (
          <ModelsHubPage />
        )}

        {/* TAB 4: Model Rankings */}
        {currentPath === '/model-rankings' && (
          <ModelRankingsPage />
        )}

        {/* 404 Fallback for Obsolete Routes */}
        {![
          '/', '/latest-updates', '/trending', '/models-hub', '/model-rankings'
        ].includes(currentPath) && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 gap-6 pt-24">
            <div className="font-display text-8xl font-black text-brand-gold/20">404</div>
            <h2 className="text-2xl font-bold text-slate-200">Page Redesigned</h2>
            <p className="text-slate-400 max-w-md text-sm">
              WenzdayLab has been redesigned into 4 dedicated tabs: Latest Updates, Trending, Model Hubs, and Model Rankings.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-brand-gold text-brand-navy-dark font-extrabold rounded-2xl hover:bg-brand-gold-bright transition-all shadow-lg cursor-pointer"
            >
              Explore Latest Updates
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
          currentUpdates={updates}
        />
      )}
    </div>
  );
}

export default App;
