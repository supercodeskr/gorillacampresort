import React from 'react';
import { Car, Flame, Music, Sparkles } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <Car className="w-10 h-10 text-green-500" />,
      title: 'Step 1: Arrive Empty-Handed',
      subtitle: '手ぶらでご来場',
      description: 'Just bring yourself. No need to carry heavy equipment or ingredients.'
    },
    {
      icon: <Flame className="w-10 h-10 text-green-500" />,
      title: 'Step 2: We prep the grill & meat',
      subtitle: '準備はすべてお任せ',
      description: 'Our staff will have the grill hot and the premium meats ready to go.'
    },
    {
      icon: <Music className="w-10 h-10 text-green-500" />,
      title: 'Step 3: Enjoy BBQ, Pool & Karaoke',
      subtitle: 'BBQとプールを満喫',
      description: 'Eat, swim, sing, and relax in our luxurious jungle environment.'
    },
    {
      icon: <Sparkles className="w-10 h-10 text-green-500" />,
      title: 'Step 4: Leave the cleanup to us!',
      subtitle: '片付け不要で帰宅',
      description: 'When you are done, just walk away. We handle all the messy cleanup.'
    }
  ];

  return (
    <section className="bg-[#0a0f0d] text-white py-24 px-6 sm:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal-up">
          <h2 className="text-4xl md:text-5xl font-bold text-green-500 font-serif mb-4">How It Works</h2>
          <p className="text-gray-400 text-lg">Your seamless premium BBQ experience</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-[#121c17] rounded-xl border border-green-900/30 reveal-up">
              <div className="w-20 h-20 bg-green-900/20 rounded-full flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-1">{step.title}</h3>
              <p className="text-green-400 text-sm font-medium mb-4">{step.subtitle}</p>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
