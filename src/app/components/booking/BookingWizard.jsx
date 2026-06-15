'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, CalendarDays, Users, UtensilsCrossed, Gift, CheckCircle2, ShoppingCart, Minus, Plus, Clock, User, Phone, MessageSquare, Star, Check, Send, Loader2, Edit3, Beer, Wine, Cake, Sparkles, Flame, Tent, Camera, Salad, Baby } from 'lucide-react';
import Image from 'next/image';

/* ═══════ MOCK DATA ═══════ */
const PLATTERS = [
  { id: 'p1', nameJP: 'タンドリーフレイムチキン', nameEN: 'Tandoori Flame Chicken', price: 750, country: 'India', image: '/images/menu/india.png', popular: false },
  { id: 'p2', nameJP: 'シグネチャーカルビ', nameEN: 'Signature Galbi', price: 950, country: 'Korea', image: '/images/menu/korea.png', popular: true },
  { id: 'p3', nameJP: 'テキサス ブリスケット', nameEN: 'Texas Brisket', price: 1100, country: 'USA', image: '/images/menu/usa.png', popular: false },
  { id: 'p4', nameJP: 'バリ ストリート サテ', nameEN: 'Bali Street Satay', price: 700, country: 'Indonesia', image: '/images/menu/indonesia.png', popular: false },
  { id: 'p5', nameJP: 'ガウチョ アサド リブ', nameEN: 'Gaucho Asado Ribs', price: 1100, country: 'Argentina', image: '/images/menu/argentina.png', popular: true },
  { id: 'p6', nameJP: 'ミックスプラッター', nameEN: 'Mix Platter', price: 2500, country: 'World', image: '/images/menu/india.png', popular: true },
];

const UPSELLS = [
  { id: 'u1', nameJP: '飲み放題パッケージ', nameEN: 'All-You-Can-Drink', price: 1500, icon: 'Beer', cat: 'drink', perPerson: true, badge: 'Popular' },
  { id: 'u2', nameJP: 'クラフトビールセット', nameEN: 'Craft Beer Set', price: 800, icon: 'Beer', cat: 'drink' },
  { id: 'u3', nameJP: 'プレミアム日本酒', nameEN: 'Premium Sake', price: 1200, icon: 'Wine', cat: 'drink' },
  { id: 'u4', nameJP: 'バースデープレート', nameEN: 'Birthday Plate', price: 1000, icon: 'Cake', cat: 'occasion', badge: 'Birthday' },
  { id: 'u5', nameJP: 'シャンパンボトル', nameEN: 'Champagne', price: 2500, icon: 'Sparkles', cat: 'occasion' },
  { id: 'u6', nameJP: 'デコレーション', nameEN: 'Decoration', price: 500, icon: 'Sparkles', cat: 'occasion', badge: 'Best Value' },
  { id: 'u7', nameJP: 'ライブBBQショー', nameEN: 'Live BBQ Show', price: 3000, icon: 'Flame', cat: 'exp', badge: 'Premium' },
  { id: 'u8', nameJP: '焚き火セットアップ', nameEN: 'Bonfire Setup', price: 2000, icon: 'Tent', cat: 'exp' },
  { id: 'u9', nameJP: 'フォトセッション', nameEN: 'Photo Session', price: 500, icon: 'Camera', cat: 'exp' },
  { id: 'u10', nameJP: 'サイドディッシュ', nameEN: 'Side Dishes', price: 600, icon: 'Salad', cat: 'sides' },
  { id: 'u11', nameJP: 'キッズBBQセット', nameEN: "Kids' BBQ Set", price: 500, icon: 'Baby', cat: 'sides' },
];

const ICON_MAP = { Beer, Wine, Cake, Sparkles, Flame, Tent, Camera, Salad, Baby };
const TIMES = ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00'];
const DAYS_JP = ['日','月','火','水','木','金','土'];
const UPSELL_CATS = [
  { id: 'drink', label: 'ドリンク', icon: Beer },
  { id: 'occasion', label: 'お祝い', icon: Cake },
  { id: 'exp', label: '体験', icon: Sparkles },
  { id: 'sides', label: 'サイド', icon: Salad },
];

const STEPS = [
  { id: 1, label: '日時', icon: CalendarDays },
  { id: 2, label: 'ゲスト', icon: Users },
  { id: 3, label: 'メニュー', icon: UtensilsCrossed },
  { id: 4, label: '追加', icon: Gift },
  { id: 5, label: '確認', icon: CheckCircle2 },
];

