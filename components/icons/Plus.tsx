import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const Plus = ({ size = 24, className = '', color = 'currentColor', strokeWidth = 1.5, ...props }: IconProps) => (
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
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default Plus;