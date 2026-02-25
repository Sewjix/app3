'use client';

import { useState } from 'react';
import { Bell, User, CheckCheck } from 'lucide-react';
import { getGreeting } from '@/lib/formatters';
import Modal from './Modal';

interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  emoji: string;
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    title: 'Payment Received',
    body: '$250.00 received from John D.',
    time: '5 min ago',
    read: false,
    emoji: '💸',
  },
  {
    id: '2',
    title: 'Reward Points Earned',
    body: 'You earned 135 points from Amazon!',
    time: '2 hours ago',
    read: false,
    emoji: '⭐',
  },
  {
    id: '3',
    title: 'Security Alert',
    body: 'New sign-in detected from iOS device.',
    time: 'Yesterday',
    read: true,
    emoji: '🔒',
  },
];

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  return (
    <>
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
        <button
          onClick={() => setShowNotifications(true)}
          className="relative w-11 h-11 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        >
          <Bell size={20} className="text-[#1A1A2E]" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </div>

      <Modal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notifications"
      >
        <div className="px-6 pb-6 pt-4 space-y-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#4A90D9] ml-auto"
            >
              <CheckCheck size={14} />
              Mark all as read
            </button>
          )}
          {notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={`w-full flex items-start gap-3 p-3.5 rounded-2xl transition-colors text-left ${
                n.read ? 'bg-gray-50' : 'bg-blue-50'
              }`}
            >
              <span className="text-2xl flex-shrink-0">{n.emoji}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm text-[#1A1A2E] ${n.read ? 'font-semibold' : 'font-bold'}`}>
                    {n.title}
                  </p>
                  {!n.read && <span className="w-2 h-2 bg-[#4A90D9] rounded-full flex-shrink-0" />}
                </div>
                <p className="text-xs text-[#6B7280] mt-0.5">{n.body}</p>
                <p className="text-[10px] text-[#6B7280] mt-1">{n.time}</p>
              </div>
            </button>
          ))}
          {unreadCount === 0 && (
            <p className="text-center text-sm text-[#6B7280] py-4">All caught up! 🎉</p>
          )}
        </div>
      </Modal>
    </>
  );
}
