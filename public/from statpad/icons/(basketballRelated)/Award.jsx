import * as React from "react";
import Svg, { Circle, Polyline } from "react-native-svg";

const Award = (props) => (
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
    <Circle cx={12} cy={8} r={7} />
    <Polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </Svg>
);

export default Award; 