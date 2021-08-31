import userReducer, { UserState, userLoggined } from './userSlice';

describe('user reducer', () => {
  const initialState: UserState = {
    isLoggedin: false,
    uid: '',
    displayName: '',
    email: '',
  };

  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      isLoggedin: false,
      uid: '',
      displayName: '',
      email: '',
    });
  });

  it('should handle userLoggined', () => {
    const actual = userReducer(
      initialState,
      userLoggined({ uid: 'dummy', displayName: 'Dummy', email: 'dummy@d.com' })
    );
    expect(actual.isLoggedin).toEqual(true);
    expect(actual.uid).toEqual('dummy');
    expect(actual.displayName).toEqual('Dummy');
    expect(actual.email).toEqual('dummy@d.com');
  });
});
