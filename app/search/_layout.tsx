import { Stack } from 'expo-router';

import { ResultsProvider } from '@/contexts/useResults';

const NAVIGATE_ITEM = ['(tab)', 'result'];
const Modal = [{ name: 'crop', title: '請擷取商標部分' }];

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
        {Modal.map(({ name, title }) => (
          <Stack.Screen
            key={name}
            name={name}
            options={{
              presentation: 'fullScreenModal',
              title,
            }}
          />
        ))}
      </Stack>
    </ResultsProvider>
  );
}
