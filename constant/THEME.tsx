import { Dimensions } from "react-native";
import type { AllKeys, NestedKeys } from "./types";
const { width, height } = Dimensions.get("window");

const colors = {
  // base colors
  primary: "#00996D", // Green
  secondary: "#606d87", // Gray

  // https://www.figma.com/community/file/963797805297200933
  joy: {
    orange: "#FFE3D3",
    yellow: "#FFFACA",
    green: "#EAFFFB",
    blue: "#E7F6FF",
    purple: "#EEE5FF",
    pink: "#FFE8EC",
  },

  // https://10015.io/tools/color-shades-generator
  coldblue: {
    100: "#c4d5e7",
    200: "#9fbbd9",
    300: "#7ba1ca",
    400: "#406e9f",
    500: "#31557b",
    600: "#233c56",
    700: "#142332",
    mid: "#406e9f",
  },
  mustard: {
    100: "#ffffff",
    200: "#fff4d6",
    300: "#ffe6a3",
    400: "#ffca3d",
    500: "#ffbc0a",
    600: "#d69c00",
    700: "#a37600",
    mid: "#ffca3d",
  },
  purple: {
    100: "#daceef",
    200: "#bda7e3",
    300: "#9f80d7",
    400: "#673ab7",
    500: "#512e90",
    600: "#3b216a",
    700: "#261543",
    mid: "#673ab7",
  },
  red: {
    100: "#f7d7d7",
    200: "#eeadad",
    300: "#e58383",
    400: "#d32f2f",
    500: "#ab2424",
    600: "#811b1b",
    700: "#571212",
    mid: "#d32f2f",
  },
};

export const COLORS = (routes: NestedKeys<typeof colors>) => {
  let hex: any = colors;
  for (const route of routes.split(".") as AllKeys<typeof colors>[]) {
    hex = hex[route];
    if (!hex) return undefined;
  }
  return typeof hex === "string" ? hex : hex?.mid ?? undefined;
};

export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // Font sizes
  superlargeTitle: 52,
  largeTitle: 44,
  mediumTitle: 38,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,

  // App dimensions
  width,
  height,
};

export const FONTS = {
  superlargeTitle: {
    fontFamily: "Roboto-Black",
    fontSize: SIZES.superlargeTitle,
    lineHeight: 55,
  },
  largeTitle: {
    fontFamily: "Roboto-Black",
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  mediumTitle: {
    fontFamily: "Roboto-Black",
    fontSize: SIZES.mediumTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Regular", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  image: {
    // flex: 1,
    width: 98,
    height: 98,
    borderRadius: 20,
    borderWidth: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
