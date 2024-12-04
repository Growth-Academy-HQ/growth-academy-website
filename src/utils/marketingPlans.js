import { useClerkSupabaseClient } from './supabase'
import { useAuth } from '@clerk/clerk-react'

export function useMarketingPlans() {
  const supabase = useClerkSupabaseClient()
  const { getToken } = useAuth()

  const getPlans = async () => {
    try {
      // Get fresh token
      const token = await getToken({ template: 'supabase' })
      if (!token) throw new Error('No auth token')

      // Set auth header
      supabase.rest.headers['Authorization'] = `Bearer ${token}`

      const { data, error } = await supabase
        .from('marketing_plans')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Error fetching plans:', error)
      return []
    }
  }

  return { getPlans }
}