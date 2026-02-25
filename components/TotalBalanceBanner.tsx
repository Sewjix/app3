'use client';

import { useState } from 'react';
import {
  Globe, Eye, EyeOff, ArrowUpCircle, ArrowDownCircle, PlusCircle, MoreHorizontal,
  Copy, Check, ArrowLeftRight, Receipt, Clock, BarChart2, HelpCircle,
} from 'lucide-react';
import { totalBalance, accounts } from '@/lib/data';
import { formatUSD } from '@/lib/formatters';
import Modal from './Modal';

type ActiveModal = 'send' | 'receive' | 'topup' | 'more' | null;

// ─── Send Modal ───────────────────────────────────────────────────────────────
function SendModal() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [from, setFrom] = useState(accounts[0].id);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!recipient.trim()) { setError('Please enter a recipient.'); return; }
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) { setError('Please enter a valid amount.'); return; }
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
          <p className="text-lg font-bold text-[#1A1A2E]">Payment Sent!</p>
          <p className="text-sm text-[#6B7280] mt-1">
            {formatUSD(parseFloat(amount))} was sent to {recipient}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">From</label>
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm font-medium text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {formatUSD(a.balance)}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">To (Email or Phone)</label>
        <input
          type="text"
          placeholder="e.g. jane@example.com"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
        />
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Amount</label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6B7280]">$</span>
          <input
            type="number"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-7 pr-3 py-3 bg-gray-50 rounded-xl text-sm text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Note (optional)</label>
        <input
          type="text"
          placeholder="What&apos;s it for?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="mt-1 w-full p-3 bg-gray-50 rounded-xl text-sm text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
        />
      </div>

      {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

      <button
        onClick={handleSend}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity"
        style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)' }}
      >
        Send Money
      </button>
    </div>
  );
}

// ─── Receive Modal ────────────────────────────────────────────────────────────
const QR_CELLS = [
  1,1,1,0,1,1,0,1,0,1,
  1,0,1,0,0,1,1,0,1,0,
  1,1,1,1,0,0,1,0,1,1,
  0,0,0,1,1,0,1,1,0,1,
  1,0,1,1,0,1,0,1,1,0,
  1,1,0,0,1,1,0,0,1,1,
  0,1,1,0,1,0,1,1,0,1,
  1,0,1,1,1,0,0,1,0,0,
  1,1,0,1,0,1,1,0,1,1,
  0,1,1,0,1,1,0,1,1,1,
];

