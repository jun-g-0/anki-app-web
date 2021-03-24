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
}));

export default function AnkiTraning(props) {
  const classes = useStyles();

  // controll data
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    fetchChoices();
  }, []);

  async function fetchChoices() {
    const apiData = await axios.get('/api/v1/choices/' + props.question.id);
    setChoices(apiData.data);
  }

  // controll select
  const [select, setSelect] = useState('');

  const handleChange = (e) => {
    setSelect(e.target.value);
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.home}>
        <Box>ID: {props.question.id}</Box>
        <Box>{props.question.question}</Box>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <FormControl component="fieldset">
          <FormLabel component="legend"></FormLabel>
          <RadioGroup
            aria-label="choices"
            name="choices"
            value={select}
            onChange={handleChange}
          >
            {choices.map((e) => (
              <FormControlLabel
                key={e.id}
                value={e.id}
                control={<Radio />}
                label={e.choice}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Container>
      <Container maxWidth="xl" className={classes.home}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setView('traning');
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
