import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { db } from '../../Firebase';

interface Choice {
  choiceId: number;
  choiceText: string;
}

export interface Question {
  questionId: number;
  questionText: string;
  type: 'radio' | 'checkbox' | 'input';
  choices: Choice[];
  answer: number | number[] | string;
  desc: string;
}

export interface QuestionsState {
  isLoaded: 'pending' | 'loaded' | 'useLocalData';
  questions: Question[];
  updateDate: number;
}

export const initialState: QuestionsState = {
  isLoaded: 'pending',
  questions: [],
  updateDate: 0,
};

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const snapshot = await db.collection('demo-qa').get();
    let questions: Question[] = [];
    snapshot.forEach((doc) => {
      questions.push(doc.data() as Question);
    });
    questions.sort((a, b) => +a.questionId - +b.questionId);
    return questions;
  }
);

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.isLoaded = 'pending';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.isLoaded = 'loaded';
        state.questions = action.payload;
        state.updateDate = Date.now();
      });
  },
});

// export const { userSignIn, userSignOut } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectQuestionsState = (state: RootState) => state.questions;
export const selectQuestions = (state: RootState) => state.questions.questions;

export default questionsSlice.reducer;
