/* eslint-disable react/display-name */
import { CellContainer, FlashList } from '@shopify/flash-list';
import { forwardRef } from 'react';
import Animated from 'react-native-reanimated';

import type { ListRenderItem } from '@shopify/flash-list';

import useWidthOnResize from '@/utils/hooks/useWidthOnResize';

const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

interface FlashListProps<T> {
  data: readonly T[] | undefined | null;
  items: ListRenderItem<T>;
  itemSize: number;
}

export default function List<T>({
  data,
  items,
  itemSize,
}: FlashListProps<T extends (infer U)[] ? U : never>) {
  const { width } = useWidthOnResize();

  return (
    <FlashList
      data={data}
      CellRendererComponent={forwardRef((props, ref) => (
        <AnimatedCellContainer
          {...props}
          style={{
            ...props.style,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}
          ref={ref}
        />
      ))}
      renderItem={items}
      estimatedItemSize={itemSize}
      numColumns={Math.floor((width - 50) / itemSize)}
    />
  );
}
