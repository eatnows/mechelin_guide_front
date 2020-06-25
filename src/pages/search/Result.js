import React from "react";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div>Result</div>;
  }
}
export default Result;
