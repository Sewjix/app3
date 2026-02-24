'use client';

import { Gift, Star, RefreshCw, Info } from 'lucide-react';
import { totalPoints } from '@/lib/data';
import { formatPoints } from '@/lib/formatters';

const TARGET_POINTS = 2000;

export default function RewardsHeaderBanner() {
  const progress = totalPoints / TARGET_POINTS;

  return (
    <div className="mx-5">
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl p-6 space-y-4"
        style={{ background: 'linear-gradient(135deg, #1C1C2E 0%, #2D2D5E 100%)' }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 200, height: 200, background: '#F5A623', opacity: 0.12, top: -80, right: -50 }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 150, height: 150, background: '#F5A623', opacity: 0.08, bottom: -40, left: -60 }}
        />

        <div className="relative z-10 space-y-4">
          {/* Title row */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">My Rewards</h2>
              <p className="text-xs text-white/70">Earn points with every purchase</p>
            </div>
            <Gift size={28} className="text-white/90 flex-shrink-0" />
          </div>

          <hr className="border-white/20" />

          {/* Points row */}
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
              className="flex flex-col items-center gap-1 px-3.5 py-2.5 rounded-xl hover:opacity-80 transition-opacity"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <RefreshCw size={13} className="text-[#F5A623]" />
              <span className="text-[10px] font-bold text-white">Redeem</span>
            </button>
          </div>

          {/* Conversion rule */}
          <div className="flex items-center gap-1.5">
            <Info size={11} className="text-white/55 flex-shrink-0" />
            <p className="text-[10px] text-white/60">€1 spent = 1 point earned&nbsp;&nbsp;•&nbsp;&nbsp;100 points = €1 reward</p>
          </div>

          {/* Progress bar */}
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
  );
}
