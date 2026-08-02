import React from 'react';

export default function HowItWorks() {
  const steps = [
    { t: 'Open Scanner', d: 'Launch the scanner from desktop, mobile, or a fixed inspection-line camera.' },
    { t: 'Capture Product', d: 'Frame the label — the AI auto-detects edges and stabilizes the shot.' },
    { t: 'AI Reads Label', d: 'OCR extracts every declared field with layout-aware parsing.' },
    { t: 'Compliance Engine', d: 'Extracted fields are checked against the Legal Metrology (Packaged Commodities) Rules.' },
    { t: 'Report Generated', d: 'A shareable, audit-ready report is generated with pass/fail detail per clause.' },
  ];

  return (
    <section className="how" id="how">
      <div className="aurora">
        <span></span>
        <span></span>
      </div>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow">Process</span>
          <h2 className="section-title">
            From capture to report,<br />
            in five steps
          </h2>
          <p className="section-sub">
            Every scan follows a fixed inspection sequence, so results are consistent and audit-ready every time.
          </p>
        </div>
        <div className="timeline" id="timeline">
          {steps.map((s, i) => (
            <div className="t-step reveal" key={i}>
              <div className="t-num">{String(i + 1).padStart(2, '0')}</div>
              <div className="t-body">
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
