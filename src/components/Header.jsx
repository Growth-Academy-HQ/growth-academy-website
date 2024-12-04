import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";
import { ProfileDropdown } from './profile/ProfileDropdown';

export function Header() {
  const { isSignedIn } = useUser();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    ['About', '/about'],
    ['Case Studies', '/case-studies'],
    ['GrowthAI', '/growth-ai'],
    ...(isSignedIn ? [['Dashboard', '/dashboard']] : []),
    ['Shop', '/shop'],
    ['Contact', '/contact'],
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-ga-black/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="relative group">
          <img 
            src="/assets/growth-academy-logo.png" 
            alt="Growth Academy" 
            className="h-10 transition-transform group-hover:scale-105"
          />
        </Link>

        <div className="flex gap-8">
          {navLinks.map(([label, path]) => (
            <Link
              key={path}
              to={path}
              className="relative font-alata hover:text-ga-light transition-colors group"
            >
              {label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ga-white transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {!isSignedIn ? (
            <Link
              to="/signin"
              className="relative font-alata hover:text-ga-light transition-colors group"
            >
              Sign In
            </Link>
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </nav>
    </header>
  );
}