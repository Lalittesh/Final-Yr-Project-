import React from 'react';

export default function Comparison() {
  const traditionalPoints = [
    'Manual checklist, prone to human error',
    "Minutes per product, doesn't scale",
    'Paper trail, hard to audit later',
    'Inconsistent between inspectors',
  ];

  const metroAIPoints = [
    'AI-verified against the ruleset, every time',
    'Under 3 seconds per scan',
    'Digital report with full scan history',
    'Consistent rules, applied uniformly',
  ];

  return (
    <section className="compare-section">
      <div className="aurora">
        <span></span>
        <span></span>
      </div>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow">Comparison</span>
          <h2 className="section-title">
            Manual inspection vs.<br />
            AI compliance
          </h2>
        </div>
        <div className="compare reveal">
          <div className="compare-card old">
            <h4>Traditional Inspection</h4>
            <ul className="compare-list">
              {traditionalPoints.map((point, idx) => (
                <li key={idx}>
                  <svg fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="compare-card new">
            <h4>MetroAI Compliance</h4>
            <ul className="compare-list">
              {metroAIPoints.map((point, idx) => (
                <li key={idx}>
                  <svg fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
