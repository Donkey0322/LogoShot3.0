import { NavigationContainer } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/en";
import { useCallback } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import Root from "./navigator/Base";
// import Log from "./pages/Log/Log";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();
export default () => {
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Root />
    </NavigationContainer>
  );
};
