import axios from 'axios';
import { apiUrl } from '../constants';

// send images in the form of bytes to the server
const uploadImage = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpg',
      name: 'image.jpg'
    });
    const response = await axios.post(apiUrl + '/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if (!response.status) {
      throw new Error('Error uploading image');
    }
    const text = response.data.textFound;
    return text;
  }
  catch (error) {
    console.error('Error uploading image', error);
    return null;
  }
}

export default uploadImage;