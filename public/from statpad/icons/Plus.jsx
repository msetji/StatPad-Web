import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Plus = ({ size = 24, color = 'currentColor', strokeWidth = 2, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
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
    <Path d="M5 12h14" />
    <Path d="M12 5v14" />
  </Svg>
);

export default Plus;