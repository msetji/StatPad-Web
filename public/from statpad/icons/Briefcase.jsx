import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

const Briefcase = (props) => (
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
    <Path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <Rect width={20} height={14} x={2} y={6} rx={2} />
  </Svg>
);

export default Briefcase; 