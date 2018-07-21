import { getQuiz, getScore } from './api';

it('API dispatches quiz', () => {
  return getQuiz().then(result => {
    expect(result).toBeTruthy();
  });
});

it ('API accurately scores responses', () => {
  return getScore([
    {id:"array-index", type:"dropdown", response:"1"},
    {id:"math-random", type:"input", response:"4"},
    {id:"switch-end", type:"toggle", response:false}
  ])
  .then(result => {
    expect(result.score).toBe(3);
  })
});
