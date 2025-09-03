import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

const Info = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="m12 16 0-4" />
    <Path d="m12 8 .01 0" />
  </Svg>
);

export default Info;