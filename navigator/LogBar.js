import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as React from "react";
import "react-native-gesture-handler";
import ImageLog from "../pages/Log/ImageLog";
import TextLog from "../pages/Log/TextLog";

const Tab = createMaterialTopTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      pagerStyle={{ width: "100%", backgroundColor: "#FFF5E0" }}
      screenOptions={{
        tabBarActiveTintColor: "#406E9F",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          marginTop: 10,
          height: 60,
          justifyContent: "center",
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#406E9F",
        },
        tabBarLabelStyle: { fontSize: 18, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="ImageLog"
        component={ImageLog}
        options={{
          tabBarLabel: "圖片搜尋",
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="TextLog"
        component={TextLog}
        options={{ tabBarLabel: "文字搜尋", headerShown: false }}
      />
    </Tab.Navigator>
  );
};
