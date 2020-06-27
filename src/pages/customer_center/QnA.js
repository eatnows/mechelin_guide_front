import React from "react";

class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div>QnA</div>;
  }
}
export default QnA;
