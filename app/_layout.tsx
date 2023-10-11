import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

import { UserProvider } from '@/contexts/useUser';

const NAVIGATE_ITEM = ['search', 'profile'];

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Black': require('@/assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('@/assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('@/assets/fonts/Roboto-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <UserProvider>
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
    </UserProvider>
  );
}
