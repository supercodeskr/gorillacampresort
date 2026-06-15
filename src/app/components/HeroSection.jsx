'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FireAndSmoke from './FireAndSmoke';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const headlineRefs = useRef([]);
  const scrollHintRef = useRef(null);
  const [headlineWords, setHeadlineWords] = useState(['GORILLA BBQ', 'CAMP RESORT']);
  const { language, t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline stagger reveal
      gsap.fromTo(
        headlineRefs.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: 'power4.out',
          delay: 0.3,
        }
      );

      // Scroll hint fade on scroll
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: scrollHintRef.current,
            start: 'top top',
            end: '+=100',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setHeadlineRef = (el, index) => {
    headlineRefs.current[index] = el;
  };

  useEffect(() => {
    setHeadlineWords([
      t('GORILLA BBQ', 'ゴリラBBQ', 'गोरिल्ला BBQ'),
      t('CAMP RESORT', 'キャンプリゾート', 'क्याम्प रिसोर्ट')
    ]);
  }, [language, t]);

  return (
    <section id="hero" className="hero-section" ref={sectionRef} style={{ backgroundColor: '#000000', overflow: 'hidden', position: 'relative' }}>
      
      {/* Pure black overlay for maximum contrast */}
      <div 
        className="hero-overlay" 
        style={{
          background: '#000000',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* Fire and Smoke Particles (Background) */}
      <FireAndSmoke />

      {/* Red Charcoal Glow behind the grill */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '60%', // Taller glow
          background: 'radial-gradient(ellipse at bottom, rgba(239, 68, 68, 0.6) 0%, rgba(245, 158, 11, 0.25) 50%, transparent 80%)',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      />

      {/* Transparent BBQ Grill (Foreground) */}
      <div style={{
          position: 'absolute',
          bottom: '-15%', // Negative value to hide the transparent padding of the PNG
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: '900px', // Smaller so it stays at the bottom and doesn't cover the whole screen
          height: '115%', // Adjust height to let Next.js image fill it appropriately
          zIndex: 20, 
      }}>
        <Image
          ref={bgImageRef}
          src="/images/hero-bbq-grill.png"
          alt="Sizzling BBQ Grill"
          fill
          style={{ objectFit: 'contain', objectPosition: 'bottom' }}
          priority // Guarantees this image is preloaded instantly with no lag
          sizes="(max-width: 768px) 100vw, 900px"
        />
      </div>



      {/* Content - Moved UP */}
      <div className="hero-content" style={{ zIndex: 30, transform: 'translateY(-20vh)', alignItems: 'center', textAlign: 'center' }}>
        {/* Tagline */}
        <p
          style={{
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#d1d5db',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontVariantCaps: 'small-caps',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {t("Saitama's Premium BBQ Resort", '埼玉のプレミアムBBQリゾート', 'साइतामाको प्रिमियम BBQ रिसोर्ट')}
        </p>

        {/* Headline */}
        <h1 style={{ zIndex: 30, position: 'relative' }}>
          {headlineWords.map((word, i) => (
            <span
              key={i}
              ref={(el) => setHeadlineRef(el, i)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 6vw, 5rem)', // Slightly smaller so two words fit comfortably on one line
                lineHeight: 0.95,
                color: '#ffffff',
                textShadow: '0 4px 12px rgba(0,0,0,0.8), 0 0 30px rgba(200, 165, 90, 0.4)', // Amber/Gold glow using logo color
                opacity: 0,
              }}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" ref={scrollHintRef}>
        <span
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            color: '#e5e7eb',
          }}
        >
          SCROLL
        </span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
