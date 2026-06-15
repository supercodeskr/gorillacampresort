'use client';

import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';
import { menuData } from '@/data/menuData';
import { ShoppingBag, X, Plus, Minus, Trash2, Clock, AlertTriangle, MessageCircle } from 'lucide-react';
import { useEffect, useState, useMemo } from 'react';

export default function CartDrawer() {
  const { cartItems, cartCount, cartTotal, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart } = useCart();
  const { language, t } = useLanguage();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const isProductPage = /^\/[^\/]+\/\d+$/.test(pathname || '');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine if cart requires 2-hour advance notice
  const requiresAdvanceNotice = useMemo(() => {
    return cartItems.some(item => {
      // Find the category of this item to check if it has requiresAdvanceNotice
      for (const category of menuData) {
        if (category.items.some(catItem => catItem.id === item.id)) {
          return category.requiresAdvanceNotice === true;
        }
      }
      return false;
    });
  }, [cartItems]);

  // Generate time slots based on the 2-hour rule
  const timeSlots = useMemo(() => {
    const slots = [];
    const now = new Date();
    
    // If no advance notice needed, add ASAP option
    if (!requiresAdvanceNotice) {
      slots.push({ value: 'ASAP', label: t('As soon as possible', 'できるだけ早く', 'सकेसम्म चाँडो') });
    }

    // Start generating slots from either now or 2 hours from now
    let startTime = new Date(now);
    if (requiresAdvanceNotice) {
      startTime.setHours(startTime.getHours() + 2);
    }

    // Round to next 30 mins
    if (startTime.getMinutes() > 0 && startTime.getMinutes() <= 30) {
      startTime.setMinutes(30, 0, 0);
    } else if (startTime.getMinutes() > 30) {
      startTime.setHours(startTime.getHours() + 1);
      startTime.setMinutes(0, 0, 0);
    }

    // Enforce business hours (12:00 to 20:00)
    if (startTime.getHours() < 12) {
      startTime.setHours(12, 0, 0, 0);
    }

    // Generate slots up to 20:00
    for (let i = 0; i < 20; i++) { 
      const slotTime = new Date(startTime.getTime() + (i * 30 * 60000));
      
      // Stop generating if it goes past 20:00
      if (slotTime.getHours() >= 20 && slotTime.getMinutes() > 0) break;
      if (slotTime.getHours() > 20) break;
      
      const timeString = slotTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      slots.push({ value: timeString, label: timeString });
    }

    return slots;
  }, [requiresAdvanceNotice, language]);

  // Set default time when slots change
  useEffect(() => {
    if (timeSlots.length > 0 && !timeSlots.find(s => s.value === selectedTime)) {
      setSelectedTime(timeSlots[0].value);
    }
  }, [timeSlots, selectedTime]);

  const handleLineCheckout = () => {
    let orderText = t('New Order from Gorilla Camp Resort\\n\\n', 'ゴリラキャンプリゾートからの新規注文\\n\\n', 'गोरिल्ला क्याम्प रिसोर्टबाट नयाँ अर्डर\\n\\n');
    
    cartItems.forEach(item => {
      const name = t(item.name, item.nameJp, item.nameNp);
      const custom = item.customization ? ` (+${item.customization.name})` : '';
      orderText += `${item.quantity}x ${name}${custom} - ¥${((item.price + (item.customization?.price || 0)) * item.quantity).toLocaleString()}\\n`;
    });

    orderText += `\\nTotal: ¥${cartTotal.toLocaleString()}\\n`;
    orderText += `Requested Time: ${selectedTime}\\n`;
    
    const encodedMessage = encodeURIComponent(orderText);
    const lineUrl = `https://line.me/R/msg/text/?${encodedMessage}`;
    
    window.open(lineUrl, '_blank');
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating LINE Support Bubble (Global) */}
      <a
        href="https://line.me/ti/p/~08030293495"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-line-bubble"
        style={{
          position: 'fixed',
          bottom: isProductPage ? '110px' : '30px',
          right: '30px',
          backgroundColor: '#06C755', // LINE Green
          color: '#ffffff',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 20px rgba(6, 199, 85, 0.4)',
          zIndex: 90, // Slightly lower than cart if they overlap, but cart is hidden on mobile
          cursor: 'pointer',
          transition: 'transform 0.2s',
          overflow: 'hidden', // Ensures the image respects the border radius if needed
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

      {/* Cart Drawer Overlay */}
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
          {/* Drawer Panel */}
          <div 
            style={{
              width: '100%',
              maxWidth: '450px',
              backgroundColor: '#ffffff',
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
            <div style={{ padding: '24px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <ShoppingBag />
                {t('Your Order', 'ご注文内容', 'तपाईंको अर्डर')}
              </h2>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', marginTop: '40px' }}>
                  <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
                  <p>{t('Your cart is empty.', 'カートは空です。', 'तपाईंको कार्ट खाली छ।')}</p>
                </div>
              ) : (
                <>
                  {/* Warning for BBQ items */}
                  {requiresAdvanceNotice && (
                    <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fed7aa', padding: '16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <AlertTriangle color="#ea580c" size={24} style={{ flexShrink: 0 }} />
                      <p style={{ margin: 0, color: '#9a3412', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {t(
                          'Your order contains BBQ items. These require at least 2 hours of preparation time. Please select an appropriate arrival time below.',
                          'ご注文にはBBQアイテムが含まれています。これらは最低2時間の準備時間が必要です。以下で適切な到着時間を選択してください。',
                          'तपाईंको अर्डरमा BBQ परिकारहरू छन्। यिनलाई तयारी गर्न कम्तिमा २ घण्टा लाग्छ। कृपया तल उपयुक्त आइपुग्ने समय छान्नुहोस्।'
                        )}
                      </p>
                    </div>
                  )}

                  {cartItems.map((item, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f3f4f6', paddingBottom: '20px' }}>
                      <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: item.imgColor, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                        {t(item.name, item.nameJp, item.nameNp).charAt(0)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ margin: '0 0 4px', fontSize: '1rem', color: '#111827' }}>{t(item.name, item.nameJp, item.nameNp)}</h4>
                          <button onClick={() => removeFromCart(index)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444', padding: '0 0 4px 8px' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.customization && (
                          <p style={{ margin: '0 0 8px', fontSize: '0.8rem', color: '#6b7280' }}>
                            + {item.customization.name} (¥{item.customization.price})
                          </p>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                          <span style={{ fontWeight: 700, color: '#c8a55a' }}>
                            ¥{((item.price + (item.customization?.price || 0)) * item.quantity).toLocaleString()}
                          </span>
                          
                          {/* Quantity Controls */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#f9fafb', borderRadius: '100px', padding: '4px 8px' }}>
                            <button onClick={() => updateQuantity(index, -1)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', color: '#6b7280' }}>
                              {item.quantity === 1 ? <Trash2 size={14} color="#ef4444" /> : <Minus size={14} />}
                            </button>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(index, 1)} style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', color: '#6b7280' }}>
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
                
                {/* Time Selector */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                    <Clock size={16} color="#c8a55a" />
                    {t('Estimated Arrival Time', '到着予定時刻', 'अनुमानित आइपुग्ने समय')}
                  </label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', cursor: 'pointer' }}
                  >
                    {timeSlots.map((slot, i) => (
                      <option key={i} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#4b5563' }}>
                  <span>{t('Subtotal', '小計', 'उप-कुल')}</span>
                  <span>¥{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.2rem', fontWeight: 800, color: '#111827' }}>
                  <span>{t('Total', '合計', 'कुल')}</span>
                  <span>¥{cartTotal.toLocaleString()}</span>
                </div>
                
                <button 
                  onClick={handleLineCheckout}
                  style={{ width: '100%', backgroundColor: '#06C755', color: '#fff', border: 'none', padding: '16px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(6, 199, 85, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                >
                  <MessageCircle size={24} />
                  {t('Checkout via LINE', 'LINEで注文する', 'LINE मार्फत चेकआउट गर्नुहोस्')}
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
        
        /* Mobile Specific Overrides */
        @media (max-width: 768px) {
          .floating-line-bubble {
            bottom: 100px !important; /* Move above the MobileBottomNav */
            right: 20px !important;
          }
        }
      `}</style>
    </>
  );
}
