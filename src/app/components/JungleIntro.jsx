'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

export default function JungleIntro() {
  const containerRef = useRef(null);
  const leftPlantRef = useRef(null);
  const rightPlantRef = useRef(null);
  const birdGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Plant grow animation (scale up from corners)
      gsap.fromTo(
        [leftPlantRef.current, rightPlantRef.current],
        { scale: 0.5, opacity: 0, y: 100 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.2,
        }
      );

      // Add a subtle continuous sway to the plants
      gsap.to(leftPlantRef.current, {
        rotation: 3,
        transformOrigin: 'bottom left',
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });

      gsap.to(rightPlantRef.current, {
        rotation: -3,
        transformOrigin: 'bottom right',
        duration: 4.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      // 2. Flying Birds Animation
      // Start off-screen right, fly to off-screen left
      gsap.fromTo(
        birdGroupRef.current,
        { x: '120vw', y: '-10vh', scale: 0.8 },
        {
          x: '-20vw',
          y: '30vh',
          duration: 12,
          ease: 'power1.inOut',
          delay: 0.5,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50, // Above bg, below navbar
        overflow: 'hidden',
      }}
    >
      {/* --- Shadow Birds --- */}
      <div
        ref={birdGroupRef}
        style={{
          position: 'absolute',
          top: '10%',
          right: 0,
          width: 200,
          height: 100,
          opacity: 0.4, // Shadow effect
        }}
      >
        {/* Bird 1 */}
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ position: 'absolute', top: 0, left: 0, color: '#111827' }}
        >
          <path d="M22 3.5c-2.5 2-5.5 3.5-9 4.5-1 0-2-.5-2.5-1.5C9 7 6 5.5 3.5 5 5 7.5 7.5 9 10.5 9.5c.5.5 1 1 2 1 3-.5 6-2 9.5-7z" />
        </svg>
        {/* Bird 2 */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ position: 'absolute', top: 30, left: 60, color: '#111827' }}
        >
          <path d="M22 3.5c-2.5 2-5.5 3.5-9 4.5-1 0-2-.5-2.5-1.5C9 7 6 5.5 3.5 5 5 7.5 7.5 9 10.5 9.5c.5.5 1 1 2 1 3-.5 6-2 9.5-7z" />
        </svg>
        {/* Bird 3 */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          style={{ position: 'absolute', top: 10, left: 120, color: '#111827' }}
        >
          <path d="M22 3.5c-2.5 2-5.5 3.5-9 4.5-1 0-2-.5-2.5-1.5C9 7 6 5.5 3.5 5 5 7.5 7.5 9 10.5 9.5c.5.5 1 1 2 1 3-.5 6-2 9.5-7z" />
        </svg>
      </div>

      {/* --- Corner Plants --- */}
      {/* Left Plant */}
      <div
        ref={leftPlantRef}
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '300px',
          height: '300px',
          transformOrigin: 'bottom left',
          color: '#10b981', // Emerald green
          opacity: 0.15, // Subtle overlay
        }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor" style={{ width: '100%', height: '100%' }}>
          <path d="M10,100 Q10,50 50,10 Q60,30 40,50 Q70,40 80,70 Q50,80 10,100 Z" />
          <path d="M10,100 Q30,60 70,30 Q80,50 60,70 Q90,60 95,90 Q60,95 10,100 Z" />
        </svg>
      </div>

      {/* Right Plant */}
      <div
        ref={rightPlantRef}
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-5%',
          width: '300px',
          height: '300px',
          transformOrigin: 'bottom right',
          transform: 'scaleX(-1)', // Flip horizontally
          color: '#059669', // Darker emerald
          opacity: 0.15,
        }}
      >
        <svg viewBox="0 0 100 100" fill="currentColor" style={{ width: '100%', height: '100%' }}>
          <path d="M10,100 Q10,50 50,10 Q60,30 40,50 Q70,40 80,70 Q50,80 10,100 Z" />
          <path d="M10,100 Q30,60 70,30 Q80,50 60,70 Q90,60 95,90 Q60,95 10,100 Z" />
        </svg>
      </div>
    </div>
  );
}
