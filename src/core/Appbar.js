import React,{Fragment} from "react";
import {Link,withRouter, NavLink} from "react-router-dom";
import {signout,isAuthenticated} from "../auth";
import {itemTotal} from "./cartHelpers";

import { makeStyles } from '@material-ui/core/styles';
import {Navbar,Nav} from 'react-bootstrap';
import logo from "../images/logo.png";
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles((theme) => ({
  navcolor:{
    backgroundColor:"#051c33"
  }

}));

const Appbar=({history})=>{
  const classes = useStyles();
return (
    <div>
    <Navbar collapseOnSelect expand="lg" variant="dark" className={classes.navcolor}>
      <Navbar.Brand component={Link} to="/"> <img
            alt=""
            src={logo}
            width="40"
            height="40"
          //  className="d-inline-block align-top"
          />{' '}
          Dreamy Creations</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to='/' exact>Home</Nav.Link>
          {isAuthenticated()&&isAuthenticated().user.role===1?<Nav.Link as={NavLink} to="/admin/dashboard">Dashboard</Nav.Link>:
        <Nav.Link as={NavLink} to="/user/dashboard">Dashboard</Nav.Link>}
  <Nav.Link as={NavLink} to='/shop' exact>Shop</Nav.Link>
        </Nav>
        <Nav>
        <Nav.Link as={NavLink} to='/cart' exact> <Badge badgeContent={itemTotal()} color="primary">
        <ShoppingCartIcon />
      </Badge></Nav.Link>
        {!isAuthenticated()&&(
          <Fragment>
            <Nav.Link as={NavLink} to="/signin">Login</Nav.Link>
        <Nav.Link as={NavLink} to="/signup">Signup</Nav.Link>
      </Fragment>
        )}
     {isAuthenticated()&&(<Nav.Link onClick={() =>signout(() => {
       history.push("/");
     })}>Signout</Nav.Link>

     )}
          </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}



export default withRouter(Appbar);
