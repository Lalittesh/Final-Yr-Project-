import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';
import PageTransition from '../components/PageTransition/PageTransition';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Inline Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const validateEmail = (val) => {
    if (!val) {
      setEmailError('Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (val) => {
    if (!val) {
      setPasswordError('Password is required.');
      return false;
    }
    if (val.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    try {
      await login(email, password);
      // If remember me is checked, we can simulate storing email
      if (rememberMe) {
        localStorage.setItem('remembered_email', email);
      } else {
        localStorage.removeItem('remembered_email');
      }
      navigate(from, { replace: true });
    } catch (err) {
      setGeneralError(err?.message || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleGuestLogin = async () => {
    setGeneralError('');
    setEmailError('');
    setPasswordError('');
    try {
      // Simulate Guest login
      await login('guest@metro-compliance.gov.in', 'guest_password_123');
      navigate(from, { replace: true });
    } catch (err) {
      setGeneralError('Guest login failed. Please try again.');
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <PageTransition>
      <div className="login-page">
        {/* Decorative Government-theme Background Elements */}
        <div className="login-blob blob1"></div>
        <div className="login-blob blob2"></div>
        <div className="login-grid-overlay"></div>

        <motion.div 
          className="login-card"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Government AI Header */}
          <motion.div className="login-header" variants={itemVariants}>
            <div className="gov-seal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v8" />
                <path d="M9 11h6" />
              </svg>
            </div>
            <div className="gov-meta">
              <span className="gov-dept">DEPARTMENT OF CONSUMER AFFAIRS</span>
              <span className="gov-sub">GOVERNMENT OF INDIA • LEGAL METROLOGY</span>
            </div>
            
            <Link to="/" className="login-logo">
              <span className="logo-mark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16M4 12h16M4 18h10" />
                  <circle cx="19" cy="18" r="2.4" />
                </svg>
              </span>
              MetroAI Compliance Portal
            </Link>
            <p className="login-subtitle">Sign in with credentials to access AI audits and checks</p>
          </motion.div>

          {isLoading ? (
            <div className="login-loader-container">
              <Loader />
            </div>
          ) : (
            <motion.form onSubmit={handleSubmit} className="login-form" variants={itemVariants}>
              {generalError && (
                <div className="login-error-msg">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{generalError}</span>
                </div>
              )}

              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Portal Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <input
                    type="email"
                    id="email"
                    placeholder="officer@nic.in"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) validateEmail(e.target.value);
                    }}
                    onBlur={() => validateEmail(email)}
                    className={emailError ? 'input-error' : ''}
                  />
                </div>
                {emailError && (
                  <span className="field-error-text">
                    <span className="error-bullet">•</span> {emailError}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="form-group">
                <div className="label-row">
                  <label htmlFor="password">Security Password</label>
                  <a href="#forgot" className="forgot-link">Forgot Password?</a>
                </div>
                <div className="input-wrapper">
                  <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) validatePassword(e.target.value);
                    }}
                    onBlur={() => validatePassword(password)}
                    className={passwordError ? 'input-error' : ''}
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {passwordError && (
                  <span className="field-error-text">
                    <span className="error-bullet">•</span> {passwordError}
                  </span>
                )}
              </div>

              {/* Remember Me */}
              <div className="remember-me-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">Remember me on this secure terminal</span>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit" 
                className="btn btn-primary login-btn"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span>Authorize & Sign In</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </motion.button>

              <div className="divider-container">
                <span className="divider-line"></span>
                <span className="divider-text">OR</span>
                <span className="divider-line"></span>
              </div>

              {/* Google Sign-in button */}
              <motion.button 
                type="button" 
                className="btn btn-google"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setGeneralError('Google OAuth is disabled for this environment.')}
              >
                <svg className="google-icon" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582l3.51-3.51C17.845 1.16 15.108 0 12 0 7.339 0 3.327 2.68 1.386 6.586l3.88 3.179z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.04 15.345c-1.077.732-2.482 1.164-4.04 1.164-2.855 0-5.277-1.927-6.136-4.527l-3.87 3.003C3.968 19.82 7.68 22.909 12 22.909c3.082 0 5.864-1.018 7.827-2.773l-3.787-4.79z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.52 12.273c0-.818-.082-1.609-.236-2.364H12v4.51h6.473c-.278 1.495-1.127 2.763-2.396 3.618l3.787 4.791c2.209-2.036 3.655-5.045 3.655-8.555z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.864 11.982a7.11 7.11 0 0 1 0-2.217l-3.88-3.18A11.94 11.94 0 0 0 1.09 12a11.94 11.94 0 0 0 .894 5.414l3.88-3.18a7.11 7.11 0 0 1 0-2.252z"
                  />
                </svg>
                <span>Continue with NIC SSO / Google</span>
              </motion.button>

              {/* Guest Access Button */}
              <motion.button
                type="button"
                className="btn btn-ghost guest-btn"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleGuestLogin}
              >
                <span>Continue as Guest Inspector</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </motion.button>
            </motion.form>
          )}

          <motion.div className="login-footer" variants={itemVariants}>
            <span>Don't have an authorized account? </span>
            <Link to="/register" className="register-link">Register Portal Access</Link>
          </motion.div>
        </motion.div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 100px 24px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #FDF7EF, var(--bg) 60%, #F7ECDD 100%);
        }

        .login-grid-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image: radial-gradient(rgba(28, 14, 16, 0.03) 1px, transparent 1px);
          background-size: 24px 24px;
          z-index: 0;
        }

        .login-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.22;
          z-index: 0;
        }

        .login-blob.blob1 {
          width: 440px;
          height: 440px;
          background: var(--primary);
          top: 5%;
          left: -8%;
        }

        .login-blob.blob2 {
          width: 380px;
          height: 380px;
          background: var(--gold);
          bottom: 5%;
          right: -8%;
        }

        .login-card {
          width: 100%;
          max-width: 520px;
          background: var(--glass-strong);
          backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 44px 40px;
          box-shadow: var(--shadow-lift);
          z-index: 2;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 20px;
            gap: 24px;
          }
        }

        .login-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .gov-seal {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), var(--violet));
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          margin-bottom: 4px;
          box-shadow: 0 4px 10px rgba(196, 30, 58, 0.2);
        }

        .gov-seal svg {
          width: 26px;
          height: 26px;
        }

        .gov-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 8px;
        }

        .gov-dept {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 700;
          color: var(--primary-dark);
          letter-spacing: 0.1em;
        }

        .gov-sub {
          font-size: 9.5px;
          color: var(--gray);
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
        }

        .login-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Fraunces', serif;
          font-weight: 700;
          font-size: 22px;
          color: var(--ink);
          margin-top: 4px;
        }

        .login-subtitle {
          font-size: 14px;
          color: var(--gray);
          font-family: 'Inter', sans-serif;
          max-width: 320px;
          line-height: 1.4;
        }

        .login-loader-container {
          min-height: 220px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .login-error-msg {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          color: var(--error);
          font-size: 13px;
          font-weight: 500;
        }

        .login-error-msg svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .forgot-link {
          font-size: 12.5px;
          color: var(--primary);
          font-weight: 500;
        }

        .forgot-link:hover {
          text-decoration: underline;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          width: 18px;
          height: 18px;
          color: var(--gray-light);
          pointer-events: none;
        }

        .input-wrapper input {
          width: 100%;
          padding: 13px 44px 13px 48px;
          border-radius: var(--radius-sm);
          border: 1.5px solid var(--border);
          background: rgba(255, 255, 255, 0.55);
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          color: var(--ink);
          transition: all 0.3s ease;
        }

        .input-wrapper input:focus {
          outline: none;
          border-color: var(--primary);
          background: #fff;
          box-shadow: 0 0 0 4px rgba(196, 30, 58, 0.08);
        }

        .input-wrapper input.input-error {
          border-color: var(--error);
          background: rgba(239, 68, 68, 0.02);
        }

        .input-wrapper input.input-error:focus {
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.08);
        }

        .password-toggle-btn {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: var(--gray-light);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .password-toggle-btn svg {
          width: 18px;
          height: 18px;
          transition: color 0.3s;
        }

        .password-toggle-btn:hover svg {
          color: var(--primary);
        }

        .field-error-text {
          font-size: 12px;
          color: var(--error);
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 2px;
          animation: slideDown 0.3s var(--ease);
        }

        .error-bullet {
          font-size: 14px;
          line-height: 1;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Remember Me Styling */
        .remember-me-container {
          display: flex;
          align-items: center;
          margin-bottom: 2px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          position: relative;
          padding-left: 28px;
          cursor: pointer;
          font-size: 13px;
          user-select: none;
          color: var(--gray);
          font-weight: 500;
        }

        .checkbox-label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-custom {
          position: absolute;
          top: 0;
          left: 0;
          height: 18px;
          width: 18px;
          background-color: rgba(255, 255, 255, 0.8);
          border: 1.5px solid var(--border);
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .checkbox-label:hover input ~ .checkbox-custom {
          border-color: var(--primary);
        }

        .checkbox-label input:checked ~ .checkbox-custom {
          background-color: var(--primary);
          border-color: var(--primary);
        }

        .checkbox-custom:after {
          content: "";
          position: absolute;
          display: none;
        }

        .checkbox-label input:checked ~ .checkbox-custom:after {
          display: block;
        }

        .checkbox-label .checkbox-custom:after {
          left: 5px;
          top: 2px;
          width: 5px;
          height: 9px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }

        .checkbox-text {
          transition: color 0.3s;
        }

        .checkbox-label:hover .checkbox-text {
          color: var(--ink);
        }

        .login-btn {
          width: 100%;
          padding: 14px 28px;
          font-size: 15.5px;
        }

        .divider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin: 4px 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background-color: var(--border);
          opacity: 0.8;
        }

        .divider-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          font-weight: 600;
          color: var(--gray-light);
        }

        /* Google button */
        .btn-google {
          background: #fff;
          color: #1f2937;
          border: 1.5px solid var(--border);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
          width: 100%;
          font-weight: 600;
          font-size: 14.5px;
          padding: 12px 24px;
        }

        .btn-google:hover {
          background: #f9fafb;
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        .google-icon {
          width: 18px;
          height: 18px;
        }

        /* Guest button */
        .guest-btn {
          width: 100%;
          padding: 12px 24px;
          font-size: 14.5px;
          border-color: var(--border);
        }

        .login-footer {
          text-align: center;
          font-size: 13.5px;
          color: var(--gray);
        }

        .register-link {
          color: var(--primary);
          font-weight: 600;
        }

        .register-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  </PageTransition>
);
}
