'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Overview from '@/components/dashboard/Overview';
import Feed from '@/components/dashboard/Feed';
import Stats from '@/components/dashboard/Stats';
import Posts from '@/components/dashboard/Posts';
import Following from '@/components/dashboard/Following';
import Settings from '@/components/dashboard/Settings';
import NewPost from '@/components/dashboard/NewPost';

type TabType = 'overview' | 'feed' | 'stats' | 'posts' | 'following' | 'settings' | 'new-post';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth';
        return;
      }
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview user={user} />;
      case 'feed':
        return <Feed user={user} />;
      case 'stats':
        return <Stats user={user} />;
      case 'posts':
        return <Posts user={user} />;
      case 'following':
        return <Following user={user} />;
      case 'settings':
        return <Settings user={user} onSignOut={handleSignOut} />;
      case 'new-post':
        return <NewPost user={user} onSuccess={() => setActiveTab('posts')} />;
      default:
        return <Overview user={user} />;
    }
  };

  return (
    <DashboardLayout
      user={user}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onSignOut={handleSignOut}
    >
      {renderContent()}
    </DashboardLayout>
  );
}