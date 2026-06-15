'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Flame, Coffee, Gamepad2, Utensils, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const experiences = [
  {
    id: 'bbq',
    titleEn: 'BBQ & Beer Garden',
    titleJp: 'BBQ＆ビアガーデン',
    titleNp: 'BBQ र बियर गार्डेन',
    descEn: 'Experience premium flame-grilled meats and ice-cold beer served in giant bamboo mugs under the open sky.',
    descJp: '開放的な空の下で、特大の竹ジョッキで提供される冷たいビールと最高級の直火焼き肉をお楽しみください。',
    descNp: 'खुल्ला आकाशमुनि विशाल बाँसको मगमा सर्भ गरिएको चिसो बियर र प्रिमियम आगोमा पोलेको मासुको स्वाद लिनुहोस्।',
    img: '/images/experiences/bbq_meat.jpg',
    img2: '/images/experiences/bbq_mugs_full.png',
    icon: Flame
  },
  {
    id: 'coffee',
    titleEn: 'Jungle Coffee Bar',
    titleJp: 'ジャングル・コーヒーバー',
    titleNp: 'जङ्गल कफी बार',
    descEn: 'Relax with artisanal roasted coffee and specialty drinks in our lush, uniquely crafted outdoor seating.',
    descJp: '緑豊かでユニークなデザインの屋外席にて、こだわりの焙煎コーヒーと特製ドリンクでリラックスしたひとときを。',
    descNp: 'हाम्रो हरियाली र विशेष रूपमा डिजाइन गरिएको बाहिरी बस्ने ठाउँमा उत्कृष्ट कफी र विशेष ड्रिंक्सको साथ आराम गर्नुहोस्।',
    img: '/images/experiences/coffee_bar_setup.png',
    icon: Coffee
  },
  {
    id: 'entertainment',
    titleEn: 'RC Racing & Karaoke',
    titleJp: 'ラジコンカー＆カラオケ',
    titleNp: 'आरसी रेसिङ र कराओके',
    descEn: 'Thrilling RC car tracks weaving through the resort and a premium sound system for endless entertainment.',
    descJp: 'リゾート内を縫うように走るスリリングなラジコンコースと、最高のエンターテイメントを提供するプレミアムサウンドシステム。',
    descNp: 'रिसोर्टभित्र रहेको रोमाञ्चक आरसी कार ट्र्याक र अनन्त मनोरन्जनको लागि प्रिमियम साउन्ड सिस्टम।',
    img: '/images/experiences/rc_track.jpg',
    img2: '/images/experiences/rc_night.png',
    icon: Gamepad2
  },
  {
    id: 'curry',
    titleEn: 'Authentic Indian Curry & Naan',
    titleJp: '本格的なインドカレーとナン',
    titleNp: 'प्रामाणिक भारतीय करी र नान',
    descEn: 'Savor the rich, complex flavors of our chef-prepared authentic Indian curries and freshly baked naan.',
    descJp: 'シェフ特製の本格的なインドカレーと、焼きたてナンの奥深い味わいをご堪能ください。',
    descNp: 'हाम्रो शेफद्वारा तयार पारिएको प्रामाणिक भारतीय करी र ताजा बेक गरिएको नानको उत्कृष्ट स्वादको आनन्द लिनुहोस्।',
    img: '/images/experiences/curry_naan.png',
    icon: Utensils
  }
];

