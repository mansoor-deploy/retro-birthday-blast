
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import EventDetails from '@/components/EventDetails';
import Venue from '@/components/Venue';
import Gallery from '@/components/Gallery';
import CountdownTimer from '@/components/CountdownTimer';
import RsvpForm from '@/components/RsvpForm';
import MusicPlayer from '@/components/MusicPlayer';
import BackgroundMusic from '@/components/BackgroundMusic';
import Footer from '@/components/Footer';
import { useCursorGlow } from '@/utils/animations';

const Index = () => {
  // Initialize cursor glow effect
  useCursorGlow();
  
  // Set target date for countdown (2 months from now)
  const targetDate = new Date();
  targetDate.setMonth(targetDate.getMonth() + 2);
  
  useEffect(() => {
    // Add fade-in effect to the entire page
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.classList.add('opacity-0');
      
      setTimeout(() => {
        mainElement.classList.add('transition-opacity', 'duration-1000');
        mainElement.classList.remove('opacity-0');
      }, 200);
    }
    
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = anchor.getAttribute('href')!.slice(1);
        const element = document.getElementById(id);
        
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <Header />
      
      <BackgroundMusic />
      
      <main>
        <Hero 
          name="Sarah" 
          date="Saturday, August 12th, 2023" 
          time="8:00 PM - 2:00 AM"
        />
        
        <EventDetails 
          theme="Step back in time with our 80's Neon Retrowave theme! Think bold colors, geometric patterns, and plenty of nostalgia."
          dresscode="Dress to impress in your best 80's inspired outfits - neon colors, leg warmers, shoulder pads, or anything that screams retro fun!"
          music="Dance the night away with a curated playlist of 80's classics, modern hits with a retro twist, and a live DJ spinning vinyl."
          gifts="Your presence is the best gift! If you wish to bring something, gift cards or contributions to my vinyl collection would be appreciated."
        />
        
        <Venue 
          venueName="Neon Galaxy Lounge"
          address="123 Retro Avenue, Downtown, New York, NY 10001"
          mapUrl="https://maps.google.com"
          directionsUrl="https://maps.google.com/directions"
          mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.697149422113014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1627309750687!5m2!1sen!2s"
        />
        
        <CountdownTimer targetDate={targetDate} />
        
        <Gallery />
        
        <section id="rsvp" className="py-20 px-4 relative overflow-hidden gradient-background">
          <div className="absolute inset-0 bg-retro-grid z-0 opacity-20"></div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-12 scroll-animate">
              <span className="inline-block text-sm font-retro tracking-widest text-neon-yellow px-4 py-1 border border-neon-yellow/30 rounded-full mb-3">
                JOIN US
              </span>
              <h2 className="text-4xl md:text-5xl font-display neon-text">RSVP</h2>
              <p className="mt-4 text-white/70 max-w-xl mx-auto">
                Please let us know if you'll be joining the celebration by July 15th
              </p>
            </div>
            
            <div className="glass-card p-6 md:p-10 scroll-animate">
              <RsvpForm />
            </div>
            
            <div className="mt-12 text-center scroll-animate">
              <h3 className="text-xl font-display text-white mb-6">Party Playlist Preview</h3>
              <MusicPlayer />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
