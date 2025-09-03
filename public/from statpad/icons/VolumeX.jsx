import * as React from "react";
import Svg, { Line, Polygon } from "react-native-svg";

const VolumeX = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <Line x1="23" y1="9" x2="17" y2="15" />
    <Line x1="17" y1="9" x2="23" y2="15" />
  </Svg>
);

export default VolumeX; 