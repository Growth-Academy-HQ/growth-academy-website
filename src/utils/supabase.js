import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useMemo } from 'react'

export function useClerkSupabaseClient() {
  const { getToken } = useAuth()
  
  // Use import.meta.env for Vite environment variables
  const supabase = useMemo(() => createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      global: {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    }
  ), [])

  useEffect(() => {
    let mounted = true

    const setupAuth = async () => {
      try {
        const token = await getToken({ template: 'supabase' })
        if (token && mounted) {
          // Set both auth header and session
          supabase.auth.setSession({
            access_token: token,
            refresh_token: ''
          })
          
          // Also set the auth header directly
          supabase.rest.headers = {
            ...supabase.rest.headers,
            'Authorization': `Bearer ${token}`
          }
        }
      } catch (error) {
        console.error('Error setting up Supabase auth:', error)
      }
    }

    setupAuth()
    
    // Cleanup function
    return () => {
      mounted = false
    }
  }, [getToken, supabase])

  return supabase
}