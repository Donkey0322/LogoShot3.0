import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

import { COLORS, ICONS } from "@/constant";

const { Back } = ICONS;

const NAVIGATE_ITEM = ["(tab)", "index"];

const Background = styled.View<{ color?: string }>`
  background-color: ${COLORS("mustard.200")};
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
        <TouchableOpacity onPress={router.back}>
          <Back />
        </TouchableOpacity>
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
