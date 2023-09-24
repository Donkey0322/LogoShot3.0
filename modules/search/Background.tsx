import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import type { KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import type { SafeAreaViewProps } from 'react-native-safe-area-context';

/**
 *
 * @description This is a safe area view
 */
export const Background = ({ children, style, ...rest }: SafeAreaViewProps) => (
  <SafeAreaView
    style={[
      {
        flex: 1,
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </SafeAreaView>
);

export const ScrollBeyond = styled.View`
  min-height: 100%;
  background-color: inherit;
`;

/**
 *
 * @param style - the alias of contentContainerStyle for this component
 */
export const ScrollView = ({ children, style, ...rest }: KeyboardAwareScrollViewProps) => (
  <KeyboardAwareScrollView
    contentContainerStyle={[
      {
        flex: 1,
        backgroundColor: 'inherit',
      },
      style,
    ]}
    {...rest}
  >
    {children}
  </KeyboardAwareScrollView>
);

export const ContentContainer = styled.View`
  padding: 5px 15px;
  flex: 1;
  min-height: 100%;
  background-color: inherit;
  align-items: center;
  justify-content: space-between;
`;
