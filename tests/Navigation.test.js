import { render, fireEvent, screen } from '@testing-library/react-native';
import Home from '../src/screens/Home';

it('Should navigate to audio page', () => {
  const { getByTestId, getByText } = render(<Home />);
  fireEvent.press(getByTestId('audioButton'));
  expect(screen.name).toBe('AudioScreen');
});

it('Should navigate to summary page', () => {
  const { getByTestId, getByText } = render(<Home />);
  fireEvent.press(getByTestId('summaryButton'));
  expect(screen.getByText('Points')).toBeOnTheScreen();
})

