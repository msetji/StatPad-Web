import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChartLine = ({ size = 24, color = 'currentColor', ...props }) => {
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
      <Path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <Path d="m19 9-5 5-4-4-3 3" />
    </Svg>
  );
};

export default ChartLine; 