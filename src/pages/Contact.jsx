import React from 'react';
import PageTransition from '../components/PageTransition/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <div className="contact-page">
        <div className="wrap">
          <div className="contact-grid">
            <div className="contact-info reveal in">
              <span className="eyebrow"><span className="dot"></span>GET IN TOUCH</span>
              <h1>Contact Our Compliance Team</h1>
              <p>
                Have questions about MetroAI, LMPC registration regulations, or specific packaged commodity standards? Our specialists are here to assist.
              </p>
              
              <div className="info-list">
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <strong>Support Email</strong>
                    <p className="mono">support@metro-compliance.ai</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <div className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <strong>Office Location</strong>
                    <p>New Delhi, DL, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container reveal in" style={{ '--i': 1 }}>
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <h3>Send Us a Message</h3>
                <div className="form-group">
                  <label htmlFor="c-name">Full Name</label>
                  <input type="text" id="c-name" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label htmlFor="c-email">Email Address</label>
                  <input type="email" id="c-email" placeholder="name@company.com" />
                </div>
                <div className="form-group">
                  <label htmlFor="c-msg">Message</label>
                  <textarea id="c-msg" rows="4" placeholder="How can we help your compliance workflow?"></textarea>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>

        <style>{`
          .contact-page {
            padding: 180px 0 100px;
            min-height: 80vh;
            display: flex;
            align-items: center;
          }
          .contact-grid {
            display: grid;
            grid-template-columns: 1.1fr 0.9fr;
            gap: 60px;
            align-items: center;
          }
          @media (max-width: 900px) {
            .contact-grid {
              grid-template-columns: 1fr;
              gap: 48px;
            }
          }
          .contact-info h1 {
            font-size: clamp(34px, 4.5vw, 48px);
            margin: 20px 0;
          }
          .contact-info p {
            font-size: 16px;
            color: var(--gray);
            line-height: 1.7;
            margin-bottom: 40px;
          }
          .info-list {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }
          .info-item {
            display: flex;
            align-items: center;
            gap: 16px;
          }
          .info-icon {
            width: 44px;
            height: 44px;
            border-radius: 12px;
            background: rgba(196, 30, 58, 0.08);
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .info-icon svg {
            width: 20px;
            height: 20px;
          }
          .info-item strong {
            font-size: 14.5px;
            display: block;
          }
          .info-item p {
            font-size: 13.5px;
            color: var(--gray);
            margin: 0;
          }
          .contact-form-container {
            background: var(--glass-strong);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 40px;
            box-shadow: var(--shadow-lift);
          }
          @media (max-width: 480px) {
            .contact-form-container {
              padding: 24px;
            }
          }
          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          .contact-form h3 {
            font-size: 20px;
            margin-bottom: 8px;
          }
          .contact-form label {
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 6px;
            display: block;
          }
          .contact-form input, .contact-form textarea {
            width: 100%;
            padding: 12px 14px;
            border-radius: var(--radius-sm);
            border: 1.5px solid var(--border);
            background: rgba(255, 255, 255, 0.5);
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            transition: all 0.3s ease;
          }
          .contact-form input:focus, .contact-form textarea:focus {
            outline: none;
            border-color: var(--primary);
            background: #fff;
            box-shadow: 0 0 0 4px rgba(196, 30, 58, 0.08);
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
