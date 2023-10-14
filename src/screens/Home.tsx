import React, { useState} from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import saveAudioFile from '../utils/saveAudioFile';
import AudioPlayer from '../components/AudioPlayer';
import { textToSpeech } from '../utils/textToSpeech';

const Home = (): JSX.Element => {
  
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
    const textJson = {'title': "Text Title", 'content': "This is a paragraph of text, I'm making this longer to see what happens when it reaches the edge of the phone screen, spoiler it wraps. \n\nThis is a second paragraph.", 'audio_file_id':"1"}
    setTitle(textJson.title);
    setContent(textJson.content);
  }

  return (
    <View> 
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.baseText}>{content}{'\n'}</Text>
      <Button
        title= 'Display Text'
        onPress={displayText}
       />
      <Button
        title='Get audio'
        onPress={textToAudio}
      />
      <AudioPlayer/>
    </View>
  );
};

//not sure where I should put this will leave here for now 
var styles = StyleSheet.create({
  titleText: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    paddingLeft:10,
    paddingRight: 10,
  },
  baseText: {
    fontSize: 12,
    color: 'black',
    paddingLeft:5,
    paddingRight:5,
    //to set font would need fonts in assets folder
    //fontFamily: 'Arial',
  },
});

export default Home;