/* reference: https://icons.expo.fyi/Index */

import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

const ICONS = {
  Star: { Component: AntDesign, name: "star" },
  Search: { name: "search", Component: FontAwesome },
  Back: { name: "chevron-left", Component: FontAwesome5 },
  Delete: { name: "trash", Component: FontAwesome },
  Camera: { name: "camera", Component: FontAwesome5 },
  Album: { name: "images", Component: FontAwesome5 },
  Menu: { name: "dots-three-horizontal", Component: Entypo },
  EditFile: { name: "folder-edit-outline", Component: MaterialCommunityIcons },
  Enter: { name: "location-enter", Component: MaterialCommunityIcons },
  Member: { name: "wallet-membership", Component: MaterialCommunityIcons },
  Login: { name: "login", Component: AntDesign },
  Logout: { name: "logout", Component: MaterialCommunityIcons },
  Person: { name: "feed-person", Component: Octicons },
  ImageSearchIcon: { name: "image-search", Component: MaterialIcons },
  TextSearchIcon: {
    name: "text-recognition",
    Component: MaterialCommunityIcons,
  },
  Facebook: { name: "facebook", Component: FontAwesome },
  Apple: { name: "apple", Component: FontAwesome },
  Google: { name: "google", Component: AntDesign },
  Plus: { name: "plus", Component: FontAwesome },
};

type ICONSTYPE = Record<
  keyof typeof ICONS,
  ({ color, size }: { color?: string; size?: number }) => JSX.Element
>;

export default Object.keys(ICONS).reduce((acc, curr) => {
  const { name, Component } = ICONS[curr as keyof typeof ICONS];
  acc[curr as keyof typeof ICONS] = ({
    color,
    size,
  }: {
    color?: string;
    size?: number;
  }) => <Component name={name} size={size ?? 24} color={color ?? "black"} />;
  return acc;
}, {} as ICONSTYPE);
