import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import "react-native-gesture-handler";
import BottomBar from "./BottomBar";
import Login from "../pages/Login";
import MyFavoriteFileDetail from "../pages/MyFavorite/MyFavoriteFileDetail";
import Result from "../pages/Result";
import ResultDetail from "../pages/ResultDetail";
import Signup from "../pages/Signup";
const Base = createStackNavigator();
const BASEMAP = {
  Base: BottomBar,
  Login,
  Signup,
  Result,
  ResultDetail,
  MyFavoriteFileDetail,
};

export default () => {
  return (
    <Base.Navigator>
      {Object.keys(BASEMAP).map((name) => (
        <Base.Screen
          name={name}
          component={BASEMAP[name]}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Base.Navigator>
  );
};
