
import { useEffect, useState } from 'react';

/**
 * Creates a cursor glow effect that follows the mouse
 */
export const useCursorGlow = () => {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);

    const updateCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.backgroundColor = 'rgba(255, 45, 85, 0.9)';
    };

    const handleMouseUp = () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'rgba(255, 45, 85, 0.7)';
    };

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeChild(cursor);
    };
  }, []);
};

/**
 * Generates random confetti elements
 */
export const createConfetti = (container: HTMLElement, count = 50) => {
  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div');
    const size = Math.random() * 10 + 5;
    const colors = ['#ff2d55', '#0066ff', '#ffce00', '#5856d6', '#ffffff'];
    
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.position = 'absolute';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-20px';
    confetti.style.opacity = '1';
    confetti.style.animation = `confetti-fall ${3 + Math.random() * 5}s linear forwards`;
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    
    container.appendChild(confetti);
    
    // Remove confetti after animation completes
    setTimeout(() => {
      container.removeChild(confetti);
    }, 8000 + (Math.random() * 5000));
  }
};

/**
 * Custom hook for scroll-triggered animations
 */
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          el.classList.add('animate-fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

/**
 * Creates a typing animation effect
 */
export const useTypewriterEffect = (text: string, speed = 100, delay = 0) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const startTyping = () => {
      timeout = setTimeout(() => {
        setDisplayText(text.substring(0, currentIndex + 1));
        currentIndex++;
        
        if (currentIndex < text.length) {
          startTyping();
        }
      }, speed);
    };
    
    const delayTimeout = setTimeout(() => {
      startTyping();
    }, delay);
    
    return () => {
      clearTimeout(timeout);
      clearTimeout(delayTimeout);
    };
  }, [text, speed, delay]);
  
  return displayText;
};
