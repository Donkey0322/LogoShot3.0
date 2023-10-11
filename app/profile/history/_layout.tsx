import { Stack } from 'expo-router';
import { styled } from 'styled-components/native';

import { BackButton } from '@/components/Button';
import { COLORS } from '@/constant';

const NAVIGATE_ITEM = ['(tab)', 'index'];

const Background = styled.View<{ color?: string }>`
  background-color: ${COLORS('mustard.200')};
  padding-top: 25px;
  flex: 1;
`;

const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px;
  width: 100%;
  margin-top: 10px;
`;

export default function Layout() {
  return (
    <Background>
      <ToolBar>
        <BackButton />
      </ToolBar>
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
    </Background>
  );
}
