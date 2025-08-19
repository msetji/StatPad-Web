import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8 mt-12 border-t border-gray-200">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <span className="text-sm text-gray-500">© {new Date().getFullYear()} StatPad. All rights reserved.</span>
        <div className="flex gap-6 items-center">
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm text-gray-600 hover:text-primary">
            Terms of Service
          </Link>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-primary">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-primary">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-primary">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}