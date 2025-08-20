'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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
  users?: {
    username: string;
    name: string;
    image: string;
  };
}

interface FeedProps {
  user: User | null;
}

export default function Feed({ user }: FeedProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [commentText, setCommentText] = useState<{[key: string]: string}>({});
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const supabase = createClient();

  const POSTS_PER_PAGE = 5;

  const getPostThumbnail = (post: Post) => {
    if (post.file) {
      if (post.file.includes('.mp4') || post.file.includes('.mov') || post.file.includes('.avi')) {
        return post.thumbnail_url || post.file;
      }
      return post.file;
    }
    return null;
  };

  const getStatsSummary = (post: Post) => {
    const stats = [];
    if (post.points > 0) stats.push(`${post.points}pts`);
    if (post.rebounds > 0) stats.push(`${post.rebounds}reb`);
    if (post.assists > 0) stats.push(`${post.assists}ast`);
    if (post.steals > 0) stats.push(`${post.steals}stl`);
    return stats.slice(0, 2).join(' • ');
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    
    try {
      const isLiked = likedPosts.has(postId);
      
      if (isLiked) {
        const { error } = await supabase
          .from('postLikes')
          .delete()
          .eq('postId', postId)
          .eq('userId', user.id);
          
        if (!error) {
          setLikedPosts(prev => {
            const newSet = new Set(prev);
            newSet.delete(postId);
            return newSet;
          });
        }
      } else {
        const { error } = await supabase
          .from('postLikes')
          .insert([{ postId, userId: user.id }]);
          
        if (!error) {
          setLikedPosts(prev => new Set([...Array.from(prev), postId]));
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const handleComment = async (postId: string) => {
    if (!user || !commentText[postId]?.trim()) return;
    
    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          postId,
          userId: user.id,
          text: commentText[postId].trim()
        }]);
        
      if (!error) {
        setCommentText(prev => ({ ...prev, [postId]: '' }));
        // Here you could fetch and update comments if needed
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const loadMorePosts = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          users (
            username,
            name,
            image
          )
        `)
        .order('created_at', { ascending: false })
        .range(offset, offset + POSTS_PER_PAGE - 1);

      if (error) {
        console.error('Error fetching more posts:', error);
      } else {
        const newPosts = data || [];
        setPosts(prev => [...prev, ...newPosts]);
        setOffset(prev => prev + POSTS_PER_PAGE);
        
        if (newPosts.length < POSTS_PER_PAGE) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching more posts:', error);
    } finally {
      setLoadingMore(false);
    }
  }, [supabase, offset, loadingMore, hasMore, POSTS_PER_PAGE]);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('posts')
          .select(`
            *,
            users (
              username,
              name,
              image
            )
          `)
          .order('created_at', { ascending: false })
          .range(0, POSTS_PER_PAGE - 1);

        if (error) {
          console.error('Error fetching initial posts:', error);
        } else {
          const newPosts = data || [];
          setPosts(newPosts);
          setOffset(POSTS_PER_PAGE);
          
          if (newPosts.length < POSTS_PER_PAGE) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.error('Error fetching initial posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialPosts();
  }, [supabase, POSTS_PER_PAGE]);

  useEffect(() => {
    if (!hasMore || loadingMore) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMorePosts, hasMore, loadingMore]);

  if (loading) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
          <p className="text-gray-600">Latest posts from the community</p>
        </div>
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                </div>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
              <div className="grid grid-cols-3 gap-4 mb-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Feed</h1>
        <p className="text-gray-600">Latest posts from the community</p>
      </div>

      {posts.length === 0 && !loading ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏀</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600 mb-4">Be the first to share your basketball highlights!</p>
        </div>
      ) : posts.length > 0 ? (
        <>
          <div className="space-y-6">
            {posts.map((post) => {
              const thumbnail = getPostThumbnail(post);
              const isLiked = likedPosts.has(post.id);
              
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Post Header */}
                  <div className="flex items-center space-x-3 p-4">
                    {post.users?.image ? (
                      <img
                        src={post.users.image}
                        alt={post.users.name || post.users.username || 'User'}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {(post.users?.name || post.users?.username || 'U')[0].toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {post.users?.name || post.users?.username || 'Unknown User'}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(post.created_at).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Media Content */}
                  {thumbnail && (
                    <div className="relative">
                      {post.file?.includes('.mp4') || post.file?.includes('.mov') || post.file?.includes('.avi') ? (
                        <video
                          controls
                          className="w-full h-64 md:h-80 object-cover"
                          poster={post.thumbnail_url || undefined}
                        >
                          <source src={post.file} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={thumbnail}
                          alt="Post media"
                          className="w-full h-64 md:h-80 object-cover"
                        />
                      )}
                    </div>
                  )}

                  {/* Stats Section */}
                  <div className="p-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{post.points}</div>
                        <div className="text-sm text-gray-600">Points</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{post.rebounds}</div>
                        <div className="text-sm text-gray-600">Rebounds</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{post.assists}</div>
                        <div className="text-sm text-gray-600">Assists</div>
                      </div>
                    </div>

                    {/* Post Description */}
                    {post.body && (
                      <p className="text-gray-700 mb-4">{post.body}</p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-4 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-colors ${
                          isLiked 
                            ? 'bg-red-50 text-red-600' 
                            : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                        }`}
                      >
                        <svg className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="text-sm font-medium">Like</span>
                      </button>
                      
                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center space-x-1 px-3 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <span className="text-sm font-medium">Comment</span>
                      </button>
                    </div>

                    {/* Comment Section */}
                    {showComments[post.id] && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-sm font-semibold">
                              {(user?.email || 'U')[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={commentText[post.id] || ''}
                              onChange={(e) => setCommentText(prev => ({
                                ...prev,
                                [post.id]: e.target.value
                              }))}
                              placeholder="Write a comment..."
                              className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows={2}
                            />
                            <button
                              onClick={() => handleComment(post.id)}
                              disabled={!commentText[post.id]?.trim()}
                              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              Post Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {hasMore && (
            <div ref={loadMoreRef} className="mt-8">
              {loadingMore && (
                <div className="space-y-6">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                        </div>
                      </div>
                      <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
                      <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm">
                🏀 You've reached the end of the feed
              </div>
            </div>
          )}
        </>
      ) : null}
    </div>
  );
}