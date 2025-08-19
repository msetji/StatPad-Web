import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', type = 'button', ...props }, ref) => {
    const variants: Record<string, string> = {
      default:
        'px-6 py-3 rounded-2xl bg-primary text-white font-semibold hover:bg-orange-600 transition-colors',
      outline:
        'px-6 py-3 rounded-2xl border-2 border-primary text-primary font-semibold hover:bg-orange-50 transition-colors',
    };
    return (
      <button
        ref={ref}
        type={type}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;