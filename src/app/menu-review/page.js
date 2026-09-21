"use client";
import React, { useState } from 'react';
import { menuData } from '@/data/menuData';

export default function MenuReviewPage() {
  const [deletedIds, setDeletedIds] = useState(new Set());

  const toggleStatus = (id) => {
    const newSet = new Set(deletedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setDeletedIds(newSet);
  };

  const generateReport = () => {
    if (deletedIds.size === 0) {
      alert("No items were deleted! The menu is perfect.");
      return;
    }

    let report = "【Menu Review Updates】\nPlease delete the following items from the website:\n\n";
    menuData.forEach(category => {
      category.items.forEach(item => {
        if (deletedIds.has(item.id)) {
          report += `- ${item.nameJp} (${item.name})\n`;
        }
      });
    });

    navigator.clipboard.writeText(report).then(() => {
      alert("✅ The list of deleted items has been copied to your clipboard! Please paste this in WhatsApp to the developer.");
    });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', backgroundColor: '#f9fafb', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 10px 0', color: '#111827' }}>Menu Review Dashboard</h1>
        <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: 0 }}>
          Tap "Keep" or "Delete" for each item. When you are finished, scroll to the bottom and click "Copy Changes" to send to the developer.
        </p>
      </div>

      {menuData.map(category => (
        <div key={category.id} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#c8a55a', borderBottom: '2px solid #c8a55a', paddingBottom: '8px', marginBottom: '16px' }}>
            {category.title} / {category.titleJp}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {category.items.map(item => {
              const isDeleted = deletedIds.has(item.id);
              return (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  backgroundColor: isDeleted ? '#fee2e2' : '#ffffff',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'background-color 0.2s',
                  border: isDeleted ? '1px solid #ef4444' : '1px solid #e5e7eb'
                }}>
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827', marginBottom: '4px' }}>
                      {item.nameJp}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '4px' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#c8a55a' }}>
                      ¥{item.price ? item.price.toLocaleString() : '---'}
                    </div>
                  </div>

                  <button 
                    onClick={() => toggleStatus(item.id)}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: isDeleted ? '#ef4444' : '#10b981',
                      color: '#ffffff',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      minWidth: '100px'
                    }}
                  >
                    {isDeleted ? 'Deleted' : 'Keep'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '80px', padding: '20px' }}>
        <button 
          onClick={generateReport}
          style={{
            backgroundColor: '#111827',
            color: '#fff',
            padding: '20px 32px',
            borderRadius: '50px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          📋 Copy Changes to Send
        </button>
      </div>
    </div>
  );
}
