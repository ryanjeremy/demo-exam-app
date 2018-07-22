import * as config from '../config/config';

const QUIZ_STATE = {
  quiz: [],
  responses: [],
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
        ]
      });

    case config.QUIZ_ACTION_RESTART:
      return {
        quiz: [],
        responses: [],
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
