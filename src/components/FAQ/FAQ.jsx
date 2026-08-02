import React, { useState, useRef } from 'react';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    {
      q: 'What compliance rules does MetroAI check against?',
      a: 'MetroAI validates labels against the Legal Metrology (Packaged Commodities) Rules, covering MRP declaration, net quantity, manufacturer/importer details, unit pricing, and date markings.',
    },
    {
      q: 'Can it scan products without a barcode?',
      a: "Yes. The scanner reads any printed label text via OCR — a barcode isn't required for a compliance check, though one can be used to pull prior scan history.",
    },
    {
      q: 'How accurate is the AI detection?',
      a: 'MetroAI maintains a 99.4% field-detection accuracy across tested product categories, with flagged low-confidence fields routed for manual review.',
    },
    {
      q: 'Is scan history stored for audits?',
      a: 'Every scan, report, and correction is logged with a timestamp and can be exported as a PDF for inspection records.',
    },
    {
      q: 'Does it work on mobile devices?',
      a: 'Yes — the scanner runs in-browser on any modern phone or tablet camera, as well as fixed inspection-line cameras.',
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="technology">
      <div className="aurora">
        <span></span>
      </div>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">Frequently asked questions</h2>
        </div>
        <div className="faq reveal" id="faqList">
          {faqs.map((f, i) => {
            const isOpen = activeIndex === i;
            return (
              <div className={`faq-item ${isOpen ? 'open' : ''}`} key={i}>
                <button className="faq-q" onClick={() => handleToggle(i)}>
                  {f.q}
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.4" 
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <div 
                  ref={(el) => (contentRefs.current[i] = el)}
                  className="faq-a"
                  style={{
                    maxHeight: isOpen ? `${contentRefs.current[i]?.scrollHeight}px` : '0px',
                  }}
                >
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
