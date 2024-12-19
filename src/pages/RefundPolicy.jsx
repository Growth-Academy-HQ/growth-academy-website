import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="bg-ga-black text-ga-white min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-alata mb-4">Refund and Returns Policy</h1>
          <p className="text-ga-light mb-8">Effective Date: December 5, 2024</p>

          <Link to="/" className="inline-block mb-8 text-ga-light hover:text-ga-white transition-colors">
            &larr; Back to Home
          </Link>

          <div className="prose prose-invert max-w-none">
            <p className="mb-8">
              At Growth Academy HQ, we value your satisfaction and strive to deliver high-quality digital products and services. 
              This Refund and Returns Policy outlines the conditions and processes for refunds, cancellations, and support.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">1. Scope of Policy</h2>
            <p className="mb-8">
              This policy applies to:
              <ul className="list-disc pl-6 mb-8">
                <li>Subscriptions for AI-generated marketing plans.</li>
                <li>One-time purchases of e-books and resource templates.</li>
              </ul>
              As our products are digital and immediately accessible upon purchase, special conditions apply for refunds and cancellations.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">2. Refund Policy for Subscriptions</h2>
            <h3 className="text-xl font-alata mt-8 mb-4">2.1 Cancellation and Refunds</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Subscriptions can be canceled at any time through your account settings.</li>
              <li>Refunds are not provided for unused portions of an active subscription period.</li>
              <li>Access to subscription content will remain available until the end of the billing period after cancellation.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">2.2 Trial Periods (if applicable)</h3>
            <p className="mb-8">
              If a trial period is offered, you must cancel before the trial ends to avoid being charged for the subscription.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">3. Refund Policy for One-Time Purchases</h2>
            <h3 className="text-xl font-alata mt-8 mb-4">3.1 Digital Products (E-books and Resource Templates)</h3>
            <p className="mb-4">Due to the nature of digital products:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Refunds: No refunds will be issued once a digital product (e-book or template) has been downloaded.</li>
              <li>Eligibility: Refunds may be considered in cases of technical issues (e.g., file corruption) that prevent product access.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">3.2 Process for Refund Requests</h3>
            <p className="mb-8">
              If you experience a problem with a digital product, please contact us at contact.growthacademyhq@gmail.com with:
              <ul className="list-disc pl-6 mb-8">
                <li>Your order details (order number, date of purchase).</li>
                <li>A description of the issue and screenshots, if applicable.</li>
              </ul>
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">4. Fees or Costs</h2>
            <ul className="list-disc pl-6 mb-8">
              <li>Refund Processing: No additional fees are charged for processing eligible refunds.</li>
              <li>Chargebacks: Customers are responsible for any fees associated with unwarranted chargebacks initiated through their bank or payment provider.</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">5. Conditions for Refund Eligibility</h2>
            <p className="mb-8">
              Refunds are granted only under the following conditions:
              <ul className="list-disc pl-6 mb-8">
                <li>Technical issues with digital files that cannot be resolved.</li>
                <li>Unauthorized charges verified by our support team.</li>
              </ul>
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">6. How to Initiate a Refund or Support Request</h2>
            <p className="mb-8">
              If you believe you are eligible for a refund, follow these steps:
              <ul className="list-disc pl-6 mb-8">
                <li>Contact Support: Email us at contact.growthacademyhq@gmail.com with your order details and a clear explanation of your request.</li>
                <li>Verification: Allow up to 3 business days for our team to review your case. Additional information may be requested.</li>
                <li>Resolution: Once approved, refunds are processed within 7-10 business days.</li>
              </ul>
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">7. Exclusions</h2>
            <p className="mb-8">
              Refunds are not provided for:
              <ul className="list-disc pl-6 mb-8">
                <li>Change of mind after purchase.</li>
                <li>Misuse or misunderstanding of the product functionality.</li>
                <li>Products that have been successfully accessed or downloaded.</li>
              </ul>
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">8. Customer Support</h2>
            <p className="mb-8">
              For any questions or issues regarding this policy or your purchase, please reach out to our support team:
              <ul className="list-none mb-8">
                <li>Email: support@growthacademy-hq.com</li>
                <li>Mailing Address: Baumchulenstrasse 74, Berlin, 12437, Germany</li>
              </ul>
              Our team is available to assist you during business hours (Monday to Friday, 9:00 AM – 5:00 PM CET).
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">9. Changes to This Policy</h2>
            <p className="mb-8">
              We may update this policy periodically. Updates will be posted on this page with the revised effective date. 
              Continued use of the Website constitutes acceptance of any changes.
            </p>

            <p className="mb-8">
              This Refund and Returns Policy is designed to ensure transparency and fairness for both our customers and Growth Academy HQ. 
              If you have any concerns, please don’t hesitate to reach out.
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

export default RefundPolicy;