import { useState, useEffect } from 'react';
import { useUser, useAuth } from "@clerk/clerk-react";
import { useClerkSupabaseClient } from '../utils/supabase';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Growth Starter',
    color: 'bg-blue-500',
    features: ['A one time use of our Marketing Plan Generator', '15-minute call with Marketing Expert', 'Email Support', 'Access to our newsletter']
  },
  pro: {
    name: 'Growth Pro',
    color: 'bg-purple-500',
    features: ['10 uses per month of our Marketing Plan Generator', '30-minute call with Marketing Expert', 'Email Support', 'Access to valuable e-books related to growth strategies']
  },
  expert: {
    name: 'Growth Expert',
    color: 'bg-amber-500',
    features: ['Everything in Growth Pro', '30 uses per month of our Marketing Plan Generator', '1 monthly call with Marketing Expert', 'Priority Email Support', 'Early access to new resources and templates']
  }
};

export function DashboardPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [marketingPlans, setMarketingPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const supabase = useClerkSupabaseClient();

  const fetchDataWithFreshToken = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get fresh token
      const token = await refreshSupabaseToken();
      
      // Update Supabase client with fresh token
      await supabase.auth.setSession({
        access_token: token,
        refresh_token: null
      });

      // Fetch subscription
      const { data: sub, error: subError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (subError) {
        console.error('Error fetching subscription:', subError);
        throw subError;
      }
      
      setSubscription(sub || { plan_type: 'free' });

      // Fetch marketing plans
      const { data: plans, error: plansError } = await supabase
        .from('marketing_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (plansError) {
        throw plansError;
      }

      setMarketingPlans(plans || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
      setSubscription({ plan_type: 'free' });
      setMarketingPlans([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !supabase) return;
    fetchDataWithFreshToken();
  }, [user, supabase]);

  // Display error state
  if (error) {
    return (
      <div className="min-h-screen bg-ga-black pt-20">
        <div className="container mx-auto px-4">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
            Error loading dashboard: {error}
            <button 
              onClick={fetchDataWithFreshToken}
              className="ml-4 px-4 py-2 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleDeletePlan = async (planId) => {
    if (!confirm('Are you sure you want to delete this plan?')) return;
    
    try {
      const { error } = await supabase
        .from('marketing_plans')
        .delete()
        .eq('id', planId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setMarketingPlans(plans => plans.filter(p => p.id !== planId));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const handleViewPlan = (planId) => {
    setExpandedPlanId(expandedPlanId === planId ? null : planId);
  };

  if (isLoading && !subscription) {
    return (
      <div className="min-h-screen bg-ga-black pt-20">
        <div className="container mx-auto px-4">
          <p className="text-ga-white">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  const tierInfo = SUBSCRIPTION_TIERS[subscription?.plan_type || 'free'];

  return (
    <div className="min-h-screen bg-ga-black pt-20">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-ga-white mb-2">
            Welcome back, {user?.firstName || 'there'}
          </h1>
          <p className="text-ga-white/70">
            Your marketing dashboard
          </p>
        </motion.div>

        {/* Subscription Status */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-8 p-6 rounded-lg border border-ga-white/10 ${tierInfo.color}/10`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-ga-white mb-2">
                Current Plan: {tierInfo.name}
              </h2>
              <ul className="space-y-2">
                {tierInfo.features.map((feature, index) => (
                  <li key={index} className="text-ga-white/70 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            {subscription?.plan_type !== 'expert' && (
              <Link
                to="/pricing"
                className="px-4 py-2 bg-ga-white text-ga-black rounded-lg hover:bg-ga-white/90 transition-colors"
              >
                Upgrade Plan
              </Link>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <Link 
            to="/growth-ai"
            className="p-6 bg-ga-black/50 border border-ga-white/10 rounded-lg hover:border-ga-white/20 transition-all group"
          >
            <h3 className="text-lg font-semibold text-ga-white mb-2 group-hover:text-ga-white/90">
              Generate New Plan
            </h3>
            <p className="text-ga-white/70">Create a new marketing plan with AI</p>
          </Link>
          
          <div className="p-6 bg-ga-black/50 border border-ga-white/10 rounded-lg">
            <h3 className="text-lg font-semibold text-ga-white mb-2">Your Stats</h3>
            <p className="text-ga-white/70">Plans Generated: {marketingPlans.length}</p>
            <p className="text-ga-white/70">
              Plans Remaining: {subscription?.plan_type === 'expert' ? (30 - marketingPlans.length) : 
                subscription?.plan_type === 'pro' ? (10 - marketingPlans.length) : 
                (1 - marketingPlans.length)}
            </p>
          </div>
        </motion.div>

        {/* Marketing Plans */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-ga-black/50 border border-ga-white/10 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-ga-white mb-4">Your Marketing Plans</h2>
          {marketingPlans.length > 0 ? (
            <div className="grid gap-4">
              {marketingPlans.map((plan, index) => (
                <motion.div 
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-ga-black/30 border border-ga-white/10 rounded-lg p-4 hover:border-ga-white/20 transition-all ${expandedPlanId === plan.id ? 'expanded' : ''}`}
                >
                  <h3 className="text-lg font-semibold text-ga-white mb-2">{plan.business_idea}</h3>
                  <div className="text-ga-white/70 mb-4 space-y-2">
                    <p><span className="font-medium">Target Market:</span> {plan.target_market}</p>
                    <p><span className="font-medium">Stage:</span> {plan.current_stage}</p>
                    <p><span className="font-medium">Goals:</span> {plan.marketing_goals}</p>
                  </div>
                  {expandedPlanId === plan.id && (
                    <div className="text-ga-white/70 mb-4">
                      <p><span className="font-medium">Full Plan:</span> {JSON.stringify(plan.generated_plan, null, 2)}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-ga-white/50">
                      Created: {new Date(plan.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewPlan(plan.id)}
                        className="text-ga-white/70 hover:text-ga-white transition-colors"
                      >
                        {expandedPlanId === plan.id ? 'Collapse' : 'View Full Plan'}
                      </button>
                      <button 
                        onClick={() => handleDeletePlan(plan.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-ga-white/70 mb-4">No marketing plans yet</p>
              <Link 
                to="/growth-ai" 
                className="inline-block bg-ga-white text-ga-black px-4 py-2 rounded hover:bg-ga-white/90 transition-colors"
              >
                Create Your First Plan
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default DashboardPage;