import { Dimensions } from 'react-native';

import type { AllKeys, NestedKeys } from '@/utils/types/constant';

import { Color } from '@/utils/types';

const { width, height } = Dimensions.get('window');

const colors = {
  // base colors
  primary: '#00996D', // Green
  secondary: '#606d87', // Gray
  facebook: '#4267B2',
  google: '#DB4437',

  // https://www.figma.com/community/file/963797805297200933
  joy: {
    orange: '#FFE3D3',
    yellow: '#FFFACA',
    green: '#EAFFFB',
    blue: '#E7F6FF',
    purple: '#EEE5FF',
    pink: '#FFE8EC',
  },

  // https://10015.io/tools/color-shades-generator
  coldblue: {
    100: '#c4d5e7',
    200: '#9fbbd9',
    300: '#7ba1ca',
    400: '#406e9f',
    500: '#31557b',
    600: '#233c56',
    700: '#142332',
  },
  mustard: {
    100: '#ffffff',
    200: '#fff4d6',
    300: '#ffe6a3',
    400: '#ffca3d',
    500: '#ffbc0a',
    600: '#d69c00',
    700: '#a37600',
  },
  purple: {
    100: '#daceef',
    200: '#bda7e3',
    300: '#9f80d7',
    400: '#673ab7',
    500: '#512e90',
    600: '#3b216a',
    700: '#261543',
  },
  red: {
    100: '#f7d7d7',
    200: '#eeadad',
    300: '#e58383',
    400: '#d32f2f',
    500: '#ab2424',
    600: '#811b1b',
    700: '#571212',
  },
  gray: {
    100: '#e6e6e6',
    200: '#cdcdcd',
    300: '#b3b3b3',
    400: '#808080',
    500: '#676767',
    600: '#4d4d4d',
    700: '#343434',
  },
  blue: {
    100: '#e2eeff',
    200: '#afd0ff',
    300: '#7cb3ff',
    400: '#1677ff',
    500: '#005ee2',
    600: '#0049af',
    700: '#00347c',
  },
  white: '#ffffff',
  black: '#000000',
  yellow: {
    100: '#ffffff',
    200: '#fff4d6',
    300: '#ffe6a3',
    400: '#ffca3d',
    500: '#ffbc0a',
    600: '#d69c00',
    700: '#a37600',
  },
  icons: {
    star: '#f7dd72',
  },
};

export const COLORS = (routes: NestedKeys<typeof colors>): Color => {
  const hex = (routes.split('.') as AllKeys<typeof colors>[]).reduce((acc, curr) => {
    if (!acc[curr]) {
      throw Error(`Cannot read "${curr}". Options: ${Object.keys(acc)}`);
    }
    return !acc ? undefined : acc[curr];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, colors as any);
  return typeof hex === 'string' ? hex : hex?.[400] ?? undefined;
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
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.superlargeTitle,
    lineHeight: 55,
  },
  largeTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.largeTitle,
    lineHeight: 55,
  },
  mediumTitle: {
    fontFamily: 'Roboto-Black',
    fontSize: SIZES.mediumTitle,
    lineHeight: 55,
  },
  h1: { fontFamily: 'Roboto-Black', fontSize: SIZES.h1 },
  h2: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: 'Roboto-Bold', fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: 'Roboto-Regular', fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Roboto-Regular',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  image: {
    // flex: 1,
    width: 98,
    height: 98,
    borderRadius: 20,
    borderWidth: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
