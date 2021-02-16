import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Login from "views/Authentication/Login/Login";
import Register from "views/Authentication/Register/Register"
import PrivateRoute from "PrivateRoute"
import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" render={(props) => <PrivateRoute {...props} />} />
        <Route path="/rtl" component={RTL} />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </Provider>
  ,
  document.getElementById("root")
);
