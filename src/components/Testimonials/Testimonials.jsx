import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Ananya Rao',
      role: 'Metrology Inspector, State Dept.',
      text: 'What used to take a full checklist now takes one scan. The report format is exactly what our audits need.',
      color: '#C41E3A',
    },
    {
      name: 'Vikram Shah',
      role: 'Compliance Lead, Retail Chain',
      text: 'We run this across every warehouse intake. Catching mislabeled MRP before it hits shelves has saved us real money.',
      color: '#0F9D6E',
    },
    {
      name: 'Priya Menon',
      role: 'QA Manager, FMCG Manufacturer',
      text: 'The AI suggestions are the best part — it tells our packaging team exactly which clause failed and why.',
      color: '#D4AF37',
    },
  ];

  return (
    <section id="about">
      <div className="aurora">
        <span></span>
        <span></span>
      </div>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow">Testimonials</span>
          <h2 className="section-title">
            Trusted by inspection<br />
            teams and retailers
          </h2>
        </div>
        <div className="test-grid" id="testGrid">
          {testimonials.map((t, idx) => {
            const initials = t.name
              .split(' ')
              .map((w) => w[0])
              .join('');
            return (
              <div className="test-card reveal" key={idx}>
                <div className="stars">
                  {Array.from({ length: 5 }).map((_, sIdx) => (
                    <svg viewBox="0 0 24 24" fill="currentColor" key={sIdx}>
                      <path d="M12 2l2.9 6.6L22 9.3l-5 4.9L18.2 22 12 18.3 5.8 22 7 14.2l-5-4.9 7.1-.7L12 2z" />
                    </svg>
                  ))}
                </div>
                <p>"{t.text}"</p>
                <div className="test-person">
                  <div 
                    className="avatar" 
                    style={{ background: t.color }}
                  >
                    {initials}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
