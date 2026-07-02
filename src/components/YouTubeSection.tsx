import React from 'react';
import { motion } from 'framer-motion';
import { YOUTUBE_VIDEOS } from '../data/content';
import { Play, Calendar, Clock, ArrowRight } from 'lucide-react';

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .503 6.163C0 8.037 0 12 0 12s0 3.963.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.963 24 12 24 12s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface YouTubeSectionProps {
  videos?: typeof YOUTUBE_VIDEOS;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ videos = YOUTUBE_VIDEOS }) => {
  return (
    <section id="videos" className="relative py-24 z-10 border-t border-brand-gold/5 bg-brand-navy-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left max-w-2xl space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-wider text-slate-100 uppercase">
              Featured <span className="gold-gradient-text">YouTube Content</span>
            </h2>
            <div className="w-20 h-[3px] bg-brand-gold rounded-full md:mx-0 mx-auto" />
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Step-by-step programming guides, deep architectural code reviews, and updates from the developer ecosystem.
            </p>
          </div>
          <a
            href="https://youtube.com/@techtonicai7947"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-600/10 hover:bg-red-600/25 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl text-sm font-semibold tracking-wider transition-all duration-300 self-center md:self-auto hover:shadow-[0_0_15px_rgba(239,68,68,0.15)] focus:outline-none focus:ring-2 focus:ring-red-500/50 active:scale-95"
          >
            <YoutubeIcon className="w-5 h-5 fill-red-500" />
            Visit Channel
          </a>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
              className="group flex flex-col h-full bg-brand-navy-deep/40 rounded-2xl border border-brand-gold/10 hover:border-brand-gold/30 overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              
              {/* Card Thumbnail / Media Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-brand-navy-dark border-b border-brand-gold/10">
                
                {/* Tech background design grid */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent" />
                <div className="absolute inset-0 bg-brand-navy-dark/60" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-brand-navy-dark/95 border border-brand-gold/30 flex items-center justify-center text-brand-gold-bright shadow-2xl group-hover:scale-110 group-hover:border-brand-gold group-hover:text-brand-gold transition-all duration-300 z-10">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Info Pills */}
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-brand-navy-dark/80 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-brand-gold/10 text-brand-gold-bright z-10">
                  {video.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/75 text-[10px] md:text-xs font-mono font-medium text-slate-300 z-10 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {video.duration}
                </div>
                
                {/* Visual Motif Icon */}
                <div className="absolute top-4 left-4 text-brand-gold/30">
                  <YoutubeIcon className="w-8 h-8" />
                </div>
              </div>

              {/* Title & Info */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-5">
                <h3 className="font-serif text-base md:text-lg font-bold leading-snug text-slate-200 group-hover:text-brand-gold-bright transition-colors duration-300">
                  {video.title}
                </h3>
                
                <div className="pt-3 border-t border-brand-gold/5 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    {video.publishDate}
                  </span>
                  
                  <a
                    href={`https://youtube.com/watch?v=${video.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest text-slate-300 hover:text-brand-gold transition-colors duration-300 focus:outline-none"
                  >
                    WATCH VIDEO
                    <ArrowRight className="w-4.5 h-4.5 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
