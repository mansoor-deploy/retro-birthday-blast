
import React, { useState } from 'react';
import { Check, PartyPopper } from 'lucide-react';
import { useScrollAnimation } from '@/utils/animations';
import { toast } from '@/hooks/use-toast';

export function RsvpForm() {
  useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guests: '0',
    dietaryRestrictions: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "RSVP Received!",
        description: "Thank you for your response. We've sent a confirmation to your email.",
        variant: "default",
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 glass-card">
        <div className="w-16 h-16 rounded-full bg-neon-pink/20 flex items-center justify-center mb-6 animate-scale-in">
          <Check className="w-8 h-8 text-neon-pink" />
        </div>
        <h3 className="text-2xl font-display text-white mb-4">Thank You!</h3>
        <p className="text-white/80 text-center max-w-md mb-6">
          Your RSVP has been received. We can't wait to celebrate with you!
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="btn-neon"
        >
          Edit Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2">
        <label htmlFor="name" className="block text-white mb-2">Your Name*</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white focus:border-neon-pink outline-none transition-colors"
          placeholder="Enter your full name"
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="email" className="block text-white mb-2">Email Address*</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white focus:border-neon-pink outline-none transition-colors"
          placeholder="your.email@example.com"
        />
      </div>

      <div>
        <label htmlFor="attending" className="block text-white mb-2">Will You Attend?*</label>
        <select
          id="attending"
          name="attending"
          value={formData.attending}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-black text-white focus:border-neon-pink outline-none transition-colors appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
        >
          <option value="yes">Yes, I'll be there!</option>
          <option value="no">Sorry, I can't make it</option>
          <option value="maybe">Maybe (will confirm later)</option>
        </select>
      </div>

      <div>
        <label htmlFor="guests" className="block text-white mb-2">Number of Guests</label>
        <select
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-black text-white focus:border-neon-pink outline-none transition-colors appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
        >
          <option value="0">Just me</option>
          <option value="1">+1 Guest</option>
          <option value="2">+2 Guests</option>
          <option value="3">+3 Guests</option>
          <option value="4">+4 Guests</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="dietaryRestrictions" className="block text-white mb-2">Dietary Restrictions</label>
        <input
          type="text"
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white focus:border-neon-pink outline-none transition-colors"
          placeholder="Vegetarian, vegan, allergies, etc."
        />
      </div>

      <div className="md:col-span-2">
        <label htmlFor="message" className="block text-white mb-2">Additional Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white focus:border-neon-pink outline-none transition-colors resize-none"
          placeholder="Any special message or song requests?"
        />
      </div>

      <div className="md:col-span-2 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-neon py-4 px-10 relative"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? 'Submitting...' : 'Send RSVP'}
            {!isSubmitting && <PartyPopper className="w-5 h-5 text-white" />}
          </span>
        </button>
      </div>
    </form>
  );
}

export default RsvpForm;
