'use client';

import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import { ReactNode } from 'react';

type TabType = 'overview' | 'feed' | 'stats' | 'posts' | 'following' | 'settings' | 'new-post';

interface DashboardLayoutProps {
  user: User | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onSignOut: () => void;
  children: ReactNode;
}

export default function DashboardLayout({
  user,
  activeTab,
  onTabChange,
  onSignOut,
  children,
}: DashboardLayoutProps) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'feed', label: 'Feed', icon: '🏀' },
    { id: 'stats', label: 'Stats', icon: '📈' },
    { id: 'posts', label: 'Posts', icon: '📱' },
    { id: 'following', label: 'Following', icon: '👥' },
    { id: 'new-post', label: 'New Post', icon: '➕' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image 
              src="/logos/icon.png" 
              alt="StatPad Logo" 
              width={32} 
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold text-gray-900">StatPad Dashboard</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {user?.email}
            </span>
            <button
              onClick={onSignOut}
              className="text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id as TabType)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-96">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}