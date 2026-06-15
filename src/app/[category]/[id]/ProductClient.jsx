'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { menuData } from '@/data/menuData';
import MobileBottomNav from '@/app/components/MobileBottomNav';
import { ArrowLeft, Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProductClient() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { language, t } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomization, setSelectedCustomization] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const [shuffledRelated, setShuffledRelated] = useState([]);

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

  // Generate related items once on mount
  useEffect(() => {
    if (!product || !categoryId) return;
    
    let relatedCategoryIds = [];
    if (['bbq', 'sekuwa', 'steak', 'fried', 'momo', 'khana', 'curry', 'pasta'].includes(categoryId)) {
      relatedCategoryIds = ['drinks', 'desserts'];
    } else if (categoryId === 'drinks') {
      relatedCategoryIds = ['fried', 'momo', 'bbq'];
    } else if (categoryId === 'desserts') {
      relatedCategoryIds = ['drinks'];
    }

    const relatedItems = [];
    menuData.forEach(cat => {
      if (relatedCategoryIds.includes(cat.id)) {
        cat.items.forEach(i => relatedItems.push({...i, categoryId: cat.id}));
      }
    });
    
    // Shuffle and pick 3-4
    setShuffledRelated(relatedItems.sort(() => 0.5 - Math.random()).slice(0, 4));
  }, [id, product, categoryId]);

  // Reset state when product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedCustomization(null);
    setImageLoaded(false);
    setAdded(false);
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found">
        <div className="product-not-found-inner">
          <h2>{t('Product not found', '商品が見つかりません', 'उत्पादन फेला परेन')}</h2>
          <Link href="/menu" className="product-back-link">
            <ArrowLeft size={18} />
            {t('Back to Menu', 'メニューに戻る', 'मेनुमा फर्कनुहोस्')}
          </Link>
        </div>
      </div>
    );
  }

  const handleOrder = () => {
    addToCart(product, quantity, selectedCustomization);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const totalPrice = (product.price + (selectedCustomization?.price || 0)) * quantity;
  const productName = t(product.name, product.nameJp, product.nameNp);
  const productDesc = t(product.desc, product.descJp, product.descNp);

  return (
    <>
      <main className="product-page">
        
        {/* Floating Back Button */}
        <Link href="/menu" className="product-floating-back">
          <ArrowLeft size={18} />
          <span>{t('Menu', 'メニュー', 'मेनु')}</span>
        </Link>

        {/* Hero Image Section */}
        <div className="product-hero">
          <div className={`product-hero-image-wrapper ${imageLoaded ? 'loaded' : ''}`}>
            <img 
              src={product.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'} 
              alt={productName}
              className="product-hero-image"
              onLoad={() => setImageLoaded(true)}
            />
            <div className="product-hero-overlay" />
          </div>

          {/* Tags overlay */}
          {product.tags && product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.map((tag, i) => (
                <span key={i} className="product-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Card */}
        <div className="product-content">
          
          {/* Product Details Header */}
          <div className="product-header">
            <div className="product-header-text">
              <h1 className="product-title">{productName}</h1>
              <div className="product-price-badge">
                <span className="product-price">¥{product.price.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <p className="product-description">{productDesc}</p>

          <hr className="product-divider" />

          {/* Customizations */}
          {product.customizations && product.customizations.length > 0 && (
            <div className="product-section product-customizations">
              <h3 className="product-section-title">
                {t('Customizations', 'カスタマイズ', 'अनुकूलन')}
              </h3>
              <div className="product-options">
                
                {/* Option to clear selection */}
                <label 
                  className={`product-option ${selectedCustomization === null ? 'selected' : ''}`}
                  onClick={() => setSelectedCustomization(null)}
                >
                  <div className="product-option-left">
                    <div className={`product-radio ${selectedCustomization === null ? 'active' : ''}`} />
                    <span className="product-option-name">
                      {t('Standard (No changes)', '標準（変更なし）', 'मानक (कुनै परिवर्तन छैन)')}
                    </span>
                  </div>
                </label>

                {/* Mapped Options */}
                {product.customizations.map((option, idx) => {
                  const isSelected = selectedCustomization?.name === option.name;
                  return (
                    <label 
                      key={idx}
                      className={`product-option ${isSelected ? 'selected' : ''}`}
                      onClick={() => setSelectedCustomization(option)}
                    >
                      <div className="product-option-left">
                        <div className={`product-radio ${isSelected ? 'active' : ''}`} />
                        <span className="product-option-name">
                          {t(option.name, option.nameJp || option.name, option.nameNp || option.name)}
                        </span>
                      </div>
                      {option.price > 0 && (
                        <span className="product-option-price">+ ¥{option.price}</span>
                      )}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Bar (Moved into page flow) */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px'
          }}>
            {/* Quantity Selector */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f3f4f6',
              borderRadius: '100px',
              padding: '4px 12px',
              height: '48px'
            }}>
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', padding: '0 8px' }}
              >
                <Minus size={18} />
              </button>
              <span style={{ width: '30px', textAlign: 'center', fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                {quantity < 10 ? `0${quantity}` : quantity}
              </span>
              <button 
                onClick={() => setQuantity(q => q + 1)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', padding: '0 8px' }}
              >
                <Plus size={18} />
              </button>
            </div>

            {/* Order Button */}
            <button 
              onClick={handleOrder}
              style={{
                flex: 1,
                background: added ? '#22c55e' : '#c8a55a',
                color: '#ffffff',
                border: 'none',
                borderRadius: '100px',
                height: '48px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: added ? '0 4px 12px rgba(34, 197, 94, 0.2)' : '0 4px 12px rgba(200, 165, 90, 0.2)',
                transition: 'all 0.3s ease',
                gap: '8px'
              }}
            >
              {added && <Check size={20} />}
              <span>{added ? t('Added to Cart', '追加しました', 'थपियो') : t('Add to Cart', 'カートに追加', 'कार्टमा थप्नुहोस्')}</span>
            </button>
          </div>

          {/* You May Also Like */}
          {shuffledRelated.length > 0 && (
            <div className="product-section" style={{ marginTop: '30px' }}>
              <h3 className="product-section-title">
                {t('You May Also Like', 'こちらもおすすめ', 'तपाईंलाई यी पनि मन पर्न सक्छ')}
              </h3>
              <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', margin: '0 -4px', padding: '4px' }} className="hide-scrollbar">
                {shuffledRelated.map(item => (
                  <div 
                    key={item.id} 
                    onClick={() => router.push(`/${item.categoryId}/${item.id}`)}
                    style={{ 
                      minWidth: '130px', 
                      width: '130px',
                      cursor: 'pointer',
                      border: '1px solid #e5e7eb',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ width: '100%', height: '100px', backgroundColor: '#f3f4f6' }}>
                      <img src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '12px 10px' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 700, margin: '0 0 4px 0', color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {t(item.name, item.nameJp, item.nameNp)}
                      </h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '0.85rem', color: '#c8a55a', fontWeight: 800, margin: 0 }}>
                          ¥{item.price.toLocaleString()}
                        </p>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(item, 1, null);
                            setIsCartOpen(true);
                          }}
                          style={{
                            background: '#c8a55a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </main>
      <MobileBottomNav />

      <style jsx global>{`
        /* ── Product Page Base ── */
        .product-page {
          min-height: 100vh;
          background-color: #fafaf8;
          padding-bottom: 120px;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* ── Not Found ── */
        .product-not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fafaf8;
        }
        .product-not-found-inner {
          text-align: center;
        }
        .product-not-found-inner h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 16px;
        }

        /* ── Floating Back Button ── */
        .product-floating-back {
          position: fixed;
          top: 80px;
          left: 24px;
          z-index: 60;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px 10px 16px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(200, 165, 90, 0.3);
          border-radius: 100px;
          color: #111827;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }
        .product-floating-back:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
          border-color: #c8a55a;
        }

        /* ── Hero Image ── */
        .product-hero {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 90px 24px 0;
        }
        .product-hero-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          border-radius: 24px;
          overflow: hidden;
          background: linear-gradient(135deg, #e8e4de 0%, #d4cfc7 100%);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          opacity: 0;
          transform: scale(0.98);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .product-hero-image-wrapper.loaded {
          opacity: 1;
          transform: scale(1);
        }
        .product-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .product-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.15) 100%);
          pointer-events: none;
        }

        /* ── Tags ── */
        .product-tags {
          position: absolute;
          top: 110px;
          left: 44px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .product-tag {
          background: rgba(255, 255, 255, 0.92);
          color: #111827;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 100px;
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          letter-spacing: 0.02em;
        }

        /* ── Content Card ── */
        .product-content {
          max-width: 900px;
          margin: -40px auto 0;
          padding: 48px 40px 40px;
          position: relative;
          z-index: 2;
          background: #ffffff;
          border-radius: 28px 28px 0 0;
          box-shadow: 0 -10px 40px rgba(0, 0, 0, 0.04);
        }

        /* ── Header ── */
        .product-header {
          margin-bottom: 20px;
        }
        .product-header-text {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
        }
        .product-title {
          font-size: 2rem;
          font-weight: 900;
          color: #111827;
          margin: 0;
          line-height: 1.2;
          letter-spacing: -0.02em;
          flex: 1;
          min-width: 0;
          overflow-wrap: break-word;
          word-break: break-word;
        }
        .product-price-badge {
          flex-shrink: 0;
        }
        .product-price {
          font-size: 1.6rem;
          font-weight: 800;
          color: #c8a55a;
          white-space: nowrap;
        }

        /* ── Description ── */
        .product-description {
          font-size: 1.05rem;
          color: #4b5563;
          line-height: 1.7;
          margin-bottom: 12px;
        }

        /* ── Divider ── */
        .product-divider {
          border: none;
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          margin: 24px 0;
        }

        /* ── Sections ── */
        .product-section {
          margin-bottom: 32px;
        }
        .product-section-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }

        /* ── Customizations ── */
        .product-customizations {
          margin-bottom: 40px;
        }
        .product-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .product-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-radius: 16px;
          border: 1.5px solid #e5e7eb;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .product-option:hover {
          border-color: rgba(200, 165, 90, 0.4);
          background: #fffdf5;
        }
        .product-option.selected {
          border-color: #c8a55a;
          background: #fffbeb;
          box-shadow: 0 0 0 3px rgba(200, 165, 90, 0.1);
        }
        .product-option-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .product-radio {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid #d1d5db;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .product-radio.active {
          border: 6px solid #c8a55a;
        }
        .product-option-name {
          font-weight: 500;
          color: #111827;
          font-size: 0.95rem;
        }
        .product-option.selected .product-option-name {
          font-weight: 700;
        }
        .product-option-price {
          color: #6b7280;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* Removed Bottom Bar Styles */

        /* ═══════════════════════════════════════════
           RESPONSIVE: Tablet (≤ 1024px)
           ═══════════════════════════════════════════ */
        @media (max-width: 1024px) {
          .product-hero {
            padding: 80px 20px 0;
          }
          .product-content {
            padding: 40px 32px 32px;
          }
          .product-title {
            font-size: 1.75rem;
          }
          .product-price {
            font-size: 1.4rem;
          }
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE: Mobile (≤ 768px)
           ═══════════════════════════════════════════ */
        @media (max-width: 768px) {
          .product-page {
            padding-bottom: 100px;
          }

          .product-floating-back {
            top: 16px;
            left: 16px;
            padding: 8px 16px 8px 12px;
            font-size: 0.82rem;
          }

          .product-hero {
            padding: 60px 0 0;
          }
          .product-hero-image-wrapper {
            border-radius: 0;
            aspect-ratio: 4 / 3;
          }

          .product-tags {
            top: 76px;
            left: 16px;
          }

          .product-content {
            margin-top: -24px;
            padding: 32px 20px 28px;
            border-radius: 24px 24px 0 0;
          }

          .product-header-text {
            flex-direction: column;
            gap: 8px;
          }
          .product-title {
            font-size: 1.5rem;
          }
          .product-price {
            font-size: 1.3rem;
          }

          .product-description {
            font-size: 0.95rem;
          }

          .product-option {
            padding: 14px 16px;
          }
        }

        /* ═══════════════════════════════════════════
           RESPONSIVE: Small Mobile (≤ 480px)
           ═══════════════════════════════════════════ */
        @media (max-width: 480px) {
          .product-title {
            font-size: 1.3rem;
          }
          .product-price {
            font-size: 1.2rem;
          }
          .product-content {
            padding: 28px 16px 24px;
          }
          .product-section-title {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </>
  );
}
