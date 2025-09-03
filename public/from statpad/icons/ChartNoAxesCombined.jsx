import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ChartNoAxesCombined = (props) => (
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
    <Path d="M12 16v5" />
    <Path d="M16 14v7" />
    <Path d="M20 10v11" />
    <Path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
    <Path d="M4 18v3" />
    <Path d="M8 14v7" />
  </Svg>
);

export default ChartNoAxesCombined; 