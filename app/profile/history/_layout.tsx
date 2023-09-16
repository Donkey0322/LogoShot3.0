import { Stack } from "expo-router";

const NAVIGATE_ITEM = ["(tab)", "index"];

export default function Layout() {
  return (
    <Stack initialRouteName="(tab)">
      {NAVIGATE_ITEM.map((t, index) => (
        <Stack.Screen
          key={index}
          name={t}
          options={{
            headerShown: false,
          }}
        />
      ))}
    </Stack>
  );
}
