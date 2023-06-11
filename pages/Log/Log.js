import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Background,
  ContentContainer,
  Scroll,
} from "../../components/lgsScreen";
import { FONTS } from "../../constant";
import LogBar from "../../navigator/LogBar";
import LgsLogo from "../../components/lgsLogo";

const Log = () => {
  return (
    <Background >
      <LgsLogo />
      <View style={styles.container}>
        {/* <Text style={{ ...FONTS.h1, marginLeft: "10%" }}>瀏覽紀錄</Text> */}
        <LogBar></LogBar>
      </View>
    </Background>
  );
};

export default Log;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF5E0',
    display: "flex",
    width: "100%",
    height: "100%",
    margin: "auto",
  },
});
