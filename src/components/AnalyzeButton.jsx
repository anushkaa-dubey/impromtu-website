import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

const AnalyzeButton = ({ onClick, isAnalyzing, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isAnalyzing}
      className={`mt-8 w-full flex items-center justify-center gap-3 py-4 rounded-large font-bold transition-all duration-300 shadow-soft ${
        isAnalyzing || disabled
          ? 'bg-secondary/20 text-secondary cursor-not-allowed'
          : 'bg-accent-primary text-primary hover:bg-accent-secondary hover:text-white transform hover:-translate-y-1'
      }`}
    >
      {isAnalyzing ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>Analyzing Speech...</span>
        </>
      ) : (
        <>
          <Sparkles size={20} />
          <span>Analyze with AI</span>
        </>
      )}
    </button>
  );
};

export default AnalyzeButton;
