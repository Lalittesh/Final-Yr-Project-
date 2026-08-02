import React from 'react';

export default function LivePreview() {
  return (
    <section id="preview">
      <div className="aurora">
        <span></span>
        <span></span>
      </div>
      <div className="wrap">
        <div className="preview-panel reveal-scale">
          <div className="preview-grid">
            <div>
              <span 
                className="eyebrow" 
                style={{ 
                  background: 'rgba(212, 175, 55, .16)', 
                  borderColor: 'rgba(212, 175, 55, .32)', 
                  color: '#F0D999' 
                }}
              >
                Live Preview
              </span>
              <h2 style={{ margin: '20px 0 14px', fontSize: 'clamp(26px, 3.4vw, 38px)' }}>
                Watch a compliance scan run in real time
              </h2>
              <p className="section-sub" style={{ marginBottom: 0 }}>
                The scanner locates the label, OCR reads every field, and the compliance engine cross-checks it against the Legal Metrology (Packaged Commodities) Rules — all before you'd finish typing a checklist entry.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="cam-ui">
                <div className="cam-frame">
                  <div className="cam-corner cc1"></div>
                  <div className="cam-corner cc2"></div>
                  <div className="cam-corner cc3"></div>
                  <div className="cam-corner cc4"></div>
                  <div className="cam-beam"></div>
                  <div className="cam-product">
                    <div className="bars">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <div className="cam-status">
                  <span>Frame 04A · Product Label</span>
                  <span className="live">
                    <span className="dot"></span>SCANNING
                  </span>
                </div>
              </div>
              <div className="report-card">
                <div className="report-row">
                  <span>MRP declared</span>
                  <span className="badge ok">Pass</span>
                </div>
                <div className="report-row">
                  <span>Net quantity format</span>
                  <span className="badge ok">Pass</span>
                </div>
                <div className="report-row">
                  <span>Manufacturer address</span>
                  <span className="badge warn">Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
