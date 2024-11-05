import React from 'react';
import { motion } from 'framer-motion';

function About() {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="about" 
            id="about"
        >
            <div className="about-container">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="about-video-container"
                >
                    <video className="about-video" autoPlay loop muted playsInline>
                        <source src="/assets/dna-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>
                <motion.div 
                    className="about-content"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <h2 className="section-title">About Us</h2>
                    <motion.div 
                        className="about-text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <p>Growth Academy HQ, represented by our distinctive DNA-inspired logo, symbolizes the essence of growth as an integral part of your business's journey.</p>
                        <p>Our academy aims to decode complex strategies and best practices, making them accessible and actionable for professionals and businesses seeking sustainable success.</p>
                        <p>At Growth Academy HQ, we are committed to equipping you with the tools and insights needed to optimize growth and enhance customer experiences, ensuring your business thrives in an ever-evolving landscape.</p>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default About;