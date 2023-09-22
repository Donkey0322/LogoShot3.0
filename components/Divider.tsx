import { ColorValue, View } from "react-native";
export default function Divider({ color = "#d8d8d8" }: { color?: ColorValue }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View style={{ flex: 1, height: 1, backgroundColor: color }} />
    </View>
  );
}
