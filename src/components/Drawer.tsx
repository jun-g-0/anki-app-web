import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';

import { useHistory } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectUser, signOutThunk } from '../features/user/userSlice';

const drawerWidth = 240;

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

type Props = {
  handleDrawerClose: () => void;
  open: boolean;
};

export default function AnkiDrawer(props: Props) {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  let history = useHistory();

  function firebaseLogout() {
    dispatch(signOutThunk());
  }

  function handleClickHome() {
    history.push('/');
  }

  function handleClickTraining() {
    history.push('/training');
  }

  function handleClickQuesList() {
    history.push('/queslist');
  }

  function handleClickSetting() {
    history.push('/settings');
  }

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
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
            key='home'
            onClick={() => {
              props.handleDrawerClose();
              handleClickHome();
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='ホーム' />
          </ListItem>

          <ListItem
            button
            key='training'
            onClick={() => {
              props.handleDrawerClose();
              handleClickTraining();
            }}
          >
            <ListItemIcon>
              <PlayCircleFilledWhiteIcon />
            </ListItemIcon>
            <ListItemText primary='演習' />
          </ListItem>

          <ListItem
            button
            key='queslist'
            onClick={() => {
              props.handleDrawerClose();
              handleClickQuesList();
            }}
          >
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary='質問一覧' />
          </ListItem>

          <ListItem
            button
            key='settings'
            onClick={() => {
              props.handleDrawerClose();
              handleClickSetting();
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='設定変更' />
          </ListItem>

          <ListItem
            button
            key='logout'
            onClick={() => {
              firebaseLogout();
              props.handleDrawerClose();
              handleClickHome();
            }}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='ログアウト' />
          </ListItem>

          {user.isSignedIn === 'signedIn' && (
            <ListItem>
              <ListItemText primary={`ユーザ: ${user.displayName}さん`} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
}
