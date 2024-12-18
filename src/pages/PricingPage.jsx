import { motion } from 'framer-motion';
import { useSubscriptions } from '../utils/subscriptions';
import { useUser } from "@clerk/clerk-react";
import { useState } from 'react';
import { WelcomeModal } from '../components/WelcomeModal';
import { Check, Zap, Clock, Mail, BookOpen, Phone, Star } from 'lucide-react';

export function PricingPage() {
  const { createCheckoutSession, currentPlan, isLoading } = useSubscriptions();
  const { user } = useUser();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  if (user && isLoading) {
    return (
      <div className="min-h-screen bg-ga-black pt-20">
        <div className="container mx-auto px-4">
          <p className="text-ga-white">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  console.log('Current Plan:', currentPlan);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getButtonConfig = (planType) => {
    if (!user) {
      return {
        text: 'Get Started',
        disabled: false,
        className: `w-full px-6 py-3 ${planType === 'pro' ? 'bg-ga-white text-ga-black' : 'bg-ga-black text-ga-white'} rounded-lg hover:opacity-90 transition-colors`
      };
    }

    console.log('Checking plan:', planType, 'Current:', currentPlan);

    if (currentPlan === planType) {
      return {
        text: 'Current Plan',
        disabled: true,
        className: 'w-full px-6 py-3 bg-ga-white/10 text-ga-white rounded-lg cursor-not-allowed'
      };
    }

    const isUpgrade = (currentPlan === 'free' && ['pro', 'expert'].includes(planType)) ||
                     (currentPlan === 'pro' && planType === 'expert');
    const isDowngrade = (currentPlan === 'expert' && ['pro', 'free'].includes(planType)) ||
                       (currentPlan === 'pro' && planType === 'free');

    return {
      text: isUpgrade ? `Upgrade to ${planType}` : isDowngrade ? 'Downgrade' : 'Select Plan',
      disabled: isLoading,
      className: `w-full px-6 py-3 ${planType === 'pro' ? 'bg-ga-white text-ga-black' : 'bg-ga-black text-ga-white'} rounded-lg hover:opacity-90 transition-colors`
    };
  };

  const handleButtonClick = (planType, priceId) => {
    if (!user) {
      setShowWelcomeModal(true);
      localStorage.setItem('selectedPlan', planType);
      localStorage.setItem('selectedPriceId', priceId);
    } else {
      createCheckoutSession(priceId);
    }
  };

  return (
    <div className="min-h-screen bg-ga-black">
      <motion.div 
        className="text-center py-16 border-b border-ga-white/10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-ga-white mb-4">Pricing</h1>
        <p className="text-ga-white/70 max-w-2xl mx-auto">
          {user 
            ? "Choose the perfect plan for your marketing needs. Upgrade anytime as your business grows."
            : "Create your account to get started with AI-powered marketing strategies tailored to your business needs."}
        </p>
        {user && currentPlan && (
          <div className="mt-4 text-ga-white/90">
            Your current plan: <span className="font-bold capitalize">{currentPlan}</span>
          </div>
        )}
      </motion.div>

      <motion.div 
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto py-8">
          {/* Free Tier */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-ga-black/50 border border-ga-white/10 rounded-lg p-6 flex flex-col h-full"
          >
            <h2 className="text-2xl font-bold text-ga-white mb-4">Growth Starter</h2>
            <p className="text-3xl font-bold text-ga-white mb-6">Free</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-ga-white/70">
                <Zap className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>1 generation per month</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <BookOpen className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Newsletter access</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <Mail className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Email Support</span>
              </li>
            </ul>
            <button 
              onClick={() => handleButtonClick('free')}
              {...getButtonConfig('free')}
            >
              {user && isLoading ? 'Processing...' : getButtonConfig('free').text}
            </button>
          </motion.div>

          {/* Pro Tier */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="relative bg-ga-black/50 border border-ga-white/30 rounded-lg p-6 flex flex-col h-full transform scale-105 shadow-2xl -mx-4"
          >
            {/* Most Popular Tag - Fixed positioning and styling */}
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-ga-white text-ga-black px-6 py-1 rounded-full text-sm font-bold shadow-lg"
              >
                Most Popular
              </motion.div>
            </div>

            {/* Glow Effect */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0)",
                  "0 0 20px 10px rgba(255, 255, 255, 0.1)",
                  "0 0 0 0 rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute inset-0 rounded-lg"
            />

            {/* Existing Content */}
            <h2 className="text-2xl font-bold text-ga-white mb-4">Growth Pro</h2>
            <p className="text-3xl font-bold text-ga-white mb-6">$29.99/mo</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-ga-white/70">
                <Zap className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>10 AI Marketing Plan generations</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <Phone className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Monthly 30-min consultation with marketing expert</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <BookOpen className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Premium Resources (E-books, templates, etc.)</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <Star className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Newsletter access</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <Mail className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Priority Email Support</span>
              </li>
            </ul>
            <button 
              onClick={() => handleButtonClick('pro', 'price_1QS3WrDx4hYKRW6tovZXvOiB')}
              {...getButtonConfig('pro')}
            >
              {user && isLoading ? 'Processing...' : getButtonConfig('pro').text}
            </button>
          </motion.div>

          {/* Expert Tier */}
          <motion.div 
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-ga-black/50 border border-ga-white/30 rounded-lg p-6 flex flex-col h-full"
          >
            <h2 className="text-2xl font-bold text-ga-white mb-4">Growth Expert</h2>
            <p className="text-3xl font-bold text-ga-white mb-6">$49.99/mo</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-ga-white/70">
                <Zap className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>20 AI Marketing Plans</span> 
              </li>
              <li className="flex items-center text-ga-white/70">
                <Phone className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>Monthly VIP Consultation with Marketing Expert</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <Mail className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>VIP support (Email, Direct Messaging)</span>
              </li>
              <li className="flex items-center text-ga-white/70">
                <Check className="w-5 h-5 mr-3 text-ga-white/50" />
                <span>All Pro features, Plus expert benefits</span>
              </li>
            </ul>
            <button 
              onClick={() => handleButtonClick('expert', 'price_1QS3XWDx4hYKRW6tQoxNOwzZ')}
              {...getButtonConfig('expert')}
            >
              {user && isLoading ? 'Processing...' : getButtonConfig('expert').text}
            </button>
          </motion.div>
        </div>

        {/* Additional Sections Below Cards */}
        <motion.div 
          className="mt-24 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {/* FAQ Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-ga-white mb-8">Frequently Asked Questions</h2>
            <div className="grid gap-6 text-left">
              <div className="border-b border-ga-white/10 pb-4">
                <h3 className="text-ga-white font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-ga-white/70">Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              <div className="border-b border-ga-white/10 pb-4">
                <h3 className="text-ga-white font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-ga-white/70">We accept all major credit cards.</p>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-ga-white mb-8">What Our Customers Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-ga-black/30 p-6 rounded-lg">
                <p className="text-ga-white/90 italic mb-4">"The Growth Pro plan has transformed our marketing strategy completely."</p>
                <p className="text-ga-white/70">- Marketing Director</p>
              </div>
              <div className="bg-ga-black/30 p-6 rounded-lg">
                <p className="text-ga-white/90 italic mb-4">"Expert consultations have been invaluable for our growth."</p>
                <p className="text-ga-white/70">- Startup Founder</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-ga-white/5 rounded-xl p-12">
            <h2 className="text-2xl font-bold text-ga-white mb-4">Still have questions?</h2>
            <p className="text-ga-white/70 mb-6">Our team is here to help you choose the right plan for your needs.</p>
            <button className="px-8 py-3 bg-ga-white text-ga-black rounded-lg hover:bg-ga-white/90 transition-colors">
              Contact Us
            </button>
          </div>
        </motion.div>
      </motion.div>

      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
    </div>
  );
}

export default PricingPage;