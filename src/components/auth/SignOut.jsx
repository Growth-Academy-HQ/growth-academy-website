import { useClerk } from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"

export function SignOut() {
  const { signOut } = useClerk()

  return (
    <Button 
      onClick={() => signOut()}
      variant="outline" 
      className="border-ga-white/10 text-ga-white hover:bg-ga-white/10"
    >
      Sign Out
    </Button>
  )
}