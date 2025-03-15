
import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    audioRef.current = new Audio('/audio/background-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    
    const playPromise = audioRef.current.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Autoplay started
          setIsLoaded(true);
        })
        .catch(error => {
          // Autoplay prevented by browser
          console.log("Autoplay prevented:", error);
          setIsLoaded(true);
          setIsMuted(true);
        });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);
  
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
          .then(() => {
            audioRef.current!.volume = 0.2;
            setIsMuted(false);
          })
          .catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center transition-all duration-300",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}
    >
      <button 
        onClick={toggleMute}
        className="w-full h-full flex items-center justify-center text-white hover:text-neon-pink transition-colors"
        aria-label={isMuted ? "Unmute background music" : "Mute background music"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};

export default BackgroundMusic;
