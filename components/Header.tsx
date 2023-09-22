import { useRouter } from "expo-router";
import { useMemo } from "react";
import { ImageBackground, Text, View } from "react-native";

import Button from "@/components/Button";
import { COLORS, FONTS } from "@/constant";
import { useUser } from "@/contexts/useUser";

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
  const login = useMemo(() => user?.userId ?? false, [user?.userId]);

  return (
    <ImageBackground
      source={require("@/assets/logobg.jpg")}
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
        style={{ flexDirection: "row", alignItems: "center", marginLeft: 45 }}
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
          router.push("/profile/");
        }}
        style={{ backgroundColor: COLORS("mustard.300"), paddingVertical: 10 }}
      >
        <Text style={{ color: "black" }}>
          {login ? user?.name ?? "Olivia Rodrigo" : "登入"}
        </Text>
      </Button>
    </ImageBackground>
  );
}
