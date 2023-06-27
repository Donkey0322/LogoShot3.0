global.Buffer = global.Buffer || require("buffer").Buffer;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios from "./axios";

// 刪除 firebase 帳戶
export async function PostDeleteFirebaseAccount(email, password) {
  return await axios
    .post("/deleteFirebaseAccount", { email: email, password: password })
    .then((res) => {
      if (res.status === 200) {
        return res.data;
      }
    })
    .catch((res) => {
      if (res.data === "INVALID_PASSWORD") {
        Alert.alert("密碼錯誤");
      } else {
        Alert.alert(
          "伺服器出錯，請聯絡系統服務人員協助處理",
          "來訊信箱：ntuim2022@gmail.com"
        );
      }
      return;
    });
}
// 刪除外部帳戶
export async function PostDeleteOuterAccount() {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  const userId = userInfo ? userInfo.userId : "1234delete";
  const userType = userInfo ? userInfo.userType : "manualdelete";
  return await axios
    .post("/deleteOuterAccount", {
      userId: userId,
      userType: userType,
    })
    .then((res) => {
      return res.data;
    })
    .catch((res) => {
      Alert.alert(
        "伺服器出錯，請聯絡系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
    });
}

// 取得搜尋紀錄
export async function GetSearchingHistory(isImageSearch) {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  // console.log(userInfo);
  if (userInfo) {
    return await axios
      .get(
        "/getHistory?userId=" +
          userInfo.userId +
          "&userType=" +
          userInfo.userType +
          "&isImageSearch=" +
          isImageSearch
      )
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });
  } else {
    Alert.alert("如需使用搜尋紀錄功能，請先登入");

    return;
  }
}

// Alert.alert("已將" + res.data["res"]["fileName"] + "刪除");
// Alert.alert("已將檔案命名為" + res.data["res"]["fileName"]);

// 我的最愛資料夾內容
export async function GetMyFavoriteFileDetail(fileId) {
  return await axios
    .post("/getMyFavoriteFileDetail", { fileId })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
}

// 新增我的最愛
export async function PostAddFavorite(fileId, esId) {
  if (fileId && esId) {
    return await axios
      .post("/postAddFavorite", {
        fileId,
        esId,
      })
      .then((res) => {
        console.log(res.data["res"]["fileId"][0][3]);
        Alert.alert("已將商標加入" + res.data["res"]["fileId"][0][3]);
        return;
      });
  } else {
    console.log(fileId, esId);
    return;
  }
}
// 刪除我的最愛
export async function PostDeleteFavorite(fileId, esId, name) {
  if (fileId && esId) {
    return await axios
      .post("/postDeleteFavorite", {
        fileId,
        esId,
      })
      .then((res) => {
        // console.log(res.data["res"]["fileId"][0][3]);
        Alert.alert("已將商標" + name + "刪除");
        return;
      });
  } else {
    // console.log(fileId, esId);
    return;
  }
}
