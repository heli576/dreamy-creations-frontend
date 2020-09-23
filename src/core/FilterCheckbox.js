import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
controllabel:{
  marginTop:-5,
  marginBottom:-5
}
}));

const FilterCheckbox=({categories,handleFilters})=>{
  const classes = useStyles();
  const [checked,setChecked]=useState([]);
  const handleToggle=c=>()=>{
    const currentCategoryId=checked.indexOf(c);
    const newCheckedCategoryId=[...checked];
    if(currentCategoryId=== -1){
      newCheckedCategoryId.push(c);
    }else{
      newCheckedCategoryId.splice(currentCategoryId,1);
    }

    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  }
  return categories.map((c,i)=>(

         <FormControlLabel
           control={<Checkbox color="primary" onChange={handleToggle(c._id)} value={checked.indexOf(c._id=== -1)}/>}
           label={c.name}
           key={i}
           className={classes.controllabel}
         />


  ))
}

export default FilterCheckbox;
