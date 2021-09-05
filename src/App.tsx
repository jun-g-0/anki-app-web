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

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  fetchQuestions,
  selectQuestionsLastUpdate,
} from './features/questions/questionsSlice';
import { fetchUser } from './features/user/userSlice';

// React
function App() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();
  const questionsLastUpdate = useAppSelector(selectQuestionsLastUpdate);

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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
