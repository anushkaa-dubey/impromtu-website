import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-primary text-white py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50 shadow-md">
      <Link to="/" className="text-2xl font-bold font-heading tracking-tight">
        Impromp<span className="text-accent-primary text-3xl">tu.</span>
      </Link>
      
      <div className="hidden md:flex gap-8 items-center text-sm font-medium">
        <Link to="/" className="hover:text-accent-primary transition-colors">Home</Link>
        <a href="#about" className="hover:text-accent-primary transition-colors">About</a>
        <a href="#how-it-works" className="hover:text-accent-primary transition-colors">How it Works</a>
        <a href="#contact" className="hover:text-accent-primary transition-colors">Contact</a>

        <Link 
          to="/practice" 
          className="bg-accent-primary text-primary px-6 py-2 rounded-full hover:bg-accent-secondary hover:text-white transition-all duration-300 shadow-sm"
        >
          Start
        </Link>
      </div>
      
      <Link 
        to="/practice" 
        className="md:hidden bg-accent-primary text-primary px-4 py-2 rounded-full text-sm font-bold"
      >
        Start
      </Link>
    </nav>
  );
};

export default Navbar;
