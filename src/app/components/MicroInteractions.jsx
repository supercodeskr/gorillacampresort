'use client';

import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';

/* ============ TILT CARD ============ */
export function TiltCard({ children, className = '', intensity = 15 }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

/* ============ PULSE BUTTON ============ */
export function PulseButton({ children, className = '', onClick, href }) {
  const baseClass = `relative inline-flex items-center justify-center px-8 py-4 font-outfit font-bold text-lg rounded-full bg-gradient-to-r from-ember to-ember-light text-white cursor-pointer transition-all duration-300 hover:scale-105 ${className}`;

  const content = (
    <>
      <span className="absolute inset-0 rounded-full animate-pulse-ember" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return <a href={href} className={baseClass}>{content}</a>;
  }
  return <button onClick={onClick} className={baseClass}>{content}</button>;
}

/* ============ SCROLL REVEAL ============ */
export function ScrollReveal({ children, className = '', direction = 'up', delay = 0 }) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ============ HEAT WAVE TEXT ============ */
export function HeatWaveText({ children, className = '' }) {
  return (
    <span className={`inline-block heat-wave-text cursor-default ${className}`}>
      {children}
    </span>
  );
}
