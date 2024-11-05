import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: '',
        source: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            await addDoc(collection(db, 'contacts'), {
                ...formData,
                timestamp: Timestamp.now()
            });
            
            setSubmitStatus('success');
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
        }
        
        setIsSubmitting(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="contact" 
            id="contact"
        >
            <div className="contact-container">
                <motion.div 
                    className="contact-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <img 
                        src="/assets/growth-academy-logo.png" 
                        alt="Growth Academy Logo" 
                        className="contact-logo"
                    />
                    <h2 className="section-title">Contact Us</h2>
                </motion.div>
                
                <motion.form 
                    className="contact-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name *</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject of the Inquiry *</label>
                        <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select an option...</option>
                            <option value="general">General Inquiry</option>
                            <option value="ebooks">Questions about E-books</option>
                            <option value="support">Support Request</option>
                            <option value="collaboration">Collaboration Request</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message *</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="5"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="source">How did you hear about us? *</label>
                        <select
                            id="source"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select an option...</option>
                            <option value="social">Social Media</option>
                            <option value="search">Search Engine (Google, Safari, etc)</option>
                            <option value="ads">Ads</option>
                            <option value="referral">Referral</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>

                    {submitStatus === 'success' && (
                        <div className="submit-message success">
                            Thank you for your message! We'll get back to you soon.
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="submit-message error">
                            There was an error sending your message. Please try again.
                        </div>
                    )}
                </motion.form>

                <motion.div 
                    className="social-media-section"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <h2>CONNECT WITH US</h2>
                    <div className="social-icons">
                        <a href="https://www.tiktok.com/@growthacademyhq" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/tiktok-logo.svg" alt="TikTok" className="social-icon" />
                        </a>
                        <a href="https://www.instagram.com/growthacademyhq/" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/instagram-logo.svg" alt="Instagram" className="social-icon" />
                        </a>
                        <a href="https://www.linkedin.com/company/growth-academy-hq/" target="_blank" rel="noopener noreferrer">
                            <img src="/assets/linkedin-logo.svg" alt="LinkedIn" className="social-icon" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}

export default Contact;