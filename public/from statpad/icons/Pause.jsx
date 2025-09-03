import React from 'react';
import Svg, { Rect } from 'react-native-svg';

const Pause = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Rect x="14" y="4" width="4" height="16" />
    <Rect x="6" y="4" width="4" height="16" />
  </Svg>
);

export default Pause;