import React from 'react';
import Svg, { Path } from 'react-native-svg';

const X = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="m18 6-12 12" />
    <Path d="m6 6 12 12" />
  </Svg>
);

export default X;