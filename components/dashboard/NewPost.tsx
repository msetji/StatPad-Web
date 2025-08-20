'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase';

interface NewPostProps {
  user: User | null;
  onSuccess: () => void;
}

export default function NewPost({ user, onSuccess }: NewPostProps) {
  const [formData, setFormData] = useState({
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const supabase = createClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'description' ? value : parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setMessage('Error: User not authenticated');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('posts')
        .insert([
          {
            userId: user.id,
            points: formData.points,
            rebounds: formData.rebounds,
            assists: formData.assists,
            steals: formData.steals,
            description: formData.description.trim()
          }
        ]);

      if (error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('Post created successfully!');
        setFormData({
          points: 0,
          rebounds: 0,
          assists: 0,
          steals: 0,
          description: ''
        });
        setTimeout(() => {
          onSuccess();
        }, 1500);
      }
    } catch (error) {
      setMessage('An error occurred while creating your post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">New Post</h1>
        <p className="text-gray-600">Share your latest basketball game stats.</p>
      </div>

      <div className="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Game Stats</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">
                  Points
                </label>
                <input
                  id="points"
                  name="points"
                  type="number"
                  min="0"
                  value={formData.points}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="rebounds" className="block text-sm font-medium text-gray-700 mb-1">
                  Rebounds
                </label>
                <input
                  id="rebounds"
                  name="rebounds"
                  type="number"
                  min="0"
                  value={formData.rebounds}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="assists" className="block text-sm font-medium text-gray-700 mb-1">
                  Assists
                </label>
                <input
                  id="assists"
                  name="assists"
                  type="number"
                  min="0"
                  value={formData.assists}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="steals" className="block text-sm font-medium text-gray-700 mb-1">
                  Steals
                </label>
                <input
                  id="steals"
                  name="steals"
                  type="number"
                  min="0"
                  value={formData.steals}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell us about your game performance..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Creating Post...' : 'Create Post'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 text-red-700 border border-red-200' 
              : 'bg-green-50 text-green-700 border border-green-200'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}