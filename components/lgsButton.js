import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import { Button } from "react-native-elements";

const LgsButton = ({ title, onPress, style, disabled }) => {
  return (
    <View style={style}>
      <TouchableOpacity
        style={disabled ? styles.inputDisabled : styles.input}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LgsButton;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFC17F",
    height: 40,
    borderRadius: 20,
  },
  inputDisabled: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dad7cd",
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
  },
  title: {
    color: "white",
  },
});
