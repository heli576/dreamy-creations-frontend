import React,{useState,useEffect} from "react";
import {isAuthenticated} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "../core/Appbar";
import Footer from "../core/Footer";
import {Link} from "react-router-dom";
import Main from "../images/main.png";
import Logo from "../images/logo.png";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import {getProduct,updateProduct,getCategories} from "./apiAdmin";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
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
  marginTop:-300,
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
 mediaform:{
   marginTop:8
 }



}));

const UpdateProduct=({match})=>{
  const classes = useStyles();


const [values,setValues]=useState({
  name:"",
  description:"",
  price:"",
  categories:[],
  category:"",
  media:"",
  loading:false,
  error:"",
  createdProduct:"",
  redirectToProfile:false,
  formData:"",


})
//destructure user from localstorage
const {user,token}=isAuthenticated();
const {name,description,price,categories,category,loading,error,createdProduct,redirectToProfile,formData}=values;

const init=(productId)=>{
  getProduct(productId).then(data=>{
    if(data.error){
      setValues({...values,error:data.error})
    }else{
      setValues({...values, name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    formData: new FormData()})
      initCategories();
    }
  })
}

// load getCategories
const initCategories=()=>{
  getCategories().then(data=>{
    if(data.error){
      setValues({...values,error:data.error});
    }else{
      setValues({categories:data,formData:new FormData()});
    }
  });
};


useEffect(() => {
       init(match.params.productId);
   }, []);


const handleChange=(name)=>(event)=>{
  const value=name==="media"?event.target.files[0]:event.target.value;
formData.set(name,value);
  setValues({...values,[name]:value});
}
const handleSubmit=(event)=>{
event.preventDefault();
  event.target.reset();


setValues({...values,error:"",loading:true,createdProduct:""});

updateProduct(match.params.productId,user._id,token,formData)
.then(data=>{
  if(data.error){
    setValues({...values,error:data.error,createdProduct:""});
  }else{

    setValues({
      ...values,name:"",description:"",media:"",price:"",loading:false,
      createdProduct:data.name,error:""
    });

  }
})
}
const showSuccess=()=>{
  if(createdProduct){
    return(
      <Typography variant="body2" className={classes.customSuccess}>
{`${createdProduct}`} is updated.
      </Typography>
    )
  }
};
const showError=()=>{
  if(error){

      return(
        <Typography variant="body2" className={classes.customError}>
  {error}
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


const showLoading=()=>
  loading&&(<CircularProgress size={20} className={classes.progress}/>)



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
    <Typography variant="h4" className={classes.pageTitle}>Update Product</Typography>

    <form noValidate onSubmit={handleSubmit}>
<TextField
id="name"
name="name"
type="text"

className={classes.textField}
value={name}
onChange={handleChange("name")}
fullWidth
/>
<TextField
id="description"
name="description"
type="text"

className={classes.textField}
value={description}
onChange={handleChange("description")}
fullWidth
multiline
rowsMax={4}
/>
<TextField
id="price"
name="price"
type="number"

className={classes.textField}
value={price}
onChange={handleChange("price")}
fullWidth
/>
<FormControl className={classes.textField}>
       <InputLabel htmlFor="age-native-simple">Category</InputLabel>
       <Select
         native
         onChange={handleChange("category")}

       >
         <option>Please select</option>
      {categories&&categories.map((c,i)=>(<option key={i} value={c._id}>{c.name}</option>))}
       </Select>
     </FormControl>
     <FormControl variant="outlined" className={classes.mediaform}>
         <OutlinedInput id="component-outlined" type="file"  name="media" accept="image/*,video/*" onChange={handleChange("media")}/>
       </FormControl>
       {showError()}
<Button
type="submit"
variant="contained"
color="secondary"
className={classes.buttons}
  disabled={loading}
>Update
{showLoading()}

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
<Footer/>
    </div>
  )

};

export default UpdateProduct;
