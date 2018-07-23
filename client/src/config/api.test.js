import { getQuiz, getScore } from './api';

it('API dispatches quiz', () => {
  return getQuiz().then(result => {
    expect(result).toBeTruthy();
  });
});

it ('API accurately scores responses', () => {
  const quizAnswers = [
    {id:"array-index", type:"dropdown", response:"1"},
    {id:"react-component-update", type:"dropdown", response:"0"},
    {id:"test-code", type:"dropdown", response:"1"},
    {id:"math-random", type:"input", response:"4"},
    {id:"string-upper-case", type:"input", response:"HELLO WORLD"},
    {id:"jsx-class", type:"input", response:"className"},
    {id:"switch-end", type:"toggle", response:false},
    {id:"mutable-data-types", type:"toggle", response:false},
    {id:"visible-variable", type:"toggle", response:false}
  ]
  return getScore(quizAnswers)
    .then(result => {
      expect(result.score).toBe(quizAnswers.length);
    })
});
