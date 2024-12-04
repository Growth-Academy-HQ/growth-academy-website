import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Footer from './components/Footer';
import { DashboardPage } from './pages/DashboardPage'

// Lazy load pages
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

export function AppRoutes() {
  return (
    <>
      <Routes future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        {/* Public routes */}
        <Route path="/*" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin/*" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/pricing" element={<PricingPage />} />
        
        {/* Case study routes */}
        <Route 
          path="/case-studies/dropbox" 
          element={<CaseStudyTemplate {...dropboxCaseStudy} />} 
        />
        <Route 
          path="/case-studies/airbnb" 
          element={<CaseStudyTemplate {...airbnbCaseStudy} />} 
        />
        <Route 
          path="/case-studies/linkedin" 
          element={<CaseStudyTemplate {...linkedinCaseStudy} />} 
        />

        {/* Protected routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/growth-ai" element={
          <ProtectedRoute>
            <GrowthAIPage />
          </ProtectedRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}