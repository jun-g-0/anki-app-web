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
    const actual = sessionReducer(initialState, sessionInit());
    expect(actual).toEqual(initialState);
  });

  it('should handle selectedQuestionsUpdate', () => {
    const actual = sessionReducer(
      initialState,
      selectedQuestionsUpdate({ questions: sampleQuestions })
    );
    expect(actual.selectedQuestions.length).toEqual(2);
  });

  it('should handle answerSelected', () => {
    const actual = sessionReducer(initialState, answerSelected({ 1: 1 }));
    expect(actual.selectedAnswers[1]).toEqual(1);
  });
});
