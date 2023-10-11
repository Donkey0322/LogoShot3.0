import { useMemo } from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { BackButton } from '@/components/Button';
import Screen, { ToolBar } from '@/components/stack';
import { COLORS, ICONS } from '@/constant';
import { useUser } from '@/contexts/useUser';
import useAuth from '@/libs/useAuth';
import { Avatar, Menu } from '@/modules/profile/components';

const { Logout } = ICONS;

export default function Profile() {
  const { logOut } = useAuth();
  const { user } = useUser();
  const login = useMemo(() => user?.userId ?? false, [user?.userId]);

  return (
    <Screen
      customedToolBar={
        <ToolBar>
          <BackButton />
          {login && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                columnGap: 8,
                alignItems: 'center',
              }}
              onPress={logOut}
            >
              <Text
                style={{
                  color: COLORS('coldblue.500'),
                  fontWeight: 'bold',
                  fontSize: 17,
                }}
              >
                登出
              </Text>
              <Logout color={COLORS('coldblue.500')} />
            </TouchableOpacity>
          )}
        </ToolBar>
      }
      contentContainerStyle={{ paddingTop: 48 }}
    >
      <Avatar
        theme={login ? COLORS('joy.orange') : COLORS('gray.300')}
        image={login ? '@/assets/figure.png' : undefined}
      />
      <Text style={{ fontSize: 31, marginTop: 32, fontWeight: 'bold' }}>
        {login ? user?.name ?? 'Olivia Rodrigo' : '未登入'}
      </Text>
      <Menu />
    </Screen>
  );
}
