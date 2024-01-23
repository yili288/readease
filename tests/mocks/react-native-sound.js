global.RNsound = jest.mock('react-native-sound', () => {
  class SoundMock {
    constructor(path, type, callback) { }
  }

  SoundMock.prototype.setVolume = jest.fn();
  SoundMock.prototype.setNumberOfLoops = jest.fn();
  SoundMock.prototype.play = jest.fn();
  SoundMock.prototype.pause = jest.fn();
  SoundMock.prototype.getDuration = jest.fn();
  SoundMock.prototype.getCurrentTime = jest.fn((cb) => {
    cb(10, true); // Assuming the audio is playing (true)
  });
  SoundMock.prototype.setCurrentTime = jest.fn();
  SoundMock.setCategory = jest.fn();

  return SoundMock;
});