import React, { useRef, useState, useEffect } from 'react';

/**
 * Responsive Bounding Box Overlay Component
 * Maps absolute detection coordinates to actual letterboxed viewport dimensions.
 */
export default function BoundingBoxOverlay({ imageSrc, boundingBoxes, isLoading }) {
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1, offsetX: 0, offsetY: 0 });

  const calculateScale = () => {
    const img = imgRef.current;
    if (img) {
      const { naturalWidth, naturalHeight, clientWidth, clientHeight } = img;
      if (naturalWidth && naturalHeight && clientWidth && clientHeight) {
        const imageRatio = naturalWidth / naturalHeight;
        const containerRatio = clientWidth / clientHeight;
        
        let renderedWidth = clientWidth;
        let renderedHeight = clientHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (containerRatio > imageRatio) {
          // Container is wider than image (letterbox left/right)
          renderedWidth = clientHeight * imageRatio;
          offsetX = (clientWidth - renderedWidth) / 2;
        } else {
          // Container is taller than image (letterbox top/bottom)
          renderedHeight = clientWidth / imageRatio;
          offsetY = (clientHeight - renderedHeight) / 2;
        }

        setScale({
          x: renderedWidth / naturalWidth,
          y: renderedHeight / naturalHeight,
          offsetX,
          offsetY
        });
      }
    }
  };

  useEffect(() => {
    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [imageSrc, boundingBoxes]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt="Analysis workspace"
        onLoad={calculateScale}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
      
      {/* Draw overlay boxes */}
      {!isLoading && boundingBoxes && boundingBoxes.map((item, idx) => {
        const { xmin, ymin, xmax, ymax } = item.box;
        
        // Scale and shift coordinates
        const left = xmin * scale.x + scale.offsetX;
        const top = ymin * scale.y + scale.offsetY;
        const width = (xmax - xmin) * scale.x;
        const height = (ymax - ymin) * scale.y;

        return (
          <div
            key={idx}
            className="bounding-box-rect"
            style={{
              position: 'absolute',
              left: `${left}px`,
              top: `${top}px`,
              width: `${width}px`,
              height: `${height}px`,
              border: '2px solid var(--primary)',
              boxShadow: '0 0 8px rgba(196, 30, 58, 0.5)',
              pointerEvents: 'none',
              transition: 'all 0.3s ease',
              borderRadius: '4px',
              zIndex: 3
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                left: '-2px',
                background: 'var(--primary)',
                color: '#fff',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                fontWeight: '700',
                padding: '2px 6px',
                borderRadius: '4px 4px 0 0',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {item.label} ({item.confidence}%)
            </div>
          </div>
        );
      })}
    </div>
  );
}
