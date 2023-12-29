import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Logoshot',
  slug: 'my-app',
  version: '3.0.0',
  scheme: 'logoShot',
  orientation: 'portrait',
  icon: './assets/Logoshot.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  web: {
    favicon: './assets/favicon.png',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.b09705015.myapp',
    usesAppleSignIn: true,
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        '$(PRODUCT_NAME)在商標搜尋中提供了以圖搜圖的功能，若希望使用此功能，請打開相簿權限',
      NSCameraUsageDescription:
        '$(PRODUCT_NAME)在商標搜尋中提供了以圖搜圖的功能，若希望能在使用此功能時運用相機拍攝，請打開相機權限',
    },
  },
  extra: {
    eas: {
      projectId: '8d872e1d-a60a-443b-8d37-e486cb68ec96',
    },
    REACT_APP_SERVER_DOMAIN: '140.112.106.82',
    REACT_APP_SERVER_PORT: '8002',
    REACT_APP_SERVER_USE_HTTPS: 'false',
    REACT_APP_IMAGE_DOMAIN: '140.112.106.82',
    REACT_APP_IMAGE_PORT: '8082',
  },
  plugins: [
    'expo-router',
    [
      'expo-image-picker',
      {
        photosPermission:
          'Access to the photos allows you to pick photos for searching trademarks.',
        cameraPermission:
          'Access to the camera allows you to take photos for searching trademarks.',
      },
    ],
    'expo-apple-authentication',
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
