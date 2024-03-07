global.RNDocumentPicker = jest.mock('react-native-reanimated', () => {
  return {
    pick: jest.fn(() => {
      return {
        uri: 'testUri',
        type: 'testType',
        name: 'testName',
      };
    }),
    types: {
      allFiles: 'allFiles',
    },
    isCancel: jest.fn(),
  };
});
