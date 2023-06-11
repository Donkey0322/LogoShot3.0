import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomSheet, ListItem } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  Provider,
  Portal,
  Dialog,
  Button as PaperButton,
} from "react-native-paper";
import LgsLogo from "../components/lgsLogo";
import {
  PostDeleteFirebaseAccount,
  PostDeleteOuterAccount,
} from "../axios/api";
import { Background, Scroll, ContentContainer } from "../components/lgsScreen";
import LgsTextInput from "../components/lgsTextInput";

export default ({ navigation: { navigate }, route: { params } }) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState(null);
  const [isOuterAccount, setIsOuterAccount] = useState(null);
  const [password, setPassword] = useState("");

  const [bottemSheetVisible, setBottemSheetVisible] = useState(false);
  const [
    deleteFirebaseAccountDialogVisible,
    setDeleteFirebaseAccountDialogVisible,
  ] = useState(false);
  const [deleteOuterAccountDialogVisible, setDeleteOuterAccountDialogVisible] =
    useState(false);

  const deleteFirebaseAccount = async () => {
    const deleteData = await PostDeleteFirebaseAccount(name, password);
    if (deleteData) {
      console.log(deleteData);
      Alert.alert(
        "帳戶及帳戶內容已刪除。Logoshot 不會保留您任何資訊。如未來您改變心意，歡迎您隨時回來再次註冊。"
      );
      await logout();
    }
    setDeleteFirebaseAccountDialogVisible(false);
    setPassword("");
  };

  const deleteOuterAccount = async () => {
    const deleteData = await PostDeleteOuterAccount();
    if (deleteData) {
      console.log(deleteData);
      Alert.alert(
        "您的帳戶在 Logoshot 的所有帳戶資訊均已刪除。Logoshot 不會保留您任何資訊。如未來您改變心意，歡迎您隨時回來再次登入。"
      );
      await logout();
    }
    setDeleteOuterAccountDialogVisible(false);
  };

  useEffect(() => {
    (async () => {
      const userInfoStr = await AsyncStorage.getItem("@userInfo");
      const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
      setName(userInfo ? userInfo.name : null);
      setImage(userInfo ? userInfo.image : null);
      setIsOuterAccount(userInfo ? userInfo.userType !== "firebase" : false);
    })();
  }, [params, name]);

  const logout = async () => {
    const userInfoStr = await AsyncStorage.getItem("@userInfo");
    const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
    const userType = userInfo.userType;
    // if (userInfo.userType === "apple") {
    //   await AppleAuthentication.signOutAsync();
    //   console.log("apple");
    // }
    await AsyncStorage.removeItem("@userInfo");
    setName(null);
    setImage(null);
    Alert.alert("Logged out!");
    navigate("Home", {});
  };

  return (
    <Provider>
      <Background>
        <LgsLogo
          isHome={true}
          name={name}
          image={image}
          logout={logout}
          showDeleteAccount={() => setBottemSheetVisible(true)}
        />
        <Scroll contentContainerStyle={styles.container}>
          <ContentContainer>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.imageStyle}
                source={require("../assets/Logoshot.png")}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                // backgroundColor: "red",
              }}
            >
              {!name && (
                <>
                  <TouchableOpacity
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      backgroundColor: "#f4a261",
                      borderRadius: 5,
                      margin: 10,
                      width: 300,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => navigate("Login")}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      登入
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      paddingLeft: 10,
                      paddingRight: 10,
                      backgroundColor: "#ffffff",
                      borderWidth: 1,
                      borderColor: "#939393", // 灰色
                      borderRadius: 5,
                      margin: 10,
                      width: 300,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => navigate("Signup")}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                      註冊
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <View style={{ height: 80 }}></View>
            </View>
            <Portal>
              <Dialog
                visible={deleteFirebaseAccountDialogVisible}
                onDismiss={() => setDeleteFirebaseAccountDialogVisible(false)}
              >
                <Dialog.Title>確認刪除帳戶{name}？</Dialog.Title>
                <Dialog.Content>
                  <Text>
                    如確認刪除，Logoshot
                    將刪除您在我的最愛的所有收藏及瀏覽紀錄，不會留有您的任何資訊。如您日後改變心意，歡迎您再次註冊登入本平台，但之前刪除的帳戶資料（我的最愛及瀏覽紀錄）恕無法復原，敬請見諒。
                  </Text>
                </Dialog.Content>
                <Dialog.Content>
                  <LgsTextInput
                    value={password}
                    placeholder={"請輸入密碼"}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <PaperButton
                    onPress={() => deleteFirebaseAccount()}
                    disabled={!password}
                  >
                    確認
                  </PaperButton>
                  <PaperButton
                    onPress={() => {
                      setDeleteFirebaseAccountDialogVisible(false);
                      setPassword("");
                    }}
                  >
                    取消
                  </PaperButton>
                </Dialog.Actions>
              </Dialog>
              <Dialog
                visible={deleteOuterAccountDialogVisible}
                onDismiss={() => setDeleteOuterAccountDialogVisible(false)}
              >
                <Dialog.Title>
                  確認刪除帳戶{name}在 Logoshot 的所有帳戶資訊？
                </Dialog.Title>
                <Dialog.Content>
                  <Text>
                    如確認刪除，Logoshot
                    將刪除您在我的最愛的所有收藏及瀏覽紀錄，不會留有您的任何資訊。如您日後改變心意，歡迎您隨時再次登入，但之前刪除的資料恕無法復原，敬請見諒。
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <PaperButton onPress={() => deleteOuterAccount()}>
                    確認
                  </PaperButton>
                  <PaperButton
                    onPress={() => setDeleteOuterAccountDialogVisible(false)}
                  >
                    取消
                  </PaperButton>
                </Dialog.Actions>
              </Dialog>
              <BottomSheet
                isVisible={bottemSheetVisible}
                onBackdropPress={() => setBottemSheetVisible(false)}
              >
                <ListItem
                  onPress={() => {
                    isOuterAccount
                      ? setDeleteOuterAccountDialogVisible(true)
                      : setDeleteFirebaseAccountDialogVisible(true);
                    setBottemSheetVisible(false);
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title>刪除帳戶</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </BottomSheet>
            </Portal>
          </ContentContainer>
        </Scroll>
      </Background>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },
  imageStyle: {
    marginTop: 150,
    width: 300,
    height: 300,
  },
});
