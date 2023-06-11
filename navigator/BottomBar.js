import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../pages/Home";
import Log from "../pages/Log/Log";
import MyFavorite from "../pages/MyFavorite/MyFavorite";
import ImageSearch from "../pages/Search/ImageSearch";
import TextSearch from "../pages/Search/TextSearch";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#f4a261",
      }}
    >
      <Tab.Screen
        name="TextSearch"
        component={TextSearch}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "文字搜尋",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="format-text"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "首頁",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ImageSearch"
        component={ImageSearch}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "圖片搜尋",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="image-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyFavorite"
        component={MyFavorite}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "我的最愛",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Log"
        component={Log}
        options={{
          unmountOnBlur: true,
          tabBarLabel: "瀏覽紀錄",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
