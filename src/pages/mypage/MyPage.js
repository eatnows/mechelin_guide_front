import React from "react";

class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div>MyPage</div>;
  }
}
export default MyPage;
