import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { API } from "../config";
import {Link} from "react-router-dom";
import {addItem} from "./cartHelpers";
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme)=>({
  root: {
    width: 500,
    margin:"50px auto 10px 100px",
    paddingBottom:15,
    [theme.breakpoints.down('sm')]: {
      width: "90%",
      margin:"50px auto 10px auto",
      paddingBottom:15,
   }



  },
  title:{
fontSize:30,
color:"#051c33"
  },

  buttons:{

   textAlign:"center",
marginLeft:20,
   "&:hover":{
     color:"#fff"
   },

 },
 description:{
   marginTop:20,
   marginLeft:5,
   fontSize:18,
 },
 chip1:{
   textAlign:"center",
   width:200,
   marginBottom:10,
   fontSize:18,

 },
 chip2:{
   textAlign:"center",
   width:100,
   marginBottom:10,
   marginLeft:20,
   fontSize:18,
 },
 add:{
   marginTop:5
 },



  video:{
    objectFit:"cover",
    [theme.breakpoints.down('sm')]: {
  height:300
   }
  }
}));

const SingleProduct=({product})=>{
  const classes = useStyles();
  const [redirect,setRedirect]=useState(false);
  const addToCart=()=>{
    addItem(product,()=>{
      setRedirect(true);
    })
  }


  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardMedia
          component="video"
          alt="product media"
          height="400"
          image={`${API}/product/media/${product._id}`}
          title='video'
                    type='video/mp4'
                    controls
                    className={classes.video}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {product.name}
          </Typography>
          <Chip
       label={product.category&&product.category.name}
      className={classes.chip1}
       color="primary"
     />

     <Chip
     avatar={<Avatar>₹</Avatar>}
  label={product.price}
  className={classes.chip2}

  color="secondary"
/>

          <Typography variant="body1" component="p" className={classes.description}>
        {product.description}
          </Typography>



        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="secondary" onClick={addToCart} component={Link} to="/cart" className={classes.buttons}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
export default SingleProduct;
