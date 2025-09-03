import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ChartNoAxesColumnsIncreasing = (props) => (
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
    <Path d="M4 18v-4" />
    <Path d="M9 18v-6" />
    <Path d="M15 18v-8" />
    <Path d="M20 18v-2" />
  </Svg>
);

export default ChartNoAxesColumnsIncreasing; 