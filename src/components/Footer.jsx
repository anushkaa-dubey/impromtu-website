import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-2xl font-bold font-heading tracking-tight">
            Impromp<span className="text-accent-primary">tu.</span>
          </div>
          <p className="text-secondary text-sm max-w-xs text-center md:text-left">
            Empowering voices through consistent practice and spontaneous storytelling.
          </p>
        </div>
        
        <div className="flex gap-8 text-sm text-secondary">
          <a href="#" className="hover:text-accent-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-accent-primary transition-colors">Contact</a>
        </div>
        
        <div className="text-sm text-secondary">
          © {new Date().getFullYear()} Impromptu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
