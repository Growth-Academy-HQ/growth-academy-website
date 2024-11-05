import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function DropboxCaseStudy() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="case-study-page"
        >
            <button 
                onClick={() => navigate('/case-studies')}
                className="back-button"
            >
                ← Back to Case Studies
            </button>

            <div className="case-hero-container">
                <img 
                    src="/assets/dropbox-logo.svg" 
                    alt="Dropbox" 
                    className="case-hero-logo"
                />
                <h1 className="case-hero-title">
                    Dropbox: How Referral Marketing Built a $10 Billion Company
                </h1>
            </div>

            <div className="case-stats-container">
                <div className="stat-card">
                    <h3>3900%</h3>
                    <p>User Growth in 15 Months</p>
                </div>
                <div className="stat-card">
                    <h3>4M</h3>
                    <p>Users in First 14 Months</p>
                </div>
                <div className="stat-card">
                    <h3>2.8M</h3>
                    <p>Referral Invites Sent</p>
                </div>
            </div>

            <div className="case-study-content">
                <section className="case-study-section">
                    <h2>Overview</h2>
                    <div className="content">
                        <p>Founded in 2007, Dropbox revolutionized file sharing and storage with a simple solution 
                        to a common problem. Their true innovation came from their groundbreaking referral program, 
                        which turned users into their most powerful marketing channel.</p>
                    </div>
                </section>

                <section className="case-study-section">
                    <h2>The Challenge</h2>
                    <div className="content">
                        <ul>
                            <li>High customer acquisition costs (over $400 per user)</li>
                            <li>Complex product difficult to explain through advertising</li>
                            <li>Strong competition from established tech giants</li>
                            <li>Limited marketing budget as a startup</li>
                            <li>Need to build trust in cloud storage (new concept)</li>
                        </ul>
                    </div>
                </section>

                <section className="case-study-section">
                    <h2>Strategy & Implementation</h2>
                    <div className="content">
                        <h3>The Double-Sided Referral Program</h3>
                        <ul>
                            <li>Existing users received 500MB bonus space per referral</li>
                            <li>New users received 500MB bonus space upon signup</li>
                            <li>Up to 16GB free space through referrals</li>
                        </ul>

                        <h3>Key Program Features</h3>
                        <ul>
                            <li>Simple one-click referral process</li>
                            <li>Progress tracking for referral space</li>
                            <li>Multiple sharing options (email, social)</li>
                            <li>Clear value proposition for both parties</li>
                        </ul>
                    </div>
                </section>

                <section className="case-study-section">
                    <h2>Results & Impact</h2>
                    <div className="content">
                        <h3>Immediate Impact</h3>
                        <ul>
                            <li>Permanent 60% increase in signups</li>
                            <li>2.8 million direct referral invites sent</li>
                            <li>User base grew from 100k to 4M in 14 months</li>
                            <li>35% of daily signups from referrals</li>
                        </ul>

                        <h3>Long-Term Success</h3>
                        <ul>
                            <li>Built a $10 billion company through word-of-mouth</li>
                            <li>4 million user milestone in just over a year</li>
                            <li>Created a referral program model others emulate</li>
                            <li>Dramatically reduced acquisition costs</li>
                        </ul>
                    </div>
                </section>

                <section className="case-study-section">
                    <h2>Key Takeaways</h2>
                    <div className="content">
                        <ul>
                            <li>Make referrals mutually beneficial</li>
                            <li>Keep the referral process simple</li>
                            <li>Align rewards with product value</li>
                            <li>Track and optimize continuously</li>
                            <li>Build trust through existing networks</li>
                        </ul>
                    </div>
                </section>
            </div>
        </motion.div>
    );
}

export default DropboxCaseStudy;