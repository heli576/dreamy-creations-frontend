import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import Button from '@material-ui/core/Button';
import Logo from "../images/logo.png";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getProducts} from './apiCore';
import {API} from "../config";


const useStyles = makeStyles((theme) => ({
  buttons:{
marginTop:10,
width:100,
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
rows={4}
variant="outlined"
/>
<Button  variant="contained" color="primary" onClick={displayRazorpay}  className={classes.buttons}>
  Pay
</Button>

</form>
    ):null}
    </div>
  )
  function loadScript(src) {
  	return new Promise((resolve) => {
  		const script = document.createElement('script')
  		script.src = src
  		script.onload = () => {
  			resolve(true)
  		}
  		script.onerror = () => {
  			resolve(false)
  		}
  		document.body.appendChild(script)
  	})
  }

  const __DEV__ = document.domain === 'localhost'




  	async function displayRazorpay() {
  		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

  		if (!res) {
  			alert('Razorpay SDK failed to load. Are you online?')
  			return
  		}


const paymentData={
  amount:getTotal(products)
}

  const data=await fetch(`${API}/razorpay/${userId}`,{method:'POST',headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
     },body:JSON.stringify(paymentData)}).then((t) =>
			t.json()
		)




  		const options = {
  			key: __DEV__ ? process.env.REACT_APP_API_TEST_KEY : 'PRODUCTION_KEY',
  			currency: data.currency,
  			amount:data.amount.toString(),
  			order_id: data.id,
  			name: 'Dreamy Creations',
  			description: 'Thank you for purchase',
  			image: {Logo},
  			handler: function (response) {
  				alert(response.razorpay_payment_id)
  				alert(response.razorpay_order_id)
  				alert(response.razorpay_signature)
  			},

  		}
  		const paymentObject = new window.Razorpay(options)
  		paymentObject.open()
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

    <CardContent>
    <Typography gutterBottom variant="h5" component="h2">
            Total:₹{getTotal()}
          </Typography>

{showCheckout()}
</CardContent>

    </Card>
  );
};

export default Checkout;
