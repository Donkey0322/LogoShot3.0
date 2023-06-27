import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FONTS } from "../constant";

const LgsLogo = ({
  isHome = false,
  name = "",
  image = null,
  logout = () => {},
  showDeleteAccount = () => {}, //顯示 delete account 頁面
}) => {
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
          color: "#406E9F",
          fontWeight: "bold",
        }}
      >
        Logo
      </Text>
      <Text
        style={{
          ...FONTS.h1,
          color: "black",
          fontWeight: "bold",
          // flex: 1,
        }}
      >
        shot
      </Text>
      {isHome && ( //如果是 home 右上角的使用者資訊
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            justifySelf: "flex-end",
            position: "absolute",
            right: 0,
            bottom: 0,
            top: 0,
          }}
        >
          {name && (
            <>
              {image && (
                <Image
                  source={{ uri: image.data.url }}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                  }}
                />
              )}
              <Text
                style={{ margin: 10 }}
                numberOfLines={1}
                ellipsizeMode={"tail"}
                onLongPress={() => showDeleteAccount()}
              >
                {name}
              </Text>
              <TouchableOpacity
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "#406E9F",
                  borderRadius: 15,
                  marginRight: 10,
                }}
                onPress={() => logout()}
              >
                <Text style={{ fontSize: 15, color: "#FFFFFF" }}>登出</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </ImageBackground>
  );
};

export default LgsLogo;
