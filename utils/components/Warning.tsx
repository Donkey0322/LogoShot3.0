import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import type { ReactNode } from 'react';
import type { PressableProps } from 'react-native';

const duration = 500;
const easing = Easing.linear;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Warning({
  children,
  style,
  ...rest
}: {
  children: ReactNode;
} & PressableProps) {
  const progress = useSharedValue(0);

  React.useEffect(() => {
    progress.value = withRepeat(withTiming(1 - progress.value, { duration, easing }), -1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(progress.value, [0, 1], ['red', 'transparent']),
    };
  });

  return (
    <AnimatedPressable style={[styles.container, animatedStyle, style]} {...rest}>
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 3,
  },
});
