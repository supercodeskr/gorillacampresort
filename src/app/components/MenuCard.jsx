'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, Flame } from 'lucide-react';
import { TiltCard } from './MicroInteractions';

/* Spice particle effect for Indian dish */
function SpiceParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${20 + ((i * 37 + 13) % 60)}%`,
      delay: `${(i * 0.25) % 2}s`,
      duration: `${1.5 + (i * 0.12)}s`,
      size: 3 + (i % 3),
    })), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {particles.map((p) => (
        <div
          key={p.id}
          className="spice-particle"
          style={{
            left: p.left,
            bottom: '30%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}
    </div>
  );
}

export default function MenuCard({ dish, index }) {
  const {
    country,
    flag,
    nameJP,
    nameEN,
    price,
    image,
    badge,
    badgeType,
    description,
    effect,
    accentColor,
  } = dish;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex-shrink-0 w-[300px] sm:w-[340px]"
    >
      <TiltCard className="h-full" intensity={10}>
        <div
          className="glass-card overflow-hidden h-full flex flex-col group"
          style={accentColor ? { borderColor: accentColor } : {}}
        >
          {/* Image */}
          <div className="relative w-full h-[220px] overflow-hidden">
            <Image
              src={image}
              alt={nameEN}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="340px"
            />
            {/* Country badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-sm border border-white/8">
              <Globe size={14} className="text-gold" />
              <span className="text-cream/90 font-inter text-xs font-semibold">{country}</span>
            </div>

            {/* Special badge */}
            {badge && (
              <div className="absolute top-3 right-3">
                {badgeType === 'premium' && (
                  <span className="premium-badge">Premium Cut</span>
                )}
                {badgeType === 'smoked' && (
                  <span className="px-3 py-1 rounded-full bg-charred/90 border border-ember/40 text-ember text-xs font-bold flex items-center gap-1">
                    <Flame size={12} /> 12hr Smoked
                  </span>
                )}
                {badgeType === 'salt' && (
                  <span className="px-3 py-1 rounded-full bg-charred/90 border border-cream/20 text-cream/80 text-xs font-bold">
                    Sea-Salt Crust
                  </span>
                )}
              </div>
            )}

            {/* Spice particles for Indian dish */}
            {effect === 'spice' && <SpiceParticles />}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-charred via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="font-outfit font-bold text-xl text-cream mb-1 heat-wave-text">
              {nameJP}
            </h3>
            <p className="font-inter text-sm text-cream/50 mb-3">{nameEN}</p>
            <p className="font-inter text-xs text-cream/40 mb-4 leading-relaxed flex-1">
              {description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="font-outfit font-black text-2xl text-gold">
                ¥{price.toLocaleString()}
              </span>
              <button className="px-4 py-2 rounded-full bg-ember/10 border border-ember/30 text-ember text-sm font-semibold hover:bg-ember/20 transition-all duration-300">
                注文する
              </button>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
