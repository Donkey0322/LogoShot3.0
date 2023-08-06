import { FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { styled } from "styled-components/native";
import Divider from "../../../components/lgsDivider";
import Modal from "../../../components/lgsModal";
import Folder from "../../../components/svg/Folder";
import { COLORS, ICONS } from "../../../constant";
const { Menu, Back, Delete, EditFile, Enter } = ICONS;

const DATA = [
  { title: "My favorite1" },
  { title: "My favorite2" },
  { title: "My favorite3" },
  { title: "My favorite4" },
  { title: "My favorite5" },
  { title: "My favorite6" },
  { title: "My favorite7 My favorite My favorite" },
];

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS("mustard.200")};
  align-items: center;
  padding-top: 25px;
`;

const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px;
  width: 100%;
  margin-top: 10px;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 24px;
  align-items: center;
`;

const MenuContainer = styled.TouchableOpacity`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  background-color: #000000;
  position: absolute;
  right: 0;
  top: 0;
  margin-top: 18px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  z-index: 1;
  padding: 1px;
`;

const FileTitle = styled.Text`
  position: absolute;
  font-weight: bold;
  margin-top: 35px;
  padding-left: 10px;
  width: 70%;
  /* line-height: 20px; */
`;

const List = styled.View`
  width: 200px;
`;

const ListItem = styled.TouchableOpacity`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #d8d8d8;
  /* border-bottom-width: 1px; */
  border-color: #d8d8d8;
  flex-direction: row;
  align-items: center;
  column-gap: 8px;
`;

export default function Page() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");

  const [width, setWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window: { width } }) => {
        setWidth(width);
      }
    );
    return () => subscription?.remove();
  });

  return (
    <Background>
      <ToolBar>
        <TouchableOpacity onPress={router.back}>
          <Back />
        </TouchableOpacity>
      </ToolBar>
      <ContentContainer>
        <Text>{Math.floor((width - 100) / 150)}</Text>
        <View style={{ width: "100%", height: "100%" }}>
          <FlashList
            data={DATA}
            renderItem={({ item }) => (
              <View
                style={{
                  position: "relative",
                  marginBottom: 10,
                  marginRight: 30,
                }}
              >
                <FileTitle>{item.title}</FileTitle>
                <MenuContainer
                  style={styles.menu}
                  onPress={() => {
                    setTitle(item.title);
                    setModalVisible(true);
                  }}
                >
                  <Menu color="#FFFFFF" size={20} />
                </MenuContainer>
                <View style={{ zIndex: -1 }}>
                  <TouchableOpacity
                    onPress={() => {
                      router.push("profile/favorite/detail");
                    }}
                    hitSlop={{ top: -50, bottom: -50, left: -20, right: -20 }}
                  >
                    <Folder size={150} backgroundColor={COLORS("joy.orange")} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            estimatedItemSize={100}
            numColumns={Math.floor((width - 100) / 150)}
            contentContainerStyle={{
              paddingLeft: 30,
            }}
          />
        </View>
      </ContentContainer>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Text
          style={{
            marginBottom: 25,
            fontWeight: "bold",
            color: "#000000",
            fontSize: 18,
            alignSelf: "flex-start",
          }}
        >
          {title}
        </Text>
        <List>
          <Divider />
          <ListItem
            onPress={() => {
              setModalVisible(false);
              router.push("profile/favorite/detail");
            }}
          >
            <Enter size={20} />
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>開啟資料夾</Text>
          </ListItem>
          <Divider />
          <ListItem>
            <EditFile size={20} />
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>重新命名</Text>
          </ListItem>
          <Divider />
          <ListItem>
            <Delete color={COLORS("red")} size={20} />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: COLORS("red"),
              }}
            >
              刪除資料夾
            </Text>
          </ListItem>
          <Divider />
        </List>
      </Modal>
    </Background>
  );
}

const styles = StyleSheet.create({
  menu: {
    width: 25,
    height: 25,
    backgroundColor: "#000000",
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: 18,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    borderRadius: 100,
    elevation: 3,
  },
});
