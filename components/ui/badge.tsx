import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export default function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700',
        className
      )}
    >
      {children}
    </span>
  );
}