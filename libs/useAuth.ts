import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

import type {
  LogInRequest,
  SignUpRequest,
} from "@/libs/base/types/request/post";

import { useUser } from "@/contexts/useUser";
import POST from "@/libs/base/post";

export default function useAuth() {
  const router = useRouter();
  const { setUser } = useUser();

  const logIn = async (data: LogInRequest) => {
    try {
      const { data: user, error } = await POST.logIn(data);
      if (error) {
        switch (error) {
          case "INVALID_EMAIL":
            Alert.alert("請輸入有效信箱");
            break;
          case "INVALID_PASSWORD":
            Alert.alert("密碼錯誤");
            break;
          case "EMAIL_NOT_FOUND":
            Alert.alert(
              "帳戶未註冊，請先登入至頁面註冊，或利用 Facebook、Apple 帳戶登入"
            );
            break;
          default:
            break;
        }
        return;
      }
      if (user?.userId) {
        AsyncStorage.setItem("userId", `${user.userId}`);
        setUser({ userId: user.userId, userType: "general" });
        router.back();
        Alert.alert("Logged in", `Hi ${user.userId}`);
      }
    } catch {
      Alert.alert(
        "伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
    }
  };

  const signUp = async (data: SignUpRequest) => {
    try {
      const { data: res, error } = await POST.signUp(data);
      if (error) {
        switch (error) {
          case "INVALID_EMAIL":
            Alert.alert("請輸入有效信箱");
            break;
          case "EMAIL_EXISTS":
            Alert.alert("此信箱已註冊過");
            break;
          default:
            break;
        }
        return;
      }
      Alert.alert(
        `驗證信已寄至${res?.email}， 請至信箱中點擊連結完成驗證。（請小心驗證信有可能在信箱中被歸類為垃圾信件）`
      );
      router.replace("profile");
    } catch {
      Alert.alert(
        "伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      setUser(undefined);
      Alert.alert("登出成功！");
    } catch (e) {
      Alert.alert(
        "伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理",
        "來訊信箱：ntuim2022@gmail.com"
      );
    }
  };

  return {
    logIn,
    signUp,
    logOut,
  };
}
