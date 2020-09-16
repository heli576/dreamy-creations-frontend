import React from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import './App.css';


import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeFile from "./util/theme";

import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
import Shop from "./core/Shop";
import Product from "./core/Product";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";




const theme=createMuiTheme(themeFile);

const Routes=()=>{
  return(
    <MuiThemeProvider theme={theme}>
      <Router>

      <Switch>
      <Route path="/signup" exact component={Signup}/>
      <Route path="/signin" exact component={Signin}/>
      <Route path="/" exact component={Home}/>
      <Route path="/shop" exact component={Shop}/>
      <Route path="/product/:productId" exact component={Product}/>
      <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
          <AdminRoute path="/create/category" exact component={AddCategory}/>
          <AdminRoute path="/create/product" exact component={AddProduct}/>

    </Switch>
    </Router>
    </MuiThemeProvider>

  )
}

export default Routes;
