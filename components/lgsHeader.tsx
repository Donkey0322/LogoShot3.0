import { useRouter } from "expo-router";
import { ImageBackground, Text, View } from "react-native";
import { COLORS, FONTS } from "../constant";
import Button from "./lgsButton";

export default function LgsLogo() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/logobg.jpg")}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "#000000",
        paddingVertical: 5,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 75 }}
      >
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS("purple"),
            fontWeight: "bold",
          }}
        >
          Logo
        </Text>
        <Text
          style={{
            ...FONTS.h1,
            color: COLORS("mustard"),
            fontWeight: "bold",
          }}
        >
          shot
        </Text>
      </View>

      <Button
        onPress={() => {
          router.push("/profile");
        }}
        style={{ backgroundColor: COLORS("mustard.300"), paddingVertical: 10 }}
      >
        <Text style={{ color: "black" }}>Olivia Rodrigo</Text>
      </Button>
    </ImageBackground>
  );
}
