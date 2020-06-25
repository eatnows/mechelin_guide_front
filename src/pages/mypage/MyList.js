import React from "react";

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
  }
  render() {
    return <div>MyList</div>;
  }
}
export default MyList;
