import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import firebase from '../Firebase';

const drawerWidth = 240;

function firebaseLogout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Logouted.')
    })
    .catch((error) => {
      console.log('Fail to logout. error: ' + error)
    });
}

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
}));

export default function AnkiDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [user, setUser] = useState();

  useEffect(()=> {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    });
  }, [])

  return (
    <React.Fragment>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          資格取得補助システム
          <IconButton onClick={props.handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key="home"
            onClick={() => {
              props.setView('home');
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="ホーム" />
          </ListItem>
          <ListItem
            button
            key="traning"
            onClick={() => {
              props.setView('traning');
            }}
          >
            <ListItemIcon>
              <PlayCircleFilledWhiteIcon />
            </ListItemIcon>
            <ListItemText primary="演習" />
          </ListItem>
          <ListItem
            button
            key="queslist"
            onClick={() => {
              props.setView('queslist');
            }}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="質問一覧" />
          </ListItem>
          <ListItem
            button
            key="setting"
            onClick={() => {
              props.setView('setting');
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="設定変更" />
          </ListItem>
          <ListItem
            button
            key="logout"
            onClick={() => {
              firebaseLogout();
              props.setView('home');
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="ログアウト"/>
          </ListItem>
          <ListItem>
            <ListItemText primary={user && `ユーザ: ${user.displayName}さん` }/>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}
