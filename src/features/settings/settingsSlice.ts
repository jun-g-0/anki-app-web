import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface SettingsState {
  tapMode: 'tapMode' | 'buttonMode';
  theme: 'white' | 'dark' | 'cat' | 'custom';
}

const initialState: SettingsState = {
  tapMode: 'tapMode',
  theme: 'white',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setTapMode: (state) => {
      state.tapMode = 'tapMode';
    },
    setButtonMode: (state) => {
      state.tapMode = 'buttonMode';
    },
  },
});

export const { setTapMode, setButtonMode } = settingsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectSettings = (state: RootState) => state.settings;
export const selectSettingsTapMode = (state: RootState) =>
  state.settings.tapMode;

export default settingsSlice.reducer;
