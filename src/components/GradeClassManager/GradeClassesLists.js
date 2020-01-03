import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
      <h2>这里要改成用select选择年级之后显示班级</h2>
      {
      //没有数据时，不会执行map函数，也就是什么也不显示
      //获取到数据，又要执行map就刷新了组件
      props.gradeClassesInfo.map((gradeItem)=>{
        return(
          <ExpansionPanel key={gradeItem.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} 
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
              <Typography className={classes.heading}>{gradeItem.name}级</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <ClassesTable ClassesData={gradeItem.classes}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        );
      })}
    </div>
  );
}