import React, { useEffect, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Slider } from 'react-native-awesome-slider';
import RNFS from 'react-native-fs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue } from 'react-native-reanimated';
import Sound from 'react-native-sound';
import { StyleSheet } from 'react-native'
import saveAudioFile from '../utils/saveAudioFile';
import { textToSpeech } from '../utils/textToSpeech';

Sound.setCategory('Playback');

const AudioScreen = ({ route, navigation }): JSX.Element => {
  const { textId, text } = route.params;

  //TODO: Dynamically load the image and text
  const playerImageURL =
    'https://cdn.discordapp.com/attachments/837783679810928671/1177453309150384198/image.png?ex=65728fd8&is=65601ad8&hm=fe9299e0e4c886bc973d482ab7a766ccab7eb4d98db319cb992e82b10b22a25a&'
  const playerText = 'Neoclassicism And Early Romanticism In Britain'

  const [audio, setAudio] = useState(new Sound("")); //initialised to the sound object
  const [isPlaying, setIsPlaying] = useState(false);  //initialised to false
  const [percentComplete, setPercentComplete] = useState(0);
  const progress = useSharedValue(0)
  const intervalRef = useRef(setInterval(()=>{}));

  const [audioLength, setAudioLength] = useState(0);
  const offset = 5; //seconds
  
  // todo: Seek to a specific point in the audio
  // const handleSliderChange = (value: number) => {
    // progress.value = value
    // audio.setCurrentTime(progress.value)
  // }

  useEffect(() => {
    const convertAndSaveFile = async (textId, text) => {
      // send text to server
      const response = await textToSpeech(textId, text)
      if (response != null){
        saveAudioFile(textId, response)
        loadAudio(textId);
      }
    }
    convertAndSaveFile(textId, text);
  }, [text, textId])

  const loadAudio = (textId) => {
    let audio = new Sound(`${textId}.wav`, RNFS.DocumentDirectoryPath, (error) => {
      if (error) {
        console.error('failed to load the sound', error.message);
        return;
      }
      // loaded successfully
      setAudio(audio);
      setAudioLength(audio.getDuration());
    })
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
        progress.value = timeToPercent(seconds);
        setPercentComplete(timeToPercent(seconds));
      });
    }, 1000);
    intervalRef.current = intervalId;
  }

  const stopTrackingCurrentAudioTime = () => {
    clearInterval(intervalRef.current);
  }

  const timeToPercent = (time: number) => {
    return (time / audioLength) * 100;
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
      if (seconds - offset < 0)
        newTime = 0;
      else
        newTime = seconds - offset;
      audio.setCurrentTime(newTime)
      progress.value = timeToPercent(newTime);
      setPercentComplete(timeToPercent(newTime));
    })
  }

  const goForward = () => {
    audio.getCurrentTime((seconds) => {
      let newTime = 0;
      if (seconds + offset > audio.getDuration())
        newTime = audio.getDuration();
      else
        newTime = seconds + offset;
      audio.setCurrentTime(newTime);
      progress.value = timeToPercent(newTime);
      setPercentComplete(timeToPercent(newTime));
    })
  }
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{width: 0, height: 0}}>
        <Text>Audio only</Text>
      </View>
      <View style={styles.background}>
        <View style={styles.navContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('OriginalText', {})}>
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
            maximumValue={useSharedValue(100)}
            theme={{
              minimumTrackTintColor: '#fff',
              bubbleBackgroundColor: '#666',
              maximumTrackTintColor: '#1B3340',
            }}
            // onValueChange={handleSliderChange}
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
              onPress={goBack}
              accessible
              accessibilityLabel={"goBack"}>
              <Image
                source={require('../assets/gobackward.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={handlePlayPause}
              accessible
              accessibilityLabel={"playButton"}>
              <Image
                source={require('../assets/play.jpg')}
                style={styles.playerButtonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goForward}
              accessible
              accessibilityLabel={"goForward"}>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#121A2E',
  },
  navContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingLeft: 20,
  },
  audioDetailContainer: {
    marginTop: 110,
    alignItems: 'center',
  },
  audioPlayerContainer: {
    flex: 1,
    marginTop: 20,
  },
  audioControllerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preferencesContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    width: 25,
    height: 25,
  },
  playerButtonStyle: {
    width: 70,
    height: 70,
  },
  audioTitleStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Manrope',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 30,
    marginTop: 20,
    paddingHorizontal: 50,
  },
  playerImageStyle: {
    width: 200,
    height: 200,
  },
  sliderStyle: {
    width: 300,
    height: 40,
  },
  textStyle: {
    color: '#FFF',
    fontFamily: 'Manrope',
    fontWeight: 'bold',
  },
  subTextStyle: {
    color: '#FFF',
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 9,
    paddingTop: 5,
  },
})
export default AudioScreen
