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
        backgroundColor: 'red',
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
        // minHeight: '95%',
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
  padding: 20px 15px 0px;
  flex: 1;
  min-height: 100%;
  background-color: inherit;
  align-items: center;
  row-gap: 10px;
  justify-content: space-between;
`;
