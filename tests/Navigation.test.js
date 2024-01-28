import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import Navigator from '../src/navigation/Navigator';
import { NavigationContainer } from "@react-navigation/native";
import axios from 'axios';
jest.mock('axios');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      ok: true,
      json: () => {
        return { summary: "test summary" }
      }
    }),
  })
);

jest.mock('../src/utils/getTextTitleAndContent', () => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve({"name": "test name", "content": "test content"});
    })
  })
});

jest.mock('../src/utils/getTextSummary', () => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve("test summary");
    })
  })
});

// to mock setInterval used in AudioScreen
jest.useFakeTimers();

it('Should navigate to audio page', async () => {
  // setup
  const resp = { data: "" };
  axios.get.mockResolvedValue(resp);
  const { getByTestId } = render(
    <NavigationContainer>
        <Navigator></Navigator>
    </NavigationContainer>
  );
  fireEvent.press(getByTestId('originalText'));

  // act
  const audioButton = getByTestId('audioButton')
  expect(audioButton).toBeOnTheScreen();
  fireEvent.press(audioButton);

  //assert
  expect(screen.getByLabelText('playButton')).toBeOnTheScreen();
});

it('Should navigate to summary page', async () => {
  // setup
  const { getByTestId } = render(
    <NavigationContainer>
      <Navigator></Navigator>
    </NavigationContainer>
  );
  fireEvent.press(getByTestId('originalText'));

  // act
  fireEvent.press(getByTestId('summaryButton'));

  // assert
  await waitFor(() => screen.getAllByText('Points'));
  expect(screen.getAllByText('Points')).toHaveLength(2);
})
