import React from 'react';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#" className="logo" style={{ color: '#fff' }}>
              <span className="logo-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h10" />
                  <circle cx="19" cy="18" r="2.4" />
                </svg>
              </span>
              MetroAI
            </a>
            <p>AI-powered legal metrology compliance, built for inspectors, retailers, and manufacturers.</p>
            <div className="social">
              <a href="#" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fff' }}>
                  <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013 4.9a4.1 4.1 0 001.3 5.5c-.6 0-1.3-.2-1.8-.5v.1c0 2 1.4 3.6 3.3 4a4 4 0 01-1.9.1 4.1 4.1 0 003.8 2.9A8.3 8.3 0 012 18.6a11.6 11.6 0 006.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.3z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fff' }}>
                  <path d="M6.9 8.4H3.5V20H6.9V8.4zM5.2 3.4a2 2 0 100 4 2 2 0 000-4zM20.5 20h-3.4v-6c0-1.4 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20H9.4V8.4h3.2v1.6h.1c.5-.8 1.6-1.8 3.3-1.8 3.5 0 4.1 2.3 4.1 5.3V20z" />
                </svg>
              </a>
              <a href="#" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: '#fff' }}>
                  <path d="M12 2a10 10 0 00-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.1-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 015 0c1.9-1.3 2.7-1 2.7-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0012 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h5>Product</h5>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#preview">Live Preview</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Resources</h5>
            <ul>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Compliance Guide</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
          <div className="foot-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Data Security</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 MetroAI. All rights reserved.</span>
          <span>Made for Legal Metrology compliance teams.</span>
        </div>
      </div>
    </footer>
  );
}
