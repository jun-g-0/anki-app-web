import userReducer, { UserState } from './userSlice';

describe('user reducer', () => {
  const initialState: UserState = {
    isSignedIn: 'pending',
    uid: '',
    displayName: '',
    email: '',
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      isLoggedin: 'pending',
      uid: '',
      displayName: '',
      email: '',
    });
  });
});
