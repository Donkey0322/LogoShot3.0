import type { ViewStyle } from "react-native";
import { TouchableOpacity, View } from "react-native";
export default function HorizenView({
  style,
  children,
}: {
  style?: ViewStyle;
  children?: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", ...style }}>
      {children}
    </View>
  );
}

HorizenView.TouchableOpacity = ({
  style,
  children,
}: {
  style?: ViewStyle;
  children?: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      style={{ flexDirection: "row", alignItems: "center", ...style }}
    >
      {children}
    </TouchableOpacity>
  );
};
