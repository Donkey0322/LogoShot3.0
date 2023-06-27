import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Login from "../pages/Login";
import MyFavoriteFileDetail from "../pages/MyFavorite/MyFavoriteFileDetail";
import Result from "../pages/Result";
import ResultDetail from "../pages/ResultDetail";
import Signup from "../pages/Signup";
import BottomBar from "./BottomBar";
const Base = createStackNavigator();
const BASEMAP = {
  Base: BottomBar,
  Login,
  Signup,
  Result,
  ResultDetail,
  MyFavoriteFileDetail,
};

export default () => (
  <Base.Navigator>
    {Object.keys(BASEMAP).map((name, index) => (
      <Base.Screen
        key={index}
        name={name}
        component={BASEMAP[name]}
        options={{
          headerShown: false,
        }}
      />
    ))}
  </Base.Navigator>
);
