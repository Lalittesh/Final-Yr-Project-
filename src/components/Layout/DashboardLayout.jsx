import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    {
      path: '/scanner',
      label: 'Compliance Scanner',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h10" />
          <circle cx="19" cy="18" r="2" />
        </svg>
      )
    },
    {
      path: '/upload',
      label: 'Upload Label',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </svg>
      )
    },
    {
      path: '/reports',
      label: 'Reports',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      )
    },
    {
      path: '/history',
      label: 'Scan History',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      )
    }
  ];

  const getPageTitle = () => {
    const item = navItems.find((n) => n.path === location.pathname);
    return item ? item.label : 'Dashboard';
  };

  return (
    <div className="db-container">
      {/* Sidebar */}
      <aside className={`db-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="db-sidebar-header">
          <Link to="/" className="db-logo">
            <span className="db-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10" />
                <circle cx="19" cy="18" r="2.4" />
              </svg>
            </span>
            MetroAI
          </Link>
          <button className="db-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="db-sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`db-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="db-nav-icon">{item.icon}</span>
                <span className="db-nav-label">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="db-sidebar-footer">
          <div className="db-user-info">
            <div className="db-user-avatar">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="db-user-details">
              <div className="db-user-name">{user?.name || 'Compliance Officer'}</div>
              <div className="db-user-role">{user?.role || 'Verifier'}</div>
            </div>
          </div>
          <button className="db-logout-btn" onClick={handleLogout}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="db-main">
        {/* Top Header */}
        <header className="db-header">
          <div className="db-header-left">
            <button className="db-sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="db-page-title">{getPageTitle()}</h1>
          </div>

          <div className="db-header-right">
            {/* Theme Toggle */}
            <button className="db-theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Profile Dropdown Link */}
            <div className="db-profile-badge">
              <span className="db-profile-name">{user?.name || 'User'}</span>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="db-content">
          <Outlet />
        </main>
      </div>

      <style>{`
        .db-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg);
          color: var(--ink);
          transition: background-color 0.3s ease;
        }

        /* Sidebar Styling */
        .db-sidebar {
          width: 280px;
          background: var(--glass-strong);
          backdrop-filter: blur(16px);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 1000;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (max-width: 991px) {
          .db-sidebar {
            transform: translateX(-100%);
          }
          .db-sidebar.open {
            transform: translateX(0);
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.15);
          }
        }

        .db-sidebar-header {
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
        }

        .db-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 22px;
          color: var(--ink);
        }

        .db-logo-mark {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--primary), var(--violet));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
        }

        .db-logo-mark svg {
          width: 18px;
          height: 18px;
        }

        .db-sidebar-close {
          display: none;
          background: none;
          border: none;
          color: var(--ink);
          cursor: pointer;
          padding: 4px;
        }

        @media (max-width: 991px) {
          .db-sidebar-close {
            display: block;
          }
        }

        .db-sidebar-nav {
          flex: 1;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .db-nav-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: var(--radius-sm, 10px);
          color: var(--gray);
          font-weight: 500;
          font-size: 14.5px;
          transition: all 0.3s var(--ease);
        }

        .db-nav-item:hover {
          color: var(--primary);
          background: rgba(196, 30, 58, 0.05);
          transform: translateX(4px);
        }

        .db-nav-item.active {
          color: #fff;
          background: linear-gradient(135deg, var(--primary), var(--violet));
          box-shadow: 0 4px 12px rgba(196, 30, 58, 0.25);
        }

        .db-nav-icon svg {
          width: 20px;
          height: 20px;
        }

        .db-sidebar-footer {
          padding: 20px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .db-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .db-user-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          box-shadow: var(--shadow-soft);
        }

        .db-user-details {
          overflow: hidden;
        }

        .db-user-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .db-user-role {
          font-size: 11.5px;
          color: var(--gray-light);
          font-family: 'JetBrains Mono', monospace;
        }

        .db-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: var(--radius-sm, 10px);
          border: 1px solid var(--glass-border);
          background: transparent;
          color: var(--primary);
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .db-logout-btn:hover {
          background: rgba(196, 30, 58, 0.08);
          border-color: rgba(196, 30, 58, 0.2);
        }

        .db-logout-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Main Section Styling */
        .db-main {
          flex: 1;
          margin-left: 280px;
          display: flex;
          flex-direction: column;
          min-width: 0; /* Prevents flex children from stretching */
        }

        @media (max-width: 991px) {
          .db-main {
            margin-left: 0;
          }
        }

        /* Top Header Styling */
        .db-header {
          height: 76px;
          background: var(--glass-strong);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 900;
        }

        @media (max-width: 640px) {
          .db-header {
            padding: 0 20px;
          }
        }

        .db-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .db-sidebar-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--ink);
          cursor: pointer;
          padding: 6px;
        }

        @media (max-width: 991px) {
          .db-sidebar-toggle {
            display: block;
          }
        }

        .db-page-title {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 600;
          margin: 0;
        }

        .db-header-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .db-theme-toggle {
          background: var(--glass);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .db-theme-toggle:hover {
          border-color: var(--gold);
          color: var(--primary);
        }

        .db-theme-toggle svg {
          width: 20px;
          height: 20px;
        }

        .db-profile-badge {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(196, 30, 58, 0.05);
          border: 1px solid var(--glass-border);
          font-size: 13.5px;
          font-weight: 600;
        }

        .db-profile-name {
          color: var(--primary-dark);
        }

        /* Content Area Styling */
        .db-content {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
        }

        @media (max-width: 640px) {
          .db-content {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}
