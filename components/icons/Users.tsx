import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const Users = ({ size = 24, className = '', color = 'currentColor', strokeWidth = 1.5, ...props }: IconProps) => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m22 21-1-1 1 1zm-1-1a2 2 0 0 0-3-3l1 1a2 2 0 0 1 2 2z" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default Users;