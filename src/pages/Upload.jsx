import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition/PageTransition';

export default function Upload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // Simulation & Pipeline States
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(0);

  const fileInputRef = useRef(null);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const processFile = (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadError('Unsupported format. Please upload a PNG, JPEG, or WEBP image.');
      setUploadedImage(null);
      setSelectedFile(null);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds the 10MB limit.');
      setUploadedImage(null);
      setSelectedFile(null);
      return;
    }

    setUploadError(null);
    setSelectedFile(file);
    setIsSimulating(false);
    setSimStep(0);

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const triggerFileBrowser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setUploadedImage(null);
    setSelectedFile(null);
    setUploadError(null);
    setIsSimulating(false);
    setSimStep(0);
  };

  const startAnalysis = () => {
    if (!uploadedImage) return;
    setIsSimulating(true);
  };

  const workflowSteps = [
    { label: 'File Uploaded', status: uploadedImage ? 'completed' : 'active', icon: '📤' },
    { label: 'Object Detection', status: simStep >= 1 ? (simStep === 1 ? 'loading' : 'completed') : 'idle', icon: '🎯' },
    { label: 'OCR Label Read', status: simStep >= 2 ? (simStep === 2 ? 'loading' : 'completed') : 'idle', icon: '📝' },
    { label: 'Compliance Audit', status: simStep >= 3 ? (simStep === 3 ? 'loading' : 'completed') : 'idle', icon: '🛡️' },
    { label: 'AI Risk Analysis', status: simStep >= 4 ? 'completed' : 'idle', icon: '🧠' },
    { label: 'Report Generation', status: simStep >= 4 ? 'completed' : 'idle', icon: '📄' }
  ];

  const detectionObjects = [
    { name: 'Product Outline', conf: simStep >= 1 ? (simStep === 1 ? 78 : 98) : 0 },
    { name: 'Label Wrapper', conf: simStep >= 1 ? (simStep === 1 ? 62 : 99) : 0 },
    { name: 'EAN Barcode', conf: simStep >= 2 ? (simStep === 2 ? 80 : 96) : 0 },
    { name: 'Corporate Brand Logo', conf: simStep >= 1 ? 94 : 0 },
    { name: 'LMPC Declarations Text', conf: simStep >= 2 ? (simStep === 2 ? 40 : 97) : 0 }
  ];

  const timelineLogs = [
    { desc: 'Image Workspace Initialized', status: 'completed', time: '20:24:01' },
    { desc: uploadedImage ? `File loaded: ${selectedFile.name}` : 'Waiting for file upload...', status: uploadedImage ? 'completed' : 'pending', time: '20:24:02' },
    { desc: simStep >= 1 ? 'AI checking bounding boxes for mandatory tags...' : 'Waiting for analysis trigger...', status: simStep >= 1 ? 'completed' : 'pending', time: '20:24:05' },
    { desc: simStep >= 2 ? 'OCR reading font heights and text details...' : 'Ready to verify metrology compliance...', status: simStep >= 2 ? 'completed' : 'pending', time: '20:24:08' }
  ];

  return (
    <PageTransition>
      <div className="upload-workspace-container">
        
        {/* Top Header */}
        <header className="upload-header-bar">
          <div className="header-meta">
            <Link to="/dashboard" className="back-dash-btn" onClick={removeFile}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Dashboard</span>
            </Link>
            <div className="header-titles">
              <h2>Upload Label Workspace</h2>
              <p>Verify pre-packaged commodity labels by uploading flat artwork or wrapping prints</p>
            </div>
          </div>

          <div className="header-actions">
            <div className="sys-status-badge">
              <span className={`status-led ${simStep > 0 && simStep < 4 ? 'scanning' : (uploadedImage ? 'idle' : 'inactive')}`}></span>
              <span>SYSTEM: {simStep === 4 ? 'READY' : (simStep > 0 ? 'ANALYZING...' : (uploadedImage ? 'FILE READY' : 'OFFLINE'))}</span>
            </div>
          </div>
        </header>

        {/* Workspace Grid */}
        <div className="upload-grid">
          
          {/* Left Column: Drag & Drop Card, Process flow map */}
          <div className="upload-col-main">
            
            {/* Upload Zone Card */}
            <div className="scanner-card upload-panel">
              <div 
                className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={uploadedImage ? undefined : triggerFileBrowser}
                style={{ cursor: uploadedImage ? 'default' : 'pointer' }}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  style={{ display: 'none' }}
                />

                {uploadedImage ? (
                  <div className="upload-preview-container">
                    <img src={uploadedImage} alt="Uploaded packaging label" className="uploaded-preview-img" />
                    <button className="remove-preview-btn" onClick={removeFile} title="Remove image">
                      ✕ Remove Image
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="upload-icon-wrapper">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                    </div>
                    <h4>Drag & drop product packaging here</h4>
                    <p>Or click to browse from local terminal (PNG, JPEG, WEBP up to 10MB)</p>
                    <button className="btn btn-google" style={{ marginTop: '12px', fontSize: '13px', padding: '10px 20px' }}>
                      Browse Files
                    </button>
                  </>
                )}
              </div>

              {uploadError && (
                <div className="upload-error-banner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="upload-footer-actions">
                <span className="file-desc-lbl">
                  {selectedFile ? `${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)` : 'No file selected'}
                </span>
                <button 
                  className="btn btn-primary" 
                  disabled={!uploadedImage || isSimulating} 
                  onClick={startAnalysis}
                  style={{ fontSize: '13px', padding: '10px 24px' }}
                >
                  {simStep > 0 && simStep < 4 ? 'Analyzing...' : 'Analyze Image'}
                </button>
              </div>
            </div>

            {/* Bottom Pipeline Map */}
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
          <div className="upload-col-side">
            
            {/* Status Diagnostics */}
            <div className="scanner-card status-diagnostic-card">
              <h4>Inspection Engine Status</h4>
              <div className="diagnostic-details">
                <div className="diag-row">
                  <span>File Buffer</span>
                  <span className={`diag-val-badge ${uploadedImage ? 'active' : 'idle'}`}>
                    <span className="diag-dot"></span>
                    {uploadedImage ? 'READY' : 'WAITING...'}
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

            {/* Results Wrapper (AnimatePresence) */}
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
                  <h3>No product analyzed yet.</h3>
                  <p>Upload a packaging image and click "Analyze Image" to begin auditing metrology rules.</p>
                  
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

            {/* Timeline Logs */}
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
        .upload-workspace-container {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Header Area */
        .upload-header-bar {
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
          .upload-header-bar {
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
        .upload-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 24px;
          align-items: start;
        }

        @media (max-width: 991px) {
          .upload-grid {
            grid-template-columns: 1fr;
          }
        }

        .upload-col-main, .upload-col-side {
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

        /* Upload Panel & dropzone */
        .upload-dropzone {
          border: 2px dashed var(--border);
          border-radius: var(--radius-sm, 12px);
          padding: 40px 20px;
          text-align: center;
          background: rgba(255, 255, 255, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.3s;
          position: relative;
          min-height: 260px;
        }

        .upload-dropzone.drag-over {
          border-color: var(--primary);
          background: rgba(196, 30, 58, 0.04);
        }

        .upload-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(196, 30, 58, 0.05);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .upload-icon-wrapper svg {
          width: 22px;
          height: 22px;
        }

        .upload-dropzone h4 {
          font-size: 14.5px;
          font-weight: 600;
          color: var(--ink);
          margin: 0;
        }

        .upload-dropzone p {
          font-size: 12px;
          color: var(--gray);
          max-width: 280px;
          line-height: 1.4;
          margin: 0;
        }

        .upload-preview-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .uploaded-preview-img {
          max-width: 100%;
          max-height: 240px;
          object-fit: contain;
          border-radius: 8px;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-soft);
        }

        .remove-preview-btn {
          background: rgba(28, 14, 16, 0.7);
          border: none;
          color: #fff;
          font-weight: 600;
          font-size: 11.5px;
          padding: 6px 14px;
          border-radius: 99px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .remove-preview-btn:hover {
          background: var(--primary);
          transform: translateY(-1px);
        }

        .upload-error-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(239, 68, 68, 0.06);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: 6px;
          padding: 10px 14px;
          color: var(--error);
          font-size: 12px;
          margin-top: 14px;
        }

        .upload-error-banner svg {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .upload-footer-actions {
          margin-top: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 14px;
        }

        .file-desc-lbl {
          font-size: 12.5px;
          color: var(--gray-light);
          font-style: italic;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 220px;
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
