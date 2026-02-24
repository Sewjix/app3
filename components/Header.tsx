'use client';

import { Bell, User } from 'lucide-react';
import { getGreeting } from '@/lib/formatters';

export default function Header() {
  return (
    <div className="flex items-center gap-3.5 px-5">
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0"
        style={{ background: 'linear-gradient(135deg, #1A3A8F 0%, #4A90D9 100%)' }}
      >
        <User size={22} className="text-white" />
      </div>

      <div className="flex-1">
        <p className="text-sm text-[#6B7280]">{getGreeting()}</p>
        <p className="text-lg font-bold text-[#1A1A2E] leading-tight">Alex Johnson</p>
      </div>

      {/* Notification bell */}
      <button className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
        <Bell size={20} className="text-[#1A1A2E]" />
        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </div>
  );
}
