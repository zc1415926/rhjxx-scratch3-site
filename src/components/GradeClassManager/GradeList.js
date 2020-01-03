import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GradeTable from './GradeTable';
import ClassesTable from './ClassesTable';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
  });

export default function GradeClassesLists(props){

  const classes = useStyles();

  return (
    <div className={classes.root}>
        {
            //如果有数据就显示数据，如果没有就显示空字符串
            props.gradeClassesInfo.length>0?
                <GradeTable GradeData={props.gradeClassesInfo}/>
                :'' 
        }
    </div>
  );
}