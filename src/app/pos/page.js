'use client';

import { useState, useEffect } from 'react';
import { menuData } from '@/data/menuData';
import { Printer, Trash2, Plus, Minus, Receipt, Edit3 } from 'lucide-react';
import Image from 'next/image';

export default function POS() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [isClient, setIsClient] = useState(false);
  
  // Custom item state
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [customQty, setCustomQty] = useState(1);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const addToOrder = (item) => {
    setOrderItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing && !item.isCustom) {
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: item.qty || 1 }];
    });
  };

  const addCustomItem = () => {
    if (!customName || !customPrice) return;
    
    addToOrder({
      id: `custom-${Date.now()}`,
      name: customName,
      price: Number(customPrice),
      qty: customQty,
      isCustom: true
    });
    
    setCustomName('');
    setCustomPrice('');
    setCustomQty(1);
    setShowCustom(false);
  };

  const updateQty = (id, delta) => {
    setOrderItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setOrderItems(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const tax = Math.floor(subtotal * 0.10); // 10% tax
  const total = subtotal + tax;

  const handlePrint = () => {
    window.print();
    setTimeout(() => {
      if (window.confirm('Clear order and prepare for next customer?')) {
        setOrderItems([]);
        setOrderNumber(n => n + 1);
      }
    }, 1000);
  };

  const padZero = (num) => num.toString().padStart(2, '0');
  const d = new Date();
  const invoiceDate = `${padZero(d.getDate())}-${padZero(d.getMonth() + 1)}-${d.getFullYear()}`;
  const invoiceNo = `GCR-${d.getFullYear()}${padZero(d.getMonth() + 1)}${padZero(d.getDate())}-${padZero(orderNumber)}`;

  if (!isClient) return null;

  return (
    <div className="pos-container" style={{ display: 'flex', height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'var(--font-inter)' }}>
      
      {/* LEFT PANEL - Menu Grid */}
      <div className="pos-menu" style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', margin: 0 }}>Gorilla POS Terminal</h1>
          <a href="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Back to Website</a>
        </div>

        <button 
          onClick={() => setShowCustom(!showCustom)}
          style={{ width: '100%', padding: '16px', backgroundColor: '#111827', color: '#fff', borderRadius: '12px', border: 'none', fontWeight: 'bold', marginBottom: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Edit3 size={20} />
          {showCustom ? 'Cancel Custom Item' : 'Add Custom Item / Discount'}
        </button>

        {showCustom && (
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e5e7eb', display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
            <div style={{ flex: 2 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px' }}>Item Name (e.g. Discount / Service Fee)</label>
              <input value={customName} onChange={e => setCustomName(e.target.value)} type="text" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} placeholder="Enter name" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px' }}>Price (use - for discount)</label>
              <input value={customPrice} onChange={e => setCustomPrice(e.target.value)} type="number" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} placeholder="¥0" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#6b7280', marginBottom: '4px' }}>Qty</label>
              <input value={customQty} onChange={e => setCustomQty(Number(e.target.value))} type="number" min="1" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
            </div>
            <button onClick={addCustomItem} style={{ padding: '12px 24px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Add
            </button>
          </div>
        )}

        {menuData.map(category => (
          <div key={category.id} style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#374151', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px', marginBottom: '16px' }}>
              {category.titleEn || category.title}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '16px' }}>
              {category.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => addToOrder(item)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    minHeight: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem', lineHeight: 1.3 }}>{item.name}</span>
                  <span style={{ color: '#059669', fontWeight: 800, marginTop: '8px' }}>¥{item.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RIGHT PANEL - Current Order */}
      <div className="pos-sidebar" style={{ width: '400px', backgroundColor: '#ffffff', borderLeft: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#111827', color: '#fff' }}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Receipt size={24} /> Order #{String(orderNumber).padStart(4, '0')}
          </h2>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {orderItems.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>No items in order</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {orderItems.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{item.name}</div>
                    <div style={{ color: item.price < 0 ? '#ef4444' : '#4b5563', fontSize: '0.8rem' }}>¥{item.price.toLocaleString()}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #d1d5db', borderRadius: '6px' }}>
                      <button onClick={() => updateQty(item.id, -1)} style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563' }}><Minus size={16}/></button>
                      <span style={{ width: '24px', textAlign: 'center', fontWeight: 'bold' }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)} style={{ padding: '4px 8px', border: 'none', background: 'none', cursor: 'pointer', color: '#4b5563' }}><Plus size={16}/></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '24px', backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#6b7280' }}>
            <span>Subtotal</span><span>¥{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', color: '#6b7280' }}>
            <span>Tax (10%)</span><span>¥{tax.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', color: '#111827', fontSize: '1.5rem', fontWeight: 800 }}>
            <span>Total</span><span>¥{total.toLocaleString()}</span>
          </div>
          <button 
            onClick={handlePrint}
            disabled={orderItems.length === 0}
            style={{ width: '100%', padding: '16px', backgroundColor: orderItems.length > 0 ? '#059669' : '#d1d5db', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: orderItems.length > 0 ? 'pointer' : 'not-allowed' }}
          >
            <Printer size={24} /> Print Invoice
          </button>
        </div>
      </div>

      {/* 
        ============================================================
        PRINT ONLY INVOICE (A4 Format mimicking the screenshot)
        ============================================================
      */}
      <div className="invoice-print-only">
        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
          <div>
            <img src="/images/logo.png" alt="Logo" style={{ height: '80px', objectFit: 'contain' }} />
          </div>
          <div style={{ textAlign: 'right' }}>
            <h1 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }}>GORILLA CAMP BBQ RESORT INVOICE / 請求書</h1>
            <table style={{ borderCollapse: 'collapse', marginLeft: 'auto', width: '250px' }}>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold', fontSize: '12px' }}>Invoice No:</td>
                  <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '12px', textAlign: 'center' }}>{invoiceNo}</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '4px 8px', fontWeight: 'bold', fontSize: '12px' }}>Invoice Date:</td>
                  <td style={{ border: '1px solid #000', padding: '4px 8px', fontSize: '12px', textAlign: 'center' }}>{invoiceDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Table */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Item / 商品名</th>
              <th style={{ width: '10%' }}>Qty / 数</th>
              <th style={{ width: '20%' }}>Price / 価格</th>
              <th style={{ width: '20%' }}>Line Total / 合計</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item, idx) => (
              <tr key={idx}>
                <td style={{ textAlign: 'left' }}>{item.name}</td>
                <td style={{ textAlign: 'center' }}>{item.qty}</td>
                <td style={{ textAlign: 'right' }}>JPY {item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td style={{ textAlign: 'right' }}>JPY {(item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
            {/* Fill empty rows to make it look like a full invoice */}
            {[...Array(Math.max(0, 10 - orderItems.length))].map((_, i) => (
              <tr key={`empty-${i}`}>
                <td>&nbsp;</td><td></td><td></td><td></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals Table */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <table style={{ borderCollapse: 'collapse', width: '350px' }}>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #000', padding: '6px 12px', fontWeight: 'bold' }}>Subtotal / 小計</td>
                <td style={{ border: '1px solid #000', padding: '6px 12px', textAlign: 'right' }}>JPY {subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '6px 12px', fontWeight: 'bold' }}>Tax 10% / 消費税</td>
                <td style={{ border: '1px solid #000', padding: '6px 12px', textAlign: 'right' }}>JPY {tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #000', padding: '6px 12px', fontWeight: 'bold' }}>Grand Total / 合計金額</td>
                <td style={{ border: '1px solid #000', padding: '6px 12px', textAlign: 'right', fontWeight: 'bold' }}>JPY {total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Address */}
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', letterSpacing: '1px', margin: '0 0 10px 0' }}>GORILLA CAMP RESORT</h2>
          <div style={{ fontSize: '12px', lineHeight: '1.6' }}>
            <strong>Address</strong><br />
            Saitamaken Kawagoe shi Matoba kita 2-4-12 (2F) 350-1102.<br /><br />
            
            <strong>Phone</strong><br />
            +81 80-3029-3495<br /><br />
            
            <strong>Website</strong><br />
            www.Gorillacampresort.com
          </div>
        </div>

        {/* Bottom Message */}
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '14px' }}>
          <div style={{ color: '#d4af37', fontSize: '20px', marginBottom: '10px' }}>★</div>
          ご来店ありがとうございました。またのご来店をお待ちしております。
        </div>

      </div>

      <style jsx global>{`
        .invoice-print-only { display: none; }

        @media print {
          /* Hide POS UI */
          .pos-container { display: none !important; }
          body { background-color: white !important; margin: 0; padding: 0; }
          
          /* Show Invoice */
          .invoice-print-only {
            display: block;
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            color: #000;
          }

          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }

          .invoice-table th, .invoice-table td {
            border: 1px solid #000;
            padding: 8px 12px;
            font-size: 13px;
          }

          .invoice-table th {
            background-color: #f3f4f6 !important;
            -webkit-print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
