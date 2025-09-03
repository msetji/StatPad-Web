'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import { Basketball, Star, RefreshCcw, Handshake, Zap, Smartphone, Users, ArrowRight } from '@/components/icons';

interface UserStats {
  gamesPlayed: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

interface OverviewProps {
  user: User | null;
}

export default function Overview({ user }: OverviewProps) {
  const [stats, setStats] = useState<UserStats>({
    gamesPlayed: 0,
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;

      try {
        // Fetch user posts count
        const { count: postsCount } = await supabase
          .from('posts')
          .select('*', { count: 'exact', head: true })
          .eq('userId', user.id);

        // Fetch followers count
        const { count: followersCount } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', user.id);

        // Fetch following count
        const { count: followingCount } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', user.id);

        // Fetch user posts to calculate stats totals
        const { data: userPosts } = await supabase
          .from('posts')
          .select('points, rebounds, assists, steals')
          .eq('userId', user.id);

        // Calculate totals from posts
        const totals = userPosts?.reduce((acc, post) => ({
          points: acc.points + (post.points || 0),
          rebounds: acc.rebounds + (post.rebounds || 0),
          assists: acc.assists + (post.assists || 0),
          steals: acc.steals + (post.steals || 0),
        }), { points: 0, rebounds: 0, assists: 0, steals: 0 }) || { points: 0, rebounds: 0, assists: 0, steals: 0 };

        setStats({
          gamesPlayed: userPosts?.length || 0,
          points: totals.points,
          rebounds: totals.rebounds,
          assists: totals.assists,
          steals: totals.steals,
          postsCount: postsCount || 0,
          followersCount: followersCount || 0,
          followingCount: followingCount || 0,
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [user, supabase]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading stats...</div>
      </div>
    );
  }

  const statCards = [
    { label: 'Games Played', value: stats.gamesPlayed, icon: <Basketball size={24} className="text-orange-500" /> },
    { label: 'Total Points', value: stats.points, icon: <Star size={24} className="text-orange-500" /> },
    { label: 'Total Rebounds', value: stats.rebounds, icon: <RefreshCcw size={24} className="text-orange-500" /> },
    { label: 'Total Assists', value: stats.assists, icon: <Handshake size={24} className="text-orange-500" /> },
    { label: 'Total Steals', value: stats.steals, icon: <Zap size={24} className="text-orange-500" /> },
    { label: 'Posts', value: stats.postsCount, icon: <Smartphone size={24} className="text-orange-500" /> },
    { label: 'Followers', value: stats.followersCount, icon: <Users size={24} className="text-orange-500" /> },
    { label: 'Following', value: stats.followingCount, icon: <ArrowRight size={24} className="text-orange-500" /> },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's your performance summary.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200"
          >
            <div className="mb-2 flex justify-center">{stat.icon}</div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stat.value.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Actions</h3>
        <p className="text-blue-700 text-sm">
          Upload your latest highlights, check your stats, or connect with other players.
        </p>
      </div>
    </div>
  );
}