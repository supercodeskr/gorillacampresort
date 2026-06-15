'use client';

import { useState } from 'react';
import { X, Calendar, Users, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BookingModal({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState(2);

  if (!isOpen) return null;

  const handleLineBooking = () => {
    if (!date) {
      alert(t('Please select a date', '日付を選択してください', 'कृपया मिति छान्नुहोस्'));
      return;
    }

    const message = t(
      `Table Reservation Request\\n\\nDate: ${date}\\nGuests: ${guests} people`,
      `テーブル予約リクエスト\\n\\n日付: ${date}\\n人数: ${guests}名`,
      `टेबल बुकिङ अनुरोध\\n\\nमिति: ${date}\\nपाहुनाहरू: ${guests} जना`
    );
    
    const encodedMessage = encodeURIComponent(message);
    const lineUrl = `https://line.me/R/msg/text/?${encodedMessage}`;
    
    window.open(lineUrl, '_blank');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '450px',
        padding: '32px',
        position: 'relative',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        animation: 'modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }} onClick={e => e.stopPropagation()}>
        
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}
        >
          <X size={24} />
        </button>

        <h2 style={{ margin: '0 0 8px', fontSize: '1.8rem', fontWeight: 800, color: '#111827' }}>
          {t('Book a Table', 'テーブルを予約する', 'टेबल बुक गर्नुहोस्')}
        </h2>
        <p style={{ margin: '0 0 32px', color: '#6b7280', fontSize: '0.95rem' }}>
          {t('Reserve your spot in the jungle.', 'ジャングルでの席を予約します。', 'जङ्गलमा तपाईंको ठाउँ बुक गर्नुहोस्।')}
        </p>

        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
          
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              <Calendar size={16} color="#c8a55a" />
              {t('Select Date & Time', '日時を選択', 'मिति र समय छान्नुहोस्')}
            </label>
            <input 
              type="datetime-local" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#374151', marginBottom: '8px' }}>
              <Users size={16} color="#c8a55a" />
              {t('Number of Guests', '人数', 'पाहुनाहरूको संख्या')}
            </label>
            <select 
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none', cursor: 'pointer', backgroundColor: '#fff' }}
            >
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
                <option key={num} value={num}>{num} {t('People', '名', 'जना')}</option>
              ))}
            </select>
          </div>

        </div>

        <button 
          onClick={handleLineBooking}
          style={{ width: '100%', backgroundColor: '#06C755', color: '#fff', border: 'none', padding: '16px', borderRadius: '100px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 8px 20px rgba(6, 199, 85, 0.3)' }}
        >
          <MessageCircle size={24} />
          {t('Request via LINE', 'LINEでリクエストする', 'LINE मार्फत अनुरोध गर्नुहोस्')}
        </button>

      </div>
      
      <style jsx global>{`
        @keyframes modalPop {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
