import React from 'react';

export default function TrustedBy() {
  const marqueeItems = [
    'Government Bureaus',
    'Retail Chains',
    'Manufacturers',
    'E-Commerce Platforms',
    'Inspection Teams',
    'FMCG Brands',
  ];

  // Duplicate items to ensure smooth infinite marquee scroll
  const itemsToRender = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="trusted">
      <div className="wrap">
        <p>Built for teams across the compliance chain</p>
      </div>
      <div className="marquee">
        <div className="marquee-track" id="marqueeTrack">
          {itemsToRender.map((item, idx) => (
            <div className="m-item" key={idx}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 12l2 2 4-4M12 3l8 4v5c0 5-3.4 8.4-8 9-4.6-.6-8-4-8-9V7l8-4z" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
