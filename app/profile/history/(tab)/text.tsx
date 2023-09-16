import { useRouter } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

import { COLORS, ICONS } from "@/constant";

const { Back } = ICONS;

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  align-items: center;
  padding-top: 25px;
`;

const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px;
  width: 100%;
  margin-top: 10px;
`;

export default function Page() {
  const router = useRouter();

  return (
    <Background>
      <ToolBar>
        <TouchableOpacity onPress={router.back}>
          <Back />
        </TouchableOpacity>
      </ToolBar>
      <Text>Text</Text>
    </Background>
  );
}
