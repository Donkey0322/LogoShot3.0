import { Stack } from "expo-router";
const NAVIGATE_ITEM = ["index", "favorite"];
const Modal = [
  { name: "auth/login", title: "Welcome" },
  { name: "auth/signup", title: "Welcome" },
];

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
      {Modal.map(({ name, title }) => (
        <Stack.Screen
          key={name}
          name={name}
          options={{
            presentation: "modal",
            title,
          }}
        />
      ))}
    </Stack>
  );
}
