import React, { useState} from 'react';
import { Text, View, Button, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import saveAudioFile from '../utils/saveAudioFile';
import AudioPlayer from '../components/AudioPlayer';
import { textToSpeech } from '../utils/textToSpeech';

const Home = ({ navigation }): JSX.Element => {
  
  const textToAudio = async () => {
    // send file text to server
    const response = await textToSpeech ("Hello, This is a hardcoded test.")
    if (response != null){
      saveAudioFile(response)
    }
    saveAudioFile(response)
  }
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const displayText = () => {
    //const url = ""
    //const textJson = loadParseJson(url);
    //hardcoded json file for now until can use fetch to get texts from server
    const textJson = {'title': "Neoclassicism and Early Romanticism In Britain", 'content': "British tourists and artists in Italy were the leading supporters of early Neoclassiscism, partly because of the burgeoning taste for revival styles at home. Nonetheless, the British interest in Classical revival styles was inflected slightly differently from Roman Neoclassiscism. While Roman Neoclassiscism looked to the past in order to revive a sense of moral and civic virtue, many later eighteenth-century British artists harnessed the concept of civic virtue to patriotism to create more Romantic works of art dedicated specifically to the British. In conclusion, Neoclassicism in Britain was a significant artistic and architectural movement that celebrated the timeless beauty of classical antiquity, contributed to the Enlightenment's intellectual climate, and left an enduring mark on British culture and aesthetics. It remains an important chapter in the history of British art, architecture, and literature.", 'audio_file_id':"1"}
    setTitle(textJson.title);
    setContent(textJson.content);
  }

  return (
    <View style={styles.homeBackground}>
      <ScrollView>
        <View> 
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.baseText}>{content}{'\n'}</Text>
          <View style={styles.navigationBarContainer}> 
            <TouchableOpacity style={styles.navBarButtonContainer} onPress={displayText}>
              <Image
                style={styles.navBarButtonImage}
                source={require('../assets/text.png')}
              />
              <Text style={styles.navBarButtonText}>Display Text</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navBarButtonContainer} onPress={() => navigation.navigate('AudioScreen')}>
              <Image
                style={styles.navBarButtonImage}
                source={require('../assets/headphones.png')}
              />
              <Text style={styles.navBarButtonText}>Audio Only</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

var styles = StyleSheet.create({
  homeBackground: {

    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  titleText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
    paddingHorizontal: 10,
    paddingTop: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Bold',
  },
  baseText: {
    fontSize: 20,
    color: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
    lineHeight: 35,
    fontFamily: 'Lexend Black',
  },
  navigationBarContainer: {
    position: 'absolute',
    bottom: 0,
    opacity: 0.7,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  navBarButtonContainer: {
    flex: 1,
    opacity: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default Home;