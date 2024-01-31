module.exports = {
  preset: 'react-native',
  verbose: true,
  // to allow image files
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    "./jest-setup.js",
  ],
  setupFiles: [
    "./tests/mocks/rnfs.js",
    "./tests/mocks/react-native-reanimated.js",
    "./tests/mocks/react-native-sound.js",
    "./node_modules/react-native-gesture-handler/jestSetup.js",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)",
  ],
};
