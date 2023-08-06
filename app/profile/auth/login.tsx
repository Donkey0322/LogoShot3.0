import { StyleSheet } from "react-native";
import { styled } from "styled-components/native";
import Input from "../../../components/lgsTextInput";
import { COLORS } from "../../../constant";
// import Facebook from "../../../hooks/useFacebook";

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  align-items: center;
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

export default function Page() {
  return (
    <Background>
      <Input
        value={"value"}
        // onChangeText={handleDataChange("targetApplicant")}
        style={styles.input}
        placeholder={"輸入申請人"}
      />
      {/* <Facebook /> */}
    </Background>
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
  },
});
