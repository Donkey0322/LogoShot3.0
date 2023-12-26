import { router } from 'expo-router';
import { useMemo } from 'react';
import { Text } from 'react-native';
import { styled } from 'styled-components/native';

import type { TextStyle, TouchableOpacityProps } from 'react-native';

import { COLORS, ICONS } from '@/constant';
import { useUser } from '@/contexts/useUser';
const { Star, Search, Delete, Member, Login } = ICONS;

interface ItemType extends TouchableOpacityProps {
  icon: JSX.Element;
  content: string;
  contentStyle?: TextStyle;
}

const List = styled.View`
  margin-top: 30px;
  width: 70%;
  row-gap: 15px;
`;

const ListItem = styled.TouchableOpacity`
  padding: 20px;
  border: 1px solid ${COLORS('gray.200')};
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;
`;

export default function Menu() {
  const { user } = useUser();

  const items = useMemo<ItemType[]>(
    () =>
      user?.username
        ? [
            {
              icon: <Search />,
              content: '搜尋紀錄',
              onPress: () => router.push('/profile/history/image'),
            },
            {
              icon: <Star color={COLORS('icons.star')} />,
              content: '我的最愛',
              onPress: () => router.push('/profile/favorite/'),
            },
            // {
            //   icon: <Delete color={COLORS('red.500')} style={{ marginRight: 5 }} />,
            //   content: '刪除帳戶',
            //   contentStyle: {
            //     color: COLORS('red.500'),
            //   },
            // },
          ]
        : [
            {
              icon: <Login />,
              content: '登入',
              onPress: () => router.push('/profile/auth/login'),
            },
            {
              icon: <Member color={COLORS('coldblue')} />,
              content: '註冊',
              onPress: () => router.push('/profile/auth/signup'),
            },
          ],
    [user?.username],
  );

  return (
    <List>
      {items.map(({ icon, content, contentStyle, onPress }, index) => (
        <ListItem onPress={onPress} key={index}>
          {icon}
          <Text style={[{ fontSize: 16, fontWeight: 'bold' }, contentStyle]}>{content}</Text>
        </ListItem>
      ))}
    </List>
  );
}
