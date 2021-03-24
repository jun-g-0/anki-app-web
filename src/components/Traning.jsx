import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
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
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // controll answer
  const [answered, setAnswered] = useState(false);

  const handleAnsweredTrue = () => {
    console.log(value);
    setAnswered(true);
  };

  const handleAnsweredFalse = () => {
    setAnswered(false);
  };

  // controll move
  const handleMoveNext = () => {
    console.log(props.questions.length);
    if (props.quesNum === props.questions.length - 1) {
      return;
    }
    handleAnsweredFalse();
    props.setQuesNum(props.quesNum + 1);
  };

  // controll move
  const handleMovePrev = () => {
    if (props.quesNum === 0) {
      return;
    }
    handleAnsweredFalse();
    props.setQuesNum(props.quesNum - 1);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.home}>
        <Box>ID: {props.question.id}</Box>
        <Box>{props.question.question}</Box>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="choices"
            name="choices1"
            value={value}
            onChange={handleChange}
          >
            {props.choices.map((e) => (
              <FormControlLabel
                key={e.id}
                value={String(e.id)}
                control={<Radio />}
                label={e.choice}
                className={
                  answered && e.is_correct ? classes.afterAnswer : null
                }
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        {answered &&
        +value === props.choices.filter((e) => e.is_correct)[0].id ? (
          <Box>🎉🎉🎊💮正解です!💮🎊🎉🎉</Box>
        ) : // <Box>正解です。</Box>
        answered ? (
          <Box>不正解です。</Box>
        ) : null}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAnsweredTrue}
        >
          正答
        </Button>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <Button variant="contained" color="primary" onClick={handleMovePrev}>
          前の問題
        </Button>
        <Button variant="contained" color="primary" onClick={handleMoveNext}>
          次の問題
        </Button>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setQuesNum(2);
          }}
        >
          解説
        </Button>
      </Container>
    </React.Fragment>
  );
}
