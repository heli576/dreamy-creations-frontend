import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  buttons:{

   textAlign:"center",
   "&:focus":{
     outline:"none",
   },

   "&:hover":{
     color:"#fff"
   }
 },

}));

const Checkout=({products})=>{
  const classes = useStyles();
  const getTotal=()=>{
    return products.reduce((currentValue,nextValue)=>{
      return currentValue+nextValue.count*nextValue.price;
    },0);
  };
  const showCheckout=()=>{
    return(
      isAuthenticated()?(<Button  variant="contained" color="secondary" component={Link} to="/cart" className={classes.buttons}>
        Checkout
      </Button>

    ):(
      <Button  variant="contained" color="secondary" component={Link} to="/signin" className={classes.buttons}>
        Login
      </Button>
    )
    )
  }
  return(
    <div><h5>Total:₹{getTotal()}</h5>
{showCheckout()}
    </div>
  );
};

export default Checkout;
