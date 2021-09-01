import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import firebase, { auth } from '../../Firebase';

interface AnkiUser {
  uid: string | null;
  displayName: string | null;
  email: string | null;
}

export interface UserState extends AnkiUser {
  isSignedIn: 'pending' | 'signedIn' | 'NotSignedIn';
}

const initialState: UserState = {
  isSignedIn: 'pending',
  uid: null,
  displayName: null,
  email: null,
};

// userを返すPromiseを自作する
function authPromise() {
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
  const response = (await authPromise()) as firebase.User;
  console.log('response: ', response);
  const persedUser: AnkiUser = {
    uid: response.uid,
    email: response.email,
    displayName: response.displayName,
  };
  console.log('persedUser: ', persedUser);
  return persedUser;
});

export const signOutThunk = createAsyncThunk('user/signOut', async () => {
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
        state.uid = action.payload.uid;
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
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
      });
  },
});

// export const { userSignIn, userSignOut } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.settings.value)`
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
