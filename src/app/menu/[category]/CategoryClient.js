'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function CategoryClient({ categoryData }) {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items based on search query
  const filteredItems = categoryData.items.filter(item => {
    const q = searchQuery.toLowerCase();
    const nameMatch = item.name.toLowerCase().includes(q) || item.nameJp.toLowerCase().includes(q) || (item.nameNp && item.nameNp.toLowerCase().includes(q));
    const descMatch = item.desc.toLowerCase().includes(q) || item.descJp.toLowerCase().includes(q) || (item.descNp && item.descNp.toLowerCase().includes(q));
    return nameMatch || descMatch;
  });

  return (
    <div>
      {/* Inline Search Bar */}
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ 
          position: 'relative', 
          width: '100%', 
          maxWidth: '600px',
          backgroundColor: '#ffffff',
          borderRadius: '100px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          padding: '4px 16px',
          transition: 'box-shadow 0.2s',
        }}>
          <Search color="#9ca3af" size={20} />
          <input 
            type="text" 
            placeholder={t(`Search ${categoryData.title}...`, `${categoryData.titleJp}から検索...`, `${categoryData.titleNp}मा खोज्नुहोस्...`)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '12px 16px',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              color: '#111827'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', margin: 0 }}>
          {t(categoryData.title, categoryData.titleJp, categoryData.titleNp)}
        </h2>
        <Link href="/menu" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>
          {t('Back to Categories', 'カテゴリ一覧へ戻る', 'कोटीहरूमा फर्कनुहोस्')}
        </Link>
      </div>

      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
          <Search size={48} style={{ opacity: 0.2, marginBottom: '16px' }} />
          <p style={{ fontSize: '1.1rem' }}>
            {t('No items found matching your search.', '検索条件に一致するアイテムが見つかりません。', 'तपाईंको खोजसँग मेल खाने कुनै परिकार फेला परेन।')}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredItems.map((item) => (
            <Link 
              key={item.id} 
              href={`/${categoryData.id}/${item.id}`}
              style={{ textDecoration: 'none' }}
            >
              <div 
                style={{
                  display: 'flex',
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer',
                  height: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)';
                }}
              >
                {/* Real Image */}
                <div 
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    marginRight: '16px',
                    position: 'relative'
                  }}
                >
                  <img 
                    src={item.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'} 
                    alt={t(item.name, item.nameJp, item.nameNp)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Content */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1 }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '4px', lineHeight: 1.2 }}>
                    {t(item.name, item.nameJp, item.nameNp)}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#6b7280', lineHeight: 1.4, marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {t(item.desc, item.descJp, item.descNp)}
                  </p>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#c8a55a' }}>¥{item.price.toLocaleString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
