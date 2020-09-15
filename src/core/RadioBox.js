import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
controllabel:{
  marginTop:-5,
  marginBottom:-5
}
}));

const RadioBox=({prices,handleFilters})=>{
  const [value,setValue]=useState(0);
  const classes = useStyles();
  const handleChange=(event)=>{
    handleFilters(event.target.value);
    setValue(event.target.value)
  }
  return prices.map((p,i)=>(

         <FormControlLabel
         value={`${p._id}`}
           control={<Radio color="primary"/>}
           key={i}
           className={classes.controllabel}
            label={p.name}
           onChange={handleChange}
           name={p}
         />


  ))
}

export default RadioBox;
