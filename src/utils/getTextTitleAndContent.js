import axios from 'axios';
import { apiUrl } from '../constants';

const getTextTitleAndContent = async (textId) => {
    try{
      const response = await axios.get(`${apiUrl}/texts/${textId}`)
      console.log('Fetched Text')
      return ({
        title: response.data.foundText.name,
        content: response.data.foundText.content,
      })
  
  }
    catch(error){
        console.error('There was an error.', error);
        return ({title: '', content: ''});
    }
}

export default getTextTitleAndContent