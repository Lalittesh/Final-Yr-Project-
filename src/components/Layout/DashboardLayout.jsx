import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Screen Width Listener
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Click outside profile dropdown to close it
    const clickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    {
      path: '/scanner',
      label: 'AI Scanner',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 6h16M4 12h16M4 18h10" />
          <circle cx="19" cy="18" r="2" />
        </svg>
      )
    },
    {
      path: '/upload',
      label: 'Upload Image',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
        </svg>
      )
    },
    {
      path: '/history',
      label: 'Scan History',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      path: '/reports',
      label: 'Reports',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      )
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      )
    },
    {
      path: '/assistant',
      label: 'AI Assistant',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <circle cx="9" cy="9" r="1" />
          <circle cx="15" cy="9" r="1" />
          <path d="M9 13a5 5 0 0 0 6 0" />
        </svg>
      )
    },
    {
      path: '/settings',
      label: 'Settings',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

  const formattedDateTime = dateTime.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  return (
    <div className="db-container">
      {/* Sidebar - Collapsible with motion */}
      <motion.aside 
        className={`db-sidebar ${sidebarOpen ? 'open' : ''} ${isCollapsed ? 'collapsed' : ''}`}
        animate={{ width: isMobile ? 280 : (isCollapsed ? 80 : 280) }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="db-sidebar-header">
          <Link to="/" className="db-logo">
            <span className="db-logo-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M4 12h16M4 18h10" />
                <circle cx="19" cy="18" r="2.4" />
              </svg>
            </span>
            {!isCollapsed && <span className="db-logo-text">MetroAI</span>}
          </Link>
          
          {/* Mobile sidebar close */}
          <button className="db-sidebar-close" onClick={() => setSidebarOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Sidebar Nav links */}
        <nav className="db-sidebar-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`db-nav-item ${isActive ? 'active' : ''} ${isCollapsed ? 'collapsed-item' : ''}`}
                onClick={() => setSidebarOpen(false)}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="db-nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="db-nav-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Toggle Trigger & Footer */}
        <div className="db-sidebar-footer">
          {!isMobile && (
            <button 
              className="db-collapse-toggle-btn"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}
              >
                <polyline points="11 17 6 12 11 7" />
                <polyline points="18 17 13 12 18 7" />
              </svg>
              {!isCollapsed && <span>Collapse Sidebar</span>}
            </button>
          )}

          <div className={`db-user-info ${isCollapsed ? 'collapsed-user' : ''}`}>
            <div className="db-user-avatar">
              {user?.avatarInitial || user?.name?.charAt(0) || 'U'}
            </div>
            {!isCollapsed && (
              <div className="db-user-details">
                <div className="db-user-name">{user?.name || 'Compliance Officer'}</div>
                <div className="db-user-role">{user?.role || 'Verifier'}</div>
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <button className="db-logout-btn" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              <span>Log Out</span>
            </button>
          )}
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.div 
        className="db-main"
        animate={{ marginLeft: isMobile ? 0 : (isCollapsed ? 80 : 280) }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Top Header */}
        <header className="db-header">
          <div className="db-header-left">
            <button className="db-sidebar-toggle" onClick={() => setSidebarOpen(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="db-page-title">{getPageTitle()}</h1>

            {/* Search Bar - UI Only */}
            <div className="db-search-wrapper">
              <svg className="db-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input 
                type="text" 
                placeholder="Search product audits, compliance codes..." 
                className="db-search-input"
                disabled
              />
            </div>
          </div>

          <div className="db-header-right">
            {/* Live Clock */}
            <div className="db-clock-widget">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{formattedDateTime}</span>
            </div>

            {/* Help Button */}
            <button className="db-action-icon-btn" title="Help Documentation">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>

            {/* Notifications Button */}
            <button className="db-action-icon-btn notification" title="Notifications">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="notification-dot"></span>
            </button>

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

            {/* Profile Dropdown Badge */}
            <div className="db-profile-badge-wrapper" ref={profileRef}>
              <button 
                className="db-profile-badge"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <div className="db-profile-avatar">
                  {user?.avatarInitial || user?.name?.charAt(0) || 'U'}
                </div>
                <span className="db-profile-name">{user?.name || 'User'}</span>
                <svg className="db-profile-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div 
                    className="db-profile-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="dropdown-user-header">
                      <h4>{user?.name || 'Compliance Officer'}</h4>
                      <p>{user?.email || 'officer@nic.in'}</p>
                    </div>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-user-meta">
                      <div><strong>Role:</strong> <span>{user?.role || 'Verifier'}</span></div>
                      <div><strong>Org:</strong> <span>{user?.org || 'Legal Metrology'}</span></div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <ul className="dropdown-links">
                      <li>
                        <Link to="/settings" onClick={() => setProfileOpen(false)}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                          </svg>
                          System Settings
                        </Link>
                      </li>
                    </ul>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-logout-btn" onClick={handleLogout}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                      </svg>
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="db-content">
          <Outlet />
        </main>
      </motion.div>

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
          overflow: hidden;
        }

        @media (max-width: 991px) {
          .db-sidebar {
            transform: translateX(-100%);
            width: 280px !important; /* Force width on mobile */
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
          height: 76px;
        }

        .db-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 22px;
          color: var(--ink);
          text-decoration: none;
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
          flex-shrink: 0;
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
          text-decoration: none;
          transition: all 0.3s var(--ease);
          white-space: nowrap;
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

        .db-nav-item.collapsed-item {
          justify-content: center;
          padding: 12px 0;
        }
        
        .db-nav-item.collapsed-item:hover {
          transform: scale(1.08);
        }

        .db-nav-icon svg {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .db-sidebar-footer {
          padding: 16px;
          border-top: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .db-collapse-toggle-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: none;
          border: none;
          color: var(--gray-light);
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
          border-radius: var(--radius-sm, 10px);
          transition: all 0.3s;
          white-space: nowrap;
        }

        .db-collapse-toggle-btn:hover {
          background: rgba(28, 14, 16, 0.04);
          color: var(--ink);
        }

        .db-collapse-toggle-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .db-user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 4px;
        }

        .db-user-info.collapsed-user {
          justify-content: center;
          padding: 8px 0;
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
          flex-shrink: 0;
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
          white-space: nowrap;
        }

        .db-logout-btn:hover {
          background: rgba(196, 30, 58, 0.08);
          border-color: rgba(196, 30, 58, 0.2);
        }

        .db-logout-btn svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        /* Main Section Styling */
        .db-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
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
          gap: 20px;
        }

        @media (max-width: 640px) {
          .db-header {
            padding: 0 16px;
            gap: 12px;
          }
        }

        .db-header-left {
          display: flex;
          align-items: center;
          gap: 20px;
          flex: 1;
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
          white-space: nowrap;
        }

        @media (max-width: 640px) {
          .db-page-title {
            display: none; /* Hide page title on mobile left */
          }
        }

        /* Search Bar UI */
        .db-search-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          max-width: 380px;
          width: 100%;
        }

        @media (max-width: 991px) {
          .db-search-wrapper {
            display: none; /* Hide search bar on tablets/mobiles */
          }
        }

        .db-search-icon {
          position: absolute;
          left: 14px;
          width: 16px;
          height: 16px;
          color: var(--gray-light);
        }

        .db-search-input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border-radius: var(--radius-sm, 10px);
          border: 1.5px solid var(--border);
          background: rgba(255, 255, 255, 0.45);
          font-size: 13.5px;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
          transition: all 0.3s;
        }

        /* clock widget */
        .db-clock-widget {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--gray);
          background: rgba(28, 14, 16, 0.04);
          padding: 8px 14px;
          border-radius: 999px;
          border: 1px solid var(--border);
        }

        @media (max-width: 768px) {
          .db-clock-widget {
            display: none; /* Hide clock on small screens */
          }
        }

        .db-clock-widget svg {
          width: 15px;
          height: 15px;
          color: var(--primary);
        }

        .db-header-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .db-action-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--glass);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }

        .db-action-icon-btn:hover {
          border-color: var(--gold);
          color: var(--primary);
          transform: translateY(-1.5px);
        }

        .db-action-icon-btn svg {
          width: 18px;
          height: 18px;
        }

        .db-action-icon-btn.notification .notification-dot {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--primary);
          border: 1.5px solid #fff;
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
          transform: translateY(-1.5px);
        }

        .db-theme-toggle svg {
          width: 18px;
          height: 18px;
        }

        /* Profile Badge with dropdown */
        .db-profile-badge-wrapper {
          position: relative;
        }

        .db-profile-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px 6px 8px;
          border-radius: 999px;
          background: rgba(196, 30, 58, 0.05);
          border: 1px solid var(--border);
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }

        .db-profile-badge:hover {
          background: rgba(196, 30, 58, 0.08);
          border-color: var(--gold);
        }

        .db-profile-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold), var(--gold-light));
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12.5px;
        }

        .db-profile-name {
          color: var(--primary-dark);
          max-width: 100px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 480px) {
          .db-profile-name {
            display: none; /* Hide profile name on mobile viewports */
          }
        }

        .db-profile-caret {
          width: 12px;
          height: 12px;
          color: var(--gray-light);
        }

        /* Dropdown Card Styling */
        .db-profile-dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          width: 240px;
          background: var(--glass-strong);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          box-shadow: 0 20px 50px rgba(60, 15, 20, 0.18);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1000;
        }

        .dropdown-user-header h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          font-weight: 600;
          color: var(--ink);
          margin-bottom: 2px;
        }

        .dropdown-user-header p {
          font-size: 12px;
          color: var(--gray);
          word-break: break-all;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--border);
          margin: 2px 0;
        }

        .dropdown-user-meta {
          display: flex;
          flex-direction: column;
          gap: 6px;
          font-size: 12px;
        }

        .dropdown-user-meta strong {
          color: var(--gray-light);
          font-weight: 500;
        }

        .dropdown-user-meta span {
          color: var(--ink);
          font-weight: 600;
        }

        .dropdown-links {
          list-style: none;
        }

        .dropdown-links a {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-sm, 10px);
          font-size: 13px;
          font-weight: 500;
          color: var(--gray);
          text-decoration: none;
          transition: all 0.3s;
        }

        .dropdown-links a:hover {
          color: var(--primary);
          background: rgba(196, 30, 58, 0.05);
        }

        .dropdown-links svg {
          width: 16px;
          height: 16px;
        }

        .dropdown-logout-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: var(--radius-sm, 10px);
          border: 1px solid rgba(196, 30, 58, 0.15);
          background: rgba(196, 30, 58, 0.04);
          color: var(--primary);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
        }

        .dropdown-logout-btn:hover {
          background: rgba(196, 30, 58, 0.08);
          border-color: var(--primary);
        }

        .dropdown-logout-btn svg {
          width: 16px;
          height: 16px;
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
