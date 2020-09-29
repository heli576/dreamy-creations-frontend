import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import Button from '@material-ui/core/Button';
import Logo from "../images/logo.png";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getProducts, processPayment} from './apiCore';


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

const Checkout=({products,setRun=f=>f,run=undefined})=>{
  const classes = useStyles();
  const [data,setData]=useState({
    loading:false,
    success:false,
    error:'',
    address:''
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
   const token = isAuthenticated() && isAuthenticated().token;
   const _DEV_=document.domain==="localhost";
  const getTotal=()=>{
    return products.reduce((currentValue,nextValue)=>{
      return currentValue+nextValue.count*nextValue.price;
    },0);

  };

  const handleAddress=event=>{
    setData({...data,address:event.target.value});
  }

  const showDropIn=()=>(
    <div onBlur={()=>setData({...data,error:''})}>
    {products.length>0?(
<form noValidate>
<TextField
id="address"
name="address"
type="text"
label="Address"
className={classes.textField}
value={data.address}
onChange={handleAddress}
fullWidth
multiline
rowsMax={4}
variant="outlined"
/>
<Button  variant="contained" color="primary" onClick={displayRazorpay}  className={classes.buttons}>
  Pay
</Button>

</form>
    ):null}
    </div>
  )



async function displayRazorpay(){
    const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if(!res){
      alert("Razorpay failed to load");
      return
    }

    const amount=getTotal(products);
    processPayment(userId,token,amount);
      console.log(data);
      const options = {
      key:_DEV_?process.env.REACT_APP_API_TEST_KEY:"API_NOT_AVAILABLE", // Enter the Key ID generated from the Dashboard
      amount:getTotal(products)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency:data.currency,
      name: "Dreamy Creations",
      description: "Thank you for the purchase",
      image: {Logo},
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response){
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature)
      },
      "prefill": {
          "name": "Gaurav Kumar",
          "email": "gaurav.kumar@example.com",
          "contact": "9999999999"
      },

  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
    }




const loadScript=(src)=>{
  return new Promise((resolve)=>{
    const script=document.createElement("script")
    script.src=src

    script.onload=()=>{
      resolve(true)
    }
    script.onerror=()=>{
      resolve(false)
    }
    document.body.appendChild(script)
  })


}

  const showCheckout=()=>{
    return(
      isAuthenticated()?<div>{showDropIn()}</div>

    :(
      <Button  variant="contained" color="secondary" component={Link} to="/signin" className={classes.buttons}>
        Login
      </Button>
    )
    )
  }
  return(
    <Card>
    <CardActionArea>
    <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
            Total:₹{getTotal()}
          </Typography>

{showCheckout()}
</CardContent>
    </CardActionArea>
    </Card>
  );
};

export default Checkout;
