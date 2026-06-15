'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Company() {
  const { language } = useLanguage();

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: '100px' }}>
      {/* Responsive Top Bar with Back Button */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#4b5563', fontWeight: 600, fontSize: '0.95rem' }}>
          <ArrowLeft size={20} />
          {language === 'en' ? 'Back to Home' : 'ホームに戻る'}
        </Link>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px', color: '#111827' }}>
          {language === 'en' ? 'Company Profile' : '会社概要'}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', fontSize: '1rem', color: '#6b7280', fontWeight: 'bold' }}>
              {language === 'en' ? 'Company Name' : '会社名'}
            </div>
            <div style={{ flex: 1, fontSize: '1.1rem', color: '#111827' }}>
              {language === 'en' ? 'SERVE INT Co., Ltd.' : '株式会社ＳＥＲＶＥ　ＩＮＴ'}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', fontSize: '1rem', color: '#6b7280', fontWeight: 'bold' }}>
              {language === 'en' ? 'Date of Establishment' : '設立'}
            </div>
            <div style={{ flex: 1, fontSize: '1.1rem', color: '#111827' }}>
              {language === 'en' ? 'July 28, 2016 (Heisei 28)' : '平成28年7月28日'}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', fontSize: '1rem', color: '#6b7280', fontWeight: 'bold' }}>
              {language === 'en' ? 'Representative Director' : '代表取締役'}
            </div>
            <div style={{ flex: 1, fontSize: '1.1rem', color: '#111827' }}>
              {language === 'en' ? 'Rajendra Sunar' : 'スナル ラジェンドラ'}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', fontSize: '1rem', color: '#6b7280', fontWeight: 'bold' }}>
              {language === 'en' ? 'Head Office' : '本店所在地'}
            </div>
            <div style={{ flex: 1, fontSize: '1.1rem', color: '#111827' }}>
              {language === 'en' ? 'Matobakita 2-4-12-2F, Kawagoe-shi, Saitama, Japan' : '埼玉県川越市的場北２－４－１２－２Ｆ'}
            </div>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ width: '200px', fontSize: '1rem', color: '#6b7280', fontWeight: 'bold' }}>
              {language === 'en' ? 'Business Operations' : '事業内容'}
            </div>
            <div style={{ flex: 1, fontSize: '1.1rem', color: '#111827', lineHeight: 1.8 }}>
              {language === 'en' ? (
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>Restaurant and Cafe Operations</li>
                  <li>Import/Export of Vehicles and Parts</li>
                  <li>Software Development and IT Consulting</li>
                  <li>Travel Agency Operations</li>
                  <li>Real Estate Management</li>
                </ul>
              ) : (
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  <li>飲食店業、ネットカフェの経営</li>
                  <li>自動車、バイク及びその部品の輸出入販売</li>
                  <li>コンピューターシステム及びソフトウェアの開発</li>
                  <li>旅行業</li>
                  <li>不動産の売買・交換・貸借及び管理</li>
                </ul>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
