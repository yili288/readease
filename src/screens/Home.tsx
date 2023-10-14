import React from 'react';
import { Text, View, Button } from 'react-native';
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

  return (
    <View> 
      <Text>Hello World!</Text>
      <Button
        title='Get audio'
        onPress={textToAudio}
      />
      <AudioPlayer/>
    </View>
  );
};
export default Home;