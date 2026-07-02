import { useState, useEffect } from 'react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UpdatesSection } from './components/UpdatesSection';
import { LeadersSection } from './components/LeadersSection';
import { LearningHub } from './components/LearningHub';
import { YouTubeSection } from './components/YouTubeSection';
import { TrendingTopics } from './components/TrendingTopics';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { LATEST_UPDATES, LEARNING_RESOURCES, YOUTUBE_VIDEOS } from './data/content';

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
        <UpdatesSection updates={updates} />
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
          onAddResource={(newRes) => setResources([newRes, ...resources])}
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
