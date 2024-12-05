import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useClerkSupabaseClient } from '../utils/supabase';
import MarketingPlanGenerator from '../components/marketing-generator/MarketingPlanGenerator';
import { WelcomeModal } from '../components/WelcomeModal';

const GrowthAIPage = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const supabase = useClerkSupabaseClient();

  useEffect(() => {
    // Show welcome modal for non-authenticated users
    if (!user) {
      setShowWelcomeModal(true);
      return;
    }

    const checkSubscription = async () => {
      if (!user || !supabase) return;
      
      try {
        // Get fresh token
        const token = await getToken({ template: 'supabase' });
        if (!token) throw new Error('No auth token');

        // Set auth header
        supabase.rest.headers['Authorization'] = `Bearer ${token}`;

        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching subscription:', error);
        } else {
          setSubscription(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscription();
  }, [user, supabase, getToken]);

  // Show welcome modal for non-authenticated users
  if (!user) {
    return (
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-ga-black to-ga-black/90">
        <div className="container mx-auto px-6 py-24 text-ga-white">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Show Marketing Plan Generator for:
  // 1. Pro/Expert subscribers
  // 2. Free users who haven't used their one-time access
  // 3. Users with existing marketing plans
  const canAccessGenerator = 
    subscription?.plan_type === 'pro' || 
    subscription?.plan_type === 'expert' ||
    subscription?.plan_type === 'free';

  if (!canAccessGenerator) {
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
      <section className="container mx-auto px-6 py-12 text-ga-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-50" />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center space-y-4 relative z-10"
        >
          <h1 className="text-4xl font-alata">
            Marketing Plan Generator
          </h1>
          {subscription?.plan_type === 'free' ? (
            <p className="text-ga-light text-lg">
              You have one free marketing plan generation available. Make it count!
            </p>
          ) : (
            <p className="text-ga-light text-lg">
              Generate custom marketing strategies tailored to your business needs
            </p>
          )}
          
          {/* Usage Stats */}
          <div className="mt-6 p-4 bg-ga-black/30 rounded-lg inline-block">
            <p className="text-sm text-ga-light">
              {subscription?.plan_type === 'pro' ? (
                'Pro Plan: 10 generations remaining this month'
              ) : subscription?.plan_type === 'expert' ? (
                'Expert Plan: 30 generations remaining this month'
              ) : (
                'Free Plan: 1 generation available'
              )}
            </p>
          </div>
        </motion.div>
      </section>
      
      {/* Generator Interface */}
      <motion.section 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="container mx-auto px-6 py-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-ga-black/30 border border-ga-white/10 rounded-xl p-8 backdrop-blur-sm">
            <MarketingPlanGenerator 
              subscription={subscription}
              className="w-full"
            />
          </div>
          
          {/* Tips Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="p-4 bg-ga-black/20 rounded-lg border border-ga-white/5">
              <h3 className="text-ga-white font-semibold mb-2">Pro Tip</h3>
              <p className="text-ga-light text-sm">
                Be specific about your target audience and business goals for better results
              </p>
            </div>
            <div className="p-4 bg-ga-black/20 rounded-lg border border-ga-white/5">
              <h3 className="text-ga-white font-semibold mb-2">Best Practice</h3>
              <p className="text-ga-light text-sm">
                Include your current marketing challenges to get more targeted strategies
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default GrowthAIPage;