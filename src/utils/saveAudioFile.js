import RNFS from 'react-native-fs';

const saveAudioFile = (textId, response) => {
  var path = RNFS.DocumentDirectoryPath + '/' + textId + '.wav';

  if (!response || !response.encodedAudio) return;

  // decode base 64 and save as audio file
  RNFS.writeFile(path, response.encodedAudio, 'base64') 
    .then((success) => {
      console.log('Audio file saved');
    })
    .catch((err) => {
      console.error('Error saving file:', err.message);
    });

}

export default saveAudioFile