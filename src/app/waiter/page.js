'use client';

import { useState, useEffect, useMemo } from 'react';
import { menuData } from '@/data/menuData';
import { ArrowLeft, Plus, Minus, Search, Send, Printer, Receipt, CheckCircle2, Trash2, Edit3, Users, Clock, Settings, X } from 'lucide-react';

const ORDERS_KEY = 'gcr-waiter-orders';
const WAITER_KEY = 'gcr-waiter-name';
const SEQ_KEY = 'gcr-waiter-seq';
const SETTINGS_KEY = 'gcr-waiter-settings';
const QUICK_TABLES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
const DEFAULT_SETTINGS = {
  businessName: 'Gorilla Camp BBQ Resort',
  companyName: '株式会社SERVE INT', // registered operator, printed on receipts
  regNo: 'T2030001115718', // 適格請求書発行事業者登録番号 (verified on invoice-kohyo.nta.go.jp)
  pricesIncludeTax: false, // false = add 10% on top of menu prices (same as /pos)
  defaultReceipt: 'simple',
  paper: 'a4', // a4 | a5 | 80mm | 58mm
};
const PAPERS = [
  { id: 'a4', label: 'A4', sub: 'Office printer' },
  { id: 'a5', label: 'A5', sub: 'Half A4' },
  { id: '80mm', label: '80 mm', sub: 'Thermal roll' },
  { id: '58mm', label: '58 mm', sub: 'Small thermal' },
];
const PAGE_CSS = {
  a4: '@page { size: A4; margin: 15mm; }',
  a5: '@page { size: A5; margin: 10mm; }',
  // Roll printers take the paper size from their driver; just keep margins tiny.
  '80mm': '@page { margin: 2mm; }',
  '58mm': '@page { margin: 1mm; }',
};
const SHOP_ADDRESS = 'Saitamaken Kawagoe shi Matoba kita 2-4-12 (2F) 350-1102';
const SHOP_PHONE = '+81 80-3029-3495';

// BBQ courses first (priced per person), then their time extensions, then the rest of the menu.
const PER_PERSON_COURSES = ['a-course', 'night-course'];
const bbqCategory = menuData.find(c => c.id === 'bbq-party');
const WAITER_MENU = [
  {
    id: 'bbq-courses',
    title: 'BBQ Courses',
    items: (bbqCategory?.items || []).map(i => ({ ...i, perPerson: PER_PERSON_COURSES.includes(i.id) })),
  },
  {
    // Extension prices from the course descriptions in menuData
    id: 'bbq-extensions',
    title: 'Course Extensions',
    items: [
      { id: 'ext-day-1h', name: 'Day Course +1 hour', nameJp: 'デイコース延長 +1時間', price: 1000 },
      { id: 'ext-day-2h', name: 'Day Course +2 hours', nameJp: 'デイコース延長 +2時間', price: 1500 },
      { id: 'ext-day-3h', name: 'Day Course +3 hours', nameJp: 'デイコース延長 +3時間', price: 2500 },
      { id: 'ext-night-1h', name: 'Night Course +1 hour', nameJp: 'ナイトコース延長 +1時間', price: 1500 },
      { id: 'ext-night-2h', name: 'Night Course +2 hours', nameJp: 'ナイトコース延長 +2時間', price: 2500 },
      { id: 'ext-night-3h', name: 'Night Course +3 hours', nameJp: 'ナイトコース延長 +3時間', price: 3000 },
    ],
  },
  ...menuData.filter(c => c.id !== 'bbq-party'),
];

