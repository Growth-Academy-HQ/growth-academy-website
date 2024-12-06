import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link

const PrivacyPolicy = () => {
  return (
    <div className="bg-ga-black text-ga-white min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-alata mb-4">Privacy Policy</h1>
          <p className="text-ga-light mb-8">Effective Date: December 5, 2024</p>

          <Link to="/" className="inline-block mb-8 text-ga-light hover:text-ga-white transition-colors">
            &larr; Back to Home
          </Link>

          <div className="prose prose-invert max-w-none">
            <p className="mb-8">
              Growth Academy HQ ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, 
              Growth Academy (the "Website"), and purchase our products or services.
            </p>

            <p className="mb-8">
              By using our Website, you agree to the terms of this Privacy Policy. If you do not agree with this policy, 
              please refrain from using the Website.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">1. Data Controller Information</h2>
            <p className="mb-4">Growth Academy HQ is the data controller responsible for your personal data.</p>
            <ul className="list-none mb-8">
              <li>Business Name: Growth Academy HQ</li>
              <li>Address: Baumchulenstrasse 74, Berlin, 12437, Germany</li>
              <li>Email: contact.growthacademyhq@gmail.com</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect the following types of personal data:</p>

            <h3 className="text-xl font-alata mt-8 mb-4">2.1 Information You Provide Directly</h3>
            <ul className="list-disc pl-6 mb-6">
              <li>Contact Information: Name, email address, and physical address when you create an account or make a purchase.</li>
              <li>Payment Information: Billing address, payment details (processed via secure third-party payment processors).</li>
              <li>Account Information: Username, password, and preferences for using the Website.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">2.2 Automatically Collected Information</h3>
            <p className="mb-4">When you visit the Website, we may collect information about:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Device Data: IP address, browser type, operating system, and device type.</li>
              <li>Usage Data: Pages visited, time spent on the Website, referral sources, and interactions with content.</li>
              <li>Cookies: See Section 7 for more information on cookies.</li>
            </ul>

            <h3 className="text-xl font-alata mt-8 mb-4">2.3 Third-Party Data</h3>
            <p className="mb-6">
              We may receive personal data about you from payment processors or marketing partners who help us deliver services.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">3. Purpose of Data Collection</h2>
            <p className="mb-4">We collect and process your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mb-8">
              <li>To process transactions and deliver purchased products or services.</li>
              <li>To manage your account and provide customer support.</li>
              <li>To send updates, newsletters, and promotional content (with your consent).</li>
              <li>To analyze user behavior to improve our services and optimize the Website.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">4. Legal Basis for Processing</h2>
            <p className="mb-4">We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 mb-8">
              <li>Contract Performance: To fulfill the contracts you enter into with us, including processing payments and delivering services.</li>
              <li>Consent: When you sign up for newsletters or provide information for optional features.</li>
              <li>Legal Obligations: To comply with applicable laws, such as tax and financial regulations.</li>
              <li>Legitimate Interests: To improve and protect our Website, prevent fraud, and market our services to you (where permissible).</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">5. Sharing of Your Data</h2>
            <p className="mb-4">We do not sell your data to third parties. However, we may share your data with:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Service Providers: Payment processors, hosting providers, email marketing platforms, and analytics services.</li>
              <li>Legal Authorities: When required by law or to protect our rights.</li>
              <li>Business Transfers: In the event of a merger, acquisition, or sale of assets, your personal data may be transferred to the new entity.</li>
            </ul>
            <p className="mb-8">All third-party processors are bound by GDPR-compliant contracts to protect your data.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">6. International Transfers</h2>
            <p className="mb-8">
              As we are based in the European Union, your data is primarily processed in the EU. If we transfer your data outside the EU, 
              we will ensure appropriate safeguards, such as Standard Contractual Clauses, are in place.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="mb-4">We use cookies and similar tracking technologies to enhance your experience. These may include:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Essential Cookies: Required for the Website to function properly.</li>
              <li>Performance Cookies: To analyze user behavior and improve the Website.</li>
              <li>Marketing Cookies: To deliver personalized advertisements and content.</li>
            </ul>
            <p className="mb-8">You can manage or disable cookies via your browser settings.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">8. Data Retention</h2>
            <p className="mb-4">
              We retain your personal data only as long as necessary for the purposes outlined in this policy, 
              including legal or regulatory requirements. Specific retention periods are:
            </p>
            <ul className="list-disc pl-6 mb-8">
              <li>Transaction Data: Retained for 7 years to comply with tax regulations.</li>
              <li>Account Data: Retained until account deletion.</li>
              <li>Marketing Data: Retained until you withdraw consent.</li>
            </ul>

            <h2 className="text-2xl font-alata mt-12 mb-4">9. Your Rights</h2>
            <p className="mb-4">Under the GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access: Request access to your personal data.</li>
              <li>Rectification: Correct inaccurate or incomplete data.</li>
              <li>Erasure: Request the deletion of your data (subject to legal obligations).</li>
              <li>Data Portability: Request a copy of your data in a machine-readable format.</li>
              <li>Objection: Object to processing based on legitimate interests or direct marketing.</li>
              <li>Withdraw Consent: Revoke consent at any time for data processing based on consent.</li>
            </ul>
            <p className="mb-8">To exercise your rights, contact us at contact.growthacademyhq@gmail.com.</p>

            <h2 className="text-2xl font-alata mt-12 mb-4">10. Data Security</h2>
            <p className="mb-8">
              We use technical and organizational measures to protect your data from unauthorized access, alteration, 
              disclosure, or destruction. These measures include encryption, secure servers, and restricted access.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">11. Third-Party Websites</h2>
            <p className="mb-8">
              Our Website may contain links to third-party websites. We are not responsible for the privacy practices 
              of these external sites.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="mb-8">
              We reserve the right to update this policy at any time. Changes will be posted on this page with the 
              updated effective date.
            </p>

            <h2 className="text-2xl font-alata mt-12 mb-4">13. Contact Information</h2>
            <p className="mb-4">If you have questions about this Privacy Policy or our data practices, please contact us:</p>
            <ul className="list-none mb-8">
              <li>Email: contact.growthacademyhq@gmail.com</li>
              <li>Mailing Address: Baumchulenstrasse 74, Berlin, 12437, Germany</li>
            </ul>

            <Link to="/" className="inline-block mt-8 text-ga-light hover:text-ga-white transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;