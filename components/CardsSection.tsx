import { Plus } from 'lucide-react';
import { cards, BankCard } from '@/lib/data';

function CardView({ card }: { card: BankCard }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden flex-shrink-0 shadow-xl"
      style={{
        width: 300,
        height: 175,
        background: `linear-gradient(135deg, ${card.gradientFrom} 0%, ${card.gradientTo} 100%)`,
      }}
    >
      {/* Decorative circles */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 160, height: 160, background: 'rgba(255,255,255,0.06)', top: -70, right: -40 }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{ width: 120, height: 120, background: 'rgba(255,255,255,0.05)', bottom: -30, left: -40 }}
      />

      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className="text-[10px] font-semibold text-white/65 px-2 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            {card.cardType === 'physical' ? 'Physical' : 'Virtual'}
          </span>
          {/* Chip */}
          <div
            className="w-8 h-6 rounded"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #F5E07B 100%)' }}
          />
        </div>

        <div className="flex-1" />

        {/* Card number */}
        <p className="font-mono text-lg font-medium text-white tracking-[0.15em] mb-4">
          •••• •••• •••• {card.lastFour}
        </p>

        {/* Bottom row */}
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

function AddCardButton() {
  return (
    <div
      className="flex-shrink-0 rounded-2xl flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#4A90D9]/40 hover:border-[#4A90D9]/70 transition-colors cursor-pointer"
      style={{ width: 140, height: 175 }}
    >
      <Plus size={32} className="text-[#4A90D9]" />
      <span className="text-xs font-semibold text-[#4A90D9]">Add Card</span>
    </div>
  );
}

export default function CardsSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-5">
        <h2 className="text-lg font-bold text-[#1A1A2E]">My Cards</h2>
        <button className="text-sm font-semibold text-[#4A90D9]">Manage</button>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide px-5 pb-2">
        {cards.map((card) => (
          <CardView key={card.id} card={card} />
        ))}
        <AddCardButton />
      </div>
    </div>
  );
}
