import { styled } from 'styled-components/native';

import type { ReactNode } from 'react';
import type { ViewStyle } from 'react-native';

import { BackButton } from '@/components/Button';
import { COLORS } from '@/constant';

const Background = styled.View<{ color?: string }>`
  flex: 1;
  background-color: ${COLORS('mustard.200')};
  align-items: center;
  padding-top: 25px;
`;

export const ToolBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 25px;
  width: 100%;
  margin-top: 10px;
`;

const ContentContainer = styled.View`
  flex: 1;
  background-color: ${COLORS('white')};
  border-top-right-radius: 30px;
  border-top-left-radius: 30px;
  width: 100%;
  padding-top: 24px;
  align-items: center;
`;

interface ScreenProps {
  children?: ReactNode;
  contentContainerStyle?: ViewStyle;
  customedToolBar?: ReactNode;
}

export default function Screen({ children, contentContainerStyle, customedToolBar }: ScreenProps) {
  return (
    <Background>
      {customedToolBar ?? (
        <ToolBar>
          <BackButton />
        </ToolBar>
      )}
      <ContentContainer style={[contentContainerStyle]}>{children}</ContentContainer>
    </Background>
  );
}
