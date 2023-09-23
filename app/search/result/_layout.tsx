import { Stack } from "expo-router";

const NAVIGATE_ITEM = ["index"];

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
    </Stack>
  );
}
