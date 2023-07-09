import { Stack } from "expo-router";
const NAVIGATE_ITEM = ["index", "favorite"];

export const unstable_settings = {
  initialRouteName: "index",
};

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      {NAVIGATE_ITEM.map((n, index) => (
        <Stack.Screen
          key={index}
          name={n}
          options={{
            headerShown: false,
          }}
        />
      ))}
      <Stack.Screen
        name="auth"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
