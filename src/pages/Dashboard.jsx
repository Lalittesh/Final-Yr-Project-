import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import PageTransition from '../components/PageTransition/PageTransition';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { scans } = useContext(AppContext);

  // Calculate quick stats from context mock data
  const totalScans = scans.length;
  const compliantCount = scans.filter((s) => s.status === 'COMPLIANT').length;
  const issueCount = totalScans - compliantCount;

  return (
    <PageTransition>
      <div className="db-page">
        {/* Coming Soon Alert Banner */}
        <div className="db-alert-banner">
          <div className="db-alert-content">
            <span className="badge warn">PREVIEW PORTAL</span>
            <p><strong>Phase 2 Implementation Active</strong>: AI Scanner and real-time backend verification are <strong>Coming Soon</strong>. Interface layout is responsive and operational.</p>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="db-section-header">
          <h2>Overview & Analytics</h2>
          <p>Real-time telemetry compliance overview for pre-packaged commodities audits</p>
        </div>

        {/* Stats Grid */}
        <div className="db-stats-grid">
          <div className="db-stat-card">
            <span className="db-stat-label">Total Audits</span>
            <strong className="db-stat-value">{totalScans}</strong>
            <span className="db-stat-desc">Packages checked via scanner</span>
          </div>
          <div className="db-stat-card compliant">
            <span className="db-stat-label">Compliant Packages</span>
            <strong className="db-stat-value text-success">{compliantCount}</strong>
            <span className="db-stat-desc">100% LMPC standard verification</span>
          </div>
          <div className="db-stat-card critical">
            <span className="db-stat-label">Non-Compliant & Warnings</span>
            <strong className="db-stat-value text-error">{issueCount}</strong>
            <span className="db-stat-desc">Flags matching standard violations</span>
          </div>
          <div className="db-stat-card">
            <span className="db-stat-label">Audit Accuracy</span>
            <strong className="db-stat-value text-gold">99.4%</strong>
            <span className="db-stat-desc">Precision metrics rate</span>
          </div>
        </div>

        {/* Audit Log / Scanner Link */}
        <div className="db-main-grid">
          <div className="db-panel">
            <div className="db-panel-header">
              <h3>Recent Audits Log</h3>
              <Link to="/history" className="db-panel-link">View all history</Link>
            </div>
            <div className="db-panel-content">
              {scans.length === 0 ? (
                <p className="no-data">No scans performed yet.</p>
              ) : (
                <div className="db-table-wrapper">
                  <table className="db-table">
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Timestamp</th>
                        <th>Compliance Score</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scans.slice(0, 3).map((scan) => (
                        <tr key={scan.id}>
                          <td className="font-semibold">{scan.productName}</td>
                          <td className="mono">{new Date(scan.timestamp).toLocaleString()}</td>
                          <td className="mono">{scan.complianceScore}%</td>
                          <td>
                            <span className={`db-status-badge ${scan.status.toLowerCase()}`}>
                              {scan.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="db-panel quick-actions">
            <h3>Compliance Quick Start</h3>
            <p>Upload label images or open live camera scanner to extract and check metrology specifications.</p>
            <div className="action-buttons">
              <Link to="/scanner" className="btn btn-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M4 6h16M4 12h16M4 18h10" />
                  <circle cx="19" cy="18" r="2.4" />
                </svg>
                Open Camera Scanner
              </Link>
              <Link to="/upload" className="btn btn-ghost">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                Upload Label File
              </Link>
            </div>
          </div>
        </div>

        <style>{`
        .db-page {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .db-alert-banner {
          background: rgba(245, 158, 10, 0.08);
          border: 1px dashed rgba(245, 158, 10, 0.35);
          border-radius: var(--radius-md);
          padding: 16px 20px;
        }

        .db-alert-content {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .db-alert-content p {
          font-size: 14.5px;
          margin: 0;
          color: var(--ink);
          line-height: 1.5;
        }

        .db-section-header h2 {
          font-size: 28px;
          color: var(--ink);
          margin-bottom: 4px;
        }

        .db-section-header p {
          color: var(--gray);
          font-size: 15px;
        }

        .db-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .db-stat-card {
          background: var(--glass-strong);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-soft);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .db-stat-label {
          font-size: 13.5px;
          font-weight: 500;
          color: var(--gray);
        }

        .db-stat-value {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1;
        }

        .db-stat-desc {
          font-size: 12px;
          color: var(--gray-light);
        }

        .text-success { color: var(--success); }
        .text-error { color: var(--error); }
        .text-gold { color: var(--gold); }

        .db-main-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.6fr;
          gap: 24px;
        }

        @media (max-width: 991px) {
          .db-main-grid {
            grid-template-columns: 1fr;
          }
        }

        .db-panel {
          background: var(--glass-strong);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 24px;
          box-shadow: var(--shadow-soft);
        }

        .db-panel-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }

        .db-panel-header h3 {
          font-size: 18px;
        }

        .db-panel-link {
          font-size: 13.5px;
          color: var(--primary);
          font-weight: 600;
        }

        .db-panel-link:hover {
          text-decoration: underline;
        }

        .no-data {
          color: var(--gray-light);
          text-align: center;
          padding: 40px 0;
        }

        .db-table-wrapper {
          overflow-x: auto;
        }

        .db-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .db-table th {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gray);
        }

        .db-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border);
          font-size: 14px;
        }

        .font-semibold {
          font-weight: 600;
        }

        .db-status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        .db-status-badge.compliant {
          background: rgba(34, 197, 94, 0.12);
          color: #15803d;
        }

        .db-status-badge.non_compliant {
          background: rgba(239, 68, 68, 0.12);
          color: #b91c1c;
        }

        .db-status-badge.warning {
          background: rgba(245, 158, 11, 0.12);
          color: #b45309;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 16px;
          justify-content: center;
        }

        .quick-actions h3 {
          font-size: 18px;
        }

        .quick-actions p {
          font-size: 14px;
          color: var(--gray);
          line-height: 1.6;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 8px;
        }

        .action-buttons .btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>
    </div>
  </PageTransition>
);
}
