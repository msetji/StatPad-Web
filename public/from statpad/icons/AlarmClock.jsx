import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const AlarmClock = ({ size = 24, color = 'currentColor', ...props }) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Circle cx="12" cy="13" r="8" />
      <Path d="M12 9v4l2 2" />
      <Path d="M5 3 2 6" />
      <Path d="m22 6-3-3" />
      <Path d="M6.38 18.7 4 21" />
      <Path d="M17.64 18.67 20 21" />
    </Svg>
  );
};

export default AlarmClock; 