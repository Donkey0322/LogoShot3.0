import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';
import { Alert } from 'react-native';

import type { Color } from '@/utils/types';

import { IconButton } from '@/components/Button';
import { COLORS, ICONS } from '@/constant';
import { useUser } from '@/contexts/useUser';
import useAuth from '@/libs/useAuth';

const { Apple } = ICONS;

export default function useApple({
  buttonColor,
  iconColor = COLORS('white'),
}: {
  buttonColor?: Color;
  iconColor?: Color;
}) {
  const { setUser } = useUser();
  const { appleSignup } = useAuth();

  const handlePress = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential?.fullName?.givenName && credential.authorizationCode && credential.email) {
        const { data } = await appleSignup({
          name: credential?.fullName?.givenName,
          token: credential.authorizationCode,
          email: credential.email,
        });
        router.push();
        Alert.alert('Logged in', `Hi ${credential?.fullName?.givenName}`);
      }
    } catch (e) {
      // if (e.code === "ERR_REQUEST_CANCELED") {
      //   Alert.alert("Apple Login Cancled !");
      // } else {
      //   Alert.alert("Apple Login Error !");
      // }
      Alert.alert('Apple Login Error !');
    }
  };
  return (
    <>
      <IconButton color={buttonColor} onPress={handlePress}>
        <Apple color={iconColor} />
      </IconButton>
    </>
  );
}
