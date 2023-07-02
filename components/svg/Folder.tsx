import { ColorValue } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Folder({
  size = 400,
  backgroundColor = "#FAFAFA",
}: {
  size?: number;
  backgroundColor?: ColorValue;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 309 272" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.450714 198.652C0.450714 290.106 0 270.16 91.9902 270.16H217.251C309 270.16 309 290.106 309 198.652V73.219C309 -18.1542 309 1.85653 230.241 1.85646H198.048C186.491 1.87255 175.61 7.2919 168.689 16.5386L161.963 24.062C158.169 28.3064 152.744 30.7329 147.051 30.73C139.504 30.7263 133.044 30.7208 124.601 30.7326H79.0488C0 30.7326 0 30.7326 0 118.809L0.450714 198.652Z"
        fill={backgroundColor}
      />
    </Svg>
  );
}
