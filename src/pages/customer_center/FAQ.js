import React from "react";

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div>FAQ</div>;
  }
}
export default FAQ;
