import React, { useEffect, useState, useRef } from 'react';

function AnimatedCounter({ target, suffix = '', decimal = 0 }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const start = performance.now();
          const duration = 1800;

          const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * eased;
            setValue(currentVal);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          };

          animationFrameId = requestAnimationFrame(tick);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target]);

  const formattedValue = decimal
    ? value.toFixed(decimal)
    : Math.floor(value).toLocaleString('en-IN');

  return (
    <strong ref={elementRef}>
      {formattedValue}{suffix}
    </strong>
  );
}

export default function Stats() {
  const statsData = [
    { target: 2100000, suffix: '+', decimal: 0, label: 'Products scanned' },
    { target: 99.4, suffix: '%', decimal: 1, label: 'Detection accuracy' },
    { target: 480000, suffix: '+', decimal: 0, label: 'Reports generated' },
    { target: 12500, suffix: '+', decimal: 0, label: 'Active users' },
  ];

  return (
    <section className="stats-section">
      <div className="aurora">
        <span></span>
      </div>
      <div className="wrap">
        <div className="stats-grid reveal">
          {statsData.map((stat, i) => (
            <div className="stat" key={i}>
              <AnimatedCounter 
                target={stat.target} 
                suffix={stat.suffix} 
                decimal={stat.decimal} 
              />
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
