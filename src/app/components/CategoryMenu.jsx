'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Flame,
  Coffee,
  PartyPopper,
  Users,
  Compass,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: 'menu',
    labelJP: 'お食事メニュー',
    labelEN: 'Food Menu',
    icon: Flame,
    color: '#b89047',
    bg: 'rgba(184, 144, 71, 0.08)',
    href: '#menu',
  },
  {
    id: 'booking',
    labelJP: 'オンライン予約',
    labelEN: 'Book Online',
    icon: Compass,
    color: '#1e3f20',
    bg: 'rgba(30, 63, 32, 0.08)',
    href: '#booking',
  },
  {
    id: 'events',
    labelJP: 'イベント貸切',
    labelEN: 'Events & Party',
    icon: PartyPopper,
    color: '#d35400',
    bg: 'rgba(211, 84, 0, 0.08)',
    href: '#booking',
  },
  {
    id: 'groups',
    labelJP: '団体プラン',
    labelEN: 'Group Plans',
    icon: Users,
    color: '#2980b9',
    bg: 'rgba(41, 128, 185, 0.08)',
    href: '#booking',
  },
];

export default function CategoryMenu() {
  const sectionRef = useRef(null);
  const pillsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance for pills
      gsap.fromTo(
        pillsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleClick = (href) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="categories"
      ref={sectionRef}
      className="py-16 md:py-20 bg-gray-50 border-t border-b border-gray-100"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="section-badge">
            <Compass size={14} />
            <span>Explore</span>
          </div>
          <h2 className="font-outfit font-black text-2xl md:text-3xl text-[#1b221c] mb-3">
            コンテンツを選ぶ
          </h2>
          <p className="font-inter text-gray-500 text-sm max-w-md mx-auto">
            ご希望のコンテンツを選択すると対象のセクションへ移動します。
          </p>
        </div>

        {/* Category pills grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                ref={(el) => (pillsRef.current[i] = el)}
                className="category-pill flex flex-col items-center justify-center p-6 text-center"
                onClick={() => handleClick(cat.href)}
              >
                <div
                  className="category-icon mb-4"
                  style={{ background: cat.bg }}
                >
                  <Icon size={20} style={{ color: cat.color }} />
                </div>
                <div>
                  <div className="category-label">{cat.labelJP}</div>
                  <div className="category-sub mt-1">{cat.labelEN}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
