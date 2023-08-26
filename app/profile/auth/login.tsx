import Button from "@/components/lgsButton";
import Input from "@/components/lgsTextInput";
import { COLORS } from "@/constant";
import Apple from "@/hooks/useApple";
import Facebook from "@/hooks/useFacebook";
import Google from "@/hooks/useGoogle";
import useLogin from "@/hooks/useLogin";
import useAuth from "@/libs/useAuth";
import { StyleSheet, View } from "react-native";
import { styled } from "styled-components/native";
// import Facebook from "../../../hooks/useFacebook";

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  /* align-items: center; */
  padding: 25px;
`;

const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 20px 25px;
  width: 100%;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 48px;
  align-items: center;
`;

const ImageBorder = styled.View`
  width: 230px;
  height: 230px;
  border-radius: 200%;
  padding: 16px;
  border: 5px solid ${COLORS("joy.orange")};
  padding: 20px;
`;

const ImageContainer = styled.View`
  border-radius: 200%;
  background-color: ${COLORS("joy.orange")};
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const List = styled.View`
  margin-top: 30px;
  width: 70%;
  row-gap: 15px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 20px;
  border: 1px solid #d8d8d8;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
      >
        登入
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
