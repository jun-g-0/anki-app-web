import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import axios from 'axios';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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

  const handleAnswered = (e) => {
    console.log(value);
    setAnswered(true);
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
        ) : (
          <Box>不正解</Box>
        )}
        <Button variant="contained" color="primary" onClick={handleAnswered}>
          正答
        </Button>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setView('traning');
            props.setQuesNum(1);
          }}
        >
          前の問題
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setView('traning');
            props.setQuesNum(1);
          }}
        >
          次の問題
        </Button>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setView('traning');
          }}
        >
          解説
        </Button>
      </Container>
    </React.Fragment>
  );
}
