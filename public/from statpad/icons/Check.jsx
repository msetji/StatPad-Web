import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Check = ({ width = 24, height = 24, color = 'currentColor', strokeWidth = 2, ...props }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M20 6 9 17l-5-5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Check;
