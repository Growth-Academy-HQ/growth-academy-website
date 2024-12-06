import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { secureStorage } from '../utils/security';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = secureStorage.get('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    secureStorage.set('cookieConsent', true);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-ga-black/95 backdrop-blur-sm border-t border-ga-gray/20 z-50"
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-ga-light text-sm">
                We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
                Learn more in our{' '}
                <a href="/privacy-policy" className="text-ga-white hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
              <div className="flex gap-4">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-ga-primary text-white rounded hover:bg-ga-primary/90 transition-colors"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;