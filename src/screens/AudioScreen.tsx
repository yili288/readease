import React, {useState, useEffect} from 'react'
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Slider} from '@react-native-assets/slider'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const AudioScreen = ({ navigation }): JSX.Element => {
  //TODO: Dynamically load the image and text
  const playerImageURL =
    'https://s3-alpha-sig.figma.com/img/50dc/8a30/5e43c25c1cefdfb51be8639c30d04b57?Expires=1699228800&Signature=SpBEk3Xt0lHZkppm21uyJK~2V1pu2m4EBkw251xpCmkSaFIVtEYyQCRxJysuBDoTn00htErWfTzj5FPAan3wn2cdY4MsFMSJk0EdZW8GXunVjuW~icCloGP6NSHheReOL0dLKKy0bXireuXyQbF~sFrRNmdlrLVUhAS6YWCVm9372cL~XbMwihiXVRgTane8dCH~yqSiKJhEvHDZGOaNd3xpmHjpruNlkPAa3Uy26YLwpv-R9rc5OWFb27jSdlaRsmPa0msAylLtYZqME6prIcM-tEb-ckjL-404IIr~h6X-MtqZha2x~ZLssZbyKNPvYCsclqJiNQenkfYYKDY4dg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
  const playerText = 'Neoclassicism And Early Romanticism In Britain'
  const audioLength = 100

  const [sliderValue, setSliderValue] = useState(0)
  const handleSliderChange = (value: number) => {
    setSliderValue(value)
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
            minimumValue={0}
            maximumValue={audioLength}
            minimumTrackTintColor="white"
            thumbTintColor="white"
            value={sliderValue}
            onValueChange={handleSliderChange}
          />
          <Text style={styles.textStyle}>
            {((sliderValue / audioLength) * 100).toFixed(0)}%
          </Text>
          <View style={styles.audioControllerContainer}>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require('../assets/backtrack.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (sliderValue >= 5) {
                  setSliderValue(sliderValue - 5)
                } else {
                  setSliderValue(0)
                }
              }}>
              <Image
                source={require('../assets/gobackward.png')}
                style={styles.buttonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={require('../assets/play.jpg')}
                style={styles.playerButtonStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (sliderValue + 5 <= audioLength) {
                  setSliderValue(sliderValue + 5)
                }
              }}>
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
