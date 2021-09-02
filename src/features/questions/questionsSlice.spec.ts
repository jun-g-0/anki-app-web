import questionsReducer, { initialState } from './questionsSlice';

export const sampleQuestions = [
  {
    questionId: 1,
    questionText: `質問1の問題文です。`,
    type: 'radio',
    choices: [{ choiceId: 1, choiceText: '質問1-選択肢1' }],
    answer: 2,
    desc: `質問1の解説です。`,
  },
  {
    questionId: 3,
    questionText: `質問3の問題文です。`,
    type: 'radio',
    choices: [{ choiceId: 1, choiceText: '質問3-選択肢1' }],
    answer: 1,
    desc: `質問3の解説です。`,
  },
];

describe('questions reducer', () => {
  it('should handle initial state', () => {
    expect(questionsReducer(undefined, { type: 'unknown' })).toEqual({
      isLoaded: 'pending',
      questions: [],
      updateDate: 0,
    });
  });

  it('should handle fetchQuestions/pending', () => {
    const actual = questionsReducer(initialState, {
      type: 'questions/fetchQuestions/pending',
      payload: sampleQuestions,
    });
    expect(actual.isLoaded).toEqual('pending');
    expect(actual.questions).toEqual([]);
    expect(actual.updateDate).toEqual(0);
  });

  it('should handle fetchQuestions/fulfilled', () => {
    const actual = questionsReducer(initialState, {
      type: 'questions/fetchQuestions/fulfilled',
      payload: sampleQuestions,
    });
    expect(actual.isLoaded).toEqual('loaded');
    expect(actual.questions.length).toEqual(2);
    expect(actual.updateDate).toBeGreaterThan(Date.now() - 1000 * 60);
  });
});
