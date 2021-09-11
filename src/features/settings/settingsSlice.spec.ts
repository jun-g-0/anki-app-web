import settingsReducer, {
  setTapMode,
  setButtonMode,
  initialState,
} from './settingsSlice';

describe('settings reducer', () => {
  it('should handle initial state', () => {
    expect(settingsReducer(undefined, { type: 'unknown' })).toEqual({
      settings: {
        tapMode: 'tapMode',
        theme: 'white',
      },
    });
  });

  it('should handle tapMode/tapMode', () => {
    const actual = settingsReducer(initialState, setTapMode());
    expect(actual.settings.tapMode).toEqual('tapMode');
  });

  it('should handle tapMode/buttonMode', () => {
    const actual = settingsReducer(initialState, setButtonMode());
    expect(actual.settings.tapMode).toEqual('buttonMode');
  });
});
