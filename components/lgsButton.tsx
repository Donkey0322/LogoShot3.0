import {
  StyleSheet,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from "react-native";
import { styled } from "styled-components/native";

import type { Color } from "@/utils/types";

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
    <TouchableOpacity
      style={{
        ...styles.container,
        ...style,
        ...(disabled && styles.disabled),
      }}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.title}>{children}</Text>
    </TouchableOpacity>
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

export const IconButton = styled.TouchableOpacity<{ color?: Color }>`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;
