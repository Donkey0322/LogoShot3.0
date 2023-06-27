import { KeyboardAvoidingView, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";

const Background = ({ children }) => (
  <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
    <KeyboardAvoidingView
      style={{ backgroundColor: "#ffffff" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={10}
    >
      {children}
    </KeyboardAvoidingView>
  </SafeAreaView>
);

const Scroll = ({ children }) => (
  <ScrollView
    style={{
      height: "100%",
      width: "100%",
      overflow: "scroll",
      backgroundColor: "#F3EDF7",
    }}
    contentContainerStyle={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </ScrollView>
);

const SafeAreaViewContainer = styled.SafeAreaView`
  height: 100%;
  width: 100%;
  align-items: center;
  overflow: scroll;
`;
const ContentContainer = styled.View`
  display: flex;
  width: 80%;
  height: 100%;
  /* 請根據 navigator/BottomBar.js 的 tabBarStyle: {
                                        height: 80,
                                      }, 
     調整位置
  */
  padding-bottom: 80;
  /* margin: auto; */
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

export {
  Background,
  ContentContainer,
  ListBlock,
  SafeAreaViewContainer,
  Scroll,
};
