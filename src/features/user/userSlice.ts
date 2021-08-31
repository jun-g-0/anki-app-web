import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  isLoggedin: boolean;
  uid: string;
  displayName: string;
  email: string;
}

const initialState: UserState = {
  isLoggedin: false,
  uid: '',
  displayName: '',
  email: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggined: (state, action) => {
      state.isLoggedin = true;
      state.uid = action.payload.uid;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    },
  },
});

export const { userLoggined } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
