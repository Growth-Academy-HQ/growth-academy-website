import { supabase } from '../../utils/supabase'
import { Button } from "@/components/ui/button"

export function SignOut() {
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <Button 
      onClick={handleSignOut}
      variant="outline" 
      className="border-ga-white/10 text-ga-white hover:bg-ga-white/10"
    >
      Sign Out
    </Button>
  )
}