import { Text } from "react-native";
import { styled } from "styled-components/native";

import { COLORS } from "@/constant";

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("gray.100")};
  align-items: center;
  padding-top: 25px;
`;

export default function Page() {
  return (
    <Background>
      <Text>Image</Text>
    </Background>
  );
}
