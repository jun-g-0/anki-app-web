import React, { useEffect, useState } from 'react';
import axios from 'axios';

// for design
import CssBaseline from '@material-ui/core/CssBaseline';

// for components
import AnkiDrawer from './components/Drawer';
import AnkiAppBar from './components/AppBar';
import AnkiQuesList from './components/QuesList';
import AnkiHome from './components/Home';
import AnkiTraning from './components/Traning';

export default function App() {
  const [view, setView] = React.useState('home');
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // controll data
  const [questions, setQuestions] = useState([]);
  const [qids, setQids] = useState([]);
  const [choices, setChoices] = useState([]);
  const [quesNum, setQuesNum] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    const apiData = await axios.get('/api/v1/questions');
    console.log(apiData.data);
    setQuestions(apiData.data);
    setQids(apiData.data.map((e) => e.id));
    const choicesData = await axios.get('/api/v1/choices');
    console.log(choicesData.data);
    setChoices(choicesData.data);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AnkiAppBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <AnkiDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        setView={setView}
      ></AnkiDrawer>

      {view === 'home' && (
        <AnkiHome setView={setView} setQuesNum={setQuesNum} />
      )}
      {view === 'traning' && (
        <AnkiTraning
          questions={questions}
          question={questions.filter((e) => e.id === qids[quesNum])[0]}
          quesNum={quesNum}
          choices={choices.filter((e) => e.question_id === qids[quesNum])}
          setView={setView}
          setQuesNum={setQuesNum}
        />
      )}
      {view === 'queslist' && <AnkiQuesList questions={questions} />}
    </React.Fragment>
  );
}
