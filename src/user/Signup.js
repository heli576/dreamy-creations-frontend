import React,{useState} from "react";
import {Link,Redirect} from "react-router-dom";
import {signup} from "../auth";
import Appbar from "../core/Appbar";
import Logo from "../images/logo.png";
import Main from "../images/main.png";
import Footer from "../core/Footer";
import { makeStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";



const useStyles = makeStyles((theme) => ({
...theme.spreadThis,
image:{
width:"100%",
height:400
},
textField:{
  [theme.breakpoints.down('sm')]: {
   width:"85%",
   margin:"5px auto"
 },
  [theme.breakpoints.up('md')]: {
    margin:"5px auto",
    width:"100%"
  }
},
paper:{
marginTop:-300,
  padding:40,
  [theme.breakpoints.down('sm')]: {
   margin:"-300px 20px 0 20px"
 }
},
logo:{
  height:80,
  width:80
}




}));

const Signup=()=>{
  const classes = useStyles();

 const [values,setValues]=useState({
   name:"",
   email:"",
   password:"",
   error:"",
   success:false,

 });

 const {name,email,password,error,success}=values;

const handleChange=(name)=>(event)=>{
  setValues({...values,error:false,[name]:event.target.value});
};

const handleSubmit=(event)=>{
  event.preventDefault()
  setValues({...values,error:false});
  signup({name,email,password})
  .then(data=>{
    if(data.error){
      setValues({...values,error:data.error,success:false})
    }else{
      setValues({
        ...values,
        name:"",
        password:"",
        email:"",
        error:"",
        success:true,

      })
    }

  })
}

const signUpForm=()=>(
    <div>
<img src={Main} alt="wallpaper" className={classes.image}/>
  <Grid container className={classes.form}>
  <Grid item sm/>
  <Grid item sm>
  <Paper className={classes.paper}>
  <img src={Logo} className={classes.logo} alt="logo"/>
<Typography variant="h4" className={classes.pageTitle}>Signup</Typography>
<form noValidate onSubmit={handleSubmit} autoComplete="off">
<TextField
id="name"
name="name"
type="text"
label="Name"
className={classes.textField}
value={name}
onChange={handleChange("name")}
fullWidth/>
<TextField
id="email"
name="email"
type="email"
label="Email"
className={classes.textField}
value={email}
onChange={handleChange("email")}
fullWidth/>
<TextField
id="password"
name="password"
type="password"
label="Password"
className={classes.textField}
value={password}
onChange={handleChange("password")}
fullWidth/>
{showError()}
<Button
type="submit"
variant="contained"
color="secondary"
className={classes.button}
>Signup</Button>
<br />
{showSuccess()}
</form>
</Paper>
  </Grid>
  <Grid item sm/>
  </Grid>
  </div>
);

const showError=()=>{
  if(error){
    return(
      <Typography variant="body2" className={classes.customError}>
    {error}
      </Typography>
    )
  }

};

const showSuccess=()=>{
  if(success){
    return(
    <Redirect to="/signin"/>
    )
  }

}

  return(
    <div>
        <Appbar/>
        <div className={classes.root}>
{signUpForm()}
</div>
<Footer/>
</div>
  )
}


export default Signup;
