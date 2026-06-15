'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useLanguage } from '@/context/LanguageContext';
import { Search } from 'lucide-react';
import BookingModal from './BookingModal';
import SearchModal from './SearchModal';

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#menu', label: 'Menu' },
  { href: '#story', label: 'Experience' },
  { href: '#reserve', label: 'Reserve' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const overlayRef = useRef(null);
  const overlayLinksRef = useRef([]);
  const timelineRef = useRef(null);
  const { language, toggleLanguage, t } = useLanguage();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // --- Scroll listener ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Lock body scroll ---
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // --- GSAP stagger animation for mobile overlay ---
  useEffect(() => {
    if (mobileOpen && overlayRef.current) {
      const links = overlayLinksRef.current.filter(Boolean);
      const closeBtn = overlayRef.current.querySelector('[data-close-btn]');
      const targets = [...links, closeBtn].filter(Boolean);

      gsap.set(targets, { opacity: 0, y: 30 });

      timelineRef.current = gsap.timeline();
      timelineRef.current.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      });
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const openMobile = useCallback(() => {
    setMobileOpen(true);
  }, []);

  return (
    <>
      {/* ─── Floating Pill Navbar ─── */}
      <nav
        className="desktop-navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          padding: '12px 20px 0',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px',
            height: 56,
            borderRadius: 999,
            pointerEvents: 'auto',
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.15)',
            backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'blur(8px)',
            WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'blur(8px)',
            border: scrolled
              ? '2px solid rgba(200, 165, 90, 0.5)' // Golden amber highlight
              : '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: scrolled
              ? '0 10px 30px rgba(0, 0, 0, 0.08)'
              : 'none',
          }}
        >
          {/* ─── Logo ─── */}
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Gorilla Camp Resort"
              width={112}
              height={28}
              style={{
                height: 28,
                width: 'auto',
                objectFit: 'contain',
              }}
              priority
            />
          </a>

          {/* ─── Center Links (Desktop) ─── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 32,
            }}
            className={scrolled ? 'navbar-center-links scrolled' : 'navbar-center-links'}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link"
                style={{ color: scrolled ? '#111827' : '#ffffff' }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* ─── Search Icon (Desktop) ─── */}
            <button
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: 'none',
                border: 'none',
                color: scrolled ? '#111827' : '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px',
                transition: 'color 0.3s ease',
              }}
            >
              <Search size={20} />
            </button>
            {/* ─── Language Toggle (Desktop) ─── */}
            <button
              onClick={toggleLanguage}
              style={{
                background: 'none',
                border: 'none',
                color: scrolled ? '#111827' : '#ffffff',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                padding: '4px 8px',
                transition: 'color 0.3s ease',
              }}
            >
              {t('JP', 'NP', 'EN')}
            </button>

            {/* ─── CTA Button (Desktop) - Now opens Modal ─── */}
            <button
            onClick={() => setIsBookingOpen(true)}
            className="navbar-cta-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 22px',
              backgroundColor: '#c8a55a',
              color: '#ffffff',
              borderRadius: 999,
              fontFamily: 'var(--font-inter)',
              fontSize: '0.78rem',
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'transform 0.2s ease',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            {t('Book Table', '予約', 'टेबल बुक गर्नुहोस्')}
          </button>

          {/* ─── Hamburger (Mobile) ─── */}
          <button
            onClick={openMobile}
            aria-label="Open menu"
            className="navbar-hamburger"
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              width: 36,
              height: 36,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 20,
                height: 1.5,
                backgroundColor: '#e8e4de',
                borderRadius: 1,
                transition: 'all 0.3s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 14,
                height: 1.5,
                backgroundColor: 'rgba(232, 228, 222, 0.5)',
                borderRadius: 1,
                transition: 'all 0.3s ease',
                alignSelf: 'flex-end',
              }}
            />
            <span
              style={{
                display: 'block',
                width: 20,
                height: 1.5,
                backgroundColor: '#e8e4de',
                borderRadius: 1,
                transition: 'all 0.3s ease',
              }}
            />
          </button>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Fullscreen Overlay ─── */}
      {mobileOpen && (
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(12, 12, 12, 0.97)',
            backdropFilter: 'blur(40px)',
            WebkitBackdropFilter: 'blur(40px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
          }}
        >
          {/* Close Button */}
          <button
            data-close-btn
            onClick={closeMobile}
            aria-label="Close menu"
            style={{
              position: 'absolute',
              top: 20,
              right: 24,
              width: 44,
              height: 44,
              background: 'none',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: 999,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
          >
            {/* Custom X */}
            <span
              style={{
                position: 'relative',
                width: 16,
                height: 16,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: 16,
                  height: 1.5,
                  backgroundColor: '#e8e4de',
                  borderRadius: 1,
                  transform: 'rotate(45deg)',
                  transformOrigin: 'center',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: 16,
                  height: 1.5,
                  backgroundColor: '#e8e4de',
                  borderRadius: 1,
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center',
                }}
              />
            </span>
          </button>

          {/* Overlay Links */}
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                ref={(el) => {
                  overlayLinksRef.current[i] = el;
                }}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#e8e4de',
                  textDecoration: 'none',
                  letterSpacing: '-0.02em',
                  padding: '12px 0',
                  transition: 'color 0.2s ease',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#c8a55a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#e8e4de';
                }}
              >
                {link.label}
              </a>
            ))}
            
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                closeMobile();
                setIsSearchOpen(true);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#c8a55a',
                fontFamily: 'var(--font-outfit)',
                fontSize: '1.5rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Search size={24} /> {t('Search Menu', 'メニュー検索', 'मेनु खोज्नुहोस्')}
            </button>

            {/* Mobile Booking Button */}
            <button
              onClick={() => {
                closeMobile();
                setIsBookingOpen(true);
              }}
              style={{
                marginTop: '12px',
                background: '#c8a55a',
                border: 'none',
                color: '#ffffff',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 600,
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '12px 32px',
                borderRadius: '100px',
              }}
            >
              {t('Book Table', 'テーブルを予約する', 'टेबल बुक गर्नुहोस्')}
            </button>
            
            {/* ─── Language Toggle (Mobile) ─── */}
            <button
              onClick={toggleLanguage}
              style={{
                marginTop: '24px',
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#ffffff',
                fontFamily: 'var(--font-outfit)',
                fontWeight: 600,
                fontSize: '1.2rem',
                cursor: 'pointer',
                padding: '8px 24px',
                borderRadius: '100px',
              }}
            >
              {t('Switch to 日本語', 'Switch to नेपाली', 'Switch to English')}
            </button>

          </nav>

          {/* Bottom subtle line */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 24,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(200, 165, 90, 0.3), transparent)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                color: '#4a4740',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              Gorilla Camp Resort
            </span>
          </div>
        </div>
      )}

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* ─── Responsive Styles ─── */}
      <style jsx>{`
        .desktop-navbar {
          display: flex !important;
        }

        @media (max-width: 768px) {
          .desktop-navbar {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
