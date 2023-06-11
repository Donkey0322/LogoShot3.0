global.Buffer = global.Buffer || require("buffer").Buffer;
import axios from "./axios";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
// import { images, icons, COLORS, FONTS, SIZES } from "../constant/";

// 註冊
export async function SignInToFireBase(email, password) {
  console.log(email, password);
  return await axios
    .post("/registerVerify", {
      email: email,
      password: password,
      name: "1234",
    })
    .then((res) => {
      if (res.status === 200) {
        // console.log(res.data);
        return res.data["res"]["email"];
      }
    })
    .catch((res) => {
      Alert.alert(
        "註冊失敗，請檢查是否已註冊過，或通知系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
      return;
    });
}

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

// 圖片搜尋頁
export async function SearchImage(
  Image,
  photoWidth,
  photoHeight,
  indicatorX,
  indicatorY,
  searchKeywords,
  targetClasscodes,
  targetColor,
  targetApplicant,
  targetStartTime,
  targetEndTime,
  targetDraftC,
  targetDraftE,
  targetDraftJ,
  isOldImage
) {
  // console.log(Image, photoWidth, photoHeight, indicatorX, indicatorY);
  const data = new FormData();
  var initial = "Image Search";
  data.append("photoWidth", photoWidth);
  data.append("photoHeight", photoHeight);
  data.append("indicatorX", indicatorX);
  data.append("indicatorY", indicatorY);
  data.append("searchKeywords", searchKeywords);
  data.append("targetClasscodes", JSON.stringify(targetClasscodes));
  data.append("targetColor", targetColor);
  data.append("targetApplicant", targetApplicant);
  data.append("targetStartTime", targetStartTime);
  data.append("targetEndTime", targetEndTime);
  data.append("targetDraftC", targetDraftC);
  data.append("targetDraftE", targetDraftE);
  data.append("targetDraftJ", targetDraftJ);
  data.append("isOldImage", isOldImage);

  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  data.append("userId", userInfo ? userInfo.userId : "1234");
  data.append("userType", userInfo ? userInfo.userType : "manual");

  if (!isOldImage) {
    const base64 = await FileSystem.readAsStringAsync(Image.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    data.append("file_attachment", base64);
  } else {
    const re = /imagelog\/\w{1,30}\/\d{4}-\d{2}-\d{2}-\d{2}:\d{2}:\d{2}.png/;
    data.append("file_attachment", re.exec(Image.uri)[0]);
  }

  return await axios
    .post("/postImageSearch", data, {
      headers: { "Content-Type": "multipart/form-data; " },
      responseType: "json",
    })
    .then((res) => {
      console.log(res.data.data.length);
      return res.data.data;
    })
    .catch((e) => {
      console.log(e);
      return;
    });
}
// 文字搜尋頁
export async function SearchText(
  searchKeywords = "",
  isSimSound = false,
  isSimShape = false,
  target_classcodes = [],
  target_color = "",
  target_applicant = "",
  target_startTime = "",
  target_endTime = "",
  targetDraftC = "",
  targetDraftE = "",
  targetDraftJ = ""
) {
  const data = new FormData();
  data.append("searchKeywords", searchKeywords);
  data.append("isSimSound", isSimSound);
  data.append("isSimShape", isSimShape);
  data.append("target_classcodes", JSON.stringify(target_classcodes));
  data.append("target_color", target_color);
  data.append("target_applicant", target_applicant);
  data.append("target_startTime", target_startTime);
  data.append("target_endTime", target_endTime);
  data.append("target_draft_c", targetDraftC);
  data.append("target_draft_e", targetDraftE);
  data.append("target_draft_j", targetDraftJ);

  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  data.append("userId", userInfo ? userInfo.userId : "1234");
  data.append("userType", userInfo ? userInfo.userType : "manual");

  return await axios
    .post("/postTextSearch", data, {
      headers: { "Content-Type": "multipart/form-data; " },
      responseType: "json",
    })
    .then((res) => {
      console.log(res.data.resultData);
      return res.data.resultData;
    })
    .catch((e) => {
      console.log("e", e);
      return;
    });
}
// 我的最愛資料夾們
export async function GetMyFavoriteFiles() {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  if (userInfo) {
    return await axios
      .get(
        "/getMyFavoriteFile?userId=" +
          userInfo.userId +
          "&userType=" +
          userInfo.userType
      )
      .then((res) => {
        // console.log(res.data);
        return res.data;
      });
  } else {
    Alert.alert("如需使用我的最愛，請先登入");
    return;
  }
}
// 我的最愛資料夾內容
export async function GetMyFavoriteFileDetail(fileId) {
  return await axios
    .post("/getMyFavoriteFileDetail", { fileId })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
}

// 新增我的最愛資料夾
export async function PostAddFavoriteFile(fileName) {
  const userInfoStr = await AsyncStorage.getItem("@userInfo");
  const userInfo = userInfoStr != null ? JSON.parse(userInfoStr) : null;
  if (userInfo) {
    return await axios
      .post("/postAddMyFavoriteFile", {
        userId: userInfo.userId,
        userType: userInfo.userType,
        fileName,
      })
      .then((res) => {
        console.log(res.data["res"]["fileName"], res.data["res"]["fileId"]);
        return res.data["res"]["fileId"];
      })
      .catch((res) => {
        console.log(res);
        return;
      });
  } else {
    Alert.alert("如需新增我的最愛資料夾，請先登入");
    return;
  }
}

// 刪除我的最愛資料夾
export async function PostDeleteFavoriteFile(fileId) {
  if (fileId) {
    return await axios
      .post("/postDeleteMyFavoriteFile", {
        fileId,
      })
      .then((res) => {
        console.log(res.data["res"]["fileName"]);
        Alert.alert("已將" + res.data["res"]["fileName"] + "刪除");
        return;
      });
  } else {
    console.log(fileId, esId);
    return;
  }
}

export async function PostRenameFavoriteFile(fileId, fileName) {
  if (fileId && fileName) {
    return await axios
      .post("/postRenameMyFavoriteFile", {
        fileId,
        fileName,
      })
      .then((res) => {
        console.log(res.data["res"]["fileName"]);
        Alert.alert("已將檔案命名為" + res.data["res"]["fileName"]);
        return;
      });
  } else {
    console.log(fileId, fileName);
    return;
  }
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
