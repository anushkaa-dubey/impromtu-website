import React from 'react';

const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseStyles = "px-8 py-3 rounded-large font-semibold transition-all duration-300 shadow-soft active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-accent-primary text-primary hover:bg-accent-secondary hover:text-white",
    secondary: "bg-secondary/20 text-primary hover:bg-secondary/30",
    outline: "border-2 border-accent-primary text-primary hover:bg-accent-primary",
    ghost: "bg-transparent text-primary hover:bg-secondary/10"
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
