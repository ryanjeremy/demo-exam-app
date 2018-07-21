const quizData = require('./data.json');

module.exports = (responses) => {
  let score = 0;

  responses.forEach(response => {
    let element = null;
    for (let i = 0; i < quizData[response.type].length; i ++) {
      if (quizData[response.type][i].id === response.id) {
        element = quizData[response.type][i];
      }
    }

    switch (response.type) {
      case "dropdown":
        if (element.options[parseInt(response.response)].correct == true) {
          score ++;
        }
        break;

      case "input":
        for (let i = 0; i < element.correctResponses.length; i ++) {
          if (element.correctResponses[i] === response.response) {
            score ++;
          }
        }
        break;

      case "toggle":
        if (element.answer === response.response) {
          score ++;
        }
        break;
    }
  });

  return score;
};
