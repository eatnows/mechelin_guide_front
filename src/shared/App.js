import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Login, View, ChangePwd, Welcome, SignUp } from "pages";

import "components/css/allStyle.css";

//import { reviewAdd } from "pages";
//import WriteFormMap from "../components/map/WriteFormMap";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/mechelin" component={View} />
        <Route path="/changepwd" component={ChangePwd} />
        <Route path="/signup" component={SignUp} />
        <Route path="/welcome" component={Welcome} />
      </div>
    );
  }
}

export default App;
