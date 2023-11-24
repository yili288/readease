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

// fetch audio file
// var audio = new Sound('hello.wav', RNFS.DocumentDirectoryPath, (error) => {
//   if (error) {
//     console.log('failed to load the sound', error.message);
//     return;
//   }
//   // loaded successfully
// });

export const AudioPlayer = () => {
  // local variable within this component
  const [play, setPlay] = useState(false);  //initialised to false
  
  // Anything written inside useEffect will only run once
  // at the initial rendering stage
  useEffect(() => {
    audio.setVolume(10);
  })

  return (
    <Button
      title={
        // ternary operator
        // condition ? if true : if false
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
