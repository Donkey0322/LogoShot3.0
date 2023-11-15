import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import type { ViewStyle } from 'react-native';

export const SIZE = 30;

type ContextType = {
  translateX: number;
  translateY: number;
};

interface DragProps {
  initialX: number;
  initialY: number;
  corner: 'leftTop' | 'rightTop' | 'rightBottom' | 'leftBottom';
  dependency?: { x?: number; y?: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  onEnd: (x: number, y: number) => void;
}

const BorderMapping: Record<DragProps['corner'], ViewStyle> = {
  leftTop: {
    borderLeftWidth: 3,
    borderTopWidth: 3,
  },
  rightTop: {
    borderRightWidth: 3,
    borderTopWidth: 3,
  },
  rightBottom: {
    borderRightWidth: 3,
    borderBottomWidth: 3,
  },
  leftBottom: {
    borderLeftWidth: 3,
    borderBottomWidth: 3,
  },
};

export default function Drag({
  initialX,
  initialY,
  corner,
  dependency,
  setPosition,
  onEnd,
}: DragProps) {
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  const handleChange = (x: number, y: number) => {
    setPosition({ x, y });
  };

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
      runOnJS(handleChange)(translateX.value, translateY.value);
    },
    onEnd: () => {
      runOnJS(onEnd)(translateX.value, translateY.value);
    },
  });

  useEffect(() => {
    if (dependency?.x) translateX.value = dependency.x;
    if (dependency?.y) translateY.value = dependency.y;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency?.x, dependency?.y]);

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          styles.square,
          useAnimatedStyle(() => {
            return {
              transform: [
                {
                  translateX: translateX.value,
                },
                {
                  translateY: translateY.value,
                },
              ],
            };
          }),
          BorderMapping[corner],
        ]}
      />
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  square: {
    width: SIZE,
    height: SIZE,
    position: 'absolute',
    borderColor: 'white',
  },
});
