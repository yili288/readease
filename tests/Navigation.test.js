import { render, fireEvent, screen } from '@testing-library/react-native';
import Home from '../src/screens/Home';
import Navigator from '../src/navigation/Navigator';

it('Should navigate to audio page', () => {
  render(<Navigator initialRouteName="Home" />);
  const { getByTestId } = render(<AudioScreen />);
  fireEvent.press(getByTestId('audioButton'));
  expect(screen.name).toBe('AudioScreen');
});

it('Should navigate to summary page', () => {
  render(<Navigator initialRouteName="Home" />);
  const { getByTestId } = render(<Home />);
  fireEvent.press(getByTestId('summaryButton'));
  expect(screen.getByText('Points')).toBeOnTheScreen();
})
