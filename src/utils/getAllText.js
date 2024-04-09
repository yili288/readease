import axios from 'axios';
import { apiUrl } from '../constants';

const getAllTexts = async (textId) => {
  try {
    const response = await axios.get(`${apiUrl}/texts`)
    return (response.data.textsArr)

  }
  catch (error) {
    console.error('There was an error.', error);
    return ([]);
  }
}

export default getAllTexts