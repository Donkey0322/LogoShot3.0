import { Keyboard, StyleSheet, TextInput, View } from "react-native";

export default function LgsTextInput({
  placeholder,
  style,
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  return (
    <View style={style}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onSubmitEditing={Keyboard.dismiss}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderRadius: 15,
    height: 50,
    backgroundColor: "white",
    borderWidth: 0,
  },
});
