import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const PartyPopper = (props) => (
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
    <Path d="M5.8 11.3 2 22l10.7-3.79" />
    <Path d="M4 3h.01" />
    <Path d="M22 8h.01" />
    <Path d="M15 2h.01" />
    <Path d="M22 20c-2-2-6-3-10-3s-8 1-10 3" />
    <Path d="M6.5 8.5l9 9" />
    <Circle cx={12} cy={12} r={10} opacity={0} />
  </Svg>
);

export default PartyPopper; 