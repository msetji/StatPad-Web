'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import { Basketball, Star, RefreshCcw, Handshake, Zap, Lightbulb } from '@/components/icons';

interface StatsProps {
  user: User | null;
}

interface UserProfile {
  games_played: number;
  total_points: number;
  total_rebounds: number;
  total_assists: number;
  total_steals: number;
  avg_points: number;
  avg_rebounds: number;
  avg_assists: number;
  avg_steals: number;
}

export default function Stats({ user }: StatsProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user) return;

      try {
        // Fetch user posts to calculate stats
        const { data: userPosts } = await supabase
          .from('posts')
          .select('points, rebounds, assists, steals')
          .eq('userId', user.id);

        if (!userPosts) {
          setProfile({
            games_played: 0,
            total_points: 0,
            total_rebounds: 0,
            total_assists: 0,
            total_steals: 0,
            avg_points: 0,
            avg_rebounds: 0,
            avg_assists: 0,
            avg_steals: 0,
          });
          setLoading(false);
          return;
        }

        // Calculate totals
        const totals = userPosts.reduce((acc, post) => ({
          points: acc.points + (post.points || 0),
          rebounds: acc.rebounds + (post.rebounds || 0),
          assists: acc.assists + (post.assists || 0),
          steals: acc.steals + (post.steals || 0),
        }), { points: 0, rebounds: 0, assists: 0, steals: 0 });

        const gamesPlayed = userPosts.length;

        setProfile({
          games_played: gamesPlayed,
          total_points: totals.points,
          total_rebounds: totals.rebounds,
          total_assists: totals.assists,
          total_steals: totals.steals,
          avg_points: gamesPlayed > 0 ? totals.points / gamesPlayed : 0,
          avg_rebounds: gamesPlayed > 0 ? totals.rebounds / gamesPlayed : 0,
          avg_assists: gamesPlayed > 0 ? totals.assists / gamesPlayed : 0,
          avg_steals: gamesPlayed > 0 ? totals.steals / gamesPlayed : 0,
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

  const totalStats = [
    { label: 'Games Played', value: profile?.games_played || 0, icon: <Basketball size={32} className="text-orange-500" /> },
    { label: 'Total Points', value: profile?.total_points || 0, icon: <Star size={32} className="text-orange-500" /> },
    { label: 'Total Rebounds', value: profile?.total_rebounds || 0, icon: <RefreshCcw size={32} className="text-orange-500" /> },
    { label: 'Total Assists', value: profile?.total_assists || 0, icon: <Handshake size={32} className="text-orange-500" /> },
    { label: 'Total Steals', value: profile?.total_steals || 0, icon: <Zap size={32} className="text-orange-500" /> },
  ];

  const avgStats = [
    { label: 'Avg Points', value: profile?.avg_points || 0, icon: <Star size={32} className="text-orange-500" /> },
    { label: 'Avg Rebounds', value: profile?.avg_rebounds || 0, icon: <RefreshCcw size={32} className="text-orange-500" /> },
    { label: 'Avg Assists', value: profile?.avg_assists || 0, icon: <Handshake size={32} className="text-orange-500" /> },
    { label: 'Avg Steals', value: profile?.avg_steals || 0, icon: <Zap size={32} className="text-orange-500" /> },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Stats</h1>
        <p className="text-gray-600">Track your basketball performance over time.</p>
      </div>

      {/* Career Totals */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Totals</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {totalStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200"
            >
              <div className="mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-900 mb-1">
                {stat.value.toLocaleString()}
              </div>
              <div className="text-sm text-blue-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Per Game Averages */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Per Game Averages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {avgStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200"
            >
              <div className="mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-green-900 mb-1">
                {stat.value.toFixed(1)}
              </div>
              <div className="text-sm text-green-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Insights */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
          <Lightbulb size={20} className="text-orange-500" />
          Performance Insights
        </h3>
        <p className="text-yellow-700 text-sm">
          {profile?.games_played === 0 
            ? "Start tracking your games to see detailed statistics and insights!"
            : "Your stats are synced from the StatPad mobile app. Keep playing to improve your averages!"
          }
        </p>
      </div>
    </div>
  );
}