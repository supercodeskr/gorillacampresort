'use client';

import { menuData } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AppMenu() {
  const { language, t } = useLanguage();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Custom high-quality images for each category to replace the generic ones
  const categoryImages = {
    'sets': 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800', // Grilling meat
    'nepali': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800', // Curry/Thali
    'sekuwa': '/images/sekuwa_choila.png', // Custom Generated Sekuwa/Choila
    'snacks': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&q=80&w=800', // Dumplings/Momo
    'drinks': '/images/beer_bamboo_mug.png', // Custom Generated Beer in Bamboo Mug
    'curry': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800' // Custom Indian Curry
  };

  return (
    <section id="menu" style={{ backgroundColor: '#f9fafb', padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Header Area */}
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 24px' }}>
        <p style={{ color: '#c8a55a', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '8px' }}>
          {t("Gorilla's Picks", 'ゴリラのイチオシ', 'गोरिल्लाको रोजाइ')}
        </p>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#111827', margin: 0, fontFamily: 'var(--font-outfit)' }}>
          {t("Gorilla's Wild Feast", 'ゴリラのワイルド・フェースト', 'गोरिल्लाको जङ्गली भोज')}
        </h2>
      </div>

      {/* Horizontal Scrolling App-Like Layout */}
      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Left Arrow */}
        <button 
          onClick={() => scroll('left')}
          style={{
            position: 'absolute',
            left: '10px',
            top: '45%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            color: '#111827'
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={scrollRef}
          className="category-scroll-container" 
          style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            padding: '10px 24px 40px', // Extra bottom padding for shadow clipping
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // IE/Edge
          }}
        >
          {/* Spacer for centering on large screens implicitly using padding in container above, but we can just let it scroll natively */}
          <div style={{ display: 'flex', gap: '16px', margin: '0 auto' }}>
            {menuData.map((category) => {
              const image = categoryImages[category.id] || category.items[0]?.image;

              return (
                <Link 
                  key={category.id} 
                  href={`/menu#${category.id}`}
                  style={{ textDecoration: 'none', scrollSnapAlign: 'center', flexShrink: 0 }}
                >
                  <div 
                    className="category-card"
                    style={{
                      width: '160px',
                      height: '220px',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                      cursor: 'pointer',
                      backgroundColor: '#111827'
                    }}
                  >
                    <img 
                      src={image} 
                      alt={category.title}
                      className="category-image"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.8,
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.2) 60%, transparent 100%)',
                      zIndex: 1
                    }}/>
                    
                    {/* Text Overlay */}
                    <div style={{
                      position: 'absolute',
                      bottom: '16px',
                      left: '16px',
                      right: '16px',
                      zIndex: 2,
                      textAlign: 'center'
                    }}>
                      <h3 style={{
                        color: '#ffffff',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        margin: '0 0 4px 0',
                        lineHeight: 1.2,
                        fontFamily: 'var(--font-outfit)',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                      }}>
                        {t(category.title, category.titleJp, category.titleNp)}
                      </h3>
                      <div style={{
                        width: '24px',
                        height: '3px',
                        backgroundColor: '#c8a55a',
                        margin: '0 auto',
                        borderRadius: '2px'
                      }}/>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={() => scroll('right')}
          style={{
            position: 'absolute',
            right: '10px',
            top: '45%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
            color: '#111827'
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Explore All Menu Button */}
      <div style={{ textAlign: 'center', marginTop: '-10px' }}>
        <Link href="/menu" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: 'transparent',
            color: '#111827',
            border: '2px solid #c8a55a',
            padding: '12px 32px',
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c8a55a';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#111827';
          }}
          >
            {t('View Full Menu', 'すべてのメニューを見る', 'सबै मेनु हेर्नुहोस्')}
          </button>
        </Link>
      </div>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .category-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .category-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease !important;
        }

        .category-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.12) !important;
        }

        .category-card:hover .category-image {
          transform: scale(1.1);
        }

        .category-image {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        @media (min-width: 768px) {
          .category-card {
            width: 180px !important;
            height: 240px !important;
          }
        }
      `}</style>
    </section>
  );
}
