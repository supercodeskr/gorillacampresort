'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'Experience', href: '/#story' },
  { label: 'Reserve', href: '/reserve' },
];

const legalLinks = [
  { label: 'Company Profile', labelJp: '会社概要', labelNp: 'कम्पनी प्रोफाइल', href: '/company' },
  { label: 'Privacy Policy', labelJp: 'プライバシーポリシー', labelNp: 'गोपनीयता नीति', href: '/privacy-policy' },
  { label: 'Terms & Conditions', labelJp: '利用規約', labelNp: 'नियम र सर्तहरू', href: '/terms' },
  { label: 'Specified Commercial Transactions (Tokushoho)', labelJp: '特定商取引法に基づく表記', labelNp: 'निर्दिष्ट व्यावसायिक कारोबार (तोकुसोहो)', href: '/tokushoho' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: '#111827', // Dark jungle aesthetic
        color: '#f9fafb',
        padding: '80px 0 100px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Smoke Aesthetic Background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1517594422361-5e18d04a796e?auto=format&fit=crop&q=80&w=2000")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, #111827, transparent)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Image
              src="/images/logo.png"
              alt="Gorilla Camp Resort"
              width={160}
              height={45}
              style={{ height: 45, width: 'auto', marginBottom: 20 }}
            />
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.85rem',
                color: '#9ca3af',
                lineHeight: 1.6,
                maxWidth: 280,
                margin: '0 0 16px 0',
              }}
            >
              {t(
                'Saitama\'s premier wilderness dining experience. 100+ Guest Capacity, 5+ Cuisine Styles, and over 500m² of Jungle Oasis.',
                '埼玉のプレミアな野生のダイニング体験。100名以上の収容人数、5種類以上の料理スタイル、そして500平方メートルを超えるジャングルのオアシス。',
                'साइतामाको प्रिमियर जङ्गल डाइनिङ अनुभव। १००+ अतिथि क्षमता, ५+ भोजन शैलीहरू, र ५०० वर्ग मिटर भन्दा बढी जङ्गल ओएसिस।'
              )}
            </p>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              {t('Legal', '法的情報', 'कानूनी')}
            </h4>
            <nav>
              {legalLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[0.85rem] text-gray-400 mb-3 no-underline transition-colors duration-200 hover:text-[#c8a55a]"
                >
                  {t(link.label, link.labelJp, link.labelNp)}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              {t('Contact Us', 'お問い合わせ', 'सम्पर्क गर्नुहोस')}
            </h4>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong style={{ color: '#c8a55a', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('Phone', '電話', 'फोन')}</strong>
                +81 80-3029-3495
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong style={{ color: '#c8a55a', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('Address', '住所', 'ठेगाना')}</strong>
                Saitamaken Kawagoe shi<br />
                Matoba kita 2-4-12 (2F)<br />
                350-1102 Japan
              </p>
              <p style={{ margin: 0 }}>
                <strong style={{ color: '#c8a55a', display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{t('Website', 'ウェブサイト', 'वेबसाइट')}</strong>
                www.Gorillacampresort.com
              </p>
            </div>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'var(--font-outfit)',
                fontWeight: 700,
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '0.05em',
                marginTop: 0,
                marginBottom: 20,
              }}
            >
              {t('Location', 'ロケーション', 'स्थान')}
            </h4>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', height: '220px', width: '100%', backgroundColor: '#1f2937' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3229.6381958438233!2d139.32711637490914!3d35.955819714842825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60192ba025309d17%3A0x64121d3c35308e05!2sGorilla%20Camp%20Resort!5e0!3m2!1sen!2snp!4v1781557544166!5m2!1sen!2snp" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.75rem',
              color: '#6b7280',
              margin: 0,
            }}
          >
            &copy; 2026 Gorilla Camp Resort. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="https://www.instagram.com/gorillacampresort?igsh=M3ZvaDFrMWNsM3hk" target="_blank" rel="noopener noreferrer" className="block text-[0.85rem] text-gray-400 no-underline transition-colors duration-200 hover:text-[#c8a55a]">Instagram</a>
            <a href="https://www.facebook.com/share/1CzsvceMuS/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="block text-[0.85rem] text-gray-400 no-underline transition-colors duration-200 hover:text-[#c8a55a]">Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
