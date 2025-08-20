'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

interface GameData {
  game: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  date: string;
}

export default function Stats({ user }: StatsProps) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [gameData, setGameData] = useState<GameData[]>([]);
  const [selectedStats, setSelectedStats] = useState<string[]>(['points', 'rebounds', 'assists', 'steals']);
  const supabase = createClient();

  useEffect(() => {
    let isMounted = true;

    const fetchUserStats = async () => {
      if (!user) return;

      try {
        // Fetch user posts to calculate stats
        const { data: userPosts } = await supabase
          .from('posts')
          .select('points, rebounds, assists, steals, created_at')
          .eq('userId', user.id)
          .order('created_at', { ascending: false });

        if (!isMounted) return;

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
          setGameData([]);
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

        // Prepare last 10 games data for line chart
        const last10Games = userPosts.slice(0, 10).reverse().map((post, index) => ({
          game: index + 1,
          points: post.points || 0,
          rebounds: post.rebounds || 0,
          assists: post.assists || 0,
          steals: post.steals || 0,
          date: new Date(post.created_at).toLocaleDateString()
        }));

        if (!isMounted) return;

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

        setGameData(last10Games);
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user stats:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUserStats();

    return () => {
      isMounted = false;
    };
  }, [user, supabase]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading stats...</div>
      </div>
    );
  }

  const totalStats = [
    { label: 'Games Played', value: profile?.games_played || 0, icon: '🏀' },
    { label: 'Total Points', value: profile?.total_points || 0, icon: '⭐' },
    { label: 'Total Rebounds', value: profile?.total_rebounds || 0, icon: '🔄' },
    { label: 'Total Assists', value: profile?.total_assists || 0, icon: '🤝' },
    { label: 'Total Steals', value: profile?.total_steals || 0, icon: '⚡' },
  ];

  const avgStats = [
    { label: 'Avg Points', value: profile?.avg_points || 0, icon: '⭐' },
    { label: 'Avg Rebounds', value: profile?.avg_rebounds || 0, icon: '🔄' },
    { label: 'Avg Assists', value: profile?.avg_assists || 0, icon: '🤝' },
    { label: 'Avg Steals', value: profile?.avg_steals || 0, icon: '⚡' },
  ];

  const statOptions = [
    { key: 'points', label: 'Points', color: '#3B82F6' },
    { key: 'rebounds', label: 'Rebounds', color: '#10B981' },
    { key: 'assists', label: 'Assists', color: '#F59E0B' },
    { key: 'steals', label: 'Steals', color: '#EF4444' },
  ];

  const handleStatToggle = (statKey: string) => {
    setSelectedStats(prev => 
      prev.includes(statKey) 
        ? prev.filter(s => s !== statKey)
        : [...prev, statKey]
    );
  };

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
              <div className="text-2xl mb-2">{stat.icon}</div>
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
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-green-900 mb-1">
                {stat.value.toFixed(1)}
              </div>
              <div className="text-sm text-green-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Last 10 Games Trend */}
      {gameData.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Last 10 Games Trend</h2>
          
          {/* Stat Selection Buttons */}
          <div className="mb-4 flex flex-wrap gap-2">
            {statOptions.map((stat) => (
              <button
                key={stat.key}
                onClick={() => handleStatToggle(stat.key)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedStats.includes(stat.key)
                    ? 'text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{
                  backgroundColor: selectedStats.includes(stat.key) ? stat.color : undefined
                }}
              >
                {stat.label}
              </button>
            ))}
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {gameData && gameData.length > 0 && (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={gameData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="game" 
                    label={{ value: 'Game', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Game ${label}`}
                  />
                  <Legend />
                  {statOptions.map((stat) => 
                    selectedStats.includes(stat.key) && (
                      <Line
                        key={stat.key}
                        type="monotone"
                        dataKey={stat.key}
                        stroke={stat.color}
                        strokeWidth={2}
                        dot={{ fill: stat.color, strokeWidth: 2, r: 4 }}
                        name={stat.label}
                        connectNulls={false}
                      />
                    )
                  )}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      )}

      {/* Performance Insights */}
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-900 mb-2">💡 Performance Insights</h3>
        <p className="text-yellow-700 text-sm">
          {profile?.games_played === 0 
            ? "Start tracking your games to see detailed statistics and insights!"
            : gameData.length > 0 
              ? "Track your performance trends in the chart above. Click stat buttons to show/hide different metrics!"
              : "Your stats are synced from the StatPad mobile app. Keep playing to improve your averages!"
          }
        </p>
      </div>
    </div>
  );
}