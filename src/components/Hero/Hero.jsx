import React, { useEffect, useRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { productBase64 } from '../../assets/product-base64';

export default function Hero() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const panelRef = useRef(null);
  
  const getStartedBtn = useMagnetic();
  const watchDemoBtn = useMagnetic();

  // ---------- Particles Background ----------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    const initParticles = () => {
      const palette = ['196,30,58', '212,175,55', '110,20,35', '15,157,110'];
      particles = Array.from({ length: 52 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        c: palette[Math.floor(Math.random() * palette.length)]
      }));
    };

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c},.5)`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(loop);
    };

    resize();
    initParticles();
    loop();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // ---------- Mouse Parallax on Stage ----------
  useEffect(() => {
    const stage = stageRef.current;
    const panel = panelRef.current;
    if (!stage || !panel) return;

    const handleMouseMove = (e) => {
      if (!window.matchMedia('(min-width:981px)').matches) return;
      const r = stage.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -16;
      panel.style.transform = `perspective(1200px) rotateY(${-10 + x}deg) rotateX(${4 + y}deg)`;
    };

    const handleMouseLeave = () => {
      panel.style.transform = '';
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero" id="home">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
      <div className="blob blob4"></div>
      <canvas id="particles" ref={canvasRef}></canvas>
      <div className="wrap">
        <div className="hero-grid">
          <div className="reveal in" id="heroText">
            <span className="eyebrow">
              <span className="dot"></span>Legal Metrology, Automated
            </span>
            <h1>
              AI-Powered Legal Metrology<br />
              <span className="grad">Compliance Checker</span>
            </h1>
            <p>
              Scan any product label and get an instant legal metrology compliance verdict — MRP, net quantity, manufacturer details, and unit pricing, verified by AI in seconds.
            </p>
            <div className="hero-actions">
              <a 
                href="#contact" 
                className="btn btn-primary magnetic"
                {...getStartedBtn}
              >
                Get Started
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a 
                href="#preview" 
                className="btn btn-ghost magnetic"
                {...watchDemoBtn}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M10 8l6 4-6 4V8z" fill="currentColor" stroke="none" />
                </svg>
                Watch Demo
              </a>
            </div>
            <div className="hero-meta">
              <div><strong>99.4%</strong><span>Detection accuracy</span></div>
              <div><strong>2.1M+</strong><span>Products scanned</span></div>
              <div><strong>&lt;3s</strong><span>Avg. scan time</span></div>
            </div>
          </div>
          
          <div className="scan-stage reveal-scale in" ref={stageRef}>
            <div className="scan-ring"></div>
            <div className="scan-panel" ref={panelRef}>
              <div className="product-stage">
                <img 
                  className="product-img" 
                  src={productBase64}
                  alt="Product label checker demonstration"
                />
                <div className="scan-laser"></div>
              </div>
              <div className="scan-details">
                <div className="sd-row"><span className="sd-label">Declared MRP</span><span className="sd-value">₹150.00 (Incl. of all taxes)</span></div>
                <div className="sd-row"><span className="sd-label">Net Quantity</span><span className="sd-value">250g</span></div>
                <div className="sd-row"><span className="sd-label">Manufacturer</span><span className="sd-value">Parle Products Pvt. Ltd.</span></div>
                <div className="sd-row"><span className="sd-label">Batch Number</span><span className="sd-value">B240731</span></div>
                <div className="sd-row"><span className="sd-label">Barcode</span><span className="sd-value">8901719001234</span></div>
                <div className="sd-status">
                  <span className="sd-badge">
                    <span className="sd-dot"></span>LMPC COMPLIANT
                  </span>
                  <span className="sd-confidence">Confidence: 99.8%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
