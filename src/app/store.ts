import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import settingsReducer from '../features/settings/settingsSlice';
import userReducer from '../features/user/userSlice';
import questionsReducer from '../features/questions/questionsSlice';
import answerLogReducer from '../features/answerLog/answerLogSlice';
import sessionReducer from '../features/session/sessionSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};
const persistedSettingsReducer = persistReducer(persistConfig, settingsReducer);
const persistedQuestionsReducer = persistReducer(
  persistConfig,
  questionsReducer
);
const persistedAnswerLogReducer = persistReducer(
  persistConfig,
  answerLogReducer
);
const persistedSessionReducer = persistReducer(persistConfig, sessionReducer);

export const store = configureStore({
  reducer: {
    settings: persistedSettingsReducer,
    user: userReducer,
    questions: persistedQuestionsReducer,
    answerLog: persistedAnswerLogReducer,
    session: persistedSessionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
