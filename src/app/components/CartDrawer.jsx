'use client';

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import { menuData } from '@/data/menuData';
import { ShoppingBag, X, Plus, Minus, Trash2, Clock, AlertTriangle, MessageCircle, ArrowLeft } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

export default function CartDrawer() {
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [promoCode, setPromoCode] = useState('');

  const isProductPage = /^\/[^\/]+\/\d+$/.test(pathname || '');

  useEffect(() => {
    setMounted(true);
  }, []);

  const requiresAdvanceNotice = useMemo(() => {
    return cartItems.some(item => {
      for (const category of menuData) {
        if (category.items.some(catItem => catItem.id === item.id)) {
          return category.requiresAdvanceNotice === true;
        }
      }
      return false;
    });
  }, [cartItems]);

  const timeSlots = useMemo(() => {
    const slots = [];
    const now = new Date();
    
    if (!requiresAdvanceNotice) {
      slots.push({ value: 'ASAP', label: t('As soon as possible', 'できるだけ早く', 'सकेसम्म चाँडो') });
    }

    let startTime = new Date(now);
    if (requiresAdvanceNotice) {
      startTime.setHours(startTime.getHours() + 2);
    }

    if (startTime.getMinutes() > 0 && startTime.getMinutes() <= 30) {
      startTime.setMinutes(30, 0, 0);
    } else if (startTime.getMinutes() > 30) {
      startTime.setHours(startTime.getHours() + 1);
      startTime.setMinutes(0, 0, 0);
    }

    if (startTime.getHours() < 12) {
      startTime.setHours(12, 0, 0, 0);
    }

    for (let i = 0; i < 20; i++) { 
      const slotTime = new Date(startTime.getTime() + (i * 30 * 60000));
      if (slotTime.getHours() >= 20 && slotTime.getMinutes() > 0) break;
      if (slotTime.getHours() > 20) break;
      
      const timeString = slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push({ value: timeString, label: timeString });
    }

    return slots;
  }, [requiresAdvanceNotice, language]);

  useEffect(() => {
    if (timeSlots.length > 0 && !timeSlots.find(s => s.value === selectedTime)) {
      setSelectedTime(timeSlots[0].value);
    }
  }, [timeSlots, selectedTime]);

  const handleLineCheckout = () => {
    let orderText = t('New Order from Gorilla Camp Resort\\n\\n', 'ゴリラキャンプリゾートからの新規注文\\n\\n', 'गोरिल्ला क्याम्प रिसोर्टबाट नयाँ अर्डर\\n\\n');
    
    cartItems.forEach(item => {
      const name = t(item.name, item.nameJp, item.nameNp);
      orderText += `${item.quantity}x ${name} - ¥${(item.price * item.quantity).toLocaleString()}\\n`;
    });

    orderText += `\\nTotal: ¥${cartTotal.toLocaleString()}\\n`;
    if (promoCode) orderText += `Promo Code: ${promoCode}\\n`;
    orderText += `Requested Time: ${selectedTime}\\n`;
    
    const encodedMessage = encodeURIComponent(orderText);
    const lineUrl = `https://line.me/R/msg/text/?${encodedMessage}`;
    
    window.open(lineUrl, '_blank');
  };

  if (!mounted) return null;

  return (
    <>
      <a
        href="https://line.me/ti/p/~08030293495"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-line-bubble"
        style={{
          position: 'fixed',
          bottom: isProductPage ? '110px' : '30px',
          right: '30px',
          backgroundColor: '#06C755',
          color: '#ffffff',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(6, 199, 85, 0.4)',
          zIndex: 90,
          cursor: 'pointer',
          transition: 'transform 0.2s',
          overflow: 'hidden',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" 
          alt="LINE Chat" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </a>

      {isCartOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '450px',
              backgroundColor: '#f9fafb',
              height: '100vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              animation: 'slideIn 0.3s ease-out forwards',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: '24px', backgroundColor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827' }}>
                <ArrowLeft size={24} />
              </button>
              <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#111827', fontFamily: 'var(--font-outfit)' }}>
                {t('Cart', 'カート', 'कार्ट')}
              </h2>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#111827' }}>
                <Trash2 size={22} />
              </button>
            </div>

            {/* Items List */}
            <div style={{ padding: '24px', flex: 1 }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '40px' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <p>{t('Your cart is empty.', 'カートは空です。', 'तपाईंको कार्ट खाली छ।')}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {requiresAdvanceNotice && (
                    <div style={{ backgroundColor: '#fff7ed', padding: '16px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <AlertTriangle color="#ea580c" size={24} style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, color: '#9a3412', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {t(
                          'BBQ items require at least 2 hours preparation.',
                          'BBQアイテムは最低2時間の準備時間が必要です。',
                          'BBQ परिकारहरू तयारी गर्न कम्तिमा २ घण्टा लाग्छ।'
                        )}
                      </p>
                    </div>
                  )}

                  {cartItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px', backgroundColor: '#ffffff', padding: '16px', borderRadius: '24px', alignItems: 'center' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '16px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#111827', fontWeight: 700 }}>{t(item.name, item.nameJp, item.nameNp)}</h4>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', marginTop: '8px' }}>
                          ¥{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#c8a55a', borderRadius: '10px', padding: '2px', color: '#ffffff' }}>
                        <button onClick={() => updateQuantity(index, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', color: '#ffffff' }}>
                          {item.quantity === 1 ? <Trash2 size={14} strokeWidth={3} /> : <Minus size={14} strokeWidth={3} />}
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(index, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px', color: '#ffffff' }}>
                          <Plus size={14} strokeWidth={3} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {cartItems.length > 0 && (
              <div style={{ padding: '24px', backgroundColor: '#ffffff', borderTopLeftRadius: '32px', borderTopRightRadius: '32px', boxShadow: '0 -4px 24px rgba(0,0,0,0.04)' }}>
                
                {/* Promo Code */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                  <input 
                    type="text" 
                    placeholder="Promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1px solid #f3f4f6', backgroundColor: '#f9fafb', fontSize: '1rem', outline: 'none' }}
                  />
                  <button style={{ backgroundColor: '#c8a55a', color: '#ffffff', border: 'none', borderRadius: '16px', padding: '0 24px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>
                    Apply
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#6b7280', fontSize: '0.95rem' }}>
                  <span>{t('Subtotal', '小計', 'उप-कुल')}</span>
                  <span style={{ color: '#111827', fontWeight: 600 }}>¥{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#6b7280', fontSize: '0.95rem' }}>
                  <span>{t('Delivery', '配達', 'डेलिभरी')}</span>
                  <span style={{ color: '#111827', fontWeight: 600 }}>¥0</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.2rem', fontWeight: 900, color: '#111827' }}>
                  <span>{t('Total', '合計', 'कुल')}</span>
                  <span>¥{cartTotal.toLocaleString()}</span>
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '1px solid #f3f4f6', backgroundColor: '#f9fafb', fontSize: '0.95rem', fontWeight: 600, color: '#4b5563', outline: 'none', cursor: 'pointer' }}
                  >
                    {timeSlots.map((slot, i) => (
                      <option key={i} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={handleLineCheckout}
                  style={{ width: '100%', backgroundColor: '#c8a55a', color: '#fff', border: 'none', padding: '20px', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(200, 165, 90, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  {t('Checkout', '注文を確定する', 'अर्डर पक्का गर्नुहोस्')} - ¥{cartTotal.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .floating-line-bubble {
            bottom: 100px !important;
            right: 20px !important;
          }
        }
      `}</style>
    </>
  );
}
