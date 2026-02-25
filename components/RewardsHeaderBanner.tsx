'use client';

import { useState } from 'react';
import { Gift, Star, RefreshCw, Info, Check } from 'lucide-react';
import { totalPoints } from '@/lib/data';
import { formatPoints } from '@/lib/formatters';
import Modal from './Modal';

const TARGET_POINTS = 2000;

// ─── Redeem Modal ─────────────────────────────────────────────────────────────
const REDEEM_OPTIONS = [
  { id: 'cashback', emoji: '💵', title: 'Cash Back',       desc: '1,450 pts → $14.50',           pts: 1450 },
  { id: 'giftcard', emoji: '🎁', title: 'Gift Card',       desc: '1,000 pts → $10 gift card',    pts: 1000 },
  { id: 'travel',   emoji: '✈️', title: 'Travel Credit',   desc: '500 pts → $5 travel credit',   pts: 500  },
];

function RedeemModal({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [redeemed, setRedeemed] = useState(false);

  if (redeemed) {
    return (
      <div className="px-6 pb-8 pt-4 flex flex-col items-center gap-4 text-center">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: '#F5A62326' }}
        >
          <span className="text-3xl">⭐</span>
        </div>
        <div>
          <p className="text-lg font-bold text-[#1A1A2E]">Redeemed!</p>
          <p className="text-sm text-[#6B7280] mt-1">
            Your reward has been applied to your account.
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
    <div className="px-6 pb-6 pt-4 space-y-3">
      <p className="text-sm text-[#6B7280]">
        Choose how to redeem your{' '}
        <strong className="text-[#1A1A2E]">{formatPoints(totalPoints)} points</strong>
      </p>
      {REDEEM_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setSelected(opt.id)}
          className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border-2 transition-all text-left ${
            selected === opt.id
              ? 'border-[#F5A623] bg-amber-50'
              : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
          }`}
        >
          <span className="text-2xl flex-shrink-0">{opt.emoji}</span>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#1A1A2E]">{opt.title}</p>
            <p className="text-xs text-[#6B7280] mt-0.5">{opt.desc}</p>
          </div>
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${
              selected === opt.id ? 'border-[#F5A623] bg-[#F5A623]' : 'border-gray-300'
            }`}
          >
            {selected === opt.id && <Check size={11} className="text-white" />}
          </div>
        </button>
      ))}
      <button
        onClick={() => { if (selected) setRedeemed(true); }}
        disabled={!selected}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #F5A623, #FBBF24)' }}
      >
        Redeem Now
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RewardsHeaderBanner() {
  const [showRedeem, setShowRedeem] = useState(false);
  const progress = totalPoints / TARGET_POINTS;

  return (
    <>
      <div className="mx-5">
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl p-6 space-y-4"
          style={{ background: 'linear-gradient(135deg, #1C1C2E 0%, #2D2D5E 100%)' }}
        >
          <div className="absolute rounded-full pointer-events-none" style={{ width: 200, height: 200, background: '#F5A623', opacity: 0.12, top: -80, right: -50 }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 150, height: 150, background: '#F5A623', opacity: 0.08, bottom: -40, left: -60 }} />

          <div className="relative z-10 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">My Rewards</h2>
                <p className="text-xs text-white/70">Earn points with every purchase</p>
              </div>
              <Gift size={28} className="text-white/90 flex-shrink-0" />
            </div>

            <hr className="border-white/20" />

            <div className="flex items-center gap-3">
              <div
                className="rounded-full flex items-center justify-center flex-shrink-0"
                style={{ width: 60, height: 60, background: 'rgba(255,255,255,0.15)' }}
              >
                <Star size={28} fill="#F5A623" className="text-[#F5A623] animate-pulse-scale" />
              </div>

              <div className="flex-1">
                <p className="text-sm text-white/75">You have</p>
                <p className="text-3xl font-bold text-white">{formatPoints(totalPoints)} Points</p>
              </div>

              <button
                onClick={() => setShowRedeem(true)}
                className="flex flex-col items-center gap-1 px-3.5 py-2.5 rounded-xl hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.15)' }}
              >
                <RefreshCw size={13} className="text-[#F5A623]" />
                <span className="text-[10px] font-bold text-white">Redeem</span>
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <Info size={11} className="text-white/55 flex-shrink-0" />
              <p className="text-[10px] text-white/60">€1 spent = 1 point earned&nbsp;&nbsp;•&nbsp;&nbsp;100 points = €1 reward</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between">
                <span className="text-xs text-white/70">Progress to next reward</span>
                <span className="text-xs font-semibold text-white/90">
                  {formatPoints(totalPoints)} / {formatPoints(TARGET_POINTS)} pts
                </span>
              </div>
              <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
                <div
                  className="h-2 rounded-full transition-all duration-700"
                  style={{
                    width: `${progress * 100}%`,
                    background: 'linear-gradient(90deg, #F5A623 0%, #FBBF24 100%)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showRedeem} onClose={() => setShowRedeem(false)} title="Redeem Points">
        <RedeemModal onClose={() => setShowRedeem(false)} />
      </Modal>
    </>
  );
}
