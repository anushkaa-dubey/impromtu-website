import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2 } from 'lucide-react';

const TranscriptDisplay = ({ transcript, isRecording, isProcessing }) => {
  if (!transcript && !isRecording && !isProcessing) return null;

  return (
    <div className="w-full mt-8">
      <div className="flex items-center gap-2 mb-3 px-1">
        <FileText className="text-secondary" size={18} />
        <h4 className="text-xs font-bold text-secondary uppercase tracking-[0.2em]">Your Speech Transcript</h4>
        {isRecording && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Live Recording</span>
          </div>
        )}
      </div>

      <div className="card h-[150px] overflow-y-auto bg-white border-secondary/20 relative p-4 rounded-xl shadow-sm">
        {isProcessing && !transcript ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary/60">
            <Loader2 className="animate-spin mb-2" size={24} />
            <p className="text-xs font-medium font-heading">Processing final transcript...</p>
          </div>
        ) : transcript ? (
          <p className="text-primary leading-relaxed text-xs">
            {transcript}
          </p>
        ) : isRecording ? (
          <p className="text-secondary/40 italic text-xs">
            Speaking... your words will appear here.
          </p>
        ) : (
          <p className="text-secondary/40 italic text-xs">
            {transcript === "" && !isRecording ? "No speech detected. Try again." : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default TranscriptDisplay;
