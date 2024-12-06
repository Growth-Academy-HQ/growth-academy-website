import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { motion } from 'framer-motion';
import { sanitizeString, validateInput } from '../utils/security';
import { contactRateLimiter } from '../utils/rateLimit';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
    source: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check rate limit
    if (!contactRateLimiter.canMakeRequest()) {
      const waitTime = contactRateLimiter.getTimeUntilNextRequest();
      const minutes = Math.ceil(waitTime / 60000);
      setSubmitStatus('rate-limited');
      setSubmitError(`Please wait ${minutes} minute${minutes > 1 ? 's' : ''} before submitting another message.`);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validate email
    if (!validateInput(formData.email, 'email')) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }

    // Sanitize form data
    const sanitizedData = {
      fullName: sanitizeString(formData.fullName),
      email: sanitizeString(formData.email),
      subject: sanitizeString(formData.subject),
      message: sanitizeString(formData.message),
      source: sanitizeString(formData.source)
    };
    
    try {
      // Add to Firestore contacts collection
      await addDoc(collection(db, 'contacts'), {
        ...sanitizedData,
        timestamp: new Date().toISOString(),
        status: 'new'
      });
      
      setSubmitStatus('success');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        source: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const formFieldVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-ga-black text-ga-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="h-20" /> {/* Header spacing */}
      
      <div className="container mx-auto px-6 py-24">
        <motion.h1 
          className="text-5xl font-alata mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Contact Us
        </motion.h1>
        
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div 
              className="space-y-2"
              variants={formFieldVariants}
              transition={{ delay: 0.3 }}
            >
              <label className="block font-alata">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-ga-gray/50 border border-ga-gray/20 focus:outline-none focus:border-ga-white transition-colors"
                placeholder="Enter your full name"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={formFieldVariants}
              transition={{ delay: 0.4 }}
            >
              <label className="block font-alata">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-ga-gray/50 border border-ga-gray/20 focus:outline-none focus:border-ga-white transition-colors"
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={formFieldVariants}
              transition={{ delay: 0.5 }}
            >
              <label className="block font-alata">
                Subject of the Inquiry <span className="text-red-500">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-ga-gray/50 border border-ga-gray/20 focus:outline-none focus:border-ga-white transition-colors"
              >
                <option value="">Select...</option>
                <option value="general">General Inquiry</option>
                <option value="services">Services Information</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="support">Technical Support</option>
              </select>
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={formFieldVariants}
              transition={{ delay: 0.6 }}
            >
              <label className="block font-alata">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 rounded-lg bg-ga-gray/50 border border-ga-gray/20 focus:outline-none focus:border-ga-white transition-colors"
                placeholder="How can we help you?"
              />
            </motion.div>

            <motion.div 
              className="space-y-2"
              variants={formFieldVariants}
              transition={{ delay: 0.7 }}
            >
              <label className="block font-alata">
                How did you hear about us? <span className="text-red-500">*</span>
              </label>
              <select
                name="source"
                value={formData.source}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-ga-gray/50 border border-ga-gray/20 focus:outline-none focus:border-ga-white transition-colors"
              >
                <option value="">Select...</option>
                <option value="social">Social Media</option>
                <option value="search">Search Engine</option>
                <option value="referral">Referral</option>
                <option value="other">Other</option>
              </select>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-lg font-alata text-center transition-all ${
                isSubmitting
                  ? 'bg-ga-gray/50 cursor-not-allowed'
                  : 'bg-ga-white text-ga-black hover:bg-ga-light hover:scale-[1.02]'
              }`}
              variants={formFieldVariants}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? 
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-ga-black border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
                : 'Submit'
              }
            </motion.button>

            {submitStatus === 'success' && (
              <motion.div 
                className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Thank you for your message! We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === 'error' && (
              <motion.div 
                className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                An error occurred. Please try again later.
              </motion.div>
            )}

            {submitStatus === 'rate-limited' && (
              <motion.div 
                className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitError}
              </motion.div>
            )}
          </form>

          <motion.div 
            className="mt-12 pt-12 border-t border-ga-gray/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-2xl font-alata mb-6">Connect with Us</h2>
            <div className="flex gap-6">
              <a href="#" className="transform hover:scale-110 transition-transform">
                <img src="/assets/linkedin-logo.svg" alt="LinkedIn" className="h-6" />
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform">
                <img src="/assets/instagram-logo.svg" alt="Instagram" className="h-6" />
              </a>
              <a href="#" className="transform hover:scale-110 transition-transform">
                <img src="/assets/tiktok-logo.svg" alt="TikTok" className="h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;