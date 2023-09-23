import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

import { BackButton } from "@/components/Button";
import { COLORS } from "@/constant";

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

const ContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  /* align-items: center; */
  flex-direction: row;
  gap: 30px;
  flex-wrap: wrap;
  /* justify-content: spa; */
`;

export default function Page() {
  return (
    <Background>
      <ToolBar>
        <BackButton />
      </ToolBar>
      <ContentContainer>
        {[0, 0, 0, 0, 0, 0, 0, 0].map((m, index) => (
          <TouchableOpacity
            style={{ width: 120, height: 120, backgroundColor: "orange" }}
          ></TouchableOpacity>
        ))}
      </ContentContainer>
    </Background>
  );
}
