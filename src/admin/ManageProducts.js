import React,{useState,useEffect} from "react";
import {isAuthenticated} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "../core/Appbar";
import Footer from "../core/Footer";
import {Link} from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title:{
    marginTop:30,
  fontFamily:"Playball",
    textAlign:"center",
    fontSize:45,

    color:"#051c33"
  },
  root: {
   width: 800,

align:"center",
marginLeft:"25%",
marginRight:"25%",
padding:10,
[theme.breakpoints.down('sm')]: {
width:360,
marginLeft:0,
marginRight:0,
padding:10,


},

 },
  chip:{
    width:120,
    marginRight:20,
    [theme.breakpoints.down('sm')]: {
width:100,
marginRight:10,

},
    "&:hover":{
      color:"#fff",
      textDecoration:"none"
    }
  },






}));

const ManageProducts=()=>{
  const classes = useStyles();


const [products,setProducts]=useState([]);
//destructure user from localstorage
const {user,token}=isAuthenticated();


const loadProducts=()=>{
  getProducts().then(data=>{
    if(data.error){
      console.log(data.error);
    }else{
      setProducts(data);
    }
  })
}

const destroy=(productId)=>{
  deleteProduct(productId,user._id,token).then(data=>{
    if(data.error){
      console.log(data.error);
    }else{
      loadProducts();
    }
  })
}




useEffect(()=>{
  loadProducts();
},[]);




  return(
    <div>
    <Appbar/>
    <Typography gutterBottom variant="h5" component="h2"className={classes.title}>
    Total {products.length} gifts
    </Typography>

    <Paper className={classes.root}>
    <List component="nav">
  {products.map((p,i)=>(
    <div>
    <ListItem button>
      <ListItemText primary={p.name} />
      <Chip
      size="medium"
      label="Update"
      component={Link} to={`/admin/product/update/${p._id}`}
      color="primary"
      className={classes.chip}
      clickable

    />
    <Chip
    size="medium"
    label="Delete"
     onClick={() => destroy(p._id)}
    color="secondary"
    className={classes.chip}
    clickable

  />

    </ListItem>
    <Divider />
    </div>
  ))}


   </List>
   </Paper>
   <Footer/>
</div>



  )

};

export default ManageProducts;
