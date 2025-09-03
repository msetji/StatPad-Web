import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg";

const Images = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color="#000000" fill="none" {...props}>
    {/* Back image */}
    <Path d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10C20 13.7712 20 15.6569 18.8284 16.8284C17.6569 18 15.7712 18 12 18C8.22876 18 6.34315 18 5.17157 16.8284C4 15.6569 4 13.7712 4 10Z" stroke="currentColor" strokeWidth={props.strokeWidth} strokeOpacity="0.6" />
    <Circle cx="14.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth={props.strokeWidth} strokeOpacity="0.6" />
    
    {/* Front image */}
    <Path d="M2 14C2 10.2288 2 8.34315 3.17157 7.17157C4.34315 6 6.22876 6 10 6C13.7712 6 15.6569 6 16.8284 7.17157C18 8.34315 18 10.2288 18 14C18 17.7712 18 19.6569 16.8284 20.8284C15.6569 22 13.7712 22 10 22C6.22876 22 4.34315 22 3.17157 20.8284C2 19.6569 2 17.7712 2 14Z" stroke="currentColor" strokeWidth={props.strokeWidth} />
    <Circle cx="12.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth={props.strokeWidth} />
    <Path d="M14 22C13.3805 19.7749 11.9345 17.7821 9.87654 16.3342C7.65761 14.7729 4.87163 13.9466 2.01569 14.0027C1.67658 14.0019 1.33776 14.0127 1 14.0351" stroke="currentColor" strokeWidth={props.strokeWidth} strokeLinejoin="round" />
  </Svg>
);

export default Images;