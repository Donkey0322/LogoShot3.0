import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const Background = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaView
    style={{
      backgroundColor: "#ffffff",
      flex: 1,
    }}
  >
    {children}
  </SafeAreaView>
);
const SafeAreaViewContainer = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  align-items: center;
  overflow: scroll;
`;

const ContentContainer = styled.View`
  padding: 5px 15px;
`;

const ListBlock = styled.TouchableOpacity`
  margin-top: 10;
  margin-bottom: 10;
  padding-top: 5;
  padding-bottom: 5;
  border-radius: 20;
  border-color: black;
  border-width: 0.4;
`;

export { Background, ContentContainer, ListBlock, SafeAreaViewContainer };
