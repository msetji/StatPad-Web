'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

interface FollowedUser {
  id: string;
  email: string;
  followedAt: string;
}

interface FollowingProps {
  user: User | null;
}

export default function Following({ user }: FollowingProps) {
  const [following, setFollowing] = useState<FollowedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchFollowing = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('follows')
          .select(`
            following_id,
            created_at,
            following_user:auth.users!follows_following_id_fkey (
              id,
              email
            )
          `)
          .eq('follower_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching following:', error);
        } else {
          const formattedData = data?.map(follow => ({
            id: follow.following_id,
            email: follow.following_user?.email || 'Unknown',
            followedAt: follow.created_at
          })) || [];
          setFollowing(formattedData);
        }
      } catch (error) {
        console.error('Error fetching following:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [user, supabase]);

  const handleUnfollow = async (followingId: string) => {
    try {
      const { error } = await supabase
        .from('follows')
        .delete()
        .eq('follower_id', user?.id)
        .eq('following_id', followingId);

      if (error) {
        console.error('Error unfollowing user:', error);
      } else {
        setFollowing(following.filter(follow => follow.id !== followingId));
      }
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading following...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Following</h1>
        <p className="text-gray-600">Manage the players you're following.</p>
      </div>

      {following.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Not following anyone yet</h3>
          <p className="text-gray-600 mb-4">Start following other players to see their highlights!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {following.map((followedUser) => (
            <div
              key={followedUser.id}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {followedUser.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{followedUser.email}</div>
                  <div className="text-sm text-gray-500">
                    Following since {new Date(followedUser.followedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleUnfollow(followedUser.id)}
                className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                Unfollow
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}