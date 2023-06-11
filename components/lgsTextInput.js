import React from "react";
import { TextInput, Text, StyleSheet, View, Keyboard } from "react-native";
import { FONTS, SIZES } from "../constant";

const LgsTextInput = ({
  placeholder,
  style,
  value,
  onChangeText,
  title,
  secureTextEntry = false,
}) => {
  return (
    <View style={style}>
      {title && (
        <Text
          style={{
            ...FONTS.h1,
            marginBottom: SIZES.padding / 6,
            lineHeight: 68,
          }}
        >
          {title}
        </Text>
      )}
      <TextInput
        style={{
          ...styles.input,
          backgroundColor: "white",
          borderWidth: 1,
          borderColor: "#FFFFFF",
        }}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={Keyboard.dismiss}
        value={value}
        onChangeText={(query) => onChangeText(query)}
      />
    </View>
  );
};

export default LgsTextInput;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 15,
    height: 50,
  },
});
