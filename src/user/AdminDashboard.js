import React from "react";
import {isAuthenticated} from "../auth";
import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Banner from "../images/dashboard.png";
import Appbar from "../core/Appbar";
import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import EmailIcon from '@material-ui/icons/Email';
import GroupIcon from '@material-ui/icons/Group';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
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
container:{
  width:"100%",
  textAlign:"center",
  marginTop:80,
  [theme.breakpoints.down('sm')]: {
marginTop:30,

}
},
root: {
    width: 360,
    padding:20,
    marginLeft:210,
    textAlign:"center",
    [theme.breakpoints.down('sm')]: {
  padding:10,
  marginLeft:55,

  marginTop:10,
  width:250

  }
  },
  title: {
   fontSize: 25,
   [theme.breakpoints.down('sm')]: {
fontSize:14

 }
 },


prof: {
   width: '100%',
   maxWidth: 450,
   backgroundColor: theme.palette.background.paper,
   marginLeft:200,
   [theme.breakpoints.down('sm')]: {
maxWidth:250,
marginLeft:55,
marginTop:10

 }
 },

 buttons:{
  width:150,
  textAlign:"center",
  marginRight:5,
  marginLeft:80,
  marginTop:3,
  [theme.breakpoints.down('sm')]: {
marginTop:4,
marginLeft:30

},
  "&:hover":{
    color:"#fff"
  }
},
lightBlue: {
    backgroundColor: "#bc4783"
  },
  primary:{
    fontSize:15
  }



}));

const AdminDashboard=()=>{
const classes = useStyles();
const {user:{_id,name,email,role}}=isAuthenticated();



return (
  <div>
  <Appbar/>
<img src={Banner} alt="Banner" className={classes.banner}/>
<div className={classes.initial}>{name.charAt(0)}
</div>
<div className={classes.name}>{name}</div>
<Grid container className={classes.container}>
<Grid item xs={12} md={4}>
<Card className={classes.root} variant="outlined">
     <CardContent>
       <Typography className={classes.title} color="secondary" gutterBottom>
    Admin Links
       </Typography>

     </CardContent>
     <CardActions className={classes.action}>
     <Button variant="contained" color="primary" component={Link} to="/create/category" className={classes.buttons}>Add Category</Button>
  </CardActions>
     <CardActions className={classes.action}>
<Button variant="contained" color="secondary" component={Link} to="/create/product" className={classes.buttons}>Add Product</Button>
      </CardActions>
      <CardActions className={classes.action}>
      <Button variant="contained" color="primary" component={Link} to="/admin/orders" className={classes.buttons}>View Orders</Button>
   </CardActions>
   <CardActions className={classes.action}>
<Button variant="contained" color="secondary" component={Link} to="/admin/products" className={classes.buttons}>Manage</Button>
    </CardActions>
   </Card>
</Grid>
<Grid item xs={12} md={8}>
<List className={classes.prof}>
     <ListItem>
       <ListItemAvatar>
<Avatar className={classes.lightBlue}>
          <AccountCircleOutlinedIcon/>
  </Avatar>
       </ListItemAvatar>
       <ListItemText primary="Name" secondary={name} className={classes.primary}/>
     </ListItem>
     <Divider variant="inset" component="li" />
     <ListItem>
       <ListItemAvatar>
         <Avatar className={classes.lightBlue}>
           <EmailIcon/>
         </Avatar>
       </ListItemAvatar>
       <ListItemText primary="Email" secondary={email} />
     </ListItem>
     <Divider variant="inset" component="li" />
     <ListItem>
       <ListItemAvatar>
         <Avatar className={classes.lightBlue}>
          <GroupIcon/>
         </Avatar>
       </ListItemAvatar>
       <ListItemText primary="Role" secondary={role===1?"Admin":"Registered User"}/>
     </ListItem>
   </List>
</Grid>
</Grid>



  </div>
);
}

export default AdminDashboard;