const yen = (n) => `¥${Math.round(n).toLocaleString('ja-JP')}`;
const pad = (n) => String(n).padStart(2, '0');
const dateKey = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const fmtTime = (iso) => { const d = new Date(iso); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
const fmtDate = (iso) => { const d = new Date(iso); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${fmtTime(iso)}`; };
const validRegNo = (s) => /^T\d{13}$/.test(s);

const load = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};

// All menu items are 10% (dine-in). Tax is rounded down once per bill, as the invoice rules require.
const totals = (items, pricesIncludeTax) => {
  const sum = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);
  if (pricesIncludeTax) {
    const tax = Math.floor((sum * 10) / 110);
    return { subtotal: sum - tax, tax, total: sum, count };
  }
  const tax = Math.floor(sum * 0.10);
  return { subtotal: sum, tax, total: sum + tax, count };
};

const nextInvoiceNo = () => {
  const today = dateKey(new Date());
  const seq = load(SEQ_KEY, { day: today, n: 0 });
  const n = seq.day === today ? seq.n + 1 : 1;
  save(SEQ_KEY, { day: today, n });
  return `GCR-${today}-${pad(n)}`;
};

const receiptTitle = (type) => (type === 'tax' ? '適格簡易請求書 / Tax Invoice' : '領収書 / Receipt');

const orderText = (o, s) => {
  const t = totals(o.items, s.pricesIncludeTax);
  const lines = [
    `🦍 ${s.businessName} — ${receiptTitle(o.receiptType)}`,
    ...(s.companyName ? [`運営: ${s.companyName}`] : []),
    ...(o.receiptType === 'tax' ? [`登録番号: ${s.regNo}`] : []),
    `No: ${o.invoiceNo}`,
    `Table: ${o.table}${o.guests ? ` (${o.guests} guests)` : ''}${o.waiter ? ` · Waiter: ${o.waiter}` : ''}`,
    ...(o.addressee ? [`宛名: ${o.addressee} 様`] : []),
    `Date: ${fmtDate(o.createdAt)}`,
    '------------------------',
    ...o.items.map(i => `${i.qty} × ${i.name}  ${yen(i.price * i.qty)}`),
    '------------------------',
    ...(s.pricesIncludeTax
      ? [`TOTAL: ${yen(t.total)}`, `(10%対象 ${yen(t.total)} 内消費税 ${yen(t.tax)})`]
      : [`Subtotal (10%対象): ${yen(t.subtotal)}`, `消費税 10%: ${yen(t.tax)}`, `TOTAL: ${yen(t.total)}`]),
  ];
  if (o.note) lines.push('', `Note: ${o.note}`);
  return lines.join('\n');
};

function useIsWide() {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return wide;
}

export default function WaiterApp() {
  const [isClient, setIsClient] = useState(false);
  const [orders, setOrders] = useState([]);
  const [waiter, setWaiter] = useState('');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [view, setView] = useState('home'); // home | menu | bill | settings
  const [activeId, setActiveId] = useState(null);
  const isWide = useIsWide();

  // New-order form
  const [table, setTable] = useState('');
  const [guests, setGuests] = useState(2);

  // Catalog
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPrice, setCustomPrice] = useState('');
  const [toast, setToast] = useState('');
  const [askRegNo, setAskRegNo] = useState(false);

  useEffect(() => {
    setOrders(load(ORDERS_KEY, []));
    setWaiter(load(WAITER_KEY, ''));
    const saved = load(SETTINGS_KEY, {});
    if (saved.businessName === 'Gorilla Camp Resort') delete saved.businessName; // old default
    if (!saved.regNo || saved.regNo === 'T0000000000000') delete saved.regNo; // empty or test placeholder
    setSettings({ ...DEFAULT_SETTINGS, ...saved });
    setIsClient(true);
  }, []);

  useEffect(() => { if (isClient) save(ORDERS_KEY, orders); }, [orders, isClient]);
  useEffect(() => { if (isClient) save(WAITER_KEY, waiter); }, [waiter, isClient]);
  useEffect(() => { if (isClient) save(SETTINGS_KEY, settings); }, [settings, isClient]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  const active = orders.find(o => o.id === activeId);
  const openOrders = orders.filter(o => o.status !== 'paid');
  const today = dateKey(new Date());
  const paidToday = orders.filter(o => o.status === 'paid' && dateKey(new Date(o.paidAt)) === today);
  const paidTodayTotal = paidToday.reduce((s, o) => s + totals(o.items, settings.pricesIncludeTax).total, 0);
  const canTaxInvoice = validRegNo(settings.regNo);

  const updateActive = (fn) => setOrders(prev => prev.map(o => (o.id === activeId ? fn(o) : o)));

  const openOrder = (o) => { setActiveId(o.id); setSearch(''); setView(o.items.length && !isWide ? 'bill' : 'menu'); };

  const startOrder = () => {
    if (!table.trim()) { setToast('Choose a table first'); return; }
    const existing = openOrders.find(o => o.table === table.trim());
    if (existing) { openOrder(existing); setToast(`Table ${existing.table} is already open — adding to it`); return; }
    const o = {
      id: `o-${Date.now()}`,
      invoiceNo: nextInvoiceNo(),
      table: table.trim(),
      guests,
      waiter: waiter.trim(),
      items: [],
      note: '',
      addressee: '',
      receiptType: settings.defaultReceipt === 'tax' && canTaxInvoice ? 'tax' : 'simple',
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [o, ...prev]);
    setActiveId(o.id);
    setTable('');
    setGuests(2);
    setSearch('');
    setCategory('all');
    setView('menu');
  };

  const changeQty = (item, delta) => {
    updateActive(o => {
      const found = o.items.find(i => i.id === item.id);
      let items;
      if (found) {
        items = o.items.map(i => (i.id === item.id ? { ...i, qty: i.qty + delta } : i)).filter(i => i.qty > 0);
      } else if (delta > 0) {
        items = [...o.items, { id: item.id, name: item.name, nameJp: item.nameJp || '', price: item.price, qty: delta }];
      } else {
        items = o.items;
      }
      return { ...o, items, status: o.status === 'sent' ? 'open' : o.status };
    });
  };

  const addCustom = () => {
    const price = Number(customPrice);
    if (!customName.trim() || !customPrice || Number.isNaN(price)) { setToast('Enter a name and price'); return; }
    changeQty({ id: `custom-${Date.now()}`, name: customName.trim(), price }, 1);
    setCustomName('');
    setCustomPrice('');
    setShowCustom(false);
  };

  const setReceiptType = (type) => {
    if (type === 'tax' && !canTaxInvoice) { setAskRegNo(true); return; }
    updateActive(o => ({ ...o, receiptType: type }));
  };

  const sendToOwner = async (via) => {
    if (!active || active.items.length === 0) return;
    const text = orderText(active, settings);
    let sent = false;
    if (via === 'share' && navigator.share) {
      try { await navigator.share({ title: `${receiptTitle(active.receiptType)} ${active.invoiceNo}`, text }); sent = true; } catch (e) { if (e?.name === 'AbortError') return; }
    }
    if (!sent && via === 'line') {
      window.open(`https://line.me/R/share?text=${encodeURIComponent(text)}`, '_blank');
      sent = true;
    }
    if (!sent) {
      try { await navigator.clipboard.writeText(text); setToast('Bill copied — paste it to the owner'); } catch { window.open(`https://line.me/R/share?text=${encodeURIComponent(text)}`, '_blank'); }
    }
    updateActive(o => ({ ...o, status: 'sent', sentAt: new Date().toISOString() }));
  };

  const markPaid = () => {
    if (!window.confirm(`Close Table ${active.table} as paid (${yen(totals(active.items, settings.pricesIncludeTax).total)})?`)) return;
    updateActive(o => ({ ...o, status: 'paid', paidAt: new Date().toISOString() }));
    setActiveId(null);
    setView('home');
    setToast('Table closed');
  };

  const deleteOrder = () => {
    if (!window.confirm(`Delete the order for Table ${active.table}? This cannot be undone.`)) return;
    setOrders(prev => prev.filter(o => o.id !== activeId));
    setActiveId(null);
    setView('home');
  };

  const catalog = useMemo(() => {
    const q = search.trim().toLowerCase();
    return WAITER_MENU
      .filter(c => q || category === 'all' || c.id === category)
      .map(c => ({
        ...c,
        items: q ? c.items.filter(i => i.name.toLowerCase().includes(q) || (i.nameJp && i.nameJp.includes(search.trim()))) : c.items,
      }))
      .filter(c => c.items.length > 0);
  }, [search, category]);

  if (!isClient) return null;

  const qtyOf = (id) => active?.items.find(i => i.id === id)?.qty || 0;
  const t = active ? totals(active.items, settings.pricesIncludeTax) : null;
  const showOrder = active && (view === 'menu' || view === 'bill');

  const header = (title, sub, onBack, right) => (
    <header className="wt-header">
      {onBack && <button className="wt-icon-btn" onClick={onBack} aria-label="Back"><ArrowLeft size={22} /></button>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="wt-brand">{title}</div>
        <div className="wt-sub">{sub}</div>
      </div>
      {right}
    </header>
  );

  const catalogPanel = (
    <div className="wt-catalog">
      <div className="wt-sticky">
        <div className="wt-search">
          <Search size={18} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu… (English / 日本語)" />
          {search && <button className="wt-clear" onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button>}
        </div>
        {!search && (
          <div className="wt-chips">
            <button className={`wt-chip ${category === 'all' ? 'is-on' : ''}`} onClick={() => setCategory('all')}>All</button>
            {WAITER_MENU.map(c => (
              <button key={c.id} className={`wt-chip ${category === c.id ? 'is-on' : ''}`} onClick={() => setCategory(c.id)}>
                {c.titleEn || c.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="wt-catalog-body">
        {catalog.length === 0 && <p className="wt-muted">No menu items match “{search}”.</p>}
        {catalog.map(c => (
          <section key={c.id}>
            <h3 className="wt-cat">{c.titleEn || c.title}</h3>
            <div className="wt-grid">
              {c.items.map(item => {
                const q = qtyOf(item.id);
                // Per-person courses start at one per guest
                const firstAdd = () => changeQty(item, item.perPerson ? Math.max(1, active?.guests || 1) : 1);
                return (
                  <div key={item.id} className={`wt-card-item ${q ? 'is-on' : ''}`}>
                    <button className="wt-card-info" onClick={q ? () => changeQty(item, 1) : firstAdd} aria-label={`Add ${item.name}`}>
                      <div className="wt-item-name">{item.name}</div>
                      {item.nameJp && <div className="wt-item-jp">{item.nameJp}</div>}
                      <div className="wt-item-price">{yen(item.price)}{item.perPerson && <small> / person</small>}</div>
                    </button>
                    {q > 0 ? (
                      <div className="wt-stepper wt-stepper-card">
                        <button onClick={() => changeQty(item, -1)} aria-label="Remove one"><Minus size={18} /></button>
                        <span>{q}</span>
                        <button onClick={() => changeQty(item, 1)} aria-label="Add one"><Plus size={18} /></button>
                      </div>
                    ) : (
                      <button className="wt-add" onClick={firstAdd}><Plus size={18} /> {item.perPerson ? `Add × ${active?.guests || 1}` : 'Add'}</button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <button className="wt-btn wt-btn-ghost" onClick={() => setShowCustom(s => !s)}>
          <Edit3 size={18} /> {showCustom ? 'Cancel custom item' : 'Custom item / discount'}
        </button>
        {showCustom && (
          <div className="wt-card">
            <input className="wt-input" value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Item name (e.g. Extra rice, Discount)" />
            <input className="wt-input" value={customPrice} onChange={e => setCustomPrice(e.target.value)} type="number" inputMode="numeric" placeholder="Price ¥ (use - for discount)" />
            <button className="wt-btn wt-btn-primary" onClick={addCustom}>Add to order</button>
          </div>
        )}
      </div>
    </div>
  );

  const billPanel = active && (
    <div className="wt-bill">
      <div className="wt-segment" role="tablist" aria-label="Receipt type">
        <button className={active.receiptType !== 'tax' ? 'is-on' : ''} onClick={() => setReceiptType('simple')}>
          Receipt<small>領収書</small>
        </button>
        <button className={active.receiptType === 'tax' ? 'is-on' : ''} onClick={() => setReceiptType('tax')} aria-disabled={!canTaxInvoice}>
          Tax invoice<small>適格簡易請求書</small>
        </button>
      </div>
      {!canTaxInvoice && !askRegNo && <p className="wt-muted">Tax invoice needs the registration number (T-number).</p>}
      {!canTaxInvoice && askRegNo && (
        <div className="wt-card wt-regno">
          <label className="wt-label">Registration number (登録番号) — saved for all bills</label>
          <input
            className="wt-input"
            autoFocus
            value={settings.regNo}
            onChange={e => {
              const regNo = e.target.value.toUpperCase().replace(/\s/g, '');
              setSettings(s => ({ ...s, regNo }));
              if (validRegNo(regNo)) { updateActive(o => ({ ...o, receiptType: 'tax' })); setAskRegNo(false); setToast('Registration number saved'); }
            }}
            placeholder="T + 13 digits, e.g. T1234567890123"
            inputMode="text"
          />
          {settings.regNo && <p className="wt-warn">{settings.regNo.length}/14 — must be “T” followed by 13 digits.</p>}
        </div>
      )}

      <div className="wt-card">
        <div className="wt-bill-brand">
          <img src="/images/logo.png" alt="" />
          <strong>{settings.businessName}</strong>
          {settings.companyName && <span className="wt-muted">運営 {settings.companyName}</span>}
        </div>
        <div className="wt-bill-head">
          <strong>{receiptTitle(active.receiptType)}</strong>
          <span className="wt-muted">{active.invoiceNo}</span>
        </div>
        {active.receiptType === 'tax' && <div className="wt-muted">{settings.businessName} · 登録番号 {settings.regNo}</div>}
        {active.items.length === 0 && <p className="wt-muted">No items yet — tap dishes to add them.</p>}
        {active.items.map(i => (
          <div key={i.id} className="wt-line">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="wt-item-name">{i.name}</div>
              <div className="wt-muted">{yen(i.price)} each</div>
            </div>
            <div className="wt-stepper">
              <button onClick={() => changeQty(i, -1)} aria-label="Remove one">{i.qty === 1 ? <Trash2 size={16} /> : <Minus size={16} />}</button>
              <span>{i.qty}</span>
              <button onClick={() => changeQty(i, 1)} aria-label="Add one"><Plus size={16} /></button>
            </div>
            <div className="wt-line-total">{yen(i.price * i.qty)}</div>
          </div>
        ))}
        <div className="wt-totals">
          {settings.pricesIncludeTax ? (
            <div><span>10%対象 (内消費税 {yen(t.tax)})</span><span>{yen(t.total)}</span></div>
          ) : (
            <>
              <div><span>Subtotal (10%対象)</span><span>{yen(t.subtotal)}</span></div>
              <div><span>消費税 Tax 10%</span><span>{yen(t.tax)}</span></div>
            </>
          )}
          <div className="wt-grand"><span>Total</span><span>{yen(t.total)}</span></div>
        </div>
      </div>

      <label className="wt-label">Receipt addressed to (宛名, optional)</label>
      <input className="wt-input" value={active.addressee || ''} onChange={e => updateActive(o => ({ ...o, addressee: e.target.value }))} placeholder="e.g. 株式会社〇〇" />
      <label className="wt-label">Note for kitchen / owner</label>
      <textarea className="wt-input" rows={2} value={active.note} onChange={e => updateActive(o => ({ ...o, note: e.target.value }))} placeholder="e.g. less spicy, no onion" />

      {active.status === 'sent' && (
        <p className="wt-sent"><CheckCircle2 size={16} /> Sent to owner at {fmtTime(active.sentAt)}</p>
      )}

      <button className="wt-btn wt-btn-primary" disabled={!t.count} onClick={() => sendToOwner('share')}><Send size={18} /> Send to owner</button>
      <button className="wt-btn wt-btn-line" disabled={!t.count} onClick={() => sendToOwner('line')}>Send via LINE</button>
      <label className="wt-label">Paper size for printing</label>
      <div className="wt-segment wt-segment-4">
        {PAPERS.map(p => (
          <button key={p.id} className={settings.paper === p.id ? 'is-on' : ''} onClick={() => setSettings(s => ({ ...s, paper: p.id }))}>
            {p.label}<small>{p.sub}</small>
          </button>
        ))}
      </div>
      <div className="wt-btn-pair">
        {!isWide && <button className="wt-btn wt-btn-ghost" onClick={() => setView('menu')}><Plus size={18} /> Add items</button>}
        <button className="wt-btn wt-btn-ghost" disabled={!t.count} onClick={() => window.print()}><Printer size={18} /> Print / PDF</button>
      </div>
      <button className="wt-btn wt-btn-dark" disabled={!t.count} onClick={markPaid}><Receipt size={18} /> Paid — close table</button>
      <button className="wt-btn wt-btn-danger" onClick={deleteOrder}><Trash2 size={16} /> Delete order</button>
    </div>
  );

  return (
    <div className="wt-app">
      {/* ===================== HOME ===================== */}
      {view === 'home' && (
        <div className="wt-screen">
          <header className="wt-header wt-header-home">
            <img src="/images/logo.png" alt="" className="wt-logo" />
            <div className="wt-brand">{settings.businessName}</div>
            <div className="wt-sub">Waiter · orders & bills</div>
            <button className="wt-icon-btn wt-settings-btn" onClick={() => setView('settings')} aria-label="Settings"><Settings size={22} /></button>
          </header>

          <div className="wt-body wt-home">
            <div className="wt-col">
              <label className="wt-label">Waiter name</label>
              <input className="wt-input" value={waiter} onChange={e => setWaiter(e.target.value)} placeholder="Your name" />

              <section className="wt-card">
                <h2 className="wt-h2">New order</h2>
                <label className="wt-label">Table</label>
                <div className="wt-table-grid">
                  {QUICK_TABLES.map(n => {
                    const busy = openOrders.some(o => o.table === n);
                    return (
                      <button key={n} className={`wt-table ${table === n ? 'is-on' : ''} ${busy ? 'is-busy' : ''}`} onClick={() => setTable(n)}>
                        {n}
                      </button>
                    );
                  })}
                </div>
                <input className="wt-input" value={QUICK_TABLES.includes(table) ? '' : table} onChange={e => setTable(e.target.value)} placeholder="Other table / BBQ site / room (e.g. A3)" />

                <label className="wt-label">Guests</label>
                <div className="wt-stepper wt-stepper-lg">
                  <button onClick={() => setGuests(g => Math.max(1, g - 1))} aria-label="Fewer guests"><Minus size={20} /></button>
                  <span><Users size={16} /> {guests}</span>
                  <button onClick={() => setGuests(g => g + 1)} aria-label="More guests"><Plus size={20} /></button>
                </div>

                <button className="wt-btn wt-btn-primary" onClick={startOrder}>Start taking order</button>
              </section>
            </div>

            <div className="wt-col">
              <h2 className="wt-h2">Open tables ({openOrders.length})</h2>
              {openOrders.length === 0 && <p className="wt-muted">No open tables.</p>}
              {openOrders.map(o => {
                const ot = totals(o.items, settings.pricesIncludeTax);
                return (
                  <button key={o.id} className="wt-order-row" onClick={() => openOrder(o)}>
                    <div className="wt-order-table">{o.table}</div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div className="wt-order-title">Table {o.table} · {o.guests} guests</div>
                      <div className="wt-muted"><Clock size={12} /> {fmtTime(o.createdAt)} · {ot.count} items {o.status === 'sent' && <span className="wt-badge">sent</span>}</div>
                    </div>
                    <div className="wt-order-total">{yen(ot.total)}</div>
                  </button>
                );
              })}

              <section className="wt-card wt-summary">
                <div>
                  <div className="wt-muted">Closed today</div>
                  <div className="wt-order-title">{paidToday.length} bills</div>
                </div>
                <div className="wt-order-total">{yen(paidTodayTotal)}</div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* ===================== SETTINGS ===================== */}
      {view === 'settings' && (
        <div className="wt-screen">
          {header('Settings', 'Saved on this device', () => setView('home'))}
          <div className="wt-body" style={{ maxWidth: 640 }}>
            <div className="wt-card">
              <label className="wt-label">Business name (shown on receipts)</label>
              <input className="wt-input" value={settings.businessName} onChange={e => setSettings(s => ({ ...s, businessName: e.target.value }))} />

              <label className="wt-label">Company name (運営会社, registered for invoices)</label>
              <input className="wt-input" value={settings.companyName} onChange={e => setSettings(s => ({ ...s, companyName: e.target.value }))} />

              <label className="wt-label">Invoice registration number (登録番号)</label>
              <input className="wt-input" value={settings.regNo} onChange={e => setSettings(s => ({ ...s, regNo: e.target.value.toUpperCase().replace(/\s/g, '') }))} placeholder="T + 13 digits, e.g. T1234567890123" />
              {settings.regNo && !canTaxInvoice && <p className="wt-warn">Must be “T” followed by 13 digits.</p>}
              {!settings.regNo && <p className="wt-muted">Leave empty if not registered — only simple receipts will be available.</p>}

              <label className="wt-label">Menu prices</label>
              <div className="wt-segment">
                <button className={!settings.pricesIncludeTax ? 'is-on' : ''} onClick={() => setSettings(s => ({ ...s, pricesIncludeTax: false }))}>
                  Add 10% tax<small>税抜 prices</small>
                </button>
                <button className={settings.pricesIncludeTax ? 'is-on' : ''} onClick={() => setSettings(s => ({ ...s, pricesIncludeTax: true }))}>
                  Tax included<small>税込 prices</small>
                </button>
              </div>

              <label className="wt-label">Default bill type for new orders</label>
              <div className="wt-segment">
                <button className={settings.defaultReceipt !== 'tax' ? 'is-on' : ''} onClick={() => setSettings(s => ({ ...s, defaultReceipt: 'simple' }))}>
                  Receipt<small>領収書</small>
                </button>
                <button className={settings.defaultReceipt === 'tax' ? 'is-on' : ''} onClick={() => setSettings(s => ({ ...s, defaultReceipt: 'tax' }))}>
                  Tax invoice<small>適格簡易請求書</small>
                </button>
              </div>
              <label className="wt-label">Paper size for printing</label>
              <div className="wt-segment wt-segment-4">
                {PAPERS.map(p => (
                  <button key={p.id} className={settings.paper === p.id ? 'is-on' : ''} onClick={() => setSettings(s => ({ ...s, paper: p.id }))}>
                    {p.label}<small>{p.sub}</small>
                  </button>
                ))}
              </div>
              <p className="wt-muted">Thermal: in the print window, pick the receipt printer and its roll paper.</p>
            </div>
            <button className="wt-btn wt-btn-primary" onClick={() => setView('home')}>Done</button>
          </div>
        </div>
      )}

      {/* ===================== ORDER (catalog + bill) ===================== */}
      {showOrder && (
        <div className="wt-screen wt-screen-wide">
          {header(
            `Table ${active.table}`,
            `${active.guests} guests · ${active.invoiceNo}${active.waiter ? ` · ${active.waiter}` : ''}`,
            () => (view === 'bill' && !isWide ? setView('menu') : setView('home')),
          )}

          {isWide ? (
            <div className="wt-split">
              {catalogPanel}
              <aside className="wt-split-bill">{billPanel}</aside>
            </div>
          ) : view === 'menu' ? (
            <>
              {catalogPanel}
              <div className="wt-bottom">
                <button className="wt-btn wt-btn-primary wt-btn-bar" disabled={!t.count} onClick={() => setView('bill')}>
                  <span>{t.count} items</span>
                  <span>View bill · {yen(t.total)}</span>
                </button>
              </div>
            </>
          ) : (
            <div className="wt-body wt-body-pad">{billPanel}</div>
          )}
        </div>
      )}

      {toast && <div className="wt-toast">{toast}</div>}

      {/* ===================== PRINT ===================== */}
      <style>{`@media print { ${PAGE_CSS[settings.paper] || PAGE_CSS.a4} }`}</style>
      {active && (settings.paper === '80mm' || settings.paper === '58mm') && (
        <div className={`wt-print wr paper-${settings.paper}`}>
          <img src="/images/logo.png" alt="" className="wr-logo" />
          <div className="wr-center wr-name">{settings.businessName}</div>
          {settings.companyName && <div className="wr-center wr-small">運営: {settings.companyName}</div>}
          <div className="wr-center wr-small">{SHOP_ADDRESS}<br />TEL {SHOP_PHONE}</div>
          <div className="wr-center wr-title">{receiptTitle(active.receiptType)}</div>
          {active.receiptType === 'tax' && <div className="wr-center wr-small">登録番号 {settings.regNo}</div>}
          {active.addressee && <div className="wr-to">{active.addressee} 様</div>}
          <div className="wr-small wr-meta">
            No. {active.invoiceNo}<br />
            {fmtDate(active.createdAt)}<br />
            Table {active.table} ({active.guests}){active.waiter ? ` · ${active.waiter}` : ''}
          </div>
          <div className="wr-rule" />
          {active.items.map(i => (
            <div key={i.id} className="wr-item">
              <div>{i.nameJp || i.name}</div>
              <div className="wr-row"><span>{yen(i.price)} × {i.qty}</span><span>{yen(i.price * i.qty)}</span></div>
            </div>
          ))}
          <div className="wr-rule" />
          {settings.pricesIncludeTax ? (
            <div className="wr-row"><span>10%対象</span><span>{yen(t.total)}</span></div>
          ) : (
            <div className="wr-row"><span>小計 (10%対象)</span><span>{yen(t.subtotal)}</span></div>
          )}
          <div className="wr-row"><span>{settings.pricesIncludeTax ? '内消費税 (10%)' : '消費税 (10%)'}</span><span>{yen(t.tax)}</span></div>
          <div className="wr-row wr-total"><span>合計</span><span>{yen(t.total)}</span></div>
          {active.receiptType !== 'tax' && <div className="wr-small" style={{ marginTop: '2mm' }}>上記正に領収いたしました。</div>}
          {active.note && <div className="wr-small">備考: {active.note}</div>}
          <div className="wr-center wr-small" style={{ marginTop: '4mm' }}>ご来店ありがとうございました。</div>
        </div>
      )}
      {active && !(settings.paper === '80mm' || settings.paper === '58mm') && (
        <div className={`wt-print paper-${settings.paper}`}>
          <div className="wp-head">
            <img src="/images/logo.png" alt="" className="wp-logo" />
            <div className="wp-name">{settings.businessName}</div>
            {settings.companyName && <div className="wp-company">運営: {settings.companyName}</div>}
            <div className="wp-addr">{SHOP_ADDRESS}<br />TEL {SHOP_PHONE} · www.Gorillacampresort.com</div>
            <h1 className="wp-title">{receiptTitle(active.receiptType)}</h1>
            {active.receiptType === 'tax' && <div className="wp-reg">登録番号 / Registration No. {settings.regNo}</div>}
          </div>

          <div className="wp-info">
            <div className="wp-to">
              <div className="wp-to-name">{active.addressee || ' '}<span>様</span></div>
              <div className="wp-amount">
                <span>ご請求金額 / Amount</span>
                <strong>{yen(t.total)}<small> (税込)</small></strong>
              </div>
            </div>
            <table className="wp-meta">
              <tbody>
                <tr><th>No.</th><td>{active.invoiceNo}</td></tr>
                <tr><th>Date / 日付</th><td>{fmtDate(active.createdAt)}</td></tr>
                <tr><th>Table / 席</th><td>{active.table} ({active.guests} guests)</td></tr>
                {active.waiter && <tr><th>Staff / 担当</th><td>{active.waiter}</td></tr>}
              </tbody>
            </table>
          </div>

          <table className="wp-items">
            <thead>
              <tr><th>品名 / Item</th><th>数量 / Qty</th><th>単価 / Unit</th><th>金額 / Amount</th></tr>
            </thead>
            <tbody>
              {active.items.map(i => (
                <tr key={i.id}>
                  <td>{i.nameJp || i.name}{i.nameJp && <div className="wp-en">{i.name}</div>}</td>
                  <td className="c">{i.qty}</td>
                  <td className="r">{yen(i.price)}</td>
                  <td className="r">{yen(i.price * i.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <table className="wp-totals">
            <tbody>
              {settings.pricesIncludeTax ? (
                <tr><th>10%対象 / Taxable (10%)</th><td>{yen(t.total)}</td></tr>
              ) : (
                <tr><th>小計 (10%対象) / Subtotal</th><td>{yen(t.subtotal)}</td></tr>
              )}
              <tr><th>{settings.pricesIncludeTax ? '内消費税 (10%) / Incl. tax' : '消費税 (10%) / Tax'}</th><td>{yen(t.tax)}</td></tr>
              <tr className="wp-grand"><th>合計 / Total</th><td>{yen(t.total)}</td></tr>
            </tbody>
          </table>

          {active.receiptType !== 'tax' && <p className="wp-note">上記正に領収いたしました。 / Received with thanks.</p>}
          {active.note && <p className="wp-note">備考 / Note: {active.note}</p>}
          <p className="wp-thanks">ご来店ありがとうございました。またのご来店をお待ちしております。</p>
        </div>
      )}

      <style jsx global>{`
        /* Hide the public website's footer, bottom nav and LINE bubble on the waiter screen */
        body > footer, body > nav, .floating-line-bubble, .universal-bottom-nav, .line-chatbot-widget { display: none !important; }

        .wt-app { min-height: 100vh; min-height: 100dvh; background: #f4f1ea; color: #1c1917; font-family: var(--font-inter), system-ui, sans-serif; -webkit-tap-highlight-color: transparent; }
        .wt-app button { cursor: pointer; font-family: inherit; touch-action: manipulation; }
        .wt-screen { max-width: 680px; margin: 0 auto; min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; }
        .wt-header { background: #1f3d2b; color: #fff; padding: 14px 16px; padding-top: calc(14px + env(safe-area-inset-top)); display: flex; align-items: center; gap: 12px; position: sticky; top: 0; z-index: 30; }
        .wt-brand { font-size: 1.2rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wt-sub { font-size: 0.8rem; opacity: 0.75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .wt-icon-btn { background: rgba(255,255,255,0.12); border: 0; color: #fff; width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center; flex-shrink: 0; }
        .wt-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; flex: 1; width: 100%; margin: 0 auto; }
        .wt-body-pad { padding-bottom: 40px; }
        .wt-col { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
        .wt-card { background: #fff; border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .wt-h2 { font-size: 1.05rem; font-weight: 800; margin: 4px 0; }
        .wt-label { font-size: 0.8rem; font-weight: 600; color: #57534e; }
        .wt-muted { font-size: 0.8rem; color: #78716c; display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap; margin: 0; }
        .wt-warn { font-size: 0.8rem; color: #b91c1c; margin: 0; }
        .wt-input { width: 100%; padding: 14px; border-radius: 12px; border: 1px solid #d6d3d1; font-size: 16px; background: #fff; color: inherit; font-family: inherit; }
        .wt-table-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
        .wt-table { height: 52px; border-radius: 12px; border: 1px solid #d6d3d1; background: #fff; font-size: 1.1rem; font-weight: 700; color: #1c1917; position: relative; }
        .wt-table.is-busy::after { content: ''; position: absolute; top: 6px; right: 6px; width: 8px; height: 8px; border-radius: 50%; background: #d97706; }
        .wt-table.is-on { background: #1f3d2b; color: #fff; border-color: #1f3d2b; }
        .wt-btn { width: 100%; min-height: 52px; border-radius: 14px; border: 0; font-size: 1rem; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .wt-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .wt-btn-primary { background: #15803d; color: #fff; }
        .wt-btn-line { background: #06c755; color: #fff; }
        .wt-btn-dark { background: #1c1917; color: #fff; }
        .wt-btn-ghost { background: #fff; color: #1c1917; border: 1px solid #d6d3d1; }
        .wt-btn-danger { background: transparent; color: #b91c1c; min-height: 44px; font-weight: 600; }
        .wt-btn-pair { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; }
        .wt-btn-bar { justify-content: space-between; padding: 0 18px; }
        .wt-stepper { display: inline-flex; align-items: center; background: #f5f5f4; border-radius: 12px; flex-shrink: 0; }
        .wt-stepper button { width: 40px; height: 40px; border: 0; background: transparent; display: grid; place-items: center; color: #1c1917; }
        .wt-stepper span { min-width: 26px; text-align: center; font-weight: 800; display: inline-flex; align-items: center; justify-content: center; gap: 4px; }
        .wt-stepper-lg { align-self: flex-start; }
        .wt-stepper-lg button { width: 52px; height: 52px; }
        .wt-stepper-lg span { min-width: 60px; font-size: 1.1rem; }
        .wt-segment { display: grid; grid-template-columns: 1fr 1fr; gap: 4px; background: #e7e5e4; padding: 4px; border-radius: 14px; }
        .wt-segment button { border: 0; background: transparent; border-radius: 10px; padding: 10px 6px; font-weight: 700; font-size: 0.9rem; color: #57534e; display: flex; flex-direction: column; align-items: center; line-height: 1.2; }
        .wt-segment button small { font-weight: 500; font-size: 0.7rem; opacity: 0.8; }
        .wt-regno { border: 2px solid #d97706; }
        .wt-segment-4 { grid-template-columns: repeat(4, 1fr); }
        .wt-segment button.is-on { background: #fff; color: #1f3d2b; box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
        .wt-segment button[aria-disabled='true'] { opacity: 0.5; }
        .wt-order-row { display: flex; align-items: center; gap: 12px; background: #fff; border: 0; border-radius: 14px; padding: 12px; width: 100%; box-shadow: 0 1px 3px rgba(0,0,0,0.06); color: inherit; }
        .wt-order-table { width: 44px; height: 44px; border-radius: 12px; background: #1f3d2b; color: #fff; font-weight: 800; display: grid; place-items: center; flex-shrink: 0; }
        .wt-order-title { font-weight: 700; }
        .wt-order-total { font-weight: 800; color: #15803d; }
        .wt-badge { background: #dcfce7; color: #166534; font-size: 0.7rem; padding: 1px 6px; border-radius: 6px; font-weight: 700; }
        .wt-summary { flex-direction: row; justify-content: space-between; align-items: center; }

        /* Catalog */
        .wt-catalog { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .wt-sticky { position: sticky; top: calc(72px + env(safe-area-inset-top)); z-index: 20; background: #f4f1ea; padding: 12px 16px 4px; }
        .wt-search { display: flex; align-items: center; gap: 8px; background: #fff; border: 1px solid #d6d3d1; border-radius: 12px; padding: 0 12px; color: #78716c; }
        .wt-search input { flex: 1; min-width: 0; border: 0; outline: 0; padding: 12px 0; font-size: 16px; background: transparent; color: #1c1917; }
        .wt-clear { border: 0; background: #e7e5e4; border-radius: 50%; width: 26px; height: 26px; display: grid; place-items: center; color: #57534e; }
        .wt-chips { display: flex; gap: 8px; overflow-x: auto; padding: 10px 0 6px; scrollbar-width: none; }
        .wt-chips::-webkit-scrollbar { display: none; }
        .wt-chip { flex-shrink: 0; padding: 9px 14px; border-radius: 999px; border: 1px solid #d6d3d1; background: #fff; font-weight: 600; font-size: 0.85rem; color: #1c1917; white-space: nowrap; }
        .wt-chip.is-on { background: #1f3d2b; color: #fff; border-color: #1f3d2b; }
        .wt-catalog-body { padding: 4px 16px 110px; display: flex; flex-direction: column; gap: 12px; }
        .wt-cat { font-size: 0.8rem; font-weight: 800; color: #57534e; margin: 8px 0 8px; text-transform: uppercase; letter-spacing: 0.04em; }
        .wt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
        .wt-card-item { background: #fff; border-radius: 14px; overflow: hidden; display: flex; flex-direction: column; border: 2px solid transparent; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .wt-card-item.is-on { border-color: #15803d; }
        .wt-card-info { padding: 10px 10px 8px; flex: 1; border: 0; background: none; text-align: left; color: inherit; }
        .wt-item-price small { font-weight: 600; color: #78716c; }
        .wt-item-name { font-weight: 700; line-height: 1.25; font-size: 0.92rem; }
        .wt-item-jp { font-size: 0.72rem; color: #78716c; }
        .wt-item-price { font-weight: 800; color: #15803d; margin-top: 2px; }
        .wt-add { margin: 0 8px 8px; height: 40px; border-radius: 10px; border: 0; background: #15803d; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 4px; }
        .wt-stepper-card { margin: 0 8px 8px; justify-content: space-between; }
        .wt-bottom { position: fixed; left: 0; right: 0; bottom: 0; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: linear-gradient(transparent, #f4f1ea 30%); max-width: 680px; margin: 0 auto; z-index: 25; }

        /* Bill */
        .wt-bill { display: flex; flex-direction: column; gap: 12px; }
        .wt-header-home { flex-direction: column; gap: 2px; text-align: center; position: relative; padding-bottom: 16px; }
        .wt-logo { width: 72px; height: 72px; object-fit: contain; margin-bottom: 4px; }
        .wt-settings-btn { position: absolute; right: 16px; top: calc(14px + env(safe-area-inset-top)); }
        .wt-bill-brand { display: flex; flex-direction: column; align-items: center; gap: 4px; padding-bottom: 8px; border-bottom: 1px dashed #d6d3d1; text-align: center; }
        .wt-bill-brand img { width: 56px; height: 56px; object-fit: contain; }
        .wt-bill-head { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .wt-line { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f5f5f4; }
        .wt-line-total { width: 72px; text-align: right; font-weight: 700; flex-shrink: 0; }
        .wt-totals { display: flex; flex-direction: column; gap: 4px; padding-top: 8px; color: #57534e; }
        .wt-totals > div { display: flex; justify-content: space-between; gap: 8px; }
        .wt-grand { font-size: 1.4rem; font-weight: 800; color: #1c1917; }
        .wt-sent { display: flex; align-items: center; gap: 6px; color: #166534; font-weight: 600; font-size: 0.9rem; margin: 0; }
        .wt-toast { position: fixed; left: 50%; bottom: 96px; transform: translateX(-50%); background: #1c1917; color: #fff; padding: 10px 16px; border-radius: 12px; font-size: 0.9rem; z-index: 50; max-width: calc(100% - 32px); }
        .wt-print { display: none; }

        /* Tablet / iPad and larger: two columns */
        @media (min-width: 900px) {
          .wt-screen { max-width: 1280px; }
          .wt-home { display: grid; grid-template-columns: 1fr 1fr; align-items: start; gap: 20px; padding: 20px; }
          .wt-split { display: grid; grid-template-columns: minmax(0, 1fr) 380px; flex: 1; align-items: start; }
          .wt-catalog-body { padding-bottom: 40px; }
          .wt-split-bill { position: sticky; top: calc(72px + env(safe-area-inset-top)); max-height: calc(100dvh - 72px); overflow-y: auto; padding: 12px 16px 24px; border-left: 1px solid #e7e5e4; background: #faf8f4; }
          .wt-grid { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); }
        }
        @media (min-width: 1200px) {
          .wt-split { grid-template-columns: minmax(0, 1fr) 420px; }
        }

        @media print {
          .wt-screen, .wt-toast { display: none !important; }
          .wt-app { background: #fff; min-height: 0; }
          body { background: #fff !important; }
          .wt-print { display: block; width: 100%; font-family: Arial, 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif; color: #000; font-size: 12pt; }
          .wp-head { text-align: center; margin-bottom: 8mm; }
          .wp-logo { display: block; width: 28mm; height: 28mm; object-fit: contain; margin: 0 auto 3mm; }
          .wp-name { font-size: 20pt; font-weight: bold; }
          .wp-company { font-size: 11pt; margin-top: 1mm; }
          .wp-addr { font-size: 9pt; margin-top: 1mm; line-height: 1.5; }
          .wp-title { font-size: 18pt; margin: 6mm 0 1mm; letter-spacing: 0.05em; }
          .wp-reg { font-size: 10pt; }
          .wp-info { display: flex; justify-content: space-between; align-items: flex-end; gap: 10mm; margin-bottom: 6mm; }
          .wp-to { flex: 1; }
          .wp-to-name { font-size: 15pt; border-bottom: 1px solid #000; padding-bottom: 1mm; min-width: 80mm; display: flex; justify-content: space-between; }
          .wp-amount { margin-top: 5mm; border: 2px solid #000; padding: 3mm 4mm; display: flex; justify-content: space-between; align-items: baseline; }
          .wp-amount span { font-size: 10pt; }
          .wp-amount strong { font-size: 20pt; }
          .wp-amount small { font-size: 9pt; font-weight: normal; }
          .wp-meta { border-collapse: collapse; font-size: 10pt; }
          .wp-meta th { text-align: left; padding: 1mm 4mm 1mm 0; font-weight: normal; color: #333; }
          .wp-meta td { padding: 1mm 0; }
          .wp-items { width: 100%; border-collapse: collapse; margin-bottom: 4mm; }
          .wp-items th { background: #eee !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; border: 1px solid #000; padding: 2mm; font-size: 10pt; }
          .wp-items td { border: 1px solid #000; padding: 2mm; font-size: 11pt; vertical-align: top; }
          .wp-items .c { text-align: center; width: 24mm; white-space: nowrap; }
          .wp-items th { white-space: nowrap; }
          .wp-items .r { text-align: right; width: 30mm; }
          .wp-en { font-size: 9pt; color: #444; }
          .wp-totals { width: 95mm; margin-left: auto; border-collapse: collapse; }
          .wp-totals th, .wp-totals td { border: 1px solid #000; padding: 2mm 3mm; font-size: 11pt; }
          .wp-totals th { text-align: left; font-weight: normal; }
          .wp-totals td { text-align: right; }
          .wp-grand th, .wp-grand td { font-weight: bold; font-size: 13pt; }
          .wp-note { font-size: 10pt; margin: 4mm 0 0; }
          .wp-thanks { text-align: center; margin-top: 12mm; font-size: 10pt; }

          /* A5: same layout, scaled down */
          .paper-a5 { font-size: 10pt; }
          .paper-a5 .wp-head { margin-bottom: 5mm; }
          .paper-a5 .wp-logo { width: 20mm; height: 20mm; }
          .paper-a5 .wp-name { font-size: 15pt; }
          .paper-a5 .wp-addr { font-size: 7.5pt; }
          .paper-a5 .wp-title { font-size: 14pt; margin-top: 4mm; }
          .paper-a5 .wp-info { gap: 5mm; margin-bottom: 4mm; }
          .paper-a5 .wp-to-name { font-size: 12pt; min-width: 55mm; }
          .paper-a5 .wp-amount strong { font-size: 15pt; }
          .paper-a5 .wp-meta { font-size: 8.5pt; }
          .paper-a5 .wp-items th { font-size: 8.5pt; padding: 1.5mm; }
          .paper-a5 .wp-items td { font-size: 9.5pt; padding: 1.5mm; }
          .paper-a5 .wp-items .c { width: 16mm; }
          .paper-a5 .wp-items .r { width: 22mm; }
          .paper-a5 .wp-totals { width: 75mm; }
          .paper-a5 .wp-totals th, .paper-a5 .wp-totals td { font-size: 9.5pt; padding: 1.5mm 2mm; }
          .paper-a5 .wp-thanks { margin-top: 6mm; font-size: 8.5pt; }

          /* Thermal roll receipts */
          .wr { width: 72mm; margin: 0; font-size: 10pt; line-height: 1.35; }
          .wr.paper-58mm { width: 48mm; font-size: 8.5pt; }
          .wr-logo { display: block; width: 22mm; height: 22mm; object-fit: contain; margin: 0 auto 1mm; }
          .paper-58mm .wr-logo { width: 16mm; height: 16mm; }
          .wr-center { text-align: center; }
          .wr-name { font-weight: bold; font-size: 1.2em; }
          .wr-small { font-size: 0.8em; }
          .wr-title { font-weight: bold; font-size: 1.15em; margin: 2mm 0 1mm; }
          .wr-to { border-bottom: 1px solid #000; margin: 2mm 0; font-size: 1.05em; }
          .wr-meta { margin: 2mm 0; }
          .wr-rule { border-top: 1px dashed #000; margin: 2mm 0; }
          .wr-item { margin-bottom: 1.5mm; }
          .wr-row { display: flex; justify-content: space-between; gap: 2mm; }
          .wr-total { font-weight: bold; font-size: 1.3em; border-top: 1px solid #000; margin-top: 1mm; padding-top: 1mm; }        }
      `}</style>
    </div>
  );
}