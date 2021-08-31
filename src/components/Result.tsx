import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Container,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AnkiTraning from './Traning';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from 'react-router-dom';

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

type AnkiTraningProps = React.ComponentProps<typeof AnkiTraning>;

type Props = {
  sessionSelected: {
    [key: number]: string;
  };
  setSessionSelected: React.Dispatch<
    React.SetStateAction<{ [key: number]: string }>
  >;
  answerLogs: { [key: number]: string };
  setQuesNum: React.Dispatch<React.SetStateAction<number>>;
} & AnkiTraningProps;

export default function AnkiResult(props: Props) {
  const classes = useStyles();
  let history = useHistory();

  const handleReturn = () => {
    props.setSessionSelected({});
    props.setQuesNum(0);
    history.push('/');
  };

  return (
    <>
      <Container maxWidth='md' className={classes.home}>
        <Container>
          {props.questions.map((question) => (
            <Container key={question.questionId} className={classes.question}>
              {/* {問題ID/回答} */}
              <Container className={classes.questionIdAndResult}>
                <Typography>{`問題ID: ${question.questionId}`}</Typography>
                <Typography style={{ padding: '0px 0px 0px 20px' }}>
                  {+props.sessionSelected[question.questionId] ===
                  question.answer
                    ? '正解'
                    : '不正解'}
                </Typography>
                <Typography style={{ padding: '0px 0px 0px 20px' }}>
                  {`回答履歴: ${props.answerLogs[question.questionId]
                    .replaceAll('t', '◯')
                    .replaceAll('f', '×')}`}
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
                    aria-label='choicesRadio'
                    name='choicesRadio'
                    value={props.sessionSelected[question.questionId]} // 選択肢はselectedValueと連動
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
