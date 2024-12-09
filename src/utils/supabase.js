import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/clerk-react'
import { useEffect, useState } from 'react'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export function useClerkSupabaseClient() {
  const { getToken } = useAuth()
  const [supabase, setSupabase] = useState(null)

  useEffect(() => {
    const setupClient = async () => {
      const token = await getToken({ template: 'supabase' })
      
      const client = createClient(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })

      setSupabase(client)
    }

    setupClient()
  }, [getToken])

  return supabase
}