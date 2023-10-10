//import RNFS from 'react-native-fs';
const loadParseJson = (url) => {
    /*const absolutePath = RNFS.DocumentDirectoryPath + filePath;
    RNFS.readFile(absolutePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        try {
            const parsedJson = JSON.parse(data);
            console.log(parsedJson);
            return parsedJson;
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });*/
    //for requests to server
    fetch(url) 
        .then((response) => { 
            if (!response.ok) { 
                throw new Error('File not found'); 
            }
            return response.text();

        })
        .then((fileContent) => {
            try {
              const parsedJson = JSON.parse(fileContent);
              console.log(parsedJson);
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
          })
        .catch((error) => { 
            console.log(error);
        });
    };

export default loadParseJson