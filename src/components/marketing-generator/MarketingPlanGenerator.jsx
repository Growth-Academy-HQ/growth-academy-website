import React, { useState } from 'react';
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
  const { currentPlan } = useSubscriptions();
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 95));
    }, 500);
  
    const sanitizedData = {
      planName: sanitizeInput(formData.planName),
      businessIdea: sanitizeInput(formData.businessIdea),
      targetMarket: sanitizeInput(formData.targetMarket),
      currentStage: sanitizeInput(formData.currentStage),
      marketingGoals: sanitizeInput(formData.marketingGoals),
      budget: sanitizeInput(formData.budget),
    };
  
    try {
      // Get fresh token for AI request
      const aiToken = await refreshSupabaseToken();
      
      // Generate the plan
      const generatedResponse = await generateMarketingPlan(sanitizedData, aiToken, currentPlan);

      // Get another fresh token for Supabase save
      const supabaseToken = await refreshSupabaseToken();

      // Update Supabase client with fresh token
      await supabase.auth.setSession({
        access_token: supabaseToken,
        refresh_token: null
      });

      const planData = {
        user_id: user.id,
        business_idea: formData.businessIdea,
        target_market: formData.targetMarket,
        current_stage: formData.currentStage,
        marketing_goals: formData.marketingGoals,
        budget: formData.budget,
        plan_name: formData.planName || 'Winter Campaign',
        generated_plan: {
          content: generatedResponse.content[0],
          timestamp: new Date().toISOString(),
          version: '1.0'
        }
      };

      // Save to Supabase with fresh token
      const { data: savedPlan, error: saveError } = await supabase
        .from('marketing_plans')
        .insert(planData)
        .select()
        .single();

      if (saveError) {
        throw new Error(`Failed to save plan: ${saveError.message}`);
      }

      setGeneratedPlan(generatedResponse);
      setShowResults(true);

    } catch (error) {
      console.error('Full error:', error);
      setError(error.message || 'Failed to generate or save plan');
      
      // If it's a token error, provide a retry button
      if (error.message.includes('JWT') || error.message.includes('401')) {
        setError('Session expired. Please try again.');
      }
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