function ReceiveModal() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const details = [
    { label: 'Account Holder', value: 'Alex Johnson', raw: 'Alex Johnson', key: 'name' },
    { label: 'Account Number', value: '•••• 4291', raw: '123456784291', key: 'account' },
    { label: 'Routing Number', value: '021000021', raw: '021000021', key: 'routing' },
    { label: 'Bank Name', value: 'NeoBank', raw: 'NeoBank', key: 'bank' },
  ];

  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      <div className="flex justify-center">
        <div className="w-36 h-36 bg-gray-50 rounded-2xl p-2.5 border border-gray-200">
          <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(10, 1fr)' }}>
            {QR_CELLS.map((on, i) => (
              <div
                key={i}
                className={`aspect-square rounded-[1px] ${on ? 'bg-[#0D1B4B]' : 'bg-transparent'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-[#6B7280]">Scan QR or share details below</p>

      <div className="space-y-2.5">
        {details.map((d) => (
          <div key={d.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <div>
              <p className="text-[10px] font-semibold text-[#6B7280] uppercase tracking-wide">{d.label}</p>
              <p className="text-sm font-semibold text-[#1A1A2E] mt-0.5">{d.value}</p>
            </div>
            <button
              onClick={() => copyToClipboard(d.raw, d.key)}
              className="flex items-center gap-1 text-xs font-semibold text-[#4A90D9] px-2.5 py-1.5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              {copied === d.key ? <Check size={12} /> : <Copy size={12} />}
              {copied === d.key ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Top Up Modal ─────────────────────────────────────────────────────────────
function TopUpModal() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('bank');
  const QUICK = ['50', '100', '200', '500'];

  const handleTopUp = () => {
    if (parseFloat(amount) > 0) setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="px-6 pb-8 pt-4 flex flex-col items-center gap-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check size={32} className="text-green-600" />
        </div>
        <div>
          <p className="text-lg font-bold text-[#1A1A2E]">Top Up Successful!</p>
          <p className="text-sm text-[#6B7280] mt-1">
            {formatUSD(parseFloat(amount))} has been added to your Checking Account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-6 pt-4 space-y-4">
      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Quick Select</label>
        <div className="grid grid-cols-4 gap-2 mt-2">
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => setAmount(q)}
              className="py-2.5 rounded-xl text-sm font-bold transition-all"
              style={
                amount === q
                  ? { background: 'linear-gradient(135deg, #0D1B4B, #1A3A8F)', color: 'white' }
                  : { background: '#f3f4f6', color: '#1A1A2E' }
              }
            >
              ${q}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Custom Amount</label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#6B7280]">$</span>
          <input
            type="number"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-7 pr-3 py-3 bg-gray-50 rounded-xl text-sm text-[#1A1A2E] outline-none border border-gray-200 focus:border-[#4A90D9]"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold text-[#6B7280] uppercase tracking-wide">Payment Source</label>
        <div className="flex gap-2 mt-2">
          {[
            { value: 'bank', label: '🏦 Bank Transfer' },
            { value: 'card', label: '💳 Debit Card' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSource(opt.value)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                source === opt.value
                  ? 'border-[#1A3A8F] text-[#1A3A8F] bg-blue-50'
                  : 'border-gray-200 text-[#6B7280] bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleTopUp}
        disabled={!(parseFloat(amount) > 0)}
        className="w-full py-3.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-40"
        style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)' }}
      >
        Top Up {parseFloat(amount) > 0 ? formatUSD(parseFloat(amount)) : ''}
      </button>
    </div>
  );
}

// ─── More Modal ───────────────────────────────────────────────────────────────
const MORE_ACTIONS = [
  { Icon: ArrowLeftRight, label: 'Exchange',   color: '#4A90D9', bg: '#4A90D926' },
  { Icon: Receipt,        label: 'Bill Pay',   color: '#27AE60', bg: '#27AE6026' },
  { Icon: Clock,          label: 'Scheduled',  color: '#F5A623', bg: '#F5A62326' },
  { Icon: BarChart2,      label: 'Statements', color: '#9B59B6', bg: '#9B59B626' },
  { Icon: HelpCircle,     label: 'Help',       color: '#E74C3C', bg: '#E74C3C26' },
];

function MoreModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="px-6 pb-6 pt-4">
      <div className="grid grid-cols-3 gap-3">
        {MORE_ACTIONS.map(({ Icon, label, color, bg }) => (
          <button
            key={label}
            onClick={onClose}
            className="flex flex-col items-center gap-2.5 p-4 rounded-2xl hover:opacity-80 transition-opacity"
            style={{ background: bg }}
          >
            <Icon size={24} color={color} />
            <span className="text-xs font-semibold text-[#1A1A2E]">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
const MODAL_TITLES: Record<Exclude<ActiveModal, null>, string> = {
  send: 'Send Money',
  receive: 'Receive Money',
  topup: 'Top Up',
  more: 'More Options',
};

const QUICK_ACTIONS = [
  { Icon: ArrowUpCircle,   label: 'Send',    modal: 'send'    as const },
  { Icon: ArrowDownCircle, label: 'Receive', modal: 'receive' as const },
  { Icon: PlusCircle,      label: 'Top Up',  modal: 'topup'   as const },
  { Icon: MoreHorizontal,  label: 'More',    modal: 'more'    as const },
];

export default function TotalBalanceBanner() {
  const [visible, setVisible] = useState(true);
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  return (
    <>
      <div className="mx-5">
        <div
          className="relative rounded-3xl overflow-hidden shadow-xl p-6"
          style={{ background: 'linear-gradient(135deg, #0D1B4B 0%, #1A3A8F 100%)' }}
        >
          <div className="absolute rounded-full pointer-events-none" style={{ width: 180, height: 180, background: 'white', opacity: 0.08, top: -90, right: -45 }} />
          <div className="absolute rounded-full pointer-events-none" style={{ width: 130, height: 130, background: 'white', opacity: 0.06, bottom: -30, left: -50 }} />

          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2">
              <Globe size={13} className="text-white/70" />
              <span className="text-sm font-medium text-white/80 flex-1">Total Balance</span>
              <button onClick={() => setVisible(!visible)} className="p-1">
                {visible ? <EyeOff size={13} className="text-white/70" /> : <Eye size={13} className="text-white/70" />}
              </button>
            </div>

            <div className="py-1">
              <span className="text-5xl font-bold text-white tracking-tight">
                {visible ? formatUSD(totalBalance) : '••••••'}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 pt-2">
              {QUICK_ACTIONS.map(({ Icon, label, modal }) => (
                <button
                  key={label}
                  onClick={() => setActiveModal(modal)}
                  className="flex flex-col items-center gap-1.5 hover:opacity-80 transition-opacity"
                >
                  <Icon size={26} className="text-white" />
                  <span className="text-[10px] font-semibold text-white/80">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeModal && (
        <Modal isOpen onClose={() => setActiveModal(null)} title={MODAL_TITLES[activeModal]}>
          {activeModal === 'send'    && <SendModal />}
          {activeModal === 'receive' && <ReceiveModal />}
          {activeModal === 'topup'   && <TopUpModal />}
          {activeModal === 'more'    && <MoreModal onClose={() => setActiveModal(null)} />}
        </Modal>
      )}
    </>
  );
}
