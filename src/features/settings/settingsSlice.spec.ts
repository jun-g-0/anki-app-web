import settingsReducer, {
  SettingsState,
  setTapMode,
  setButtonMode,
} from './settingsSlice';

describe('settings reducer', () => {
  const initialState: SettingsState = {
    tapMode: 'tapMode',
    theme: 'white',
  };

  it('should handle initial state', () => {
    expect(settingsReducer(undefined, { type: 'unknown' })).toEqual({
      tapMode: 'tapMode',
      theme: 'white',
    });
  });

  it('should handle tapMode/tapMode', () => {
    const actual = settingsReducer(initialState, setTapMode());
    expect(actual.tapMode).toEqual('tapMode');
  });

  it('should handle tapMode/buttonMode', () => {
    const actual = settingsReducer(initialState, setButtonMode());
    expect(actual.tapMode).toEqual('buttonMode');
  });
});
