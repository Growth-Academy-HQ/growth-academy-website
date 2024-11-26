import React from 'react';
import { motion } from 'framer-motion';
// Update the import path to correctly point to the MarketingPlanGenerator component
import MarketingPlanGenerator from '../components/marketing-generator/MarketingPlanGenerator';

const GrowthAIPage = () => {
  console.log('GrowthAIPage is rendering');
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen"
    >
      <div style={{ color: 'red', fontSize: '24px', padding: '20px' }}>
        GrowthAIPage is rendering
      </div>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-ga-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
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
        </div>
      </section>
      
      {/* Generator Interface Section */}
      <section className="container mx-auto px-6 py-16">
        <MarketingPlanGenerator />
      </section>

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
            <div
              key={index}
              className="p-6 bg-ga-black/50 rounded-lg border border-ga-white/10 text-ga-white"
            >
              <h3 className="text-xl font-alata mb-4">{feature.title}</h3>
              <p className="text-ga-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-6 py-16 text-ga-white">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-alata mb-8">Start Growing Today</h2>
          <div className="p-8 bg-ga-black/50 rounded-lg border border-ga-white/10">
            <h3 className="text-2xl font-alata mb-2">Launch Offer</h3>
            <p className="text-4xl font-alata mb-4">$29</p>
            <p className="text-ga-light mb-6">Generate 5 custom marketing plans</p>
            <button
              className="w-full px-8 py-3 bg-ga-white text-ga-black font-alata rounded hover:bg-ga-light transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default GrowthAIPage;