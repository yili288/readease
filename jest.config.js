module.exports = {
  preset: 'react-native',
  // to allow image files
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  setupFiles: [
    "./tests/mocks/rnfs.js",
  ],
};
