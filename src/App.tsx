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
import firebase, { db } from './Firebase.js';

type Setting = {
  tapMode: string;
}

// Setting context
export const defaultSetting = {
  tapMode: 'tapMode',
};

export const SettingContext = React.createContext(defaultSetting);

type Choice = {
  choiceId: number;
  choiceText: string;
};

type Question = {
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
  const setting = useContext(SettingContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // controll data
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

  const getLocalSetting = () => {
    const jsonText = localStorage.getItem(SETTING_LOCAL_KEY);
    if (jsonText) {
      const parsedText = JSON.parse(jsonText);
      for (const k of Object.keys(parsedText)) {
        // setting.change(k, parsedText[k]);
      }
    }
  };

  useEffect(() => {
    fetchQuestions();
    getLocalSetting();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <AnkiAppBar open={open} handleDrawerOpen={handleDrawerOpen} />

      <AnkiDrawer
        handleDrawerClose={handleDrawerClose}
        open={open}
        setView={setView}
      ></AnkiDrawer>

      {view === 'home' && <AnkiHome setView={setView} />}
      {view === 'traning' && (
        <AnkiTraning questions={questions} setView={setView} />
      )}
      {view === 'queslist' && <AnkiQuesList questions={questions} />}
      {view === 'setting' && <AnkiSetting />}
    </React.Fragment>
  );
}

export default App;