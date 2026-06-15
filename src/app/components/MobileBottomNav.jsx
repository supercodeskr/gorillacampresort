'use client';

import { Home, Utensils, Compass, Search as SearchIcon, ShoppingBag, Globe } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';

const navItems = [
  { href: '#hero', label: 'Home', labelJp: 'ホーム', icon: Home },
  { href: '#menu', label: 'Menu', labelJp: 'メニュー', icon: Utensils },
  { href: '#story', label: 'Experience', labelJp: '体験', icon: Compass },
  // 4th item is now a button, not a link. We will handle it separately below.
];

import SearchModal from './SearchModal';

export default function MobileBottomNav() {
  const [activeHash, setActiveHash] = useState('#hero');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { language, changeLanguage, t } = useLanguage();
  const [animateCart, setAnimateCart] = useState(false);
  const prevCount = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCount.current) {
      setAnimateCart(true);
      setTimeout(() => setAnimateCart(false), 600);
    }
    prevCount.current = cartCount;
  }, [cartCount]);

  useEffect(() => {
    // Update active hash based on scroll
    const handleScroll = () => {
      const sections = navItems.map((item) => document.querySelector(item.href));
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveHash(navItems[i].href);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="universal-bottom-nav">
        {/* 1-4: Standard Links */}
        {navItems.map(({ href, label, labelJp, icon: Icon }) => {
          const isActive = activeHash === href;
          return (
            <a
              key={href}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                setActiveHash(href);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                transition: 'color 0.2s ease',
                width: '16%', // Distribute evenly
              }}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} style={{ marginBottom: '4px' }} />
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: isActive ? 600 : 500,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {label === 'Home' ? t('Home', 'ホーム', 'गृह') :
                 label === 'Menu' ? t('Menu', 'メニュー', 'मेनु') :
                 t('Experience', '体験', 'अनुभव')}
              </span>
            </a>
          );
        })}
        
        {/* 4: Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            width: '16%',
            cursor: 'pointer',
          }}
        >
          <SearchIcon size={22} strokeWidth={2} style={{ marginBottom: '4px' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: 500, fontFamily: 'var(--font-inter)' }}>
            {t('Search', '検索', 'खोज')}
          </span>
        </button>

        {/* 5: Language Flag Selector */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '16%' }}>
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <span style={{ fontSize: '20px', lineHeight: '22px', marginBottom: '4px' }}>
              {t('🇺🇸', '🇯🇵', '🇳🇵')}
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 500, fontFamily: 'var(--font-inter)' }}>
              {t('EN', 'JP', 'NP')}
            </span>
          </button>

          {/* Pop-up Language Menu */}
          {isLangMenuOpen && (
            <div style={{
              position: 'absolute',
              bottom: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              marginBottom: '12px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 1000,
              minWidth: '80px'
            }}>
              {[
                { code: 'en', flag: '🇺🇸', label: 'English' },
                { code: 'jp', flag: '🇯🇵', label: '日本語' },
                { code: 'np', flag: '🇳🇵', label: 'नेपाली' }
              ].map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsLangMenuOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: language === lang.code ? '#f3f4f6' : 'none',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: language === lang.code ? 700 : 500,
                    color: '#111827'
                  }}
                >
                  <span>{lang.flag}</span>
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 6: Mobile Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            width: '16%',
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div className="cart-icon-wrapper" style={{ 
            position: 'relative', 
            marginBottom: '4px',
          }}>
            <ShoppingBag size={22} strokeWidth={2} color={cartCount > 0 || animateCart ? '#c8a55a' : 'inherit'} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-8px',
                backgroundColor: '#ef4444',
                color: '#ffffff',
                fontSize: '0.65rem',
                fontWeight: 'bold',
                minWidth: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px'
              }}>
                {cartCount}
              </span>
            )}
          </div>
          <span style={{ fontSize: '0.65rem', fontWeight: 500, fontFamily: 'var(--font-inter)' }}>
            {t('Cart', 'カート', 'कार्ट')}
          </span>
        </button>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      <style dangerouslySetInnerHTML={{ __html: `
        .universal-bottom-nav {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 2px solid #c8a55a;
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding: 12px 24px;
          border-radius: 999px;
          z-index: 999;
          box-shadow: 0 10px 40px rgba(200, 165, 90, 0.3), 0 4px 12px rgba(0,0,0,0.1);
          width: 90%;
          max-width: 600px;
        }

        .cart-icon-wrapper.animate-bounce {
          animation: bounceCart 0.6s cubic-bezier(0.36, 0, 0.66, -0.56);
        }
        .cart-icon-wrapper.animate-pulse {
          animation: pulseCart 2s infinite;
        }

        @keyframes bounceCart {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.4) translateY(-4px); }
          50% { transform: scale(0.9) translateY(2px); }
          75% { transform: scale(1.15) translateY(-2px); }
        }

        @keyframes pulseCart {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .universal-bottom-nav {
            bottom: 0;
            left: 0;
            transform: none;
            width: 100%;
            max-width: 100%;
            border-radius: 0;
            padding: 12px 16px 24px;
            border-top: 1px solid rgba(0, 0, 0, 0.08);
            border-left: none;
            border-right: none;
            border-bottom: none;
            background-color: #ffffff;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
        }
      `}} />
    </>
  );
}
