import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <img src="/assets/growth-academy-logo.png" alt="Growth Academy Logo" className="footer-logo" />
                    <p>Elevating your marketing and customer experience skills.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/case-studies">Case Studies</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Connect With Us</h3>
                    <div className="footer-social">
                        <a href="https://www.tiktok.com/@growthacademyhq" target="_blank" rel="noopener noreferrer">TikTok</a>
                        <a href="https://www.instagram.com/growthacademyhq/" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://www.linkedin.com/company/growth-academy-hq/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h3>Contact Info</h3>
                    <p>Feel free to reach out</p>
                    <a href="mailto:contact.growthacademyhq@gmail.com" className="footer-email">contact.growthacademyhq@gmail.com</a>
                </div>
            </div>
            
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Growth Academy HQ. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;