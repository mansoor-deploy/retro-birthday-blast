
import React from 'react';
import { Heart, Instagram, Facebook, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-white py-12 relative overflow-hidden">
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-display mb-4 neon-text-blue">RetroBirthday</h3>
            <p className="text-white/60 mb-6">
              Thank you for being part of this special celebration. We can't wait to see you!
            </p>
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-pink hover:text-neon-pink transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-pink hover:text-neon-pink transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="mailto:info@example.com" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-pink hover:text-neon-pink transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
              <a 
                href="tel:+1234567890" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-neon-pink hover:text-neon-pink transition-colors"
                aria-label="Phone"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-xl font-display mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-white/60 hover:text-neon-pink transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="text-white/60 hover:text-neon-pink transition-colors">Event Details</a>
              </li>
              <li>
                <a href="#venue" className="text-white/60 hover:text-neon-pink transition-colors">Venue</a>
              </li>
              <li>
                <a href="#gallery" className="text-white/60 hover:text-neon-pink transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#rsvp" className="text-white/60 hover:text-neon-pink transition-colors">RSVP</a>
              </li>
            </ul>
          </div>
          
          <div className="text-center md:text-right">
            <h3 className="text-xl font-display mb-4">Contact Info</h3>
            <p className="text-white/60 mb-2">
              <span className="block">Email: info@example.com</span>
              <span className="block">Phone: +1 (234) 567-890</span>
            </p>
            <p className="text-white/40 text-sm mt-6">
              Feel free to reach out with any questions about the event.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-sm flex items-center justify-center">
            Made with <Heart size={16} className="mx-1 text-neon-pink" /> for a special celebration
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
