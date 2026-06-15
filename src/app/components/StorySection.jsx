'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'
import { Play, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [];

export default function StorySection() {
  const sectionRef = useRef(null)
  const { language, t } = useLanguage()
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax image
      gsap.from('.story-img-container', {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 30%',
          scrub: 1,
        },
      })

      // Text stagger reveal
      gsap.from('.reveal-up', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section id="story" ref={sectionRef} className="section-pad" style={{ backgroundColor: '#ffffff', position: 'relative', zIndex: 10, borderTopLeftRadius: '40px', borderTopRightRadius: '40px', marginTop: '-40px', boxShadow: '0 -20px 40px rgba(0,0,0,0.5)' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
          }}
        >
          {/* Two-column layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'center',
            }}
            className="story-grid"
          >
            {/* Left — Text */}
            <div style={{ flex: '1 1 400px' }}>
              <p
                className="reveal-up"
                style={{
                  fontSize: '0.7rem',
                  letterSpacing: '0.2em',
                  color: '#c8a55a',
                  textTransform: 'uppercase',
                  marginBottom: 16,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {t('OUR STORY', '私たちのストーリー', 'हाम्रो कथा')}
              </p>

              <h2
                className="reveal-up"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#111827',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                {t('Where the Wild Meets Luxury', '野生とラグジュアリーの融合', 'जहाँ जङ्गल र लक्जरी मिल्छ')}
              </h2>

              <p
                className="reveal-up"
                style={{
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  lineHeight: 1.7,
                  marginBottom: 16,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {t(
                  'Nestled in the lush greenery of Moroyama, Saitama, Gorilla Camp Resort is a 500㎡+ wilderness escape where nature and culinary mastery collide. Our jungle-themed grounds welcome you for an unforgettable dining experience.',
                  '埼玉県の緑豊かな毛呂山に位置するゴリラキャンプリゾートは、大自然と極上の料理が交差する500㎡+の非日常空間です。ジャングルをテーマにしたこの場所で、忘れられないお食事体験を提供します。',
                  'साइतामाको मोरोयामाको हरियालीमा अवस्थित, गोरिल्ला क्याम्प रिसोर्ट ५००㎡+ को जङ्गली आश्रय हो जहाँ प्रकृति र खानाको उत्कृष्टता मिल्छ। हाम्रो जङ्गल-थिम भएको रिसोर्टले अविस्मरणीय भोजनको अनुभव प्रदान गर्दछ।'
                )}
              </p>

              <p
                className="reveal-up"
                style={{
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  lineHeight: 1.7,
                  marginBottom: 16,
                  fontFamily: 'var(--font-inter)',
                }}
              >
                {t(
                  "From authentic Nepali Thakali sets to flame-grilled sekuwa, every dish is crafted with tradition and fire. This is not just a meal — it's a journey through the wild.",
                  '本格的なネパールのタカリセットから、直火で焼き上げたセクワまで、すべての料理は伝統と炎によって作られています。これは単なる食事ではなく、野生への旅です。',
                  'प्रामाणिक नेपाली थकाली सेटदेखि लिएर आगोमा पोलेको सेकुवासम्म, प्रत्येक परिकार परम्परा र आगोले तयार पारिएको हुन्छ। यो केवल खाना मात्र होइन — यो जङ्गलको यात्रा हो।'
                )}
              </p>
            </div>

            {/* Right — Image / Video Thumbnail */}
            <div className="story-img-container">
              <div 
                onClick={() => setIsVideoOpen(true)}
                style={{
                  display: 'block',
                  borderRadius: 24,
                  overflow: 'hidden',
                  boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
                  aspectRatio: '4 / 3',
                  position: 'relative',
                  width: '100%',
                  cursor: 'pointer',
                  group: 'video-thumb' // logical group for hover effects
                }}
                className="video-thumbnail-container"
              >
                {/* Premium Drone Shot Thumbnail */}
                <img
                  src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=1200"
                  alt="Aerial view of Gorilla Camp Resort grounds"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  className="video-thumbnail-img"
                />
                
                {/* Dark Overlay for better Play button contrast */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  transition: 'background-color 0.3s ease'
                }} className="video-overlay-bg" />

                {/* Play Button */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                  transition: 'all 0.3s ease'
                }} className="play-button">
                  <Play size={36} color="#111827" fill="#111827" style={{ marginLeft: '6px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Video Modal */}
        {isVideoOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}>
            <button 
              onClick={() => setIsVideoOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10000
              }}
            >
              <X size={40} />
            </button>
            <div style={{ 
              width: '100%', 
              maxWidth: '500px', 
              aspectRatio: '9/16', 
              borderRadius: '24px', 
              overflow: 'hidden', 
              boxShadow: '0 24px 64px rgba(0,0,0,0.5)' 
            }}>
              <video 
                src="/videos/story.mp4" 
                autoPlay 
                controls 
                playsInline 
                loop 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        )}

        <style jsx>{`
          .video-thumbnail-container:hover .video-thumbnail-img {
            transform: scale(1.05);
          }
          .video-thumbnail-container:hover .video-overlay-bg {
            background-color: rgba(0,0,0,0.4);
          }
          .video-thumbnail-container:hover .play-button {
            transform: translate(-50%, -50%) scale(1.1);
            background-color: #ffffff;
            box-shadow: 0 15px 40px rgba(0,0,0,0.4);
          }

          @media (max-width: 768px) {
            .story-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
            .stats-row {
              display: none !important;
            }
            .play-button {
              width: 60px !important;
              height: 60px !important;
            }
            .play-button svg {
              width: 28px !important;
              height: 28px !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}