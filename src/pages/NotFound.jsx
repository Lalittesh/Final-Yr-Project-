import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition/PageTransition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="nf-page">
        <div className="nf-blob blob1"></div>
        <div className="nf-blob blob2"></div>

        <div className="nf-card reveal in">
          <span className="nf-code mono">404</span>
          <h1>Label Not Found</h1>
          <p>
            The compliance path or page you are looking for does not exist or has been shifted.
          </p>
          <div className="nf-actions">
            <Link to="/" className="btn btn-primary">
              Return Home
            </Link>
            <Link to="/dashboard" className="btn btn-ghost">
              To Dashboard
            </Link>
          </div>
        </div>

        <style>{`
          .nf-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 24px;
            position: relative;
            overflow: hidden;
            background: linear-gradient(180deg, #FDF7EF, var(--bg) 60%, #F7ECDD 100%);
            text-align: center;
          }

          .nf-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(90px);
            opacity: 0.22;
            z-index: 0;
          }

          .nf-blob.blob1 {
            width: 320px;
            height: 320px;
            background: var(--primary);
            top: 20%;
            left: 10%;
          }

          .nf-blob.blob2 {
            width: 300px;
            height: 300px;
            background: var(--gold);
            bottom: 20%;
            right: 10%;
          }

          .nf-card {
            max-width: 480px;
            background: var(--glass-strong);
            backdrop-filter: blur(20px) saturate(160%);
            border: 1px solid var(--border);
            border-radius: var(--radius-lg);
            padding: 48px;
            box-shadow: var(--shadow-lift);
            z-index: 2;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }

          .nf-code {
            font-size: 80px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--violet));
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            line-height: 1;
          }

          .nf-card h1 {
            font-size: 28px;
            color: var(--ink);
          }

          .nf-card p {
            font-size: 15px;
            color: var(--gray);
            line-height: 1.6;
            margin-bottom: 8px;
          }

          .nf-actions {
            display: flex;
            gap: 12px;
            width: 100%;
            justify-content: center;
          }

          @media (max-width: 480px) {
            .nf-actions {
              flex-direction: column;
            }
            .nf-actions .btn {
              width: 100%;
            }
          }
        `}</style>
      </div>
    </PageTransition>
  );
}
