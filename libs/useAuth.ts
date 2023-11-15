import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useUser } from '@/contexts/useUser';
import {
  appleLogin,
  appleSignup,
  getUserInfo,
  loginAsGeneralUser,
  signupAsGeneralUser,
} from '@/libs/api/fetchers/account';
import { swrMutationFetcher } from '@/libs/api/functions';

export default function useAuth() {
  const router = useRouter();
  const useUserInfoSWR = useSWR(`/account`, () => getUserInfo({}));
  const useLoginSWR = useSWRMutation(`/account/login`, swrMutationFetcher(loginAsGeneralUser));
  const useSignupSWR = useSWRMutation(`/account/signup`, swrMutationFetcher(signupAsGeneralUser));

  const useAppleLoginSWR = useSWRMutation(`/apple_login`, swrMutationFetcher(appleLogin));
  const useAppleSignupSWR = useSWRMutation(`/apple_login`, swrMutationFetcher(appleSignup));
  const { setUser } = useUser();

  const logIn = async (data: { username: string; password: string }) => {
    try {
      const {
        data: { token, username },
        data: temp,
      } = await useLoginSWR.trigger(data);
      console.log(temp);
      await AsyncStorage.setItem('token', token);
      const userinfo = await useUserInfoSWR.mutate();
      console.log('Userinfo', userinfo);
      setUser({ username, avatar: userinfo?.data.photo });
      router.back();
      Alert.alert('Logged in', `Hi ${username}`);
    } catch (e) {
      if (e instanceof Error)
        switch (e.message) {
          case 'INVALID_EMAIL':
            Alert.alert('請輸入有效信箱');
            break;
          case 'INVALID_PASSWORD':
            Alert.alert('密碼錯誤');
            break;
          case 'EMAIL_NOT_FOUND':
            Alert.alert('帳戶未註冊，請先登入至頁面註冊，或利用 Facebook、Apple 帳戶登入');
            break;
          default:
            console.log(e.message);
            Alert.alert(
              '伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理',
              '來訊信箱：ntuim2022@gmail.com',
            );
            break;
        }
    }
  };

  const signUp = async (data: { email: string; password: string; username: string }) => {
    try {
      await useSignupSWR.trigger(data);
      Alert.alert(
        `驗證信已寄至${data?.email}， 請至信箱中點擊連結完成驗證。（請小心驗證信有可能在信箱中被歸類為垃圾信件）`,
      );
      router.replace('/profile/');
    } catch (e) {
      if (e instanceof Error)
        switch (e.message) {
          case 'INVALID_EMAIL':
            Alert.alert('請輸入有效信箱');
            break;
          case 'EMAIL_EXISTS':
            Alert.alert('此信箱已註冊過');
            break;
          default:
            Alert.alert(
              '伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理',
              '來訊信箱：ntuim2022@gmail.com',
            );
            break;
        }
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setUser(undefined);
      Alert.alert('登出成功！');
    } catch (e) {
      Alert.alert(
        '伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理',
        '來訊信箱：ntuim2022@gmail.com',
      );
    }
  };

  return {
    logIn,
    signUp,
    logOut,

    appleLogin: useAppleLoginSWR.trigger,
    appleSignup: useAppleSignupSWR.trigger,

    loading: {
      logIn: useLoginSWR.isMutating,
      signUp: useSignupSWR.isMutating,
    },

    error: {
      login: useLoginSWR.error,
      signUp: useSignupSWR.error,
    },
  };
}
