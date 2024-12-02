import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SignIn } from './components/auth/SignIn';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from 'sonner'
import { ProfileDropdown } from './components/profile/ProfileDropdown'
import { ProfilePage } from './pages/ProfilePage'

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const GrowthAIPage = React.lazy(() => import('./pages/GrowthAIPage'));
const CaseStudyTemplate = React.lazy(() => import('./components/case-studies/CaseStudyTemplate'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));

// Import case studies data
import { dropboxCaseStudy, airbnbCaseStudy, linkedinCaseStudy } from './data/case-studies';

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-ga-black flex items-center justify-center">
    <div className="space-y-4 text-center">
      <div 
        className="animate-spin w-12 h-12 border-4 border-ga-white border-t-transparent rounded-full"
        role="status"
        aria-label="Loading"
      />
      <p className="text-ga-white font-alata">Loading...</p>
    </div>
  </div>
);

// Header component
const Header = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ga-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="relative group">
          <img 
            src="/assets/growth-academy-logo.png" 
            alt="Growth Academy" 
            className="h-10 transition-transform group-hover:scale-105"
          />
        </Link>

        <div className="flex gap-8">
          {[
            ['About', '/about'],
            ['Case Studies', '/case-studies'],
            ['Shop', '/shop'],
            ['Contact', '/contact'],
            ['GrowthAI', '/growth-ai']
          ].map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="relative font-alata hover:text-ga-light transition-colors group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ga-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {user ? (
            <ProfileDropdown />
          ) : (
            <Link
              to="/signin"
              className="relative font-alata hover:text-ga-light transition-colors group"
            >
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-ga-black">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route 
                    path="/case-studies/dropbox" 
                    element={<CaseStudyTemplate caseStudy={dropboxCaseStudy} />} 
                  />
                  <Route 
                    path="/case-studies/airbnb" 
                    element={<CaseStudyTemplate caseStudy={airbnbCaseStudy} />} 
                  />
                  <Route 
                    path="/case-studies/linkedin" 
                    element={<CaseStudyTemplate caseStudy={linkedinCaseStudy} />} 
                  />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route 
                    path="/growth-ai" 
                    element={
                      <ProtectedRoute>
                        <GrowthAIPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" theme="dark" />
      </AuthProvider>
    </Router>
  );
}

export default App;