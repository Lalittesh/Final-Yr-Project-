import React from 'react';
import PageTransition from '../components/PageTransition/PageTransition';

export default function Assistant() {
  return (
    <PageTransition>
      <div className="placeholder-page">
        <span className="eyebrow"><span className="dot"></span>PHASE 2 PREVIEW</span>
        <h1>AI Assistant</h1>
        <p className="description">
          Ask questions, lookup specific Legal Metrology Act clauses, or request clarification on label compliance violations using our AI Assistant.
        </p>
        
        <div className="coming-soon-card">
          <div className="coming-soon-badge">COMING SOON</div>
          <p>The interactive LMPC legal regulations AI chatbot will be deployed in Phase 4B.</p>
        </div>

        <style>{`
          .placeholder-page {
            max-width: 680px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding: 40px 0;
          }
          .placeholder-page h1 {
            font-size: 32px;
            color: var(--ink);
          }
          .description {
            font-size: 16px;
            color: var(--gray);
            line-height: 1.6;
          }
          .coming-soon-card {
            margin-top: 24px;
            background: var(--glass-strong);
            border: 1px dashed var(--border);
            border-radius: var(--radius-md);
            padding: 32px;
            text-align: center;
            box-shadow: var(--shadow-soft);
          }
          .coming-soon-badge {
            display: inline-block;
            background: linear-gradient(135deg, var(--primary), var(--violet));
            color: #fff;
            font-family: 'JetBrains Mono', monospace;
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.1em;
            padding: 6px 16px;
            border-radius: 999px;
            margin-bottom: 16px;
            box-shadow: 0 4px 10px rgba(196, 30, 58, 0.2);
          }
          .coming-soon-card p {
            font-size: 14.5px;
            color: var(--gray);
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
