'use client';

import { useState } from 'react';
import { CreditCard, Banknote, TrendingUp, ChevronRight, ArrowLeftRight, Download, Plus, X } from 'lucide-react';
import { accounts, Account } from '@/lib/data';
import { formatUSD } from '@/lib/formatters';
import Modal from './Modal';

function AccountIcon({ icon, accentColor }: { icon: Account['icon']; accentColor: string }) {
  const props = { size: 20, color: accentColor };
  switch (icon) {
    case 'credit-card': return <CreditCard {...props} />;
    case 'banknote':    return <Banknote {...props} />;
    case 'trending-up': return <TrendingUp {...props} />;
  }
}

const MINI_TX_BY_ACCOUNT: Record<string, { label: string; amount: number; date: string }[]> = {
  '1': [
    { label: 'Starbucks',      amount: -6.50,    date: 'Today' },
    { label: 'Direct Deposit', amount: 2400.00,  date: 'Yesterday' },
    { label: 'Netflix',        amount: -15.49,   date: 'Feb 20' },
  ],
  '2': [
    { label: 'Interest Credit', amount: 42.10,  date: 'Feb 1' },
    { label: 'Auto-Save',       amount: 500.00, date: 'Jan 30' },
    { label: 'Transfer In',     amount: 1000.00,date: 'Jan 15' },
  ],
  '3': [
    { label: 'AAPL Dividend',  amount: 18.50,  date: 'Feb 10' },
    { label: 'ETF Purchase',   amount: -200.00, date: 'Feb 5' },
    { label: 'Rebalance',      amount: 55.25,  date: 'Jan 28' },
  ],
};

const LAST_FOUR: Record<string, string> = { '1': '4291', '2': '7736', '3': '8821' };

function AccountDetailModal({ account, onClose }: { account: Account; onClose: () => void }) {
  const txs = MINI_TX_BY_ACCOUNT[account.id] ?? [];
  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      {/* Balance hero */}
      <div
        className="rounded-2xl p-5 text-center"
        style={{ background: `${account.accentColor}15` }}
      >
        <div
          className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center mb-3"
          style={{ background: `${account.accentColor}26` }}
        >
          <AccountIcon icon={account.icon} accentColor={account.accentColor} />
        </div>
        <p className="text-sm text-[#6B7280]">{account.name}</p>
        <p className="text-3xl font-bold text-[#1A1A2E] mt-1">{formatUSD(account.balance)}</p>
        <p className="text-xs text-[#6B7280] mt-1">Account •••• {LAST_FOUR[account.id]}</p>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { Icon: ArrowLeftRight, label: 'Transfer' },
          { Icon: Download,       label: 'Deposit' },
          { Icon: Plus,           label: 'Add Funds' },
        ].map(({ Icon, label }) => (
          <button
            key={label}
            onClick={onClose}
            className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Icon size={18} className="text-[#1A3A8F]" />
            <span className="text-xs font-semibold text-[#1A1A2E]">{label}</span>
          </button>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <p className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide mb-2">Recent Activity</p>
        <div className="space-y-0">
          {txs.map((tx) => (
            <div
              key={tx.label}
              className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-sm font-medium text-[#1A1A2E]">{tx.label}</p>
                <p className="text-xs text-[#6B7280]">{tx.date}</p>
              </div>
              <span className={`text-sm font-bold ${tx.amount > 0 ? 'text-[#27AE60]' : 'text-[#1A1A2E]'}`}>
                {tx.amount > 0 ? '+' : ''}{formatUSD(tx.amount)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AllAccountsModal({ onSelect, onClose }: { onSelect: (a: Account) => void; onClose: () => void }) {
  return (
    <div className="px-6 pb-6 pt-4 space-y-3">
      <p className="text-sm text-[#6B7280]">Tap an account to view details.</p>
      {accounts.map((account) => (
        <button
          key={account.id}
          onClick={() => { onClose(); setTimeout(() => onSelect(account), 150); }}
          className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors text-left"
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
          <span className="text-sm font-bold text-[#1A1A2E]">{formatUSD(account.balance)}</span>
        </button>
      ))}
      <button
        onClick={onClose}
        className="w-full flex items-center justify-center gap-2 py-3.5 border-2 border-dashed border-[#4A90D9]/40 rounded-2xl text-sm font-semibold text-[#4A90D9] hover:border-[#4A90D9]/70 transition-colors"
      >
        <X size={16} />
        Add New Account
      </button>
    </div>
  );
}

export default function AccountsSection() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between px-5">
          <h2 className="text-lg font-bold text-[#1A1A2E]">My Accounts</h2>
          <button
            onClick={() => setShowAll(true)}
            className="text-sm font-semibold text-[#4A90D9]"
          >
            See all
          </button>
        </div>

        <div className="space-y-2.5 px-5">
          {accounts.map((account) => (
            <button
              key={account.id}
              onClick={() => setSelectedAccount(account)}
              className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left"
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
            </button>
          ))}
        </div>
      </div>

      {/* Account detail modal */}
      {selectedAccount && (
        <Modal
          isOpen
          onClose={() => setSelectedAccount(null)}
          title={selectedAccount.name}
        >
          <AccountDetailModal
            account={selectedAccount}
            onClose={() => setSelectedAccount(null)}
          />
        </Modal>
      )}

      {/* See all modal */}
      <Modal isOpen={showAll} onClose={() => setShowAll(false)} title="All Accounts">
        <AllAccountsModal
          onSelect={setSelectedAccount}
          onClose={() => setShowAll(false)}
        />
      </Modal>
    </>
  );
}
