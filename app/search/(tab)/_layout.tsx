import { Tabs } from "expo-router";

import { ICONS } from "@/constant";
const { ImageSearchIcon, TextSearchIcon } = ICONS;

const NAVIGATE_ITEM = {
  image: {
    label: "圖片搜尋",
    icon: (color: string) => <ImageSearchIcon color={color} />,
  },
  text: {
    label: "文字搜尋",
    icon: (color: string) => <TextSearchIcon color={color} />,
  },
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarActiveBackgroundColor: "#FFDEAE",
        tabBarStyle: {
          height: 90,
          flexDirection: "row",
        },
        tabBarItemStyle: {
          paddingBottom: 10,
        },
      }}
      initialRouteName="search/image"
    >
      {Object.keys(NAVIGATE_ITEM).map((n, index) => (
        <Tabs.Screen
          key={index}
          name={n}
          options={{
            tabBarLabel: NAVIGATE_ITEM[n as keyof typeof NAVIGATE_ITEM].label,
            headerShown: false,
            tabBarIcon: ({ color }) =>
              NAVIGATE_ITEM[n as keyof typeof NAVIGATE_ITEM].icon(color),
          }}
        />
      ))}
    </Tabs>
  );
}

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "search/image",
};
