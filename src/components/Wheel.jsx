import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Wheel = ({ topics, onSpinEnd }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef(null);
  const controls = useAnimation();

  // Number of segments matches number of topics
  const numSegments = topics.length;
  const segmentAngle = 360 / numSegments;

  const spin = async () => {
    if (spinning) return;
    
    setSpinning(true);
    
    // Choose a random segment
    const randomIndex = Math.floor(Math.random() * numSegments);
    
    // Calculate total rotation
    // Add multiple full turns (5-10) for effect
    const extraTurns = 5 + Math.floor(Math.random() * 5);
    const targetRotation = rotation + (extraTurns * 360) + (360 - (randomIndex * segmentAngle)) + (segmentAngle / 2);
    
    setRotation(targetRotation);

    await controls.start({
      rotate: targetRotation,
      transition: { duration: 4, ease: [0.15, 0, 0.15, 1] }
    });

    setSpinning(false);
    onSpinEnd(topics[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center gap-8 relative py-12">
      {/* Pointer */}
      <div className="absolute top-8 z-10 w-8 h-8 flex justify-center">
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[25px] border-t-accent-secondary drop-shadow-md"></div>
      </div>

      {/* Wheel SVG */}
      <div className="relative w-72 h-72 md:w-96 md:h-96">
        <motion.div
          animate={controls}
          initial={{ rotate: 0 }}
          className="w-full h-full rounded-full border-[12px] border-primary/5 shadow-2xl overflow-hidden bg-white relative"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="1" />
                <feOffset dx="0" dy="1" result="offsetblur" />
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.3" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {topics.map((topic, i) => {
              const startAngle = i * segmentAngle;
              const endAngle = (i + 1) * segmentAngle;
              
              const x1 = 50 + 50 * Math.cos((Math.PI * (startAngle - 90)) / 180);
              const y1 = 50 + 50 * Math.sin((Math.PI * (startAngle - 90)) / 180);
              const x2 = 50 + 50 * Math.cos((Math.PI * (endAngle - 90)) / 180);
              const y2 = 50 + 50 * Math.sin((Math.PI * (endAngle - 90)) / 180);
              
              const largeArc = segmentAngle > 180 ? 1 : 0;
              
              // Map colors from our palette
              const colors = ['#93A8AC', '#E2B4BD', '#424B54', '#9B6A6C'];
              const fillColor = colors[i % colors.length];
              const textColor = (fillColor === '#424B54' || fillColor === '#9B6A6C') ? '#FFFFFF' : '#424B54';
              
              return (
                <g key={i}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={fillColor}
                    stroke="white"
                    strokeWidth="0.8"
                  />
                  <g transform={`rotate(${startAngle + segmentAngle / 2} 50 50)`}>
                    <text
                      x="50"
                      y="15"
                      fill={textColor}
                      fontSize={numSegments > 20 ? "1.5" : numSegments > 10 ? "2.2" : "2.8"}
                      fontWeight="700"
                      textAnchor="middle"
                      className="pointer-events-none uppercase tracking-[0.1em]"
                    >
                      {i + 1}
                    </text>
                  </g>
                </g>
              );
            })}
            {/* Center cap */}
            <circle cx="50" cy="50" r="10" fill="#FFFFFF" filter="url(#shadow)" />
            <circle cx="50" cy="50" r="6" fill="#424B54" />
            <circle cx="50" cy="50" r="2.5" fill="#E2B4BD" />
          </svg>
        </motion.div>

      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="btn-primary flex items-center gap-2 group"
      >
        <span>Spin the Wheel</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`group-hover:rotate-180 transition-transform duration-500 ${spinning ? 'animate-spin' : ''}`}>
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          <path d="M16 10l4-4-4-4" />
          <path d="M20 4h-4" />
          <path d="M21 12v-4" />
        </svg>
      </button>
    </div>
  );
};

export default Wheel;
