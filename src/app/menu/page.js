'use client';

import { useState, useEffect, useRef } from 'react';
import { menuData } from '@/data/menuData';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { Search, ChevronLeft, Bell, Plus, Minus, Flame, Soup, Coffee, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileBottomNav from '@/app/components/MobileBottomNav';

// Map categories to appropriate lucide icons
const categoryIcons = {
  'nepali-dhido-set': Soup,
  'nepali-thakali-set': UtensilsCrossed,
  'sekuwa-choila': Flame,
  'nepali-snacks': UtensilsCrossed,
  'beverages-alcohol': Coffee,
  'bbq-meat-items': Flame,
};

export default function MenuPage() {
  const { language, t } = useLanguage();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isClient, setIsClient] = useState(false);
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getCartQty = (itemId) => {
    const itemInCart = cartItems.find(i => i.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const handleQtyChange = (e, item, delta) => {
    e.stopPropagation();
    const currentQty = getCartQty(item.id);
    if (currentQty === 0 && delta > 0) {
      addToCart({ ...item, quantity: 1, imgColor: '#c8a55a' });
    } else if (currentQty + delta === 0) {
      const index = cartItems.findIndex(i => i.id === item.id);
      if (index !== -1) removeFromCart(index);
    } else {
      const index = cartItems.findIndex(i => i.id === item.id);
      if (index !== -1) updateQuantity(index, delta);
    }
  };

  if (!isClient) return null;

  // Flatten items for grid view if "all" is selected, else filter by category
  let displayedItems = [];
  if (activeCategory === 'all') {
    menuData.forEach(cat => displayedItems.push(...cat.items.map(item => ({...item, categoryId: cat.id}))));
  } else {
    const cat = menuData.find(c => c.id === activeCategory);
    if (cat) displayedItems = cat.items.map(item => ({...item, categoryId: cat.id}));
  }

  // Filter by search query
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    displayedItems = displayedItems.filter(item => 
      item.name.toLowerCase().includes(q) || 
      item.nameJp.toLowerCase().includes(q) || 
      (item.nameNp && item.nameNp.toLowerCase().includes(q))
    );
  }

  return (
    <main style={{ backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '120px' }}>
      
      {/* App Top Bar */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '24px 24px 16px',
        position: 'sticky',
        top: 0,
        backgroundColor: '#f9fafb',
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ color: '#111827', display: 'flex', alignItems: 'center' }}>
            <ChevronLeft size={24} />
          </Link>
          <div>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#111827', fontFamily: 'var(--font-outfit)' }}>
              Gorilla BBQ
            </h1>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: 0 }}>
              {t('Camp Resort Menu', 'キャンプリゾートメニュー', 'क्याम्प रिसोर्ट मेनु')}
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827' }}>
            <Search size={22} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827' }}>
            <Bell size={22} />
          </button>
        </div>
      </div>

      <div style={{ padding: '0 24px' }}>
        
        {/* Categories Horizontal Scroll */}
        <div 
          ref={tabsContainerRef}
          className="hide-scrollbar" 
          style={{ 
            display: 'flex',
            overflowX: 'auto',
            gap: '24px',
            paddingBottom: '24px',
            paddingTop: '8px'
          }}
        >
          {/* All Category */}
          <div 
            onClick={() => setActiveCategory('all')}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
          >
            <div style={{
              width: '64px', height: '64px', borderRadius: '16px', 
              backgroundColor: activeCategory === 'all' ? '#c8a55a' : '#ffffff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: activeCategory === 'all' ? '0 8px 16px rgba(200, 165, 90, 0.25)' : '0 4px 12px rgba(0,0,0,0.04)',
              transition: 'all 0.2s'
            }}>
              <UtensilsCrossed size={28} color={activeCategory === 'all' ? '#ffffff' : '#c8a55a'} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: activeCategory === 'all' ? '#111827' : '#6b7280' }}>
              {t('All', 'すべて', 'सबै')}
            </span>
          </div>

          {/* Dynamic Categories */}
          {menuData.map(category => {
            const Icon = categoryIcons[category.id] || Flame;
            const isActive = activeCategory === category.id;
            
            return (
              <div 
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
              >
                <div style={{
                  width: '64px', height: '64px', borderRadius: '16px', 
                  backgroundColor: isActive ? '#c8a55a' : '#ffffff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: isActive ? '0 8px 16px rgba(200, 165, 90, 0.25)' : '0 4px 12px rgba(0,0,0,0.04)',
                  transition: 'all 0.2s'
                }}>
                  <Icon size={28} color={isActive ? '#ffffff' : '#c8a55a'} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: isActive ? '#111827' : '#6b7280' }}>
                   {/* Shorten title for icon label */}
                  {t(category.title.split(' ')[0], category.titleJp.split('・')[0], category.titleNp.split(' ')[0])}
                </span>
              </div>
            );
          })}
        </div>

        {/* Promo Banner */}
        <div style={{
          backgroundColor: '#111827',
          borderRadius: '24px',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '32px',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase' }}>
              Gorilla Special
            </p>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: 900, fontFamily: 'var(--font-outfit)', lineHeight: 1.1 }}>
              30% OFF<br/>
              <span style={{ fontSize: '1.1rem', fontWeight: 600, color: '#c8a55a' }}>Selected Sets</span>
            </h3>
            <button style={{
              backgroundColor: '#c8a55a',
              color: '#ffffff',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '100px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}>
              Order Now
            </button>
          </div>
          <div style={{
            position: 'absolute',
            right: '-20px',
            bottom: '-20px',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            backgroundColor: 'rgba(200, 165, 90, 0.2)',
            zIndex: 1
          }} />
          <img 
            src="/images/beer_bamboo_mug.png" 
            alt="Promo"
            style={{
              position: 'absolute',
              right: '-10px',
              bottom: '-20px',
              height: '140%',
              zIndex: 2,
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Best Sellers Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, fontFamily: 'var(--font-outfit)', color: '#111827' }}>
            {activeCategory === 'all' ? t('Best Sellers', 'ベストセラー', 'उत्कृष्ट बिक्री') : t('Menu Items', 'メニュー', 'मेनु')}
          </h2>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#c8a55a', cursor: 'pointer' }}>
            {t('See All', 'すべて見る', 'सबै हेर्नुहोस्')}
          </span>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px',
        }}>
          {displayedItems.map(item => {
            const qty = getCartQty(item.id);
            
            return (
              <div 
                key={item.id} 
                onClick={() => router.push(`/${item.categoryId}/${item.id}`)}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '24px',
                  padding: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  border: '1px solid #f3f4f6',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
              >
                {/* Image */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '12px',
                  backgroundColor: '#f9fafb'
                }}>
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'} 
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info */}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#111827', margin: '0 0 4px 0', lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t(item.name, item.nameJp, item.nameNp)}
                </h3>
                
                {/* Calories mock */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <Flame size={12} color="#f97316" />
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>
                    {Math.floor(Math.random() * 300 + 200)} Calories
                  </span>
                </div>

                {/* Bottom Row: Price & Add Button */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
                    ¥{item.price.toLocaleString()}
                  </span>
                  
                  {qty === 0 ? (
                    <button 
                      onClick={(e) => handleQtyChange(e, item, 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        backgroundColor: '#c8a55a',
                        color: '#ffffff',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(200, 165, 90, 0.3)'
                      }}
                    >
                      <Plus size={18} strokeWidth={3} />
                    </button>
                  ) : (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#c8a55a',
                      color: '#ffffff',
                      borderRadius: '10px',
                      padding: '2px',
                      gap: '4px',
                      boxShadow: '0 4px 10px rgba(200, 165, 90, 0.3)'
                    }}>
                      <button 
                        onClick={(e) => handleQtyChange(e, item, -1)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{qty}</span>
                      <button 
                        onClick={(e) => handleQtyChange(e, item, 1)}
                        style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Global hide scrollbar utility */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Mobile Navigation */}
      <MobileBottomNav />
    </main>
  );
}
