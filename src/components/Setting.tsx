import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@material-ui/core';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  setTapMode,
  setButtonMode,
  selectSettingsTapMode,
  uploadSettings,
  selectSettings,
  selectSettingsTheme,
  setTheme,
  selectSettingsRandom,
  setRandom,
} from '../features/settings/settingsSlice';
import { selectUser } from '../features/user/userSlice';
import { fetchQuestions } from '../features/questions/questionsSlice';

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
  downloadButton: {
    display: 'flex',
    padding: '10px 20px 20px 20px',
  },
}));

export default function AnkiQuesList() {
  const classes = useStyles();
  const settings = useAppSelector(selectSettings);
  const tapMode = useAppSelector(selectSettingsTapMode);
  const theme = useAppSelector(selectSettingsTheme);
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

  const handleReFetch = () => {
    dispatch(fetchQuestions());
  };

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

  const changeTheme = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value as string;

    switch (newTheme) {
      case 'auto':
        dispatch(setTheme('auto'));
        break;
      case 'light':
        dispatch(setTheme('light'));
        break;
      case 'dark':
        dispatch(setTheme('dark'));
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Container maxWidth="md" className={classes.home}>
        <Typography variant="h4">設定</Typography>
        <Box className={classes.settings}>
          <Box>
            <Typography variant="h6">タップモード</Typography>
            <Typography variant="subtitle2"></Typography>
            <RadioGroup
              aria-label="tapModeRadio"
              name="tapModeRadio"
              onChange={changeTapMode}
              className={classes.settingsChoices}
              value={tapMode}
            >
              <FormControlLabel
                key="tapMode"
                value="tapMode"
                control={<Radio />}
                label="タップモード"
              />
              <Typography variant="subtitle2">
                <b>回答の選択肢</b>が選択された時点で正解を表示
              </Typography>

              <FormControlLabel
                key="buttonMode"
                value="buttonMode"
                control={<Radio />}
                label="ボタンモード"
              />
              <Typography variant="subtitle2">
                <b>正答ボタン</b>が選択された時点で正解を表示
              </Typography>
            </RadioGroup>
          </Box>

          <Box>
            <Typography variant="h6">カラーテーマ</Typography>
            <Typography variant="subtitle2"></Typography>
            <RadioGroup
              onChange={changeTheme}
              className={classes.settingsChoices}
              value={theme}
            >
              <FormControlLabel
                key="auto"
                value="auto"
                control={<Radio />}
                label="ブラウザ"
              />
              <Typography variant="subtitle2">
                ブラウザの設定に従い、ライトモードまたはダークモードで表示します。
              </Typography>

              <FormControlLabel
                key="dark"
                value="dark"
                control={<Radio />}
                label="ダークモード"
              />
              <Typography variant="subtitle2">
                <b>黒</b>を基調としたカラーテーマです。
              </Typography>

              <FormControlLabel
                key="light"
                value="light"
                control={<Radio />}
                label="ライトモード"
              />
              <Typography variant="subtitle2">
                <b>白</b>を基調としたカラーテーマです。
              </Typography>
            </RadioGroup>
          </Box>

          <SettingsRandom />

          <Box>
            <Typography variant="h6">問題再ダウンロード</Typography>
            <Box className={classes.downloadButton}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleReFetch}
              >
                ダウンロード
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

function SettingsRandom() {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  const random = useAppSelector(selectSettingsRandom);
  const changeRandom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value as string;

    switch (newTheme) {
      case 'true':
        dispatch(setRandom(true));
        break;
      case 'false':
        dispatch(setRandom(false));
        break;

      default:
        break;
    }
  };

  return (
    <Box>
      <Typography variant="h6">ランダムモード</Typography>
      <Typography variant="subtitle2"></Typography>
      <RadioGroup
        aria-label="randomRadio"
        name="randomRadio"
        onChange={changeRandom}
        className={classes.settingsChoices}
        value={String(random)}
      >
        <FormControlLabel
          key="true"
          value="true"
          control={<Radio />}
          label="ランダムに選択肢を並び変える"
        />
        <FormControlLabel
          key="false"
          value="false"
          control={<Radio />}
          label="ランダムに選択肢を並び変えない"
        />
      </RadioGroup>
    </Box>
  );
}
