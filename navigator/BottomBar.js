import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../pages/Home";
import Log from "../pages/Log/Log";
import MyFavorite from "../pages/MyFavorite/MyFavorite";
import ImageSearch from "../pages/Search/ImageSearch";
import TextSearch from "../pages/Search/TextSearch";

const Tab = createBottomTabNavigator();

const NAVIGATE_ITEM = {
  TextSearch: {
    component: TextSearch,
    label: "文字搜尋",
    icon: "format-text",
  },
  Home: {
    component: Home,
    label: "首頁",
    icon: "home-outline",
  },
  ImageSearch: {
    component: ImageSearch,
    label: "圖片搜尋",
    icon: "image-outline",
  },
  MyFavorite: {
    component: MyFavorite,
    label: "我的最愛",
    icon: "heart-outline",
  },
  Log: {
    component: Log,
    label: "瀏覽紀錄",
    icon: "history",
  },
};

export default function ButtomBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000000",
        tabBarActiveBackgroundColor: "#FFDEAE",
        tabBarStyle: {
          height: 80,
        },
      }}
    >
      {Object.keys(NAVIGATE_ITEM).map((n, index) => (
        <Tab.Screen
          key={index}
          name={n}
          component={NAVIGATE_ITEM[n].component}
          options={{
            tabBarLabel: NAVIGATE_ITEM[n].label,
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name={NAVIGATE_ITEM[n].icon}
                color={color}
                size={26}
              />
            ),
          }}
        ></Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}