export default function ExperienceSection() {
  const { language, t } = useLanguage();
  const [activeId, setActiveId] = useState('bbq');

  return (
    <section style={{ backgroundColor: '#111827', padding: '120px 0', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Decor */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none', backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: '60px', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <p style={{ color: '#c8a55a', fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px', fontWeight: 700 }}>
          {t('Discover The Resort', 'リゾートの魅力を発見', 'हाम्रो रिसोर्टको बारेमा जान्नुहोस्')}
        </p>
        <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '3rem', fontWeight: 900, color: '#ffffff', marginBottom: '16px' }}>
          {t('Four Unique Experiences', '4つの特別な体験', 'चार विशेष अनुभवहरू')}
        </h2>
        <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          {t(
            'Whether you are craving adrenaline, relaxation, or culinary mastery, we have something for everyone.',
            'スリル、リラクゼーション、あるいは極上のグルメなど、すべてのお客様に満足いただける体験をご用意しています。',
            'रोमाञ्चक साहसिक कार्य, शान्ति र आराम, वा उत्कृष्ट खाना - हामीसँग सबैको लागि केही न केही छ।'
          )}
        </p>
      </div>

      {/* Interactive Horizontal Accordion */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <div className="accordion-container">
          {experiences.map((exp) => {
            const isActive = activeId === exp.id;
            
            return (
              <div 
                key={exp.id}
                className={`accordion-panel ${isActive ? 'active' : ''}`}
                onClick={() => setActiveId(exp.id)}
                onMouseEnter={() => setActiveId(exp.id)}
              >
                {/* Background Image(s) */}
                {exp.img2 ? (
                  <>
                    <div 
                      className="accordion-bg"
                      style={{ backgroundImage: `url(${exp.img2})` }}
                    />
                    <div 
                      className="accordion-bg fading-bg"
                      style={{ backgroundImage: `url(${exp.img})` }}
                    />
                  </>
                ) : (
                  <div 
                    className="accordion-bg"
                    style={{ backgroundImage: `url(${exp.img})` }}
                  />
                )}
                <div className="accordion-overlay" />

                {/* Content inside panel */}
                <div className="accordion-content">
                  <div className="accordion-icon-box">
                    <exp.icon color={isActive ? '#c8a55a' : '#ffffff'} size={28} />
                  </div>
                  
                  <div className="accordion-text">
                    <h3 style={{ 
                      fontSize: isActive ? '1.8rem' : '1.2rem', 
                      fontWeight: 800, 
                      color: '#ffffff', 
                      marginBottom: '8px', 
                      fontFamily: 'var(--font-outfit)',
                      transition: 'all 0.4s ease',
                      whiteSpace: 'nowrap'
                    }}>
                      {t(exp.titleEn, exp.titleJp, exp.titleNp)}
                    </h3>
                    
                    <div className="accordion-desc-wrapper" style={{ opacity: isActive ? 1 : 0, maxHeight: isActive ? '100px' : '0px' }}>
                      <p style={{ color: '#d1d5db', lineHeight: 1.6, fontSize: '1rem', margin: 0, paddingRight: '20px' }}>
                        {t(exp.descEn, exp.descJp, exp.descNp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>


      {/* Strong Call To Action (CTA) */}
      <div style={{ textAlign: 'center', marginTop: '80px', position: 'relative', zIndex: 10, padding: '0 24px' }}>
        <h3 style={{ color: '#ffffff', fontSize: '1.8rem', fontFamily: 'var(--font-outfit)', fontWeight: 800, marginBottom: '24px' }}>
          {t('Ready for the Ultimate Jungle Getaway?', '最高のジャングルリゾートを体験しませんか？', 'के तपाई उत्कृष्ट जङ्गल रिसोर्टको अनुभव लिन तयार हुनुहुन्छ?')}
        </h3>
        <Link href="/menu" style={{ textDecoration: 'none' }}>
          <button style={{
            backgroundColor: '#c8a55a',
            color: '#111827',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '100px',
            fontSize: '1.1rem',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 25px rgba(200, 165, 90, 0.4)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(200, 165, 90, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(200, 165, 90, 0.4)';
          }}
          >
            {t('Book Your Experience Now', '今すぐ体験を予約する', 'अहिले नै आफ्नो अनुभव बुक गर्नुहोस्')}
            <ArrowRight size={20} />
          </button>
        </Link>
      </div>

      <style jsx global>{`
        .accordion-container {
          display: flex;
          gap: 16px;
          height: 500px;
          width: 100%;
        }

        .accordion-panel {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          flex: 1;
          transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          min-width: 80px;
        }

        .accordion-panel.active {
          flex: 4;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .accordion-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: all 0.6s ease;
          filter: grayscale(40%);
        }

        .accordion-panel.active .accordion-bg {
          filter: grayscale(0%);
          transform: scale(1.05);
        }

        .fading-bg {
          animation: fadeAlternating 2.5s infinite alternate ease-in-out;
        }

        @keyframes fadeAlternating {
          0%, 45% { opacity: 1; }
          55%, 100% { opacity: 0; }
        }

        .accordion-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(17,24,39,0.95) 0%, rgba(17,24,39,0.4) 40%, transparent 100%);
          transition: opacity 0.4s ease;
        }

        .accordion-panel:not(.active) .accordion-overlay {
          background: rgba(17,24,39,0.6);
        }

        .accordion-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 30px;
          display: flex;
          align-items: flex-end;
          gap: 20px;
          z-index: 2;
        }

        .accordion-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.4s ease;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .accordion-panel.active .accordion-icon-box {
          background: #ffffff;
          border-color: #ffffff;
        }

        .accordion-text {
          flex: 1;
          overflow: hidden;
        }

        .accordion-desc-wrapper {
          transition: all 0.5s ease;
          overflow: hidden;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .accordion-container {
            flex-direction: column;
            height: auto;
          }
          .accordion-panel {
            min-height: 300px;
            flex: none !important; /* Disable accordion flex behavior on mobile */
            box-shadow: 0 10px 25px rgba(0,0,0,0.3) !important;
          }
          .accordion-panel .accordion-bg {
            filter: grayscale(0%) !important;
          }
          .accordion-desc-wrapper {
            opacity: 1 !important;
            max-height: 200px !important;
          }
          .accordion-panel .accordion-icon-box {
            background: #ffffff !important;
            border-color: #ffffff !important;
          }
          .accordion-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 24px;
          }
          .accordion-icon-box {
            width: 48px;
            height: 48px;
          }
          .accordion-text h3 {
            white-space: normal !important;
            font-size: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
