const apiUrl = 'http://localhost:3000/'

const getTextSummary = (textId, text, forceRegenerate=false) => {
  return fetch(apiUrl + '/summary/text-summary', {
    method: 'POST',
    body: {
      textId, 
      text,
      forceRegenerate,
    },
  })
    .then(response => {
      return response.summary
    })
    .catch(error => {
      console.error(error);
    });
}

export default getTextSummary