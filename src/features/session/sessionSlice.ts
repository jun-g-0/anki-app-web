import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Question } from '../questions/questionsSlice';

export interface Session {
  selectedQuestions: Question[]; // いずれ、問題の絞り込みが必要になったとき用
  selectedAnswers: { [key: number]: number | number[] | string };
}
export interface SessionState {
  currentSession: Session;
  currentQuestionNum: number;
  lastSession: Session;
}

export const initialState: SessionState = {
  currentSession: {
    selectedQuestions: [],
    selectedAnswers: {},
  },
  currentQuestionNum: 0,
  lastSession: {
    selectedQuestions: [],
    selectedAnswers: {},
  },
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    sessionInit: (state) => {
      state.lastSession = { ...state.currentSession };
      state.currentSession = {
        selectedQuestions: [],
        selectedAnswers: {},
      };
      state.currentQuestionNum = 0;
    },
    selectedQuestionsUpdate: (state, action) => {
      state.currentSession.selectedQuestions = action.payload.questions;
    },
    answerSelected: (state, action) => {
      state.currentSession.selectedAnswers[action.payload.key] =
        action.payload.val;
    },
    questionMoved: (state, action) => {
      state.currentQuestionNum = action.payload;
    },
  },
});

export const {
  sessionInit,
  selectedQuestionsUpdate,
  answerSelected,
  questionMoved,
} = sessionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectSession = (state: RootState) => state.session;
export const selectSessionQuesNum = (state: RootState) =>
  state.session.currentQuestionNum;
export const selectSessionQuestions = (state: RootState) =>
  state.session.currentSession.selectedQuestions;
export const selectSessionAnswers = (state: RootState) =>
  state.session.currentSession.selectedAnswers;
export const selectLastSession = (state: RootState) =>
  state.session.lastSession;

export default sessionSlice.reducer;
