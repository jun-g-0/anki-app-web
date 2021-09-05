import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase, { auth } from '../../Firebase';

interface AnkiUser {
  uid: string;
  displayName: string;
  email: string;
}

export interface UserState {
  isSignedIn: 'pending' | 'signedIn' | 'NotSignedIn';
  ankiUser: AnkiUser | null;
}

export const initialState: UserState = {
  isSignedIn: 'pending',
  ankiUser: null,
};

// userを返すPromiseを自作する
function authPromise(): Promise<firebase.User> {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject();
      }
    });
  });
}

// 自作したuserを返すPromiseを呼び出し、返却されたPromise(Async/Await)をcreateAsyncThunkで書く
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = (await authPromise()) as firebase.User;
  const persedUser: AnkiUser = {
    uid: response.uid,
    email: typeof response.email === 'string' ? response.email : '',
    displayName:
      typeof response.displayName === 'string' ? response.displayName : '',
  };
  return persedUser;
});

export const signOutThunk = createAsyncThunk('user/signOutThunk', async () => {
  await auth.signOut();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isSignedIn = 'signedIn';
        state.ankiUser = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
        };
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isSignedIn = 'NotSignedIn';
      })
      .addCase(fetchUser.pending, (state) => {
        state.isSignedIn = 'pending';
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        state.isSignedIn = 'NotSignedIn';
        state.ankiUser = null;
      });
  },
});

// export const { userSignIn, userSignOut } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectUser = (state: RootState) => state.user;
export const selectUserDisplayName = (state: RootState) =>
  state.user.ankiUser?.displayName;

export default userSlice.reducer;
