import { AntDesign } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const NAVIGATE_ITEM = {
  image: {
    label: "圖片搜尋",
    icon: "home-outline",
  },
  text: {
    label: "文字搜尋",
    icon: "home-outline",
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
            tabBarIcon: ({ color }) => (
              <AntDesign name="stepbackward" color={color} size={20} />
            ),
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
