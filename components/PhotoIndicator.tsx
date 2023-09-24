import { useEffect } from 'react';
import { Dimensions, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import LgsDraggablePin from './DraggablePin';

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

interface PhotoIndicatorProps {
  initialX: number;
  initialY: number;
  source: string;
  width: number;
  height: number;
  setWidth: (value?: string | number | boolean | never[] | Date | undefined) => void;
  setHeight: (value?: string | number | boolean | never[] | Date | undefined) => void;
  setIndicator: (x: number, y: number) => void;
}

export default function PhotoIndicator({
  initialX,
  initialY,
  source,
  width,
  height,
  setWidth,
  setHeight,
  setIndicator,
}: PhotoIndicatorProps) {
  const drag = () => {
    // console.log("dragging", x, y);
    // setIndicator(x, y);
  };
  const drop = (x: number, y: number) => {
    setIndicator(x, y);
  };

  useEffect(() => {
    Image.getSize(
      source,
      (srcWidth, srcHeight) => {
        const maxHeight = Dimensions.get('window').height * 0.7; // or something else
        const maxWidth = Dimensions.get('window').width * 0.7;

        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        setWidth(srcWidth * ratio);
        setHeight(srcHeight * ratio);
      },
      (error) => {
        console.log('error:', error);
      },
    );
  }, [source]);

  return (
    <GestureHandlerRootView
      style={{
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderRadius: 30,
      }}
    >
      <Image
        resizeMode="cover"
        source={{ uri: source }}
        style={{
          width: width,
          height: height,
        }}
      />
      {source ? (
        <LgsDraggablePin
          X={initialX}
          Y={initialY}
          onDrag={drag}
          onDrop={drop}
          imageWidth={width}
          imageHeight={height}
        >
          <Image source={require('@/assets/indicator.png')} style={{ width: 30, height: 30 }} />
        </LgsDraggablePin>
      ) : null}
    </GestureHandlerRootView>
  );
}
