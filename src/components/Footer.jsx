import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="text-2xl font-bold font-heading tracking-tight">
            Impromp<span className="text-accent-primary">tu.</span>
          </div>
          <p className="text-secondary text-sm max-w-xs text-center md:text-left">
            Empowering voices through consistent practice and spontaneous storytelling.
          </p>
          <div className="text-xs font-bold text-accent-primary tracking-widest uppercase">
            Developed by Anushka Dubey
          </div>
        </div>
        
        <div id="contact" className="flex flex-col items-center gap-4">
           <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">Connect</h4>
           <div className="flex gap-6">
              <a href="#" className="p-3 bg-secondary/10 rounded-full hover:bg-accent-primary hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="p-3 bg-secondary/10 rounded-full hover:bg-accent-primary hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="p-3 bg-secondary/10 rounded-full hover:bg-accent-primary hover:text-primary transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
           </div>
        </div>
        
        <div className="text-sm text-secondary text-center md:text-right">
          © {new Date().getFullYear()} Impromptu.<br />
          All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
