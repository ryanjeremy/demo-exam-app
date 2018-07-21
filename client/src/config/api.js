import * as config from './config';

export const getQuiz = async () => {
  const response = await fetch(config.API_URL + "/quiz/get");
  const jsonResponse = await response.json();
  return jsonResponse.result;
}

export const getScore = async (responses) => {
  const response = await fetch(config.API_URL + "/quiz/score", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      responses
    })
  });
  const jsonResponse = await response.json();
  return jsonResponse.result;
}
