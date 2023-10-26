import RNFS from 'react-native-fs';

const saveAudioFile = (response) => {
  var path = RNFS.DocumentDirectoryPath + '/hello.wav';

  // decode base 64 and save as audio file
  RNFS.writeFile(path, response.audioContent, 'base64') 
    .then((success) => {
      console.log('FILE WRITTEN to:', RNFS.DocumentDirectoryPath);
    })
    .catch((err) => {
      console.error('Error saving file:', err.message);
    });

}

export default saveAudioFile