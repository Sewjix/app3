import { Music, Package, ShoppingCart, Play, Utensils, Laptop, Coffee, Star } from 'lucide-react';
import { rewardTransactions, RewardTransaction } from '@/lib/data';
import { formatEUR, formatDate } from '@/lib/formatters';

function MerchantIcon({ icon }: { icon: RewardTransaction['icon'] }) {
  const props = { size: 18, className: 'text-[#1A3A8F]' };
  switch (icon) {
    case 'music':
      return <Music {...props} />;
    case 'package':
      return <Package {...props} />;
    case 'shopping-cart':
      return <ShoppingCart {...props} />;
    case 'play':
      return <Play {...props} />;
    case 'utensils':
      return <Utensils {...props} />;
    case 'laptop':
      return <Laptop {...props} />;
    case 'coffee':
      return <Coffee {...props} />;
  }
}

export default function RewardsHistory() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-lg font-bold text-[#1A1A2E]">Points History</h2>
        <button className="text-sm font-semibold text-[#4A90D9]">Export</button>
      </div>

      <div className="space-y-2.5 px-5">
        {rewardTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Merchant icon */}
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0D1B4B]/[0.08]">
              <MerchantIcon icon={tx.icon} />
            </div>

            {/* Name + date */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1A2E]">{tx.merchant}</p>
              <p className="text-xs text-[#6B7280]">{formatDate(tx.date)}</p>
            </div>

            {/* Amount + points */}
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
  );
}
