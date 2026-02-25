'use client';

import { useState } from 'react';
import { Plus, Snowflake, Eye, AlertTriangle, Check } from 'lucide-react';
import { cards, BankCard } from '@/lib/data';
import Modal from './Modal';

// ─── Shared card visual ───────────────────────────────────────────────────────
function CardView({ card, frozen }: { card: BankCard; frozen?: boolean }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0 shadow-xl"
      style={{
        width: 300,
        height: 175,
        background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
        opacity: frozen ? 0.6 : 1,
      }}
    >
      <div className="absolute rounded-full pointer-events-none" style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.06)', top: -70, right: -40 }} />
      <div className="absolute rounded-full pointer-events-none" style={{ width: 120, height: 120, background: 'rgba(255,255,255,0.05)', bottom: -30, left: -40 }} />

      {frozen && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full">
            <Snowflake size={14} className="text-sky-300" />
            <span className="text-xs font-bold text-white">Frozen</span>
          </div>
        </div>
      )}

      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-semibold text-white/65 px-2 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            {card.cardType === 'physical' ? 'Physical' : 'Virtual'}
          </span>
          <div className="w-8 h-6 rounded" style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5E07B 100%)' }} />
        </div>

        <div className="flex-1" />

        <p className="font-mono text-lg font-medium text-white tracking-[0.15em] mb-4">
          •••• •••• •••• {card.lastFour}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-[8px] font-semibold text-white/55 tracking-widest">CARD HOLDER</p>
            <p className="text-xs font-semibold text-white">{card.holderName}</p>
          </div>
          <div>
            <p className="text-[8px] font-semibold text-white/55 tracking-widest">EXPIRES</p>
            <p className="text-xs font-semibold text-white">{card.expiry}</p>
          </div>
          {card.network === 'visa' ? (
            <p className="text-lg font-black italic text-white">VISA</p>
          ) : (
            <div className="flex">
              <div className="w-6 h-6 rounded-full bg-red-500/85 -mr-2" />
              <div className="w-6 h-6 rounded-full bg-orange-400/85" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Manage Cards Modal ───────────────────────────────────────────────────────
function ManageCardsModal() {
  const [frozen, setFrozen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setFrozen((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      {cards.map((card) => (
        <div key={card.id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
          {/* Mini card header */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})` }}
          >
            <div>
              <p className="text-[10px] font-semibold text-white/70">
                {card.cardType === 'physical' ? 'Physical' : 'Virtual'} Card
              </p>
              <p className="text-sm font-bold text-white">•••• {card.lastFour}</p>
            </div>
            {card.network === 'visa' ? (
              <p className="text-base font-black italic text-white">VISA</p>
            ) : (
              <div className="flex">
                <div className="w-5 h-5 rounded-full bg-red-500/85 -mr-1.5" />
                <div className="w-5 h-5 rounded-full bg-orange-400/85" />
              </div>
            )}
          </div>

          {/* Action row */}
          <div className="grid grid-cols-3 divide-x divide-gray-100">
            {[
              {
                Icon: Snowflake,
                label: frozen.has(card.id) ? 'Unfreeze' : 'Freeze',
                color: frozen.has(card.id) ? '#4A90D9' : '#6B7280',
                action: () => toggle(card.id),
              },
              { Icon: Eye,           label: 'View PIN',    color: '#6B7280', action: () => {} },
              { Icon: AlertTriangle, label: 'Report Lost', color: '#E74C3C', action: () => {} },
            ].map(({ Icon, label, color, action }) => (
              <button
                key={label}
                onClick={action}
                className="flex flex-col items-center gap-1.5 py-3 hover:bg-gray-50 transition-colors"
              >
                <Icon size={16} color={color} />
                <span className="text-[10px] font-semibold text-[#6B7280]">{label}</span>
              </button>
            ))}
          </div>

          {frozen.has(card.id) && (
            <div className="px-4 py-2 bg-sky-50 border-t border-sky-100">
              <p className="text-[10px] text-sky-600 font-semibold text-center">
                This card is frozen. Tap Unfreeze to re-enable.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Add Card Modal ───────────────────────────────────────────────────────────
function formatCardNumber(v: string) {
  return v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function AddCardModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardType, setCardType] = useState<'physical' | 'virtual'>('physical');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (number.replace(/\s/g, '').length < 16) { setError('Enter a valid 16-digit card number.'); return; }
    if (!name.trim()) { setError('Enter the cardholder name.'); return; }
    if (expiry.length < 5) { setError('Enter a valid expiry date.'); return; }
    if (cvv.length < 3) { setError('Enter a valid CVV.'); return; }
    setError('');
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="px-6 pb-8 pt-4 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check size={32} className="text-green-600" />
        </div>
        <div>
          <p className="text-lg font-bold text-[#1A1A2E]">Card Added!</p>
          <p className="text-sm text-[#6B7280] mt-1">
            {cardType === 'physical'
              ? 'Your physical card will arrive in 3–5 business days.'
              : 'Your virtual card is ready to use immediately.'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-white"
          style={{ background: '#0D1B4B' }}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      {/* Card type */}
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Card Type</label>
        <div className="flex gap-2 mt-2">
          {(['physical', 'virtual'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setCardType(t)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border capitalize ${
                cardType === t
                  ? 'border-[#1A3A8F] text-[#1A3A8F] bg-blue-50'
                  : 'border-gray-200 text-[#6B7280] bg-gray-50'
              }`}
            >
              {t === 'physical' ? '💳 Physical' : '🔮 Virtual'}
            </button>
          ))}
        </div>
      </div>

      {/* Card number */}
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Card Number</label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="1234 5678 9012 3456"
          value={number}
          onChange={(e) => setNumber(formatCardNumber(e.target.value))}
          className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm font-mono text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9] tracking-widest"
        />
      </div>

      {/* Name */}
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Cardholder Name</label>
        <input
          type="text"
          placeholder="ALEX JOHNSON"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm font-medium text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9] uppercase"
        />
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Expiry</label>
          <input
            type="text"
            inputMode="numeric"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">CVV</label>
          <input
            type="password"
            inputMode="numeric"
            placeholder="•••"
            maxLength={4}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      <button
        onClick={handleSubmit}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)' }}
      >
        Add Card
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CardsSection() {
  const [showManage, setShowManage] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-lg font-bold text-[#1A1A2E]">My Cards</h2>
          <button
            onClick={() => setShowManage(true)}
            className="text-sm font-semibold text-[#4A90D9]"
          >
            Manage
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 pb-2">
          {cards.map((card) => (
            <CardView key={card.id} card={card} />
          ))}
          <button
            onClick={() => setShowAddCard(true)}
            className="flex-shrink-0 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#4A90D9]/40 hover:border-[#4A90D9]/70 transition-colors"
            style={{ width: 140, height: 175 }}
          >
            <Plus size={32} className="text-[#4A90D9]" />
            <span className="text-xs font-semibold text-[#4A90D9]">Add Card</span>
          </button>
        </div>
      </div>

      <Modal isOpen={showManage} onClose={() => setShowManage(false)} title="Manage Cards">
        <ManageCardsModal />
      </Modal>

      <Modal isOpen={showAddCard} onClose={() => setShowAddCard(false)} title="Add New Card">
        <AddCardModal onClose={() => setShowAddCard(false)} />
      </Modal>
    </>
  );
}
