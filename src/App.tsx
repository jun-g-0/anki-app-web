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

import {  useAppDispatch } from './app/hooks';
import {
  fetchQuestions,
} from './features/questions/questionsSlice';

// React
function App() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // control questions
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

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
          <Route path='/setting'>
            <AnkiSetting />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
