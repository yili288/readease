import Sound from 'react-native-sound';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import RNFS from 'react-native-fs';

var styles = StyleSheet.create({
  button: {
    color: 'blue',
  },
})
Sound.setCategory('Playback');

var audio = new Sound('hello.wav', RNFS.DocumentDirectoryPath, (error) => {
  if (error) {
    console.log('failed to load the sound', error.message);
    return;
  }
  // loaded successfully
});

export const AudioPlayer = () => {
  const [play, setPlay] = useState(false);
  
  useEffect(() => {
    audio.setVolume(10);
  })
  return (
    <Button
      title={
        (play) ? 'Pause' : 'Play'
      }
      onPress={() => {
        (play) ? audio.stop() : audio.play();
        setPlay(!play);
      }}
      style={styles.button}
    />
  );
};

export default AudioPlayer;
