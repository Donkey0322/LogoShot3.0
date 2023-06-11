import React, { useState, useEffect } from "react";
import { FONTS } from "../constant";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const LgsCheckbox = ({ status, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {status === "checked" ? (
        <Image
          style={styles.image}
          source={require("../assets/checked.png")}
        ></Image>
      ) : (
        <Image
          style={styles.image}
          source={require("../assets/unchecked.png")}
        ></Image>
      )}
    </TouchableOpacity>
  );
};

export default LgsCheckbox;

const styles = StyleSheet.create({
  container: {
    borderColor: "#FFFFFF",
    height: 20,
    width: 20,
  },
  image: {
    height: 20,
    width: 20,
  },
});
