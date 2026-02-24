'use client';

import { useState } from 'react';
import { Globe, Eye, EyeOff, ArrowUpCircle, ArrowDownCircle, PlusCircle, MoreHorizontal } from 'lucide-react';
import { totalBalance } from '@/lib/data';
import { formatUSD } from '@/lib/formatters';

const quickActions = [
  { Icon: ArrowUpCircle, label: 'Send' },
  { Icon: ArrowDownCircle, label: 'Receive' },
  { Icon: PlusCircle, label: 'Top Up' },
  { Icon: MoreHorizontal, label: 'More' },
];

export default function TotalBalanceBanner() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="mx-5">
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl p-6"
        style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)' }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 180, height: 180, background: 'white', opacity: 0.08, top: -90, right: -45 }}
        />
        <div
          className="absolute rounded-full pointer-events-none"
          style={{ width: 130, height: 130, background: 'white', opacity: 0.06, bottom: -30, left: -50 }}
        />

        <div className="relative z-10 space-y-2">
          {/* Label row */}
          <div className="flex items-center gap-2">
            <Globe size={13} className="text-white/70" />
            <span className="text-sm font-medium text-white/80 flex-1">Total Balance</span>
            <button onClick={() => setVisible(!visible)} className="p-1">
              {visible ? (
                <EyeOff size={13} className="text-white/70" />
              ) : (
                <Eye size={13} className="text-white/70" />
              )}
            </button>
          </div>

          {/* Balance */}
          <div className="py-1">
            <span className="text-5xl font-bold text-white tracking-tight">
              {visible ? formatUSD(totalBalance) : '••••••'}
            </span>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {quickActions.map(({ Icon, label }) => (
              <button key={label} className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity">
                <Icon size={26} className="text-white" />
                <span className="text-[10px] font-semibold text-white/80">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
