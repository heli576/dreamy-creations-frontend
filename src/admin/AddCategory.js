import React,{useState} from "react";
import {isAuthenticated} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "../core/Appbar";
import {Link} from "react-router-dom";
import Main from "../images/main.png";
import Logo from "../images/logo.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import {createCategory} from "./apiAdmin";

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
  marginTop:-200,
    padding:40,
    [theme.breakpoints.down('sm')]: {
     margin:"-280px 20px 0 20px"
   }
  },
  logo:{
    height:80,
    width:80
  },
  buttons:{
   width:150,
   textAlign:"center",


   marginTop:10,

   "&:hover":{
     color:"#fff"
   }
 },


}));

const AddCategory=()=>{
  const classes = useStyles();
  const [name,setName]=useState('');
  const [error,setError]=useState(false);
  const [success,setSuccess]=useState(false);

  //destructure user from localstorage
  const {user,token}=isAuthenticated();

  const handleChange=(e)=>{
setError('')
setName(e.target.value)

  }

const handleSubmit=(e)=>{
e.preventDefault();
setError('');
setSuccess(false);
// request to api
createCategory(user._id,token,{name})
.then(data=>{
  if(data.error){
    setError(true);
    setSuccess(false);
  }else{
    setError('');
    setSuccess(true);
  }
})

};
const showSuccess=()=>{
  if(success){
    return(
      <Typography variant="body2" className={classes.customSuccess}>
{name} is created.
      </Typography>
    )
  }
};
const showError=()=>{
  if(error){
    return(
      <Typography variant="body2" className={classes.customError}>
  {name} is already in use.
      </Typography>
    )
  }

};
const goBack=()=>{

    return(
      <Button
      variant="contained"
      color="primary"
      className={classes.buttons}
      component={Link} to="/admin/dashboard"
      >Dashboard

      </Button>

    )


};

  return(
    <div>
    <Appbar/>
    <div>
<img src={Main} alt="wallpaper" className={classes.image}/>
    <Grid container className={classes.form}>
    <Grid item sm/>

    <Grid item sm>


  <Paper className={classes.paper}>
  <img src={Logo} alt="logo" className={classes.logo}/>
    <Typography variant="h4" className={classes.pageTitle}>Add Category</Typography>

    <form noValidate onSubmit={handleSubmit}>
    <TextField
    id="name"
    name="name"
    type="text"
    label="Name"
    className={classes.textField}
value={name}
    onChange={handleChange}
    fullWidth
    required
    id="standard-required"/>
    {showError()}
    <Button
    type="submit"
    variant="contained"
    color="secondary"
    className={classes.buttons}
    >Add

    </Button>

    <br />
    {goBack()}
    {showSuccess()}
    </form>
      </Paper>
    </Grid>

    <Grid item sm/>
    </Grid>
    </div>

    </div>
  )

};

export default AddCategory;
