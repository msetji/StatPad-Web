import * as React from "react";
import Svg, { Line, Path } from "react-native-svg";

const FlaskConical = (props) => (
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
    <Path d="M10 2v7.31" />
    <Path d="M14 2v7.31" />
    <Path d="M8.5 2h7" />
    <Path d="M5.52 16.96A10 10 0 0 0 12 22a10 10 0 0 0 6.48-5.04" />
    <Path d="M19.5 16.96A10 10 0 0 1 12 22a10 10 0 0 1-7.5-5.04" />
    <Path d="M2 16.96A10 10 0 0 0 12 22a10 10 0 0 0 10-5.04" />
    <Line x1={2} y1={16.96} x2={22} y2={16.96} />
    <Path d="M10 9.31V2h4v7.31" />
  </Svg>
);

export default FlaskConical; 