import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "pages/signup/SignUp";
import Login from "pages/login/Login";
import ChangePwd from "pages/login/ChangePwd";
import Welcome from "pages/signup/Welcome";
import View from "pages/main/View";
import FullMap from "pages/main/FullMap";
import "components/css/allStyle.css";
import Review from "pages/post/Review";

//import { reviewAdd } from "pages";
//import WriteFormMap from "../components/map/WriteFormMap";

class App extends Component {
  state = {
    checked: false,
  };
  isChecked = (e) => {
    if (e.checked) {
      this.setState({
        checked: true,
      });
    }
  };

  render() {
    return (
      <div>
        <Route exact path="/" component={View} check={this.state.checked} />
        <Route
          path="/login"
          component={Login}
          onChecked={this.isChecked.bind(this)}
        />
        <Route path="/changepwd" compononet={ChangePwd} />
        <Route path="/signup" component={SignUp} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/fullmap" component={FullMap} />
        <Route path="/review/:userPlaceId" component={Review} />
      </div>
    );
  }
}

export default App;
