import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const Microwave = (props) => (
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
    <Rect width={20} height={15} x={2} y={4} rx={2} />
    <Rect width={8} height={7} x={6} y={8} rx={1} />
    <Path d="M18 8v7" />
    <Path d="M6 19v2" />
    <Path d="M18 19v2" />
  </Svg>
);

export default Microwave; 