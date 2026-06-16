'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ExperienceSection from './components/ExperienceSection';
import AppMenu from './components/AppMenu';
import JungleIntro from './components/JungleIntro';
import GorillaCompanion from './components/GorillaCompanion';
import GatePreloader from './components/GatePreloader';
import { useState } from 'react';

export default function Home() {
  const [showGate, setShowGate] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    // Dynamically import ScrollTrigger to avoid SSR issues
    const init = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Reveal-up elements
      const reveals = document.querySelectorAll('.reveal-up');
      reveals.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    };

    init();

    // Check if the user has seen the gate this session
    if (!sessionStorage.getItem('hasSeenGate')) {
      setShowGate(true);
    }
    setHasChecked(true);
  }, []);

  const handleGateComplete = () => {
    setShowGate(false);
    sessionStorage.setItem('hasSeenGate', 'true');
  };

  if (!hasChecked) {
    return <main style={{ backgroundColor: '#040805', minHeight: '100vh' }} />;
  }

  return (
    <>
      {showGate && <GatePreloader onComplete={handleGateComplete} />}
      <main style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', opacity: showGate ? 0 : 1, transition: 'opacity 1s ease' }}>
        <HeroSection />
        <AppMenu />
        <StorySection />
        <ExperienceSection />
      </main>
    </>
  );
}
