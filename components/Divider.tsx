import { View } from 'react-native';

import type { Color } from '@/utils/types';

export default function Divider({ color = '#d8d8d8' }: { color?: Color }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, height: 1, backgroundColor: color }} />
    </View>
  );
}
