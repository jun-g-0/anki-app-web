import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { Question } from '../questions/questionsSlice';

import { db } from '../../Firebase';

export interface AnswerLog {
  [key: number]: boolean[];
}

export interface AnswerLogState {
  answerLog: AnswerLog;
}

export const initialState: AnswerLogState = { answerLog: {} };

export const uploadAnswerLog = createAsyncThunk(
  'answerLog/upload',
  async (payload: { userUid: string; answerLog: AnswerLog }) => {
    const response = await db
      .collection('demoAnswerLog')
      .doc(payload.userUid)
      .set(payload.answerLog);
    return response;
  }
);

export function getAnswerLog(userUid: string, answerLog: AnswerLog) {
  return new Promise((resolve, rejects) => {
    db.collection('demoAnswerLog')
      .doc(userUid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          // docが存在しない、初回ログイン時のみ、ローカルのデータをアップロード
          db.collection('demoAnswerLog').doc(userUid).set(answerLog);
          resolve(answerLog);
        }
      })
      .catch((error) => {
        console.log('Firestore Error getting document:', error);
        rejects();
      });
  });
}

export const fetchAnswerLog = createAsyncThunk(
  'answerLog/fetch',
  async (payload: { userUid: string }, thunkAPI) => {
    // 初回のログイン時には、Reduxでローカルに保管していたデータをアップロードする
    const rootState = thunkAPI.getState() as RootState;
    const answerLog = rootState.answerLog.answerLog;

    const response = (await getAnswerLog(
      payload.userUid,
      answerLog
    )) as AnswerLog;
    return response;
  }
);

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
        if (!state.answerLog[question.questionId]) {
          state.answerLog[question.questionId] = [];
        }
        state.answerLog[question.questionId].unshift(trueOrFalse);
        if (state.answerLog[question.questionId].length > 5) {
          state.answerLog[question.questionId].pop();
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnswerLog.fulfilled, (state, action) => {
      state.answerLog = action.payload;
    });
  },
});

export const { logUpdate } = answerLogSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectAnswerLog = (state: RootState) => state.answerLog.answerLog;

export default answerLogSlice.reducer;
