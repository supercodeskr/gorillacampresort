import React from 'react';
import Image from 'next/image';

export default function FacilityMapSection() {
  return (
    <section className="bg-[#0a0f0d] text-white py-24 px-6 sm:px-12 lg:px-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold text-green-500 font-serif mb-4">Explore the Resort</h2>
          <p className="text-gray-400 text-lg">Discover our premium facilities</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-green-900/20 border border-green-900/50 reveal-up">
          <Image
            src="/images/facility_map.jpg"
            alt="Facility Map"
            fill
            className="object-cover"
            priority
          />
          
          {/* Labels Overlay */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
          
          <div className="absolute top-1/4 left-1/4 bg-[#0a0f0d]/80 backdrop-blur-sm border border-green-500 px-4 py-2 rounded-lg text-sm md:text-base font-bold shadow-lg animate-pulse">
            🏊‍♂️ Resort Pool
          </div>
          
          <div className="absolute top-1/2 right-1/4 bg-[#0a0f0d]/80 backdrop-blur-sm border border-green-500 px-4 py-2 rounded-lg text-sm md:text-base font-bold shadow-lg animate-pulse" style={{ animationDelay: '0.5s' }}>
            🎤 VIP Karaoke
          </div>
          
          <div className="absolute bottom-1/4 left-1/3 bg-[#0a0f0d]/80 backdrop-blur-sm border border-green-500 px-4 py-2 rounded-lg text-sm md:text-base font-bold shadow-lg animate-pulse" style={{ animationDelay: '1s' }}>
            🏕️ Glamping Tents
          </div>
        </div>
      </div>
    </section>
  );
}
