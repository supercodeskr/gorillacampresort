import React from 'react';

export default function PricingSection() {
  return (
    <section className="bg-[#0a0f0d] text-white py-20 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-green-500 font-serif reveal-up">Premium Courses</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Day Course */}
          <div className="bg-[#121c17] rounded-2xl p-8 border border-green-900/50 hover:border-green-500/50 transition-colors duration-300 relative overflow-hidden group reveal-up">
            <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">All-Inclusive (全部コミコミ)</div>
            <h3 className="text-2xl font-bold mb-2">Day Course</h3>
            <p className="text-green-400 font-medium mb-6">120 mins</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">¥4,999</span>
              <span className="text-gray-400 ml-2">/ person</span>
            </div>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Premium BBQ Set included</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Equipment & Preparation included</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Full access to Pool</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Cleanup handled by staff</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-green-700 hover:bg-green-600 transition-colors font-bold text-white">Book Day Course</button>
          </div>

          {/* Night Course */}
          <div className="bg-[#121c17] rounded-2xl p-8 border border-green-900/50 hover:border-green-500/50 transition-colors duration-300 relative overflow-hidden group reveal-up">
            <div className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">All-Inclusive (全部コミコミ)</div>
            <h3 className="text-2xl font-bold mb-2">Night Course</h3>
            <p className="text-green-400 font-medium mb-6">180 mins</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">¥7,999</span>
              <span className="text-gray-400 ml-2">/ person</span>
            </div>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Premium BBQ Set included</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Equipment & Preparation included</li>
              <li className="flex items-center"><span className="text-green-500 mr-2">✓</span> Full access to Pool & Karaoke</li>
              <li className="flex items-center text-green-300 font-semibold"><span className="text-green-500 mr-2">✓</span> Unlimited Time Upgrade (+¥1,500)</li>
            </ul>
            <button className="w-full py-3 rounded-lg bg-green-700 hover:bg-green-600 transition-colors font-bold text-white">Book Night Course</button>
          </div>
        </div>
      </div>
    </section>
  );
}
