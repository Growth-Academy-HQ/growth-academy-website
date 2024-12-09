import { useState, useEffect } from 'react'
import { stripePromise } from './stripe'
import { useClerkSupabaseClient } from './supabase'
import { useUser, useAuth } from '@clerk/clerk-react'

const PLAN_LIMITS = {
  free: 1,
  pro: 10,
  expert: 30
}

export function useSubscriptions() {
  const supabase = useClerkSupabaseClient()
  const { user, isLoaded: isUserLoaded } = useUser()
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
          console.log('Found subscription:', subData)
          setCurrentPlan(subData.plan_type)
        } else {
          console.log('No subscription found')
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

  const getRemainingGenerations = () => {
    const limit = PLAN_LIMITS[currentPlan || 'free']
    return Math.max(0, limit - usageCount)
  }

  return {
    currentPlan,
    isLoading,
    usageCount,
    remainingGenerations: getRemainingGenerations(),
    planLimit: PLAN_LIMITS[currentPlan || 'free']
  }
}