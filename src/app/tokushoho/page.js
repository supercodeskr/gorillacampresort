'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Tokushoho() {
  const { language } = useLanguage();

  return (
    <main style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '100px', paddingTop: '100px' }}>
      {/* Responsive Top Bar with Back Button */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', zIndex: 50 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#4b5563', fontWeight: 600, fontSize: '0.95rem' }}>
          <ArrowLeft size={20} />
          {language === 'en' ? 'Back to Home' : 'ホームに戻る'}
        </Link>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px', color: '#111827' }}>
          {language === 'en' ? 'Act on Specified Commercial Transactions' : '特定商取引法に基づく表記'}
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Company Name' : '販売業者'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0 }}>
              {language === 'en' ? 'SERVE INT Co., Ltd.' : '株式会社ＳＥＲＶＥ　ＩＮＴ'}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Representative' : '運営統括責任者名'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0 }}>
              {language === 'en' ? 'Rajendra Sunar' : 'スナル ラジェンドラ'}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Address' : '所在地'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0 }}>
              {language === 'en' ? '〒350-1101 Matobakita 2-4-12-2F, Kawagoe-shi, Saitama, Japan' : '〒350-1101 埼玉県川越市的場北２－４－１２－２Ｆ'}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Phone Number' : '電話番号'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0 }}>
              080-3029-3495
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Email Address' : 'メールアドレス'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0 }}>
              info@gorillacampresort.com
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Additional Fees' : '商品代金以外の必要料金'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0, lineHeight: 1.6 }}>
              {language === 'en' 
                ? 'Consumption tax (10%). No other additional fees.' 
                : '消費税（10%）。その他追加の手数料はございません。'}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Returns and Cancellations' : '返品・キャンセルポリシー'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0, lineHeight: 1.6 }}>
              {language === 'en' 
                ? 'Cancellations up to 3 days before the reservation date are fully refunded. Cancellations within 3 days will incur a 50% cancellation fee. No-shows will be charged 100%.' 
                : 'ご予約日の3日前までのキャンセルは全額返金いたします。それ以降のキャンセルにつきましては、ご予約金額の50%をキャンセル料として申し受けます。無断キャンセルの場合は100%をご請求させていただきます。'}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Payment Methods' : 'お支払方法'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0, lineHeight: 1.6 }}>
              {language === 'en' 
                ? 'Credit Card, PayPay, LINE Pay, Cash' 
                : 'クレジットカード、PayPay、LINE Pay、現金'}
            </p>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px' }}>
              {language === 'en' ? 'Delivery Time' : '引き渡し時期'}
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#111827', margin: 0, lineHeight: 1.6 }}>
              {language === 'en' 
                ? 'Services and food are provided on the scheduled reservation date at the facility.' 
                : 'ご予約いただいた日時に、施設にてサービスおよびお食事をご提供いたします。'}
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}
