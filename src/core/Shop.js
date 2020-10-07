import React,{useState,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import ProductCard from "./ProductCard";
import Typography from '@material-ui/core/Typography';
import Banner from "../images/shop.png";
import {getCategories,getFilteredProducts} from "./apiCore";
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Footer from "./Footer";
import Paper from '@material-ui/core/Paper';
import FilterCheckbox from "./FilterCheckbox";
import {prices} from "./fixedPrices";
import RadioBox from "./RadioBox";
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from "@material-ui/core/Button";
import Appbar from "./Appbar";
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
  marginTop:-20
 }
},
root: {
   //display: 'flex',
 },
 formControl: {
   margin: theme.spacing(3),
 },
 paper:{
   marginTop:25,
   textAlign:"center"
 },
 container:{
   //textAlign:"center"
 },
 title:{
   marginTop:30,
 fontFamily:"Playball",
   textAlign:"center",
   fontSize:35,

   color:"#051c33"
 },
 rightpage:{
   [theme.breakpoints.up('md')]: {
  marginRight:-15
   }
 },




}));

const Shop=()=>{
  const classes = useStyles();
  const [myFilters,setMyFilters]=useState({
    filters:{category:[],price:[]}
  });
  const [categories,setCategories]=useState([]);
    const [error,setError]=useState(false);
      const [limit,setLimit]=useState(6);
        const [skip,setSkip]=useState(0);
        const [size,setSize]=useState(0);
          const [filteredResults,setFilteredResults]=useState([]);
  const init=()=>{
    getCategories().then(data=>{
      if(data.error){
        setError(data.error);
      }else{
        setCategories(data);
      }
    });
  };

  const loadFilteredResults=(newFilters)=>{
    //console.log(newFilters);
    getFilteredProducts(skip,limit,newFilters).then(data=>{
      if(data.error){
        setError(data.error);
      }else{
      setFilteredResults(data.data);
      setSize(data.size);
      setSkip(0);
      }
    });
  };

  const loadMore=()=>{
    let toSkip=skip+limit;
    //console.log(newFilters);
    getFilteredProducts(toSkip,limit,myFilters.filters).then(data=>{
      if(data.error){
        setError(data.error);
      }else{
      setFilteredResults([...filteredResults,...data.data]);
      setSize(data.size);
      setSkip(toSkip);
      }
    });
  };

  const loadMoreButton=()=>{
    return(
      size>0&&size>=limit&&(
        <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={loadMore}
        >Load more</Button>
      )
    )
  }


useEffect(()=>{
  init();
  loadFilteredResults(skip,limit,myFilters.filters);
},[]);

const handleFilters=(filters,filterBy)=>{
  //console.log(filters,filterBy);
  const newFilters={...myFilters};
  newFilters.filters[filterBy]=filters;
  if(filterBy==="price"){
    let priceValues=handlePrice(filters);
      newFilters.filters[filterBy]=priceValues;
  }
  loadFilteredResults(myFilters.filters);
  setMyFilters(newFilters);
};

const handlePrice=value=>{
  const data=prices;
  let array=[];
  for(let key in data){
    if(data[key]._id===parseInt(value))
    {
      array=data[key].array;
    }
  }
  return array;
};



  return(
    <div>
    <div className={classes.root}>
    <Appbar/>
   <img src={Banner} alt="Banner" className={classes.banner}/>
   <Container className={classes.container}>
   <Row>
   <Col xs={12} md={4}>
   <Paper  className={classes.paper}>
   <FormControl component="fieldset" className={classes.formControl}>
      <Typography variant="h6" color="secondary">Filter by categories</Typography>
      <FormGroup>
      <FilterCheckbox categories={categories} handleFilters={filters=>handleFilters(filters,"category")}/>
      </FormGroup>

    </FormControl>
    </Paper>
    <Paper  className={classes.paper}>
    <FormControl component="fieldset" className={classes.formControl}>
       <Typography variant="h6" color="secondary">Filter by price range</Typography>
       <RadioGroup>
       <RadioBox prices={prices} handleFilters={filters=>handleFilters(filters,"price")}/>
</RadioGroup>

     </FormControl>
     </Paper>
   </Col>
   <Col xs={12} md={8} className={classes.rightpage}>
   <Typography gutterBottom variant="h5" component="h2"className={classes.title}>
 Gifts for you
   </Typography>

<Row>
   {filteredResults.map((product,i)=>(
     <Col xs={12} md={6} key={i}>
     <ProductCard product={product}/>
     </Col>
   ))}
   </Row>
   <hr className={classes.invisibleSeparator}/>
  {loadMoreButton()}

   </Col>

   </Row>
   </Container>



  </div>
<Footer/>

  </div>



  );

}

export default Shop;
