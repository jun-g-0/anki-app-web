import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import userReducer from '../features/user/userSlice';
import questionsReducer from '../features/questions/questionsSlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
    questions: questionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
