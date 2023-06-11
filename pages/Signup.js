import React, { useState } from "react";
import { StyleSheet, Alert } from "react-native";
import { SignInToFireBase } from "../axios/api";
import LgsButton from "../components/lgsButton";
import LgsGobackButton from "../components/lgsGobackButton";
import LgsLogo from "../components/lgsLogo";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import LgsTextInput from "../components/lgsTextInput";

const Signup = ({ navigation: { navigate } }) => {
  const [signUpData, setSignUpData] = useState({ email: "", password: "" });
  const signIn = async () => {
    const { email, password } = signUpData;
    const signInStatus = await SignInToFireBase(email, password);
    if (signInStatus) {
      Alert.alert(
        `驗證信已寄至${signInStatus}，請至信箱中點擊連結完成驗證。（請小心，驗證信有可能會被信箱中被歸類為垃圾信件）`
      );
      navigate("Home");
    }
  };

  const handleChange = (name) => (value) => {
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
            value={signUpData.email}
            onChangeText={handleChange("email")}
          />
          <LgsTextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder={"請輸入密碼"}
            value={signUpData.password}
            onChangeText={handleChange("password")}
          />
          <LgsButton
            style={{ marginTop: 30 }}
            title="註冊 Logoshot 帳號"
            disabled={!signUpData.email || !signUpData.password}
            onPress={signIn}
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
