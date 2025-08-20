'use client';

import Image from 'next/image';
import Button from '@/components/ui/button';

export default function NavBar() {
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
          <a href="#waitlist" className="text-gray-600 hover:text-primary transition-colors">
            Join Waitlist
          </a>
          <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">
            Contact
          </a>
        </div>

        {/* Login Button */}
        <div className="flex items-center space-x-4">
          <a href="/auth" className="no-underline">
            <Button variant="default" size="sm">Login</Button>
          </a>
        </div>
      </div>
    </nav>
  );
}