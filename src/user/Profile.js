import React,{useState,useEffect} from "react";
import {isAuthenticated} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Logo from "../images/logo.png";
import Main from "../images/main.png";
import Appbar from "../core/Appbar";
import {Link,Redirect} from "react-router-dom";
import {read,update,updateUser} from "./apiUser";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import Footer from "../core/Footer";


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

const Profile=({match})=>{
const classes = useStyles();
const [values,setValues]=useState({
  name:'',
  email:'',
  password:'',
  error:false,
  success:false
})
const {token}=isAuthenticated();
const {name,email,password,error,success}=values;

const init=(userId)=>{
  read(userId,token).then(data=>{
    if(data.error){
      setValues({...values,error:true});
    }else{
      setValues({...values,name:data.name,email:data.email});
    }
  });

};

useEffect(()=>{
  init(match.params.userId);
},[]);

const handleChange=name=>e=>{
  setValues({...values,error:false,[name]:e.target.values});
}

const handleSubmit=(e)=>{
  e.preventDefault();
  update(match.params.userId,token,{name,email,password}).then(data=>{
    if(data.error){
      console.log(data.error);
    }else{
      updateUser(data,()=>{
        setValues({...values,name:data.name,email:data.email,success:true});
      });
    }
  });
};
const redirectUser=(success)=>{
  if(success){
    return <Redirect to="/cart" />;
  }
};

const profileUpdate=(name,email,password)=>(
  <div>
<img src={Main} alt="wallpaper" className={classes.image}/>
<Grid container className={classes.form}>
<Grid item sm/>
<Grid item sm>
<Paper className={classes.paper}>
<img src={Logo} className={classes.logo} alt="logo"/>
<Typography variant="h4" className={classes.pageTitle}>Update Profile</Typography>
<form>
           <div className="form-group">
               <label className="text-muted">Name</label>
               <input type="text" onChange={handleChange('name')} className="form-control" value={name} />
           </div>
           <div className="form-group">
               <label className="text-muted">Email</label>
               <input type="email" onChange={handleChange('email')} className="form-control" value={email} />
           </div>
           <div className="form-group">
               <label className="text-muted">Password</label>
               <input type="password" onChange={handleChange('password')} className="form-control" value={password} />
           </div>

           <button onClick={handleSubmit} className="btn btn-primary">
               Submit
           </button>
       </form>

</Paper>
</Grid>
<Grid item sm/>
</Grid>
</div>

)
return(
  <div>
      <Appbar/>
      <div className={classes.root}>
       {profileUpdate(name, email, password)}
       {redirectUser(success)}
      </div>
<Footer/>
</div>
);
}

export default Profile;
