import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    {
      icon: "/assets/linkedin-logo.svg",
      url: "https://www.linkedin.com/company/growth-academy-hq/",
      name: "LinkedIn"
    },
    {
      icon: "/assets/instagram-logo.svg",
      url: "https://www.instagram.com/growthacademyhq/",
      name: "Instagram"
    },
    {
      icon: "/assets/tiktok-logo.svg",
      url: "https://www.tiktok.com/@growthacademyhq",
      name: "TikTok"
    }
  ];

  return (
    <footer className="relative z-10 bg-ga-black/50 backdrop-blur-sm border-t border-ga-gray/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <img 
              src="/assets/growth-academy-logo.png" 
              alt="Growth Academy" 
              className="h-12"
            />
            <p className="text-ga-light">
              Empowering professionals with the skills and knowledge needed for sustainable business growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-alata text-xl">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="/about" className="text-ga-light hover:text-ga-white transition-colors">About</a>
              <a href="/case-studies" className="text-ga-light hover:text-ga-white transition-colors">Case Studies</a>
              <a href="/shop" className="text-ga-light hover:text-ga-white transition-colors">Shop</a>
              <a href="/contact" className="text-ga-light hover:text-ga-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Social and Connect */}
          <div className="space-y-4">
            <h3 className="font-alata text-xl">Connect With Us</h3>
            <div className="flex gap-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="h-6 w-6 opacity-70 hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              ))}
            </div>
            <p className="text-ga-light text-sm">
              Follow us for daily tips and insights on marketing and business growth.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-ga-gray/20 text-center text-ga-light text-sm">
          <p>© {new Date().getFullYear()} Growth Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;