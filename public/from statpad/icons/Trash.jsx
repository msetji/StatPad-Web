import React from 'react';
import Svg, { Path } from 'react-native-svg';

const Trash = (props) => (
  <Svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M3 6h18" />
    <Path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <Path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <Path d="m10 11 0 6" />
    <Path d="m14 11 0 6" />
  </Svg>
);

export default Trash;