import { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import firebase, { auth } from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { Link } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUser, fetchUser } from '../features/user/userSlice';

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
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

export default function AnkiHome() {
  const classes = useStyles();

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('dispatch(fetchUser()): ', dispatch(fetchUser()));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log('1');
  //   auth.onAuthStateChanged((user) => {
  //     console.log('2');
  //     if (user) {
  //       console.log('auth.onAuthStateChanged((user) > true');
  //       dispatch(
  //         userSignIn({
  //           uid: user.uid,
  //           displayName: user.displayName,
  //           email: user.email,
  //         })
  //       );
  //     } else {
  //       console.log('auth.onAuthStateChanged((user) > false');
  //       dispatch(userSignOut());
  //     }
  //   });
  //   console.log('3');
  // }, []);

  return (
    <>
      <Container maxWidth='xl' className={classes.home}>
        <Typography
          component='h2'
          variant='h4'
          color='textPrimary'
          gutterBottom
        >
          資格取得補助システム
        </Typography>
        <Link to='/training'>
          <Button variant='contained' color='primary'>
            演習開始
          </Button>
        </Link>
        <div style={{ whiteSpace: 'pre-line' }}>
          {user.isSignedIn === 'signedIn' ? (
            `\n${user.ankiUser && user.ankiUser.displayName}さん、こんにちは！`
          ) : user.isSignedIn === 'NotSignedIn' ? (
            <StyledFirebaseAuth uiConfig={loginUiConfig} firebaseAuth={auth} />
          ) : null}
        </div>
      </Container>
    </>
  );
}
