'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { menuData } from '@/data/menuData';
import { ArrowLeft, Heart, Star, Plus, Minus, Check, Flame } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProductClient() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { language, t } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Find product and its category
  let product = null;
  let categoryId = null;
  for (const category of menuData) {
    const found = category.items.find(item => item.id.toString() === id);
    if (found) {
      product = found;
      categoryId = category.id;
      break;
    }
  }

  if (!product) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <h2>{t('Product not found', '商品が見つかりません', 'उत्पादन फेला परेन')}</h2>
        <Link href="/menu" style={{ marginTop: '20px', color: '#c8a55a', fontWeight: 'bold' }}>
          {t('Back to Menu', 'メニューに戻る', 'मेनुमा फर्कनुहोस्')}
        </Link>
      </div>
    );
  }

  const productName = t(product.name, product.nameJp, product.nameNp);
  
  const sizes = [
    { id: 'S', label: '8"', priceMultiplier: 0.8 },
    { id: 'M', label: '10"', priceMultiplier: 1 },
    { id: 'L', label: '14"', priceMultiplier: 1.4 },
  ];

  const addons = [
    { id: 'extra_meat', label: 'Extra Meat', price: 200 },
    { id: 'spicy', label: 'Extra Spicy', price: 50 },
    { id: 'cheese', label: 'Cheese', price: 150 },
  ];

  const handleAddonToggle = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(a => a !== addonId) : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    // Calculate final price based on size and addons
    const sizeMultiplier = sizes.find(s => s.id === selectedSize)?.priceMultiplier || 1;
    let finalPrice = product.price * sizeMultiplier;
    
    selectedAddons.forEach(addonId => {
      finalPrice += addons.find(a => a.id === addonId)?.price || 0;
    });

    addToCart({
      id: `${product.id}-${selectedSize}-${selectedAddons.join('-')}`,
      name: product.name,
      nameJp: product.nameJp,
      nameNp: product.nameNp,
      price: finalPrice,
      image: product.image,
      imgColor: '#c8a55a',
      quantity,
    });
    
    // Automatically open cart drawer
    setIsCartOpen(true);
  };

  // Compute display price
  const sizeMultiplier = sizes.find(s => s.id === selectedSize)?.priceMultiplier || 1;
  let displayPrice = product.price * sizeMultiplier;
  selectedAddons.forEach(addonId => {
    displayPrice += addons.find(a => a.id === addonId)?.price || 0;
  });

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '120px', position: 'relative' }}>
      
      {/* Top Nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '24px', position: 'relative', zIndex: 10 }}>
        <button onClick={() => router.push('/menu')} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <ArrowLeft size={24} color="#111827" />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <Heart size={24} color="#111827" />
        </button>
      </div>

      {/* Product Image */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
        <div style={{
          width: '240px',
          height: '240px',
          borderRadius: '50%',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          backgroundColor: '#f9fafb'
        }}>
          <img 
            src={product.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600'} 
            alt={productName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      <div style={{ padding: '32px 24px' }}>
        {/* Title and Rating */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#111827', fontFamily: 'var(--font-outfit)', marginBottom: '8px' }}>
            {productName}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Flame size={14} color="#f97316" />
              {Math.floor(Math.random() * 300 + 200)} Kcal
            </span>
            <span style={{ fontSize: '0.85rem', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} color="#eab308" fill="#eab308" />
              4.8 (1.2k)
            </span>
          </div>
        </div>

        {/* Sizes */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {sizes.map(size => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.id)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '16px',
                border: selectedSize === size.id ? '2px solid #c8a55a' : '1px solid #e5e7eb',
                backgroundColor: selectedSize === size.id ? 'rgba(200, 165, 90, 0.05)' : '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '0.85rem', color: selectedSize === size.id ? '#c8a55a' : '#6b7280', fontWeight: 600 }}>
                {size.id} - {size.label}
              </span>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: '#111827' }}>
                ¥{Math.round(product.price * size.priceMultiplier).toLocaleString()}
              </span>
            </button>
          ))}
        </div>

        {/* Add Ingredients */}
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827', marginBottom: '16px', fontFamily: 'var(--font-outfit)' }}>
            Add ingredients
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {addons.map(addon => {
              const isSelected = selectedAddons.includes(addon.id);
              return (
                <div 
                  key={addon.id}
                  onClick={() => handleAddonToggle(addon.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: '16px',
                    backgroundColor: '#f9fafb',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111827' }}>
                    {addon.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#c8a55a' }}>+¥{addon.price}</span>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '6px',
                      backgroundColor: isSelected ? '#c8a55a' : '#ffffff',
                      border: isSelected ? 'none' : '2px solid #d1d5db',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {isSelected && <Check size={16} color="#ffffff" strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Bar */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        padding: '16px 24px',
        borderTop: '1px solid #f3f4f6',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
        zIndex: 100
      }}>
        {/* Quantity Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          borderRadius: '100px',
          padding: '4px',
          gap: '12px'
        }}>
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ 
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
            }}
          >
            <Minus size={18} color="#111827" />
          </button>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: '#111827', minWidth: '16px', textAlign: 'center' }}>
            {quantity}
          </span>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            style={{ 
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#c8a55a', 
              border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' 
            }}
          >
            <Plus size={18} color="#ffffff" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            backgroundColor: '#c8a55a',
            color: '#ffffff',
            border: 'none',
            borderRadius: '100px',
            padding: '16px',
            fontSize: '1.1rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(200, 165, 90, 0.3)'
          }}
        >
          Add to Cart - ¥{(displayPrice * quantity).toLocaleString()}
        </button>
      </div>

    </div>
  );
}
