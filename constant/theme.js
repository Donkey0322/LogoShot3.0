import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const COLORS = {
  // base colors
  primary: "#00996D", // Green
  secondary: "#606d87", // Gray

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  lightGray: "#eff2f5",
  gray: "#BEC1D2",

  // https://www.figma.com/community/file/963797805297200933
  orange: "#FFE3D3",
  yellow: "#FFFACA",
  green: "#EAFFFB",
  blue: "#E7F6FF",
  purple: "#EEE5FF",
  pink: "#FFE8EC",
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
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 50 },
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
