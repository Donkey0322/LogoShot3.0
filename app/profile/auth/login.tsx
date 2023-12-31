import { StyleSheet } from 'react-native';
import { styled } from 'styled-components/native';

import Button from '@/components/Button';
import Input from '@/components/TextInput';
import { COLORS } from '@/constant';
import useAuth from '@/libs/useAuth';
import { useLogin } from '@/modules/auth/hooks';

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS('mustard.200')};
  /* align-items: center; */
  padding: 25px;
`;

const Label = styled.Text`
  margin-left: 8px;
`;

export default function Page() {
  const { loginData, handleLoginDataChange } = useLogin();
  const { logIn } = useAuth();

  return (
    <Background>
      <Label>使用者名稱</Label>
      <Input
        value={loginData.username}
        style={styles.input}
        placeholder={'輸入名字'}
        onChangeText={(text) => handleLoginDataChange(text, 'username')}
      />
      <Label>密碼</Label>
      <Input
        value={loginData.password}
        style={styles.input}
        placeholder={'輸入密碼'}
        onChangeText={(text) => handleLoginDataChange(text, 'password')}
        secureTextEntry={true}
      />
      <Button
        onPress={() => logIn(loginData)}
        style={{
          backgroundColor: COLORS('mustard.500'),
          marginHorizontal: 100,
        }}
        fontStyle={[{ fontSize: 18 }]}
        disabled={!loginData.password || !loginData.username}
      >
        登入
      </Button>
      {/* <View style={styles.icons}>
        <Facebook buttonColor={COLORS('facebook')} iconColor={COLORS('white')} />
        <Apple buttonColor="#000000" iconColor={COLORS('white')} />
        <Google buttonColor={COLORS('google')} iconColor={COLORS('white')} />
      </View> */}
      {/* <Facebook /> */}
    </Background>
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
