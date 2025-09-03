import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Dumbbell = (props) => (
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
    <Path d="M6.5 6.5 17.5 17.5" />
    <Path d="M21 21l-1-1" />
    <Path d="M3 3l1 1" />
    <Path d="M18 22l4-4" />
    <Path d="M2 6l4-4" />
    <Path d="M3 10l7-7" />
    <Path d="M14 21l7-7" />
    <Path d="M21 14l-7 7" />
    <Path d="M10 3l-7 7" />
  </Svg>
);

export default Dumbbell; 