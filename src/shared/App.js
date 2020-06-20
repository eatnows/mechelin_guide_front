import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { Login, View, ChangePwd, Welcome, SignUp } from "pages";

import "components/css/allStyle.css";
import Review from "pages/post/Review";
import FullMap from "pages/main/FullMap";
//import { reviewAdd } from "pages";
//import WriteFormMap from "../components/map/WriteFormMap";

class App extends Component {
  render() {
    return (
      <div>
        <Redirect to="/login" />
        <Route path="/mechelin" component={View} />
        <Route path="/login" component={Login} />
        <Route path="/changepwd" component={ChangePwd} />
        <Route path="/signup" component={SignUp} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/fullmap" component={FullMap} />
        <Route path="/review/:userPlaceId" component={Review} />
      </div>
    );
  }
}

export default App;
