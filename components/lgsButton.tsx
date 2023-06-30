import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
// import { Button } from "react-native-elements";

interface ButtonProp {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  style,
  disabled,
}: ButtonProp) {
  return (
    <View style={style}>
      <TouchableOpacity
        style={{
          ...styles.global,
          ...(disabled ? styles.disabled : styles.enabled),
        }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  global: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 20,
    marginHorizontal: "20%",
  },
  enabled: {
    backgroundColor: "#449190",
  },
  disabled: {
    backgroundColor: "#dad7cd",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  title: {
    color: "white",
  },
});
