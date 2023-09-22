import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

export default function LgsCheckbox({
  status,
  onPress,
}: {
  status: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.checkboxBase, status && styles.checkboxChecked]}
      onPress={onPress}
    >
      {status && <Ionicons name="checkmark" size={22} color="white" />}
    </Pressable>
    // <TouchableOpacity onPress={onPress} style={styles.container}>
    //   {status ? (
    //     <Image style={styles.image} source={require("../assets/checked.png")} />
    //   ) : (
    //     <Image
    //       style={styles.image}
    //       source={require("../assets/unchecked.png")}
    //     />
    //   )}
    // </TouchableOpacity>
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
    borderColor: "#ffca3d",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: "#ffca3d",
  },
});
