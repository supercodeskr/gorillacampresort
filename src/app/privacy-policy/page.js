'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
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

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px', color: '#374151', lineHeight: 1.8 }}>
        <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px', color: '#111827' }}>
          {language === 'en' ? 'Privacy Policy' : 'プライバシーポリシー'}
        </h1>

        {language === 'en' ? (
          <div>
            <p>SERVE INT Co., Ltd. (hereinafter referred to as "the Company") establishes the following privacy policy regarding the handling of users' personal information for the services provided on this website.</p>
            
            <h2 style={{ marginTop: '30px', color: '#111827' }}>1. Collection of Personal Information</h2>
            <p>The Company collects personal information such as name, date of birth, address, phone number, and email address when users register or make a reservation.</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>2. Purpose of Use</h2>
            <p>The purposes for which the Company collects and uses personal information are as follows:</p>
            <ul>
              <li>To provide and operate our services</li>
              <li>To respond to inquiries from users</li>
              <li>To send notifications related to reservations and services</li>
            </ul>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>3. Provision to Third Parties</h2>
            <p>The Company will not provide personal information to third parties without the prior consent of the user, except where permitted by the Personal Information Protection Law or other laws and regulations.</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>4. Contact Information</h2>
            <p>For inquiries regarding this policy, please contact us at the following:<br/>
            SERVE INT Co., Ltd.<br/>
            Email: info@gorillacampresort.com</p>
          </div>
        ) : (
          <div>
            <p>株式会社ＳＥＲＶＥ　ＩＮＴ（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービスにおける、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
            
            <h2 style={{ marginTop: '30px', color: '#111827' }}>1. 個人情報の収集</h2>
            <p>当社は、ユーザーが利用登録や予約をする際に氏名、生年月日、住所、電話番号、メールアドレスなどの個人情報をお尋ねすることがあります。</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>2. 利用目的</h2>
            <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul>
              <li>当社サービスの提供・運営のため</li>
              <li>ユーザーからのお問い合わせに回答するため</li>
              <li>予約やサービスに関する通知を発送するため</li>
            </ul>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>3. 第三者提供</h2>
            <p>当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>4. お問い合わせ窓口</h2>
            <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。<br/>
            株式会社ＳＥＲＶＥ　ＩＮＴ<br/>
            Email: info@gorillacampresort.com</p>
          </div>
        )}
      </div>
    </main>
  );
}
