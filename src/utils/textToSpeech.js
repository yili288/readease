import axios from 'axios';
import { apiUrl } from '../constants';

const textToSpeech = async (textId, text) => {
    try{
        const response = await axios.post(apiUrl + '/texts/text-to-speech', {text})
        console.log('Text to speech success')
        return response.data

    }
    catch(error){
        // console.error('Error converting text to speech.', error);
        return null;
    }
   
  }

export {textToSpeech}