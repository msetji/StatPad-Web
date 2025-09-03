import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const MoreVertical = ({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
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
      <Circle cx="12" cy="12" r="1" />
      <Circle cx="12" cy="5" r="1" />
      <Circle cx="12" cy="19" r="1" />
    </Svg>
  );
};

export default MoreVertical; 