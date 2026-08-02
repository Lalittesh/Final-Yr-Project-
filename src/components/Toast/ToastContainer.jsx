import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';

export default function ToastContainer() {
  const { toasts } = useAuth();

  return (
    <div className="toast-container-overlay">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className={`toast-item ${toast.type}`}
            initial={{ opacity: 0, x: 50, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95, transition: { duration: 0.25 } }}
            layout
          >
            <div className="toast-icon">
              {toast.type === 'success' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              )}
              {toast.type === 'warning' && (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              )}
            </div>
            <div className="toast-message">{toast.message}</div>
          </motion.div>
        ))}
      </AnimatePresence>

      <style>{`
        .toast-container-overlay {
          position: fixed;
          top: 24px;
          right: 24px;
          z-index: 10000;
          display: flex;
          flex-direction: column;
          gap: 12px;
          pointer-events: none;
          max-width: 380px;
          width: 100%;
        }

        @media (max-width: 480px) {
          .toast-container-overlay {
            top: 16px;
            right: 16px;
            left: 16px;
            max-width: none;
            width: auto;
          }
        }

        .toast-item {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border-radius: var(--radius-md, 18px);
          background: var(--glass-strong);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--border);
          box-shadow: 0 20px 50px rgba(60, 15, 20, 0.15);
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .toast-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
        }

        .toast-item.success::before {
          background-color: var(--success);
        }

        .toast-item.error::before {
          background-color: var(--error);
        }

        .toast-item.warning::before {
          background-color: var(--warning);
        }

        .toast-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .success .toast-icon {
          background-color: rgba(34, 197, 94, 0.12);
          color: var(--success);
        }

        .error .toast-icon {
          background-color: rgba(239, 68, 68, 0.12);
          color: var(--error);
        }

        .warning .toast-icon {
          background-color: rgba(245, 158, 11, 0.12);
          color: var(--warning);
        }

        .toast-icon svg {
          width: 14px;
          height: 14px;
        }

        .toast-message {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
