import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import firebase from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const useStyles = makeStyles(() => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
}));

const loginUiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default function AnkiHome(props) {
  const classes = useStyles();
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="xl" className={classes.home}>
        <Typography
          component="h2"
          variant="h4"
          color="textPrimary"
          gutterBottom
        >
          資格取得補助システム
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            props.setView('traning');
          }}
        >
          演習開始
        </Button>
        <div style={{ whiteSpace: 'pre-line' }}>
          {user ? (
            `\n${user.displayName}さん、こんにちは！`
          ) : (
            <StyledFirebaseAuth
              uiConfig={loginUiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
        </div>
      </Container>
    </React.Fragment>
  );
}
