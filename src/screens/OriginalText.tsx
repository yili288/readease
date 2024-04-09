import React, {useState, useEffect} from 'react'
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native'
import saveAudioFile from '../utils/saveAudioFile'
import {textToSpeech} from '../utils/textToSpeech'
import {pageSelect} from '../types'
import SummaryPage from './SummaryPage'
import HomePage from './HomePage'
import getTextTitleAndContent from '../utils/getTextTitleAndContent'
import RNFS from 'react-native-fs'
import Sound from 'react-native-sound'


const OriginalText = ({ route, navigation }): JSX.Element => {
  const { text } = route.params;

  const { textId } = route.params;
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pageSelect, setPageSelect] = useState<pageSelect>('original') // limits the data type
  const [audio, setAudio] = useState(null) // Initialize audio as null
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1) // Tracks current sentence
  const [timeStamps, setTimeStamps] = useState([]) // Array of time stamps for each sentence
  const [isPlaying, setIsPlaying] = useState(false) //initialised to false
  const sentences = content.split('. ')

  useEffect(() => {
    displayText()
  }, [])

  useEffect(() => {
    if (audio) {
      startHighlightCheck()
    }
  }, [audio])

  const onOriginalTextButtonPress = () => {
    displayText()
    setPageSelect('original')
  }

  const playInScreenAudio = async () => {
    if (audio == null) {
      //audio is not loaded
      const response = await textToSpeech(textId, content)
      if (response != null) {
        saveAudioFile(textId, response)
        loadAudio(textId)
        if (response.timepoints != null) {
          const timepoints = response.timepoints
          const timeStamps = timepoints.map(timepoint => timepoint.timeSeconds)
          setTimeStamps(timeStamps)
        }
      }
    }
    else{
      handlePlayPause() //audio already loaded just handle play/pause
    }
  }

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause()
    } else {
      audio.setVolume(10)
      audio.play(success => {
        setIsPlaying(false)
      })
    }
    setIsPlaying(!isPlaying)
  }

  const loadAudio = textId => {
    let audio = new Sound(
      `${textId}.wav`,
      RNFS.DocumentDirectoryPath,
      error => {
        if (error) {
          console.error('failed to load the sound', error.message)
          return
        }
        // loaded successfully
        audio.setVolume(10)
        setAudio(audio)
        audio.play(success => {
          if (!success) {
            console.error('Audio playback failed')
          } else {
            setIsPlaying(false)
          }
        })
        setIsPlaying(!isPlaying)
      }
    )
  }

  const startHighlightCheck = () => {
    let lastCurrIndex = -1
    let intervalId = null

    const checkAndUpdateHighlight = () => {
      if (!audio || !timeStamps || timeStamps.length === 0) {
        clearInterval(intervalId) //exit loop
        return
      }

      audio.getCurrentTime((currentTime, isPlaying) => {
        const currentTimeMs = currentTime * 1000
        let currIndex = timeStamps.findIndex(
          (timeStamp, index) =>
            currentTimeMs >= timeStamp * 1000 &&
            (index === timeStamps.length - 1 ||
              currentTimeMs < timeStamps[index + 1] * 1000)
        ) //last sentence or sentence before next timestamp

        if (currIndex === -1 && timeStamps.length > 0) {
          //no matching timestamp
          if (currentTimeMs >= timeStamps[timeStamps.length - 1] * 1000) {
            currIndex = timeStamps.length - 1 // we are in the last sentence
          } else {
            currIndex = 0
          }
        }

        if (currIndex !== -1 && currIndex !== lastCurrIndex) {
          console.log(`Highlighting sentence: "${sentences[currIndex]}"`)
          lastCurrIndex = currIndex
        }

        setCurrentSentenceIndex(currIndex) //update current sentence index

        if (currIndex === timeStamps.length - 1) {
          //at last sentence, exit loop
          clearInterval(intervalId)
        }
      })
    }

    console.log('Starting highlight check')
    const interval = 500 // Check every 500 milliseconds
    intervalId = setInterval(checkAndUpdateHighlight, interval)
  }

  const displayText = async() => {
    if (text) {
      setTitle(text.name);
      setContent(text.content);
    } else {
      const data = await getTextTitleAndContent(textId)
      const textJson = {
        'title': data.name,
        'content': data.content,
        'audio_file_id':"1"
      }
      setTitle(textJson.title);
      setContent(textJson.content);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreacontainer}>
      <View style={styles.originalTextBackground}>
        <View style={styles.originalTextContainer}>
          <View style={styles.topBarContainer}>
            <TouchableOpacity
              style={styles.topBarExitButtonContainer}
              onPress={() => navigation.navigate('HomePage')}>
              <Image
                style={styles.topBarExitButton}
                source={require('../assets/exit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.topBarExitButtonContainer}
              onPress={() => {}}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          {
            pageSelect == 'original' ? (
              <ScrollView>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.baseText}>
                  {sentences.map((sentence, index) => (
                    <Text
                      key={index}
                      style={
                        currentSentenceIndex === index
                          ? styles.highlightedText
                          : {}
                      }>
                      {sentence.trim()}
                      {index < sentences.length - 1 ? '. ' : ''}
                    </Text>
                  ))}
                </Text>
              </ScrollView>
            ) : pageSelect == 'summary' ? (
              <SummaryPage textId={textId} title={title} content={content} />
            ) : null // no page selected
          }
        </View>
        <View style={styles.navBarContainer}>
          <TouchableOpacity
            style={styles.navBarButtonContainer}
            onPress={onOriginalTextButtonPress}>
            <Image
              style={styles.navBarButtonImage}
              source={require('../assets/text.png')}
            />
            <Text style={styles.navBarButtonText}>Original</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navBarButtonContainer}
            onPress={playInScreenAudio}>
            <Image
              style={styles.playButtonImage}
              source={!isPlaying ?  require('../assets/play-but.png') : require('../assets/pause-but.png')}
            />
            <Text style={styles.navBarButtonText}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="audioButton"
            style={styles.navBarButtonContainer}
            onPress={() =>
              navigation.navigate('AudioScreen', {
                textId,
                text: content,
              })
            }>
            <Image
              style={styles.navBarButtonImage}
              source={require('../assets/headphones.png')}
            />
            <Text style={styles.navBarButtonText}>Audio Only</Text>
          </TouchableOpacity>

          <TouchableOpacity
            testID="summaryButton"
            style={styles.navBarButtonContainer}
            onPress={() => setPageSelect('summary')}>
            <Image
              style={styles.navBarButtonImage}
              source={require('../assets/summary.png')}
            />
            <Text style={styles.navBarButtonText}>Summary</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

var styles = StyleSheet.create({
  safeAreacontainer: {
    flex: 1,
  },
  originalTextBackground: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  originalTextContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  topBarContainer: {
    position: 'relative',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  topBarExitButtonContainer: {
    marginTop: 10,
  },
  topBarExitButton: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  saveButtonText: {
    color: 'black',
    fontFamily: 'Lexend Black',
    fontSize: 20,
  },
  titleText: {
    fontSize: 30,
    textAlign: 'left',
    color: 'black',
    paddingVertical: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Bold',
  },
  baseText: {
    fontSize: 20,
    color: 'black',
    paddingVertical: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Black',
  },
  highlightedText: {
    backgroundColor: 'yellow', 
    color: 'black',
    fontSize: 20,
    paddingVertical: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Black',
  },
  navBarContainer: {
    position: 'absolute',
    bottom: 30,
    borderRadius: 10,
    opacity: 0.7,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    alignSelf: 'center',
  },
  navBarButtonContainer: {
    flex: 1,
    opacity: 1,
    alignItems: 'center',
  },
  navBarButtonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Lexend Bold',
    fontSize: 10,
  },
  navBarButtonImage: {
    width: 40,
    height: 40,
  },
  playButtonImage: {
    width: 30,
    height: 28,
    marginBottom: 5,
    marginTop: 3,
  },
})

export default OriginalText
