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

export default function MySelect(props){
    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const valueChangeHandler = event => {
        setValue(event.target.value);
        //pass event.target.value to parent
        props.onSelectChanged(event.target.value);
    }

    return (
        <div className={classes.root}>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="grade-select-filled-label">{props.text}</InputLabel>
                <Select labelId="grade-select-filled-label" id="grade-select-filled"
                    value={value}
                    onChange={valueChangeHandler}
                >
                {props.items.map(item=>{
                    return <MenuItem key={item[props.itemNum]} value={item[props.itemNum]}>{item[props.itemName]}</MenuItem>
                })}

                </Select>
            </FormControl>
        </div>
    )
}