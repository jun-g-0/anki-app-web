import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import firebase, { auth } from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUser, selectUserDisplayName } from '../features/user/userSlice';

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
  const history = useHistory();
  const user = useAppSelector(selectUser);
  const userName = useAppSelector(selectUserDisplayName);

  function handleStart() {
    history.push('/training');
  }

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
        <Button variant='contained' color='primary' onClick={handleStart}>
          演習開始
        </Button>
        <div style={{ whiteSpace: 'pre-line' }}>
          {user.isSignedIn === 'signedIn' ? (
            `\n${userName}さん、こんにちは！`
          ) : user.isSignedIn === 'NotSignedIn' ? (
            <StyledFirebaseAuth uiConfig={loginUiConfig} firebaseAuth={auth} />
          ) : null}
        </div>
      </Container>
    </>
  );
}
