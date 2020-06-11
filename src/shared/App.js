import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "pages";
import Menu from "components/Menu";
import SignUp from "components/signup/SignUp";
import Login from "components/login/Login";
import "components/css/allStyle.css";

class App extends Component {
  render() {
    return (
      <div>
        <SignUp />
        {/* <Menu />
        <Route exact path="/" component={Home} />
        <Switch></Switch> */}
      </div>
    );
  }
}

export default App;
