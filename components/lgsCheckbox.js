import { Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function LgsCheckbox({ status, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {status ? (
        <Image style={styles.image} source={require("../assets/checked.png")} />
      ) : (
        <Image
          style={styles.image}
          source={require("../assets/unchecked.png")}
        />
      )}
    </TouchableOpacity>
  );
}

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
