import { stripePromise } from './stripe'
import { useClerkSupabaseClient } from './supabase'
import { useUser } from '@clerk/clerk-react'

export function useSubscriptions() {
  const supabase = useClerkSupabaseClient()
  const { user } = useUser()

  const getCurrentSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error fetching subscription:', error)
      return null
    }
  }

  const createCheckoutSession = async (priceId) => {
    try {
      const stripe = await stripePromise

      // Use the full URL
      const response = await fetch('http://localhost:3001/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user?.id,
          customerEmail: user?.emailAddresses[0]?.emailAddress
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  return {
    createCheckoutSession,
    getCurrentSubscription,
  }
}