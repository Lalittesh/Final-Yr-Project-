import React from 'react';

export default function Features() {
  const features = [
    {
      icon: '<path d="M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3"/><rect x="8" y="8" width="8" height="8" rx="1"/>',
      title: 'AI Product Scanner',
      text: 'Point, capture, and let the model detect the label boundary automatically.',
    },
    {
      icon: '<path d="M4 6h16M4 12h10M4 18h7"/><circle cx="19" cy="17" r="2.5"/>',
      title: 'OCR Detection',
      text: 'Every printed field is read and structured — MRP, quantity, batch, and dates.',
    },
    {
      icon: '<path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4z"/>',
      title: 'Compliance Report',
      text: 'A clause-by-clause breakdown against the Legal Metrology Rules, ready to export.',
    },
    {
      icon: '<path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/>',
      title: 'Real-time Validation',
      text: 'Get a pass, fail, or review verdict the instant the scan completes.',
    },
    {
      icon: '<path d="M4 16l4-4a3 3 0 014 0l4 4M14 14l1-1a3 3 0 014 0l1 1M4 20h16"/><rect x="4" y="4" width="16" height="16" rx="2"/>',
      title: 'Image Upload',
      text: 'Already have product photos? Upload a batch and scan them all at once.',
    },
    {
      icon: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
      title: 'Webcam Scan',
      text: 'Scan directly from a connected camera on the inspection floor.',
    },
    {
      icon: '<path d="M12 2a4 4 0 014 4c0 1.5-1 2.5-2 3.5S12 12 12 14M12 18h.01"/>',
      title: 'AI Suggestions',
      text: 'When a label fails, get a plain-language explanation of exactly what to fix.',
    },
    {
      icon: '<path d="M12 8v4l3 3M3 12a9 9 0 1018 0 9 9 0 00-18 0z"/>',
      title: 'History Tracking',
      text: 'Every scan is logged, searchable, and exportable for audits.',
    },
  ];

  return (
    <section id="features">
      <div className="aurora">
        <span></span>
        <span></span>
      </div>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow">Capabilities</span>
          <h2 className="section-title">
            Everything a compliance<br />
            inspector needs, in one scan
          </h2>
          <p className="section-sub">
            A single platform for capturing, reading, and validating product labels against legal metrology requirements — no manual checklists required.
          </p>
        </div>
        <div className="feat-grid stagger" id="featGrid">
          {features.map((f, i) => (
            <div 
              className="feat-card reveal" 
              key={i} 
              style={{ '--i': i % 4 }}
            >
              <div className="feat-icon">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.8" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  dangerouslySetInnerHTML={{ __html: f.icon }}
                />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
