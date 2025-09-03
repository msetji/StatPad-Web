import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Flame = (props) => (
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
    <Path d="M12 2C12 2 7 8 7 13a5 5 0 0 0 10 0c0-5-5-11-5-11Z" />
    <Path d="M12 22a7 7 0 0 1-7-7c0-2.5 2-6 7-13 5 7 7 10.5 7 13a7 7 0 0 1-7 7Z" />
  </Svg>
);

export default Flame; 