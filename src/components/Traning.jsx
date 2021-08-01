import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((_) => ({
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
    fontWeight: '800',
  },
}));

export default function AnkiTraning(props) {
  const classes = useStyles();

  // controll select
  const [selectedValue, setSelectedValue] = useState('');
  const [quesNum, setQuesNum] = useState(0);

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  // controll answer
  const [answered, setAnswered] = useState(false);

  const handleAnsweredTrue = () => {
    setAnswered(true);
  };

  const handleAnsweredFalse = () => {
    setAnswered(false);
    setSelectedValue('');
  };

  // controll move
  const handleMoveNext = () => {

    for (const e of document.getElementsByName('choicesRadio')) {
      console.log(e)
    }

    handleAnsweredFalse();
    console.log(props.questions[quesNum + 1]);
    setQuesNum(quesNum + 1);
  };

  // controll move
  const handleMovePrev = () => {

    for (const e of document.getElementsByName('choicesRadio')) {
      console.log(e)
    }

    handleAnsweredFalse();
    console.log(props.questions[quesNum - 1]);
    setQuesNum(quesNum - 1);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.home}>
        <Box>ID: {props.questions[quesNum].questionId}</Box>
          <p
            style={{ whiteSpace: 'pre-line' }}>
            {props.questions[quesNum].questionText.replaceAll('\\n', '\n')}
          </p>
      </Container>

      <Container maxWidth="xl" className={classes.home}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="choicesRadio"
            name="choicesRadio"
            value={selectedValue} // 選択肢はselectedValueと連動している
            onChange={handleChange}
          >
            { // 選択肢を一つずつ生成
            props.questions[quesNum].choices.map((e) => (
              <FormControlLabel
                key={e.choiceId}
                value={String(e.choiceId)}
                control={<Radio />}
                label={e.choiceText}
                className={answered ? classes.afterAnswer : null}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Container>

      {
        // 正答表示/解説表示欄
      }
      <Container maxWidth="xl" className={classes.home}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAnsweredTrue}
        >
          正答
        </Button>
        {(answered && +selectedValue === +props.questions[quesNum].answer)
            ? (<p>🎉🎉🎊💮正解です!💮🎊🎉🎉</p>)
          : answered
            ? (<p>不正解です。</p>)
          : null}
        {answered
          && <div style={{ whiteSpace: 'pre-line' }}>
              <p>解説</p>
              <p>{props.questions[quesNum].desc.replaceAll('\\n', '\n')}</p>
             </div>}
      </Container>

      {
        // ナビゲーション欄
      }
      <Container maxWidth="xl" className={classes.nav}>
        {(quesNum !== 0)
          && <Button variant="contained" color="primary" onClick={handleMovePrev}>
          前の問題
        </Button>}
        {(quesNum !== props.questions.length - 1)
          && <Button variant="contained" color="primary" onClick={handleMoveNext}>
          次の問題
        </Button>}
      </Container>
    </React.Fragment>
  );
}
