import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useMagnetic';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const magneticButton = useMagnetic();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="siteHeader" className={scrolled ? 'scrolled' : ''}>
      <div className="wrap">
        <nav>
          <Link to="/" className="logo">
            <span className="logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10" />
                <circle cx="19" cy="18" r="2.4" />
              </svg>
            </span>
            MetroAI
          </Link>
          
          <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
            {isHome ? (
              <>
                <a href="#home" onClick={closeMenu}>Home</a>
                <a href="#features" onClick={closeMenu}>Features</a>
                <a href="#how" onClick={closeMenu}>How It Works</a>
                <a href="#technology" onClick={closeMenu}>Technology</a>
              </>
            ) : (
              <>
                <Link to="/#home" onClick={closeMenu}>Home</Link>
                <Link to="/#features" onClick={closeMenu}>Features</Link>
                <Link to="/#how" onClick={closeMenu}>How It Works</Link>
                <Link to="/#technology" onClick={closeMenu}>Technology</Link>
              </>
            )}
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/contact" onClick={closeMenu}>Contact</Link>
            <Link to="/login" className="nav-login" style={{ display: 'none' }}>Login</Link>
          </div>
          
          <div className="nav-actions">
            <Link to="/login" className="nav-login">Login</Link>
            <Link 
              to="/login" 
              className="btn btn-primary btn-sm get-started-desktop magnetic"
              {...magneticButton}
            >
              Get Started
            </Link>
            <button 
              className="nav-toggle" 
              id="navToggle" 
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
