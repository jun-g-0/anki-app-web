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

// Setting context
export const defaultSetting = {
  toggle: function (key) {
    this[key] = !this[key];
  },
  change: function (key, val) {
    this[key] = val;
  },
  tapMode: 'tapMode',
  colorTheme: 'purple',
  headColor: 'purple',
  backColor: 'gray',
  textColor: 'black',
  textSize: '10px',
};

export const SettingContext = React.createContext(defaultSetting);

// React
export default function App() {
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
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    // get all qa-data
    const snapshot = await db.collection('demo-qa').get();
    let tmp = [];
    snapshot.forEach((doc) => {
      tmp.push(doc.data());
    });
    tmp.sort((a, b) => +a.questionId - +b.questionId);
    setQuestions(tmp);
    console.log(tmp);
  };

  const getLocalSetting = () => {
    const jsonText = localStorage.getItem(SETTING_LOCAL_KEY);
    const parsedText = JSON.parse(jsonText);
    for (const k of Object.keys(parsedText)) {
      setting.change(k, parsedText[k]);
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
