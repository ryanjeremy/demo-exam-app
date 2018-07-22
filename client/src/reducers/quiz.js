import * as config from '../config/config';

const QUIZ_STATE = {
  quiz: [],
  responses: [],
  score: null,
  error: null
};

const quiz = (state = QUIZ_STATE, action) => {
  switch (action.type) {
    case config.QUIZ_ACTION_CREATE:
      return Object.assign({}, state, {
        quiz: action.quiz,
        error: null
      });

    case config.QUIZ_ACTION_RESPONSE:
      return Object.assign({}, state, {
        responses: [
          ...state.responses,
          {
            id: action.id,
            type: action.questionType,
            response: action.response
          }
        ],
        error: null
      });

    case config.QUIZ_ACTION_SCORE:
      return Object.assign({}, state, {
        score: action.score
      });

    case config.QUIZ_ACTION_RESTART:
      return {
        quiz: [],
        responses: [],
        score: null,
        error: null
      };

    case config.QUIZ_ACTION_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
}

export default quiz;
