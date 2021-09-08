import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { db } from '../../Firebase';

export interface Settings {
  tapMode: 'tapMode' | 'buttonMode';
  theme: 'white' | 'dark' | 'cat' | 'custom';
}

export interface SettingsState {
  settings: Settings;
}

export const initialState: SettingsState = {
  settings: {
    tapMode: 'tapMode',
    theme: 'white',
  },
};

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
  },
});

export const { setTapMode, setButtonMode } = settingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectSettings = (state: RootState) => state.settings.settings;
export const selectSettingsTapMode = (state: RootState) =>
  state.settings.settings.tapMode;

export default settingsSlice.reducer;
