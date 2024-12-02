import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown 
} from 'lucide-react'
import { supabase } from '../../utils/supabase'

export function ProfileDropdown() {
  const { user } = useAuth()
  const [profile, setProfile] = useState({ name: '' })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    async function getProfile() {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', user?.id)
          .single()
        
        if (data) setProfile(data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    if (user) getProfile()
  }, [user])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-ga-black/30 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-ga-white/10 flex items-center justify-center">
          <User className="w-4 h-4 text-ga-white" />
        </div>
        <span className="text-ga-white">{profile.name || user?.email}</span>
        <ChevronDown className={`w-4 h-4 text-ga-white transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-ga-black/95 backdrop-blur-sm border border-ga-white/10 rounded-lg shadow-xl">
          <Link
            to="/profile"
            className="flex items-center gap-2 px-4 py-2 text-ga-white hover:bg-ga-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-4 h-4" />
            Profile
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 text-ga-white hover:bg-ga-white/10 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </Link>
          <button
            onClick={async () => {
              await signOut()
              setIsOpen(false)
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-ga-white/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}