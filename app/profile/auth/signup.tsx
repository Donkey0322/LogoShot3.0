import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { styled } from 'styled-components/native';

import Button from '@/components/Button';
import Input from '@/components/TextInput';
import Validation from '@/components/Validation';
import { COLORS } from '@/constant';
import useAuth from '@/libs/useAuth';
import { useSignup } from '@/modules/auth/hooks';
import * as AppFrame from '@/modules/search/components/Background';

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS('mustard.200')};
  /* align-items: center; */
  justify-self: flex-start;
  padding: 25px;
  padding-top: 0;
`;

const Label = styled.Text`
  margin-left: 8px;
`;

export default function Page() {
  const { signupData, handleSignupDataChange } = useSignup();
  const {
    signUp,
    loading: { signUp: loading },
  } = useAuth();
  const [validation, setValidation] = useState(false);

  return (
    <AppFrame.Background style={{ backgroundColor: COLORS('mustard.200') }}>
      <Background>
        <AppFrame.ScrollView style={{ flex: 1 }}>
          <Label>使用者名稱</Label>
          <Input
            value={signupData.user}
            style={styles.input}
            placeholder={'輸入名稱'}
            onChangeText={(text) => handleSignupDataChange(text, 'user')}
          />
          <Label>您的信箱</Label>
          <Input
            value={signupData.email}
            style={styles.input}
            placeholder={'請輸入信箱'}
            onChangeText={(text) => handleSignupDataChange(text, 'email')}
          />
          <Label>您的密碼</Label>
          <Input
            value={signupData.password}
            style={styles.input}
            placeholder={'請輸入密碼'}
            onChangeText={(text) => handleSignupDataChange(text, 'password')}
            secureTextEntry={true}
          />
          <Label>確認密碼</Label>
          <Input
            value={signupData.confirm}
            style={styles.input}
            placeholder={'再次輸入密碼'}
            onChangeText={(text) => handleSignupDataChange(text, 'confirm')}
            secureTextEntry={true}
          />
          {loading && <ActivityIndicator />}
          {!validation ? (
            <Button
              onPress={async () => {
                try {
                  await signUp({
                    email: signupData.email,
                    password: signupData.password,
                    username: signupData.user,
                  });
                  setValidation(true);
                } catch (e) {
                  if (e instanceof Error) {
                    if (e.message === 'NotVerified') setValidation(true);
                  }
                }
              }}
              disabled={
                !signupData.email ||
                !signupData.user ||
                !signupData.password ||
                signupData.confirm !== signupData.password
              }
              style={{
                backgroundColor: COLORS('mustard.500'),
                marginHorizontal: 100,
              }}
              fontStyle={{ fontSize: 20 }}
            >
              註冊
            </Button>
          ) : (
            <Validation
              email={signupData.email}
              handleVerifySuccess={() => {
                Alert.alert('驗證成功！請重新登入');
                router.replace('/profile/auth/login');
              }}
            />
          )}
          {/* <View style={styles.icons}>
            <Facebook buttonColor={COLORS('facebook')} iconColor="#FFFFFF" />
            <Apple buttonColor="#000000" iconColor="#FFFFFF" />
            <Google buttonColor={COLORS('google')} iconColor="#FFFFFF" />
          </View> */}
          {/* <Facebook /> */}
        </AppFrame.ScrollView>
      </Background>
    </AppFrame.Background>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: 10,
    marginBottom: 25,
  },
  icons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: '25%',
    marginTop: 20,
  },
});
