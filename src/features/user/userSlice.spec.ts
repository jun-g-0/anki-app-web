import userReducer, { initialState } from './userSlice';

describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle fetchUser/pending', () => {
    const actual = userReducer(initialState, {
      type: 'user/fetchUser/pending',
    });
    expect(actual.isSignedIn).toEqual('pending');
    expect(actual.ankiUser).toEqual(null);
  });

  it('should handle fetchUser/fulfilled', () => {
    const actual = userReducer(initialState, {
      type: 'user/fetchUser/fulfilled',
      payload: {
        uid: 'dummyUid',
        displayName: 'dummyDisplayName',
        email: 'dummyEmail',
      },
    });
    expect(actual.isSignedIn).toEqual('signedIn');
    expect(Boolean(actual.ankiUser)).toEqual(true);

    if (actual.ankiUser) {
      expect(actual.ankiUser.uid).toEqual('dummyUid');
      expect(actual.ankiUser.displayName).toEqual('dummyDisplayName');
      expect(actual.ankiUser.email).toEqual('dummyEmail');
    }
  });

  it('should handle fetchUser/rejected', () => {
    const actual = userReducer(initialState, {
      type: 'user/fetchUser/rejected',
    });
    expect(actual.isSignedIn).toEqual('NotSignedIn');
    expect(actual.ankiUser).toEqual(null);
  });

  it('should handle signOutThunk/fulfilled', () => {
    const actual = userReducer(initialState, {
      type: 'user/signOutThunk/fulfilled',
    });
    expect(actual.isSignedIn).toEqual('NotSignedIn');
    expect(actual.ankiUser).toEqual(null);
  });
});
