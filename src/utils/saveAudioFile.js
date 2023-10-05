import RNFS from 'react-native-fs';

const saveAudioFile = (response) => {
  var path = RNFS.DocumentDirectoryPath + '/hello.wav';

  RNFS.writeFile(path, response.audioContent, 'base64')
    .then((success) => {
      console.log('FILE WRITTEN!');
    })
    .catch((err) => {
      console.error('Error saving file:', err.message);
    });

}

export default saveAudioFile