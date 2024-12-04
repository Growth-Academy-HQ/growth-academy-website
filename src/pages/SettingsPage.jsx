import { UserProfile } from "@clerk/clerk-react"

export function SettingsPage() {
  return (
    <div className="min-h-screen pt-20 bg-ga-black">
      <div className="container mx-auto px-4">
        <UserProfile 
          path="/settings"
          routing="path"
          appearance={{
            elements: {
              rootBox: "mx-auto max-w-3xl",
              card: "bg-ga-black/50 border border-ga-white/10",
              headerTitle: "text-ga-white",
              formButtonPrimary: "bg-ga-white text-ga-black hover:bg-ga-light",
              formFieldInput: "bg-ga-black/30 border-ga-white/10 text-ga-white",
              formFieldLabel: "text-ga-white",
            }
          }}
        />
      </div>
    </div>
  )
}