import { useState, useEffect } from 'react'
import { useClerkSupabaseClient } from './supabase'
import { useUser, useAuth } from '@clerk/clerk-react'
import { loadStripe } from '@stripe/stripe-js';

const PLAN_LIMITS = {
  free: 1,
  pro: 10,
  expert: 30
}

const PRICE_IDS = {
  pro: 'price_1QS3WrDx4hYKRW6tovZXvOiB',
  expert: 'price_1QS3XWDx4hYKRW6tQoxNOwzZ'
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

/**
 * @typedef {Object} SubscriptionData
 * @property {('free'|'pro'|'expert'|null)} currentPlan
 * @property {boolean} isLoading
 * @property {number} usageCount
 * @property {number} remainingGenerations
 * @property {number} planLimit
 * @property {Function} createCheckoutSession
 */

/**
 * @returns {SubscriptionData}
 */
export function useSubscriptions() {
  const supabase = useClerkSupabaseClient()
  const { user, isLoaded: isUserLoaded } = useUser()
  const { getToken } = useAuth()
  const [currentPlan, setCurrentPlan] = useState(null)
  const [usageCount, setUsageCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptionAndUsage = async () => {
      if (!isUserLoaded || !user || !supabase) {
        setIsLoading(false)
        return
      }

      try {
        // Get subscription
        const { data: subData, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        // Get current month's usage
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count, error: usageError } = await supabase
          .from('marketing_plans')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .gte('created_at', startOfMonth.toISOString())

        if (usageError) {
          console.error('Usage count error:', usageError)
        } else {
          setUsageCount(count || 0)
        }

        if (subError) {
          console.error('Subscription error:', subError)
          setCurrentPlan('free')
          return
        }

        if (subData) {
          setCurrentPlan(subData.plan_type)
        } else {
          setCurrentPlan('free')
        }
      } catch (error) {
        console.error('Error in subscription check:', error)
        setCurrentPlan('free')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubscriptionAndUsage()
  }, [user, isUserLoaded, supabase])

  const createCheckoutSession = async (priceId) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    try {
      console.log('Creating checkout session for:', {
        priceId,
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress
      });

      const token = await getToken();
      
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          customerEmail: user.primaryEmailAddress?.emailAddress,
          currentPlan,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.error || 'Unknown error'}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.sessionId) {
        throw new Error('No session ID received from server');
      }

      console.log('Redirecting to checkout with session:', data.sessionId);
      
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe not initialized');
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw new Error(`Stripe redirect error: ${stripeError.message}`);
      }
    } catch (error) {
      console.error('Error in createCheckoutSession:', error);
      // You might want to show a toast or error message to the user here
    }
  };

  const getRemainingGenerations = () => {
    const limit = PLAN_LIMITS[currentPlan || 'free']
    return Math.max(0, limit - usageCount)
  }

  return {
    currentPlan,
    isLoading,
    usageCount,
    remainingGenerations: getRemainingGenerations(),
    planLimit: PLAN_LIMITS[currentPlan || 'free'],
    createCheckoutSession,
    PRICE_IDS // Export price IDs for use in PricingPage
  }
}