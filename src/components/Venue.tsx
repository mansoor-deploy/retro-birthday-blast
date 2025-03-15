
import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useScrollAnimation } from '@/utils/animations';

interface VenueProps {
  venueName: string;
  address: string;
  mapUrl: string;
  directionsUrl: string;
  mapEmbedUrl?: string;
}

export function Venue({ venueName, address, mapUrl, directionsUrl, mapEmbedUrl }: VenueProps) {
  useScrollAnimation();
  const mapRef = useRef<HTMLDivElement>(null);

  // Add a simple map highlight effect on hover
  useEffect(() => {
    const mapEl = mapRef.current;
    if (!mapEl) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = mapEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create spotlight effect
      const spotlightSize = 150;
      mapEl.style.backgroundImage = `
        radial-gradient(
          circle ${spotlightSize}px at ${x}px ${y}px, 
          rgba(255, 45, 85, 0.2), 
          transparent
        ),
        linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))
      `;
    };
    
    const handleMouseLeave = () => {
      mapEl.style.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))';
    };
    
    mapEl.addEventListener('mousemove', handleMouseMove);
    mapEl.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      mapEl.removeEventListener('mousemove', handleMouseMove);
      mapEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <section id="venue" className="py-20 px-4 relative overflow-hidden gradient-background">
      <div className="absolute inset-0 bg-retro-grid z-0 opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block text-sm font-retro tracking-widest text-neon-yellow px-4 py-1 border border-neon-yellow/30 rounded-full mb-3">
            LOCATION
          </span>
          <h2 className="text-4xl md:text-5xl font-display neon-text">Venue Details</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="scroll-animate">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-display mb-4">{venueName}</h3>
              
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="text-neon-pink mt-1 flex-shrink-0" />
                <p className="text-white/80">{address}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-neon text-center"
                >
                  View on Map
                </a>
                
                <a 
                  href={directionsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-white border-2 border-neon-blue rounded-xl px-6 py-3 transition-all hover:shadow-neon-blue"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
            
            <div className="mt-8 glass-card p-6">
              <h4 className="text-xl font-display mb-3">Parking Information</h4>
              <p className="text-white/80 mb-4">
                Complimentary valet parking is available at the main entrance. Additional self-parking options are available in the garage adjacent to the venue.
              </p>
              
              <h4 className="text-xl font-display mb-3 mt-6">Public Transport</h4>
              <p className="text-white/80">
                The venue is a 5-minute walk from Downtown Metro Station (Red Line). Several bus routes (14, 38, and 45) also stop nearby.
              </p>
            </div>
          </div>
          
          <div 
            ref={mapRef}
            className="scroll-animate h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative group"
            style={{
              backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {mapEmbedUrl ? (
              <iframe 
                src={mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="group-hover:opacity-90 transition-opacity duration-300"
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/60">Map Preview Unavailable</span>
              </div>
            )}
            
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <p className="text-white/90 text-sm font-medium">
                {venueName}, {address.split(',')[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Venue;
