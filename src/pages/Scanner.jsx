import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';
import { cameraService } from '../services/camera/cameraService';

export default function Scanner() {
  // Webcam & Capture States
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');
  const [flashActive, setFlashActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Simulation & Pipeline States
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const videoRef = useRef(null);
  const previewContainerRef = useRef(null);

  // Update HUD Clock
  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockTimer);
  }, []);

  // Bind video stream to ref object when stream is established
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Clean up camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        cameraService.stopStream(stream);
      }
    };
  }, [stream]);

  // Simulated scan state transitions
  useEffect(() => {
    let timer;
    if (isSimulating) {
      setSimStep(1); // 1: Detecting Object
      timer = setTimeout(() => {
        setSimStep(2); // 2: OCR Scanning
        timer = setTimeout(() => {
          setSimStep(3); // 3: AI Compliance Checks
          timer = setTimeout(() => {
            setSimStep(4); // 4: Done
          }, 1200);
        }, 1200);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isSimulating]);

  // Start Camera Feed handler
  const startCameraFeed = async () => {
    setCameraError(null);
    setCapturedImage(null);
    try {
      const activeStream = await cameraService.getStream(facingMode);
      setStream(activeStream);
    } catch (err) {
      setCameraError(err.customMessage || 'Camera stream could not be initialized.');
    }
  };

  // Stop Camera Feed handler
  const stopCameraFeed = () => {
    if (stream) {
      cameraService.stopStream(stream);
      setStream(null);
    }
  };

  // Switch camera front/back lens
  const switchCameraLens = async () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (stream) {
      cameraService.stopStream(stream);
      try {
        const nextStream = await cameraService.getStream(nextMode);
        setStream(nextStream);
      } catch (err) {
        setCameraError(err.customMessage || 'Failed to switch camera device.');
        setStream(null);
      }
    }
  };

  // Trigger fullscreen on preview container
  const toggleFullscreen = () => {
    if (previewContainerRef.current) {
      if (!document.fullscreenElement) {
        previewContainerRef.current.requestFullscreen().catch((err) => {
          console.error(`Fullscreen request failed: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  // Grab active camera frame
  const captureCurrentFrame = () => {
    if (!videoRef.current || !stream) return;
    
    // Trigger visual screen flash overlay
    setFlashActive(true);
    setTimeout(() => setFlashActive(false), 200);

    try {
      const frameUri = cameraService.captureFrame(videoRef.current);
      setCapturedImage(frameUri);
      
      // Stop live feeds to display frame preview
      cameraService.stopStream(stream);
      setStream(null);
    } catch (err) {
      setCameraError('Failed to capture frame from video stream.');
    }
  };

  // Delete captured frame & restart webcam
  const deleteCapturedFrame = () => {
    setCapturedImage(null);
    startCameraFeed();
  };

  // Start mock analysis on captured frame
  const useCapturedFrame = () => {
    if (!capturedImage) return;
    setIsSimulating(true);
  };

  const resetAllStates = () => {
    setIsSimulating(false);
    setSimStep(0);
    setCapturedImage(null);
    stopCameraFeed();
  };

  const workflowSteps = [
    { label: 'Camera Feed', status: stream ? 'active' : (capturedImage ? 'completed' : 'idle'), icon: '📷' },
    { label: 'Object Detection', status: simStep >= 1 ? (simStep === 1 ? 'loading' : 'completed') : 'idle', icon: '🎯' },
    { label: 'OCR Label Read', status: simStep >= 2 ? (simStep === 2 ? 'loading' : 'completed') : 'idle', icon: '📝' },
    { label: 'Compliance Audit', status: simStep >= 3 ? (simStep === 3 ? 'loading' : 'completed') : 'idle', icon: '🛡️' },
    { label: 'AI Risk Analysis', status: simStep >= 4 ? 'completed' : 'idle', icon: '🧠' },
    { label: 'Report Generation', status: simStep >= 4 ? 'completed' : 'idle', icon: '📄' }
  ];

  const detectionObjects = [
    { name: 'Product Outline', conf: simStep >= 1 ? (simStep === 1 ? 75 : 98) : 0 },
    { name: 'Label Wrapper', conf: simStep >= 1 ? (simStep === 1 ? 60 : 99) : 0 },
    { name: 'EAN Barcode', conf: simStep >= 2 ? (simStep === 2 ? 82 : 95) : 0 },
    { name: 'Corporate Brand Logo', conf: simStep >= 1 ? 92 : 0 },
    { name: 'LMPC Declarations Text', conf: simStep >= 2 ? (simStep === 2 ? 45 : 97) : 0 }
  ];

  const timelineLogs = [
    { desc: 'AI Scanner Subsystem Initialized', status: 'completed', time: '20:24:01' },
    { desc: stream ? 'Webcam live stream active' : (capturedImage ? 'Frame buffer stored' : 'Inspection Camera Buffer Ready'), status: 'completed', time: '20:24:02' },
    { desc: simStep >= 1 ? 'Detecting pre-packaged commodity wrapper...' : 'Waiting for product placement...', status: simStep >= 1 ? 'completed' : 'pending', time: '20:24:05' },
    { desc: simStep >= 2 ? 'OCR reading font heights and mandatory labels...' : 'Ready to analyze label attributes...', status: simStep >= 2 ? 'completed' : 'pending', time: '20:24:08' }
  ];

  return (
    <PageTransition>
      <div className="scanner-container">
        
        {/* Top Header */}
        <header className="scanner-header-bar">
          <div className="header-meta">
            <Link to="/dashboard" className="back-dash-btn" onClick={resetAllStates}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
            <div className="header-titles">
              <h2>AI Product Scanner</h2>
              <p>Futuristic Metrology Verification Terminal • Real-Time LMPC Auditing</p>
            </div>
          </div>
          
          <div className="header-actions">
            <div className="sys-status-badge">
              <span className={`status-led ${simStep > 0 && simStep < 4 ? 'scanning' : (stream ? 'idle' : 'inactive')}`}></span>
              <span>SYSTEM: {simStep === 4 ? 'READY' : (simStep > 0 ? 'SCANNING...' : (stream ? 'LIVE FEED' : 'OFFLINE'))}</span>
            </div>
          </div>
        </header>

        {/* Main Workspace Grid */}
        <div className="scanner-grid">
          
          {/* Left Column: Camera Preview, Controls, Process Map */}
          <div className="scanner-col-main">
            
            {/* 16:9 Camera Preview Box */}
            <div className="camera-preview-box" ref={previewContainerRef}>
              {/* corner brackets */}
              <div className="corner top-left"></div>
              <div className="corner top-right"></div>
              <div className="corner bottom-left"></div>
              <div className="corner bottom-right"></div>
              
              {/* Glass Scan overlay */}
              <div className="camera-glass-overlay"></div>
              
              {/* Camera flash trigger overlay */}
              <div className={`camera-flash-overlay ${flashActive ? 'flash' : ''}`}></div>
              
              {/* Animated laser line */}
              <div className={`laser-scan-line ${simStep > 0 && simStep < 4 ? 'active' : ''}`}></div>

              {/* Floating Fullscreen button inside webcam frame (top-right) */}
              {(stream || capturedImage) && (
                <button 
                  className="floating-fullscreen-btn"
                  onClick={toggleFullscreen}
                  title="Toggles fullscreen mode"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </button>
              )}

              {/* Feed Logic */}
              {cameraError ? (
                <div className="camera-error-display">
                  <svg className="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <h4>Camera Stream Error</h4>
                  <p>{cameraError}</p>
                  <button className="btn btn-primary" style={{ fontSize: '12px', padding: '8px 16px', marginTop: '12px' }} onClick={startCameraFeed}>
                    Retry Connection
                  </button>
                </div>
              ) : stream ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="live-video-element"
                />
              ) : capturedImage ? (
                <div className="captured-image-wrapper">
                  <img src={capturedImage} alt="Captured preview" className="captured-preview-element" />
                  <div className="capture-preview-badge">CAP-BUFFER-01</div>
                  
                  {/* Option overlays */}
                  {simStep === 0 && (
                    <div className="capture-options-overlay">
                      <button className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: '12.5px', background: 'rgba(0,0,0,0.65)' }} onClick={deleteCapturedFrame}>
                        ✕ Delete & Retake
                      </button>
                      <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '12.5px' }} onClick={useCapturedFrame}>
                        ⚡ Use Image & Analyze
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Camera Placeholder elements */
                <div className="camera-bg-graphic">
                  <svg className="reticle-svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="30" className="reticle-circle" />
                    <line x1="50" y1="15" x2="50" y2="85" className="reticle-crosshair" />
                    <line x1="15" y1="50" x2="85" y2="50" className="reticle-crosshair" />
                  </svg>
                  
                  {simStep > 0 && simStep < 4 && (
                    <motion.div 
                      className="scanning-pulse-ring"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  )}
                </div>
              )}

              {/* Dynamic HUD Overlays */}
              <div className="camera-overlay-info">
                <span className="info-label">RESOLUTION: UHD 3840×2160</span>
                <span className="info-label">FPS: 60.00 FPS</span>
                <span className="info-label flex-align-hud">
                  {stream && (
                    <span className="rec-indicator">
                      <span className="rec-dot"></span>
                      <span>REC</span>
                    </span>
                  )}
                  <span>{currentTime}</span>
                </span>
              </div>
            </div>

            {/* Redesigned Camera Controls (Large and Premium Layout) */}
            <div className="camera-controls-panel-v2">
              {/* Start Camera Button (rounded pill primary accent) */}
              <button 
                className="premium-btn start-camera-btn" 
                onClick={startCameraFeed}
                disabled={!!stream}
                title="Start webcam live stream"
              >
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span>Start Camera</span>
              </button>

              {/* DSLR Circular Shutter Capture Button */}
              <div className="shutter-control-wrapper">
                <button 
                  className="camera-shutter-btn" 
                  onClick={captureCurrentFrame}
                  disabled={!stream}
                  title="Capture current video frame buffer"
                >
                  <div className="shutter-inner"></div>
                </button>
              </div>

              {/* Right Button and Torch floating icon */}
              <div className="right-controls-group">
                {/* Stop Camera Button (red accent pill design) */}
                <button 
                  className="premium-btn stop-camera-btn" 
                  onClick={stopCameraFeed}
                  disabled={!stream}
                  title="Stop camera live stream"
                >
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  </svg>
                  <span>Stop Camera</span>
                </button>

                {/* Torch Floating Icon Button */}
                <button 
                  className={`torch-btn ${flashActive ? 'active' : ''}`}
                  disabled={!stream}
                  onClick={() => {
                    setFlashActive(true);
                    setTimeout(() => setFlashActive(false), 250);
                  }}
                  title="Trigger flashlight simulated pulse"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 2H6v3h12V2zM6 9v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V9H6zm6 7v3"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Bottom Process Flow */}
            <div className="scanner-card process-flow-card">
              <h4>Subsystem Auditing Pipeline</h4>
              <div className="process-flow-steps">
                {workflowSteps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div className={`flow-step-item ${step.status}`}>
                      <div className="flow-step-icon">{step.icon}</div>
                      <span className="flow-step-lbl">{step.label}</span>
                    </div>
                    {idx < workflowSteps.length - 1 && (
                      <div className={`flow-arrow ${simStep > idx ? 'active' : ''}`}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Status Panels, Empty State / Results */}
          <div className="scanner-col-side">
            
            {/* Diagnostic Status Cards */}
            <div className="scanner-card status-diagnostic-card">
              <h4>Inspection Engine Status</h4>
              <div className="diagnostic-details">
                <div className="diag-row">
                  <span>Camera Stream</span>
                  <span className={`diag-val-badge ${stream ? 'active' : 'idle'}`}>
                    <span className="diag-dot"></span>
                    {stream ? 'ONLINE' : 'WAITING...'}
                  </span>
                </div>
                <div className="diag-row">
                  <span>AI Predictor Node</span>
                  <span className={`diag-val-badge ${simStep >= 1 ? 'active' : 'idle'}`}>
                    <span className="diag-dot"></span>
                    {simStep >= 4 ? 'READY' : (simStep >= 1 ? 'PROCESSING...' : 'IDLE')}
                  </span>
                </div>
                <div className="diag-row">
                  <span>OCR Text Parser</span>
                  <span className={`diag-val-badge ${simStep >= 2 ? 'active' : 'idle'}`}>
                    <span className="diag-dot"></span>
                    {simStep >= 4 ? 'READY' : (simStep >= 2 ? 'PARSING...' : 'IDLE')}
                  </span>
                </div>
                <div className="diag-row">
                  <span>Metrology Validator</span>
                  <span className={`diag-val-badge ${simStep >= 3 ? 'active' : 'idle'}`}>
                    <span className="diag-dot"></span>
                    {simStep >= 4 ? 'READY' : (simStep >= 3 ? 'COMPARING...' : 'IDLE')}
                  </span>
                </div>
                <div className="diag-row">
                  <span>Confidence Level</span>
                  <span className="diag-conf-text mono">
                    {simStep === 4 ? '99.8%' : (simStep === 3 ? '92.4%' : (simStep === 2 ? '78.5%' : (simStep === 1 ? '45.0%' : '0%')))}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive display area: Empty State vs Loaded Results */}
            <AnimatePresence mode="wait">
              {simStep < 4 ? (
                <motion.div 
                  key="empty-state"
                  className="scanner-card empty-result-card"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="empty-graphic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  </div>
                  <h3>No product detected yet.</h3>
                  <p>Start the camera feed, capture an image, and click "Use Image & Analyze" to begin auditing metrology rules.</p>
                  
                  {/* Shimmering placeholders for preview */}
                  <div className="shimmer-placeholder-block">
                    <div className="shimmer-row w-full"></div>
                    <div className="shimmer-row w-half"></div>
                    <div className="shimmer-row w-third"></div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result-state"
                  className="results-wrapper-group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Compliance Card */}
                  <div className="scanner-card compliance-verdict-card">
                    <div className="compliance-header-verdict">
                      <div>
                        <h4>Compliance Auditor Score</h4>
                        <p>Regulatory verdict output</p>
                      </div>
                      <span className="verdict-score-badge compliant">100% PASS</span>
                    </div>
                    
                    <div className="compliance-lists-group">
                      <div className="compliance-item-meta">
                        <strong>Missing Required Fields:</strong>
                        <span className="text-muted">None (All 12 declarations present)</span>
                      </div>
                      <div className="compliance-item-meta">
                        <strong>LMPC Warnings:</strong>
                        <span className="text-warning">Net Qty typography size is bordering 2.0mm.</span>
                      </div>
                      <div className="compliance-item-meta">
                        <strong>LMPC Recommendation:</strong>
                        <span className="text-gold">Increase Net Qty font print to 3.0mm for improved visibility.</span>
                      </div>
                      <div className="compliance-item-meta">
                        <strong>Legal Rule Reference:</strong>
                        <span className="text-link">LMPC Rules, 2011 • Schedule II Clause 4</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="scanner-card product-details-card">
                    <h4>Identified Metrology Declarations</h4>
                    <div className="details-grid-table">
                      <div className="details-tbl-row"><span>Product Name</span><strong>Parle-G Gold Biscuits</strong></div>
                      <div className="details-tbl-row"><span>Brand</span><strong>Parle</strong></div>
                      <div className="details-tbl-row"><span>Category</span><strong>Food Products</strong></div>
                      <div className="details-tbl-row"><span>MRP</span><strong>₹10.00 (Incl. of all taxes)</strong></div>
                      <div className="details-tbl-row"><span>Net Quantity</span><strong>100g</strong></div>
                      <div className="details-tbl-row"><span>Manufacturer</span><strong>Parle Products Pvt. Ltd.</strong></div>
                      <div className="details-tbl-row"><span>Importer Address</span><strong>N/A (Domestic)</strong></div>
                      <div className="details-tbl-row"><span>Batch Number</span><strong>PGG-0626A</strong></div>
                      <div className="details-tbl-row"><span>Manufacturing Date</span><strong>06/2026</strong></div>
                      <div className="details-tbl-row"><span>Expiry / Best Before</span><strong>12/2026</strong></div>
                      <div className="details-tbl-row"><span>Barcode Code</span><strong>8901725181223</strong></div>
                      <div className="details-tbl-row"><span>Country of Origin</span><strong>India</strong></div>
                    </div>
                  </div>

                  {/* AI Detections List */}
                  <div className="scanner-card detections-accuracy-card">
                    <h4>Bounding Box Object Predictions</h4>
                    <div className="detections-progress-list">
                      {detectionObjects.map((obj, idx) => (
                        <div key={idx} className="det-progress-item">
                          <div className="det-progress-labels">
                            <span>{obj.name}</span>
                            <span className="mono">{obj.conf}%</span>
                          </div>
                          <div className="det-progress-track">
                            <motion.div 
                              className="det-progress-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${obj.conf}%` }}
                              transition={{ duration: 0.8, delay: idx * 0.05 }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live Activity Timeline */}
            <div className="scanner-card activity-log-card">
              <h4>Scanner Terminal Timeline</h4>
              <div className="activity-timeline-feed">
                {timelineLogs.map((log, idx) => (
                  <div key={idx} className="timeline-feed-row">
                    <span className={`feed-dot ${log.status}`}></span>
                    <div className="feed-text-block">
                      <p>{log.desc}</p>
                      <span className="feed-time mono">{log.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .scanner-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Header Area */
        .scanner-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: var(--glass-strong);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          padding: 20px 24px;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .scanner-header-bar {
            flex-direction: column;
            align-items: flex-start;
            padding: 16px;
          }
        }

        .header-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .back-dash-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary);
          font-weight: 700;
          font-size: 13px;
          text-decoration: none;
          transition: transform 0.3s;
        }

        .back-dash-btn:hover {
          transform: translateX(-4px);
        }

        .back-dash-btn svg {
          width: 14px;
          height: 14px;
        }

        .header-titles h2 {
          font-family: 'Fraunces', serif;
          font-size: 22px;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
        }

        .header-titles p {
          font-size: 12.5px;
          color: var(--gray);
          margin: 2px 0 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 480px) {
          .header-actions {
            flex-direction: column;
            width: 100%;
            align-items: stretch;
          }
        }

        .sys-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(28, 14, 16, 0.04);
          border: 1px solid var(--border);
          padding: 8px 14px;
          border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          font-weight: 700;
          color: var(--gray);
        }

        .status-led {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--gray-light);
        }

        .status-led.scanning {
          background-color: var(--primary);
          animation: pulse-led-red 1.2s infinite;
        }

        .status-led.idle {
          background-color: var(--success);
          animation: pulse-led-green 1.5s infinite;
        }

        .status-led.inactive {
          background-color: var(--gray-light);
        }

        @keyframes pulse-led-red {
          0% { box-shadow: 0 0 0 0 rgba(196, 30, 58, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(196, 30, 58, 0); }
          100% { box-shadow: 0 0 0 0 rgba(196, 30, 58, 0); }
        }

        @keyframes pulse-led-green {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        /* Workspace Grid */
        .scanner-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 991px) {
          .scanner-grid {
            grid-template-columns: 1fr;
          }
        }

        .scanner-col-main, .scanner-col-side {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .scanner-card {
          background: var(--glass-strong);
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          padding: 24px;
          box-shadow: var(--shadow-soft);
        }

        /* Camera Box Placeholder */
        .camera-preview-box {
          aspect-ratio: 16/9;
          background: #0b0506;
          border-radius: var(--radius-md, 18px);
          border: 1px solid var(--border);
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lift);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .camera-glass-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%);
          z-index: 2;
          pointer-events: none;
        }

        .camera-flash-overlay {
          position: absolute;
          inset: 0;
          background-color: #fff;
          opacity: 0;
          z-index: 99;
          pointer-events: none;
        }

        .camera-flash-overlay.flash {
          animation: camera-flash-glow 0.25s ease-out;
        }

        @keyframes camera-flash-glow {
          0% { opacity: 0; }
          40% { opacity: 1; }
          100% { opacity: 0; }
        }

        .live-video-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        .captured-image-wrapper {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .captured-preview-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .capture-preview-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background-color: var(--primary);
          color: #fff;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 4px;
          z-index: 5;
          letter-spacing: 0.05em;
          box-shadow: var(--shadow-soft);
        }

        .capture-options-overlay {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 16px;
          z-index: 5;
          padding: 0 20px;
        }

        .corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: var(--primary);
          border-style: solid;
          z-index: 3;
        }

        .corner.top-left { top: 20px; left: 20px; border-width: 3px 0 0 3px; }
        .corner.top-right { top: 20px; right: 20px; border-width: 3px 3px 0 0; }
        .corner.bottom-left { bottom: 20px; left: 20px; border-width: 0 0 3px 3px; }
        .corner.bottom-right { bottom: 20px; right: 20px; border-width: 0 3px 3px 0; }

        .laser-scan-line {
          position: absolute;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
          box-shadow: 0 0 10px var(--primary);
          z-index: 4;
          opacity: 0;
          pointer-events: none;
        }

        .laser-scan-line.active {
          opacity: 1;
          animation: move-laser 3s linear infinite;
        }

        @keyframes move-laser {
          0% { top: 12%; }
          50% { top: 88%; }
          100% { top: 12%; }
        }

        .camera-bg-graphic {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reticle-svg {
          width: 220px;
          height: 220px;
          color: rgba(196, 30, 58, 0.2);
        }

        .reticle-circle {
          stroke: currentColor;
          stroke-dasharray: 4 4;
          stroke-width: 1.5;
        }

        .reticle-crosshair {
          stroke: currentColor;
          stroke-width: 0.8;
          stroke-dasharray: 2 6;
        }

        .scanning-pulse-ring {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(196, 30, 58, 0.4);
          pointer-events: none;
        }

        /* Floating Fullscreen button inside webcam */
        .floating-fullscreen-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .floating-fullscreen-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.08);
          border-color: rgba(255, 255, 255, 0.6);
        }

        .floating-fullscreen-btn:active {
          transform: scale(0.95);
        }

        .floating-fullscreen-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Camera HUD overlays */
        .camera-overlay-info {
          position: absolute;
          bottom: 20px;
          left: 24px;
          right: 24px;
          display: flex;
          justify-content: space-between;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          z-index: 5;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        }

        .flex-align-hud {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .rec-indicator {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--error);
          font-weight: 700;
        }

        .rec-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--error);
          animation: rec-dot-blink 1s steps(2, start) infinite;
        }

        @keyframes rec-dot-blink {
          to { visibility: hidden; }
        }

        /* Error message */
        .camera-error-display {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          color: #fff;
          z-index: 5;
          max-width: 320px;
        }

        .error-icon {
          width: 44px;
          height: 44px;
          color: var(--error);
          margin-bottom: 12px;
        }

        .camera-error-display h4 {
          font-family: 'Fraunces', serif;
          font-size: 17px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .camera-error-display p {
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        /* Redesigned Camera Controls (Large & Premium Layout) */
        .camera-controls-panel-v2 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--glass-strong);
          border: 1px solid var(--border);
          border-radius: var(--radius-md, 18px);
          padding: 16px 28px;
          gap: 16px;
          box-shadow: var(--shadow-lift);
        }

        @media (max-width: 640px) {
          .camera-controls-panel-v2 {
            flex-direction: column;
            gap: 20px;
            padding: 20px;
          }
        }

        .premium-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          font-size: 14px;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .premium-btn .btn-icon {
          width: 18px;
          height: 18px;
        }

        /* Start Camera Button Details */
        .start-camera-btn {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: #fff;
          box-shadow: 0 4px 20px rgba(196, 30, 58, 0.25);
        }

        .start-camera-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(196, 30, 58, 0.35);
          filter: brightness(1.1);
        }

        .start-camera-btn:not(:disabled):active {
          transform: translateY(0);
          box-shadow: 0 4px 15px rgba(196, 30, 58, 0.25);
        }

        .start-camera-btn:disabled {
          background: var(--border);
          color: var(--gray-light);
          box-shadow: none;
          cursor: not-allowed;
        }

        /* DSLR Shutter Button Control */
        .shutter-control-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-shrink: 0;
        }

        .camera-shutter-btn {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: transparent;
          border: 4px solid #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), inset 0 2px 5px rgba(255, 255, 255, 0.2);
          padding: 0;
        }

        .camera-shutter-btn .shutter-inner {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: radial-gradient(circle at center, #ffffff 0%, #e2e8f0 100%);
          transition: all 0.2s ease;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
        }

        .camera-shutter-btn:not(:disabled):hover {
          transform: scale(1.05);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .camera-shutter-btn:not(:disabled):active {
          transform: scale(0.95);
        }

        .camera-shutter-btn:not(:disabled):active .shutter-inner {
          transform: scale(0.9);
          background: radial-gradient(circle at center, #e2e8f0 0%, #cbd5e1 100%);
        }

        .camera-shutter-btn:disabled {
          opacity: 0.5;
          border-color: rgba(28, 14, 16, 0.15);
          cursor: not-allowed;
          box-shadow: none;
        }

        .camera-shutter-btn:disabled .shutter-inner {
          background: rgba(28, 14, 16, 0.1);
          box-shadow: none;
        }

        /* Right controls group */
        .right-controls-group {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        @media (max-width: 640px) {
          .right-controls-group {
            width: 100%;
            justify-content: center;
          }
        }

        /* Stop Camera Button Details */
        .stop-camera-btn {
          background: linear-gradient(135deg, #ef4444, #b91c1c);
          color: #fff;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.2);
        }

        .stop-camera-btn:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(239, 68, 68, 0.3);
          filter: brightness(1.1);
        }

        .stop-camera-btn:not(:disabled):active {
          transform: translateY(0);
        }

        .stop-camera-btn:disabled {
          background: var(--border);
          color: var(--gray-light);
          box-shadow: none;
          cursor: not-allowed;
        }

        /* Torch Button Details */
        .torch-btn {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          border: 1.5px solid var(--border);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .torch-btn:not(:disabled):hover {
          border-color: var(--gold);
          color: var(--primary);
          background-color: #fff;
          box-shadow: 0 0 12px rgba(212, 175, 55, 0.35);
          transform: scale(1.05);
        }

        .torch-btn:disabled {
          background: rgba(28, 14, 16, 0.02);
          border-color: var(--border);
          color: var(--gray-light);
          cursor: not-allowed;
          opacity: 0.5;
        }

        .torch-btn.active {
          background: rgba(196, 30, 58, 0.05);
          border-color: var(--primary);
          color: var(--primary);
          box-shadow: 0 0 12px rgba(196, 30, 58, 0.2);
        }

        .torch-btn svg {
          width: 18px;
          height: 18px;
        }

        /* Process Auditing Flow */
        .process-flow-card h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          margin-bottom: 18px;
        }

        .process-flow-steps {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        @media (max-width: 640px) {
          .process-flow-steps {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }
          .flow-arrow {
            transform: rotate(90deg);
            align-self: center;
          }
        }

        .flow-step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          flex: 1;
        }

        @media (max-width: 640px) {
          .flow-step-item {
            flex-direction: row;
            gap: 12px;
          }
        }

        .flow-step-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(28, 14, 16, 0.04);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: all 0.3s;
        }

        .flow-step-lbl {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--gray-light);
          text-align: center;
        }

        .flow-step-item.active .flow-step-icon {
          background-color: rgba(34, 197, 94, 0.12);
          border-color: var(--success);
          color: var(--success);
          box-shadow: 0 0 10px rgba(34, 197, 94, 0.2);
        }

        .flow-step-item.active .flow-step-lbl {
          color: var(--ink);
          font-weight: 700;
        }

        .flow-step-item.loading .flow-step-icon {
          background-color: rgba(245, 158, 11, 0.1);
          border-color: var(--warning);
          animation: pulse-led-gold 1.2s infinite;
        }

        @keyframes pulse-led-gold {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }

        .flow-step-item.loading .flow-step-lbl {
          color: var(--primary-dark);
        }

        .flow-step-item.completed .flow-step-icon {
          background-color: rgba(196, 30, 58, 0.06);
          border-color: var(--primary);
          color: var(--primary);
        }

        .flow-step-item.completed .flow-step-lbl {
          color: var(--ink);
        }

        .flow-arrow {
          color: var(--gray-light);
          opacity: 0.6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .flow-arrow.active {
          color: var(--primary);
          opacity: 1;
        }

        .flow-arrow svg {
          width: 14px;
          height: 14px;
        }

        /* Diagnostic Status Panel */
        .status-diagnostic-card h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .diagnostic-details {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .diag-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
        }

        .diag-val-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
        }

        .diag-val-badge.active {
          background-color: rgba(34, 197, 94, 0.08);
          color: var(--success);
        }

        .diag-val-badge.idle {
          background-color: rgba(28, 14, 16, 0.04);
          color: var(--gray-light);
          border: 1px solid var(--border);
        }

        .diag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--gray-light);
        }

        .active .diag-dot {
          background-color: var(--success);
          animation: pulse-dot 1.2s infinite;
        }

        @keyframes pulse-dot {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }

        .diag-conf-text {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--primary-dark);
        }

        /* Empty Result Card */
        .empty-result-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 44px 24px;
          gap: 12px;
        }

        .empty-graphic {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(196, 30, 58, 0.05);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-graphic svg {
          width: 32px;
          height: 32px;
        }

        .empty-result-card h3 {
          font-family: 'Fraunces', serif;
          font-size: 18px;
          font-weight: 600;
          margin: 4px 0 0;
        }

        .empty-result-card p {
          font-size: 13px;
          color: var(--gray);
          line-height: 1.55;
          max-width: 280px;
        }

        .shimmer-placeholder-block {
          width: 100%;
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .shimmer-row {
          height: 8px;
          background: rgba(28, 14, 16, 0.03);
          border-radius: 99px;
          position: relative;
          overflow: hidden;
        }

        .shimmer-row.w-full { width: 100%; }
        .shimmer-row.w-half { width: 50%; align-self: center; }
        .shimmer-row.w-third { width: 35%; align-self: center; }

        .shimmer-row::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(28, 14, 16, 0.03), transparent);
          transform: translateX(-100%);
          animation: loading-shimmer 1.6s infinite;
        }

        @keyframes loading-shimmer {
          100% { transform: translateX(100%); }
        }

        /* Results Groups */
        .results-wrapper-group {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Compliance Verdict Card */
        .compliance-header-verdict {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 16px;
        }

        .compliance-header-verdict h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          margin: 0;
        }

        .compliance-header-verdict p {
          font-size: 12px;
          color: var(--gray);
          margin-top: 2px;
        }

        .verdict-score-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 999px;
        }

        .verdict-score-badge.compliant {
          background-color: rgba(34, 197, 94, 0.12);
          color: #15803d;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .compliance-lists-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .compliance-item-meta {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 12.5px;
        }

        .compliance-item-meta strong {
          color: var(--ink);
          font-weight: 600;
        }

        .text-muted { color: var(--gray-light); }
        .text-warning { color: #b45309; font-weight: 500; }
        .text-gold { color: var(--primary-dark); font-weight: 500; }
        .text-link { color: var(--primary); font-weight: 600; text-decoration: underline; }

        /* Product Details */
        .product-details-card h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .details-grid-table {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .details-tbl-row {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid var(--border);
          padding-bottom: 8px;
          font-size: 12.5px;
        }

        .details-tbl-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .details-tbl-row span {
          color: var(--gray);
          font-weight: 500;
        }

        .details-tbl-row strong {
          color: var(--ink);
          font-weight: 600;
          text-align: right;
          max-width: 160px;
        }

        /* AI Detections */
        .detections-accuracy-card h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .detections-progress-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .det-progress-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .det-progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink);
        }

        .det-progress-track {
          height: 6px;
          background: rgba(28, 14, 16, 0.04);
          border-radius: 99px;
          overflow: hidden;
        }

        .det-progress-fill {
          height: 100%;
          border-radius: 99px;
          background: linear-gradient(90deg, var(--primary), var(--violet));
        }

        /* Live activity timeline */
        .activity-log-card h4 {
          font-family: 'Fraunces', serif;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .activity-timeline-feed {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .timeline-feed-row {
          display: flex;
          gap: 12px;
        }

        .feed-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--gray-light);
          margin-top: 5px;
          flex-shrink: 0;
        }

        .feed-dot.completed {
          background-color: var(--primary);
        }

        .feed-dot.pending {
          background-color: var(--gray-light);
          opacity: 0.5;
        }

        .feed-text-block {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .feed-text-block p {
          font-size: 12px;
          color: var(--ink);
          margin: 0;
          line-height: 1.4;
        }

        .feed-time {
          font-size: 10px;
          color: var(--gray-light);
        }
      `}</style>
    </PageTransition>
  );
}
