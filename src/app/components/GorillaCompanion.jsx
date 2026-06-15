'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

export default function GorillaCompanion() {
  const ropeRef = useRef(null);
  const gorillaRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Dynamically register plugin to avoid SSR issues
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Move gorilla up and down the rope based on scroll progress
      // We map the total scroll height of the page to the height of the screen
      gsap.to(gorillaRef.current, {
        y: () => window.innerHeight - 150, // 150 is approx gorilla height
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5, // Smooth scrubbing
        },
      });

      // 2. Add swinging physics based on scroll velocity
      let proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(gorillaRef.current, 'skewY', 'deg');
      const clamp = gsap.utils.clamp(-20, 20); // Limit swinging angle

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const velocity = self.getVelocity();
          const targetSkew = clamp(velocity / -150);
          
          // Only animate if the difference is significant
          if (Math.abs(targetSkew - proxy.skew) > 0.5) {
            gsap.to(proxy, {
              skew: targetSkew,
              duration: 0.8,
              ease: 'power3',
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      // Reset to 0 when scrolling stops
      ScrollTrigger.addEventListener('scrollEnd', () => {
        gsap.to(proxy, {
          skew: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        right: '4%', // Positioned slightly off the right edge
        height: '100vh',
        width: 100, // Container width for rope and gorilla
        pointerEvents: 'none',
        zIndex: 60, // Above intro, below navbar
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      className="hidden md:flex" // Hide on very small mobile screens if it clutters too much
    >
      {/* --- Jungle Rope --- */}
      <div
        ref={ropeRef}
        style={{
          position: 'absolute',
          top: -20, // Extend slightly above screen
          bottom: -20, // Extend slightly below screen
          width: 4,
          background: 'linear-gradient(to bottom, #8B5A2B 0%, #A0522D 50%, #8B5A2B 100%)', // Woody color
          boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.3)',
          borderRadius: 2,
        }}
      />
      {/* Optional: Add some "knots" or texture to the rope via pseudo-elements if using CSS, but solid gradient is fine for now */}

      {/* --- Scrolling Gorilla --- */}
      <div
        ref={gorillaRef}
        style={{
          position: 'absolute',
          top: 0,
          width: 80,
          height: 80,
          borderRadius: '50%', // Circle mask to hide the square background
          overflow: 'hidden',
          border: '3px solid #8B5A2B', // Woody border
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transformOrigin: 'top center',
          backgroundColor: '#0c0c0c', // Match the dark background of the image to blend edges
        }}
      >
        <Image
          src="/images/experience/gorilla-mascot.png"
          alt="Funny Gorilla"
          fill
          style={{ objectFit: 'cover', transform: 'scale(1.2)' }} // Scale up slightly to fill circle
          sizes="80px"
          priority
        />
      </div>
    </div>
  );
}
