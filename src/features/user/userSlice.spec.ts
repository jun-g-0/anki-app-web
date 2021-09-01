import userReducer, { UserState, initialState } from './userSlice';

describe('user reducer', () => {
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      isSignedIn: 'pending',
      uid: null,
      displayName: null,
      email: null,
    });
  });

  it('should handle fetchUser/pending', () => {
    const actual = userReducer(initialState, {
      type: 'user/fetchUser/pending',
    });
    expect(actual.isSignedIn).toEqual('pending');
    expect(actual.uid).toEqual(null);
    expect(actual.displayName).toEqual(null);
    expect(actual.email).toEqual(null);
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
    expect(actual.uid).toEqual('dummyUid');
    expect(actual.displayName).toEqual('dummyDisplayName');
    expect(actual.email).toEqual('dummyEmail');
  });

  it('should handle fetchUser/rejected', () => {
    const actual = userReducer(initialState, {
      type: 'user/fetchUser/rejected',
    });
    expect(actual.isSignedIn).toEqual('NotSignedIn');
    expect(actual.uid).toEqual(null);
    expect(actual.displayName).toEqual(null);
    expect(actual.email).toEqual(null);
  });

  it('should handle signOutThunk/fulfilled', () => {
    const actual = userReducer(initialState, {
      type: 'user/signOutThunk/fulfilled',
    });
    expect(actual.isSignedIn).toEqual('NotSignedIn');
    expect(actual.uid).toEqual(null);
    expect(actual.displayName).toEqual(null);
    expect(actual.email).toEqual(null);
  });
});
