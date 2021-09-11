import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setTapMode,
  setButtonMode,
  selectSettingsTapMode,
  uploadSettings,
  selectSettings,
} from '../features/settings/settingsSlice';
import { selectUser } from '../features/user/userSlice';

export const SETTING_LOCAL_KEY = 'ANKI_WEB_TEST_SETTING';

const useStyles = makeStyles((_) => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
  settings: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'space-around',
    flexDirection: 'column',
    padding: '20px',
  },
  settingsChoices: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0px 20px 20px 20px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '20px',
  },
}));

export default function AnkiQuesList() {
  const classes = useStyles();
  const settings = useAppSelector(selectSettings);
  const tapMode = useAppSelector(selectSettingsTapMode);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user.isSignedIn === 'signedIn') {
      dispatch(
        uploadSettings({
          userUid: user.ankiUser?.uid as string,
          settings: settings,
        })
      );
    }
  }, [user, dispatch, settings]);

  const changeTapMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.value as string) {
      case 'tapMode':
        dispatch(setTapMode());
        break;
      case 'buttonMode':
        dispatch(setButtonMode());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container maxWidth='md' className={classes.home}>
        <Typography variant='h4'>設定</Typography>
        <Box className={classes.settings}>
          <Box>
            <Typography variant='h6'>タップモード</Typography>
            <Typography variant='subtitle2'></Typography>
            <RadioGroup
              aria-label='tapModeRadio'
              name='tapModeRadio'
              onChange={changeTapMode}
              className={classes.settingsChoices}
              value={tapMode}
            >
              <FormControlLabel
                key='tapMode'
                value='tapMode'
                control={<Radio />}
                label='タップモード'
              />
              <Typography variant='subtitle2'>
                <b>回答の選択肢</b>が選択された時点で正解を表示
              </Typography>

              <FormControlLabel
                key='buttonMode'
                value='buttonMode'
                control={<Radio />}
                label='ボタンモード'
              />
              <Typography variant='subtitle2'>
                <b>正答ボタン</b>が選択された時点で正解を表示
              </Typography>
            </RadioGroup>
          </Box>
        </Box>
      </Container>
    </>
  );
}
