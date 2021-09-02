import React, { useState, useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import AnkiResult from './Result';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectSettings } from '../features/settings/settingsSlice';
import { selectQuestions } from '../features/questions/questionsSlice';
import { logUpdate } from '../features/answerLog/answerLogSlice';

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

export default function AnkiTraining() {
  const classes = useStyles();
  let { path, url } = useRouteMatch();
  let history = useHistory();
  const dispatch = useAppDispatch();

  // questions
  const questions = useAppSelector(selectQuestions);

  // result
  const [sessionSelected, setSessionSelected] = useState<{
    [key: number]: number | number[] | string;
  }>({});

  // selected choices
  const [selectedValue, setSelectedValue] = useState('');
  const [quesNum, setQuesNum] = useState(0);

  // settings
  const settings = useAppSelector(selectSettings);

  // question now
  const question = useMemo(() => questions[quesNum], [questions, quesNum]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (settings.tapMode === 'tapMode') {
      handleAnsweredTrue();
    }
    setSelectedValue(e.target.value);

    const tmp = sessionSelected;
    tmp[question.questionId] = e.target.value;
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
    console.log(questions[quesNum + 1]);
    setQuesNum(quesNum + 1);
  };

  const handleMovePrev = () => {
    handleAnsweredFalse();
    console.log(questions[quesNum - 1]);
    setQuesNum(quesNum - 1);
  };

  const handleResult = () => {
    handleAnsweredFalse();
    console.log(sessionSelected);

    dispatch(
      logUpdate({
        questions,
        session: {
          answer: sessionSelected,
        },
      })
    );

    history.push(`${url}/result`);
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
              <Box>ID: {question.questionId}</Box>
              <p style={{ whiteSpace: 'pre-line' }}>
                {question.questionText.replaceAll('\\n', '\n')}
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
                    question.choices.map((e) => (
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
              {answered && +selectedValue === +question.answer ? (
                <p>正解です!🎉</p>
              ) : answered ? (
                <p>不正解です。</p>
              ) : null}
              {answered && (
                <div style={{ whiteSpace: 'pre-line' }}>
                  <p>解説</p>
                  <p>{question.desc.replaceAll('\\n', '\n')}</p>
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
              {quesNum !== questions.length - 1 && (
                <Button
                  variant='contained'
                  color='primary'
                  onClick={handleMoveNext}
                >
                  次の問題
                </Button>
              )}
              {quesNum === questions.length - 1 && (
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
            sessionSelected={sessionSelected}
            setSessionSelected={setSessionSelected}
            setQuesNum={setQuesNum}
          />
        </Route>
      </Switch>
    </>
  );
}
