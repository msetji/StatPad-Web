import React from 'react';
import Svg, { Polygon } from 'react-native-svg';

const Play = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Polygon points="6,3 20,12 6,21" />
  </Svg>
);

export default Play;