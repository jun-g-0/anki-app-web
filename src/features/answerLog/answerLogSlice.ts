import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Question } from '../questions/questionsSlice';

export interface AnswerLogState {
  [ket: number]: boolean[];
}

export const initialState: AnswerLogState = {};

export const answerLogSlice = createSlice({
  name: 'answerLog',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logUpdate: (state, action) => {
      for (const key of Object.keys(action.payload.questions)) {
        const question: Question = action.payload.questions[key];
        const selectedAnswer = action.payload.answers[question.questionId];

        // check right or wrong
        let trueOrFalse = false;
        if (
          question.type === 'radio' &&
          Number(question.answer) === Number(selectedAnswer)
        ) {
          trueOrFalse = true;
        }

        // save log
        if (!state[question.questionId]) {
          state[question.questionId] = [];
        }
        state[question.questionId].unshift(trueOrFalse);
        if (state[question.questionId].length > 5) {
          state[question.questionId].pop();
        }
      }
    },
  },
});

export const { logUpdate } = answerLogSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectAnswerLog = (state: RootState) => state.answerLog;

export default answerLogSlice.reducer;
