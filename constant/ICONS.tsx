/* reference: https://icons.expo.fyi/Index */

import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

type IconComponentsType = {
  AntDesign: typeof AntDesign;
  Entypo: typeof Entypo;
  FontAwesome: typeof FontAwesome;
  FontAwesome5: typeof FontAwesome5;
  Ionicons: typeof Ionicons;
  MaterialCommunityIcons: typeof MaterialCommunityIcons;
  MaterialIcons: typeof MaterialIcons;
  Octicons: typeof Octicons;
};

type IconNamesType = {
  AntDesign: keyof typeof AntDesign.glyphMap;
  Entypo: keyof typeof Entypo.glyphMap;
  FontAwesome: keyof typeof FontAwesome.glyphMap;
  FontAwesome5: keyof typeof FontAwesome5.glyphMap;
  Ionicons: keyof typeof Ionicons.glyphMap;
  MaterialCommunityIcons: keyof typeof MaterialCommunityIcons.glyphMap;
  MaterialIcons: keyof typeof MaterialIcons.glyphMap;
  Octicons: keyof typeof Octicons.glyphMap;
};

type IconsType<F extends keyof IconComponentsType> = {
  Component: IconComponentsType[F];
  name: IconNamesType[F];
};

type IconsKeyMap = {
  Star: "AntDesign";
  Search: "FontAwesome";
  Back: "FontAwesome5";
  Delete: "FontAwesome";
  Camera: "FontAwesome5";
  Album: "FontAwesome5";
  Menu: "Entypo";
  EditFile: "MaterialCommunityIcons";
  Enter: "MaterialCommunityIcons";
  Member: "MaterialCommunityIcons";
  Login: "AntDesign";
  Logout: "MaterialCommunityIcons";
  Person: "Octicons";
  ImageSearchIcon: "MaterialIcons";
  TextSearchIcon: "MaterialCommunityIcons";
  Facebook: "FontAwesome";
  Apple: "FontAwesome";
  Google: "AntDesign";
  Plus: "FontAwesome";
  Check: "Ionicons";
};

const ICONS: {
  [K in keyof IconsKeyMap]: IconsType<IconsKeyMap[K]>;
} = {
  Star: { name: "star", Component: AntDesign },
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
  Check: { name: "checkmark", Component: Ionicons },
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
