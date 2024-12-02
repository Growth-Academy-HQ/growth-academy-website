import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { supabase } from '../../utils/supabase'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ProfileManager() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState({
    name: '',
    company: ''
  })

  useEffect(() => {
    getProfile()
  }, [user])

  const getProfile = async () => {
    try {
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error
      
      if (data) {
        setProfile({
          name: data.name || '',
          company: data.company || ''
        })
      }
    } catch (error) {
      alert('Error loading profile!')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: profile.name,
          company: profile.company,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating profile!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Card className="max-w-md mx-auto bg-ga-black/50 border-ga-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-alata text-ga-white">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={updateProfile} className="space-y-4">
            <div>
              <label className="text-sm text-ga-light">Email</label>
              <Input
                type="text"
                value={user?.email}
                disabled
                className="bg-ga-black/30 border-ga-white/10 text-ga-white"
              />
            </div>
            <div>
              <label className="text-sm text-ga-light">Name</label>
              <Input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-ga-black/30 border-ga-white/10 text-ga-white"
              />
            </div>
            <div>
              <label className="text-sm text-ga-light">Company</label>
              <Input
                type="text"
                value={profile.company}
                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                className="bg-ga-black/30 border-ga-white/10 text-ga-white"
              />
            </div>
            <Button 
              type="submit"
              disabled={loading}
              className="w-full bg-ga-white text-ga-black hover:bg-ga-light"
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}