import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const Bot = (props) => (
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
    <Path d="M12 8V4H8" />
    <Rect width={16} height={12} x={4} y={8} rx={2} />
    <Path d="M2 14h2" />
    <Path d="M20 14h2" />
    <Path d="M15 13v2" />
    <Path d="M9 13v2" />
  </Svg>
);

export default Bot; 