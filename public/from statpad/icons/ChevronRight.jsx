import React from 'react';
import Svg, { Path } from 'react-native-svg';

const ChevronRight = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="m9 18 6-6-6-6" />
  </Svg>
);

export default ChevronRight;