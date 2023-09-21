// @ts-nocheck
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      "expo-router/babel",
      [
        "module-resolver",
        {
          root: ".",
          alias: {
            // This needs to be mirrored in tsconfig.json
            "@": "./",
          },
        },
      ],
    ],
  };
};
