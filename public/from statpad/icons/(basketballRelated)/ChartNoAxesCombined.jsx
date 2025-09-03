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
    <Path d="M3 12a9 9 0 1 0 9-9" />
    <Path d="M12 3v9h9" />
  </Svg>
);

export default ChartNoAxesCombined; 