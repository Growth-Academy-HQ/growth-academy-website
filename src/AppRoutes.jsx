import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Footer from './components/Footer';
import { DashboardPage } from './pages/DashboardPage';
import SchedulerPage from './pages/SchedulerPage';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Lazy load pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const CaseStudiesPage = React.lazy(() => import('./pages/CaseStudiesPage'));
const ShopPage = React.lazy(() => import('./pages/ShopPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const GrowthAIPage = React.lazy(() => import('./pages/GrowthAIPage'));
const CaseStudy = React.lazy(() => import('./pages/CaseStudy'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const RefundPolicy = React.lazy(() => import('./pages/RefundPolicy'));

export function AppRoutes() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
          <Route path="/growth-ai" element={<GrowthAIPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          
          {/* Case study routes */}
          <Route path="/case-studies/:id" element={<CaseStudy />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />

          <Route path="/scheduler" element={
            <ProtectedRoute>
              <SchedulerPage />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </>
    </GoogleOAuthProvider>
  );
}