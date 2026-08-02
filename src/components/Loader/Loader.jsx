import React from 'react';

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-ring">
        <div className="loader-core"></div>
      </div>
      <span className="loader-text">Verifying Compliance...</span>
      
      <style>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }
        
        .loader-ring {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, var(--primary) 0%, var(--gold) 50%, var(--violet) 100%);
          animation: spin 1.2s linear infinite;
          padding: 3.5px;
          box-shadow: 0 10px 30px -8px rgba(196, 30, 58, 0.4);
        }
        
        .loader-ring::after {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--bg, #FBF4EC);
        }
        
        .loader-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 12px var(--primary);
          animation: pulse 1.6s ease-in-out infinite alternate;
        }
        
        .loader-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          color: var(--primary-dark);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          opacity: 0.85;
          animation: textFade 1.6s ease-in-out infinite alternate;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.85); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }
        
        @keyframes textFade {
          0% { opacity: 0.5; }
          100% { opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}
