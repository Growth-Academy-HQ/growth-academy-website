import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../utils/supabase';
import MarketingPlanGenerator from '../components/marketing-generator/MarketingPlanGenerator';

const GrowthAIPage = () => {
  const { user } = useAuth();
  const [hasPurchased, setHasPurchased] = useState(false);

  useEffect(() => {
    const checkPurchase = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('purchases')
        .select('tier')
        .eq('user_id', user.id)
        .single();

      if (data) {
        setHasPurchased(true);
      }
    };

    checkPurchase();
  }, [user]);

  if (!hasPurchased) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-20 min-h-screen bg-gradient-to-b from-ga-black to-ga-black/90"
      >
        <div className="container mx-auto px-6 py-24 text-ga-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50" />
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
          >
            <h1 className="text-5xl font-alata">
              Unlock AI-Powered Marketing Plans
            </h1>
            <p className="text-xl text-ga-light">
              Choose a plan to start generating custom marketing strategies for your business
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/pricing"
                className="px-8 py-3 bg-ga-white text-ga-black font-alata rounded hover:bg-ga-light transition-colors"
              >
                View Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-gradient-to-b from-ga-black to-ga-black/90"
    >
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 text-ga-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50" />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-8 relative z-10"
        >
          <h1 className="text-5xl font-alata">
            AI-Powered Marketing Plan Generator
          </h1>
          <p className="text-xl text-ga-light">
            Transform your business ideas into actionable marketing strategies with our AI assistant.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="px-8 py-3 bg-ga-white text-ga-black font-alata rounded hover:bg-ga-light transition-colors"
            >
              Get Started
            </button>
            <button
              className="px-8 py-3 border border-ga-white text-ga-white font-alata rounded hover:bg-ga-white/10 transition-colors"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </section>
      
      {/* Generator Interface Section */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-16"
      >
        <MarketingPlanGenerator />
      </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Custom Marketing Plans',
              description: 'Get personalized marketing strategies tailored to your business needs and goals.'
            },
            {
              title: 'AI-Powered Insights',
              description: 'Leverage advanced AI to analyze market trends and optimize your marketing approach.'
            },
            {
              title: 'Actionable Steps',
              description: 'Receive clear, step-by-step guidance to implement your marketing strategy effectively.'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, translateY: -5 }}
              className="p-8 bg-gradient-to-b from-ga-black/80 to-ga-black/40 rounded-xl border border-ga-white/10 text-ga-white backdrop-blur-sm shadow-xl hover:border-ga-white/20 transition-all"
            >
              <h3 className="text-2xl font-alata mb-4">{feature.title}</h3>
              <p className="text-ga-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 py-16 text-ga-white"
      >
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-4xl font-alata mb-4">Start Growing Today</h2>
          <p className="text-ga-light mb-8">Take your marketing to the next level</p>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-8 bg-gradient-to-b from-ga-black/80 to-ga-black/40 rounded-xl border border-ga-white/10 shadow-xl"
          >
            <h3 className="text-2xl font-alata mb-2">Launch Offer</h3>
            <p className="text-4xl font-alata mb-4">$29</p>
            <p className="text-ga-light mb-6">Generate 5 custom marketing plans</p>
            <Link
              to="/pricing"
              className="block w-full px-8 py-3 bg-ga-white text-ga-black font-alata rounded hover:bg-ga-light transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default GrowthAIPage;