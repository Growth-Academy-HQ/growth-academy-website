import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      navigate={(to) => navigate(to)}
    >
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}

export function useAuth() {
  const { user, isLoaded: loaded } = useUser()
  const { signOut } = useClerk()

  return {
    user,
    loading: !loaded,
    error: null,
    signOut,
    isAuthenticated: !!user,
  }
}