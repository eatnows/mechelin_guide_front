import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Login, View, ChangePwd, Welcome, SignUp } from "pages";

import "components/css/allStyle.css";

//import { reviewAdd } from "pages";
//import WriteFormMap from "../components/map/WriteFormMap";

class App extends Component {
  state = {
    checked: false,
    userid: "",
  };
  isChecked = (e) => {};
  render() {
    return (
      <div>
        <Route exact path="/" component={View} check={this.state.checked} />
        <Route
          exact
          path="/login"
          component={Login}
          onChecked={this.isChecked.bind(this)}
        />
        <Route path="/changepwd" compononet={ChangePwd} />
        <Route path="/signup" component={SignUp} />
        <Route path="/welcome" component={Welcome} />
      </div>
    );
  }
}

export default App;
