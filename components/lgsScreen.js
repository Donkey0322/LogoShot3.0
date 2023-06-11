import {
  View,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Background = ({ children }) => (
  <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
    <KeyboardAvoidingView
      style={{ backgroundColor: "#ffffff" }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={10}
    >
      <View style={{ height: 50 }}></View>
      {children}
    </KeyboardAvoidingView>
  </SafeAreaView>
);

const Scroll = styled(ScrollView)`
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: #fff5e0;
`;
const SafeAreaViewContainer = styled(SafeAreaView)`
  height: 100%;
  width: 100%;
  align-items: center;
  overflow: scroll;
`;
const ContentContainer = styled(View)`
  display: flex;
  width: 80%;
  height: 100%;
  margin: auto;
  // flex-direction: row;
  // justify-content: center;
  // align-items: flex-start;
  // background-color: red;
`;

const ListBlock = styled(TouchableOpacity)`
  margin-top: 10;
  margin-bottom: 10;
  padding-top: 5;
  padding-bottom: 5;
  border-radius: 20;
  border-color: black;
  border-width: 0.4;
`;

export {
  ListBlock,
  Background,
  Scroll,
  SafeAreaViewContainer,
  ContentContainer,
};
