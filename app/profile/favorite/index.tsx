import { CellContainer, FlashList } from "@shopify/flash-list";
import { useRouter } from "expo-router";
import { forwardRef, useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import { styled } from "styled-components/native";

import Fab from "@/components/Fab";
import Divider from "@/components/lgsDivider";
import Modal from "@/components/lgsModal";
import Folder from "@/components/svg/Folder";
import { COLORS, ICONS } from "@/constant";
import { useUser } from "@/contexts/useUser";
import useFavoriteFolder from "@/libs/useFavoriteFolder";

const { Menu, Back, Delete, EditFile, Enter, Plus } = ICONS;
const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);
const FOLDER_SIZE = 150;

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
  const { user } = useUser();
  const { favoriteFolder, addFavoriteFolder, deleteFavoriteFolder } =
    useFavoriteFolder(user?.userId, user?.userType);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [folderId, setFolderId] = useState<undefined | number>(undefined);

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
        {/* <Text>{Math.floor((width - 100) / FOLDER_SIZE)}</Text> */}
        <View style={{ width: "100%", height: "100%", position: "relative" }}>
          <FlashList
            data={favoriteFolder}
            CellRendererComponent={forwardRef((props, ref) => (
              <AnimatedCellContainer
                {...props}
                style={{
                  ...props.style,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
                ref={ref}
              />
            ))}
            renderItem={({ item, index }) => (
              <View style={{ position: "relative" }} key={index}>
                <FileTitle>{item.fileName}</FileTitle>
                <MenuContainer
                  style={styles.menu}
                  onPress={() => {
                    setFolderId(item.fileId);
                    setTitle(item.fileName ?? "");
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
                    <Folder
                      size={FOLDER_SIZE}
                      backgroundColor={COLORS("joy.orange")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            estimatedItemSize={100}
            numColumns={Math.floor((width - 50) / FOLDER_SIZE)}
          />
          <Fab
            position={{ right: 20, bottom: 50 }}
            size={70}
            onPress={() =>
              addFavoriteFolder({
                userId: user?.userId ?? "",
                userType: "firebase",
                folderName: "新增資料夾2",
              })
            }
          >
            <Plus size={30} />
          </Fab>
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
          <ListItem
            onPress={async () => {
              await deleteFavoriteFolder({ folderId });
              setModalVisible(false);
            }}
          >
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
    alignItems: "center",
    justifyContent: "center",
    padding: 1,
    borderRadius: 100,
    elevation: 3,
  },
});
