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
  const audioRef = useRef(null);
  
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

    // Play Creaking wood sound effect safely
    if (audioRef.current) {
      audioRef.current.volume = 0.8;
      audioRef.current.play().catch(err => {
        console.warn("Audio play blocked by browser autoplay policy:", err);
      });
    }

    // GSAP 3D opening animation sequence
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });

    // 1. Fade out the enter prompt and handle overlay quickly
    tl.to(buttonRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      ease: 'power2.inOut'
    })
    // 2. Expand center light ray as the doors crack open
    .to([rayRef.current, flareRef.current], {
      width: '120px',
      opacity: 1,
      scale: 3,
      duration: 1.4,
      ease: 'power2.in'
    }, '-=0.3')
    // 3. Swing door panels open in 3D perspective and zoom in camera
    .to(leftGateRef.current, {
      rotateY: -100,
      x: '-105%',
      duration: 2.4,
      ease: 'power3.inOut'
    }, '-=0.8')
    .to(rightGateRef.current, {
      rotateY: 100,
      x: '105%',
      duration: 2.4,
      ease: 'power3.inOut'
    }, '-=2.4')
    // 4. Zoom camera forward through the open gates & fade out preloader screen
    .to(overlayRef.current, {
      opacity: 0,
      scale: 1.2,
      pointerEvents: 'none',
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.8');
  };

  return (
    <div ref={overlayRef} className="gate-preloader-overlay">
      {/* Background Audio */}
      <audio ref={audioRef} src="/sounds/door-creak.mp3" preload="auto" />

      {/* Jungle Ambiance background */}
      <div className="gate-forest-bg" />

      {/* Center glowing light ray and radial flares */}
      <div ref={rayRef} className="gate-light-ray" />
      <div ref={flareRef} className="gate-light-flare" />

      {/* Floating Jungle fireflies */}
      <div className="jungle-dust">
        {particles.map(p => (
          <div
            key={p.id}
            className="dust-particle"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

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
            <div className="medallion-split">
              <img src="/images/logo.png" className="medallion-logo" alt="GCR Logo" />
            </div>
            <div className="ring-split" />
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
            <div className="medallion-split">
              <img src="/images/logo.png" className="medallion-logo" alt="GCR Logo" />
            </div>
            <div className="ring-split" />
          </div>
        </div>

      </div>

      {/* Interactive ancient click handler overlay & label */}
      <div ref={buttonRef} className="gate-interactive-trigger" onClick={handleEnterClick}>
        <div className="interactive-ring-glow" />
        <div className="trigger-label">
          <span className="rune-text">TAP GORILLA TO ENTER</span>
          <span className="sub-text">Click the ancient lock to open the resort gates</span>
        </div>
      </div>
    </div>
  );
}

