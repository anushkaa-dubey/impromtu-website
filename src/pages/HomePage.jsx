import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mic, Zap, TrendingUp, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import FooterImg from '../assets/footer img.jpg';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-accent-primary/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-primary leading-tight mb-6">
              Impromptu Practice <br />
              <span className="text-accent-secondary">Made Simple</span>
            </h1>
            <p className="text-xl md:text-2xl text-secondary font-body max-w-2xl mx-auto mb-10 leading-relaxed">
              Practice speaking with random topics and improve clarity and confidence. Master the art of thinking on your feet.
            </p>
            <Link
              to="/practice"
              className="inline-block px-12 py-5 bg-accent-primary text-primary text-lg font-bold rounded-large shadow-soft hover:bg-accent-secondary hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Start Practicing Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        id="about"
        className="py-20 px-6 bg-secondary/5"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-accent-secondary font-bold tracking-widest uppercase text-sm">About Impromptu</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary mt-2 mb-6">Master the Art of Spontaneous Speech</h2>
            <p className="text-lg text-secondary leading-relaxed mb-6">
              In a world where quick thinking is a superpower, Impromptu provides a modern platform to hone your speaking skills. Whether you're preparing for interviews, presentations, or social gatherings, our tool helps you bridge the gap between thought and expression.
            </p>
            <div className="flex gap-4">
              <div className="p-3 bg-white rounded-medium shadow-soft">
                <Mic className="text-accent-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-primary">Vocal Clarity</h4>
                <p className="text-secondary text-sm">Improve your diction and tone with consistent practice.</p>
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ rotate: 0, scale: 1.02 }}
            className="bg-white p-2 rounded-large shadow-xl transform rotate-2 transition-transform duration-500"
          >
            <div className="bg-secondary/20 rounded-[inherit] overflow-hidden">
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-accent-primary rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Zap size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Confidence is Key</h3>
                <p className="text-secondary italic">"The secret of success in life is to be ready for your opportunity when it comes."</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary">How It Works</h2>
            <p className="text-secondary mt-2">Three simple steps to better speaking</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <HelpCircle className="text-accent-secondary" size={32} />,
                title: "Choose a Category",
                desc: "Select from tech, science, fashion, or go random for a true challenge."
              },
              {
                icon: <Zap className="text-accent-primary" size={32} />,
                title: "Spin the Wheel",
                desc: "Let fate decide your topic. You'll get a unique prompt every time."
              },
              {
                icon: <Mic className="text-primary" size={32} />,
                title: "Speak & Time",
                desc: "Articulate your thoughts within the set time limits and track your progress."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center p-8 rounded-large bg-white border border-secondary/10 shadow-soft hover:shadow-md transition-shadow"
              >
                <div className="mb-6 p-4 rounded-full bg-background ring-8 ring-secondary/5">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-secondary">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 px-6 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-40 h-40 border border-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/2 w-60 h-60 border-4 border-white rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Why Practice Impromptu Speaking?</h2>
            <ul className="space-y-6">
              {[
                { icon: <TrendingUp size={20} />, text: "Build instant confidence in high-pressure situations." },
                { icon: <TrendingUp size={20} />, text: "Refine your storytelling ability and structure." },
                { icon: <TrendingUp size={20} />, text: "Reduce filler words and 'um's' in your speech." },
                { icon: <TrendingUp size={20} />, text: "Sharpen your logical reasoning and quick thinking." }
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-5 items-center"
                >
                  <span className="p-2 bg-accent-primary text-primary rounded-medium">{item.icon}</span>
                  <span className="text-xl opacity-95">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="absolute -inset-4 bg-accent-primary/30 blur-3xl rounded-full group-hover:bg-accent-primary/40 transition-all duration-500"></div>
              <div className="relative rounded-large overflow-hidden border-4 border-white/20 shadow-2xl transform transition-transform duration-500 hover:scale-105">
                <img
                  src={FooterImg}
                  alt="Impromptu Speaking"
                  className="w-full h-auto max-w-md object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
};

export default HomePage;
