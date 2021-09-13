import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { db } from '../../Firebase';

export interface Choice {
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

// create と update は動作として同じ firestore の set を使用
export const updateQuestion = createAsyncThunk(
  'questions/updateQuestions',
  async (question: Question) => {
    console.log('updateQuestions fired.');
    console.log('updateQuestions question: ', question);
    const ref = await db
      .collection('demo-qa')
      .doc(String(question.questionId))
      .set(question);

    console.log('updateQuestions ended.');
    console.log(ref);

    return ref;
  }
);

export const deleteQuestion = createAsyncThunk(
  'questions/deleteQuestions',
  async (questionId: number) => {
    console.log('deleteQuestion fired.');
    const ref = await db
      .collection('demo-qa')
      .doc(String(questionId))
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
    return ref;
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
export const selectQuestionsLastUpdate = (state: RootState) =>
  state.questions.updateDate;

export default questionsSlice.reducer;
