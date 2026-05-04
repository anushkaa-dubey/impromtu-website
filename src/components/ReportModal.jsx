import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Lightbulb, BarChart3, MessageSquare, X, Trophy } from 'lucide-react';

const ReportModal = ({ isOpen, onClose, result, transcript, topic }) => {
  if (!isOpen || !result) return null;

  const { clarity_score, confidence_score, filler_word_feedback, structure_feedback, improvement_tips } = result;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-primary/40 backdrop-blur-md"
        />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-primary p-6 text-white flex justify-between items-center shrink-0">
            <div>
              <h3 className="text-xl font-bold font-heading flex items-center gap-2">
                <Trophy size={20} className="text-accent-primary" />
                Session Analysis
              </h3>
              <p className="text-secondary/80 text-xs mt-1">Personalized feedback by AI coach</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6 md:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Topic & Transcript Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-accent-secondary uppercase tracking-widest mb-2 font-heading">The Topic</h4>
                  <p className="text-lg font-bold text-primary italic leading-tight">"{topic}"</p>
                </div>
                
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <h4 className="text-[10px] font-bold text-secondary uppercase tracking-widest mb-2 font-heading">Your Transcript</h4>
                  <div className="max-h-[120px] overflow-y-auto pr-2">
                    <p className="text-xs text-secondary leading-relaxed italic">"{transcript}"</p>
                  </div>
                </div>
              </div>

              {/* Scores Section */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col items-center justify-center p-4 bg-accent-primary/5 rounded-2xl border border-accent-primary/20">
                  <span className="text-[9px] font-bold text-accent-secondary uppercase tracking-widest mb-2">Clarity</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90">
                       <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(226, 180, 189, 0.2)" strokeWidth="4" />
                       <circle 
                         cx="32" cy="32" r="28" fill="transparent" stroke="#E2B4BD" strokeWidth="4" 
                         strokeDasharray={2 * Math.PI * 28} 
                         strokeDashoffset={2 * Math.PI * 28 * (1 - clarity_score / 10)} 
                         strokeLinecap="round"
                       />
                     </svg>
                     <span className="absolute text-sm font-bold text-primary">{clarity_score}/10</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-secondary/5 rounded-2xl border border-secondary/20">
                  <span className="text-[9px] font-bold text-secondary uppercase tracking-widest mb-2">Confidence</span>
                  <div className="relative w-16 h-16 flex items-center justify-center">
                     <svg className="w-full h-full transform -rotate-90">
                       <circle cx="32" cy="32" r="28" fill="transparent" stroke="rgba(147, 168, 172, 0.2)" strokeWidth="4" />
                       <circle 
                         cx="32" cy="32" r="28" fill="transparent" stroke="#93A8AC" strokeWidth="4" 
                         strokeDasharray={2 * Math.PI * 28} 
                         strokeDashoffset={2 * Math.PI * 28 * (1 - confidence_score / 10)} 
                         strokeLinecap="round"
                       />
                     </svg>
                     <span className="absolute text-sm font-bold text-primary">{confidence_score}/10</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Feedback */}
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-accent-primary/20 rounded-lg text-accent-secondary shrink-0">
                      <MessageSquare size={16} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Filler Words</h4>
                      <p className="text-xs text-secondary leading-relaxed">{filler_word_feedback}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-secondary/20 rounded-lg text-secondary shrink-0">
                      <BarChart3 size={16} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Structure</h4>
                      <p className="text-xs text-secondary leading-relaxed">{structure_feedback}</p>
                    </div>
                  </div>
               </div>

               {/* Improvement Tips */}
               <div className="bg-primary/5 p-5 rounded-2xl border border-primary/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="text-accent-secondary" size={18} />
                    <h4 className="text-[10px] font-bold text-primary uppercase tracking-widest">Improvement Tips</h4>
                  </div>
                  <ul className="space-y-3">
                    {improvement_tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3 text-[11px] text-secondary">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-secondary/10 flex justify-center shrink-0">
            <button
              onClick={onClose}
              className="px-12 py-3 bg-primary text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              Close Analysis
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ReportModal;
