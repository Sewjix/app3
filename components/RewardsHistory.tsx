'use client';

import { useState } from 'react';
import { Music, Package, ShoppingCart, Play, Utensils, Laptop, Coffee, Star, Check } from 'lucide-react';
import { rewardTransactions, RewardTransaction } from '@/lib/data';
import { formatEUR, formatDate } from '@/lib/formatters';
import Modal from './Modal';

function MerchantIcon({ icon }: { icon: RewardTransaction['icon'] }) {
  const props = { size: 18, className: 'text-[#1A3A8F]' };
  switch (icon) {
    case 'music':         return <Music         {...props} />;
    case 'package':       return <Package       {...props} />;
    case 'shopping-cart': return <ShoppingCart  {...props} />;
    case 'play':          return <Play          {...props} />;
    case 'utensils':      return <Utensils      {...props} />;
    case 'laptop':        return <Laptop        {...props} />;
    case 'coffee':        return <Coffee        {...props} />;
  }
}

// ─── Export Modal ─────────────────────────────────────────────────────────────
function ExportModal({ onClose }: { onClose: () => void }) {
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [range, setRange] = useState<'30d' | '3m' | '6m'>('30d');

  const downloadCSV = () => {
    const header = 'Date,Merchant,Amount (EUR),Points Earned';
    const rows = rewardTransactions.map((tx) => {
      const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(tx.date);
      return `${date},"${tx.merchant}",€${tx.amountSpent.toFixed(2)},${tx.pointsEarned}`;
    });
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neobank-transactions-${range}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleExport = () => {
    if (format === 'csv') {
      downloadCSV();
    } else {
      // PDF: open print dialog as a fallback
      window.print();
      onClose();
    }
  };

  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      {/* Format */}
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Format</label>
        <div className="flex gap-2 mt-2">
          {[
            { value: 'csv', label: '📊 CSV' },
            { value: 'pdf', label: '📄 PDF' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFormat(f.value as 'csv' | 'pdf')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                format === f.value
                  ? 'border-[#1A3A8F] text-[#1A3A8F] bg-blue-50'
                  : 'border-gray-200 text-[#6B7280] bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Range */}
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Date Range</label>
        <div className="flex gap-2 mt-2">
          {[
            { value: '30d', label: 'Last 30 days' },
            { value: '3m',  label: '3 months' },
            { value: '6m',  label: '6 months' },
          ].map((r) => (
            <button
              key={r.value}
              onClick={() => setRange(r.value as '30d' | '3m' | '6m')}
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-semibold transition-all border ${
                range === r.value
                  ? 'border-[#1A3A8F] text-[#1A3A8F] bg-blue-50'
                  : 'border-gray-200 text-[#6B7280] bg-gray-50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
        <Check size={14} className="text-[#27AE60] flex-shrink-0" />
        <p className="text-xs text-[#6B7280]">
          Exporting <strong className="text-[#1A1A2E]">{rewardTransactions.length} transactions</strong> for the selected period.
        </p>
      </div>

      <button
        onClick={handleExport}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)' }}
      >
        Export {format.toUpperCase()}
      </button>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function RewardsHistory() {
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-lg font-bold text-[#1A1A2E]">Points History</h2>
          <button
            onClick={() => setShowExport(true)}
            className="text-sm font-semibold text-[#4A90D9]"
          >
            Export
          </button>
        </div>

        <div className="space-y-2.5 px-5">
          {rewardTransactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0D1B4B]/[0.08]">
                <MerchantIcon icon={tx.icon} />
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold text-[#1A1A2E]">{tx.merchant}</p>
                <p className="text-xs text-[#6B7280]">{formatDate(tx.date)}</p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-sm font-semibold text-[#1A1A2E]">{formatEUR(tx.amountSpent)}</span>
                <span
                  className="flex items-center gap-1 text-xs font-bold text-[#27AE60] px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(39,174,96,0.1)' }}
                >
                  <Star size={9} fill="#27AE60" className="text-[#27AE60]" />
                  +{tx.pointsEarned} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={showExport} onClose={() => setShowExport(false)} title="Export History">
        <ExportModal onClose={() => setShowExport(false)} />
      </Modal>
    </>
  );
}
