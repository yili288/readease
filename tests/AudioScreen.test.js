import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AudioScreen from "../src/screens/AudioScreen";
import Sound from 'react-native-sound';

jest.useFakeTimers();

it('Should play and pause audio', async () => {
  const { getByLabelText } = render(<AudioScreen></AudioScreen>);
  fireEvent.press(getByLabelText('playButton'));

  // Wait for the audio to play
  await waitFor(() => expect(Sound.prototype.play).toHaveBeenCalled());

  fireEvent.press(getByLabelText('playButton'));

  // Wait for the audio to pause
  await waitFor(() => expect(Sound.prototype.pause).toHaveBeenCalled());
});

it('Should skip forward audio', async () => {
  const { getByLabelText } = render(<AudioScreen></AudioScreen>);
  fireEvent.press(getByLabelText('goForward'));

  // Wait for the audio to skip forward
  await waitFor(() => {
    expect(Sound.prototype.getCurrentTime).toHaveBeenCalled()
    expect(Sound.prototype.setCurrentTime).toHaveBeenCalled()
  });
});

it('Should move back audio', async () => {
  const { getByLabelText } = render(<AudioScreen></AudioScreen>);
  fireEvent.press(getByLabelText('goBack'));

  // Wait for the audio to skip forward
  await waitFor(() => {
    expect(Sound.prototype.getCurrentTime).toHaveBeenCalled()
    expect(Sound.prototype.setCurrentTime).toHaveBeenCalled()
  });
});