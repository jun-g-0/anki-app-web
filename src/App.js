import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import AnkiDrawer from './components/Drawer';
import AnkiAppBar from './components/AppBar';

export default function App(props) {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // controll data
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const apiData = await axios.get('/api/questions');
    console.log(apiData.data);
    setQuestions(apiData.data);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AnkiAppBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <AnkiDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
      ></AnkiDrawer>

      <Toolbar />
      <Container>
        <ul>
          {questions.map((questions) => (
            <ul key={questions.id || questions.question}>
              <h5>{questions.question}</h5>
              <p>{questions.desc || 'no desc'}</p>
              <button onClick={(e) => console.log(e.target)}>console</button>
            </ul>
          ))}
        </ul>
      </Container>
    </React.Fragment>
  );
}
