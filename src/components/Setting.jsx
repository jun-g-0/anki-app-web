import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from '@material-ui/core';

import { SettingContext } from '../App.js';

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
  settingChoices: {
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

export default function AnkiQuesList(props) {
  const classes = useStyles();
  const answerSetting = useContext(SettingContext);
  const [tapMode, SetTapMode] = useState(answerSetting.tapMode);

  const changeTapMode = (e) => {
    answerSetting.change('tapMode', e.target.value);
    SetTapMode(e.target.value);
  };

  return (
    <React.Fragment>
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
              className={classes.settingChoices}
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
    </React.Fragment>
  );
}
