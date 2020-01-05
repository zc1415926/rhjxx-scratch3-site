import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    paper: {
      textAlign: 'center',
      backgroundColor: '#efefef',
      marginTop: 10,
      paddingTop: 150,
      paddingBottom: 30,
      height: 180
    },
  });

  export default function ClassesPlaceholderPaper(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
            <Paper className={classes.paper} >{props.children}</Paper>
            <div>&nbsp;</div>
      </div>
    );
  }