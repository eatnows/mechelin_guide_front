import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "pages/signup/SignUp";
import Login from "pages/login/Login";
import Welcome from "pages/signup/Welcome";
import View from "pages/main/View";
import FullMap from "pages/main/FullMap";
import "components/css/allStyle.css";
import { reviewAdd } from "pages";
import WriteFormMap from "../components/map/WriteFormMap";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/" component={View} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/fullmap" component={FullMap} />
        </Switch>
      </div>
    );
  }
}

export default App;
