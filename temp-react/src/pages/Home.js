import React from 'react';
import { motion } from 'framer-motion';

function Home() {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero" 
            id="home"
        >
            <div className="hero-main">
                <motion.div 
                    className="hero-left"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1>Grow your skills, Grow your business.</h1>
                    <p>Growth Academy HQ provides easy-to-understand content to elevate your marketing and customer experience skills. Whether you're just starting or looking to grow, we're here to help you succeed.</p>
                    <a 
                        href="https://payhip.com/GrowthAcademyHQ" 
                        className="cta-button" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        Start Learning NOW!
                    </a>
                </motion.div>
                
                <motion.div 
                    className="hero-right"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                >
                    <motion.img 
                        src="/assets/workspace-with-laptop.jpg" 
                        alt="Growth Analytics Dashboard" 
                        className="hero-image"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{
                            duration: 0.5,
                            delay: 0.3,
                            ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.02 }}
                    />
                    {/* Add gradient overlay */}
                    <div className="image-overlay"></div>
                </motion.div>
            </div>

            {/* What We Offer Section */}
            <motion.div 
                className="features-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <h2>What We Offer</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <h3>Marketing Strategy</h3>
                        <p>Learn proven marketing strategies to grow your business effectively.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Customer Experience</h3>
                        <p>Master the art of delivering exceptional customer experiences.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Growth Tactics</h3>
                        <p>Discover practical tactics for sustainable business growth.</p>
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
}

export default Home;