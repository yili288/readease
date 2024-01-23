import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import Navigator from '../src/navigation/Navigator';
import { NavigationContainer } from "@react-navigation/native";

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('../src/utils/getTextSummary', () => {
  return jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve("test summary");
    })
  })
});

// to mock setInterval used in AudioScreen
jest.useFakeTimers();

it('Should navigate to audio page', () => {
  const { getByTestId } = render(
    <NavigationContainer>
      <Navigator></Navigator>
    </NavigationContainer>
  );
  fireEvent.press(getByTestId('audioButton'));
  expect(screen.getByText('Audio Only')).toBeOnTheScreen();
});

it('Should navigate to summary page', async () => {
  const { getByTestId } = render(
    <NavigationContainer>
      <Navigator></Navigator>
    </NavigationContainer>
  );
  fireEvent.press(getByTestId('summaryButton'));

  await waitFor(() => screen.getAllByText('Points'));

  expect(screen.getAllByText('Points')).toHaveLength(2);
})
