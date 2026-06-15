'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import HeroSection from './components/HeroSection';
import StorySection from './components/StorySection';
import ExperienceSection from './components/ExperienceSection';
import AppMenu from './components/AppMenu';
import JungleIntro from './components/JungleIntro';
import GorillaCompanion from './components/GorillaCompanion';

export default function Home() {
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
  }, []);

  return (
    <main style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh', }}>
      {/* TEMPORARILY DISABLED: Causes lag on user's laptop in dev mode */}
      {/* <HeroSection /> */}
      <AppMenu />
      <StorySection />
      <ExperienceSection />
    </main>
  );
}
