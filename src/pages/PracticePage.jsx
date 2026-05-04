import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CategoryTabs from '../components/CategoryTabs';
import Wheel from '../components/Wheel';
import Timer from '../components/Timer';
import { TOPICS, CATEGORIES } from '../data/topics';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, RefreshCcw } from 'lucide-react';

const PracticePage = () => {
  const [activeCategory, setActiveCategory] = useState('Random');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isTimerVisible, setIsTimerVisible] = useState(false);

  const currentTopics = useMemo(() => {
    if (activeCategory === 'Random') {
      // Merge all topics from all categories
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
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-6 py-12">
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

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-12 bg-white p-8 md:p-12 rounded-large shadow-soft border border-secondary/10">
          <div className="flex flex-col items-center">
             <Wheel topics={currentTopics} onSpinEnd={handleSpinEnd} />
             {selectedTopic && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="mt-4 text-center"
               >
                 <span className="text-sm font-bold text-accent-secondary uppercase tracking-widest">Selected Topic</span>
                 <p className="text-xl font-bold text-primary mt-1 px-4">"{selectedTopic}"</p>
               </motion.div>
             )}
          </div>


          <div className="flex flex-col items-center justify-center min-h-[400px]">
             <AnimatePresence mode="wait">
                {selectedTopic ? (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center text-center w-full"
                  >
                    <div className="mb-6 p-4 bg-accent-primary/20 rounded-full">
                       <Trophy className="text-accent-secondary" size={40} />
                    </div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent-secondary mb-2">Your Topic</h3>
                    <p className="text-2xl font-bold text-primary mb-8 leading-tight italic">
                      "{selectedTopic}"
                    </p>
                    
                    <Timer autoStart={true} onComplete={() => console.log('Speech finished')} />

                    
                    <button 
                      onClick={handleReset}
                      className="mt-8 flex items-center gap-2 text-secondary hover:text-primary transition-colors text-sm font-semibold"
                    >
                      <RefreshCcw size={16} />
                      Pick another topic
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                       <RefreshCcw className="text-secondary/40 animate-pulse" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-secondary/60">Ready when you are</h3>
                    <p className="text-secondary/40 text-sm max-w-[200px] mx-auto mt-2">
                       Spin the wheel on the left to reveal your challenge.
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
