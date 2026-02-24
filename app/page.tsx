'use client';

import { useState } from 'react';
import { Home, Star } from 'lucide-react';
import HomeView from '@/components/HomeView';
import RewardsView from '@/components/RewardsView';

type Tab = 'home' | 'rewards';

export default function Page() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen" style={{ background: '#F0F3F8' }}>
      {/* Main content — padded so it doesn't hide behind the fixed bottom nav */}
      <div className="pb-20">{activeTab === 'home' ? <HomeView /> : <RewardsView />}</div>

      {/* Fixed bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="max-w-lg mx-auto flex">
          <TabItem
            icon={
              <Home
                size={22}
                className={activeTab === 'home' ? 'text-[#0D1B4B]' : 'text-gray-400'}
                fill={activeTab === 'home' ? '#0D1B4B' : 'none'}
              />
            }
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <TabItem
            icon={
              <Star
                size={22}
                className={activeTab === 'rewards' ? 'text-[#0D1B4B]' : 'text-gray-400'}
                fill={activeTab === 'rewards' ? '#0D1B4B' : 'none'}
              />
            }
            label="Rewards"
            isActive={activeTab === 'rewards'}
            onClick={() => setActiveTab('rewards')}
          />
        </div>
      </nav>
    </div>
  );
}

function TabItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center py-3 gap-1 transition-colors ${
        isActive ? 'text-[#0D1B4B]' : 'text-gray-400'
      }`}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}
