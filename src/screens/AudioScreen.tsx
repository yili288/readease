import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import RNFS from 'react-native-fs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import styles from '../styles/audioScreen';

Sound.setCategory('Playback');

// fetch audio file
var audio = new Sound('hello.wav', RNFS.DocumentDirectoryPath, (error) => {
  if (error) {
    console.log('failed to load the sound', error.message);
    return;
  }
  // loaded successfully
});

const AudioScreen = ({ navigation }): JSX.Element => {
  //TODO: Dynamically load the image and text
  const playerImageURL =
    'https://s3-alpha-sig.figma.com/img/50dc/8a30/5e43c25c1cefdfb51be8639c30d04b57?Expires=1699228800&Signature=SpBEk3Xt0lHZkppm21uyJK~2V1pu2m4EBkw251xpCmkSaFIVtEYyQCRxJysuBDoTn00htErWfTzj5FPAan3wn2cdY4MsFMSJk0EdZW8GXunVjuW~icCloGP6NSHheReOL0dLKKy0bXireuXyQbF~sFrRNmdlrLVUhAS6YWCVm9372cL~XbMwihiXVRgTane8dCH~yqSiKJhEvHDZGOaNd3xpmHjpruNlkPAa3Uy26YLwpv-R9rc5OWFb27jSdlaRsmPa0msAylLtYZqME6prIcM-tEb-ckjL-404IIr~h6X-MtqZha2x~ZLssZbyKNPvYCsclqJiNQenkfYYKDY4dg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
  const playerText = 'Neoclassicism And Early Romanticism In Britain'
  
  const [isPlaying, setIsPlaying] = useState(false);  //initialised to false
  const [percentComplete, setPercentComplete] = useState(0);
  const progress = useSharedValue(0)
  const intervalRef = useRef(setInterval(()=>{}));
  const audioLength = audio.getDuration()

  const handleSliderChange = (value: number) => {
    progress.value = value
    audio.setCurrentTime(progress.value)
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
      stopTrackingCurrentAudioTime();
    }else{
      audio.setVolume(10);
      audio.play(success => {
        stopTrackingCurrentAudioTime()
        setIsPlaying(false)
      });
      trackCurrentAudioTime()
    }
    setIsPlaying(!isPlaying);
  }

  const trackCurrentAudioTime = () => {
    const intervalId = setInterval(() => {
      audio.getCurrentTime((seconds) => {
        progress.value = seconds;
        setPercentComplete((seconds / audioLength) * 100);
      });
    }, 10);
    intervalRef.current = intervalId;
  }

  const stopTrackingCurrentAudioTime = () => {
    clearInterval(intervalRef.current);
  }
  
  const playbackSpeeds = [0.5, 1, 1.5, 2]
  const maxSpeedIndex = playbackSpeeds.length - 1
  const [playbackSpeed, setPlaybackSpeed] = useState(playbackSpeeds[1]) //default it to 1x speed
  const [speedIndex, setSpeedIndex] = useState(1)

  const changePlaybackSpeed = () => {
    const nextSpeedIndex = speedIndex === maxSpeedIndex ? 0 : speedIndex + 1 //at 2, we go back to 0
    setSpeedIndex(nextSpeedIndex)
    setPlaybackSpeed(playbackSpeeds[nextSpeedIndex])
  }

  const goBack = () => {
    audio.getCurrentTime((seconds) => {
      let newTime = 0;
      if (seconds - 2 < 0)
        newTime = 0;
      else
        newTime = seconds - 2;
      audio.setCurrentTime(newTime)
      progress.value = newTime
      setPercentComplete((newTime / audioLength) * 100);
    })
  }

  const goForward = () => {
    audio.getCurrentTime((seconds) => {
      let newTime = 0;
      if (seconds + 2 > audioLength)
        newTime = audioLength;
      else
        newTime = seconds + 2;
      audio.setCurrentTime(newTime)
      progress.value = newTime
      setPercentComplete((newTime / audioLength) * 100);
    })
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.background}>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image
              source={require('../assets/backArrow.png')}
              style={styles.buttonStyle}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.audioDetailContainer}>
          <Image source={{uri: playerImageURL}} style={styles.playerImageStyle} />
          <Text style={styles.audioTitleStyle}>{playerText}</Text>
        </View>
        <View style={styles.audioPlayerContainer}>
          <Slider
            style={styles.sliderStyle}
            progress={progress}
            minimumValue={useSharedValue(0)}
            maximumValue={useSharedValue(audioLength)}
            theme={{
              minimumTrackTintColor: '#fff',
              bubbleBackgroundColor: '#666',
              maximumTrackTintColor: '#1B3340',
            }}
            onValueChange={handleSliderChange}
          />
          <Text style={styles.textStyle}>
            {percentComplete.toFixed(0)}%
          </Text>
          <View style={styles.audioControllerContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require('../assets/backtrack.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goBack}>
              <Image
                source={require('../assets/gobackward.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlePlayPause}>
              <Image
                source={require('../assets/play.jpg')}
                style={styles.playerButtonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goForward}>
              <Image
                source={require('../assets/goforward.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require('../assets/fasttrack.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.preferencesContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require('../assets/person.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={changePlaybackSpeed}>
              <Text style={styles.textStyle}>{playbackSpeed}X</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          source={require('../assets/headphones.png')}
          style={[styles.buttonStyle, {marginTop: 20}]}
        />
        <Text style={styles.subTextStyle}>Audio Only</Text>
      </View>
    </GestureHandlerRootView>
  )
}

export default AudioScreen
