import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";

const NAVIGATE_ITEM = ["search", "profile"];

export const unstable_settings = {
  initialRouteName: "search",
};

export default function Layout() {
  const [fontsLoaded] = useFonts({
    "Roboto-Black": require("../assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  return fontsLoaded ? (
    <Stack initialRouteName="search">
      {NAVIGATE_ITEM.map((n, index) => (
        <Stack.Screen
          key={index}
          name={n}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Stack>
  ) : (
    <SplashScreen />
  );
}
