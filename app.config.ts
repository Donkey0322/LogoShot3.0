import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "my-app",
  slug: "my-app",
  scheme: "my-app",
  web: {
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId: "c2c2c0d1-5a7b-4593-b94a-89ef77847f5f",
    },
    REACT_APP_SERVER_DOMAIN: "140.112.106.82",
    REACT_APP_SERVER_PORT: "8000",
    REACT_APP_SERVER_USE_HTTPS: "false",
    REACT_APP_IMAGE_DOMAIN: "140.112.106.88",
    REACT_APP_IMAGE_PORT: "8082",
  },
};

export default config;