/* ═══════ HELPERS ═══════ */
function fmtDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
function slotStatus(date, time) {
  if (!date) return 'ok';
  const h = (date+time).split('').reduce((a,c) => a+c.charCodeAt(0), 0);
  if (h%7===0) return 'full';
  if (h%5===0) return 'busy';
  return 'ok';
}

/* ═══════════════════════════════════════════════════════ */
/*                    MAIN COMPONENT                       */
/* ═══════════════════════════════════════════════════════ */
export default function BookingWizard({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    date: null, time: null, name: '', phone: '', guests: 2,
    platters: [], upsells: [], message: '',
  });

  // Calendar state
  const today = new Date(); today.setHours(0,0,0,0);
  const [vMonth, setVMonth] = useState(today.getMonth());
  const [vYear, setVYear] = useState(today.getFullYear());
  const [uCat, setUCat] = useState('drink');

  useEffect(() => {
    if (isOpen) { setStep(1); setSubmitted(false); document.body.style.overflow='hidden'; }
    else document.body.style.overflow='';
    return () => { document.body.style.overflow=''; };
  }, [isOpen]);

  const upd = useCallback((k,v) => setData(p => ({...p,[k]:v})), []);

  const total = useCallback(() => {
    let t = 0;
    data.platters.forEach(s => { const p = PLATTERS.find(x=>x.id===s.id); if(p) t += p.price*s.qty; });
    data.upsells.forEach(s => { const u = UPSELLS.find(x=>x.id===s.id); if(u) t += u.price*(u.perPerson?data.guests*s.qty:s.qty); });
    return t;
  }, [data])();

  const canNext = () => {
    if (step===1) return data.date && data.time;
    if (step===2) return data.name.trim() && data.phone.trim();
    if (step===3) return data.platters.length > 0;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  /* ═══════ CALENDAR LOGIC ═══════ */
  const firstDay = new Date(vYear, vMonth, 1).getDay();
  const daysInMonth = new Date(vYear, vMonth+1, 0).getDate();
  const calDays = [];
  for (let i=0; i<firstDay; i++) calDays.push(null);
  for (let d=1; d<=daysInMonth; d++) calDays.push(d);

  const isPast = (d) => new Date(vYear,vMonth,d) < today;
  const isSel = (d) => data.date === fmtDate(new Date(vYear,vMonth,d));
  const isToday = (d) => fmtDate(new Date(vYear,vMonth,d)) === fmtDate(today);

  const bookRef = `GCR-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9999)).padStart(4,'0')}`;

  return (
    <div className="bw-overlay" onClick={e => { if(e.target===e.currentTarget) onClose(); }}>
      <div className="bw-modal">
        {/* ═══ HEADER ═══ */}
        <header className="bw-header">
          {step > 1 && !submitted ? (
            <button onClick={() => setStep(step-1)} className="bw-hdr-btn"><ChevronLeft size={18}/></button>
          ) : <div className="bw-hdr-btn-placeholder"/>}
          <h2 className="bw-hdr-title">
            {submitted ? '予約完了' : STEPS[step-1].label}
          </h2>
          <button onClick={onClose} className="bw-hdr-btn"><X size={18}/></button>
        </header>

        {/* ═══ PROGRESS ═══ */}
        {!submitted && (
          <div className="bw-progress">
            {STEPS.map(s => {
              const Icon = s.icon;
              return (
                <button key={s.id} className={`bw-prog-step ${step===s.id?'active':''} ${s.id<step?'done':''}`}
                  onClick={() => s.id<step && setStep(s.id)} disabled={s.id>step}>
                  <div className="bw-prog-dot"><Icon size={14}/></div>
                  <span className="bw-prog-label">{s.label}</span>
                </button>
              );
            })}
            <div className="bw-prog-line"><div className="bw-prog-fill" style={{width:`${((step-1)/4)*100}%`}}/></div>
          </div>
        )}

        {/* ═══ CONTENT ═══ */}
        <div className="bw-body">
          {submitted ? (
            /* ═══════ SUCCESS ═══════ */
            <div className="bw-success">
              <div className="bw-success-check">
                <svg viewBox="0 0 52 52" className="bw-svg-check">
                  <circle cx="26" cy="26" r="24" fill="none" strokeWidth="2"/>
                  <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="bw-success-title">予約リクエスト完了！</h3>
              <p className="bw-success-sub">Booking Request Submitted Successfully</p>
              <div className="bw-success-ref">
                <span className="bw-ref-label">予約番号 / Ref</span>
                <span className="bw-ref-code">{bookRef}</span>
              </div>
              <div className="bw-success-details">
                <div className="bw-sd-row"><CalendarDays size={14}/>{data.date}</div>
                <div className="bw-sd-row"><Clock size={14}/>{data.time}</div>
                <div className="bw-sd-row"><Users size={14}/>{data.guests}名</div>
                <div className="bw-sd-row bw-sd-total">合計: ¥{total.toLocaleString()}</div>
              </div>
              <p className="bw-success-note"><Phone size={14} style={{display:'inline',verticalAlign:'middle',marginRight:6}} />確認のお電話を差し上げます</p>
              <button onClick={onClose} className="bw-btn-primary" style={{marginTop:16}}>閉じる</button>
            </div>

          ) : step===1 ? (
            /* ═══════ STEP 1: DATE & TIME ═══════ */
            <div className="bw-step">
              <div className="bw-section-label"><CalendarDays size={16}/> 日付を選択</div>
              <div className="bw-cal">
                <div className="bw-cal-nav">
                  <button onClick={() => {if(vMonth===0){setVMonth(11);setVYear(vYear-1);}else setVMonth(vMonth-1);}} className="bw-cal-arrow" disabled={vYear===today.getFullYear()&&vMonth<=today.getMonth()}><ChevronLeft size={16}/></button>
                  <span className="bw-cal-month">{vYear}年 {vMonth+1}月</span>
                  <button onClick={() => {if(vMonth===11){setVMonth(0);setVYear(vYear+1);}else setVMonth(vMonth+1);}} className="bw-cal-arrow"><ChevronRight size={16}/></button>
                </div>
                <div className="bw-cal-days-header">
                  {DAYS_JP.map((d,i) => <div key={d} className={`bw-cal-dh ${i===0?'sun':''} ${i===6?'sat':''}`}>{d}</div>)}
                </div>
                <div className="bw-cal-grid">
                  {calDays.map((d,i) => d ? (
                    <button key={i} disabled={isPast(d)}
                      className={`bw-cal-day ${isPast(d)?'past':''} ${isSel(d)?'sel':''} ${isToday(d)?'today':''}`}
                      onClick={() => upd('date', fmtDate(new Date(vYear,vMonth,d)))}>
                      {d}
                    </button>
                  ) : <div key={i} className="bw-cal-day empty"/>)}
                </div>
              </div>

              {data.date && (
                <>
                  <div className="bw-section-label" style={{marginTop:24}}><Clock size={16}/> 時間を選択</div>
                  <div className="bw-time-grid">
                    {TIMES.map(t => {
                      const st = slotStatus(data.date, t);
                      return (
                        <button key={t} disabled={st==='full'}
                          className={`bw-time-btn ${data.time===t?'sel':''} ${st==='full'?'full':''} ${st==='busy'?'busy':''}`}
                          onClick={() => upd('time', t)}>
                          {t}
                          {st==='busy' && <span className="bw-time-tag warn">残少</span>}
                          {st==='full' && <span className="bw-time-tag full">満席</span>}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

          ) : step===2 ? (
            /* ═══════ STEP 2: GUESTS + INFO ═══════ */
            <div className="bw-step">
              <div className="bw-section-label"><Users size={16}/> 人数</div>
              <div className="bw-guest-box">
                <button className="bw-g-btn" onClick={() => data.guests>1 && upd('guests',data.guests-1)}><Minus size={18}/></button>
                <div className="bw-g-count">
                  <span className="bw-g-emoji"><Users size={32} style={{color: data.guests <= 5 ? '#D4AF37' : '#FF6B00'}} /></span>
                  <span className="bw-g-num">{data.guests}</span>
                  <span className="bw-g-unit">名</span>
                </div>
                <button className="bw-g-btn plus" onClick={() => upd('guests',data.guests+1)}><Plus size={18}/></button>
              </div>
              <div className="bw-g-quick">
                {[2,4,6,8,10,20].map(n => (
                  <button key={n} className={`bw-g-qbtn ${data.guests===n?'active':''}`} onClick={() => upd('guests',n)}>{n}{n>=20?'+':''}</button>
                ))}
              </div>

              <div className="bw-section-label" style={{marginTop:28}}><User size={16}/> お客様情報</div>
              <div className="bw-form">
                <div className="bw-field">
                  <label className="bw-label">お名前 *</label>
                  <input type="text" className="bw-input" value={data.name} onChange={e=>upd('name',e.target.value)} placeholder="山田太郎"/>
                </div>
                <div className="bw-field">
                  <label className="bw-label">電話番号 *</label>
                  <input type="tel" className="bw-input" value={data.phone} onChange={e=>upd('phone',e.target.value)} placeholder="080-1234-5678"/>
                </div>
                <div className="bw-field">
                  <label className="bw-label">メッセージ <span style={{opacity:0.5,fontSize:'0.7rem'}}>(任意)</span></label>
                  <textarea className="bw-input bw-textarea" value={data.message} onChange={e=>upd('message',e.target.value)} placeholder="アレルギー、特別なご要望..." rows={2}/>
                </div>
              </div>
            </div>

          ) : step===3 ? (
            /* ═══════ STEP 3: MENU ═══════ */
            <div className="bw-step">
              <div className="bw-section-label"><UtensilsCrossed size={16}/> BBQプラッターを選択</div>
              <p className="bw-hint">{data.guests}名様 → {Math.max(1,Math.ceil(data.guests/3))}〜{Math.max(1,Math.ceil(data.guests/3))+1} プラッターがおすすめ</p>
              <div className="bw-menu-list">
                {PLATTERS.map(p => {
                  const sel = data.platters.find(x=>x.id===p.id);
                  return (
                    <div key={p.id} className={`bw-menu-card ${sel?'sel':''}`}>
                      <div className="bw-mc-left">
                        <div className="bw-mc-flag" style={{fontSize:'0.75rem',fontWeight:700,color:'#D4AF37'}}>{p.country}</div>
                        <div className="bw-mc-info">
                          <span className="bw-mc-name">{p.nameJP}</span>
                          <span className="bw-mc-name-en">{p.nameEN}</span>
                          <span className="bw-mc-price">¥{p.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="bw-mc-right">
                        {p.popular && <span className="bw-mc-badge"><Flame size={10} style={{display:'inline',verticalAlign:'middle',marginRight:2}} /> 人気</span>}
                        {sel ? (
                          <div className="bw-qty-row">
                            <button className="bw-qty-btn" onClick={() => {
                              const nq = sel.qty-1;
                              upd('platters', nq>0 ? data.platters.map(x=>x.id===p.id?{...x,qty:nq}:x) : data.platters.filter(x=>x.id!==p.id));
                            }}><Minus size={14}/></button>
                            <span className="bw-qty-num">{sel.qty}</span>
                            <button className="bw-qty-btn plus" onClick={() => upd('platters', data.platters.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x))}><Plus size={14}/></button>
                          </div>
                        ) : (
                          <button className="bw-add-btn" onClick={() => upd('platters',[...data.platters,{id:p.id,qty:1}])}>
                            <Plus size={14}/> 追加
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          ) : step===4 ? (
            /* ═══════ STEP 4: UPSELLS ═══════ */
            <div className="bw-step">
              <div className="bw-section-label"><Gift size={16}/> 追加オプション</div>
              <p className="bw-hint">スキップ可能 — 追加しなくてもOK</p>
              <div className="bw-u-tabs">
                {UPSELL_CATS.map(c => {
                  const CatIcon = c.icon;
                  return <button key={c.id} className={`bw-u-tab ${uCat===c.id?'active':''}`} onClick={() => setUCat(c.id)}><CatIcon size={14} style={{display:'inline',verticalAlign:'middle',marginRight:4}} />{c.label}</button>
                })}
              </div>
              <div className="bw-u-list">
                {UPSELLS.filter(u=>u.cat===uCat).map(u => {
                  const sel = data.upsells.find(x=>x.id===u.id);
                  const Icon = ICON_MAP[u.icon] || Gift;
                  const ep = u.perPerson ? u.price*data.guests : u.price;
                  return (
                    <div key={u.id} className={`bw-u-item ${sel?'sel':''}`}>
                      <div className="bw-u-icon"><Icon size={18}/></div>
                      <div className="bw-u-info">
                        <div className="bw-u-name-row">
                          <span className="bw-u-name">{u.nameJP}</span>
                          {u.badge && <span className="bw-u-badge">{u.badge}</span>}
                        </div>
                        <span className="bw-u-price">¥{ep.toLocaleString()}{u.perPerson?` (${data.guests}名分)`:''}</span>
                      </div>
                      {sel ? (
                        <div className="bw-qty-row compact">
                          <button className="bw-qty-btn sm" onClick={() => {
                            const nq=sel.qty-1;
                            upd('upsells', nq>0?data.upsells.map(x=>x.id===u.id?{...x,qty:nq}:x):data.upsells.filter(x=>x.id!==u.id));
                          }}><Minus size={12}/></button>
                          <span className="bw-qty-num sm">{sel.qty}</span>
                          <button className="bw-qty-btn sm plus" onClick={() => upd('upsells',data.upsells.map(x=>x.id===u.id?{...x,qty:x.qty+1}:x))}><Plus size={12}/></button>
                        </div>
                      ) : (
                        <button className="bw-u-add" onClick={() => upd('upsells',[...data.upsells,{id:u.id,qty:1}])}><Plus size={14}/></button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          ) : (
            /* ═══════ STEP 5: REVIEW ═══════ */
            <div className="bw-step">
              <div className="bw-section-label"><CheckCircle2 size={16}/> ご予約内容の確認</div>
              <div className="bw-review-cards">
                <div className="bw-rv-card">
                  <div className="bw-rv-head"><CalendarDays size={14}/><span>日時</span><button className="bw-rv-edit" onClick={()=>setStep(1)}><Edit3 size={10}/>変更</button></div>
                  <div className="bw-rv-val">{data.date} · {data.time}</div>
                </div>
                <div className="bw-rv-card">
                  <div className="bw-rv-head"><Users size={14}/><span>ゲスト</span><button className="bw-rv-edit" onClick={()=>setStep(2)}><Edit3 size={10}/>変更</button></div>
                  <div className="bw-rv-val">{data.name} · {data.guests}名<br/><span style={{opacity:0.5,fontSize:'0.8rem'}}>{data.phone}</span></div>
                </div>
                <div className="bw-rv-card">
                  <div className="bw-rv-head"><UtensilsCrossed size={14}/><span>メニュー</span><button className="bw-rv-edit" onClick={()=>setStep(3)}><Edit3 size={10}/>変更</button></div>
                  {data.platters.map(s=>{const p=PLATTERS.find(x=>x.id===s.id);return p?<div key={s.id} className="bw-rv-line"><span>{p.country} — {p.nameJP} ×{s.qty}</span><span>¥{(p.price*s.qty).toLocaleString()}</span></div>:null;})}
                </div>
                {data.upsells.length>0 && (
                  <div className="bw-rv-card">
                    <div className="bw-rv-head"><Gift size={14}/><span>追加</span><button className="bw-rv-edit" onClick={()=>setStep(4)}><Edit3 size={10}/>変更</button></div>
                    {data.upsells.map(s=>{const u=UPSELLS.find(x=>x.id===s.id);if(!u)return null;const eq=u.perPerson?data.guests*s.qty:s.qty;return <div key={s.id} className="bw-rv-line"><span>{u.nameJP} ×{s.qty}</span><span>¥{(u.price*eq).toLocaleString()}</span></div>;})}
                  </div>
                )}
              </div>
              <div className="bw-total-box">
                <span>合計金額 (税込)</span>
                <span className="bw-total-amt">¥{total.toLocaleString()}</span>
              </div>
              <p className="bw-pay-note">※ お支払いは当日店頭にて</p>
              <button className="bw-btn-primary bw-submit" onClick={handleSubmit} disabled={loading}>
                {loading ? <><Loader2 size={18} className="bw-spin"/> 送信中...</> : <><Send size={18}/> 予約リクエストを送信</>}
              </button>
            </div>
          )}
        </div>

        {/* ═══ FOOTER BAR ═══ */}
        {!submitted && step < 5 && (
          <footer className="bw-footer">
            {total > 0 && (
              <div className="bw-footer-info">
                <ShoppingCart size={16}/>
                <span className="bw-footer-total">¥{total.toLocaleString()}</span>
              </div>
            )}
            <button className="bw-btn-primary" onClick={() => step<5 && canNext() && setStep(step+1)} disabled={!canNext()}>
              {step===4 ? '確認画面へ' : '次へ'} <ChevronRight size={16}/>
            </button>
          </footer>
        )}
      </div>
    </div>
  );
}
