'use client'

import { useState } from 'react'
import { Phone, MapPin, Clock } from 'lucide-react'

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'rgba(255,255,255,0.8)',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: '10px',
  color: '#111827',
  fontSize: '0.9rem',
  marginBottom: '16px',
  transition: 'border-color 0.2s',
  outline: 'none',
  fontFamily: 'var(--font-inter)',
  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
}

export default function BookingSection() {
  const [focused, setFocused] = useState(null)

  const getInputStyle = (name) => ({
    borderColor: focused === name ? '#c8a55a' : 'rgba(0,0,0,0.08)',
  })

  return (
    <section
      id="reserve"
      className="section-pad"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Background image */}
      <img
        src="/images/entrance.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #f9fafb 0%, rgba(249,250,251,0.8) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left column */}
        <div>
          <span
            className="reveal-up"
            style={{
              display: 'block',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#c8a55a',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Reserve
          </span>

          <h2
            className="reveal-up"
            style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 800,
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: '#111827',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Your Table Awaits
          </h2>

          <p
            className="reveal-up"
            style={{
              fontSize: '0.95rem',
              color: '#4b5563',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}
          >
            Whether it&#39;s a gathering of friends, a family celebration, or a corporate
            retreat — reserve your spot in Saitama&#39;s most unique dining experience.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div
              className="reveal-up"
              style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#111827' }}
            >
              <Phone size={16} color="#c8a55a" style={{ marginRight: '8px', flexShrink: 0 }} />
              +81-XXX-XXXX
            </div>

            <div
              className="reveal-up"
              style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#111827' }}
            >
              <MapPin size={16} color="#c8a55a" style={{ marginRight: '8px', flexShrink: 0 }} />
              Moroyama, Saitama, Japan
            </div>

            <div
              className="reveal-up"
              style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#111827' }}
            >
              <Clock size={16} color="#c8a55a" style={{ marginRight: '8px', flexShrink: 0 }} />
              Open Daily • 12:00 ~ 20:00
            </div>
          </div>
        </div>

        {/* Right column — Glass card */}
        <div
          className="card-light reveal-up"
          style={{
            padding: '40px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-outfit)',
              fontWeight: 700,
              fontSize: '1.4rem',
              color: '#111827',
              marginBottom: '24px',
            }}
          >
            Make a Reservation
          </h3>

          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Name"
              style={getInputStyle('name')}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused(null)}
            />
            <input
              type="text"
              placeholder="Date"
              style={getInputStyle('date')}
              onFocus={() => setFocused('date')}
              onBlur={() => setFocused(null)}
            />
            <input
              type="text"
              placeholder="Party Size"
              style={getInputStyle('party')}
              onFocus={() => setFocused('party')}
              onBlur={() => setFocused(null)}
            />

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#c8a55a',
                color: '#ffffff',
                fontWeight: 700,
                padding: '16px',
                borderRadius: '10px',
                fontSize: '0.95rem',
                cursor: 'pointer',
                border: 'none',
                transition: 'opacity 0.2s',
                fontFamily: 'var(--font-inter)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Reserve Now
            </button>
          </form>
        </div>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #reserve > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
        #reserve input::placeholder {
          color: #9ca3af;
        }
      `}</style>
    </section>
  )
}
