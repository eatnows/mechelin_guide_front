import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
//import { Home } from "pages";
//import Menu from "components/Menu";
import SignUp from "components/signup/SignUp";
import Login from "components/login/Login";
import Welcome from "components/signup/Welcome";
import Main from "components/main/Main";
import "components/css/allStyle.css";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/welcome" component={Welcome} />
          <Route exact path="/" component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
