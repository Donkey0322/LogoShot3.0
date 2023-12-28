import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

import { useUser } from '@/contexts/useUser';
import {
  appleLogin,
  deleteAccount,
  getUserInfo,
  loginAsGeneralUser,
  resendMail,
  signupAsGeneralUser,
} from '@/libs/api/fetchers/account';
import { swrMutationFetcher } from '@/libs/api/functions';

export default function useAuth() {
  const { user } = useUser();
  const router = useRouter();
  const useUserInfoSWR = useSWR(`/account`, user?.username ? () => getUserInfo({}) : null);
  const useLoginSWR = useSWRMutation(`/account/login`, swrMutationFetcher(loginAsGeneralUser));
  const useSignupSWR = useSWRMutation(`/account/signup`, swrMutationFetcher(signupAsGeneralUser));
  const resendMailSWR = useSWRMutation('resend', swrMutationFetcher(resendMail));
  const useDeleteAccountSWR = useSWRMutation('/account', swrMutationFetcher(deleteAccount));

  const useAppleLoginSWR = useSWRMutation(`/apple_login`, swrMutationFetcher(appleLogin));
  const { setUser } = useUser();

  const logIn = async (data: { username: string; password: string }) => {
    try {
      const {
        data: { token, username },
      } = await useLoginSWR.trigger(data);
      await AsyncStorage.setItem('token', token);
      const userinfo = await useUserInfoSWR.mutate();
      console.log('Userinfo', userinfo);
      setUser({ username, avatar: userinfo?.data.photo });
      router.back();
      Alert.alert('Logged in', `Hi ${username}`);
    } catch (e) {
      if (e instanceof Error)
        switch (e.message) {
          case 'NotFound':
            Alert.alert(`帳號不存在`);
            break;
          case 'LoginFailed':
            Alert.alert(`登入失敗，請確認帳號與密碼是否正確。`);
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
      Alert.alert(`驗證信已寄至${data?.email}，請輸入信件中之六位驗證碼`);
    } catch (e) {
      if (e instanceof Error) {
        switch (e.message) {
          case 'InvalidEmail':
            Alert.alert('請輸入有效信箱');
            break;
          case 'EmailExist':
            Alert.alert('此信箱已註冊過');
            break;
          case 'NotVerified':
            Alert.alert(`此信箱尚未驗證。驗證信已寄至${data?.email}，請輸入信件中之六位驗證碼`);
            resendMailSWR.trigger({ email: data.email });
            break;
          default:
            Alert.alert(
              '伺服器出錯，請檢查帳戶是否已註冊，或聯繫聯絡系統服務人員協助處理',
              '來訊信箱：ntuim2022@gmail.com',
            );
            break;
        }
        throw new Error(e.message);
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
    deleteAccount: useDeleteAccountSWR.trigger,
    appleLogin: useAppleLoginSWR.trigger,

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
