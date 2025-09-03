import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Medal = (props) => (
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
    <Circle cx={12} cy={15} r={6} />
    <Path d="M9 9V2l3 3 3-3v7" />
  </Svg>
);

export default Medal; 