import React, { useState, useEffect, useCallback } from 'react';

const Timer = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [duration, setDuration] = useState(60);
  const [isActive, setIsActive] = useState(false);
  
  const presets = [30, 60, 120];

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(interval);
      if (onComplete) onComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = useCallback((newDuration = duration) => {
    setTimeLeft(newDuration);
    setDuration(newDuration);
    setIsActive(false);
  }, [duration]);

  const handlePresetClick = (preset) => {
    resetTimer(preset);
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-white/50 backdrop-blur-sm rounded-large shadow-soft border border-secondary/10">
      <div className="flex gap-4">
        {presets.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePresetClick(preset)}
            className={`px-4 py-1 rounded-full text-xs font-semibold transition-all border ${
              duration === preset 
                ? 'bg-accent-primary border-accent-primary text-primary' 
                : 'bg-transparent border-secondary/30 text-secondary hover:border-accent-primary'
            }`}
          >
            {preset}s
          </button>
        ))}
      </div>

      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Progress Circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="rgba(147, 168, 172, 0.2)"
            strokeWidth="8"
          />
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="transparent"
            stroke="#E2B4BD"
            strokeWidth="8"
            strokeDasharray={2 * Math.PI * 80}
            strokeDashoffset={2 * Math.PI * 80 * (1 - timeLeft / duration)}
            strokeLinecap="round"
            className="transition-all duration-1000 linear"
          />
        </svg>
        
        <div className="absolute flex flex-col items-center">
          <span className="text-4xl font-bold font-heading text-primary">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-secondary font-medium">remaining</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={toggleTimer}
          className={`px-8 py-2 rounded-full font-semibold transition-all ${
            isActive 
              ? 'bg-primary text-white hover:bg-primary/90' 
              : 'bg-accent-primary text-primary hover:bg-accent-secondary hover:text-white'
          }`}
        >
          {isActive ? 'Pause' : 'Start Timer'}
        </button>
        <button
          onClick={() => resetTimer()}
          className="px-8 py-2 rounded-full border-2 border-secondary/20 text-secondary font-semibold hover:border-secondary/40 transition-all"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
