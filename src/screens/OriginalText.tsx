import React, { useState, useEffect } from 'react';
import { Text, View, Button, TouchableOpacity, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import saveAudioFile from '../utils/saveAudioFile';
import AudioPlayer from '../components/AudioPlayer';
import { textToSpeech } from '../utils/textToSpeech';
import { pageSelect } from '../types';
import SummaryPage from './SummaryPage';
import HomePage from './HomePage';
import getTextTitle from '../utils/getTextTitleAndContent'

const OriginalText = ({ navigation }): JSX.Element => {
  
  const textToAudio = async () => {
    // send file text to server
    const response = await textToSpeech ("Hello, This is a hardcoded test.")
    if (response != null){
      saveAudioFile(response)
    }
    saveAudioFile(response)
  }

  // todo: get text id from text id list
  const textId = 1;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [pageSelect, setPageSelect] = useState<pageSelect>("original"); // limits the data type

  useEffect(() => {
    displayText();
  })

  const onOriginalTextButtonPress = () => {
    displayText();
    setPageSelect("original");
  }
  
  const displayText = async() => {
    //const textJson = loadParseJson(url);
    //hardcoded json file for now until can use fetch to get texts from server
    const data = await getTextTitle(textId)
    const textJson = {'title': data.name /*"Neoclassicism and Early Romanticism In Britain"*/, 'content': data.content /*"British tourists and artists in Italy were the leading supporters of early Neoclassiscism, partly because of the burgeoning taste for revival styles at home. Nonetheless, the British interest in Classical revival styles was inflected slightly differently from Roman Neoclassiscism. While Roman Neoclassiscism looked to the past in order to revive a sense of moral and civic virtue, many later eighteenth-century British artists harnessed the concept of civic virtue to patriotism to create more Romantic works of art dedicated specifically to the British. In conclusion, Neoclassicism in Britain was a significant artistic and architectural movement that celebrated the timeless beauty of classical antiquity, contributed to the Enlightenment's intellectual climate, and left an enduring mark on British culture and aesthetics. It remains an important chapter in the history of British art, architecture, and literature."*/, 'audio_file_id':"1"}
    setTitle(textJson.title);
    setContent(textJson.content);    
  }

  return (
    <SafeAreaView style={styles.safeAreacontainer}>
      <View style={styles.originalTextBackground}>
        <View style={styles.originalTextContainer}> 
          <View style={styles.topBarContainer}>
            <TouchableOpacity style={styles.topBarExitButtonContainer} onPress={() => navigation.navigate('HomePage')}>
              <Image
                style={styles.topBarExitButton}
                source={require('../assets/exit.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.topBarExitButtonContainer} onPress={() => {}}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
          {
            pageSelect == "original" ?
            (
              <ScrollView>
                <Text style={styles.titleText}>{title}</Text>
                <Text style={styles.baseText}>{content}{'\n\n'}</Text>
              </ScrollView>
            ) 
            : pageSelect == "summary" ?
            (
              <SummaryPage textId={textId} title={title} content={content}/>
            ) 
            : null // no page selected
          }
        </View>
        <View style={styles.navBarContainer}> 
          <TouchableOpacity style={styles.navBarButtonContainer} onPress={onOriginalTextButtonPress}>
            <Image
              style={styles.navBarButtonImage}
              source={require('../assets/text.png')}
            />
            <Text style={styles.navBarButtonText}>Original</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.navBarButtonContainer} 
            onPress={() => navigation.navigate('AudioScreen', {
              textId, 
              text: content,
            })}
          >
            <Image
              style={styles.navBarButtonImage}
              source={require('../assets/headphones.png')}
            />
            <Text style={styles.navBarButtonText}>Audio Only</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBarButtonContainer} onPress={() => setPageSelect("summary")}>
            <Image
              style={styles.navBarButtonImage}
              source={require('../assets/summary.png')}
            />
            <Text style={styles.navBarButtonText}>Summary</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
  saveButtonText:{
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
  navBarButtonImage:{
    width: 40,
    height: 40,
  }
});

export default OriginalText;