const quizData = require('./config/data.json');
const validate = require('./config/validate');
const shuffle = require('./config/shuffle');

module.exports = (req, res) => {
  const resource = req.params.resource;
  const action = req.params.action;

  const dispatchResponse = (status, result) => {
    res.status(status).send({
      result
    });
  };

  if (resource === "quiz") {
    if (action === "get") {
      const dropDown = Object.assign({}, quizData.dropdown[Math.floor(Math.random() * quizData.dropdown.length)], { type: "dropdown" });
      const input = Object.assign({}, quizData.input[Math.floor(Math.random() * quizData.input.length)], { type: "input" });
      const toggle = Object.assign({}, quizData.toggle[Math.floor(Math.random() * quizData.toggle.length)], { type: "toggle" });

      dropDown.options = dropDown.options.map(option => {
        const newOptionObj = Object.assign({}, option);
        delete newOptionObj.correct;
        return newOptionObj;
      });

      delete input.correctResponses;
      delete toggle.answer;

      dispatchResponse(200, shuffle([
        dropDown,
        input,
        toggle
      ]));
    } else if (action === "score") {
      const responses = req.body.responses;
      dispatchResponse(200, {
        score: validate(responses)
      });
    } else {
      dispatchResponse(400, "invalid action");
    }
  } else {
    dispatchResponse(400, "invalid response");
  }
};
