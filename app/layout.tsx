import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'StatPad',
  description: 'Track your game. Download StatPad on the App Store.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-white text-charcoal">
        {children}
      </body>
    </html>
  );
}