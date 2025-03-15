
import React, { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/utils/animations';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  useScrollAnimation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Function to calculate the time left
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        // If the target date has passed
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    // Calculate time left immediately
    calculateTimeLeft();
    
    // Update time left every second
    const timer = setInterval(calculateTimeLeft, 1000);
    
    // Clean up on unmount
    return () => clearInterval(timer);
  }, [targetDate]);
  
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-12 scroll-animate">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-retro tracking-widest text-neon-yellow px-4 py-1 border border-neon-yellow/30 rounded-full mb-3">
            COUNTDOWN
          </span>
          <h2 className="text-3xl md:text-4xl font-display text-white">
            Time Until We <span className="text-neon-pink animate-pulse-glow">Celebrate</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Days */}
          <div className="text-center">
            <div className="bg-retro-dark border border-neon-pink/50 rounded-lg p-4 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-pink/5"></div>
              <div className="relative z-10">
                <span className="text-4xl md:text-5xl font-retro neon-text">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            <span className="text-white/70 text-sm uppercase tracking-wider">Days</span>
          </div>
          
          {/* Hours */}
          <div className="text-center">
            <div className="bg-retro-dark border border-neon-blue/50 rounded-lg p-4 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-blue/5"></div>
              <div className="relative z-10">
                <span className="text-4xl md:text-5xl font-retro neon-text-blue">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            <span className="text-white/70 text-sm uppercase tracking-wider">Hours</span>
          </div>
          
          {/* Minutes */}
          <div className="text-center">
            <div className="bg-retro-dark border border-neon-yellow/50 rounded-lg p-4 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-yellow/5"></div>
              <div className="relative z-10">
                <span className="text-4xl md:text-5xl font-retro" style={{ 
                  color: 'white',
                  textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #ffce00, 0 0 82px #ffce00'
                }}>
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            <span className="text-white/70 text-sm uppercase tracking-wider">Minutes</span>
          </div>
          
          {/* Seconds */}
          <div className="text-center">
            <div className="bg-retro-dark border border-neon-purple/50 rounded-lg p-4 mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-neon-purple/5"></div>
              <div className="relative z-10">
                <span className="text-4xl md:text-5xl font-retro" style={{ 
                  color: 'white',
                  textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #5856d6, 0 0 82px #5856d6'
                }}>
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            <span className="text-white/70 text-sm uppercase tracking-wider">Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CountdownTimer;
