import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from "./ProductCard";
import Typography from '@material-ui/core/Typography';
import Search from "./Search";
import AwesomeSlider from 'react-awesome-slider';
import AwsSliderStyles from 'react-awesome-slider/src/styles';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import Banner1 from "../images/banner1.png";
import Banner2 from "../images/banner2.png";
import Banner3 from "../images/banner3.png";
import Appbar from "./Appbar";
import {getProducts} from "./apiCore";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Footer from "./Footer";


const AutoplaySlider = withAutoplay(AwesomeSlider);
const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor:"#051c33",
  },
container:{


  [theme.breakpoints.down('sm')]: {
  marginTop:0,
  marginLeft:0,
  marginRight:0
 },
  [theme.breakpoints.up('md')]: {
    marginTop:0,
    marginLeft:100,
    marginRight:100,
  }
},
title:{
  marginTop:10,
fontFamily:"Playball",
  textAlign:"center",
  fontSize:35,

  color:"#051c33"
},



}));

const Home=()=>{
    const classes = useStyles();
    const [productsBySell,setProductsBySell]=useState([]);
    const [productsByArrival,setProductsByArrival]=useState([]);
    const [error,setError]=useState(false);

    const loadProductsBySell=()=>{
      getProducts("sold").then(data=>{
        if(data.error){
          setError(error.data);
        }else{
          setProductsBySell(data);
        }
      })
    }
    const loadProductsByArrival=()=>{
      getProducts("createdAt").then(data=>{
        if(data.error){
          setError(error.data);
        }else{
          setProductsByArrival(data);
        }
      })
    }
    useEffect(() => {
            loadProductsByArrival();
            loadProductsBySell();
        }, []);

  return(
    <div>
    <div className={classes.root}>
    <Appbar/>
<div className={classes.container}>
    <AutoplaySlider
    play={true}
    cancelOnInteraction={false} // should stop playing on user interaction
    interval={6000}
   cssModule={AwsSliderStyles} animation="cubeAnimation">
   <div data-src={Banner1}/>
    <div data-src={Banner2}/>
    <div data-src={Banner3}/>
  </AutoplaySlider>
  </div>
  </div>
<div>
<Search/>
<Container>
<Typography gutterBottom variant="h5" component="h2" className={classes.title}>
New Arrivals
</Typography>
  <Row>
  {productsByArrival.map((product, i) => (
                    <Col xs={12} md={4} key={i}>
                      <ProductCard product={product} />
                  </Col>
              ))}


  </Row>
  <Typography gutterBottom variant="h5" component="h2"className={classes.title}>
Best Selling Gifts
  </Typography>
    <Row>
    {productsBySell.map((product, i) => (
                      <Col xs={12} md={4} key={i}>
                        <ProductCard product={product} />
                    </Col>
                ))}


    </Row>


</Container>
</div>

<Footer/>
  </div>



  );

}



export default Home;
