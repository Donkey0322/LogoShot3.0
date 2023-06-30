import { AntDesign, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
export default {
  Star: ({ color, size }: { color?: string; size?: number }) => (
    <AntDesign name="star" size={size ?? 24} color={color ?? "black"} />
  ),
  Search: ({ color, size }: { color?: string; size?: number }) => (
    <FontAwesome name="search" size={size ?? 24} color={color ?? "black"} />
  ),
  Back: ({ color, size }: { color?: string; size?: number }) => (
    <FontAwesome5
      name="chevron-left"
      size={size ?? 24}
      color={color ?? "black"}
    />
  ),
  Delete: ({ color, size }: { color?: string; size?: number }) => (
    <FontAwesome name="trash" size={size ?? 24} color={color ?? "black"} />
  ),
};
