'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { menuData } from '@/data/menuData';
import { useRouter } from 'next/navigation';

export default function SearchModal({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matches = [];

    menuData.forEach(category => {
      category.items.forEach(item => {
        const nameMatch = item.name.toLowerCase().includes(q) || item.nameJp.toLowerCase().includes(q) || (item.nameNp && item.nameNp.toLowerCase().includes(q));
        const descMatch = item.desc.toLowerCase().includes(q) || item.descJp.toLowerCase().includes(q) || (item.descNp && item.descNp.toLowerCase().includes(q));
        if (nameMatch || descMatch) {
          matches.push({...item, categoryId: category.id});
        }
      });
    });

    setResults(matches);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(12px)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '10vh'
    }}>
      
      {/* Close Button */}
      <button 
        onClick={onClose}
        style={{ position: 'absolute', top: '30px', right: '40px', background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
      >
        <X size={32} />
      </button>

      {/* Search Input Container */}
      <div style={{ width: '100%', maxWidth: '600px', padding: '0 20px', position: 'relative' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={28} color="#9ca3af" style={{ position: 'absolute', left: '20px' }} />
          <input 
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('Search for food, BBQ...', '食べ物、BBQを検索...', 'खाना, BBQ खोज्नुहोस्...')}
            style={{ 
              width: '100%', 
              padding: '24px 24px 24px 64px', 
              borderRadius: '100px', 
              border: 'none', 
              fontSize: '1.2rem', 
              backgroundColor: '#1f2937', 
              color: '#fff',
              outline: 'none',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              transition: 'all 0.3s ease'
            }}
          />
        </div>

        {/* Results Dropdown */}
        {query.trim() && (
          <div style={{ 
            marginTop: '16px', 
            backgroundColor: '#ffffff', 
            borderRadius: '24px', 
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            maxHeight: '60vh',
            overflowY: 'auto'
          }}>
            {results.length === 0 ? (
              <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                {t('No delicious results found.', '美味しい結果は見つかりませんでした。', 'कुनै स्वादिष्ट परिणामहरू फेला परेनन्।')}
              </div>
            ) : (
              results.map(item => (
                <div 
                  key={item.id}
                  onClick={() => {
                    router.push(`/${item.categoryId}/${item.id}`);
                    onClose();
                  }}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '16px', 
                    padding: '20px', 
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ width: '50px', height: '50px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img 
                      src={item.image} 
                      alt={t(item.name, item.nameJp, item.nameNp)} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px', fontSize: '1.1rem', color: '#111827' }}>
                      {t(item.name, item.nameJp, item.nameNp)}
                    </h4>
                    <span style={{ color: '#c8a55a', fontWeight: 700 }}>¥{item.price.toLocaleString()}</span>
                  </div>
                  <ArrowRight color="#d1d5db" />
                </div>
              ))
            )}
          </div>
        )}
      </div>

    </div>
  );
}
