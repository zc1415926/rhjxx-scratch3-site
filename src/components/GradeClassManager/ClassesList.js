import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    formControl: {
      minWidth: 120,
    },
  });

export default function ClassesLists(props){
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    setAge(event.target.value);
    props.onGradeSelectChanged(event.target.value);
  };
  return (
    <div className={classes.root}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">请选择年级</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={age}
          onChange={handleChange}
        >
          {props.gradeInfo.map(item=>{
            return <MenuItem key={item.gradeNum} value={item.gradeNum}>{item.gradeName}</MenuItem>
          })}

        </Select>
      </FormControl>
      
      {/* {
      //没有数据时，不会执行map函数，也就是什么也不显示
      //获取到数据，又要执行map就刷新了组件
      props.gradeInfo.map((gradeItem)=>{
        return(

              <ClassesTable ClassesData={gradeItem.classes} gradeName={gradeItem.name}/>

        );
      })} */}
    </div>
  );
}