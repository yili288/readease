import axios from 'axios'
const apiUrl = 'http://localhost:3000/texts'

const getTextTitleAndContent = async (textId) => {
    try{
      const response = await axios.get(`http://localhost:3000/texts/${textId}`)
      console.log('Fetched Text')
      return response.data.foundText
  
  }
    catch(error){
        console.error('There was an error.', error);
        return null;
    }
}

export default getTextTitleAndContent