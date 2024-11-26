// src/components/marketing-generator/MarketingPlanGenerator.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Download, Share2 } from 'lucide-react';
import { generateMarketingPlan } from '../../services/claude-ai';


const MarketingPlanGenerator = () => {
  const isAuthenticated = true;
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState({
    businessIdea: '',
    targetMarket: '',
    currentStage: '',
    marketingGoals: '',
    budget: '',
  });
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleInputChange = (field, value) => {
    console.log('Input changing:', field, value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerate = async () => {
    console.log('Generate button clicked');
    setIsGenerating(true);
    
    try {
      const response = await generateMarketingPlan(formData);
      console.log('Generated plan:', response);
      setGeneratedPlan(response);
    } catch (error) {
      console.error('Generation failed:', error);
      alert('Failed to generate plan: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-8">
      <div className="bg-ga-black/50 border border-ga-white/10 rounded-lg overflow-hidden">
        <div className="p-6 border-b border-ga-white/10">
          <div className="flex items-center justify-between">
            <img 
              src="/src/assets/growth-ai-logo.svg" 
              alt="GrowthAI" 
              className="h-8"
            />
            {isAuthenticated && (
              <span className="text-sm text-ga-light">
                4 generations remaining
              </span>
            )}
          </div>
          <h2 className="text-2xl font-alata text-ga-white mt-4">
            Marketing Plan Generator
          </h2>
        </div>

        <div className="p-6 space-y-6">
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
            disabled={isGenerating}
            className="w-full px-6 py-3 bg-ga-white text-ga-black hover:bg-ga-light transition-colors rounded-md font-alata disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your plan...
              </span>
            ) : (
              'Generate Marketing Plan'
            )}
          </button>

          {generatedPlan && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 bg-ga-black/30 rounded-lg border border-ga-white/10"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-alata text-ga-white">
                  Your Marketing Plan
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-sm border border-ga-white/10 rounded-md text-ga-white hover:bg-ga-white/10 transition-colors flex items-center">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </button>
                  <button className="px-3 py-1.5 text-sm border border-ga-white/10 rounded-md text-ga-white hover:bg-ga-white/10 transition-colors flex items-center">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
              <div className="prose prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ 
                  __html: generatedPlan.content[0].text.replace(/\n/g, '<br/>') 
                }} />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingPlanGenerator;