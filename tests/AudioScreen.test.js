import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AudioScreen from "../src/screens/AudioScreen";
import Sound from 'react-native-sound';

jest.useFakeTimers();

const AudioScreenMock = (
  <AudioScreen
    route={{
      params: {
        textId: 1,
        text: "",
      },
    }}
    navigation={{
      navigate: jest.fn(),
    }}
  />
)

it('Should play and pause audio', async () => {
  const { getByLabelText } = render(AudioScreenMock);
  fireEvent.press(getByLabelText('playButton'));

  // Wait for the audio to play
  await waitFor(() => expect(Sound.prototype.play).toHaveBeenCalled());

  fireEvent.press(getByLabelText('playButton'));

  // Wait for the audio to pause
  await waitFor(() => expect(Sound.prototype.pause).toHaveBeenCalled());
});

it('Should skip forward audio', async () => {
  const { getByLabelText } = render(AudioScreenMock);
  fireEvent.press(getByLabelText('goForward'));

  // Wait for the audio to skip forward
  await waitFor(() => {
    expect(Sound.prototype.getCurrentTime).toHaveBeenCalled()
    expect(Sound.prototype.setCurrentTime).toHaveBeenCalled()
  });
});

it('Should move back audio', async () => {
  const { getByLabelText } = render(AudioScreenMock);
  fireEvent.press(getByLabelText('goBack'));

  // Wait for the audio to skip forward
  await waitFor(() => {
    expect(Sound.prototype.getCurrentTime).toHaveBeenCalled()
    expect(Sound.prototype.setCurrentTime).toHaveBeenCalled()
  });
});