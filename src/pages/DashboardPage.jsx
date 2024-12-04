import { useState, useEffect } from 'react'
import { useUser, useAuth } from "@clerk/clerk-react"
import { useClerkSupabaseClient } from '../utils/supabase'
import { useMarketingPlans } from '../utils/marketingPlans'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Growth Starter',
    color: 'bg-blue-500',
    features: ['A one time useof our Marketing Plan Generator','15-minute call with Marketing Expert' , 'Email Support' , 'Access to our newsletter']
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
}

export function DashboardPage() {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [marketingPlans, setMarketingPlans] = useState([])
  const [subscription, setSubscription] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getPlans } = useMarketingPlans()
  const supabase = useClerkSupabaseClient()

  useEffect(() => {
    if (!user || !supabase) return

    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        const token = await getToken({ template: 'supabase' })
        if (!token) throw new Error('No auth token')

        supabase.rest.headers['Authorization'] = `Bearer ${token}`

        const { data: sub, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .single()
        
        if (subError) {
          console.error('Error fetching subscription:', subError)
        } else {
          setSubscription(sub || { plan_type: 'free' })
        }

        const plans = await getPlans()
        setMarketingPlans(plans)
      } catch (error) {
        console.error('Error in fetchData:', error)
        setSubscription({ plan_type: 'free' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user, supabase, getPlans, getToken])

  if (isLoading && !subscription) {
    return (
      <div className="min-h-screen bg-ga-black pt-20">
        <div className="container mx-auto px-4">
          <p className="text-ga-white">Loading subscription details...</p>
        </div>
      </div>
    )
  }

  const tierInfo = SUBSCRIPTION_TIERS[subscription?.plan_type || 'free']

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
                  className="bg-ga-black/30 border border-ga-white/10 rounded-lg p-4 hover:border-ga-white/20 transition-all"
                >
                  <h3 className="text-lg font-semibold text-ga-white mb-2">{plan.title}</h3>
                  <p className="text-ga-white/70 mb-4">{plan.content}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-ga-white/50">
                      Created: {new Date(plan.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
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
  )
}