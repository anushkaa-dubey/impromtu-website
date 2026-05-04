import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Lightbulb, BarChart3, MessageSquare } from 'lucide-react';

const ReportCard = ({ result }) => {
  if (!result) return null;

  const { clarity_score, confidence_score, filler_word_feedback, structure_feedback, improvement_tips } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-12 bg-white rounded-large shadow-soft border border-secondary/10 overflow-hidden"
    >
      <div className="bg-primary p-6 text-white text-center">
        <h3 className="text-2xl font-bold font-heading">AI Speech Analysis</h3>
        <p className="text-secondary/80 text-sm">Personalized feedback for your session</p>
      </div>

      <div className="p-8 space-y-10">
        {/* Scores Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center p-6 bg-accent-primary/10 rounded-medium border border-accent-primary/20">
            <span className="text-xs font-bold text-accent-secondary uppercase tracking-widest mb-2">Clarity Score</span>
            <div className="relative w-24 h-24 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(226, 180, 189, 0.2)" strokeWidth="6" />
                 <circle 
                   cx="48" cy="48" r="40" fill="transparent" stroke="#E2B4BD" strokeWidth="6" 
                   strokeDasharray={2 * Math.PI * 40} 
                   strokeDashoffset={2 * Math.PI * 40 * (1 - clarity_score / 10)} 
                   strokeLinecap="round"
                   className="transition-all duration-1000"
                 />
               </svg>
               <span className="absolute text-2xl font-bold text-primary">{clarity_score}/10</span>
            </div>
          </div>

          <div className="flex flex-col items-center p-6 bg-secondary/10 rounded-medium border border-secondary/20">
            <span className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Confidence Score</span>
            <div className="relative w-24 h-24 flex items-center justify-center">
               <svg className="w-full h-full transform -rotate-90">
                 <circle cx="48" cy="48" r="40" fill="transparent" stroke="rgba(147, 168, 172, 0.2)" strokeWidth="6" />
                 <circle 
                   cx="48" cy="48" r="40" fill="transparent" stroke="#93A8AC" strokeWidth="6" 
                   strokeDasharray={2 * Math.PI * 40} 
                   strokeDashoffset={2 * Math.PI * 40 * (1 - confidence_score / 10)} 
                   strokeLinecap="round"
                   className="transition-all duration-1000"
                 />
               </svg>
               <span className="absolute text-2xl font-bold text-primary">{confidence_score}/10</span>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="space-y-6">
          <div className="flex gap-4 items-start">
            <div className="p-2 bg-accent-primary/20 rounded-lg text-accent-secondary">
              <MessageSquare size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Filler Words Analysis</h4>
              <p className="text-secondary text-sm leading-relaxed">{filler_word_feedback}</p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="p-2 bg-secondary/20 rounded-lg text-secondary">
              <BarChart3 size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-1">Structure Feedback</h4>
              <p className="text-secondary text-sm leading-relaxed">{structure_feedback}</p>
            </div>
          </div>
        </div>

        {/* Improvement Tips */}
        <div className="bg-primary/5 p-6 rounded-medium border border-primary/10">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-accent-secondary" size={20} />
            <h4 className="text-sm font-bold text-primary uppercase tracking-wider">Improvement Tips</h4>
          </div>
          <ul className="space-y-3">
            {improvement_tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-secondary">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-primary mt-1.5 shrink-0" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportCard;
