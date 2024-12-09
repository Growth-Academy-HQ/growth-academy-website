import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useAuth, useUser } from '@clerk/clerk-react';
import { useClerkSupabaseClient } from '../../utils/supabase';
import { useSubscriptions } from '../../utils/subscriptions';
import { generateMarketingPlan } from '../../services/claude-ai';
import MarketingPlanResult from './MarketingPlanResult';
import { validateData, sanitizeInput, validationRules } from '../../utils/validation';
import { v4 as uuidv4 } from 'uuid';

const MarketingPlanGenerator = () => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const supabase = useClerkSupabaseClient();
  const { currentPlan, usageCount, remainingGenerations, planLimit } = useSubscriptions();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState({
    planName: '',
    businessIdea: '',
    targetMarket: '',
    currentStage: '',
    marketingGoals: '',
    budget: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  useEffect(() => {
    if (!user) {
      setError('Please sign in to continue');
      return;
    }

    if (!currentPlan === 'free') {
      setError('Please upgrade to a paid plan to use this feature');
      return;
    }
  }, [user, currentPlan]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    if (remainingGenerations <= 0) {
      setError(`You've reached your ${currentPlan} plan limit for this month. Please upgrade to generate more plans.`);
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 95));
    }, 500);
  
    try {
      // Validate inputs
      const validationErrors = validateData(formData, validationRules.marketingPlan);
      if (validationErrors.length > 0) {
        throw new Error(validationErrors[0].message);
      }

      // Get fresh token
      const token = await getToken({ template: 'supabase' });
      if (!token) {
        throw new Error('Failed to get authentication token');
      }

      // Generate the plan
      console.log('Generating marketing plan...');
      const generatedResponse = await generateMarketingPlan(
        formData,
        token,
        currentPlan
      );

      if (!generatedResponse?.content) {
        throw new Error('Invalid response from AI service');
      }

      // Save to Supabase
      try {
        const planData = {
          user_id: user.id,
          plan_name: formData.planName,
          business_idea: formData.businessIdea,
          target_market: formData.targetMarket,
          current_stage: formData.currentStage,
          marketing_goals: formData.marketingGoals,
          budget: formData.budget,
          generated_plan: {
            content: generatedResponse.content[0],
            timestamp: new Date().toISOString(),
            model: generatedResponse.model || 'claude-3',
          },
          created_at: new Date().toISOString()
        };

        const { error: saveError } = await supabase
          .from('marketing_plans')
          .insert([planData]);

        if (saveError) {
          console.error('Error saving to Supabase:', saveError);
          // Continue showing results even if save fails
        } else {
          console.log('Plan saved successfully to Supabase');
        }
      } catch (saveError) {
        console.error('Failed to save plan:', saveError);
        // Continue showing results even if save fails
      }

      setGeneratedPlan(generatedResponse);
      setShowResults(true);
      setProgress(100);

    } catch (error) {
      console.error('Generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate plan');
    } finally {
      clearInterval(progressInterval);
      setIsGenerating(false);
    }
  };

  if (showResults && generatedPlan) {
    return (
      <MarketingPlanResult 
        plan={generatedPlan}
        inputs={formData}
        onBack={() => setShowResults(false)}
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-4xl mx-auto px-4 py-8"
    >
      <div className="bg-ga-black/50 border border-ga-white/10 rounded-lg overflow-hidden">
        <div className="p-8 border-b border-ga-white/10">
          <div className="flex items-center space-x-6">
            <img 
              src="/assets/growth-ai-logo.svg" 
              alt="GrowthAI" 
              className="w-16 h-16"
            />
            <div>
              <h2 className="text-3xl font-alata text-ga-white">
                Marketing Plan Generator
              </h2>
              <p className="text-ga-white/70 mt-2">
                Create your custom marketing strategy in minutes
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 border-b border-ga-white/10 bg-ga-black/30">
          <div className="flex justify-between items-center">
            <div className="text-ga-white/70">
              <span className="font-medium">{remainingGenerations}</span> of {planLimit} generations remaining this month
            </div>
            <div className="text-ga-white/70">
              Plan: <span className="font-medium capitalize">{currentPlan}</span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Plan Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-ga-white">
              Plan Name
            </label>
            <input 
              type="text"
              placeholder="e.g., Summer Campaign 2024"
              value={formData.planName}
              onChange={(e) => handleInputChange('planName', e.target.value)}
              className="w-full px-3 py-2 bg-ga-black/30 border border-ga-white/10 rounded-md text-ga-white placeholder:text-ga-white/50 focus:outline-none focus:ring-2 focus:ring-ga-white/20"
            />
          </div>

          {/* Business Idea */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-ga-white">
              Business Idea
            </label>
            <textarea
              placeholder="Describe your business idea or product..."
              value={formData.businessIdea}
              onChange={(e) => handleInputChange('businessIdea', e.target.value)}
              className="w-full min-h-[100px] px-3 py-2 bg-ga-black/30 border border-ga-white/10 rounded-md text-ga-white placeholder:text-ga-white/50 focus:outline-none focus:ring-2 focus:ring-ga-white/20"
            />
          </div>

          {/* Target Market */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-ga-white">
              Target Market
            </label>
            <textarea
              placeholder="Who are your ideal customers?"
              value={formData.targetMarket}
              onChange={(e) => handleInputChange('targetMarket', e.target.value)}
              className="w-full px-3 py-2 bg-ga-black/30 border border-ga-white/10 rounded-md text-ga-white placeholder:text-ga-white/50 focus:outline-none focus:ring-2 focus:ring-ga-white/20"
            />
          </div>

          {/* Current Stage */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-ga-white">
              Current Stage
            </label>
            <select
              value={formData.currentStage}
              onChange={(e) => handleInputChange('currentStage', e.target.value)}
              className="w-full px-3 py-2 bg-ga-black/30 border border-ga-white/10 rounded-md text-ga-white focus:outline-none focus:ring-2 focus:ring-ga-white/20"
            >
              <option value="">Select your business stage</option>
              <option value="idea">Just an idea</option>
              <option value="early">Early stage (0-1000 users)</option>
              <option value="growing">Growing (1000-10000 users)</option>
              <option value="established">Established (10000+ users)</option>
            </select>
          </div>

          {/* Marketing Goals */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-ga-white">
              Marketing Goals
            </label>
            <textarea
              placeholder="What are your main marketing objectives?"
              value={formData.marketingGoals}
              onChange={(e) => handleInputChange('marketingGoals', e.target.value)}
              className="w-full px-3 py-2 bg-ga-black/30 border border-ga-white/10 rounded-md text-ga-white placeholder:text-ga-white/50 focus:outline-none focus:ring-2 focus:ring-ga-white/20"
            />
          </div>

          {/* Monthly Budget */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-ga-white">
              Monthly Budget
            </label>
            <select
              value={formData.budget}
              onChange={(e) => handleInputChange('budget', e.target.value)}
              className="w-full px-3 py-2 bg-ga-black/30 border border-ga-white/10 rounded-md text-ga-white focus:outline-none focus:ring-2 focus:ring-ga-white/20"
            >
              <option value="">Select your budget range</option>
              <option value="small">Small ($500-$2000)</option>
              <option value="medium">Medium ($2000-$5000)</option>
              <option value="large">Large ($5000+)</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !formData.planName || !formData.businessIdea || !formData.targetMarket || !formData.currentStage || !formData.marketingGoals || !formData.budget}
            className="w-full px-6 py-3 bg-ga-white text-ga-black hover:bg-ga-light transition-colors rounded-md font-alata disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Plan ({progress}%)</span>
              </div>
            ) : (
              'Generate Marketing Plan'
            )}
          </button>

          {error && (
            <div className="text-red-400 text-sm mt-2">
              {error}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MarketingPlanGenerator;