import { Stack } from "expo-router";

import { ResultsProvider } from "@/contexts/useResults";

const NAVIGATE_ITEM = ["(tab)", "result"];

export default function Layout() {
  return (
    <ResultsProvider>
      <Stack initialRouteName="(tab)">
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
    </ResultsProvider>
  );
}
