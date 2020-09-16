import React from 'react';
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


const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 345,
    marginTop:10,
    marginBottom:10,
    paddingBottom:15,


  },
  buttons:{

   textAlign:"center",

   "&:hover":{
     color:"#fff"
   }
 },
  video:{
    objectFit:"cover",
    [theme.breakpoints.down('sm')]: {
  height:200
   }
  }
}));

const ProductCard=({product})=>{
  const classes = useStyles();



  return (
    <Card className={classes.root}>
      <CardActionArea>
      <CardMedia
          component="video"
          alt="product media"
          height="300"
          image={`${API}/product/media/${product._id}`}
          title='video'
                    type='video/mp4'
                    controls
                    className={classes.video}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {product.name}
          </Typography>
          <Typography variant="h6" color="primary" component="p">
        ₹{product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" variant="contained" color="secondary"  component={Link} to={`/product/${product._id}`} className={classes.buttons}>
      View Product
      </Button>
        <Button size="small" variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
export default ProductCard;
