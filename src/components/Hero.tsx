
import React, { useEffect, useRef } from 'react';
import { useTypewriterEffect, createConfetti } from '@/utils/animations';
import { PartyPopper, Calendar, Clock } from 'lucide-react';

interface HeroProps {
  name: string;
  date: string;
  time: string;
}

export function Hero({ name, date, time }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const greeting = useTypewriterEffect("You're Invited!", 100, 500);
  const invitation = useTypewriterEffect(`Join ${name}'s Birthday Celebration`, 80, 1500);

  useEffect(() => {
    if (containerRef.current) {
      // Add confetti effects intermittently
      const interval = setInterval(() => {
        createConfetti(containerRef.current!, 10);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden retro-grid-bg"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90 z-0"></div>
      
      {/* Glow elements */}
      <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-neon-pink/20 blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-neon-blue/20 blur-3xl animate-pulse-glow animate-delay-500"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,45,85,.03)_1px,transparent_1px),linear-gradient(rgba(255,45,85,.03)_1px,transparent_1px)] bg-[size:40px_40px] z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="mb-6">
          <span className="inline-block text-sm md:text-base font-retro tracking-widest text-neon-yellow px-4 py-2 border border-neon-yellow rounded-full animate-pulse-glow">
            SAVE THE DATE
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-retro tracking-wider text-white">
          {greeting}
        </h2>
        
        <h1 className="text-4xl md:text-7xl font-display neon-text animate-neon-pulse">
          {invitation || ' '}
        </h1>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent my-8"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="glass-card px-6 py-4 flex items-center gap-3 animate-fade-in animate-delay-300">
            <Calendar className="text-neon-pink" />
            <span className="text-lg md:text-xl">{date}</span>
          </div>
          
          <div className="glass-card px-6 py-4 flex items-center gap-3 animate-fade-in animate-delay-500">
            <Clock className="text-neon-blue" />
            <span className="text-lg md:text-xl">{time}</span>
          </div>
        </div>
        
        <div className="mt-12">
          <a 
            href="#rsvp" 
            className="btn-neon group relative overflow-hidden inline-flex items-center gap-2 animate-fade-in animate-delay-700"
          >
            <span>RSVP NOW</span>
            <PartyPopper className="w-5 h-5 transition-transform group-hover:rotate-12" />
            <span className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/80 rounded-full mt-2 animate-pulse"></div>
        </div>
        <span className="text-white/50 text-xs mt-2">Scroll Down</span>
      </div>
    </section>
  );
}

export default Hero;
