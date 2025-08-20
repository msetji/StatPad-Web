'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

interface Post {
  id: string;
  userId: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  body: string;
  file: string | null;
  thumbnail_url: string | null;
  created_at: string;
}

interface PostsProps {
  user: User | null;
}

export default function Posts({ user }: PostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('userId', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching posts:', error);
        } else {
          setPosts(data || []);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [user, supabase]);

  const handleDeletePost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        console.error('Error deleting post:', error);
      } else {
        setPosts(posts.filter(post => post.id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
        <p className="text-gray-600">View and manage your basketball game posts.</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏀</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-4">Start sharing your basketball highlights!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </div>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{post.points}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{post.rebounds}</div>
                  <div className="text-sm text-gray-600">Rebounds</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{post.assists}</div>
                  <div className="text-sm text-gray-600">Assists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{post.steals}</div>
                  <div className="text-sm text-gray-600">Steals</div>
                </div>
              </div>

              {post.file && (
                <div className="border-t pt-4 mb-4">
                  {post.file.includes('.mp4') || post.file.includes('.mov') || post.file.includes('.avi') ? (
                    <video
                      src={post.file}
                      controls
                      className="w-full max-w-md rounded-lg"
                      poster={post.thumbnail_url || undefined}
                    />
                  ) : (
                    <img
                      src={post.file}
                      alt="Post media"
                      className="w-full max-w-md rounded-lg object-cover"
                    />
                  )}
                </div>
              )}

              {post.body && (
                <div className="border-t pt-4">
                  <p className="text-gray-700">{post.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}