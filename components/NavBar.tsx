'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/button';
import { createClient } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, [supabase.auth]);
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <Image 
            src="/logos/icon.png" 
            alt="StatPad Logo" 
            width={32} 
            height={32}
            className="rounded"
          />
          <span className="text-xl font-bold text-gray-900">StatPad</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#stats" className="text-gray-600 hover:text-primary transition-colors">
            Stats
          </a>
          <a href="https://apps.apple.com/us/app/statpad/id6749465010" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">
            Download App
          </a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {loading ? (
            <div className="w-16 h-9 bg-gray-200 animate-pulse rounded"></div>
          ) : user ? (
            <a href="/dashboard" className="no-underline">
              <Button variant="default">Dashboard</Button>
            </a>
          ) : (
            <a href="/auth" className="no-underline">
              <Button variant="default">Login</Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}