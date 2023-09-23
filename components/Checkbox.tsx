import { Pressable, StyleSheet } from "react-native";

import type { TouchableOpacityProps } from "react-native";

import { COLORS, ICONS } from "@/constant";

const { Check } = ICONS;

export default function Checkbox({
  status,
  onPress,
  ...rest
}: {
  status: boolean;
} & TouchableOpacityProps) {
  return (
    <Pressable
      style={[styles.checkboxBase, status && styles.checkboxChecked]}
      onPress={onPress}
      {...rest}
    >
      {status && <Check size={22} color="white" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS("yellow"),
    backgroundColor: "white",
  },
  checkboxChecked: {
    backgroundColor: COLORS("yellow"),
  },
});
