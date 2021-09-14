import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { db } from '../../Firebase';

type ThemeType = 'auto' | 'light' | 'dark' | 'custom';

export interface Settings {
  tapMode: 'tapMode' | 'buttonMode';
  theme: ThemeType;
}

export interface SettingsState {
  settings: Settings;
}

export const initialState: SettingsState = {
  settings: {
    tapMode: 'tapMode',
    theme: 'auto',
  },
};

export function fetchSettingsFirestore(userUid: string, settings: Settings) {
  return new Promise((resolve, reject) => {
    db.collection('demoSettings')
      .doc(userUid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          // docが存在しない、初回ログイン時のみ、ローカルのデータをアップロード
          db.collection('demoSettings').doc(userUid).set(settings);
          resolve(settings);
        }
      })
      .catch((error) => {
        console.log('Firestore Error updating settings: ', error);
        reject();
      });
  });
}

export const fetchSettings = createAsyncThunk(
  'settings/fetch',
  async (payload: { userUid: string }, thunkAPI) => {
    // 初回のログイン時には、Reduxでローカルに保管していたデータをアップロードする
    const rootState = thunkAPI.getState() as RootState;
    const settings = rootState.settings.settings;

    const response = (await fetchSettingsFirestore(
      payload.userUid,
      settings
    )) as Settings;
    return response;
  }
);

export const uploadSettings = createAsyncThunk(
  'settings/upload',
  async (payload: { userUid: string; settings: Settings }) => {
    const response = await db
      .collection('demoSettings')
      .doc(payload.userUid)
      .set(payload.settings);
    return response;
  }
);

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTapMode: (state) => {
      state.settings.tapMode = 'tapMode';
    },
    setButtonMode: (state) => {
      state.settings.tapMode = 'buttonMode';
    },
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.settings.theme = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      if (action.payload) {
        state.settings = action.payload;
      }
    });
  },
});

export const { setTapMode, setButtonMode, setTheme } = settingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectSettings = (state: RootState) => state.settings.settings;
export const selectSettingsTapMode = (state: RootState) =>
  state.settings.settings.tapMode;
export const selectSettingsTheme = (state: RootState) =>
  state.settings.settings.theme;

export default settingsSlice.reducer;
