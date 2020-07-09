import React from "react";

class Qna extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div></div>;
  }
}
export default Qna;
