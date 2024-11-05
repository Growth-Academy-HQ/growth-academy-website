import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="main-header">
            <div className="header-container">
                <Link to="/" className="header-logo">
                    <img src="/assets/growth-academy-logo.png" alt="Growth Academy Logo" />
                </Link>
                <nav className="header-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/about" className="nav-link">About</Link>
                    <Link to="/case-studies" className="nav-link">Case Studies</Link>
                    <Link to="/shop" className="nav-link">Shop</Link>
                    <Link to="/contact" className="nav-link">Contact</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;