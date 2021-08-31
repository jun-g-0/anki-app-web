import React, { useEffect, useState, useContext } from 'react';

// for design
import CssBaseline from '@material-ui/core/CssBaseline';

// for components
import AnkiDrawer from './components/Drawer';
import AnkiAppBar from './components/AppBar';
import AnkiQuesList from './components/QuesList';
import AnkiHome from './components/Home';
import AnkiTraning from './components/Traning';
import AnkiSetting, { SETTING_LOCAL_KEY } from './components/Setting';

// for firebase
import firebase, { db } from './Firebase';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

type Choice = {
  choiceId: number;
  choiceText: string;
};

export type Question = {
  questionId: number;
  questionText: string;
  type: string;
  choices: Choice[];
  answer: number | number[] | string;
  desc: string;
};

// React
function App() {
  const [view, setView] = React.useState('home');
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // control data
  const [questions, setQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    // get all qa-data
    const snapshot = await db.collection('demo-qa').get();
    let tmp: Question[] = [];
    snapshot.forEach((doc) => {
      tmp.push(doc.data() as Question);
    });
    tmp.sort((a, b) => +a.questionId - +b.questionId);
    setQuestions(tmp);
    console.log(tmp);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <>
      <BrowserRouter>
        <CssBaseline />
        <AnkiAppBar open={open} handleDrawerOpen={handleDrawerOpen} />

        <AnkiDrawer
          handleDrawerClose={handleDrawerClose}
          open={open}
        ></AnkiDrawer>

        <Switch>
          <Route exact path='/'>
            <AnkiHome />
          </Route>
          <Route path='/traning'>
            <AnkiTraning questions={questions} />
          </Route>
          <Route path='/queslist'>
            <AnkiQuesList questions={questions} />
          </Route>
          <Route path='/setting'>
            <AnkiSetting />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
