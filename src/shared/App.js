import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Home } from "pages";
import Menu from "components/Menu";

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Route exact path="/" component={Home} />
        <Switch></Switch>
      </div>
    );
  }
}

export default App;
