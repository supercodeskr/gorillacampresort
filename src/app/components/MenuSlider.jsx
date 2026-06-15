'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menuData = [
  {
    category: 'Nepali Set',
    items: [
      { name: 'Mutton Khana Set', price: '¥1,500', desc: 'Mutton Curry, Dal Curry, Mulako Achar, Sag, Papad' },
      { name: 'Chicken Khana Set', price: '¥1,300', desc: 'Chicken Curry, Dal Curry, Mulako Achar, Sag, Papad' },
      { name: 'Pork Khana Set', price: '¥1,300', desc: 'Pork Curry, Dal Curry, Mulako Achar, Sag, Papad' },
      { name: 'Veg Khana Set', price: '¥1,100', desc: 'Veg Curry, Dal Curry, Mulako Achar, Sag, Papad' },
      { name: 'Sukuti Khana Set', price: '¥1,500', desc: 'Sukuti, Dal Curry, Mulako Achar, Sag, Papad' },
    ],
  },
  {
    category: 'Thakali Set',
    items: [
      { name: 'Mutton Thakali Set', price: '¥1,700', desc: 'Mutton Curry, Dal, Mulako Achar, Chatni, Sag, Gundruk Sadeko, Papad, Salad, Ghee, Soft drink' },
      { name: 'Chicken Thakali Set', price: '¥1,300', desc: 'Chicken Curry, Dal, Mulako Achar, Chatni, Sag, Gundruk Sadeko, Papad, Salad, Ghee, Soft drink' },
      { name: 'Pork Thakali Set', price: '¥1,300', desc: 'Pork Curry, Dal, Mulako Achar, Chatni, Sag, Gundruk Sadeko, Papad, Salad, Ghee, Soft drink' },
      { name: 'Veg Thakali Set', price: '¥1,100', desc: 'Veg Curry, Dal, Mulako Achar, Chatni, Sag, Gundruk Sadeko, Papad, Salad, Ghee, Soft drink' },
    ],
  },
  {
    category: 'Dhido Set',
    items: [
      { name: 'Mutton Dhido Set', price: '¥1,700', desc: 'Dhido, Mutton Curry, Dal, Gundruk Sadeko, Mulako Achar, Sag, Ghee, Soft drink' },
      { name: 'Chicken Dhido Set', price: '¥1,500', desc: 'Dhido, Chicken Curry, Dal, Gundruk Sadeko, Mulako Achar, Sag, Ghee, Soft drink' },
    ],
  },
  {
    category: 'Curry',
    items: [
      { name: 'Mutton Curry', price: '¥1,000' },
      { name: 'Chicken Curry', price: '¥800' },
      { name: 'Pork Curry', price: '¥800' },
      { name: 'Veg Curry', price: '¥600' },
      { name: 'Dal', price: '¥400' },
    ],
  },
  {
    category: 'Sekuwa & Choila',
    items: [
      { name: 'Mutton Sekuwa', price: '¥1,200' },
      { name: 'Chicken Sekuwa', price: '¥900' },
      { name: 'Pork Sekuwa', price: '¥900' },
      { name: 'Mutton Choila', price: '¥1,000' },
      { name: 'Chicken Choila', price: '¥700' },
      { name: 'Pork Choila', price: '¥700' },
    ],
  },
  {
    category: 'Snacks & Momo',
    items: [
      { name: 'Momo (Chicken)', price: '¥800' },
      { name: 'Momo (Veg)', price: '¥700' },
      { name: 'Chatpate', price: '¥500' },
      { name: 'Samosa', price: '¥400', desc: '2 pieces' },
      { name: 'Papad', price: '¥200' },
    ],
  },
];

const categories = ['All', 'Nepali Set', 'Thakali Set', 'Dhido Set', 'Curry', 'Sekuwa & Choila', 'Snacks & Momo'];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export default function MenuSlider() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredData =
    activeCategory === 'All'
      ? menuData
      : menuData.filter((group) => group.category === activeCategory);

  return (
    <section id="menu" className="section-pad" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        {/* Header */}
        <p
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            color: '#c8a55a',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: 16,
            fontFamily: 'var(--font-inter)',
          }}
        >
          OUR MENU
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-outfit)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#111827',
            textAlign: 'center',
            marginBottom: 8,
            lineHeight: 1.1,
          }}
        >
          Taste the Wild
        </h2>
        <p
          style={{
            fontSize: '0.95rem',
            color: '#4b5563',
            textAlign: 'center',
            marginBottom: 48,
            fontFamily: 'var(--font-inter)',
          }}
        >
          From the flames of Saitama&rsquo;s jungle kitchen
        </p>

        {/* Category Tabs */}
        <div
          className="hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: 8,
            marginBottom: 48,
            justifyContent: 'center',
            paddingBottom: 4,
          }}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 100,
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: isActive ? '#c8a55a' : 'var(--color-elevated)',
                  color: isActive ? '#ffffff' : '#4b5563',
                  border: isActive
                    ? '1px solid transparent'
                    : '1px solid rgba(0,0,0,0.08)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-inter)',
                  flexShrink: 0,
                  boxShadow: isActive ? '0 4px 12px rgba(200, 165, 90, 0.3)' : '0 2px 8px rgba(0,0,0,0.03)',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredData.map((group) => (
              <motion.div key={group.category} variants={itemVariants} style={{ marginBottom: 48 }}>
                {/* Category Heading */}
                <h3
                  style={{
                    fontFamily: 'var(--font-outfit)',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    color: '#111827',
                    marginBottom: 20,
                    borderLeft: '3px solid #c8a55a',
                    paddingLeft: 16,
                    lineHeight: 1.3,
                  }}
                >
                  {group.category}
                </h3>

                {/* Items */}
                {group.items.map((item, idx) => (
                  <motion.div
                    key={`${group.category}-${idx}`}
                    variants={itemVariants}
                    style={{ marginBottom: item.desc ? 20 : 16 }}
                  >
                    <div className="menu-item-row">
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: '0.95rem',
                          color: '#111827',
                          whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {item.name}
                      </span>
                      <span className="menu-dots" />
                      <span
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#c8a55a',
                          whiteSpace: 'nowrap',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {item.price}
                      </span>
                    </div>
                    {item.desc && (
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#4b5563',
                          marginTop: 4,
                          lineHeight: 1.5,
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
