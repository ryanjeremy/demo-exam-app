import * as config from '../config/config';
import * as Api from '../config/api';

export const fetchQuiz = () => {
  return dispatch => {
    dispatch(setQuizError(null));
    Api.getQuiz()
      .then(quiz => {
        dispatch(createQuiz(quiz));
      })
      .catch(error => {
        dispatch(setQuizError("There was an error processing your request. Please try again."));
      });
  }
}

export const scoreQuiz = () => {
  return (dispatch, getState) => {
    const { quiz } = getState();
    Api.getScore(quiz.responses)
      .then(result => {
        console.log(result.score);
        dispatch(registerScore(result.score));
      })
      .catch (error => {
        dispatch(setQuizError("There was an error processing your request. Please try again."));
      });
  }
}

export const createQuiz = (quiz) => {
  return {
    type: config.QUIZ_ACTION_CREATE,
    quiz
  };
}

export const registerResponse = (id, questionType, response) => {
  return {
    type: config.QUIZ_ACTION_RESPONSE,
    id,
    questionType,
    response
  };
}

export const registerScore = score => {
  return {
    type: config.QUIZ_ACTION_SCORE,
    score
  };
}

export const restartQuiz = () => {
  return {
    type: config.QUIZ_ACTION_RESTART
  };
}

export const setQuizError = (error) => {
  return {
    type: config.QUIZ_ACTION_ERROR,
    error
  };
}
