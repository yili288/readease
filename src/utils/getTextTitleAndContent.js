import axios from 'axios'
const apiUrl = 'http://localhost:3000/texts'

/*const getTextTitle = (textId) => {
  return fetch(apiUrl + `/${textId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json().foundText
  }).then(data => {
    console.log("api return", data.name)
    return data.name
  })
  .catch(error => {
    console.error({'Error fetching data': error});
  });
}*/

const getTextTitle = async (textId) => {
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





export default getTextTitle