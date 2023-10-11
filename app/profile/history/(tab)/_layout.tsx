import { Text } from 'react-native';

import { Toptab } from '@/components/navigator/TopTab';
import { COLORS } from '@/constant';

const NAVIGATE_ITEM = {
  image: {
    label: '圖片搜尋',
  },
  text: {
    label: '文字搜尋',
  },
};

export default function Layout() {
  return (
    <Toptab>
      {Object.keys(NAVIGATE_ITEM).map((title, index) => (
        <Toptab.Screen
          key={index}
          name={title}
          options={{
            tabBarLabel: ({ focused }: { focused: boolean }) => (
              <Text
                style={[
                  { ...(focused && { fontWeight: 'bold' }) },
                  { ...(!focused && { color: COLORS('gray.300') }) },
                ]}
              >
                {NAVIGATE_ITEM[title as keyof typeof NAVIGATE_ITEM].label}
              </Text>
            ),
            tabBarIndicatorStyle: { backgroundColor: COLORS('blue') },
          }}
        />
      ))}
    </Toptab>
  );
}
