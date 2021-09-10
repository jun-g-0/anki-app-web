import React, { useEffect } from 'react';

// for design
import CssBaseline from '@material-ui/core/CssBaseline';

// for components
import AnkiDrawer from './components/Drawer';
import AnkiAppBar from './components/AppBar';
import AnkiQuesList from './components/QuesList';
import AnkiHome from './components/Home';
import AnkiTraining from './components/Training';
import AnkiSetting from './components/Setting';
import AnkiAdmin from './components/Admin';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  fetchQuestions,
  selectQuestionsLastUpdate,
} from './features/questions/questionsSlice';
import { fetchUser, selectUser } from './features/user/userSlice';
import {
  fetchAnswerLog,
  selectAnswerLog,
} from './features/answerLog/answerLogSlice';
import {
  fetchSettings,
  selectSettings,
} from './features/settings/settingsSlice';

// React
function App() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const questionsLastUpdate = useAppSelector(selectQuestionsLastUpdate);
  const user = useAppSelector(selectUser);
  const settings = useAppSelector(selectSettings);
  const answerLog = useAppSelector(selectAnswerLog);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // 前回のダウンロードから3日経っていた場合のみ、再ダウンロードする
    if (questionsLastUpdate + 1000 * 60 * 60 * 24 * 5 < Date.now()) {
      dispatch(fetchQuestions());
    }
    dispatch(fetchUser());
  }, [dispatch, questionsLastUpdate]);

  useEffect(() => {
    if (user.isSignedIn === 'signedIn') {
      const userUid = user.ankiUser?.uid as string;
      dispatch(fetchAnswerLog({ userUid }));
      dispatch(fetchSettings({ userUid }));
    }
  }, [dispatch, user]);

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
          <Route path='/training'>
            <AnkiTraining />
          </Route>
          <Route path='/queslist'>
            <AnkiQuesList />
          </Route>
          <Route path='/settings'>
            <AnkiSetting />
          </Route>
          <Route path='/admin'>
            <AnkiAdmin />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
