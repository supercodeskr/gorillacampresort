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
      <div className="fixed bottom-0 md:bottom-6 left-0 md:left-1/2 md:-translate-x-1/2 w-full md:w-[90%] md:max-w-[600px] bg-white md:bg-white/90 backdrop-blur-md md:border-2 border-t md:border-t-2 border-gray-200 md:border-[#c8a55a] flex justify-around items-center px-4 md:px-6 py-3 md:py-3 rounded-none md:rounded-full z-[999] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] md:shadow-[0_10px_40px_rgba(200,165,90,0.3),0_4px_12px_rgba(0,0,0,0.1)]">
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
          <div className={`${animateCart ? 'animate-bounce' : (cartCount > 0 ? 'animate-pulse' : '')}`} style={{ 
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
    </>
  );
}
