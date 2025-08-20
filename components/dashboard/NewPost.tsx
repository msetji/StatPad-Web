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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setFilePreview(url);
      } else {
        setFilePreview('');
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview('');
    if (filePreview && filePreview.startsWith('blob:')) {
      URL.revokeObjectURL(filePreview);
    }
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', user?.id || '');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      return result.fileUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage(`Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    } finally {
      setUploading(false);
    }
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
      let fileUrl = null;
      
      if (selectedFile) {
        fileUrl = await uploadFile(selectedFile);
        if (!fileUrl) {
          setMessage('Error: Failed to upload file');
          setLoading(false);
          return;
        }
      }

      const postData: any = {
        userId: user.id,
        points: formData.points,
        rebounds: formData.rebounds,
        assists: formData.assists,
        steals: formData.steals,
        body: formData.description.trim()
      };

      if (fileUrl) {
        postData.file = fileUrl;
        if (selectedFile?.type.startsWith('image/')) {
          postData.thumbnail_url = fileUrl;
        }
      }

      const { error } = await supabase
        .from('posts')
        .insert([postData]);

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
        removeFile();
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

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Media Upload</h2>
            
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Photo or Video (Optional)
              </label>
              <input
                id="file"
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-sm text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF, MP4, MOV (max 50MB)
              </p>
            </div>

            {selectedFile && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-700">Selected file:</p>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">{selectedFile.name}</p>
                  {filePreview && (
                    <div className="mt-2">
                      {selectedFile.type.startsWith('image/') ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="max-w-full h-32 object-cover rounded-lg"
                        />
                      ) : selectedFile.type.startsWith('video/') ? (
                        <video
                          src={filePreview}
                          controls
                          className="max-w-full h-32 rounded-lg"
                        />
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {uploading ? 'Uploading...' : loading ? 'Creating Post...' : 'Create Post'}
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