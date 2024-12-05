import { useState, useEffect } from 'react'
import { stripePromise } from './stripe'
import { useClerkSupabaseClient } from './supabase'
import { useUser, useAuth } from '@clerk/clerk-react'

export function useSubscriptions() {
  const supabase = useClerkSupabaseClient()
  const { user } = useUser()
  const { getToken } = useAuth()
  const [currentPlan, setCurrentPlan] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!user) return

      try {
        setIsLoading(true)
        
        // Get the Supabase token from Clerk
        const token = await getToken({ template: 'supabase' })
        if (!token) throw new Error('No auth token')

        // Set the auth header
        supabase.rest.headers['Authorization'] = `Bearer ${token}`

        // Query the subscriptions table
        const { data: subscription, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single()

        if (error) {
          console.error('Error fetching subscription:', error)
          setCurrentPlan('free')
          return
        }

        // If we have an active subscription, use its plan_type
        if (subscription) {
          console.log('Found subscription:', subscription)
          setCurrentPlan(subscription.plan_type)
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

    fetchSubscriptionStatus()
  }, [user, supabase, getToken])

  const getCurrentSubscription = async () => {
    if (!user) return null

    try {
      const token = await getToken({ template: 'supabase' })
      if (!token) throw new Error('No auth token')

      supabase.rest.headers['Authorization'] = `Bearer ${token}`

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching subscription:', error)
      return null
    }
  }

  const createCheckoutSession = async (priceId) => {
    if (!user) return

    setIsLoading(true)
    try {
      const stripe = await stripePromise

      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          customerEmail: user.emailAddresses[0]?.emailAddress,
          currentPlan
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const { sessionId } = await response.json()
      
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) throw error
    } catch (error) {
      console.error('Error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    createCheckoutSession,
    getCurrentSubscription,
    currentPlan,
    isLoading
  }
}