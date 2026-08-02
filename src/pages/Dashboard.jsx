import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import useAuth from '../hooks/useAuth';
import PageTransition from '../components/PageTransition/PageTransition';

// Helper component for count-up animations
function Counter({ value, suffix = '', duration = 1000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(value);
    if (isNaN(end) || end === 0) {
      setCount(value);
      return;
    }
    const isDecimal = value.toString().includes('.');
    const totalMiliseconds = duration;
    const steps = 50;
    const increment = end / steps;
    const stepTime = totalMiliseconds / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      start += increment;
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(value);
      } else {
        setCount(isDecimal ? start.toFixed(1) : Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}{suffix}</span>;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { scans } = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  // Simulate skeleton loading on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { label: 'Products Scanned', value: '1482', icon: '📦', trend: '+14%', trendType: 'up', gradient: 'linear-gradient(135deg, rgba(196, 30, 58, 0.08), rgba(110, 20, 35, 0.08))' },
    { label: 'Compliant Products', value: '1328', icon: '✓', trend: '+12%', trendType: 'up', gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(21, 128, 61, 0.08))' },
    { label: 'Non-Compliant Products', value: '154', icon: '✕', trend: '-2%', trendType: 'down', gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.08), rgba(185, 28, 28, 0.08))' },
    { label: 'Pending Reviews', value: '12', icon: '⏳', trend: 'Critical', trendType: 'neutral', gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(180, 83, 9, 0.08))' },
    { label: 'Detection Accuracy', value: '99.4', suffix: '%', icon: '🎯', trend: '+0.2%', trendType: 'up', gradient: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08), rgba(240, 217, 153, 0.08))' },
    { label: 'Average Scan Time', value: '2.4', suffix: 's', icon: '⚡', trend: '-0.3s', trendType: 'up', gradient: 'linear-gradient(135deg, rgba(30, 58, 138, 0.08), rgba(29, 78, 216, 0.08))' }
  ];

  const quickActions = [
    { title: 'Start Live Scan', desc: 'Launch webcam scanner for instant metrology audits.', link: '/scanner', btnText: 'Open Scanner', icon: 'camera' },
    { title: 'Upload Label Image', desc: 'Submit wrappers or artwork flats for OCR checks.', link: '/upload', btnText: 'Upload File', icon: 'upload' },
    { title: 'View Reports', desc: 'Access comprehensive LMPC certificate checkers.', link: '/reports', btnText: 'Open Reports', icon: 'file' },
    { title: 'Scan History', desc: 'Review category logs and previous check databases.', link: '/history', btnText: 'Browse Logs', icon: 'history' },
    { title: 'Analytics Panel', desc: 'Visualize Category check pass ratios and timelines.', link: '/analytics', btnText: 'View Data', icon: 'analytics' },
    { title: 'AI Rule Assistant', desc: 'Consult our legal metrology rules chatbot agent.', link: '/assistant', btnText: 'Consult AI', icon: 'assistant' }
  ];

  const recentActivity = [
    { title: 'Biscuit Package Scanned', time: '10 mins ago', status: 'COMPLIANT', cat: 'Food & Groceries' },
    { title: 'Organic Shampoo Verified', time: '1 hour ago', status: 'COMPLIANT', cat: 'Cosmetics' },
    { title: 'Rice Bag Failed Compliance', time: '3 hours ago', status: 'NON_COMPLIANT', cat: 'Grains & Agri' },
    { title: 'Coconut Hair Oil Flagged', time: '1 day ago', status: 'WARNING', cat: 'Personal Care' }
  ];

  const systemStatus = [
    { name: 'Camera Interface', status: 'Online' },
    { name: 'AI Prediction Model', status: 'Online' },
    { name: 'OCR Engine Layer', status: 'Online' },
    { name: 'Mock Database', status: 'Online' },
    { name: 'Audit Server Cluster', status: 'Online' }
  ];

  const progressMetrics = [
    { label: 'Overall Compliance Rate', rate: 89.6, weekly: '+2.4%', monthly: '+5.1%' },
    { label: "Today's Audit Pass Ratio", rate: 92.3, weekly: '+1.8%', monthly: '+3.7%' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  // Mock skeleton UI rendering
  if (loading) {
    return (
      <div className="skeleton-dashboard">
        <div className="skeleton-banner"></div>
        <div className="skeleton-grid-4">
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
          <div className="skeleton-card"></div>
        </div>
        <div className="skeleton-grid-2">
          <div className="skeleton-panel"></div>
          <div className="skeleton-panel"></div>
        </div>
        <style>{`
          .skeleton-dashboard {
            display: flex;
            flex-direction: column;
            gap: 28px;
            padding: 10px 0;
          }
          .skeleton-banner {
            height: 160px;
            background: rgba(28, 14, 16, 0.04);
            border-radius: var(--radius-lg, 28px);
            animation: pulse-skeleton 1.5s infinite ease-in-out;
          }
          .skeleton-grid-4 {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
          }
          .skeleton-card {
            height: 120px;
            background: rgba(28, 14, 16, 0.04);
            border-radius: var(--radius-md, 18px);
            animation: pulse-skeleton 1.5s infinite ease-in-out;
          }
          .skeleton-grid-2 {
            display: grid;
            grid-template-columns: 1.2fr 0.8fr;
            gap: 24px;
          }
          @media (max-width: 991px) {
            .skeleton-grid-2 { grid-template-columns: 1fr; }
          }
          .skeleton-panel {
            height: 320px;
            background: rgba(28, 14, 16, 0.04);
            border-radius: var(--radius-md, 18px);
            animation: pulse-skeleton 1.5s infinite ease-in-out;
          }
          @keyframes pulse-skeleton {
            0% { opacity: 0.6; }
            50% { opacity: 0.35; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <PageTransition>
      <motion.div 
        className="db-main-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Welcome Section */}
        <motion.section className="db-welcome-banner" variants={itemVariants}>
          <div className="welcome-text">
            <span className="welcome-date">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <h2>Welcome back, {user?.name || 'Compliance Officer'}</h2>
            <p>Ready to inspect pre-packaged commodities with AI metrology checkers today?</p>
          </div>
          <div className="welcome-illustration">
            {/* Visual Abstract illustration */}
            <div className="illus-circle"></div>
            <div className="illus-laser"></div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
        </motion.section>

        {/* Statistics Cards */}
        <motion.section className="db-stats-section" variants={itemVariants}>
          <div className="db-section-head">
            <h3>Audit Performance Indicators</h3>
          </div>
          <div className="db-stats-grid">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                className="db-stat-card-premium"
                style={{ background: stat.gradient }}
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(196, 30, 58, 0.08)' }}
              >
                <div className="stat-card-top">
                  <span className="stat-icon-wrapper">{stat.icon}</span>
                  <span className={`trend-badge ${stat.trendType}`}>
                    {stat.trendType === 'up' ? '▲' : stat.trendType === 'down' ? '▼' : '•'} {stat.trend}
                  </span>
                </div>
                <div className="stat-card-bottom">
                  <div className="stat-value-large">
                    <Counter value={stat.value} suffix={stat.suffix || ''} />
                  </div>
                  <span className="stat-label-text">{stat.label}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Main Grid: Left Panel (Tables/Timelines), Right Panel (Insights/Progress) */}
        <div className="db-layout-grid">
          
          {/* Left Column */}
          <div className="db-layout-col">
            
            {/* Table: Latest Scans */}
            <motion.div className="db-panel-card" variants={itemVariants}>
              <div className="panel-card-header">
                <div>
                  <h4>Latest Compliance Scans</h4>
                  <p>Real-time audit log of label checks</p>
                </div>
                <Link to="/history" className="panel-action-link">View Logs</Link>
              </div>
              <div className="panel-card-body">
                <div className="table-responsive">
                  <table className="modern-table">
                    <thead>
                      <tr>
                        <th>Product Commodity</th>
                        <th>Scan Date</th>
                        <th>OCR Verdict</th>
                        <th>Confidence</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scans.map((scan) => (
                        <tr key={scan.id}>
                          <td className="font-bold">{scan.productName}</td>
                          <td className="mono">{new Date(scan.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                          <td>
                            <span className={`status-badge-capsule ${scan.status.toLowerCase()}`}>
                              <span className="status-dot"></span>
                              {scan.status}
                            </span>
                          </td>
                          <td className="mono font-bold text-gold">{scan.confidence}</td>
                          <td>
                            <Link to="/reports" className="table-btn-link" onClick={() => localStorage.setItem('selected_scan_report', scan.id)}>
                              Verify
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div className="db-panel-card" variants={itemVariants}>
              <div className="panel-card-header">
                <h4>Quick Compliance Actions</h4>
                <p>Launch metrology verifications and rule references</p>
              </div>
              <div className="actions-card-grid">
                {quickActions.map((act, idx) => (
                  <motion.div 
                    key={idx}
                    className="action-card-lift"
                    whileHover={{ y: -6 }}
                  >
                    <div className="action-card-illustration">
                      <div className="illus-circle-small"></div>
                      {act.icon === 'camera' && '📷'}
                      {act.icon === 'upload' && '📤'}
                      {act.icon === 'file' && '📄'}
                      {act.icon === 'history' && '🕒'}
                      {act.icon === 'analytics' && '📊'}
                      {act.icon === 'assistant' && '🤖'}
                    </div>
                    <h4>{act.title}</h4>
                    <p>{act.desc}</p>
                    <Link to={act.link} className="action-card-btn">
                      <span>{act.btnText}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="db-layout-col">

            {/* AI Insights Panel */}
            <motion.div className="db-panel-card premium-ai-panel" variants={itemVariants}>
              <div className="ai-panel-header">
                <div className="ai-spark-icon">✨</div>
                <div>
                  <h4>AI Compliance Insights</h4>
                  <p>Audited by MetroAI ruleset models</p>
                </div>
              </div>
              <div className="ai-insights-list">
                <div className="ai-insight-item">
                  <div className="insight-bullet success">●</div>
                  <p><strong>Compliance rate increased by 12%</strong> compared to previous LMPC verification records.</p>
                </div>
                <div className="ai-insight-item">
                  <div className="insight-bullet error">●</div>
                  <p><strong>Most frequent violation flag</strong> relates to missing unit pricing declarations on multi-pack items.</p>
                </div>
                <div className="ai-insight-item">
                  <div className="insight-bullet warning">●</div>
                  <p><strong>Recommendation:</strong> Perform immediate audit audits on remaining 12 pending batch packages.</p>
                </div>
              </div>
            </motion.div>

            {/* Compliance Overview Rate Cards */}
            <motion.div className="db-panel-card" variants={itemVariants}>
              <div className="panel-card-header">
                <h4>Compliance Averages</h4>
                <p>Calculated metrology success parameters</p>
              </div>
              <div className="progress-list">
                {progressMetrics.map((prog, idx) => (
                  <div key={idx} className="progress-metric-item">
                    <div className="progress-labels">
                      <span className="prog-title">{prog.label}</span>
                      <span className="prog-rate mono">{prog.rate}%</span>
                    </div>
                    <div className="progress-bar-track">
                      <motion.div 
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${prog.rate}%` }}
                        transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="progress-meta-labels">
                      <span>Weekly: <strong className="text-success">{prog.weekly}</strong></span>
                      <span>Monthly: <strong className="text-success">{prog.monthly}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Timeline: Recent Activity */}
            <motion.div className="db-panel-card" variants={itemVariants}>
              <div className="panel-card-header">
                <h4>Inspection Activity Timeline</h4>
                <p>Live stream of audits in progress</p>
              </div>
              <div className="activity-timeline">
                {recentActivity.map((act, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-badge-dot"></div>
                    <div className="timeline-content">
                      <div className="timeline-title-row">
                        <h5>{act.title}</h5>
                        <span className="timeline-time">{act.time}</span>
                      </div>
                      <div className="timeline-meta-row">
                        <span className="timeline-cat">{act.cat}</span>
                        <span className={`timeline-status ${act.status.toLowerCase()}`}>{act.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* System Status */}
            <motion.div className="db-panel-card" variants={itemVariants}>
              <div className="panel-card-header">
                <h4>Rule Verification Engines</h4>
                <p>Active subsystem diagnostic statuses</p>
              </div>
              <div className="status-item-list">
                {systemStatus.map((sys, idx) => (
                  <div key={idx} className="status-row-item">
                    <span>{sys.name}</span>
                    <span className="status-lbl-badge">
                      <span className="status-lbl-dot"></span>
                      {sys.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </motion.div>

      <style>{`
        .db-main-content {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Welcome Section */
        .db-welcome-banner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, var(--primary), var(--violet));
          border-radius: var(--radius-lg, 28px);
          padding: 32px 48px;
          color: #fff;
          box-shadow: var(--shadow-lift);
          position: relative;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .db-welcome-banner {
            flex-direction: column;
            align-items: flex-start;
            padding: 24px 28px;
            gap: 20px;
          }
        }

        .db-welcome-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px);
          background-size: 20px 20px;
          opacity: 0.6;
          pointer-events: none;
        }

        .welcome-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          z-index: 1;
        }

        .welcome-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          font-weight: 600;
          color: var(--gold-light);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .welcome-text h2 {
          font-family: 'Fraunces', serif;
          font-size: 26px;
          color: #fff;
          margin: 4px 0 2px;
        }

        .welcome-text p {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.88);
          max-width: 480px;
          line-height: 1.5;
        }

        .welcome-illustration {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 1;
          color: var(--gold-light);
        }

        @media (max-width: 768px) {
          .welcome-illustration {
            display: none;
          }
        }

        .welcome-illustration svg {
          width: 60px;
          height: 60px;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15));
        }

        .illus-circle {
          position: absolute;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          border: 1px dashed rgba(255, 255, 255, 0.25);
          animation: spin-clockwise 20s linear infinite;
        }

        /* Premium Statistics Cards */
        .db-stats-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .db-stats-section h3 {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .db-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
        }

        .db-stat-card-premium {
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 146px;
          transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: var(--shadow-soft);
        }

        .stat-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-icon-wrapper {
          font-size: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.65);
          box-shadow: 0 4px 10px rgba(28, 14, 16, 0.03);
          border: 1px solid var(--border);
        }

        .trend-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .trend-badge.up {
          background-color: rgba(34, 197, 94, 0.12);
          color: #15803d;
        }

        .trend-badge.down {
          background-color: rgba(239, 68, 68, 0.12);
          color: #b91c1c;
        }

        .trend-badge.neutral {
          background-color: rgba(245, 158, 11, 0.12);
          color: #b45309;
        }

        .stat-card-bottom {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .stat-value-large {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 700;
          color: var(--ink);
          line-height: 1.1;
        }

        .stat-label-text {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray);
        }

        /* Layout Grid Columns */
        .db-layout-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.75fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 991px) {
          .db-layout-grid {
            grid-template-columns: 1fr;
          }
        }

        .db-layout-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .db-panel-card {
          background: var(--glass-strong);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          padding: 24px;
          box-shadow: var(--shadow-soft);
        }

        .panel-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
        }

        .panel-card-header h4 {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .panel-card-header p {
          font-size: 12.5px;
          color: var(--gray);
          margin-top: 2px;
        }

        .panel-action-link {
          font-size: 13.5px;
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
        }

        .panel-action-link:hover {
          text-decoration: underline;
        }

        /* Tables */
        .table-responsive {
          overflow-x: auto;
        }

        .modern-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .modern-table th {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border);
          font-size: 11.5px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--gray-light);
        }

        .modern-table td {
          padding: 14px;
          border-bottom: 1px solid var(--border);
          font-size: 13.5px;
        }

        .modern-table tr:last-child td {
          border-bottom: none;
        }

        .font-bold {
          font-weight: 600;
        }

        .text-gold {
          color: var(--primary-dark);
        }

        .status-badge-capsule {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
        }

        .status-badge-capsule.compliant {
          background-color: rgba(34, 197, 94, 0.1);
          color: #15803d;
        }

        .status-badge-capsule.non_compliant {
          background-color: rgba(239, 68, 68, 0.1);
          color: #b91c1c;
        }

        .status-badge-capsule.warning {
          background-color: rgba(245, 158, 11, 0.1);
          color: #b45309;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .compliant .status-dot { background-color: var(--success); }
        .non_compliant .status-dot { background-color: var(--error); }
        .warning .status-dot { background-color: var(--warning); }

        .table-btn-link {
          font-size: 12.5px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(135deg, var(--primary), var(--violet));
          padding: 6px 12px;
          border-radius: 6px;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s;
          box-shadow: 0 4px 10px rgba(196, 30, 58, 0.15);
        }

        .table-btn-link:hover {
          transform: translateY(-1.5px);
          box-shadow: 0 6px 14px rgba(196, 30, 58, 0.25);
        }

        /* Action Cards Grid */
        .actions-card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .action-card-lift {
          background: rgba(255, 255, 255, 0.45);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .action-card-lift:hover {
          background: #fff;
          border-color: var(--gold);
          box-shadow: var(--shadow-soft);
        }

        .action-card-illustration {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(196, 30, 58, 0.06);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          position: relative;
          overflow: hidden;
        }

        .illus-circle-small {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px dashed rgba(196, 30, 58, 0.15);
        }

        .action-card-lift h4 {
          font-size: 15px;
          font-weight: 600;
          color: var(--ink);
          margin: 2px 0 0;
        }

        .action-card-lift p {
          font-size: 12.5px;
          color: var(--gray);
          line-height: 1.5;
          flex: 1;
        }

        .action-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 700;
          color: var(--primary);
          text-decoration: none;
          margin-top: 8px;
        }

        .action-card-btn svg {
          width: 14px;
          height: 14px;
          transition: transform 0.3s;
        }

        .action-card-btn:hover svg {
          transform: translateX(4px);
        }

        /* AI Insights Panel */
        .premium-ai-panel {
          background: linear-gradient(135deg, var(--ink), #2d0a11);
          color: #fff;
          border: none;
        }

        .ai-panel-header {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
          padding-bottom: 12px;
        }

        .ai-panel-header h4 {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          color: #fff;
          margin: 0;
        }

        .ai-panel-header p {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.6);
        }

        .ai-spark-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: var(--ink);
        }

        .ai-insights-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ai-insight-item {
          display: flex;
          gap: 12px;
          font-size: 13.5px;
          line-height: 1.5;
        }

        .insight-bullet {
          font-size: 14px;
          line-height: 1;
        }

        .insight-bullet.success { color: var(--success); }
        .insight-bullet.error { color: var(--error); }
        .insight-bullet.warning { color: var(--warning); }

        .ai-insight-item p {
          color: rgba(255, 255, 255, 0.85);
        }

        .ai-insight-item strong {
          color: #fff;
        }

        /* Progress Card */
        .progress-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .progress-metric-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          font-weight: 600;
        }

        .prog-title {
          color: var(--ink);
        }

        .prog-rate {
          color: var(--primary);
        }

        .progress-bar-track {
          height: 8px;
          background: rgba(28, 14, 16, 0.05);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--primary), var(--violet));
        }

        .progress-meta-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11.5px;
          color: var(--gray-light);
        }

        /* Timeline */
        .activity-timeline {
          display: flex;
          flex-direction: column;
          padding-left: 8px;
          margin-top: 8px;
        }

        .timeline-item {
          display: flex;
          gap: 20px;
          position: relative;
          padding-bottom: 24px;
        }

        .timeline-item:last-child {
          padding-bottom: 0;
        }

        .timeline-item::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 12px;
          bottom: 0;
          width: 1px;
          background-color: var(--border);
        }

        .timeline-item:last-child::before {
          display: none;
        }

        .timeline-badge-dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background-color: var(--primary);
          border: 2px solid #fff;
          z-index: 1;
          margin-top: 5px;
          box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.15);
        }

        .timeline-item:nth-child(2) .timeline-badge-dot {
          background-color: var(--success);
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.15);
        }

        .timeline-item:nth-child(3) .timeline-badge-dot {
          background-color: var(--error);
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .timeline-item:nth-child(4) .timeline-badge-dot {
          background-color: var(--warning);
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
        }

        .timeline-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .timeline-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 12px;
        }

        .timeline-title-row h5 {
          font-size: 13.5px;
          font-weight: 600;
          color: var(--ink);
        }

        .timeline-time {
          font-size: 11.5px;
          color: var(--gray-light);
        }

        .timeline-meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .timeline-cat {
          font-size: 11.5px;
          color: var(--gray);
        }

        .timeline-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px;
          font-weight: 700;
        }

        .timeline-status.compliant { color: var(--success); }
        .timeline-status.non_compliant { color: var(--error); }
        .timeline-status.warning { color: var(--warning); }

        /* Rule engines status list */
        .status-item-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .status-row-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: var(--ink);
        }

        .status-lbl-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
          color: var(--success);
          background-color: rgba(34, 197, 94, 0.08);
          padding: 4px 10px;
          border-radius: 999px;
        }

        .status-lbl-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--success);
          animation: pulse-dot 1.5s infinite;
      `}</style>
    </PageTransition>
  );
}
