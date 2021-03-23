import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
}));

export default function AnkiTraning(props) {
  const classes = useStyles();
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    console.log(props.question);
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.home}>
        <Box>ID: {props.question.id}</Box>
        <Box>{props.question.question}</Box>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <Box>ID: {props.question.id}</Box>
        <Box>{props.question.question}</Box>
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
            props.setQuesNum(1);
          }}
        >
          解説
        </Button>
      </Container>
    </React.Fragment>
  );
}
