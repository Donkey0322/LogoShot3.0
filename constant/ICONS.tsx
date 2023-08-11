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
};

interface ICONSTYPE {
  Star: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Search: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Back: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Delete: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Camera: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Album: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Menu: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  EditFile: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Enter: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Member: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Login: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Logout: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  Person: ({ color, size }: { color?: string; size?: number }) => JSX.Element;
  ImageSearchIcon: ({
    color,
    size,
  }: {
    color?: string;
    size?: number;
  }) => JSX.Element;
  TextSearchIcon: ({
    color,
    size,
  }: {
    color?: string;
    size?: number;
  }) => JSX.Element;
}

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
