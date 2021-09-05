import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import {
  Container,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectQuestions } from '../features/questions/questionsSlice';
import {
  selectAnswerLog,
  uploadAnswerLog,
} from '../features/answerLog/answerLogSlice';
import { selectLastSession } from '../features/session/sessionSlice';
import { selectUser } from '../features/user/userSlice';

const useStyles = makeStyles((_) => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
  question: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
  },
  questionIdAndResult: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'row',
    padding: '20px',
  },
  questionDetail: {
    display: 'flex',
    alignItems: 'left',
    flexDirection: 'column',
    padding: '0px 20px 20px 20px',
  },
}));

export default function AnkiResult() {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useAppDispatch();
  const questions = useAppSelector(selectQuestions);
  const lastSession = useAppSelector(selectLastSession);
  const answerLog = useAppSelector(selectAnswerLog);
  const user = useAppSelector(selectUser);

  const handleReturn = () => {
    history.push('/');
  };

  useEffect(() => {
    if (user.isSignedIn === 'signedIn') {
      const userUid = user.ankiUser?.uid as string; // when user signedIn, Uid must not be null.
      dispatch(uploadAnswerLog({ userUid, answerLog }));
    }
  }, [answerLog, dispatch, user.isSignedIn, user.ankiUser?.uid]);

  return (
    <>
      <Container maxWidth='md' className={classes.home}>
        <Container>
          {questions.map((question) => (
            <Container key={question.questionId} className={classes.question}>
              {/* {問題ID/回答} */}
              <Container className={classes.questionIdAndResult}>
                <Typography>{`問題ID: ${question.questionId}`}</Typography>
                <Typography style={{ padding: '0px 0px 0px 20px' }}>
                  {Number(lastSession.selectedAnswers[question.questionId]) ===
                  Number(question.answer)
                    ? '正解 '
                    : '不正解'}
                </Typography>
                <Typography style={{ padding: '0px 0px 0px 20px' }}>
                  {`回答履歴: ${answerLog[question.questionId]
                    .toString()
                    .replaceAll('true', '◯')
                    .replaceAll('false', '×')
                    .replaceAll(',', '')}`}
                </Typography>
              </Container>

              <Container className={classes.questionDetail}>
                {/* {問題文} */}
                <Container
                  style={{
                    whiteSpace: 'pre-line',
                    padding: '0px 0px 10px 20px',
                  }}
                >
                  {question.questionText.replaceAll('\\n', '\n')}
                </Container>

                {/* {選択肢} */}
                <Container style={{ padding: '0px 0px 20px 40px' }}>
                  <RadioGroup
                    name='choicesRadio'
                    value={String(
                      lastSession.selectedAnswers[question.questionId]
                    )} // 選択肢はselectedValueと連動
                  >
                    {question.choices.map((e) => (
                      <FormControlLabel
                        key={e.choiceId}
                        value={String(e.choiceId)}
                        control={<Radio />}
                        label={`${
                          e.choiceId === question.answer ? '(正解) ' : ''
                        }${e.choiceText}`}
                        disabled
                      />
                    ))}
                  </RadioGroup>
                </Container>

                {/* {解説} */}
                <Container
                  style={{
                    whiteSpace: 'pre-line',
                    padding: '0px 0px 0px 20px',
                  }}
                >
                  {question.desc.replaceAll('\\n', '\n') || 'no desc'}
                </Container>
              </Container>
            </Container>
          ))}
        </Container>
        <Button variant='contained' color='secondary' onClick={handleReturn}>
          閲覧終了
        </Button>
      </Container>
    </>
  );
}
