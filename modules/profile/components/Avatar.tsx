import { Image } from 'expo-image';
import { useState } from 'react';
import { styled } from 'styled-components/native';

import type { Color } from '@/utils/types';

import { COLORS, ICONS } from '@/constant';
const { Person } = ICONS;

const ImageBorder = styled.View<{ color: string }>`
  width: 230px;
  height: 230px;
  border-radius: 200%;
  border: 5px solid ${({ color }) => color};
  padding: 20px;
`;

const ImageContainer = styled.View<{ color: string }>`
  border-radius: 200%;
  background-color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default function Avatar({
  theme = COLORS('joy.orange'),
  image,
}: {
  theme: Color;
  image?: string;
}) {
  const [imageWidth, setImageWidth] = useState(0);

  return (
    <ImageBorder color={theme}>
      <ImageContainer
        onLayout={({
          nativeEvent: {
            layout: { width },
          },
        }) => setImageWidth(width * 0.8)}
        color={theme}
      >
        {image ? (
          <Image
            style={{
              flex: 0.8,
              width: imageWidth,
            }}
            source={require('@/assets/figure.png')}
            // placeholder={blurhash}
            // contentFit="cover"
            transition={1000}
          />
        ) : (
          <Person size={imageWidth} color={COLORS('white')} />
        )}
      </ImageContainer>
    </ImageBorder>
  );
}
