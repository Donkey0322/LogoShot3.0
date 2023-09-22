import { StyleSheet, View } from "react-native";
import { styled } from "styled-components/native";
// import Facebook from "../../../hooks/useFacebook";

import Button from "@/components/Button";
import Input from "@/components/TextInput";
import { COLORS } from "@/constant";
import useAuth from "@/libs/useAuth";
import Apple from "@/modules/auth/hooks/useApple";
import Facebook from "@/modules/auth/hooks/useFacebook";
import Google from "@/modules/auth/hooks/useGoogle";
import useSignup from "@/modules/auth/hooks/useSignup";

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  /* align-items: center; */
  padding: 25px;
`;

const Label = styled.Text`
  margin-left: 8px;
`;

export default function Page() {
  const { signupData, handleSignupDataChange } = useSignup();
  const { signUp } = useAuth();

  return (
    <Background>
      <Label>使用者名稱</Label>
      <Input
        value={signupData.user}
        style={styles.input}
        placeholder={"輸入名稱"}
        onChangeText={(text) => handleSignupDataChange(text, "user")}
      />
      <Label>帳號</Label>
      <Input
        value={signupData.email}
        style={styles.input}
        placeholder={"輸入帳號"}
        onChangeText={(text) => handleSignupDataChange(text, "email")}
      />
      <Label>密碼</Label>
      <Input
        value={signupData.password}
        style={styles.input}
        placeholder={"輸入密碼"}
        onChangeText={(text) => handleSignupDataChange(text, "password")}
        secureTextEntry={true}
      />
      <Label>確認密碼</Label>
      <Input
        value={signupData.confirm}
        style={styles.input}
        placeholder={"再次輸入密碼"}
        onChangeText={(text) => handleSignupDataChange(text, "confirm")}
        secureTextEntry={true}
      />
      <Button
        onPress={() => {
          signUp(signupData);
        }}
        style={{
          backgroundColor: COLORS("mustard.500"),
          marginHorizontal: 100,
        }}
      >
        註冊
      </Button>
      <View style={styles.icons}>
        <Facebook buttonColor={COLORS("facebook")} iconColor="#FFFFFF" />
        <Apple buttonColor="#000000" iconColor="#FFFFFF" />
        <Google buttonColor={COLORS("google")} iconColor="#FFFFFF" />
      </View>
      {/* <Facebook /> */}
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    marginTop: 10,
    marginBottom: 25,
  },
  icons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: "25%",
    marginTop: 20,
  },
});
