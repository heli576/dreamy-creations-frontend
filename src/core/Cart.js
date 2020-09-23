import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Banner from "../images/cart.png";
import Appbar from "../core/Appbar";
import {Link} from "react-router-dom";

import {getCart} from "./cartHelpers";
import ProductCard from "./ProductCard";
import Checkout from "./Checkout";
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
 const [run, setRun] = useState(false);
useEffect(()=>{
  setItems(getCart())
},[run]);

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
      showRemoveProductButton={true}
      setRun={setRun}
                        run={run}
      />))}
    </div>
  )
}

const noItemsMessage=()=>(
  <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
 Your cart is empty.<br/><Link to ="/shop"style={{ color: '#cb4783',textDecoration:'none' }}>Continue shopping</Link>
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
 <div>
 <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
 Your Cart Summary
 </Typography>

 <Checkout products={items}/>
 </div>
 </Col>
</Row>
</Container>


  </div>
);
}

export default Cart;
