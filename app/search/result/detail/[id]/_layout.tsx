import { Stack } from 'expo-router';

import { ResultsProvider } from '@/contexts/useResults';

const NAVIGATE_ITEM = ['index'];
const Modal = [{ name: 'chooseFavorite', title: '選擇想加入的資料夾' }];

export default function Layout() {
  return (
    <ResultsProvider>
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
              presentation: 'modal',
              title,
            }}
          />
        ))}
      </Stack>
    </ResultsProvider>
  );
}
