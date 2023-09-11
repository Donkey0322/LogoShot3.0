import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export default function useWidthOnResize() {
  const [width, setWidth] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      "change",
      ({ window: { width } }) => {
        setWidth(width);
      }
    );
    return () => subscription?.remove();
  });

  return { width };
}
