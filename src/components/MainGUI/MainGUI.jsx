import React from 'react';
import {Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import MyAppBar from './AppBar';
import SideNavBar from './SideNavBar';
import HomePage from '../HomePage/HomePage';
import GradeClassManager from '../../containers/GradeClassManager/GradeClassManager';
import StudentManager from '../../containers/StudentManager/StudentManager';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function MainGUI(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar title='Scratch 3 Manager of Rhjxx'/>
      <SideNavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <Route path="/" exact component={HomePage} />
          <Route path="/GradeClass" component={GradeClassManager} />
          <Route path="/Student" component={StudentManager} />
      </main>
    </div>
  );
}