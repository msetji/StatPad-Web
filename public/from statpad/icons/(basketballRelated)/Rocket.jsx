import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Rocket = (props) => (
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
    <Path d="M4.5 16.5 3 21l4.5-1.5" />
    <Path d="M15 3a2.13 2.13 0 0 1 3 3c-.5.5-2.5 2-4 3l-7 7c-1.5 1.5-2.5 2.5-3 3a2.13 2.13 0 0 0 3 3c.5-.5 2.5-2 4-3l7-7c1.5-1.5 2.5-2.5 3-3a2.13 2.13 0 0 0-3-3c-.5.5-2.5 2-4 3l-7 7c-1.5 1.5-2.5 2.5-3 3a2.13 2.13 0 0 1-3-3c.5-.5 2.5-2 4-3l7-7c1.5-1.5 2.5-2.5 3-3Z" />
    <Circle cx={12} cy={12} r={2} />
  </Svg>
);

export default Rocket; 