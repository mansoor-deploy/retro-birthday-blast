
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const playlist = [
  {
    title: "Take On Me",
    artist: "a-ha",
    src: "/audio/take-on-me.mp3" // Updated with local audio path
  },
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    src: "/audio/billie-jean.mp3" // Updated with local audio path
  },
  {
    title: "Sweet Dreams",
    artist: "Eurythmics",
    src: "/audio/sweet-dreams.mp3" // Updated with local audio path
  }
];

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [songSuggestion, setSongSuggestion] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
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

  const handleSuggestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (songSuggestion.trim()) {
      setSuggestions(prev => [...prev, songSuggestion.trim()]);
      setSongSuggestion('');
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

        <div className="mt-4 flex justify-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="text-neon-blue border-neon-blue bg-transparent hover:bg-neon-blue/10 flex items-center gap-2">
                <Music size={16} />
                <span>Suggest Songs</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-neon-blue/30">
              <DialogHeader>
                <DialogTitle className="text-center text-neon-blue">Suggest a Song for the Party</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSuggestionSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Artist - Song Title"
                    value={songSuggestion}
                    onChange={(e) => setSongSuggestion(e.target.value)}
                    className="bg-black/50 border-white/20 text-white"
                  />
                  <Button type="submit" className="bg-neon-blue hover:bg-neon-blue/80">
                    Add
                  </Button>
                </div>
                {suggestions.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-white/70 text-sm mb-2">Suggested Songs:</h4>
                    <ul className="space-y-1 max-h-40 overflow-y-auto">
                      {suggestions.map((song, index) => (
                        <li key={index} className="text-neon-pink text-sm p-2 rounded bg-black/20">
                          {song}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
