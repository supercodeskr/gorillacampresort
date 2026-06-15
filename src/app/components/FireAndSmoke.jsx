'use client';

import { useEffect, useState } from 'react';

export default function FireAndSmoke() {
  const [sparks, setSparks] = useState([]);
  const [smokes, setSmokes] = useState([]);

  useEffect(() => {
    // Generate sparks (Reduced count for performance)
    const newSparks = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: Math.random() * 60 + 20, // 20% to 80% (center of grill)
      size: Math.random() * 4 + 2, // 2px to 6px
      duration: Math.random() * 2 + 1.5, // 1.5s to 3.5s
      delay: Math.random() * 3, // 0s to 3s
    }));
    setSparks(newSparks);

    // Generate smoke wisps (Visible white smoke)
    const newSmokes = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      left: Math.random() * 50 + 25, // 25% to 75%
      size: Math.random() * 150 + 100, // 100px to 250px
      duration: Math.random() * 5 + 4, // 4s to 9s
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
          key={`smoke-${smoke.id}`}
          className="smoke-particle"
          style={{
            position: 'absolute',
            bottom: '10%', // Start above the bottom edge of the image (on the meat)
            left: `${smoke.left}%`,
            width: `${smoke.size}px`,
            height: `${smoke.size}px`,
            backgroundColor: 'transparent',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 60%)', // More visible white smoke
            borderRadius: '50%',
            animation: `floatUp ${smoke.duration}s ease-in-out infinite`,
            animationDelay: `${smoke.delay}s`,
            opacity: 0,
          }}
        />
      ))}

      {/* Fire Sparks */}
      {sparks.map((spark) => (
        <div
          key={`spark-${spark.id}`}
          className="spark-particle"
          style={{
            position: 'absolute',
            bottom: '5%', // Start from the glowing charcoal area
            left: `${spark.left}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: '#ff2a00', // Intense red/orange
            boxShadow: '0 0 10px rgba(255, 50, 0, 0.8)', // Simplified shadow for performance
            borderRadius: '50%',
            animation: `sparkUp ${spark.duration}s ease-out infinite`,
            animationDelay: `${spark.delay}s`,
            opacity: 0,
          }}
        />
      ))}

      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) translateX(0);
            opacity: 0;
          }
          15% {
            opacity: 0.9; // Highly visible
            transform: translateY(-10vh) scale(1.2) translateX(10px);
          }
          100% {
            transform: translateY(-80vh) scale(4) translateX(-40px);
            opacity: 0;
          }
        }

        @keyframes sparkUp {
          0% {
            transform: translateY(0) translateX(0) scale(1);
            opacity: 0;
          }
          20% {
            opacity: 1;
            backgroundColor: '#fbbf24'; // Shifts to yellow/orange as it flies up
            boxShadow: '0 0 8px 2px rgba(245, 158, 11, 0.8)';
          }
          100% {
            transform: translateY(-15vh) translateX(${Math.random() * 30 - 15}px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
