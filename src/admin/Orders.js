import React,{useState,useEffect} from "react";
import {isAuthenticated} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Appbar from "../core/Appbar";
import Footer from "../core/Footer";
import {Link} from "react-router-dom";
import {listOrders,getStatusValues,updateOrderStatus} from "./apiAdmin";
import Typography from "@material-ui/core/Typography";
import Banner from "../images/dashboard.png";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  banner:{
    width:"100%",
    height:500,
    marginTop:-60,
    display:"block",
    [theme.breakpoints.down('sm')]: {
    height:200,
    marginTop:-20
   }
  },
  initial:{
    height:100,
    width:100,
    backgroundColor:"#bc4783",
    color:"#fff",
    textAlign:"center",
    padding:"10px 15px 10px 15px",
    fontSize:"3.5rem",
    marginTop:"-.9em",
    marginLeft:200,
    position:"relative",
    [theme.breakpoints.down('sm')]: {
    marginLeft:20,
    height:50,
    width:50,
      padding:3,
      fontSize:"2rem",
  }
  },
  name:{
    position:"relative",
    marginTop:-100,
    marginLeft:320,
    color:"#fff",
    fontSize:"1.5rem",
    [theme.breakpoints.down('sm')]: {
      marginTop:-50,
  marginLeft:80,
  fontSize:"1rem"
  }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 70,
  },
  container:{
    width:"100%",
    textAlign:"center",
    marginTop:80,
    [theme.breakpoints.down('sm')]: {
  marginTop:30,

  }
  },
  title:{
    marginTop:50,
  fontFamily:"Playball",
    textAlign:"center",
    fontSize:45,

    color:"#051c33"
  },
  root:{
    padding:15,
    marginBottom:20,
    [theme.breakpoints.down('sm')]: {
padding:3

  }
  }




}));

const Orders=()=>{
    const classes = useStyles();
    const [orders,setOrders]=useState([]);
    const [statusValues,setStatusValues]=useState([]);
    const {user,token}=isAuthenticated()
    const loadOrders=()=>{
      listOrders(user._id,token).then(data=>{
        if(data.error){
          console.log(data.error);
        }else{
          setOrders(data);
        }
      })
    }

    const loadStatusValues=()=>{
      getStatusValues(user._id,token).then(data=>{
        if(data.error){
          console.log(data.error);
        }else{
          setStatusValues(data);
        }
      })
    }

    useEffect(()=>{
      loadOrders();
      loadStatusValues();
    },[]);

    const showOrdersLength=()=>{
      if(orders.length>0){
        return(
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          Total {orders.length} orders
          </Typography>
        )
      }
      else{
        return(
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
        No orders
          </Typography>
        )
      }
    }

    const handleStatusChange=(e,orderId)=>{
    updateOrderStatus(user._id,token,orderId,e.target.value).then(data=>{
      if(data.error){
        console.log("Status update fail");
      }else{
        loadOrders();
      }
    })

    };

const showStatus=o=>(
  <div>
  <Chip
  size="medium"
  label={o.status}
  clickable
  color="primary"

/>
<br/>
  <FormControl variant="outlined" className={classes.formControl}  >
       <Select
native
onChange={e => handleStatusChange(e, o._id)}

       >
         <option>Update status</option>
         {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
       </Select>
     </FormControl>
     </div>
)

    return(
      <div>
      <Appbar/>
    <img src={Banner} alt="Banner" className={classes.banner}/>
    <div className={classes.initial}>{user.name.charAt(0)}
    </div>
    <div className={classes.name}>{user.name}</div>
    <div>
    {showOrdersLength()}


<Container>
<Row>
{orders.map((o,oIndex)=>{
  return(
    <Col xs={12} md={{ span: 6, offset: 3 }} key={oIndex}>
    <Card className={classes.root} variant="outlined">
     <CardContent>
       <Typography variant="h5" component="h2">
         Order id {o._id}
       </Typography>

       {showStatus(o)}


       <Typography variant="body1" component="p">
        Transaction ID:{o.transaction_id}
       </Typography>
       <Typography variant="body1" component="p">
         Amount:₹{o.amount}
       </Typography>
       <Typography className={classes.pos} color="textSecondary">
        Ordered By:{o.user.name},{moment(o.createdAt).fromNow()}
       </Typography>
       <Typography className={classes.pos} color="textSecondary">
        Delivery Address:{o.address}
       </Typography>
       <Typography variant="h6" component="h6">
        Your orders
       </Typography>
       {o.products.map((p,pIndex)=>(
         <div>
         <Typography variant="body1" component="p">
          Product Name:{p.name}
         </Typography>
         <Typography className={classes.pos} color="textSecondary">
          Product Id:{p._id}
         </Typography>
         </div>
       ))}
     </CardContent>

   </Card>


    </Col>
  )
})}
</Row>

</Container>





    </div>
    <Footer/>
  </div>
    )
}

export default Orders;
