import { useEffect } from "react";
import { Dimensions, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LgsDraggablePin from "./lgsDraggablePin";

// const windowWidth = Dimensions.get("window").width;
// const windowHeight = Dimensions.get("window").height;

const LgsPhotoIndicator = ({
  initialX,
  initialY,
  style,
  source,
  width,
  height,
  setWidth,
  setHeight,
  setIndicator,
}) => {
  const drag = (x, y) => {
    // console.log("dragging", x, y);
    // setIndicator(x, y);
  };
  const drop = (x, y) => {
    setIndicator(x, y);
  };

  useEffect(() => {
    Image.getSize(
      source,
      (srcWidth, srcHeight) => {
        const maxHeight = Dimensions.get("window").height * 0.7; // or something else
        const maxWidth = Dimensions.get("window").width * 0.7;

        const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
        setWidth(srcWidth * ratio);
        setHeight(srcHeight * ratio);
      },
      (error) => {
        console.log("error:", error);
      }
    );
  }, [source]);

  return (
    <GestureHandlerRootView
      style={{
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        ...style,
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
          <Image
            source={require("../assets/indicator.png")}
            style={{ width: 30, height: 30 }}
          />
        </LgsDraggablePin>
      ) : null}
    </GestureHandlerRootView>
  );
};

export default LgsPhotoIndicator;
