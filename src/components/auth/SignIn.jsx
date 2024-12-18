import { SignIn as ClerkSignIn } from '@clerk/clerk-react'

export function SignIn() {
  const appearance = {
    layout: {
      logoPlacement: "inside",
      socialButtonsVariant: "blockButton",
      socialButtonsPlacement: "bottom",
      shimmer: true
    },
    elements: {
      rootBox: "mx-auto w-full max-w-md",
      card: "bg-white shadow-2xl rounded-xl",
      header: "text-ga-black",
      headerTitle: "text-2xl font-alata text-ga-black text-center",
      headerSubtitle: "text-gray-600",
      socialButtonsIconButton: "border-gray-200 hover:bg-gray-50",
      socialButtonsBlockButton: "text-gray-600 border border-gray-200 hover:bg-gray-50",
      socialButtonsProviderIcon: "text-gray-600",
      dividerLine: "bg-gray-200",
      dividerText: "text-gray-500",
      formButtonPrimary: "bg-ga-black text-white hover:bg-ga-black/90 transition-all",
      formFieldInput: "bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus:border-ga-black focus:ring-ga-black",
      formFieldLabel: "text-gray-700",
      footerActionLink: "text-ga-black hover:text-ga-black/70",
      footerActionText: "text-gray-600",
      identityPreviewText: "text-gray-700",
      formFieldSuccessText: "text-green-600",
      formFieldErrorText: "text-red-600",
      alternativeMethodsBlockButton: "text-gray-600 border border-gray-200 hover:bg-gray-50",
      card: {
        backgroundColor: "#fff",
        borderRadius: "1rem",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      },
      socialButtons: {
        iconButton: {
          backgroundColor: "#fff",
          borderColor: "#e5e7eb",
          color: "#374151",
          "&:hover": {
            backgroundColor: "#f9fafb",
          }
        }
      }
    },
    variables: {
      colorPrimary: "#000",
      colorText: "#111827",
      colorTextSecondary: "#4b5563",
      colorBackground: "#fff",
      colorInputBackground: "#fff",
      colorInputText: "#111827",
      borderRadius: "0.75rem"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ga-black to-ga-black/95">
      <div className="w-full max-w-md p-4">
        <ClerkSignIn 
          appearance={appearance}
          routing="path" 
          path="/signin"
        />
      </div>
    </div>
  )
}