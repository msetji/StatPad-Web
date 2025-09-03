'use client';

import { User } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Chart, Basketball, ChartLine, Smartphone, Users, Plus, Settings } from '@/components/icons';

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
    { id: 'overview', label: 'Overview', iconComponent: Chart },
    { id: 'feed', label: 'Feed', iconComponent: Basketball },
    { id: 'stats', label: 'Stats', iconComponent: ChartLine },
    { id: 'posts', label: 'Posts', iconComponent: Smartphone },
    { id: 'following', label: 'Following', iconComponent: Users },
    { id: 'new-post', label: 'New Post', iconComponent: Plus },
    { id: 'settings', label: 'Settings', iconComponent: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/logos/icon.png" 
              alt="StatPad Logo" 
              width={32} 
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold text-gray-900">StatPad Dashboard</span>
          </Link>
          
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
                {tabs.map((tab) => {
                  const IconComponent = tab.iconComponent;
                  const isActive = activeTab === tab.id;
                  
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id as TabType)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <IconComponent 
                        size={20} 
                        className={isActive ? 'text-white' : 'text-orange-500'} 
                      />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
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