import React, { useState, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import Wheel from '../components/Wheel';
import Timer from '../components/Timer';
import SpeechRecorder from '../components/SpeechRecorder';
import TranscriptDisplay from '../components/TranscriptDisplay';
import AnalyzeButton from '../components/AnalyzeButton';
import ReportCard from '../components/ReportCard';
import { TOPICS, CATEGORIES } from '../data/topics';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw, Mic } from 'lucide-react';

const PracticePage = () => {
  const [activeCategory, setActiveCategory] = useState('Random');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);
  
  // Speech & AI State
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);

  const currentTopics = useMemo(() => {
    if (activeCategory === 'Random') {
      return Object.values(TOPICS).flat();
    }
    return TOPICS[activeCategory] || [];
  }, [activeCategory]);

  const handleSpinEnd = (topic) => {
    setSelectedTopic(topic);
    setIsTimerVisible(true);
  };

  const handleReset = () => {
    setSelectedTopic(null);
    setIsTimerVisible(false);
    setTranscript('');
    setIsRecording(false);
    setAnalysisResult(null);
    setIsAnalyzing(false);
  };

  const handleStartPractice = useCallback(() => {
    setIsRecording(true);
    setTranscript('');
    setAnalysisResult(null);
  }, []);

  const handleStopPractice = useCallback(() => {
    setIsRecording(false);
    setIsProcessingTranscript(true);
    // Add a slight delay to ensure the final transcript is captured
    setTimeout(() => {
      setIsProcessingTranscript(false);
    }, 1500);
  }, []);

  const handleTranscriptUpdate = useCallback((newText) => {
    setTranscript(prev => prev + ' ' + newText);
  }, []);

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: transcript.trim().substring(0, 2000) })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setAnalysisResult(data);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze speech. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary mb-4">Practice Station</h1>
          <p className="text-secondary max-w-xl mx-auto">
            Choose your category, spin the wheel, and start your journey towards masterly communication.
          </p>
        </header>

        <CategoryTabs 
          activeCategory={activeCategory} 
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            handleReset();
          }} 
        />

        <div className="grid lg:grid-cols-12 gap-8 items-start mt-12 bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-large shadow-soft border border-secondary/10">
          {/* Left Column: Wheel and Topic */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center bg-background/50 rounded-medium p-8 border border-secondary/5 h-full min-h-[500px]">
             <Wheel topics={currentTopics} onSpinEnd={handleSpinEnd} />
             {selectedTopic && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="mt-6 text-center bg-white px-8 py-4 rounded-3xl shadow-sm border border-accent-primary/20 w-full max-w-sm"
               >
                 <span className="text-[10px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-1 font-heading">Current Topic</span>
                 <p className="text-xl font-bold text-primary italic leading-tight">"{selectedTopic}"</p>
               </motion.div>
             )}
          </div>

          {/* Right Column: Practice Controls & Results */}
          <div className="lg:col-span-6 flex flex-col items-center bg-primary/5 rounded-medium p-8 border border-primary/10 min-h-[500px]">
             <AnimatePresence mode="wait">
                {selectedTopic ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    {!transcript && !isRecording && !analysisResult && (
                      <div className="mb-8 p-4 bg-accent-primary/20 rounded-full ring-8 ring-accent-primary/5">
                         <Trophy className="text-accent-secondary" size={48} />
                      </div>
                    )}
                    
                    <Timer 
                      onStart={handleStartPractice} 
                      onComplete={handleStopPractice} 
                    />

                    <SpeechRecorder 
                      isRecording={isRecording}
                      onTranscriptUpdate={handleTranscriptUpdate}
                      onStop={() => setIsRecording(false)}
                    />

                    <TranscriptDisplay 
                      transcript={transcript}
                      isRecording={isRecording}
                      isProcessing={isProcessingTranscript}
                    />

                    {transcript && !isRecording && !analysisResult && (
                      <AnalyzeButton 
                        onClick={handleAnalyze}
                        isAnalyzing={isAnalyzing}
                      />
                    )}

                    {analysisResult && (
                      <ReportCard result={analysisResult} />
                    )}
                    
                    <button 
                      onClick={handleReset}
                      className="mt-10 flex items-center gap-2 text-secondary hover:text-accent-secondary transition-colors text-sm font-bold uppercase tracking-widest"
                    >
                      <RefreshCcw size={16} />
                      Choose New Topic
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-secondary/20">
                       <RefreshCcw className="text-secondary/30 animate-spin-slow" size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-primary/40">Ready to Spin?</h3>
                    <p className="text-secondary/50 text-sm max-w-[240px] mx-auto mt-4 leading-relaxed">
                       Spin the wheel to reveal your next challenge and start your session.
                    </p>
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default PracticePage;
