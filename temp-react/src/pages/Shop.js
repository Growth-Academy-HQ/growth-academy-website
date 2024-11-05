import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function Shop() {
    useEffect(() => {
        // Remove any existing Payhip scripts first
        const existingScript = document.getElementById('payhip-script');
        if (existingScript) {
            existingScript.remove();
        }

        // Create and append Payhip script
        const script = document.createElement('script');
        script.id = 'payhip-script';
        script.src = "https://payhip.com/embed-page.js";
        script.async = true;

        script.onload = () => {
            // Force Payhip to reinitialize
            if (window.Payhip) {
                window.Payhip.init();
            }
        };

        document.body.appendChild(script);

        return () => {
            // Cleanup on component unmount
            const script = document.getElementById('payhip-script');
            if (script) {
                script.remove();
            }
        };
    }, []);

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="shop" 
            id="shop"
        >
            <motion.h2 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="section-title"
            >
                Shop
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="shop-container"
            >
                <div 
                    className="payhip-embed-page" 
                    data-key="peXsw"
                    style={{
                        width: '100%',
                        maxWidth: '1200px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.05)',
                        borderRadius: '8px',
                        padding: '2rem',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                    }}
                ></div>
            </motion.div>
        </motion.section>
    );
}

export default Shop;