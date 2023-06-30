import { useRouter } from "expo-router";
import { ImageBackground, Text } from "react-native";
import { COLORS, FONTS } from "../constant";
import Button from "./lgsButton";

export default function LgsLogo() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/logobg.jpg")}
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          ...FONTS.h1,
          color: COLORS.purple[400],
          fontWeight: "bold",
        }}
      >
        Logo
      </Text>
      <Text
        style={{
          ...FONTS.h1,
          color: COLORS.mustard[400],
          fontWeight: "bold",
        }}
      >
        shot
      </Text>
      <Button
        title="Login"
        onPress={() => {
          router.push("/profile");
        }}
        style={{}}
      />
    </ImageBackground>
  );
}
