'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Terms() {
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
          {language === 'en' ? 'Terms of Service' : '利用規約'}
        </h1>

        {language === 'en' ? (
          <div>
            <p>These Terms of Service (hereinafter referred to as the "Terms") set forth the conditions for using the services provided by SERVE INT Co., Ltd. (hereinafter referred to as the "Company"). Users must agree to these Terms before using the service.</p>
            
            <h2 style={{ marginTop: '30px', color: '#111827' }}>1. Applicability</h2>
            <p>These Terms shall apply to all relationships between the User and the Company regarding the use of the Service.</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>2. Reservations and Cancellations</h2>
            <p>Reservations must be made through our official channels. Cancellations made within 3 days of the reservation date will incur a 50% cancellation fee. No-shows will be charged 100%.</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>3. Prohibited Acts</h2>
            <p>Users must not engage in the following acts when using the Service:</p>
            <ul>
              <li>Acts that violate laws or public order and morals</li>
              <li>Acts related to criminal activities</li>
              <li>Acts that infringe on intellectual property rights</li>
            </ul>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>4. Disclaimer</h2>
            <p>The Company shall not be liable for any damages incurred by the User arising out of or in connection with the Service, except in cases of willful misconduct or gross negligence by the Company.</p>
          </div>
        ) : (
          <div>
            <p>この利用規約（以下、「本規約」といいます。）は、株式会社ＳＥＲＶＥ　ＩＮＴ（以下、「当社」といいます。）が提供するサービスの利用条件を定めるものです。ユーザーの皆さまには、本規約に従って本サービスをご利用いただきます。</p>
            
            <h2 style={{ marginTop: '30px', color: '#111827' }}>第1条（適用）</h2>
            <p>本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>第2条（予約とキャンセル）</h2>
            <p>ご予約は当社の公式な手段を通じて行うものとします。ご予約日の3日前以内のキャンセルにつきましては、ご予約金額の50%をキャンセル料として申し受けます。無断キャンセルの場合は100%をご請求させていただきます。</p>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>第3条（禁止事項）</h2>
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>知的財産権を侵害する行為</li>
            </ul>

            <h2 style={{ marginTop: '30px', color: '#111827' }}>第4条（免責事項）</h2>
            <p>当社は、本サービスに起因してユーザーに生じたあらゆる損害について一切の責任を負いません。ただし、当社の故意または重過失による場合はこの限りではありません。</p>
          </div>
        )}
      </div>
    </main>
  );
}
