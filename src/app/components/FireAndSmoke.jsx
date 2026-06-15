'use client';

import { useEffect, useState } from 'react';

export default function FireAndSmoke() {
  const [sparks, setSparks] = useState([]);
  const [smokes, setSmokes] = useState([]);

  useEffect(() => {
    // Glowing charcoal embers (stay mostly stationary)
    const newEmbers = Array.from({ length: 40 }).map((_, i) => ({
      id: `ember-${i}`,
      left: Math.random() * 80 + 10, // Spread across the grill bottom (10% to 90%)
      bottom: Math.random() * 15 + 2, // Stay low (2% to 17% height)
      size: Math.random() * 6 + 3, // 3px to 9px
      duration: Math.random() * 2 + 1, // Pulse duration
      delay: Math.random() * 2,
    }));
    setSparks(newEmbers); // Re-using sparks state for embers

    // Generate smoke wisps (Visible white smoke, strictly from middle, sharp and tall)
    const newSmokes = Array.from({ length: 12 }).map((_, i) => ({
      id: `smoke-${i}`,
      left: Math.random() * 20 + 40, // Tighter center: 40% to 60%
      width: Math.random() * 40 + 30, // Narrower width (30px to 70px)
      height: Math.random() * 150 + 100, // Taller height (100px to 250px)
      duration: Math.random() * 4 + 3.5, // 3.5s to 7.5s (slightly faster to reach the top)
      delay: Math.random() * 4,
    }));
    setSmokes(newSmokes);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10, // Above background, below text
      }}
    >
      {/* Smoke Wisps */}
      {smokes.map((smoke) => (
        <div
          key={smoke.id}
          className="smoke-particle"
          style={{
            position: 'absolute',
            bottom: '15%', // Start from the center meat
            left: `${smoke.left}%`,
            width: `${smoke.width}px`,
            height: `${smoke.height}px`,
            backgroundColor: 'transparent',
            background: 'radial-gradient(ellipse at center, rgba(200, 200, 200, 0.35) 0%, transparent 60%)', // Sharp ellipse shape
            borderRadius: '50%',
            animation: `floatSmoke ${smoke.duration}s ease-in infinite`,
            animationDelay: `${smoke.delay}s`,
            opacity: 0,
            filter: 'blur(4px)', // Slight blur but retains sharp vertical shape
          }}
        />
      ))}

      {/* Glowing Charcoal Embers */}
      {sparks.map((ember) => (
        <div
          key={ember.id}
          className="ember-particle"
          style={{
            position: 'absolute',
            bottom: `${ember.bottom}%`,
            left: `${ember.left}%`,
            width: `${ember.size}px`,
            height: `${ember.size}px`,
            backgroundColor: '#ff2a00',
            boxShadow: '0 0 12px 2px rgba(255, 50, 0, 0.9)',
            borderRadius: '50%',
            animation: `pulseEmber ${ember.duration}s alternate infinite`,
            animationDelay: `${ember.delay}s`,
            opacity: 0.8,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes floatSmoke {
          0% {
            transform: translateY(0) scaleX(1) scaleY(1) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
            transform: translateY(-10vh) scaleX(1.2) scaleY(1.5) translateX(3px);
          }
          100% {
            transform: translateY(-120vh) scaleX(2.5) scaleY(3) translateX(-10px); /* Goes way up off screen */
            opacity: 0;
          }
        }

        @keyframes pulseEmber {
          0% {
            opacity: 0.4;
            transform: scale(0.8) translateY(0);
            box-shadow: 0 0 8px 1px rgba(255, 40, 0, 0.6);
            background-color: #d11e00;
          }
          100% {
            opacity: 1;
            transform: scale(1.2) translateY(-2px); /* Very subtle float */
            box-shadow: 0 0 20px 4px rgba(255, 120, 0, 0.9);
            background-color: #ffaa00; /* Shift to bright orange/yellow when hot */
          }
        }
      `}</style>
    </div>
  );
}
