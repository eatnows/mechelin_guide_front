import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Login, View, ChangePwd, Welcome, SignUp } from "pages";
import "css/allStyle.css";
import FullMap from "pages/main/FullMap";
import "css/App.less";
import NaverCallback from "components/login/NaverCallback";
class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/mechelin" component={View} />
        <Route path="/changepwd" component={ChangePwd} />
        <Route path="/signup" component={SignUp} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/navercallback" component={NaverCallback} />
        {/* <Route path="/fullmap" component={FullMap} /> */}
        <Route
          path="/fullmap"
          render={({ history }) => <FullMap history={this.props.history} />}
        />
      </div>
    );
  }
}

export default App;
