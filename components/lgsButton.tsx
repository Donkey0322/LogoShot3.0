import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from "react-native";

interface ButtonProp {
  children: React.ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function Button({
  children,
  onPress,
  style,
  disabled,
}: ButtonProp) {
  return (
    // <View style={style}>
    <TouchableOpacity
      style={{
        ...styles.container,
        ...(disabled ? styles.disabled : style),
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: "#dad7cd",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  title: {
    color: "white",
    fontWeight: "bold",
  },
});
