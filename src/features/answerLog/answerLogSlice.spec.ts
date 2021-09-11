import answerLogReducer, { initialState, logUpdate } from './answerLogSlice';

import { sampleQuestions } from '../questions/questionsSlice.spec';

describe('settings reducer', () => {
  it('should handle initial state', () => {
    expect(answerLogReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle logUpdate', () => {
    const answers: { [key: number]: number | number[] | string } = {};

    for (let i = 0; i < sampleQuestions.length; i++) {
      const question = sampleQuestions[i];
      answers[question.questionId] = question.answer;
    }

    const actual = answerLogReducer(
      initialState,
      logUpdate({
        questions: sampleQuestions,
        answers: answers,
      })
    );

    for (let i = 0; i < sampleQuestions.length; i++) {
      const question = sampleQuestions[i];
      expect(actual.answerLog[question.questionId]).toEqual([true]);
    }
  });
});
