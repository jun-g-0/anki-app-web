import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Question } from '../questions/questionsSlice';

export interface SessionState {
  selectedQuestions: Question[]; // いずれ、問題の絞り込みが必要になったとき用
  selectedAnswers: { [key: number]: number | number[] | string };
  currentQuestionNum: number;
  lastSession: {
    // 回答表示時用
    selectedQuestions: Question[];
    selectedAnswers: { [key: number]: number | number[] | string };
  };
}

export const initialState: SessionState = {
  selectedQuestions: [],
  selectedAnswers: {},
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
      state.lastSession.selectedQuestions = state.selectedQuestions;
      state.lastSession.selectedAnswers = state.selectedAnswers;
      state.selectedQuestions = [];
      state.selectedAnswers = {};
      state.currentQuestionNum = 0;
    },
    selectedQuestionsUpdate: (state, action) => {
      state.selectedQuestions = action.payload.questions;
    },
    answerSelected: (state, action) => {
      const newAnswer = action.payload;
      state.selectedAnswers = {
        ...state.selectedAnswers,
        ...newAnswer,
      };
    },
  },
});

export const { sessionInit, selectedQuestionsUpdate, answerSelected } =
  sessionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectSession = (state: RootState) => state.session;

export default sessionSlice.reducer;
