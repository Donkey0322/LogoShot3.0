import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Logo Shot',
  slug: 'logoShot',
  scheme: 'logoShot',
  web: {
    bundler: 'metro',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'meow.logoshot',
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        '$(PRODUCT_NAME)在商標搜尋中提供了以圖搜圖的功能，若希望使用此功能，請打開相簿權限',
      NSCameraUsageDescription:
        '$(PRODUCT_NAME)在商標搜尋中提供了以圖搜圖的功能，若希望能在使用此功能時運用相機拍攝，請打開相機權限',
      NSMicrophoneUsageDescription: 'Allow $(PRODUCT_NAME) to access your microphone',
      SKAdNetworkItems: [
        {
          SKAdNetworkIdentifier: 'v9wttpbfk9.skadnetwork',
        },
        {
          SKAdNetworkIdentifier: 'n38lu8286q.skadnetwork',
        },
      ],
    },
    usesAppleSignIn: true,
  },
  extra: {
    eas: {
      projectId: 'c2c2c0d1-5a7b-4593-b94a-89ef77847f5f',
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
        photosPermission: 'The app accesses your photos to let you share them with your friends.',
        cameraPermission: 'The app accesses your photos to let you share them with your friends.',
      },
    ],
    [
      'react-native-fbsdk-next',
      {
        appID: '1256648868295950',
        clientToken: '03d70c08606f570fb17e4454d0eb6aff',
        displayName: 'LogoShot',
        scheme: 'fb1256648868295950',
      },
    ],
    'expo-apple-authentication',
  ],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
