
import React from 'react';
import { Cake, Music, Gift, Sparkle } from 'lucide-react';
import { useScrollAnimation } from '@/utils/animations';

interface EventDetailsProps {
  theme: string;
  dresscode: string;
  music: string;
  gifts: string;
}

export function EventDetails({ theme, dresscode, music, gifts }: EventDetailsProps) {
  useScrollAnimation();

  return (
    <section id="about" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block text-sm font-retro tracking-widest text-neon-yellow px-4 py-1 border border-neon-yellow/30 rounded-full mb-3">
            THE CELEBRATION
          </span>
          <h2 className="text-4xl md:text-5xl font-display neon-text-blue">Birthday Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="glass-card p-6 scroll-animate">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-pink/20 mr-4">
                <Cake className="text-neon-pink" />
              </div>
              <h3 className="text-xl font-display">Theme & Dress Code</h3>
            </div>
            <p className="text-white/80">{theme}</p>
            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-white/80">{dresscode}</p>
            </div>
          </div>
          
          <div className="glass-card p-6 scroll-animate">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-blue/20 mr-4">
                <Music className="text-neon-blue" />
              </div>
              <h3 className="text-xl font-display">Music & Entertainment</h3>
            </div>
            <p className="text-white/80">{music}</p>
          </div>
          
          <div className="glass-card p-6 scroll-animate">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-yellow/20 mr-4">
                <Gift className="text-neon-yellow" />
              </div>
              <h3 className="text-xl font-display">Gift Information</h3>
            </div>
            <p className="text-white/80">{gifts}</p>
          </div>
          
          <div className="glass-card p-6 scroll-animate">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neon-purple/20 mr-4">
                <Sparkle className="text-neon-purple" />
              </div>
              <h3 className="text-xl font-display">Special Activities</h3>
            </div>
            <p className="text-white/80">Experience a night of retro arcade gaming, an 80's themed photo booth, and a dance floor with the best tracks from the era. Don't miss our surprise live performance!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
