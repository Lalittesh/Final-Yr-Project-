import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import TrustedBy from '../components/TrustedBy/TrustedBy';
import Features from '../components/Features/Features';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import LivePreview from '../components/LivePreview/LivePreview';
import Stats from '../components/Stats/Stats';
import Comparison from '../components/Comparison/Comparison';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import CTA from '../components/CTA/CTA';
import Footer from '../components/Footer/Footer';

export default function LandingPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Observe elements with reveal classes inside the landing page
    const revealEls = container.querySelectorAll('.reveal, .reveal-scale, .t-step');
    
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => io.observe(el));

    return () => {
      revealEls.forEach((el) => io.unobserve(el));
      io.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef}>
      <Navbar />
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <LivePreview />
      <Stats />
      <Comparison />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
