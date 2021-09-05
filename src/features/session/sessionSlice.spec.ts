import sessionReducer, {
  SessionState,
  initialState,
  sessionInit,
  selectedQuestionsUpdate,
  answerSelected,
} from './sessionSlice';

import { sampleQuestions } from '../questions/questionsSlice.spec';

describe('settings reducer', () => {
  it('should handle initial state', () => {
    expect(sessionReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    );
  });

  it('should handle sessionInit', () => {
    const testState: SessionState = {
      currentSession: {
        selectedQuestions: sampleQuestions,
        selectedAnswers: { 1: 1 },
      },
      currentQuestionNum: 0,
      lastSession: {
        selectedQuestions: [],
        selectedAnswers: {},
      },
    };
    const actual = sessionReducer(testState, sessionInit());
    expect(actual.currentSession.selectedQuestions.length).toEqual(0);
    expect(Object.keys(actual.currentSession.selectedAnswers).length).toEqual(
      0
    );
    expect(actual.currentQuestionNum).toEqual(0);
    console.log(
      'actual.lastSession.selectedQuestions: ',
      actual.lastSession.selectedQuestions
    );
    expect(actual.lastSession.selectedQuestions.length).toEqual(2);
    expect(actual.lastSession.selectedAnswers[1]).toEqual(1);
  });

  it('should handle selectedQuestionsUpdate', () => {
    const actual = sessionReducer(
      initialState,
      selectedQuestionsUpdate({ questions: sampleQuestions })
    );
    expect(actual.currentSession.selectedQuestions.length).toEqual(2);
  });

  it('should handle answerSelected', () => {
    const actual = sessionReducer(
      initialState,
      answerSelected({ key: 1, val: 1 })
    );
    expect(actual.currentSession.selectedAnswers[1]).toEqual(1);
  });
});
