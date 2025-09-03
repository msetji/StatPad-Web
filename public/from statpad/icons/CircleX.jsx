import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const CircleX = ({ size = 24, color = 'currentColor', strokeWidth = 1.25, ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="12" r="10" />
      <Path d="m15 9-6 6" />
      <Path d="m9 9 6 6" />
    </Svg>
  );
};

export default CircleX; 