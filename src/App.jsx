import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Header } from './components/Header';
import { AppRoutes } from './AppRoutes';
import { Toaster } from 'sonner';

const PageLoader = () => (
  <div className="min-h-screen bg-ga-black flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div className="animate-spin w-12 h-12 border-4 border-ga-white border-t-transparent rounded-full" />
      <p className="text-ga-white">Loading...</p>
    </div>
  </div>
);

function App() {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<PageLoader />}>
          <AppRoutes />
        </Suspense>
        <Toaster />
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;