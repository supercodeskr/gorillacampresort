'use client';

import { Clock, Flame } from 'lucide-react';
import { ScrollReveal } from './MicroInteractions';

export default function PreOrderBar() {
  return (
    <ScrollReveal className="relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative rounded-2xl overflow-hidden animate-glow">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-charred via-charred-light to-charred" />
          <div className="absolute inset-0 bg-gradient-to-r from-ember/5 via-ember/10 to-ember/5" />

          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border border-ember/30" />

          {/* Content */}
          <div className="relative px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-ember/20 flex items-center justify-center flex-shrink-0">
                <Flame size={24} className="text-ember" />
              </div>
              <Clock size={20} className="text-gold hidden sm:block" />
            </div>

            <div>
              <p className="font-outfit font-bold text-base md:text-lg text-cream">
                🔥 2時間前予約制 — Pre-Order Required
              </p>
              <p className="font-inter text-xs md:text-sm text-cream/50 mt-1">
                BBQプラッターは最高の味のために2時間前の事前注文が必要です
              </p>
              <p className="font-inter text-xs text-cream/30 mt-0.5">
                BBQ Platters require 2-hour advance booking for peak flavor
              </p>
            </div>

            <a
              href="#booking"
              className="flex-shrink-0 px-6 py-2.5 rounded-full bg-gradient-to-r from-ember to-ember-light text-white text-sm font-bold hover:scale-105 transition-transform duration-300 shadow-lg shadow-ember/20"
            >
              事前注文
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
