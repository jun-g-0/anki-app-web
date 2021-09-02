import answerLogReducer, { initialState, logUpdate } from './answerLogSlice';

import { sampleQuestions } from '../questions/questionsSlice.spec';

describe('settings reducer', () => {
  it('should handle initial state', () => {
    expect(answerLogReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle logUpdate', () => {
    const answer: { [key: number]: number | number[] | string } = {};
    const session = {
      answer,
    };
    for (let i = 0; i < sampleQuestions.length; i++) {
      const question = sampleQuestions[i];
      answer[question.questionId] = question.answer;
    }

    const actual = answerLogReducer(
      initialState,
      logUpdate({
        questions: sampleQuestions,
        session: session,
      })
    );

    for (let i = 0; i < sampleQuestions.length; i++) {
      const question = sampleQuestions[i];
      expect(actual[question.questionId]).toEqual([true]);
    }
  });
});
