import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 px-6 md:px-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent-secondary/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20 items-start">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
            <div className="text-4xl font-bold font-heading tracking-tighter group cursor-default">
              Impromp<span className="text-accent-primary group-hover:text-accent-secondary transition-colors duration-500">tu.</span>
            </div>
            <p className="text-secondary text-lg max-w-sm text-center md:text-left leading-relaxed font-light">
              Master the art of spontaneous speech. Practice, improve, and speak with absolute confidence anytime, anywhere.
            </p>
            <div className="flex gap-3">
              <div className="px-5 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold text-accent-primary tracking-widest uppercase">
                Design & Developed by Anushka Dubey
              </div>
            </div>
          </div>

          {/* Social Links Column */}
          <div id="contact" className="flex flex-col items-center md:items-start gap-6">
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-accent-primary">Socials</h4>
            <div className="flex gap-4">
              {[
                {
                  href: "https://x.com/anushkadubey26",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                },
                {
                  href: "https://www.linkedin.com/in/anushka-dubey-7b4501215/",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
                },
                {
                  href: "https://www.instagram.com/anushkadubey._/",
                  icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-accent-primary hover:text-primary hover:border-accent-primary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(226,180,189,0.5)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Info Column */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="text-secondary text-sm text-center md:text-right font-medium leading-loose">
              Built for thinkers, <br />
              dreamers, and speakers.
            </div>
            <div className="text-xs text-white/30 text-center md:text-right font-bold tracking-widest uppercase">
              Impromptu © {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            Unleash your potential
          </div>
          <div className="flex gap-10">
            {['Privacy', 'Terms', 'Support'].map((link) => (
              <a key={link} href="#" className="text-xs font-bold text-secondary hover:text-accent-primary transition-colors tracking-widest uppercase">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
