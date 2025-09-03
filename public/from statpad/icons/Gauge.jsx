import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const Gauge = (props) => (
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
    <Path d="M12 14v-4" />
    <Path d="M15.31 15.31l2.12-2.12" />
    <Path d="M8.69 15.31l-2.12-2.12" />
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 2v2" />
    <Path d="M12 20v2" />
    <Path d="M4.93 4.93l1.41 1.41" />
    <Path d="M17.66 17.66l1.41 1.41" />
    <Path d="M2 12h2" />
    <Path d="M20 12h2" />
  </Svg>
);

export default Gauge; 