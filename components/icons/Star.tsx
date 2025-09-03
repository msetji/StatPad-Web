import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const Star = ({ size = 24, className = '', color = 'currentColor', strokeWidth = 2, ...props }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.771-.56l.882-5.14a2.123 2.123 0 0 0-.611-1.878L2.751 9.794a.53.53 0 0 1 .294-.904l5.166-.756a2.123 2.123 0 0 0 1.595-1.16l2.31-4.679z" />
  </svg>
);

export default Star;