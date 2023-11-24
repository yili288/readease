import RNFS from 'react-native-fs';

const saveAudioFile = (textId, response) => {
  var path = RNFS.DocumentDirectoryPath + '/' + textId + '.wav';

  if (!response) return;

  // decode base 64 and save as audio file
  RNFS.writeFile(path, response.audioContent, 'base64') 
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.error('Error saving file:', err.message);
    });

}

export default saveAudioFile