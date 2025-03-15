
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

const playlist = [
  {
    title: "Take On Me",
    artist: "a-ha",
    src: "https://example.com/music/take-on-me.mp3" // Replace with actual audio URL
  },
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    src: "https://example.com/music/billie-jean.mp3" // Replace with actual audio URL
  },
  {
    title: "Sweet Dreams",
    artist: "Eurythmics",
    src: "https://example.com/music/sweet-dreams.mp3" // Replace with actual audio URL
  }
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = volume;
    
    // Load the first track
    audioRef.current.src = playlist[currentTrack].src;
    
    // Update progress as audio plays
    const updateProgress = () => {
      if (audioRef.current) {
        const value = (audioRef.current.currentTime / audioRef.current.duration) * 100;
        setProgress(isNaN(value) ? 0 : value);
      }
    };
    
    // Handle track end
    const handleTrackEnd = () => {
      handleNext();
    };
    
    audioRef.current.addEventListener('timeupdate', updateProgress);
    audioRef.current.addEventListener('ended', handleTrackEnd);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', handleTrackEnd);
      }
    };
  }, []);
  
  // Update audio when current track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[currentTrack].src;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    }
  }, [currentTrack]);
  
  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play().catch(e => console.error("Error playing audio:", e));
    }
    setIsPlaying(!isPlaying);
  };
  
  const handlePrev = () => {
    setCurrentTrack((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };
  
  const handleNext = () => {
    setCurrentTrack((prev) => (prev === playlist.length - 1 ? 0 : prev + 1));
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const newTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(parseFloat(e.target.value));
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };
  
  return (
    <div className="glass-card p-4 max-w-sm mx-auto">
      <div className="text-center mb-3">
        <h3 className="text-lg font-display text-white">Preview Party Playlist</h3>
      </div>
      
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-1">
          <span className="text-white/70 text-sm">{playlist[currentTrack].title}</span>
          <span className="text-white/50 text-xs">{playlist[currentTrack].artist}</span>
        </div>
        
        <div className="relative mb-4">
          <input
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-1 bg-white/20 rounded appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ff2d55 0%, #ff2d55 ${progress}%, rgba(255,255,255,0.2) ${progress}%, rgba(255,255,255,0.2) 100%)`,
            }}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMute} 
              className="p-1.5 text-white/70 hover:text-neon-pink transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-12 h-1 bg-white/20 rounded appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #0066ff 0%, #0066ff ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
              }}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handlePrev} 
              className="p-1.5 text-white hover:text-white/70 transition-colors"
            >
              <SkipBack size={18} />
            </button>
            
            <button 
              onClick={togglePlay} 
              className="w-10 h-10 rounded-full bg-neon-pink flex items-center justify-center text-white hover:bg-neon-pink/80 transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </button>
            
            <button 
              onClick={handleNext} 
              className="p-1.5 text-white hover:text-white/70 transition-colors"
            >
              <SkipForward size={18} />
            </button>
          </div>
          
          <div className="w-16">
            {/* Empty space to balance the layout */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
