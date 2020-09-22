import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Banner from "../images/cart.png";
import Appbar from "../core/Appbar";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import {getProducts} from "./apiCore";
import {getCart} from "./cartHelpers";
import ProductCard from "./ProductCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const useStyles = makeStyles((theme) => ({
banner:{
  width:"100%",
  height:500,
  marginTop:-30,
  display:"block",
  [theme.breakpoints.down('sm')]: {
  height:200,
  marginTop:-5
 }
},

title:{
  marginTop:70,
fontFamily:"Playball",
  fontSize:35,

  color:"#051c33",
  [theme.breakpoints.down('sm')]: {
  textAlign:"center",
}

},




}));

const Cart=()=>{
const classes = useStyles();
const [items,setItems]=useState([]);
useEffect(()=>{
  setItems(getCart())
},[]);

const showItems=items=>{
  return(

    <div>

    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
    Your cart has {`${items.length}`} items.
    </Typography>

    {items.map((product,i)=>(<ProductCard key={i}
      product={product}
      showAddToCartButton={false}
      cartUpdate={true}
      />))}
    </div>
  )
}

const noItemsMessage=()=>(
  <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
 Your cart is empty.<br/><Link to ="/shop">Continue shopping</Link>
  </Typography>

)



return (
  <div>
  <Appbar/>
<img src={Banner} alt="Banner" className={classes.banner}/>

<Container>
<Row>
 <Col xs={12} md={6}>
 <Row>
 <Col xs={12} md={12}>
 {items.length>0?showItems(items):noItemsMessage()}
 </Col>
 </Row>
 </Col>
 <Col xs={12} md={6}>
 </Col>
</Row>
</Container>


  </div>
);
}

export default Cart;
