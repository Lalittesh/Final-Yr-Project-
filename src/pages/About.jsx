import React from 'react';
import PageTransition from '../components/PageTransition/PageTransition';

export default function About() {
  return (
    <PageTransition>
      <div className="about-page">
        <div className="wrap">
          <div className="reveal in">
            <span className="eyebrow"><span className="dot"></span>OUR MISSION</span>
            <h1 className="about-title">About MetroAI</h1>
            <p className="about-lead">
              MetroAI is a state-of-the-art legal compliance check platform designed to streamline pre-packaged commodity audits.
            </p>
          </div>

          <div className="about-grid reveal in" style={{ '--i': 1 }}>
            <div className="about-card">
              <h3>Legal Metrology, Modernized</h3>
              <p>
                Navigating the Legal Metrology Act (LMPC) and package declaration requirements in India can be complex. MetroAI utilizes advanced artificial intelligence, OCR technology, and compliance rulesets to check declarations instantly.
              </p>
            </div>
            <div className="about-card">
              <h3>Real-time Label Audits</h3>
              <p>
                From manufacturing date validations to net quantity formatting rules, MRP declarations, and country-of-origin labels, MetroAI scans, verifies, and outputs instant compliance checklists.
              </p>
            </div>
          </div>

          <div className="about-footer-note reveal in" style={{ '--i': 2 }}>
            <p className="mono">Version 1.0.0 (Phase 2 Architecture Ready)</p>
          </div>
        </div>

        <style>{`
          .about-page {
            padding: 180px 0 100px;
            min-height: 80vh;
            display: flex;
            align-items: center;
          }
          .about-title {
            font-size: clamp(36px, 5vw, 56px);
            margin: 24px 0;
          }
          .about-lead {
            font-size: 20px;
            color: var(--gray);
            line-height: 1.7;
            max-width: 720px;
            margin-bottom: 56px;
          }
          .about-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
            margin-bottom: 56px;
          }
          @media (max-width: 768px) {
            .about-grid {
              grid-template-columns: 1fr;
            }
          }
          .about-card {
            background: var(--glass);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 40px;
            box-shadow: var(--shadow-soft);
          }
          .about-card h3 {
            font-size: 22px;
            margin-bottom: 16px;
          }
          .about-card p {
            color: var(--gray);
            line-height: 1.7;
            font-size: 15px;
          }
          .about-footer-note {
            text-align: center;
            color: var(--gray-light);
            font-size: 13px;
            margin-top: 40px;
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
