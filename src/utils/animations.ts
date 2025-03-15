
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
      if (container.contains(confetti)) {
        container.removeChild(confetti);
      }
    }, 8000 + (Math.random() * 5000));
  }
};

/**
 * Custom hook for scroll-triggered animations
 * Modified to prevent flickering when elements enter the viewport
 */
export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Pre-apply the animate-fade-in class with opacity-0
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => {
      // Add a class that sets initial state with no transition
      el.classList.add('opacity-0');
    });

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      elements.forEach((el) => {
        // Check if the element is already in the viewport on page load
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
          el.classList.remove('opacity-0');
          el.classList.add('animate-fade-in');
        }
      });
    }, 50);

    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const elements = document.querySelectorAll('.scroll-animate');
      elements.forEach((el) => {
        // Only apply animation if it hasn't been animated yet
        if (!el.classList.contains('animate-fade-in')) {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          
          if (isVisible) {
            el.classList.remove('opacity-0');
            el.classList.add('animate-fade-in');
          }
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
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

/**
 * Creates a fade-out effect for page transitions
 */
export const useFadeEffect = (duration = 1000) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(false);
    
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, []);
  
  return {
    isVisible,
    fadeClass: `transition-opacity duration-${duration} ${isVisible ? 'opacity-100' : 'opacity-0'}`
  };
};
