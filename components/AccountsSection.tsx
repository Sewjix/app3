import { CreditCard, Banknote, TrendingUp, ChevronRight } from 'lucide-react';
import { accounts, Account } from '@/lib/data';
import { formatUSD } from '@/lib/formatters';

function AccountIcon({ icon, accentColor }: { icon: Account['icon']; accentColor: string }) {
  const props = { size: 20, color: accentColor };
  switch (icon) {
    case 'credit-card':
      return <CreditCard {...props} />;
    case 'banknote':
      return <Banknote {...props} />;
    case 'trending-up':
      return <TrendingUp {...props} />;
  }
}

export default function AccountsSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-lg font-bold text-[#1A1A2E]">My Accounts</h2>
        <button className="text-sm font-semibold text-[#4A90D9]">See all</button>
      </div>

      <div className="space-y-2.5 px-5">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${account.accentColor}26` }}
            >
              <AccountIcon icon={account.icon} accentColor={account.accentColor} />
            </div>

            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1A1A2E]">{account.name}</p>
              <p className="text-xs text-[#6B7280]">Available</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-sm font-bold text-[#1A1A2E]">{formatUSD(account.balance)}</span>
              <ChevronRight size={12} className="text-[#6B7280]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
