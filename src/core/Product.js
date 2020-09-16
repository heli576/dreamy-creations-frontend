import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from "./ProductCard";
import SingleProduct from "./SingleProduct";
import Typography from '@material-ui/core/Typography';
import {read,listRelated} from "./apiCore";
import Appbar from "./Appbar";
import Grid from "@material-ui/core/Grid";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const useStyles = makeStyles((theme)=>({
  ...theme.spreadThis,
  title:{
    marginTop:30,
  fontFamily:"Playball",
    textAlign:"center",
    fontSize:35,

    color:"#051c33"
  },
  container:{
  marginLeft:275,
  [theme.breakpoints.down('sm')]: {
marginLeft:"auto"
 }
  }

}));





const Product=(props)=>{
    const classes = useStyles();
  const [product,setProduct]=useState({});
  const [relatedProduct,setRelatedProduct]=useState([]);
  const [error,setError]=useState(false);

const loadSingleProduct=productId=>{
  read(productId).then(data=>{
    if(data.error){
      setError(data.error);
    }else{
      setProduct(data);
      listRelated(data._id).then(data=>{
        if(data.error){
          setError(data.error);
        }else{
          setRelatedProduct(data);
        }
      })
    }
  })
}

useEffect(()=>{
  const productId=props.match.params.productId;
  loadSingleProduct(productId);
},[props]);

  return(
    <div>
    <Appbar/>
    <div>
    <Grid container>
    <Grid item lg={4} md={4} sm={12} xs={12}>
     {product && product.description && <SingleProduct product={product}/>}
    </Grid>
    <Grid item lg={8} md={8} sm={12} xs={12}>
    <Container>
    <Typography gutterBottom variant="h5" component="h2"className={classes.title}>
    Similar Gifts
    </Typography>
<Row className={classes.container}>

{relatedProduct.map((p,i)=>(
  <Col xs={12} md={12} key={i}>
  <ProductCard product={p}/>
  </Col>
))}
</Row>
</Container>
    </Grid>


    </Grid>

    </div>
    </div>
  )
}

export default Product;
