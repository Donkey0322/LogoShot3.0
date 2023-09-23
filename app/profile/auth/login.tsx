import Button from "@/components/Button";
import Input from "@/components/TextInput";
import { COLORS } from "@/constant";
import useAuth from "@/libs/useAuth";
import Apple from "@/modules/auth/hooks/useApple";
import Facebook from "@/modules/auth/hooks/useFacebook";
import Google from "@/modules/auth/hooks/useGoogle";
import useLogin from "@/modules/auth/hooks/useLogin";
import { StyleSheet, View } from "react-native";
import { styled } from "styled-components/native";

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
  const { loginData, handleLoginDataChange } = useLogin();
  const { logIn } = useAuth();

  return (
    <Background>
      <Label>帳號</Label>
      <Input
        value={loginData.email}
        style={styles.input}
        placeholder={"輸入帳號"}
        onChangeText={(text) => handleLoginDataChange(text, "email")}
      />
      <Label>密碼</Label>
      <Input
        value={loginData.password}
        style={styles.input}
        placeholder={"輸入密碼"}
        onChangeText={(text) => handleLoginDataChange(text, "password")}
        secureTextEntry={true}
      />
      <Button
        onPress={() => logIn(loginData)}
        style={{
          backgroundColor: COLORS("mustard.500"),
          marginHorizontal: 100,
        }}
        fontStyle={[{ fontSize: 18 }]}
      >
        登入
      </Button>
      <View style={styles.icons}>
        <Facebook
          buttonColor={COLORS("facebook")}
          iconColor={COLORS("white")}
        />
        <Apple buttonColor="#000000" iconColor={COLORS("white")} />
        <Google buttonColor={COLORS("google")} iconColor={COLORS("white")} />
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
