import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import LgsButton from "../components/lgsButton";
import LgsGobackButton from "../components/lgsGobackButton";
import LgsLogo from "../components/lgsLogo";
import { Background, ContentContainer, Scroll } from "../components/lgsScreen";
import LgsTextInput from "../components/lgsTextInput";
import middleware from "../middleware";
const { signUp } = middleware;

const Signup = ({ navigation: { navigate } }) => {
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (name) => (value) => {
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupPress = async () => {
    try {
      const { data: res, error } = await signUp(data);
      if (error) {
        if (error) {
          switch (error) {
            case "INVALID_EMAIL":
              Alert.alert("請輸入有效信箱");
              break;
            case "EMAIL_EXISTS":
              Alert.alert("此信箱已註冊過");
              break;
            default:
              break;
          }
          return;
        }
      } else {
        Alert.alert(
          `驗證信已寄至${res.email}，請至信箱中點擊連結完成驗證。（請小心，驗證信有可能會被信箱中被歸類為垃圾信件）`
        );
        navigate("Home");
      }
    } catch {
      Alert.alert(
        "伺服器出錯，請檢查帳戶是否已註冊，或聯絡系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
    }
  };

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
            onChangeText={handleChange("email")}
          />
          <LgsTextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"請輸入密碼"}
            value={data.password}
            onChangeText={handleChange("password")}
          />
          <LgsButton
            style={{ marginTop: 30 }}
            title="註冊 Logoshot 帳號"
            disabled={!Object.values(data).every((e) => e)}
            onPress={handleSignupPress}
          />
        </ContentContainer>
      </Scroll>
    </Background>
  );
};

export default Signup;
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
});
