'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Flame, UtensilsCrossed, TreePine, DoorOpen, ChefHat } from 'lucide-react';
import { ScrollReveal } from './MicroInteractions';

const zones = [
  { id: 'entrance', label: 'エントランス', labelEN: 'Entrance', icon: DoorOpen, x: 2, y: 5, w: 8, h: 4, color: '#D4AF37', capacity: null },
  { id: 'bbq-pit', label: 'BBQピットゾーン', labelEN: 'BBQ Pit Zone', icon: Flame, x: 18, y: 3, w: 28, h: 8, color: '#FF6B00', capacity: 40 },
  { id: 'dining-left', label: 'ダイニングデッキ A', labelEN: 'Dining Deck A', icon: UtensilsCrossed, x: 12, y: 12, w: 16, h: 4, color: '#2D5A32', capacity: 25 },
  { id: 'dining-right', label: 'ダイニングデッキ B', labelEN: 'Dining Deck B', icon: UtensilsCrossed, x: 36, y: 12, w: 16, h: 4, color: '#2D5A32', capacity: 25 },
  { id: 'campfire', label: 'キャンプファイヤー', labelEN: 'Night Out Campfire', icon: TreePine, x: 55, y: 5, w: 12, h: 8, color: '#FF6B00', capacity: 20 },
  { id: 'kitchen', label: 'キッチン', labelEN: 'Kitchen & Prep', icon: ChefHat, x: 48, y: 1, w: 6, h: 4, color: '#1A3A1F', capacity: null },
];

export default function ResortMap() {
  const [activeZone, setActiveZone] = useState(null);

  return (
    <section id="map" className="relative z-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-gold/5 mb-6">
              <Users size={16} className="text-gold" />
              <span className="font-inter text-xs text-gold tracking-widest uppercase">Resort Layout</span>
            </div>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl md:text-5xl text-cream mb-4">
              リゾート<span className="text-gold">マップ</span>
            </h2>
            <p className="font-inter text-cream/50 text-sm md:text-base max-w-xl mx-auto">
              500㎡+ (32.5m × 15.5m) の広大な敷地 — 100名収容可能
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card p-6 md:p-10">
            {/* Property dimensions label */}
            <div className="flex items-center justify-between mb-4 text-xs font-inter text-cream/30">
              <span>0m</span>
              <span>← 32.5m →</span>
              <span>32.5m</span>
            </div>

            {/* Map SVG */}
            <div className="relative w-full overflow-x-auto hide-scrollbar">
              <svg
                viewBox="0 0 70 18"
                className="w-full min-w-[600px] h-auto"
                style={{ maxHeight: '300px' }}
              >
                {/* Property boundary */}
                <rect
                  x="0.5" y="0.5" width="69" height="17"
                  rx="1"
                  fill="none"
                  stroke="rgba(212,175,55,0.2)"
                  strokeWidth="0.3"
                  strokeDasharray="1,0.5"
                />

                {/* Grid lines */}
                {[...Array(14)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={(i + 1) * 5} y1="0.5" x2={(i + 1) * 5} y2="17.5"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="0.1"
                  />
                ))}

                {/* Zones */}
                {zones.map((zone) => (
                  <g
                    key={zone.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveZone(zone.id)}
                    onMouseLeave={() => setActiveZone(null)}
                    onClick={() => setActiveZone(activeZone === zone.id ? null : zone.id)}
                  >
                    <rect
                      x={zone.x}
                      y={zone.y}
                      width={zone.w}
                      height={zone.h}
                      rx="0.5"
                      fill={`${zone.color}20`}
                      stroke={zone.color}
                      strokeWidth={activeZone === zone.id ? '0.4' : '0.2'}
                      className="transition-all duration-300"
                    />
                    {/* Glow effect for campfire */}
                    {zone.id === 'campfire' && (
                      <circle
                        cx={zone.x + zone.w / 2}
                        cy={zone.y + zone.h / 2}
                        r="4"
                        fill="url(#campfireGlow)"
                        className="animate-pulse"
                        opacity="0.3"
                      />
                    )}
                    {/* Zone label */}
                    <text
                      x={zone.x + zone.w / 2}
                      y={zone.y + zone.h / 2 + 0.4}
                      textAnchor="middle"
                      fill="rgba(245,240,232,0.7)"
                      fontSize="1.2"
                      fontFamily="var(--font-inter)"
                    >
                      {zone.labelEN}
                    </text>
                  </g>
                ))}

                {/* Gradient definitions */}
                <defs>
                  <radialGradient id="campfireGlow">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>

            {/* Zone Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
              {zones.map((zone) => {
                const Icon = zone.icon;
                return (
                  <div
                    key={zone.id}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      activeZone === zone.id ? 'bg-white/5 border border-white/10' : 'hover:bg-white/3'
                    }`}
                    onMouseEnter={() => setActiveZone(zone.id)}
                    onMouseLeave={() => setActiveZone(null)}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${zone.color}20` }}
                    >
                      <Icon size={16} style={{ color: zone.color }} />
                    </div>
                    <div>
                      <p className="font-inter text-xs text-cream/80">{zone.label}</p>
                      {zone.capacity && (
                        <p className="font-inter text-xs text-cream/40">{zone.capacity}名</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total Capacity Badge */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-gold">
                <Users size={18} className="text-gold" />
                <span className="font-outfit font-bold text-gold text-sm">
                  総収容人数: 100名 — Total Capacity: 100 Guests
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <div className="jungle-divider mt-20 mx-8" />
      </div>
    </section>
  );
}
