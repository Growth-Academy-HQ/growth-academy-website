import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SignIn() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await signIn(email, password)
      if (error) throw error
      
      const from = location.state?.from || '/growth-ai'
      navigate(from, { replace: true })
    } catch (error) {
      console.error('Error signing in:', error.message)
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const { error } = await signIn(email, password)
      if (error) throw error
      alert('Check your email for the confirmation link!')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-ga-black">
      <Card className="w-full max-w-md p-6 bg-ga-black/50 border-ga-white/10">
        <CardHeader>
          <CardTitle className="text-2xl font-alata text-ga-white text-center">
            Sign In to Growth Academy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-ga-black/30 border-ga-white/10 text-ga-white placeholder:text-ga-white/50"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-ga-black/30 border-ga-white/10 text-ga-white placeholder:text-ga-white/50"
              />
            </div>
            <div className="space-y-2">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-ga-white text-ga-black hover:bg-ga-light"
              >
                {loading ? 'Loading...' : 'Sign In'}
              </Button>
              <Button 
                type="button"
                onClick={handleSignUp}
                disabled={loading}
                variant="outline"
                className="w-full border-ga-white/10 text-ga-white hover:bg-ga-white/10"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}