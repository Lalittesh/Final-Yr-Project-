import React from 'react';
import { Link } from 'react-router-dom';
import { useMagnetic } from '../../hooks/useMagnetic';

export default function CTA() {
  const ctaBtn = useMagnetic();

  return (
    <section className="cta-section" id="contact">
      <div className="aurora">
        <span></span>
        <span></span>
      </div>
      <div className="wrap">
        <div className="cta-box reveal-scale">
          <h2>Ready to scan?</h2>
          <p>Run your first compliance check in under a minute — no setup, no training required.</p>
          <Link 
            to="/login" 
            className="btn btn-ghost magnetic"
            {...ctaBtn}
          >
            Get Started Free
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
