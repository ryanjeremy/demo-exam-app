import * as config from '../config/config';
import { getQuiz } from '../config/api';

export const createQuiz = (quiz) => {
  return {
    type: config.QUIZ_ACTION_CREATE,
    quiz
  };
}

export const fetchQuiz = () => {
  return dispatch => {
    dispatch(setQuizError(null));
    getQuiz()
      .then(quiz => {
        dispatch(createQuiz(quiz));
      })
      .catch(error => {
        dispatch(setQuizError("There was an error processing your request. Please try again."));
      });
  }
}

export const registerResponse = (id, questionType, response) => {
  return {
    type: config.QUIZ_ACTION_RESPONSE,
    id,
    questionType,
    response
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
