import axios from 'axios';
import { apiUrl } from '../constants';

const getTextTitleAndContent = async (textId) => {
    try{
      const response = await axios.get(`${apiUrl}/texts/${textId}`)
      console.log('Fetched Text')
      return response.data.foundText
  
  }
    catch(error){
        console.error('There was an error.', error);
        return null;
    }
}

export default getTextTitleAndContent