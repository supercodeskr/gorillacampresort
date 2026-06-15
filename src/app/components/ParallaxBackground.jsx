'use client';

import { useEffect, useRef } from 'react';

export default function ParallaxBackground() {
  const bgRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (bgRef.current) {
            const scrollY = window.scrollY;
            const layers = bgRef.current.querySelectorAll('[data-parallax]');
            layers.forEach((layer) => {
              const speed = parseFloat(layer.dataset.parallax);
              layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Generate string light positions */
  const stringLights = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${5 + (i * 4.7)}%`,
    top: `${8 + Math.sin(i * 0.8) * 4}%`,
    delay: `${(i * 0.3) % 3}s`,
    size: 6 + (i % 4),
  }));

  return (
    <div ref={bgRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Layer 1: Deep misty jungle gradient */}
      <div
        data-parallax="0.05"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(26, 58, 31, 0.4) 0%, transparent 60%),
            radial-gradient(ellipse at 80% 30%, rgba(45, 90, 50, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(11, 26, 14, 0.8) 0%, transparent 70%),
            linear-gradient(180deg, #0B1A0E 0%, #0D200F 30%, #0B1A0E 70%, #080E06 100%)
          `,
        }}
      />

      {/* Layer 2: Bamboo silhouette pattern */}
      <div
        data-parallax="0.1"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(85deg, transparent, transparent 60px, rgba(45,90,50,0.5) 60px, rgba(45,90,50,0.5) 62px),
            repeating-linear-gradient(95deg, transparent, transparent 90px, rgba(45,90,50,0.3) 90px, rgba(45,90,50,0.3) 91px),
            repeating-linear-gradient(88deg, transparent, transparent 45px, rgba(45,90,50,0.4) 45px, rgba(45,90,50,0.4) 46px)
          `,
        }}
      />

      {/* Layer 3: Mist overlay */}
      <div
        data-parallax="0.15"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.02) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.015) 0%, transparent 40%)
          `,
        }}
      />

      {/* String Lights */}
      <div data-parallax="0.08" className="absolute inset-0">
        {/* Wire curve */}
        <svg className="absolute top-[6%] left-0 w-full h-[60px] opacity-20" preserveAspectRatio="none">
          <path
            d="M0,30 Q200,50 400,25 T800,35 T1200,28 T1600,40 T2000,30"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="1"
            fill="none"
          />
        </svg>
        {stringLights.map((light) => (
          <div
            key={light.id}
            className="string-light absolute"
            style={{
              left: light.left,
              top: light.top,
              width: `${light.size}px`,
              height: `${light.size}px`,
              animationDelay: light.delay,
            }}
          />
        ))}
      </div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-jungle-deep/50 via-transparent to-jungle-deep" />
    </div>
  );
}
