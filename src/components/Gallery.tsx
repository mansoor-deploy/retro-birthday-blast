
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Image } from 'lucide-react';
import { useScrollAnimation } from '@/utils/animations';

interface ImageProps {
  src: string;
  alt: string;
}

export function Gallery() {
  useScrollAnimation();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Sample images
  const galleryImages: ImageProps[] = [
    {
      src: "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?w=800&q=80",
      alt: "Retro neon lights"
    },
    {
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
      alt: "Retro party"
    },
    {
      src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      alt: "Neon sign"
    },
    {
      src: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80",
      alt: "Retro microphone"
    },
    {
      src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
      alt: "Arcade games"
    },
    {
      src: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?w=800&q=80", 
      alt: "Vinyl records"
    }
  ];
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };
  
  const navigateLightbox = (direction: number) => {
    if (lightboxIndex === null) return;
    
    let newIndex = lightboxIndex + direction;
    if (newIndex < 0) newIndex = galleryImages.length - 1;
    if (newIndex >= galleryImages.length) newIndex = 0;
    
    setLightboxIndex(newIndex);
  };
  
  return (
    <section id="gallery" className="py-20 px-4 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 scroll-animate">
          <span className="inline-block text-sm font-retro tracking-widest text-neon-yellow px-4 py-1 border border-neon-yellow/30 rounded-full mb-3">
            MEMORIES
          </span>
          <h2 className="text-4xl md:text-5xl font-display neon-text-blue">Photo Gallery</h2>
          <p className="mt-4 text-white/70 max-w-2xl mx-auto">
            Preview the vibe of our upcoming celebration with these retro-inspired photos
          </p>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <div 
              key={index} 
              className="scroll-animate overflow-hidden rounded-lg group cursor-pointer relative aspect-square bg-gray-900"
              onClick={() => openLightbox(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ 
                  filter: 'brightness(0.9) contrast(1.1)',
                  animationDelay: `${index * 100}ms`,
                }}
              />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
                  <Image className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View more button */}
        <div className="mt-12 text-center">
          <button className="btn-neon">
            View More Photos
          </button>
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button 
            className="absolute top-4 right-4 p-2 text-white hover:text-neon-pink transition-colors"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:text-neon-pink transition-colors"
            onClick={() => navigateLightbox(-1)}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:text-neon-pink transition-colors"
            onClick={() => navigateLightbox(1)}
          >
            <ChevronRight size={24} />
          </button>
          
          <div className="w-full max-w-4xl h-full max-h-[80vh] flex items-center justify-center">
            <img 
              src={galleryImages[lightboxIndex].src} 
              alt={galleryImages[lightboxIndex].alt}
              className="max-w-full max-h-full object-contain animate-scale-in"
            />
          </div>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white/80">
            {lightboxIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;
