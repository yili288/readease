import axios from 'axios';
import { apiUrl } from '../constants';

const getPictureSummary = async (textId, forceRegenerate = false) => {
  try {
    const response = await axios.post(apiUrl + '/summary/picture-summary', {
      textId,
      forceRegenerate,
    });
    if (!response.status) {
      throw new Error('Error fetching data');
    }
    return response.data.pictureUrls;
  }
  catch (error) {
    throw new Error('Error fetching data', error);
    return null;
  }
}

export default getPictureSummary;