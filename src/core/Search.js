import React,{useState,useEffect} from "react";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {  makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ProductCard from "./ProductCard";
import Typography from '@material-ui/core/Typography';
import {getCategories,list} from "./apiCore";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const useStyles = makeStyles((theme) => ({
  form:{
    marginTop:50,
    textAlign:"center"
  },
  title:{
    marginTop:50,
  fontFamily:"Playball",
    textAlign:"center",
    fontSize:35,

    color:"#051c33"
  },
  formControl: {
      margin: theme.spacing(1),
      width: 200,
      [theme.breakpoints.down('sm')]: {
      width:110
     }
    },
    bar:{
      margin: theme.spacing(1),
      width: 800,
      marginLeft:-9.5,
      [theme.breakpoints.down('sm')]: {
      width:180,

     }
    },
    buttons:{
    padding:15,
    marginTop:9.5,
    marginLeft:-10,
    "&:hover":{
      color:"#fff"
    },
    [theme.breakpoints.down('sm')]: {
    paddingLeft:0,
    paddingRight:0,
    marginTop:9.5,
    marginLeft:-10

   }
    }
}));

const Search=()=>{
  const classes = useStyles();
  const [data,setData]=useState({
    categories:[],
    category:'',
    search:'',
    results:[],
    searched:false
  });

  const {categories,category,search,results,searched}=data;

  const loadCategories=()=>{
    getCategories().then(data=>{
      if(data.error)
      console.log(data.error);
      else{
        setData({...data,categories:data});
      }
    })
  }

useEffect(()=>{
  loadCategories()
},[]);


const searchSubmit=(e)=>{
  e.preventDefault();
  searchData();
}

const handleChange=(name)=>event=>{
  setData({...data,[name]:event.target.value,searched:false});
}
const searchData=()=>{
  //console.log(search,category);
  if(search){
    list({search:search||undefined,category:category})
    .then(response=>{
      if(response.error){
        console.log(response.error);
      }else{
        setData({...data,results:response,searched:true});
      }
    })
  }
}


const searchMessage = (searched, results) => {
       if (searched && results.length ==1) {
           return `Found ${results.length} product`;
       }
       if(searched && results.length >1) {
           return `Found ${results.length} products`;
       }
       if (searched && results.length < 1) {
           return `No products found`;
       }
   };


const searchedProducts=(results=[])=>{
  return(
    <div>
    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
    {searchMessage(searched,results)}
    </Typography>
      <Row>
      {results.map((product, i) => (
                        <Col xs={12} md={4} >
                          <ProductCard product={product} key={i}/>
                      </Col>
                  ))}


      </Row>
      </div>
  )
}

const searchForm=()=>(
<form onSubmit={searchSubmit} noValidate autoComplete="off" className={classes.form}>
<FormControl variant="outlined" className={classes.formControl}>
    <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
    <Select
    labelId="demo-simple-select-outlined-label"
         id="demo-simple-select-outlined"
      onChange={handleChange("category")}
      label="Category"
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      {categories.map((c, i) => (
                               <MenuItem key={i} value={c._id}>
                                   {c.name}
                               </MenuItem>
                           ))}

    </Select>
  </FormControl>
  <TextField
         id="outlined-password-input"
         label="Search"
         type="text"
         autoComplete="off"
         onChange={handleChange("search")}
         variant="outlined"
         className={classes.bar}

       />
       <Button   type="submit"
         variant="contained"
         color="secondary"
         className={classes.buttons}>
         <SearchIcon/>
       </Button>


</form>
);

  return(
<div>
<div>{searchForm()}</div>
<Container>

  {searchedProducts(results)}
  </Container>
</div>

  )
}

export default Search;
