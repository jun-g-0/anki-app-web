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
        console.log('auth.onAuthStateChanged((user) > true');
        resolve(user);
      } else {
        console.log('auth.onAuthStateChanged((user) > false');
        reject();
      }
    });
  });
}

// 自作したuserを返すPromiseを呼び出し、返却されたPromise(Async/Await)をcreateAsyncThunkで書く
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  console.log('fetchUser fire.');
  const response = await authPromise();
  console.log('response: ', response);
  const persedUser: AnkiUser = {
    uid: response.uid,
    email: typeof response.email === 'string' ? response.email : '',
    displayName:
      typeof response.displayName === 'string' ? response.displayName : '',
  };
  console.log('persedUser: ', persedUser);
  return persedUser;
});

export const signOutThunk = createAsyncThunk('user/signOutThunk', async () => {
  await auth.signOut();
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // userSignIn: (state, action) => {
    //   state.isSignedIn = 'signedIn';
    //   state.uid = action.payload.uid;
    //   state.displayName = action.payload.displayName;
    //   state.email = action.payload.email;
    // },
    // userSignOut: (state) => {
    //   state.isSignedIn = 'NotSignedIn';
    //   state.uid = null;
    //   state.displayName = null;
    //   state.email = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        console.log('fetchUser fulfilled case called.');
        console.log('action: ', action);
        state.isSignedIn = 'signedIn';
        state.ankiUser = {
          uid: action.payload.uid,
          email:
            typeof action.payload.email === 'string'
              ? action.payload.email
              : '',
          displayName:
            typeof action.payload.displayName === 'string'
              ? action.payload.displayName
              : '',
        };
      })
      .addCase(fetchUser.rejected, (state) => {
        console.log('fetchUser rejected case called.');
        state.isSignedIn = 'NotSignedIn';
      })
      .addCase(fetchUser.pending, (state) => {
        console.log('fetchUser pending case called.');
        state.isSignedIn = 'pending';
      })
      .addCase(signOutThunk.fulfilled, (state) => {
        console.log('signOutThunk fulfilled case called.');
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
