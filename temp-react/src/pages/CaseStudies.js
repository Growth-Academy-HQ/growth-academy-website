import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function CaseStudies() {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="case-studies" 
            id="case-studies"
        >
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                    textAlign: 'center',
                    fontSize: '2.5rem',
                    marginBottom: '3rem'
                }}
            >
                Case Studies
            </motion.h2>

            <div className="case-grid">
                <motion.div 
                    className="case-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <img src="/assets/dropbox-logo.svg" alt="Dropbox" className="case-icon" />
                    <h3>Dropbox: Referral Marketing</h3>
                    
                    <div className="case-category">CHALLENGE</div>
                    <p>Dropbox needed a cost-effective way to acquire users in a competitive cloud storage market.</p>
                    
                    <div className="case-category">SOLUTION</div>
                    <p>Implemented a referral program rewarding both parties with storage space.</p>
                    
                    <div className="case-category">RESULTS</div>
                    <ul>
                        <li>Increased sign-ups by 60%</li>
                        <li>Achieved 3900% growth in 15 months</li>
                        <li>Responsible for 35% of daily sign-ups</li>
                    </ul>
                    <Link to="/case-studies/dropbox" className="learn-more-btn">Learn More</Link>
                </motion.div>

                <motion.div 
                    className="case-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <img src="/assets/airbnb-logo.svg" alt="Airbnb" className="case-icon" />
                    <h3>Airbnb: Optimizing Listings</h3>
                    
                    <div className="case-category">CHALLENGE</div>
                    <p>In the early days, Airbnb struggled to attract hosts and guests to its platform.</p>
                    
                    <div className="case-category">SOLUTION</div>
                    <p>Created a feature allowing automatic cross-posting to Craigslist.</p>
                    
                    <div className="case-category">RESULTS</div>
                    <ul>
                        <li>Achieved significant user base growth</li>
                        <li>Established market foothold</li>
                        <li>Built trusted brand recognition</li>
                    </ul>
                    <Link to="/case-studies/airbnb" className="learn-more-btn">Learn More</Link>
                </motion.div>

                <motion.div 
                    className="case-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <img src="/assets/linkedin-logo.svg" alt="LinkedIn" className="case-icon" />
                    <h3>LinkedIn: Building Network Effects</h3>
                    
                    <div className="case-category">CHALLENGE</div>
                    <p>LinkedIn needed to establish itself as a professional networking site.</p>
                    
                    <div className="case-category">SOLUTION</div>
                    <p>Implemented contact import feature for easy connection.</p>
                    
                    <div className="case-category">RESULTS</div>
                    <ul>
                        <li>Significant early user base growth</li>
                        <li>Reached 1 million users in 16 months</li>
                        <li>Became the go-to professional platform</li>
                    </ul>
                    <Link to="/case-studies/linkedin" className="learn-more-btn">Learn More</Link>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default CaseStudies;