const apiUrl = 'http://localhost:3000'

const getTextSummary = (textId, text, forceRegenerate=false) => {
  return fetch(apiUrl + '/summary/text-summary', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      textId,
      text,
      forceRegenerate,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json()
  }).then(data => {
    console.log("api return", data.summary)
    return data.summary
  })
  .catch(error => {
    console.error({'Error fetching data': error});
  });
}

export default getTextSummary
