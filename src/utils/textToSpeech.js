import axios from 'axios';


const textToSpeech = async (text) => {
    const content = {text: text};
    try{
        const response = await axios.post('http://localhost:3000/texts/text-to-speech', content)
        console.log(response.data)
        return response.data

    }
    catch(error){
        console.error('There was an error.', error);
        return null;
    }
   
  }

export {textToSpeech}