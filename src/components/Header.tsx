
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Venue', href: '#venue' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'RSVP', href: '#rsvp' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-10",
        isScrolled 
          ? "py-3 bg-black/80 backdrop-blur-md shadow-lg" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="#home" 
          className="text-2xl md:text-3xl font-display neon-text animate-pulse-glow"
        >
          Retro<span className="text-neon-pink">Blast</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-white hover:text-neon-pink transition-all duration-300 relative px-2 py-1",
                "after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-neon-pink after:left-0 after:right-0 after:bottom-0 after:mx-auto after:transition-all after:duration-300",
                "hover:after:w-full"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col justify-center items-center transition-all duration-500 md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <nav className="flex flex-col items-center space-y-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-2xl text-white hover:text-neon-pink hover:scale-110 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
