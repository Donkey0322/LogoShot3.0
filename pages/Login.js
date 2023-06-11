/*DONE!********************************************************************************************
  1. 一般登入：
     - INVALID_PASSWORD 密碼錯誤
     - EMAIL_NOT_FOUND 未註冊帳號
     - Server Crashed
  2. Facebook 登入
  3. Apple 登入
**************************************************************************************************/
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AppleAuthentication from "expo-apple-authentication";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LgsButton from "../components/lgsButton";
import LgsGobackButton from "../components/lgsGobackButton";
import LgsLogo from "../components/lgsLogo";
import { Background, ContentContainer, Scroll } from "../components/lgsScreen";
import LgsTextInput from "../components/lgsTextInput";
import middleware from "../middleware";
const { logIn } = middleware();

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation: { navigate } }) {
  const [data, setData] = useState({ email: "", password: "" });
  const [user, setUser] = useState({});

  useEffect(() => {
    //登入成功後儲存使用者資訊並跳轉到主頁
    if (user.userId) {
      (async () => {
        await AsyncStorage.setItem("@userInfo", JSON.stringify(user));
        if (user.name) {
          Alert.alert("Logged in!", `Hi ${user.name}!`);
        } else {
          Alert.alert("Logged in!");
        }
        const userInfo = await AsyncStorage.getItem("@userInfo");
        navigate("Home", userInfo);
      })();
    }
  }, [user.userId]);

  const handleDataChange = (name) => (e) => {
    console.log(e);
    setData((prev) => ({ ...prev, [name]: e }));
  };

  /*Facebook Login ref=https://www.youtube.com/watch?v=Ea7--DkHFPo&t=972s*/
  const [_, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "1256648868295950",
  });
  useEffect(() => {
    if (response && response.type === "success" && response.authentication) {
      (async () => {
        try {
          const userInfoResponse = await fetch(
            `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.height(500)`
          );
          const { id, name, picture } = await userInfoResponse.json();
          setUser({
            userId: id,
            name: name,
            token: response.authentication.accessToken,
            image: picture,
            userType: "facebook",
          });
        } catch ({ message }) {
          console.log(message);
          Alert.alert(`Facebook Login Error: ${message}`);
        }
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== "success") {
      alert("Uh oh, something went wrong");
      return;
    }
  };
  /******************************************************/

  /*General Login*/
  const firebaselogin = async () => {
    try {
      const { data: res, error } = await logIn(data);
      if (error) {
        switch (error) {
          case "INVALID_PASSWORD":
            Alert.alert("密碼錯誤");
            break;
          case "EMAIL_NOT_FOUND":
            Alert.alert(
              "帳戶未註冊，請先至登入頁面註冊。或利用 Facebook、Apple 帳戶登入。"
            );
            break;
          default:
            break;
        }
        return;
      }
      setUser({
        userId: res.userId,
        name: res.email,
        userType: "firebase",
      });
    } catch (e) {
      Alert.alert(
        "伺服器出錯，請檢查帳戶是否已註冊，或聯絡系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
    }
  };
  /******************************************************/

  /*Apple Login*/
  const applelogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // signed in
      if (credential.fullName.givenName) {
        await AsyncStorage.setItem(
          "@appleInfo",
          JSON.stringify(credential.fullName)
        );
      }
      const appleInfoStr = await AsyncStorage.getItem("@appleInfo");
      const appleInfo = JSON.parse(appleInfoStr);
      const name = appleInfo.givenName;
      setUser({
        userId: credential.user,
        name: name,
        userType: "apple",
      });
    } catch (e) {
      Alert.alert("Apple Login Error !");
    }
  };
  /******************************************************/

  return (
    <Background>
      <LgsLogo />
      <LgsGobackButton
        goBack={() => {
          navigate("Home");
        }}
      />
      <Scroll>
        <ContentContainer>
          <LgsTextInput
            style={styles.input}
            placeholder={"請輸入電子郵件"}
            value={data.email}
            onChangeText={handleDataChange("email")}
          />
          <LgsTextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"請輸入密碼"}
            value={data.password}
            onChangeText={handleDataChange("password")}
          />

          <LgsButton
            style={{ marginTop: 30 }}
            title="登入 Logoshot 帳號"
            disabled={!Object.values(data).every((e) => e)}
            onPress={() => firebaselogin()}
          />
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              height: 45,
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ ...styles.outerSourceButton, marginRight: "30%" }}
              onPress={() => applelogin()}
            >
              <Image
                source={require("../assets/apple.png")}
                style={{ width: 20, height: 22.5 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.outerSourceButton}
              onPress={handlePressAsync}
            >
              <Image
                source={require("../assets/facebook.png")}
                style={{ width: 20, height: 20 }}
              />
            </TouchableOpacity>
          </View>
        </ContentContainer>
      </Scroll>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    marginTop: 40,
    borderRadius: 8,
  },
  outerSourceButton: {
    borderRadius: 25,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7E7E7E",
    //
  },
});
