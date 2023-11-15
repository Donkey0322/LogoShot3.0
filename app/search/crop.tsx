import { Image } from 'expo-image';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Image as ImageInfo, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { COLORS } from '@/constant';
import { useImage } from '@/contexts/useImage';
import usePick from '@/modules/search/hooks/usePick';
import Drag, { SIZE } from '@/utils/components/Drag';

const Toolbar = styled.View`
  position: relative;
  bottom: 0;
  padding: 20px 20px 30px 20px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background-color: ${COLORS('gray.700')};
  opacity: 0.9;
`;

const INITIAL = {
  leftTop: { x: -100, y: -100 },
  rightTop: { x: 100, y: -100 },
  rightBottom: { x: 100, y: 100 },
  leftBottom: { x: -100, y: 100 },
};

export default function Page() {
  const { image, setImage } = useImage();
  const { crop } = usePick();
  const [leftTop, setLeftTop] = useState(INITIAL.leftTop);
  const [rightTop, setRightTop] = useState(INITIAL.rightTop);
  const [rightBottom, setRightBottom] = useState(INITIAL.rightBottom);
  const [leftBottom, setLeftBottom] = useState(INITIAL.leftBottom);

  const [imageContainer, setImageContainer] = useState<
    { height: number; width: number } | undefined
  >(undefined);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [ratio, setRatio] = useState(0);

  const handleLeftTopChangeEnd = (x: number, y: number) => {
    setLeftBottom((prev) => ({ ...prev, x }));
    setRightTop((prev) => ({ ...prev, y }));
  };

  const handleRightTopChangeEnd = (x: number, y: number) => {
    setLeftTop((prev) => ({ ...prev, y }));
    setRightBottom((prev) => ({ ...prev, x }));
  };

  const handleRightBottomChange = (x: number, y: number) => {
    setLeftBottom((prev) => ({ ...prev, y }));
    setRightTop((prev) => ({ ...prev, x }));
  };

  const handleLeftBottomChange = (x: number, y: number) => {
    setLeftTop((prev) => ({ ...prev, x }));
    setRightBottom((prev) => ({ ...prev, y }));
  };

  const handleBack = () => {
    setImage(undefined);
    router.back();
  };

  const handleOk = useCallback(async () => {
    try {
      await crop({
        width: (rightTop.x - leftTop.x + SIZE) / ratio,
        height: (leftBottom.y - leftTop.y + SIZE) / ratio,
        originX: (leftTop.x + width / 2 - SIZE / 2) / ratio,
        originY: (leftTop.y + height / 2 - SIZE / 2) / ratio,
      });
      router.back();
    } catch (e) {
      /* empty */
    }
  }, [crop, rightTop.x, leftTop.x, leftTop.y, ratio, leftBottom.y, width, height]);

  useEffect(() => {
    if (imageContainer)
      if (image?.uri)
        ImageInfo.getSize(
          image.uri,
          (srcWidth, srcHeight) => {
            const srcRatio = Math.min(
              imageContainer.width / srcWidth,
              imageContainer.height / srcHeight,
            );
            setRatio(srcRatio);
            setWidth(srcWidth * srcRatio);
            setHeight(srcHeight * srcRatio);
          },
          (error) => {
            console.log('error:', error);
          },
        );
  }, [image, imageContainer]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ flex: 1, width: '100%', alignContent: 'center', justifyContent: 'center' }}>
        <Image
          contentFit="contain"
          source={{ uri: image?.uri }}
          style={{
            flex: 1,
            width: '100%',
          }}
          onLayout={({
            nativeEvent: {
              layout: { width, height },
            },
          }) => setImageContainer({ width, height })}
        />
        <View
          style={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Drag
            initialX={INITIAL.leftTop.x}
            initialY={INITIAL.leftTop.y}
            corner="leftTop"
            setPosition={setLeftTop}
            dependency={{ x: leftBottom.x, y: rightTop.y }}
            onEnd={handleLeftTopChangeEnd}
          />
          <Drag
            initialX={INITIAL.rightTop.x}
            initialY={INITIAL.rightTop.y}
            corner="rightTop"
            setPosition={setRightTop}
            dependency={{ x: rightBottom.x, y: leftTop.y }}
            onEnd={handleRightTopChangeEnd}
          />
          <Drag
            initialX={INITIAL.rightBottom.x}
            initialY={INITIAL.rightBottom.y}
            corner="rightBottom"
            setPosition={setRightBottom}
            dependency={{ x: rightTop.x, y: leftBottom.y }}
            onEnd={handleRightBottomChange}
          />
          <Drag
            initialX={INITIAL.leftBottom.x}
            initialY={INITIAL.leftBottom.y}
            corner="leftBottom"
            setPosition={setLeftBottom}
            dependency={{ x: leftTop.x, y: rightBottom.y }}
            onEnd={handleLeftBottomChange}
          />
        </View>
      </View>
      <Toolbar>
        <TouchableOpacity onPress={handleBack}>
          <Text style={[styles.textStyle, { opacity: 0.6 }]}>取消</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOk}>
          <Text style={[styles.textStyle]}>確定</Text>
        </TouchableOpacity>
      </Toolbar>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS('white'),
  },
});
