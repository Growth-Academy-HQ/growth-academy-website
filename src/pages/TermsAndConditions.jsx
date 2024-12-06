import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="bg-ga-black text-ga-white min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-alata mb-4">Terms and Conditions</h1>
          <p className="text-ga-light mb-8">Effective Date: December 5, 2024</p>

          <Link to="/" className="inline-block mb-8 text-ga-light hover:text-ga-white transition-colors">
            &larr; Back to Home
          </Link>

          <div className="prose prose-invert max-w-none">
            <p className="mb-8">
              Welcome to Growth Academy! These Terms and Conditions ("Terms") govern your use of the website (Growth Academy) 
              and services provided by Growth Academy HQ ("we," "us," or "our"). By accessing or using our website and services, 
              you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">1. General Information</h2>
            <ul className="list-none mb-8">
              <li>Website Name: Growth Academy</li>
              <li>Business Name: Growth Academy HQ</li>
              <li>Address: Baumchulenstrasse 74, Berlin, 12437, Germany</li>
              <li>Email: contact.growthacademyhq@gmail.com</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">2. Services Provided</h2>
            <p className="mb-4">Growth Academy HQ provides the following services:</p>
            <ul className="list-disc pl-6 mb-8">
              <li>Subscriptions to access AI-generated marketing plans.</li>
              <li>E-books and resource templates tailored for freelancers, small businesses, and individuals interested in marketing and customer success.</li>
              <li>One-time purchases for e-books and templates.</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-alata mt-8 mb-4">3.1 Account Registration</h3>
            <p className="mb-4">To use certain features, you must create an account. You agree to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Provide accurate and complete information during registration.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Notify us of unauthorized access to your account.</li>
            </ul>
            <p className="mb-8">We reserve the right to suspend or terminate accounts that violate these Terms.</p>

            <h3 className="text-xl font-alata mt-8 mb-4">3.2 Account Responsibility</h3>
            <p className="mb-8">You are responsible for all activity under your account. Sharing account details with others is prohibited.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">4. Subscription and Payment Terms</h2>
            <h3 className="text-xl font-alata mt-8 mb-4">4.1 Subscriptions</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Subscriptions grant access to AI-generated marketing plans for the subscription period.</li>
              <li>Subscriptions automatically renew unless canceled before the renewal date.</li>
              <li>By subscribing, you authorize us to charge the payment method on file for recurring payments.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">4.2 One-Time Purchases</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>E-books and templates are available for one-time purchase.</li>
              <li>All sales are final unless otherwise stated in our refund policy (Section 5).</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">4.3 Pricing and Taxes</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Prices are listed in Euros (€) and include applicable taxes unless stated otherwise.</li>
              <li>We reserve the right to update prices but will notify you before changes affect active subscriptions.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">4.4 Payment Processors</h3>
            <p className="mb-8">Payments are processed securely through third-party providers. We do not store your payment information.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">5. Refund and Cancellation Policy</h2>
            <h3 className="text-xl font-alata mt-8 mb-4">5.1 Subscriptions</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>You may cancel your subscription at any time. Access will remain active until the end of the billing period.</li>
              <li>Refunds are not issued for unused subscription periods.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">5.2 One-Time Purchases</h3>
            <p className="mb-8">Digital goods (e-books and templates) are non-refundable once downloaded. If you encounter issues with our services, contact us at contact.growthacademyhq@gmail.com.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">6. Intellectual Property</h2>
            <p className="mb-8">
              All content provided on the Website, including e-books, templates, marketing plans, text, images, and software, is the intellectual property of Growth Academy HQ.
              You may not copy, reproduce, distribute, or create derivative works from our content without prior written permission.
              Subscriptions and purchases grant you a limited, non-transferable license for personal or business use only.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">7. User Responsibilities</h2>
            <p className="mb-8">
              By using our Website, you agree:
              Not to misuse the Website or services for unlawful purposes.
              Not to interfere with or disrupt the Website, servers, or networks.
              To comply with all applicable laws and regulations.
              We reserve the right to suspend or terminate accounts that violate these responsibilities.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">8. Limitation of Liability</h2>
            <p className="mb-8">
              To the fullest extent permitted by law:
              Growth Academy HQ is not liable for indirect, incidental, or consequential damages resulting from your use of the Website or services.
              We do not guarantee uninterrupted or error-free operation of the Website.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">9. Warranties Disclaimer</h2>
            <p className="mb-8">
              Our services are provided “as is” without warranties of any kind. We disclaim all express or implied warranties, including merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">10. Third-Party Links</h2>
            <p className="mb-8">
              Our Website may contain links to third-party websites. These links are provided for convenience and do not imply endorsement. We are not responsible for third-party content or practices.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">11. Privacy Policy</h2>
            <p className="mb-8">Your use of the Website is subject to our Privacy Policy.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">12. Termination</h2>
            <p className="mb-8">
              We may suspend or terminate your account or access to our services if you violate these Terms or engage in fraudulent activity.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">13. Governing Law</h2>
            <p className="mb-8">
              These Terms are governed by the laws of Germany. Any disputes shall be resolved in the courts of Berlin, Germany.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">14. Changes to These Terms</h2>
            <p className="mb-8">
              We reserve the right to update these Terms at any time. Updates will be posted on this page with the effective date. Continued use of the Website after changes indicates your acceptance of the updated Terms.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">15. Contact Information</h2>
            <p className="mb-4">If you have questions about these Terms, contact us:</p>
            <ul className="list-none mb-8">
              <li>Email: contact.growthacademyhq@gmail.com</li>
              <li>Mailing Address: Baumchulenstrasse 74, Berlin, 12437, Germany</li>
            </ul>

            <p className="mb-8">
              By using Growth Academy, you confirm that you have read, understood, and agree to these Terms and Conditions.
            </p>

            <Link to="/" className="inline-block mt-8 text-ga-light hover:text-ga-white transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;