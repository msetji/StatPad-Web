import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Clock = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="m12 6 0 6 4 2" />
  </Svg>
);

export default Clock;