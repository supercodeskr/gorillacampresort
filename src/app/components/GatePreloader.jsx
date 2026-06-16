'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './gate.css';

export default function GatePreloader({ onComplete }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const leftGateRef = useRef(null);
  const rightGateRef = useRef(null);
  const buttonRef = useRef(null);
  const rayRef = useRef(null);
  const flareRef = useRef(null);
  const doorAudioRef = useRef(null);
  const crackAudioRef = useRef(null);
  const crackLineRef = useRef(null);
  
  const [isOpened, setIsOpened] = useState(false);
  const [particles, setParticles] = useState([]);

  // Generate random floating fireflies
  useEffect(() => {
    const tempParticles = Array.from({ length: 20 }).map((_, idx) => ({
      id: idx,
      size: Math.random() * 3 + 2,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * -12}s`,
      duration: `${Math.random() * 8 + 6}s`,
      opacity: Math.random() * 0.5,
    }));
    setParticles(tempParticles);
  }, []);

  const handleEnterClick = () => {
    if (isOpened) return;
    setIsOpened(true);

    // Play sounds safely
    if (crackAudioRef.current) {
      crackAudioRef.current.volume = 1.0;
      crackAudioRef.current.play().catch(err => console.warn(err));
    }
    setTimeout(() => {
      if (doorAudioRef.current) {
        doorAudioRef.current.volume = 0.8;
        doorAudioRef.current.play().catch(err => console.warn(err));
      }
    }, 400);

    // GSAP 3D opening animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 0. Quick cracking visual flash
    tl.to(crackLineRef.current, {
      opacity: 1,
      height: '100%',
      duration: 0.1,
      ease: 'power4.in'
    })
    // 1. Fade out the enter prompt quickly
    .to(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.inOut'
    }, '+=0.2')
    // 2. Expand center light ray as the doors crack open
    .to([rayRef.current, flareRef.current], {
      width: '180px',
      opacity: 1,
      scale: 3,
      duration: 1.4,
      ease: 'power2.in'
    }, '-=0.3')
    // 3. Swing door panels INWARD and SLOWLY
    .to(leftGateRef.current, {
      rotateY: 95, // Swing INWARD (pushing left door away)
      x: '-5%',
      duration: 4.0,
      ease: 'power2.inOut'
    }, '-=0.8')
    .to(rightGateRef.current, {
      rotateY: -95, // Swing INWARD (pushing right door away)
      x: '5%',
      duration: 4.0,
      ease: 'power2.inOut'
    }, '-=4.0')
    // 4. Zoom camera forward through the open gates & fade out preloader screen
    .to(overlayRef.current, {
      opacity: 0,
      scale: 1.5,
      pointerEvents: 'none',
      duration: 1.5,
      ease: 'power2.in'
    }, '-=1.2');
  };

  return (
    <div ref={overlayRef} className="gate-preloader-overlay">
      {/* Background Audio */}
      <audio ref={doorAudioRef} src="/sounds/door-creak.mp3" preload="auto" />
      <audio ref={crackAudioRef} src="/sounds/wood-crack.mp3" preload="auto" />

      {/* Jungle Ambiance background */}
      <div className="gate-forest-bg" />

      {/* Center glowing light ray and radial flares */}
      <div ref={rayRef} className="gate-light-ray" />
      <div ref={flareRef} className="gate-light-flare" />
      
      {/* The cracking fracture line */}
      <div ref={crackLineRef} className="gate-cracking-line" />

      {/* Double-door Gate Panels */}
      <div ref={containerRef} className="gates-container">
        
        {/* Left Gate Panel */}
        <div ref={leftGateRef} className="gate-half left">
          {/* Iron Hinges */}
          <div className="gate-bracket top">
            <div className="gate-bolt" />
            <div className="gate-bolt" />
          </div>
          <div className="gate-bracket bottom">
            <div className="gate-bolt" />
            <div className="gate-bolt" />
          </div>

          {/* Left half of ancient gorilla knocker */}
          <div className="ancient-knocker-half left-knocker">
            <div className="ring-split">
              <svg viewBox="0 0 100 100" className="circular-text-svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text fill="#D4AF37" fontSize="10.5" fontWeight="bold" letterSpacing="1px" style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.9)' }}>
                  <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                    ゴリラBBQキャンプリゾート
                  </textPath>
                </text>
              </svg>
              <img src="/images/hero-gorilla.png" className="ring-logo" alt="Gorilla Silhouette" />
            </div>
          </div>
        </div>

        {/* Right Gate Panel */}
        <div ref={rightGateRef} className="gate-half right">
          {/* Iron Hinges */}
          <div className="gate-bracket top">
            <div className="gate-bolt" />
            <div className="gate-bolt" />
          </div>
          <div className="gate-bracket bottom">
            <div className="gate-bolt" />
            <div className="gate-bolt" />
          </div>

          {/* Right half of ancient gorilla knocker */}
          <div className="ancient-knocker-half right-knocker">
            <div className="ring-split">
              <svg viewBox="0 0 100 100" className="circular-text-svg" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <path id="circlePath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                <text fill="#D4AF37" fontSize="10.5" fontWeight="bold" letterSpacing="1px" style={{ textShadow: '0 0 8px rgba(212, 175, 55, 0.9)' }}>
                  <textPath href="#circlePath" startOffset="50%" textAnchor="middle">
                    ゴリラBBQキャンプリゾート
                  </textPath>
                </text>
              </svg>
              <img src="/images/hero-gorilla.png" className="ring-logo" alt="Gorilla Silhouette" />
            </div>
          </div>
        </div>

      </div>

      {/* Interactive ancient click handler overlay & label */}
      <div ref={buttonRef} className="gate-interactive-trigger" onClick={handleEnterClick}>
        <div className="interactive-ring-glow" />
      </div>
    </div>
  );
}

