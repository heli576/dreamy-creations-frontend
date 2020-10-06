import React,{useState} from "react";
import {Redirect} from "react-router-dom";
import {signin,authenticate,isAuthenticated} from "../auth";
import Appbar from "../core/Appbar";
import Main from "../images/main.png";
import Logo from "../images/logo.png";
import {Link} from "react-router-dom";



import { makeStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';

import CircularProgress from '@material-ui/core/CircularProgress';



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
marginTop:-280,
  padding:40,
  [theme.breakpoints.down('sm')]: {
   margin:"-280px 20px 0 20px"
 }
},
logo:{
  height:80,
  width:80
}



}));

const Signin=()=>{
  const classes = useStyles();

 const [values,setValues]=useState({
   email:"",
   password:"",
   error:"",
   loading:false,
   redirectToReferrer:false
 });

 const {email,password,error,loading,redirectToReferrer}=values;
const {user}=isAuthenticated();
const handleChange=(name)=>(event)=>{
  setValues({...values,error:false,[name]:event.target.value});
};

const handleSubmit=(event)=>{
  event.preventDefault()
  setValues({...values,error:false,loading:true});
  signin({email,password})
  .then(data=>{
    if(data.error){
      setValues({...values,error:data.error,loading:false})
    }else{
    authenticate(data,()=>{
      setValues({
        ...values,
        redirectToReferrer:true,
      });
    });
    }
  });
};



  const signInForm=()=>(
    <div>
<img src={Main} alt="wallpaper" className={classes.image}/>
    <Grid container className={classes.form}>
    <Grid item sm/>

    <Grid item sm>


  <Paper className={classes.paper}>
  <img src={Logo} alt="logo" className={classes.logo}/>
    <Typography variant="h4" className={classes.pageTitle}>Login</Typography>

    <form noValidate onSubmit={handleSubmit}>
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
    disabled={loading}>Login
    {showLoading()}
    </Button>
    <br />
    <small>Don't have an account? Signup <Link to="/signup">here</Link></small>
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

const redirectUser=()=>{
  if(redirectToReferrer){
  if(user&&user.role===1){
      return <Redirect to="/admin/dashboard"/>
  }else{
      return <Redirect to="/user/dashboard"/>
  }
  }
  if(isAuthenticated())
  {
    return <Redirect to="/"/>
  }
}

const showLoading=()=>
loading&&(<CircularProgress size={20} className={classes.progress}/>);


  return(

  <div className={classes.root}>
      <Appbar/>
      <div>
{signInForm()}
{redirectUser()}
</div>
</div>
  )
}


export default Signin;
