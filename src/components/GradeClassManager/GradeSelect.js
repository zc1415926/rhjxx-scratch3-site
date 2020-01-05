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

export default function GradeSelect(props){
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const handleChange = event => {
    //先将select的值改为选中的值
    setAge(event.target.value);
    //再调用上级组件传入的函数并传入参数，完成子组件向父组件传递参数
    props.onGradeSelectChanged(event.target.value);
  };
  return (
    <div className={classes.root}>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="grade-select-filled-label">请选择年级</InputLabel>
        <Select
          labelId="grade-select-filled-label"
          id="grade-select-filled"
          value={age}
          onChange={handleChange}
        >
          {props.gradeInfo.map(item=>{
            return <MenuItem key={item.gradeNum} value={item.gradeNum}>{item.gradeName}</MenuItem>
          })}

        </Select>
      </FormControl>
    </div>
  );
}