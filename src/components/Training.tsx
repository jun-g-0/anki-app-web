import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import AnkiResult from './Result';

// import Typography from '@material-ui/core/Typography';

import { Question } from '../App';

import { useAppSelector } from '../app/hooks';
import { selectSettings } from '../features/settings/settingsSlice';

import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';

export const HISTORY_KEY = 'ANKI_WEB_HISTORY';

const useStyles = makeStyles(() => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '20px',
  },
  afterAnswer: {
    color: 'green',
  },
}));

type Props = {
  questions: Question[];
};

export default function AnkiTraining(props: Props) {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  let history = useHistory();

  // control result
  const [sessionSelected, setSessionSelected] = useState<{
    [key: number]: string;
  }>({});

  // control select
  const [selectedValue, setSelectedValue] = useState('');
  const [quesNum, setQuesNum] = useState(0);
  const [answerLogs, setAnswerLogs] = useState<{ [key: number]: string }>({});

  const settings = useAppSelector(selectSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings.tapMode === 'tapMode') {
      handleAnsweredTrue();
    }
    setSelectedValue(e.target.value);

    const tmp = sessionSelected;
    tmp[props.questions[quesNum].questionId] = e.target.value;
    setSessionSelected(tmp);
  };

  // control answer
  const [answered, setAnswered] = useState(false);

  const handleAnsweredTrue = () => {
    setAnswered(true);
  };

  const handleAnsweredFalse = () => {
    setAnswered(false);
    setSelectedValue('');
  };

  // control move
  const handleMoveNext = () => {
    handleAnsweredFalse();
    console.log(props.questions[quesNum + 1]);
    setQuesNum(quesNum + 1);
  };

  const handleMovePrev = () => {
    handleAnsweredFalse();
    console.log(props.questions[quesNum - 1]);
    setQuesNum(quesNum - 1);
  };

  const handleResult = () => {
    handleAnsweredFalse();
    console.log(sessionSelected);
    saveHistory();
    history.push(`${url}/result`);
  };

  const saveHistory = () => {
    const oldHistory = localStorage.getItem(HISTORY_KEY);
    let hisObj: { [key: number]: string } = {};
    if (oldHistory) {
      hisObj = JSON.parse(oldHistory);
    }
    for (let i = 0; i < props.questions.length; i++) {
      const q = props.questions[i];
      let tf = +sessionSelected[q.questionId] === q.answer ? 't' : 'f';
      hisObj[q.questionId] = (tf + (hisObj[q.questionId] || '')).substr(0, 5);
    }
    const jsonHis = JSON.stringify(hisObj);
    console.log(jsonHis);
    localStorage.setItem(HISTORY_KEY, jsonHis);
    setAnswerLogs(hisObj);
  };

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <Container>
            {
              // 問題表示欄
            }
            <Container maxWidth='md' className={classes.home}>
              <Box>ID: {props.questions[quesNum].questionId}</Box>
              <p style={{ whiteSpace: 'pre-line' }}>
                {props.questions[quesNum].questionText.replaceAll('\\n', '\n')}
              </p>
            </Container>

            <Container maxWidth='md' className={classes.home}>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='choicesRadio'
                  name='choicesRadio'
                  value={selectedValue} // 選択肢はselectedValueと連動
                  onChange={handleChange}
                >
                  {
                    // 選択肢を一つずつ生成
                    props.questions[quesNum].choices.map((e) => (
                      <FormControlLabel
                        key={e.choiceId}
                        value={String(e.choiceId)}
                        control={<Radio />}
                        label={e.choiceText}
                        className={answered ? classes.afterAnswer : undefined}
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </Container>

            {
              // 正答表示/解説表示欄
            }
            <Container maxWidth='md' className={classes.home}>
              {settings.tapMode === 'buttonMode' && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleAnsweredTrue}
                >
                  正答
                </Button>
              )}
              {answered &&
              +selectedValue === +props.questions[quesNum].answer ? (
                <p>正解です!🎉</p>
              ) : answered ? (
                <p>不正解です。</p>
              ) : null}
              {answered && (
                <div style={{ whiteSpace: 'pre-line' }}>
                  <p>解説</p>
                  <p>{props.questions[quesNum].desc.replaceAll('\\n', '\n')}</p>
                </div>
              )}
            </Container>

            {
              // ナビゲーション欄
            }
            <Container maxWidth='md' className={classes.nav}>
              {quesNum !== 0 && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleMovePrev}
                >
                  前の問題
                </Button>
              )}
              {quesNum !== props.questions.length - 1 && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleMoveNext}
                >
                  次の問題
                </Button>
              )}
              {quesNum === props.questions.length - 1 && (
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={handleResult}
                >
                  回答終了
                </Button>
              )}
            </Container>
          </Container>
        </Route>
        <Route path={`${url}/result`}>
          <AnkiResult
            questions={props.questions}
            sessionSelected={sessionSelected}
            setSessionSelected={setSessionSelected}
            answerLogs={answerLogs}
            setQuesNum={setQuesNum}
          />
        </Route>
      </Switch>
    </>
  );
}
