import React, { useState, useEffect } from "react";
import {
  Background,
  Scroll,
  ContentContainer,
  ListBlock,
} from "../../components/lgsScreen";
import { FONTS } from "../../constant";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import {
  GetMyFavoriteFiles,
  PostAddFavoriteFile,
  PostDeleteFavoriteFile,
  PostRenameFavoriteFile,
} from "../../axios/api";
import { BottomSheet, ListItem } from "@rneui/base";
import {
  Provider,
  Portal,
  Dialog,
  Button,
  Paragraph,
} from "react-native-paper";
import LgsLogo from "../../components/lgsLogo";
import LgsTextInput from "../../components/lgsTextInput";

const File = ({ item }, onPressFile, onLongPress) => {
  return (
    <>
      {item["fileId"] === -1 ? (
        <TouchableOpacity
          style={{
            ...FONTS.image,
            marginRight: 5,
            marginLeft: 5,
            marginTop: 20,
            backgroundColor: "#f4a261",
            borderColor: "#ddd",
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
            // borderColor: "white",
            // borderWidth: 3,
          }}
          onPress={() => onPressFile(item)}
          onLongPress={() => onLongPress(item)}
        >
          <Text style={{ color: "white", fontSize: 30 }}>
            {item["fileName"]}
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            ...FONTS.image,
            marginRight: 5,
            marginLeft: 5,
            marginTop: 20,
            backgroundColor: "white",
            borderColor: "#f4a261",
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: {
              width: 0.5,
              height: 0.5,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3,
            elevation: 3,
          }}
          onPress={() => onPressFile(item)}
          onLongPress={() => onLongPress(item)}
        >
          <Text style={{ color: "#f4a261", fontWeight: "bold" }}>
            {item["fileName"]}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const MyFavorite = ({ navigation: { navigate } }) => {
  const [files, setFiles] = useState([
    {
      esIds: [],
      fileId: -1,
      fileName: "+",
    },
  ]);
  const [addDialogVisible, setAddDialogVisible] = useState(false);
  const [renameDialogVisible, setRenameDialogVisible] = useState(false);
  const [newFileName, setNewFileName] = useState("新增資料夾");
  const [renameFileName, setRenameFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [isLongPressBottomVisible, setIsLongPressBottomVisible] =
    useState(false);

  const onPressFile = (file) => {
    if (file.fileId < 0) {
      setAddDialogVisible(true);
    } else {
      navigate("MyFavoriteFileDetail", file);
    }
  };

  const onDeleteFile = async () => {
    setIsLongPressBottomVisible(false);
    Alert.alert("確定刪除" + selectedFile["fileName"] + "？", "", [
      {
        text: "取消",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "確認",
        onPress: () => {
          const asyncfunction = async () => {
            await PostDeleteFavoriteFile(selectedFile["fileId"]);
            await loadDatas();
          };
          asyncfunction();
        },
      },
    ]);
  };

  const onLongPress = (file) => {
    if (file["fileName"] !== "+") {
      setRenameFileName(file["fileName"]);
      setSelectedFile(file);
      setIsLongPressBottomVisible(true);
    }
  };

  const addFile = async () => {
    await PostAddFavoriteFile(newFileName);
    await loadDatas();
    setAddDialogVisible(false);
    setNewFileName("新增資料夾");
  };

  const renameFile = async () => {
    await PostRenameFavoriteFile(selectedFile["fileId"], renameFileName);
    await loadDatas();
    setRenameDialogVisible(false);
  };

  const loadDatas = async () => {
    const data = await GetMyFavoriteFiles();
    const newObj = {
      esIds: [],
      fileId: -1,
      fileName: "+",
    };
    console.log("load data here");
    setFiles([newObj, ...data]);
  };

  useEffect(() => {
    loadDatas();
  }, [navigate]);

  return (
    <Provider>
      <Background>
        <LgsLogo />
        <Scroll>
          <View
            style={{
              height: 40,
              // backgroundColor: "red",
              width: "100%",
              marginBottom: 20,
            }}
          ></View>
          <ContentContainer style={{ width: "85%" }}>
            <Text style={FONTS.h3}> </Text>
            {files ? (
              <FlatList
                data={files}
                renderItem={(item) => File(item, onPressFile, onLongPress)}
                keyExtractor={(x) => x["fileId"]}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  // alignSelf: "center",
                }}
                contentContainerStyle={{ width: "100%" }}
              />
            ) : null}
            <Portal>
              <Dialog
                visible={addDialogVisible}
                onDismiss={() => setAddDialogVisible(false)}
              >
                <Dialog.Title>新增資料夾</Dialog.Title>
                <Dialog.Content>
                  <LgsTextInput
                    value={newFileName}
                    placeholder={"請輸入資料夾名稱"}
                    onChangeText={setNewFileName}
                  />
                  {newFileName.length > 15 ? (
                    <Text style={{ color: "red" }}>
                      資料夾名稱超過15字元上限
                    </Text>
                  ) : null}
                </Dialog.Content>

                <Dialog.Actions>
                  <Button
                    onPress={() => addFile()}
                    disabled={!newFileName || newFileName.length > 15}
                  >
                    完成
                  </Button>
                  <Button onPress={() => setAddDialogVisible(false)}>
                    取消
                  </Button>
                </Dialog.Actions>
              </Dialog>

              <Dialog
                visible={renameDialogVisible}
                onDismiss={() => setRenameDialogVisible(false)}
              >
                <Dialog.Title>重新命名資料夾</Dialog.Title>
                <Dialog.Content>
                  <LgsTextInput
                    value={renameFileName}
                    placeholder={"請輸入資料夾名稱"}
                    onChangeText={setRenameFileName}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => renameFile()}
                    disabled={!renameFileName}
                  >
                    完成
                  </Button>
                  <Button onPress={() => setRenameDialogVisible(false)}>
                    取消
                  </Button>
                </Dialog.Actions>
              </Dialog>

              <BottomSheet
                isVisible={isLongPressBottomVisible}
                onBackdropPress={() => setIsLongPressBottomVisible(false)}
              >
                <ListItem onPress={() => onDeleteFile()}>
                  <ListItem.Content>
                    <ListItem.Title>
                      刪除 {selectedFile ? selectedFile.fileName : null}?
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
                <ListItem
                  onPress={() => {
                    setIsLongPressBottomVisible(false);
                    setRenameDialogVisible(true);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>
                      重新命名 {selectedFile ? selectedFile.fileName : null}?
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </BottomSheet>
            </Portal>
          </ContentContainer>
          <View
            style={{
              height: 40,
              // backgroundColor: "red",
              width: "100%",
              marginBottom: 20,
            }}
          ></View>
        </Scroll>
      </Background>
    </Provider>
  );
};

export default MyFavorite;

const styles = StyleSheet.create({});
