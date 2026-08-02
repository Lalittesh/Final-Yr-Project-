import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div 
      className="ls-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
    >
      <div className="ls-blob blob1"></div>
      <div className="ls-blob blob2"></div>

      <div className="ls-container">
        {/* Logo ring spinner */}
        <div className="ls-spinner-wrapper">
          <div className="ls-outer-spinner"></div>
          <div className="ls-inner-spinner"></div>
          <div className="ls-logo-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M12 8v8" />
              <path d="M9 11h6" />
            </svg>
          </div>
        </div>

        <motion.div 
          className="ls-text-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }}
        >
          <span className="ls-gov-tag">DEPARTMENT OF CONSUMER AFFAIRS</span>
          <h2 className="ls-app-name">MetroAI</h2>
          <span className="ls-status">Initializing Compliance Engine...</span>
        </motion.div>
      </div>

      <style>{`
        .ls-screen {
          position: fixed;
          inset: 0;
          background: linear-gradient(180deg, #FDF7EF, #FBF4EC 60%, #F7ECDD 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100000;
          overflow: hidden;
        }

        .ls-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.28;
          z-index: 0;
        }

        .ls-blob.blob1 {
          width: 400px;
          height: 400px;
          background: var(--primary, #C41E3A);
          top: 15%;
          left: 10%;
          animation: float1 8s ease-in-out infinite alternate;
        }

        .ls-blob.blob2 {
          width: 350px;
          height: 350px;
          background: var(--gold, #D4AF37);
          bottom: 15%;
          right: 10%;
          animation: float2 9s ease-in-out infinite alternate;
        }

        @keyframes float1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-30px, 40px) scale(1.1); }
        }

        @keyframes float2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(40px, -30px) scale(1.08); }
        }

        .ls-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 32px;
          z-index: 1;
        }

        .ls-spinner-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ls-outer-spinner {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: var(--primary, #C41E3A);
          border-bottom-color: var(--primary, #C41E3A);
          animation: spin-clockwise 1.6s linear infinite;
        }

        .ls-inner-spinner {
          position: absolute;
          width: 80%;
          height: 80%;
          border-radius: 50%;
          border: 2px solid transparent;
          border-left-color: var(--gold, #D4AF37);
          border-right-color: var(--gold, #D4AF37);
          animation: spin-counter-clockwise 1.2s linear infinite;
        }

        .ls-logo-center {
          position: absolute;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary, #C41E3A), var(--violet, #6E1423));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 20px rgba(196, 30, 58, 0.3);
          animation: pulse-logo 1.6s ease-in-out infinite alternate;
        }

        .ls-logo-center svg {
          width: 22px;
          height: 22px;
        }

        @keyframes spin-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-counter-clockwise {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes pulse-logo {
          from { transform: scale(0.92); }
          to { transform: scale(1.08); }
        }

        .ls-text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          text-align: center;
        }

        .ls-gov-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--primary-dark, #8B0F28);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .ls-app-name {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--ink, #1C0E10);
          margin: 4px 0 2px;
        }

        .ls-status {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          color: var(--gray, #6B5D5F);
          font-weight: 500;
          animation: blink-text 1.4s ease-in-out infinite alternate;
        }

        @keyframes blink-text {
          from { opacity: 0.5; }
          to { opacity: 0.95; }
        }
      `}</style>
    </motion.div>
  );
}
