'use client';

import { useState, useEffect, useRef } from 'react';
import { menuData } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileBottomNav from '@/app/components/MobileBottomNav';

export default function MenuPage() {
  const { language, t } = useLanguage();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(menuData[0]?.id);
  const [isClient, setIsClient] = useState(false);
  const categoryRefs = useRef({});
  const tabsContainerRef = useRef(null);
  const isManualScrolling = useRef(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check hash for initial category selection
    const hash = window.location.hash.replace('#', '');
    if (hash && menuData.some(c => c.id === hash)) {
      setActiveCategory(hash);
      setTimeout(() => scrollToCategory(hash), 100);
    }
  }, []);

  // IntersectionObserver for spying scroll and syncing active tab
  useEffect(() => {
    if (!isClient || searchQuery) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return; // Don't override while user clicked a tab

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setActiveCategory(id);
              
              // Scroll the tab container so the active tab stays visible
              const activeTab = document.getElementById(`tab-${id}`);
              if (activeTab && tabsContainerRef.current) {
                const container = tabsContainerRef.current;
                const tabRect = activeTab.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                
                // If tab is partially or fully out of view, scroll it into center
                if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
                   activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
              }
            }
          }
        });
      },
      {
        rootMargin: '-160px 0px -70% 0px', // Trigger when category hits top offset
        threshold: 0
      }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isClient, searchQuery]);

  const scrollToCategory = (id) => {
    isManualScrolling.current = true;
    setActiveCategory(id);
    const element = categoryRefs.current[id];
    if (element) {
      const yOffset = -140; // Offset for sticky headers
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    
    // Scroll tab to center
    const activeTab = document.getElementById(`tab-${id}`);
    if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

    // Release lock after scroll completes
    setTimeout(() => { isManualScrolling.current = false; }, 800);
  };

  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const scrollAmount = 250;
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Helper to get cart quantity for an item
  const getCartQty = (itemId) => {
    const itemInCart = cartItems.find(i => i.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const handleQtyChange = (e, item, delta) => {
    e.stopPropagation(); // Prevent navigating to product page
    
    const currentQty = getCartQty(item.id);
    if (currentQty === 0 && delta > 0) {
      addToCart({ ...item, quantity: 1, imgColor: item.imgColor || '#111827' });
    } else if (currentQty + delta === 0) {
      // Find index in cart to remove
      const index = cartItems.findIndex(i => i.id === item.id);
      if (index !== -1) removeFromCart(index);
    } else {
      const index = cartItems.findIndex(i => i.id === item.id);
      if (index !== -1) updateQuantity(index, delta);
    }
  };

  if (!isClient) return null;

  return (
    <main style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* Top Header & Search Bar (Sticky) */}
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 50, 
        backgroundColor: '#ffffff', 
        padding: '16px 20px',
        borderBottom: '1px solid #f3f4f6'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <Link href="/" style={{ color: '#111827' }}>
            <ChevronLeft size={28} />
          </Link>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#111827' }}>
            {t('Gorilla Menu', 'ゴリラメニュー', 'गोरिल्ला मेनु')}
          </h1>
        </div>

        {/* Search Input */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#f3f4f6', 
          borderRadius: '12px', 
          padding: '10px 16px',
          gap: '10px',
          border: '1px solid #c8a55a', // Brand Gold border for search bar
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
        }}>
          <Search size={20} color="#9ca3af" />
          <input 
            type="text" 
            placeholder={t('Search in menu...', 'メニューを検索...', 'मेनुमा खोज्नुहोस्...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ 
              border: 'none', 
              background: 'transparent', 
              width: '100%', 
              fontSize: '1rem', 
              outline: 'none',
              color: '#111827'
            }}
          />
        </div>
      </div>

      {/* Slideable Category Tabs (Sticky under search) */}
      {!searchQuery && (
        <div style={{ 
          position: 'sticky', 
          top: 110, 
          zIndex: 40, 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #f3f4f6',
          padding: '12px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
        }}>
          <button 
            onClick={() => scrollTabs('left')}
            style={{ 
              border: '1px solid #e5e7eb', 
              background: '#ffffff', 
              cursor: 'pointer', 
              color: '#111827', 
              padding: '6px',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div 
            ref={tabsContainerRef}
            className="hide-scrollbar" 
            style={{ 
              display: 'flex',
              overflowX: 'auto',
              gap: '8px',
              flex: 1,
              scrollBehavior: 'smooth'
            }}
          >
            {menuData.map(category => (
              <button
                key={category.id}
                id={`tab-${category.id}`}
                onClick={() => scrollToCategory(category.id)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1.2',
                  borderRadius: '100px',
                  border: activeCategory === category.id ? '1.5px solid #111827' : '1.5px solid transparent',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: activeCategory === category.id ? '#111827' : '#f3f4f6',
                  color: activeCategory === category.id ? '#ffffff' : '#4b5563',
                  boxShadow: activeCategory === category.id ? '0 4px 10px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                {t(category.title, category.titleJp, category.titleNp)}
              </button>
            ))}
          </div>

          <button 
            onClick={() => scrollTabs('right')}
            style={{ 
              border: '1px solid #e5e7eb', 
              background: '#ffffff', 
              cursor: 'pointer', 
              color: '#111827', 
              padding: '6px',
              borderRadius: '50%',
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Menu List */}
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        {menuData.map(category => {
          
          // If searching, filter items in this category
          const filteredItems = category.items.filter(item => {
            if (!searchQuery) return true;
            const q = searchQuery.toLowerCase();
            return item.name.toLowerCase().includes(q) || 
                   item.nameJp.toLowerCase().includes(q) || 
                   (item.nameNp && item.nameNp.toLowerCase().includes(q)) ||
                   item.desc.toLowerCase().includes(q) || 
                   item.descJp.toLowerCase().includes(q) ||
                   (item.descNp && item.descNp.toLowerCase().includes(q));
          });

          if (filteredItems.length === 0) return null;

          return (
            <div 
              key={category.id} 
              data-id={category.id}
              ref={el => categoryRefs.current[category.id] = el} 
              style={{ marginBottom: '50px' }}
            >
              {!searchQuery && (
                <h2 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: 900, 
                  color: '#111827', 
                  marginBottom: '20px',
                  padding: '8px 16px',
                  backgroundColor: '#fefcf8', // Very light gold
                  borderLeft: '4px solid #c8a55a', // Brand Gold accent
                  borderRadius: '0 8px 8px 0',
                  display: 'inline-block'
                }}>
                  {t(category.title, category.titleJp, category.titleNp)}
                </h2>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {filteredItems.map(item => {
                  const qty = getCartQty(item.id);
                  
                  return (
                    <div 
                      key={item.id} 
                      onClick={() => router.push(`/${category.id}/${item.id}`)}
                      style={{ 
                        display: 'flex', 
                        gap: '16px', 
                        alignItems: 'center',
                        cursor: 'pointer',
                        padding: '12px',
                        borderRadius: '16px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      }}
                    >
                      {/* Left: Circular Image */}
                      <div style={{ 
                        width: '100px', 
                        height: '100px', 
                        borderRadius: '50%', 
                        overflow: 'hidden', 
                        flexShrink: 0,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
                      }}>
                        <img 
                          src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'} 
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Right: Details & Controls */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: '0 0 4px 0', lineHeight: 1.2 }}>
                          {t(item.name, item.nameJp, item.nameNp)}
                        </h3>
                        {/* Short description for compact Zomato style */}
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 12px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {t(item.desc, item.descJp, item.descNp)}
                        </p>
                        
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                            ¥{item.price.toLocaleString()}
                          </span>

                          {/* Quick Add/Remove Controls */}
                          {qty === 0 ? (
                            <button 
                              onClick={(e) => handleQtyChange(e, item, 1)}
                              style={{
                                backgroundColor: '#fef2f2',
                                color: '#ef4444',
                                border: '1px solid #fecaca',
                                padding: '6px 20px',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                              }}
                            >
                              {t('ADD', '追加', 'थप्नुहोस्')}
                            </button>
                          ) : (
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#ef4444',
                              color: '#ffffff',
                              borderRadius: '8px',
                              padding: '4px 8px',
                              gap: '12px',
                              boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                            }}>
                              <button 
                                onClick={(e) => handleQtyChange(e, item, -1)}
                                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 4px' }}
                              >
                                &minus;
                              </button>
                              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{qty}</span>
                              <button 
                                onClick={(e) => handleQtyChange(e, item, 1)}
                                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', padding: '0 4px' }}
                              >
                                +
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Global hide scrollbar utility */}
        <style jsx global>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          @keyframes slideUpCart {
            from { transform: translate(-50%, 100%); opacity: 0; }
            to { transform: translate(-50%, 0); opacity: 1; }
          }
        `}</style>
      </div>
      
      {/* Mobile Navigation */}
      <MobileBottomNav />
    </main>
  );
}
