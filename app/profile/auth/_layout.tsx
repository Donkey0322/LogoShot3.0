import { Stack } from "expo-router";
const NAVIGATE_ITEM = ["index", "login"];

export default function Layout() {
  return (
    <Stack>
      {NAVIGATE_ITEM.map((n, index) => (
        <Stack.Screen
          key={index}
          name={n}
          options={{
            title: "Welcome",
          }}
        />
      ))}
    </Stack>
  );
}