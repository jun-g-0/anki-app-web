import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  home: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '20px',
  },
}));

export default function AnkiHome(props) {
  const classes = useStyles();

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
      </Container>
    </React.Fragment>
  );
}
