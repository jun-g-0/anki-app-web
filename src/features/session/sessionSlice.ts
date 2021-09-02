import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Question } from '../questions/questionsSlice';

export interface SessionState {
  selectedQuestions: Question[]; // いずれ、問題の絞り込みが必要になったとき用
  selectedAnswers: { [key: number]: number | number[] | string };
  currentQuestionNum: number;
}

export const initialState: SessionState = {
  selectedQuestions: [],
  selectedAnswers: {},
  currentQuestionNum: 0,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    sessionInit: (state) => {
      state = initialState;
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
