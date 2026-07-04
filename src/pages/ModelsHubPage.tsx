import React from 'react';
import ModelsHub from '../components/ModelsHub';

export const ModelsHubPage: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-navy-dark">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6 border-b border-brand-gold/10">
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-wider text-slate-100 uppercase">
          Frontier & Open <span className="gold-gradient-text">Models Hub</span>
        </h1>
        <p className="text-slate-400 text-sm mt-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Live directory of 100 frontier AI models cached and synchronized from the **Hugging Face Model Registry**.
        </p>
      </div>

      {/* Main Models Hub Grid Component */}
      <ModelsHub />
    </div>
  );
};

export default ModelsHubPage;
