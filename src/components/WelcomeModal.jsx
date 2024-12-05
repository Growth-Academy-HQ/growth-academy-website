import { motion, AnimatePresence } from 'framer-motion';
import { SignUp } from '@clerk/clerk-react';
import { useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function WelcomeModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [showClerk, setShowClerk] = useState(false);

  const handleGetStarted = () => {
    setShowClerk(true);
  };

  const handleClose = () => {
    setShowClerk(false);
    onClose();
    navigate('/');
  };

  const handleClerkClose = (e) => {
    e.stopPropagation();
    setShowClerk(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      if (showClerk) {
        setShowClerk(false);
      } else {
        handleClose();
      }
    }
  };

  if (!isOpen) return null;

  if (showClerk) {
    return (
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-xl p-8 max-w-lg w-full relative" onClick={e => e.stopPropagation()}>
          <button
            onClick={handleClerkClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-50"
          >
            <X size={24} />
          </button>
          <SignUp 
            routing={{ 
              afterSignUp: { 
                url: '/pricing',
                callback: () => {
                  const selectedPlan = localStorage.getItem('selectedPlan');
                  const selectedPriceId = localStorage.getItem('selectedPriceId');
                  if (selectedPlan && selectedPriceId) {
                    createCheckoutSession(selectedPriceId);
                    localStorage.removeItem('selectedPlan');
                    localStorage.removeItem('selectedPriceId');
                  }
                }
              } 
            }} 
          />
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-ga-black border border-ga-white/10 rounded-xl p-8 max-w-lg w-full relative"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-ga-white/70 hover:text-ga-white"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-ga-white mb-2">
            Welcome to GrowthAI
          </h2>
          <p className="text-ga-white/70">
            Your AI-powered marketing strategy companion
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-ga-white font-semibold">AI-Powered Marketing Plans</h3>
              <p className="text-ga-white/70">Generate customized marketing strategies in minutes</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-ga-white font-semibold">Expert Guidance</h3>
              <p className="text-ga-white/70">Access to marketing experts and resources</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-green-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <div>
              <h3 className="text-ga-white font-semibold">Free to Start</h3>
              <p className="text-ga-white/70">Try our basic plan with no commitment</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGetStarted}
            className="block w-full py-3 px-4 bg-ga-white text-ga-black rounded-lg text-center font-semibold hover:bg-ga-white/90 transition-colors"
          >
            Get Started Free
          </button>
          <div className="flex justify-between">
            <button
              onClick={handleGetStarted}
              className="text-ga-white/70 hover:text-ga-white transition-colors"
            >
              Learn More
            </button>
            <button
              onClick={handleGetStarted}
              className="text-ga-white/70 hover:text-ga-white transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}