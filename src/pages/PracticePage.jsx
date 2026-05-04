import React, { useState, useMemo, useCallback } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import Wheel from '../components/Wheel';
import Timer from '../components/Timer';
import SpeechRecorder from '../components/SpeechRecorder';
import TranscriptDisplay from '../components/TranscriptDisplay';
import AnalyzeButton from '../components/AnalyzeButton';
import ReportModal from '../components/ReportModal';
import { TOPICS } from '../data/topics';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCcw, Layout, Mic2 } from 'lucide-react';

const PracticePage = () => {
  const [activeCategory, setActiveCategory] = useState('Random');
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // Speech & AI State
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessingTranscript, setIsProcessingTranscript] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTopics = useMemo(() => {
    if (activeCategory === 'Random') {
      return Object.values(TOPICS).flat();
    }
    return TOPICS[activeCategory] || [];
  }, [activeCategory]);

  const handleSpinEnd = (topic) => {
    setSelectedTopic(topic);
  };

  const handleReset = () => {
    setSelectedTopic(null);
    setTranscript('');
    setIsRecording(false);
    setAnalysisResult(null);
    setIsAnalyzing(false);
    setIsModalOpen(false);
  };

  const handleStartPractice = useCallback(() => {
    setIsRecording(true);
    setTranscript('');
    setAnalysisResult(null);
  }, []);

  const handleStopPractice = useCallback(() => {
    setIsRecording(false);
    setIsProcessingTranscript(true);
    setTimeout(() => {
      setIsProcessingTranscript(false);
    }, 1500);
  }, []);

  const handleTranscriptUpdate = useCallback((newText) => {
    setTranscript(prev => (prev ? prev + ' ' : '') + newText);
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
      setIsModalOpen(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze speech. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-[1200px] mx-auto px-6 py-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-left">
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-primary mb-2 flex items-center gap-3">
              <Layout className="text-accent-primary" size={28} />
              Practice Station
            </h1>
            <p className="text-secondary text-sm max-w-md">
              Choose your category, spin the wheel, and deliver your masterly impromptu speech.
            </p>
          </div>
          
          <div className="shrink-0">
            <CategoryTabs 
              activeCategory={activeCategory} 
              onCategoryChange={(cat) => {
                setActiveCategory(cat);
                handleReset();
              }} 
            />
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column (60%): Topic Wheel */}
          <div className="lg:col-span-7 flex flex-col bg-white rounded-2xl shadow-md border border-secondary/10 overflow-hidden">
             <div className="p-4 border-b border-secondary/5 bg-primary/5 flex justify-between items-center">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest font-heading">Topic Generator</span>
                {selectedTopic && (
                   <button onClick={handleReset} className="text-[10px] font-bold text-accent-secondary flex items-center gap-1 hover:underline">
                     <RefreshCcw size={12} /> RESET WHEEL
                   </button>
                )}
             </div>
             
             <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[450px]">
                <Wheel topics={currentTopics} onSpinEnd={handleSpinEnd} />
                <AnimatePresence>
                  {selectedTopic && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 text-center bg-accent-primary/10 px-8 py-4 rounded-2xl border border-accent-primary/20 w-full max-w-md"
                    >
                      <span className="text-[9px] font-bold text-accent-secondary uppercase tracking-[0.2em] block mb-1">Current Challenge</span>
                      <p className="text-lg font-bold text-primary italic leading-tight font-heading">"{selectedTopic}"</p>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

          {/* Right Column (40%): Timer & Controls */}
          <div className="lg:col-span-5 flex flex-col gap-8">
             <div className="bg-white rounded-2xl shadow-md border border-secondary/10 p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-secondary/5">
                   <Mic2 className="text-accent-secondary" size={18} />
                   <h3 className="text-xs font-bold text-primary uppercase tracking-widest font-heading">Session Controls</h3>
                </div>

                <AnimatePresence mode="wait">
                   {selectedTopic ? (
                     <motion.div
                       key="controls"
                       initial={{ opacity: 0, scale: 0.98 }}
                       animate={{ opacity: 1, scale: 1 }}
                       className="flex flex-col flex-1"
                     >
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

                       <div className="mt-auto pt-6">
                         {transcript && !isRecording && (
                           <AnalyzeButton 
                             onClick={handleAnalyze}
                             isAnalyzing={isAnalyzing}
                             disabled={isProcessingTranscript}
                           />
                         )}
                       </div>
                     </motion.div>
                   ) : (
                     <div className="flex-1 flex flex-col items-center justify-center py-10 opacity-40">
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                           <RefreshCcw size={24} />
                        </div>
                        <p className="text-sm font-medium text-secondary">Spin the wheel to unlock controls</p>
                     </div>
                   )}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </main>

      <ReportModal 
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         result={analysisResult}
         transcript={transcript}
         topic={selectedTopic}
      />

      <Footer />
    </div>
  );
};

export default PracticePage;
